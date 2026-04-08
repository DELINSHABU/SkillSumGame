'use client';

import { useState } from 'react';
import type { UserProfile, Achievement, SessionResult, MasteryMap } from '@/lib/types';
import { getLevelXPThreshold } from '@/hooks/useUserProfile';

interface ProfileScreenProps {
  profile: UserProfile;
  achievements: Achievement[];
  history: SessionResult[];
  masteryMap: MasteryMap;
  onBack: () => void;
}

export function ProfileScreen({ profile, achievements, history, masteryMap, onBack }: ProfileScreenProps) {
  const [tab, setTab] = useState<'stats' | 'achievements' | 'history'>('stats');

  const currentLevelXP = getLevelXPThreshold(profile.accountLevel);
  const nextLevelXP = getLevelXPThreshold(profile.accountLevel + 1);
  const progressToNext = ((profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen">
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-pink-100 to-white">
        <button onClick={onBack} className="text-gray-500 mb-4">←</button>
        <div className="flex items-center gap-4">
          <div className="text-5xl">{profile.avatarEmoji}</div>
          <div>
            <h2 className="text-xl font-bold">{profile.username}</h2>
            <div className="flex items-center gap-2">
              <span className="bg-pink-100 text-pink-600 text-sm font-bold px-2 py-0.5 rounded-full">
                Lv. {profile.accountLevel}
              </span>
              <span className="text-orange-500 font-semibold">🔥 {profile.dailyStreak} days</span>
            </div>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{profile.xp.toLocaleString()} XP</span>
            <span>Next: {nextLevelXP.toLocaleString()} XP</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(['stats', 'achievements', 'history'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              tab === t ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'stats' && <StatsTab history={history} masteryMap={masteryMap} />}
        {tab === 'achievements' && (
          <AchievementsTab achievements={achievements} unlockedCount={unlockedCount} />
        )}
        {tab === 'history' && <HistoryTab history={history} />}
      </div>
    </div>
  );
}

function StatsTab({ history, masteryMap }: { history: SessionResult[]; masteryMap: MasteryMap }) {
  const totalCorrect = history.reduce((sum, s) => sum + s.correct, 0);
  const totalWrong = history.reduce((sum, s) => sum + s.wrong, 0);
  const overallAccuracy = totalCorrect + totalWrong > 0
    ? ((totalCorrect / (totalCorrect + totalWrong)) * 100).toFixed(1)
    : '0';
  const levelsCompleted = Object.values(masteryMap).filter(m => m.stars > 0).length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Total Correct" value={totalCorrect.toLocaleString()} icon="✅" />
      <StatCard label="Overall Accuracy" value={`${overallAccuracy}%`} icon="🎯" />
      <StatCard label="Sessions Played" value={history.length.toString()} icon="🎮" />
      <StatCard label="Levels Completed" value={levelsCompleted.toString()} icon="⭐" />
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-bold text-xl text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function AchievementsTab({ achievements, unlockedCount }: { achievements: Achievement[]; unlockedCount: number }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">{unlockedCount} / {achievements.length} unlocked</p>
      <div className="space-y-2">
        {achievements.map(a => (
          <div
            key={a.id}
            className={`flex items-center gap-3 p-3 rounded-xl ${a.unlockedAt ? 'bg-yellow-50' : 'bg-gray-50 opacity-50'}`}
          >
            <span className={`text-3xl ${!a.unlockedAt && a.secret ? 'grayscale' : ''}`}>
              {a.secret && !a.unlockedAt ? '❓' : a.icon}
            </span>
            <div>
              <div className="font-semibold text-sm">{a.secret && !a.unlockedAt ? '???' : a.name}</div>
              <div className="text-xs text-gray-500">{a.secret && !a.unlockedAt ? 'Keep playing to discover...' : a.description}</div>
              {a.unlockedAt && (
                <div className="text-xs text-yellow-600 mt-0.5">
                  Unlocked {new Date(a.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryTab({ history }: { history: SessionResult[] }) {
  return (
    <div className="space-y-2">
      {history.slice(0, 20).map(session => (
        <div key={session.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="text-2xl">{session.mode === 'learn' ? '📚' : session.mode === 'practice' ? '⚡' : '📅'}</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{session.correct} correct</div>
            <div className="text-xs text-gray-500">{session.accuracy.toFixed(0)}% accuracy • {new Date(session.startedAt).toLocaleDateString()}</div>
          </div>
          {session.starsEarned !== undefined && (
            <div className="text-yellow-400">{'⭐'.repeat(session.starsEarned)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
