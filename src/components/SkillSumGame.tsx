'use client';

import { useState, useCallback } from 'react';
import type { AppScreen, Level, PracticeConfig, SessionResult } from '@/lib/types';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ALL_LEVELS, getLevelsByWorld, getNextLevel, WORLDS_META } from '@/lib/levels';
import { calculateXP, getStarsFromScore } from '@/lib/xp';
import { checkAchievements } from '@/lib/achievements';

// Import all screen components
import { HomeScreen } from './HomeScreen'; // build this last — wires nav
import { WorldMap } from './learn/WorldMap';
import { PreLesson } from './learn/PreLesson';
import { GameScreen } from './GameScreen'; // modified version
import { PostLesson } from './learn/PostLesson';
import { PracticeSetup } from './practice/PracticeSetup';
import { PracticeResults } from './practice/PracticeResults';
import { ProfileScreen } from './profile/ProfileScreen';
import { ConfettiEffect } from './ConfettiEffect';

export function SkillSumGame() {
  const {
    profile, masteryMap, history, achievements, personalBests, isLoaded,
    updateProfile, recordSession, updatePersonalBest, unlockAchievement,
  } = useUserProfile();

  const [screen, setScreen] = useState<AppScreen>(
    profile.onboardingComplete ? 'home' : 'onboarding'
  );
  const [selectedWorldId, setSelectedWorldId] = useState(1);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentPracticeConfig, setCurrentPracticeConfig] = useState<PracticeConfig | null>(null);
  const [lastSession, setLastSession] = useState<SessionResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // ─── Navigation helpers ───────────────────────────────────────────
  const go = useCallback((s: AppScreen) => setScreen(s), []);

  const startLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    go('preLesson');
  }, [go]);

  const startPractice = useCallback((config: PracticeConfig) => {
    setCurrentPracticeConfig(config);
    go('practicing');
  }, [go]);

  // ─── Session completion handler ───────────────────────────────────
  const handleLearnSessionEnd = useCallback((session: SessionResult) => {
    if (!currentLevel) return;

    const stars = getStarsFromScore(session.correct, currentLevel);
    const xpInfo = calculateXP(session, {
      isLevelComplete: stars > 0,
      isBossLevel: currentLevel.type === 'boss',
      dailyStreakDays: profile.dailyStreak,
    });

    const finalSession: SessionResult = {
      ...session,
      starsEarned: stars,
      xpEarned: xpInfo.total,
    };

    // Check for stars = 3 celebration
    if (stars === 3) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // Check achievements
    const totalCorrect = history.reduce((s, r) => s + r.correct, 0) + session.correct;
    const newAchievements = checkAchievements(achievements, {
      totalCorrect,
      sessionAccuracy: session.accuracy,
      sessionMaxStreak: session.maxStreak,
      sessionAvgMs: session.durationMs / Math.max(session.correct + session.wrong, 1),
      accountLevel: profile.accountLevel,
      dailyStreak: profile.dailyStreak,
      lastCompletedLevelId: stars > 0 ? currentLevel.id : undefined,
    });
    newAchievements.forEach(unlockAchievement);

    recordSession(finalSession);
    setLastSession(finalSession);
    go('postLesson');
  }, [currentLevel, profile, history, achievements, recordSession, unlockAchievement, go]);

  const handlePracticeSessionEnd = useCallback((session: SessionResult) => {
    if (!currentPracticeConfig) return;

    const configKey = JSON.stringify(currentPracticeConfig);
    const isPB = updatePersonalBest(configKey, session.correct, session.accuracy);

    const xpInfo = calculateXP(session, {
      isPersonalBest: isPB,
      dailyStreakDays: profile.dailyStreak,
    });

    const finalSession: SessionResult = {
      ...session,
      xpEarned: xpInfo.total,
      isPersonalBest: isPB,
    };

    if (isPB) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    recordSession(finalSession);
    setLastSession(finalSession);
    go('practiceResults');
  }, [currentPracticeConfig, profile.dailyStreak, updatePersonalBest, recordSession, go]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen text-pink-400">Loading...</div>;
  }

  // ─── Screen routing ───────────────────────────────────────────────
  return (
    <>
      {showConfetti && <ConfettiEffect />}
      <div className="min-h-screen" style={{ backgroundColor: '#fce4ec' }}>

        {screen === 'onboarding' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <h1 className="text-4xl font-black mb-4" style={{ color: '#ff80ab', fontFamily: 'Poppins, sans-serif' }}>
              SkillSum
            </h1>
            <p className="text-xl mb-8" style={{ color: '#4a4a4a' }}>
              Master mental math with fun lessons & practice!
            </p>
            <button
              onClick={() => {
                const updated = { ...profile, onboardingComplete: true };
                updateProfile(updated);
                go('home');
              }}
              className="px-8 py-4 rounded-2xl text-xl font-bold text-white"
              style={{ 
                backgroundColor: '#ff80ab',
                boxShadow: '0 4px 12px rgba(255, 128, 171, 0.4)'
              }}
            >
              Get Started 🚀
            </button>
          </div>
        )}

        {screen === 'home' && (
          <HomeScreen
            profile={profile}
            masteryMap={masteryMap}
            onLearnMode={() => go('worldSelect')}
            onPracticeMode={() => go('practiceSetup')}
            onDailyChallenge={() => go('dailyChallenge')}
            onProfile={() => go('profile')}
          />
        )}

        {screen === 'worldSelect' && (
          <div className="p-4 max-w-md mx-auto">
            <button onClick={() => go('home')} className="mb-4 text-gray-500">←</button>
            <h2 className="text-2xl font-bold mb-4">Choose World</h2>
            {WORLDS_META.map(world => {
              const worldLevels = getLevelsByWorld(world.id);
              const completed = worldLevels.filter(l => (masteryMap[l.id]?.stars || 0) > 0).length;
              const isUnlocked = world.id === 1 || completed >= (getLevelsByWorld(world.id - 1).length - 10);
              return (
                <button
                  key={world.id}
                  onClick={() => { setSelectedWorldId(world.id); go('worldMap'); }}
                  disabled={!isUnlocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl mb-3 text-left ${isUnlocked ? 'opacity-100' : 'opacity-40 cursor-not-allowed'}`}
                  style={{ backgroundColor: world.color + '20', border: `2px solid ${world.color}` }}
                >
                  <span className="text-3xl">{world.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold">{world.name}</div>
                    <div className="text-sm text-gray-600">{completed} / {worldLevels.length} levels</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full rounded-full" style={{ backgroundColor: world.color, width: `${(completed / worldLevels.length) * 100}%` }} />
                    </div>
                  </div>
                  {!isUnlocked && <span className="text-xl">🔒</span>}
                </button>
              );
            })}
          </div>
        )}

        {screen === 'worldMap' && (
          <WorldMap
            worldId={selectedWorldId}
            levels={getLevelsByWorld(selectedWorldId)}
            masteryMap={masteryMap}
            onLevelSelect={startLevel}
            onBack={() => go('worldSelect')}
          />
        )}

        {screen === 'preLesson' && currentLevel && (
          <PreLesson
            level={currentLevel}
            onStart={() => go('playing')}
            onBack={() => go('worldMap')}
          />
        )}

        {screen === 'playing' && currentLevel && (
          <GameScreen
            level={currentLevel}
            onSessionEnd={handleLearnSessionEnd}
            onBack={() => go('worldMap')}
          />
        )}

        {screen === 'postLesson' && lastSession && currentLevel && (
          <PostLesson
            session={lastSession}
            level={currentLevel}
            xpEarned={lastSession.xpEarned}
            onNext={() => {
              const next = getNextLevel(currentLevel.id);
              if (next) startLevel(next);
              else go('worldMap');
            }}
            onRetry={() => go('preLesson')}
            onPracticeWeakSpots={() => { /* set config from weak spots */ go('practiceSetup'); }}
          />
        )}

        {screen === 'practiceSetup' && (
          <PracticeSetup
            personalBests={personalBests}
            onStart={startPractice}
            onBack={() => go('home')}
          />
        )}

        {screen === 'practicing' && currentPracticeConfig && (
          <GameScreen
            practiceConfig={currentPracticeConfig}
            onSessionEnd={handlePracticeSessionEnd}
            onBack={() => go('practiceSetup')}
          />
        )}

        {screen === 'practiceResults' && lastSession && (
          <PracticeResults
            session={lastSession}
            xpEarned={lastSession.xpEarned}
            isPersonalBest={lastSession.isPersonalBest || false}
            onRetry={() => go('practicing')}
            onChangeConfig={() => go('practiceSetup')}
            onHome={() => go('home')}
          />
        )}

        {screen === 'profile' && (
          <ProfileScreen
            profile={profile}
            achievements={achievements}
            history={history}
            masteryMap={masteryMap}
            onBack={() => go('home')}
          />
        )}

      </div>
    </>
  );
}
