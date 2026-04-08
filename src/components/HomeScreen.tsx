'use client';

import { useMemo } from 'react';
import type { UserProfile, MasteryMap } from '@/lib/types';
import { ALL_LEVELS, getNextLevel } from '@/lib/levels';

interface HomeScreenProps {
  profile: UserProfile;
  masteryMap: MasteryMap;
  onLearnMode: () => void;
  onPracticeMode: () => void;
  onDailyChallenge: () => void;
  onProfile: () => void;
}

export function HomeScreen({ 
  profile, 
  masteryMap, 
  onLearnMode, 
  onPracticeMode, 
  onDailyChallenge, 
  onProfile 
}: HomeScreenProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const nextIncompleteLevel = useMemo(() => {
    for (const level of ALL_LEVELS) {
      const mastery = masteryMap[level.id];
      if (!mastery || mastery.stars === 0) {
        return level;
      }
    }
    return ALL_LEVELS[0];
  }, [masteryMap]);

  const nextLevel = nextIncompleteLevel 
    ? getNextLevel(nextIncompleteLevel.id) || nextIncompleteLevel
    : null;

  const xpToNext = Math.floor(500 * Math.pow(profile.accountLevel, 1.5));
  const xpProgress = (profile.xp / xpToNext) * 100;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black" style={{ color: '#ff80ab', fontFamily: 'Poppins, sans-serif' }}>
          SkillSum
        </h1>
        <button 
          onClick={onProfile}
          className="text-2xl p-2 rounded-full hover:bg-pink-100 transition-colors"
          aria-label="Go to profile"
        >
          {profile.avatarEmoji || '👤'}
        </button>
      </div>

      {/* Greeting */}
      <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-bold" style={{ color: '#4a4a4a', fontFamily: 'Poppins, sans-serif' }}>
          {greeting}, {profile.username || 'there'}! 👋
        </h2>
        <div className="flex items-center gap-2 text-sm mt-1" style={{ color: '#666' }}>
          <span>🔥 {profile.dailyStreak} days</span>
          <span>•</span>
          <span>Lv.{profile.accountLevel}</span>
          <span>•</span>
          <span>{profile.xp.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <button 
        onClick={onDailyChallenge}
        className="w-full p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
        style={{ 
          background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
          border: '2px solid #ffd54f',
          boxShadow: '0 4px 12px rgba(255, 213, 79, 0.3)'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg" style={{ color: '#f57f17' }}>📅 Daily Challenge</span>
          <span className="text-sm font-bold" style={{ color: '#f57f17' }}>Go →</span>
        </div>
        <div className="text-sm" style={{ color: '#f57f17' }}>
          Test your skills with today's unique challenge!
        </div>
      </button>

      {/* Continue Learning Card */}
      {nextLevel && (
        <button 
          onClick={onLearnMode}
          className="w-full p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            border: '2px solid #81c784',
            boxShadow: '0 4px 12px rgba(129, 199, 132, 0.3)'
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg" style={{ color: '#2e7d32' }}>📚 Continue</span>
            <span className="text-sm font-bold" style={{ color: '#2e7d32' }}>Continue →</span>
          </div>
          <div className="text-sm" style={{ color: '#2e7d32' }}>
            {nextLevel.title}
          </div>
          <div className="text-xs mt-1" style={{ color: '#66bb6a' }}>
            World {nextLevel.worldId}: {nextLevel.generationParams?.skill || nextLevel.type}
          </div>
        </button>
      )}

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button 
          onClick={onLearnMode}
          className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ 
            backgroundColor: '#ff80ab',
            boxShadow: '0 4px 12px rgba(255, 128, 171, 0.4)'
          }}
        >
          <span className="text-4xl mb-2">📚</span>
          <span className="font-bold text-white">Learn</span>
          <span className="text-xs text-white/80">400 Levels</span>
        </button>
        
        <button 
          onClick={onPracticeMode}
          className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ 
            backgroundColor: '#4caf50',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)'
          }}
        >
          <span className="text-4xl mb-2">⚡</span>
          <span className="font-bold text-white">Practice</span>
          <span className="text-xs text-white/80">Free Play</span>
        </button>
      </div>

      {/* XP Progress Bar */}
      <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: '#fff', border: '2px solid #fce4ec' }}>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: '#4a4a4a' }}>Your Progress</span>
          <span style={{ color: '#ff80ab', fontWeight: 'bold' }}>
            {profile.xp.toLocaleString()} / {xpToNext.toLocaleString()} XP
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700"
            style={{ 
              width: `${Math.min(xpProgress, 100)}%`,
              background: 'linear-gradient(90deg, #ff80ab, #ff4081)'
            }}
          />
        </div>
        <div className="text-xs text-center mt-1" style={{ color: '#666' }}>
          Level {profile.accountLevel} → Level {profile.accountLevel + 1}
        </div>
      </div>

      {/* Streak Widget */}
      <div className="p-4 rounded-2xl" style={{ backgroundColor: '#fff3e0', border: '2px solid #ffb74d' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🔥</span>
          <span className="font-bold" style={{ color: '#e65100' }}>
            {profile.dailyStreak}-Day Streak!
          </span>
        </div>
        <div className="text-sm" style={{ color: '#ef6c00' }}>
          Keep your streak alive by playing every day!
        </div>
      </div>
    </div>
  );
}