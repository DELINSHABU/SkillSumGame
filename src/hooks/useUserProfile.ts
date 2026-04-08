'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile, MasteryMap, SessionResult, Achievement, PersonalBest, DailyChallenge } from '@/lib/types';
import { ACHIEVEMENTS_LIST } from '@/lib/achievements';

const STORAGE_KEYS = {
  profile: 'skillsum_v2_profile',
  mastery: 'skillsum_v2_mastery',
  history: 'skillsum_v2_history',
  achievements: 'skillsum_v2_achievements',
  personalBests: 'skillsum_v2_pbs',
  dailyChallenge: 'skillsum_v2_daily',
};

const DEFAULT_PROFILE: UserProfile = {
  username: 'Player',
  avatarEmoji: '🧠',
  xp: 0,
  accountLevel: 1,
  dailyStreak: 0,
  lastStreakDate: '',
  dailyXPEarned: 0,
  dailyGoalMinutes: 10,
  onboardingComplete: false,
  mathLevel: 'beginner',
  createdAt: new Date().toISOString(),
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [masteryMap, setMasteryMap] = useState<MasteryMap>({});
  const [history, setHistory] = useState<SessionResult[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all data on mount
  useEffect(() => {
    setProfile(load(STORAGE_KEYS.profile, DEFAULT_PROFILE));
    setMasteryMap(load(STORAGE_KEYS.mastery, {}));
    setHistory(load(STORAGE_KEYS.history, []));
    setAchievements(load(STORAGE_KEYS.achievements, ACHIEVEMENTS_LIST));
    setPersonalBests(load(STORAGE_KEYS.personalBests, []));
    setIsLoaded(true);
  }, []);

  // Save profile whenever it changes
  useEffect(() => {
    if (isLoaded) save(STORAGE_KEYS.profile, profile);
  }, [profile, isLoaded]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      save(STORAGE_KEYS.profile, updated);
      return updated;
    });
  }, []);

  const recordSession = useCallback((session: SessionResult) => {
    // Add to history (keep last 100)
    setHistory(prev => {
      const updated = [session, ...prev].slice(0, 100);
      save(STORAGE_KEYS.history, updated);
      return updated;
    });

    // Update mastery if learn mode
    if (session.levelId && session.starsEarned !== undefined) {
      setMasteryMap(prev => {
        const existing = prev[session.levelId!];
        const updated = {
          ...prev,
          [session.levelId!]: {
            levelId: session.levelId!,
            stars: Math.max(existing?.stars || 0, session.starsEarned!) as 0|1|2|3,
            bestScore: Math.max(existing?.bestScore || 0, session.correct),
            bestAccuracy: Math.max(existing?.bestAccuracy || 0, session.accuracy),
            bestTimeMs: existing?.bestTimeMs
              ? Math.min(existing.bestTimeMs, session.durationMs)
              : session.durationMs,
            attempts: (existing?.attempts || 0) + 1,
            lastPlayedAt: session.startedAt,
            weakSkillsDetected: [],
          }
        };
        save(STORAGE_KEYS.mastery, updated);
        return updated;
      });
    }

    // Award XP
    setProfile(prev => {
      const newXP = prev.xp + session.xpEarned;
      const newLevel = calculateAccountLevel(newXP);
      const updated = {
        ...prev,
        xp: newXP,
        accountLevel: newLevel,
        dailyXPEarned: prev.dailyXPEarned + session.xpEarned,
      };
      save(STORAGE_KEYS.profile, updated);
      return updated;
    });

    // Check & update streak
    checkAndUpdateStreak();
  }, []);

  const checkAndUpdateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    setProfile(prev => {
      const lastDate = prev.lastStreakDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let newStreak = prev.dailyStreak;
      if (lastDate === today) {
        return prev; // Already counted today
      } else if (lastDate === yesterday) {
        newStreak = prev.dailyStreak + 1; // Continue streak
      } else {
        newStreak = 1; // Streak broken, restart
      }

      const updated = { ...prev, dailyStreak: newStreak, lastStreakDate: today };
      save(STORAGE_KEYS.profile, updated);
      return updated;
    });
  }, []);

  const updatePersonalBest = useCallback((configKey: string, score: number, accuracy: number): boolean => {
    const existing = personalBests.find(pb => pb.configKey === configKey);
    if (!existing || score > existing.score) {
      const updated = [
        ...personalBests.filter(pb => pb.configKey !== configKey),
        { configKey, score, accuracy, achievedAt: new Date().toISOString() }
      ];
      setPersonalBests(updated);
      save(STORAGE_KEYS.personalBests, updated);
      return true; // Is a new PB
    }
    return false;
  }, [personalBests]);

  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => {
      const updated = prev.map(a =>
        a.id === achievementId && !a.unlockedAt
          ? { ...a, unlockedAt: new Date().toISOString() }
          : a
      );
      save(STORAGE_KEYS.achievements, updated);
      return updated;
    });
  }, []);

  return {
    profile,
    masteryMap,
    history,
    achievements,
    personalBests,
    isLoaded,
    updateProfile,
    recordSession,
    updatePersonalBest,
    unlockAchievement,
  };
}

// XP thresholds for account levels 1-100
function calculateAccountLevel(xp: number): number {
  // Each level requires progressively more XP
  // Level 1: 0 XP, Level 2: 500, Level 3: 1200, Level 10: ~10000, Level 100: ~500000
  for (let level = 100; level >= 1; level--) {
    if (xp >= getLevelXPThreshold(level)) return level;
  }
  return 1;
}

export function getLevelXPThreshold(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(500 * Math.pow(level - 1, 1.5));
}
