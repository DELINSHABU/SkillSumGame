'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserProfile, MasteryMap, SessionResult, Achievement, PersonalBest, DailyChallenge, StarCount } from '@/lib/types';
import { ACHIEVEMENTS_LIST } from '@/lib/achievements';

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

function calculateAccountLevel(xp: number): number {
  for (let level = 100; level >= 1; level--) {
    if (xp >= getLevelXPThreshold(level)) return level;
  }
  return 1;
}

function getLevelXPThreshold(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(500 * Math.pow(level - 1, 1.5));
}

export function useSupabaseProfile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [masteryMap, setMasteryMap] = useState<MasteryMap>({});
  const [history, setHistory] = useState<SessionResult[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_LIST);
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadUserData = useCallback(async (userId: string) => {
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userData) {
      setProfile({
        username: userData.username,
        avatarEmoji: userData.avatar_emoji,
        xp: userData.xp,
        accountLevel: userData.account_level,
        dailyStreak: userData.daily_streak,
        lastStreakDate: userData.last_streak_date,
        dailyXPEarned: userData.daily_xp_earned || 0,
        dailyGoalMinutes: userData.daily_goal_minutes || 10,
        onboardingComplete: userData.onboarding_complete || false,
        mathLevel: userData.math_level || 'beginner',
        createdAt: userData.created_at,
      });
    }

    const { data: masteryData } = await supabase
      .from('mastery')
      .select('*')
      .eq('user_id', userId);

    if (masteryData) {
      const map: MasteryMap = {};
      masteryData.forEach((m: any) => {
        map[m.level_id] = {
          levelId: m.level_id,
          stars: m.stars as StarCount,
          bestScore: m.best_score,
          bestAccuracy: m.best_accuracy || 0,
          bestTimeMs: m.best_time_ms,
          attempts: m.attempts,
          lastPlayedAt: m.last_played_at,
          weakSkillsDetected: [],
        };
      });
      setMasteryMap(map);
    }

    const { data: historyData } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(100);

    if (historyData) {
      setHistory(historyData.map((h: any) => ({
        id: h.id,
        mode: h.mode,
        levelId: h.level_id,
        practiceConfig: h.practice_config,
        startedAt: h.started_at,
        durationMs: h.duration_ms,
        attempts: [],
        correct: h.correct,
        wrong: h.wrong,
        accuracy: h.accuracy,
        maxStreak: h.max_streak,
        xpEarned: h.xp_earned,
      })));
    }

    const { data: achievementsData } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId);

    if (achievementsData) {
      setAchievements(prev => prev.map(a => {
        const found = achievementsData.find((ua: any) => ua.achievement_id === a.id);
        return found ? { ...a, unlockedAt: found.unlocked_at } : a;
      }));
    }

    const { data: pbData } = await supabase
      .from('personal_bests')
      .select('*')
      .eq('user_id', userId);

    if (pbData) {
      setPersonalBests(pbData.map((pb: any) => ({
        configKey: pb.config_key,
        score: pb.score,
        accuracy: pb.accuracy,
        achievedAt: pb.achieved_at,
      })));
    }

    const today = new Date().toISOString().split('T')[0];
    const { data: dcData } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (dcData) {
      setDailyChallenge({
        date: dcData.date,
        tasksCompleted: dcData.tasks_completed,
        totalTasks: dcData.total_tasks,
        xpReward: dcData.xp_reward,
        completedAt: dcData.completed_at,
      });
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        await loadUserData(session.user.id);
      } else {
        setIsLoaded(true);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        await loadUserData(session.user.id);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoaded(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserData]);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: email.split('@')[0],
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from('users').insert([{ 
        id: data.user.id,
        username: email.split('@')[0],
      }]);
    }

    return data;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setIsAuthenticated(false);
    setProfile(DEFAULT_PROFILE);
    setMasteryMap({});
    setHistory([]);
    setPersonalBests([]);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      if (user) {
        supabase.from('users').update({
          username: updated.username,
          avatar_emoji: updated.avatarEmoji,
          daily_goal_minutes: updated.dailyGoalMinutes,
          math_level: updated.mathLevel,
          onboarding_complete: updated.onboardingComplete,
        }).eq('id', user.id);
      }
      return updated;
    });
  }, [user]);

  const recordSession = useCallback(async (session: SessionResult) => {
    if (!user || !isAuthenticated) return;

    const updates = [];

    updates.push(
      supabase.from('history').insert([{
        user_id: user.id,
        mode: session.mode,
        level_id: session.levelId,
        correct: session.correct,
        wrong: session.wrong,
        accuracy: session.accuracy,
        max_streak: session.maxStreak,
        xp_earned: session.xpEarned,
        started_at: session.startedAt,
        duration_ms: session.durationMs,
      }])
    );

    if (session.levelId && session.starsEarned !== undefined) {
      const { data: existing } = await supabase
        .from('mastery')
        .select('stars')
        .eq('user_id', user.id)
        .eq('level_id', session.levelId)
        .single();

      const currentStars = existing?.stars || 0;
      if (session.starsEarned > currentStars) {
        updates.push(
          supabase.from('mastery').upsert({
            user_id: user.id,
            level_id: session.levelId,
            stars: session.starsEarned,
            best_score: session.correct,
            best_accuracy: session.accuracy,
            best_time_ms: session.durationMs,
            attempts: (existing?.attempts || 0) + 1,
            last_played_at: new Date().toISOString(),
          }, { onConflict: 'user_id, level_id' })
        );

        setMasteryMap(prev => ({
          ...prev,
          [session.levelId!]: {
            levelId: session.levelId!,
            stars: session.starsEarned as StarCount,
            bestScore: session.correct,
            bestAccuracy: session.accuracy,
            bestTimeMs: session.durationMs,
            attempts: (prev[session.levelId!]?.attempts || 0) + 1,
            lastPlayedAt: session.startedAt,
            weakSkillsDetected: [],
          }
        }));
      }
    }

    const newXP = profile.xp + session.xpEarned;
    const newLevel = calculateAccountLevel(newXP);
    
    updates.push(
      supabase.from('users').update({ 
        xp: newXP,
        account_level: newLevel,
      }).eq('id', user.id)
    );

    setProfile(prev => ({
      ...prev,
      xp: newXP,
      accountLevel: newLevel,
    }));

    await Promise.all(updates);
  }, [user, isAuthenticated, profile.xp]);

  const checkAndUpdateStreak = useCallback(async () => {
    if (!user || !isAuthenticated) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let newStreak = profile.dailyStreak;
    if (profile.lastStreakDate === today) {
      return;
    } else if (profile.lastStreakDate === yesterday) {
      newStreak = profile.dailyStreak + 1;
    } else {
      newStreak = 1;
    }

    await supabase.from('users').update({
      daily_streak: newStreak,
      last_streak_date: today,
    }).eq('id', user.id);

    setProfile(prev => ({
      ...prev,
      dailyStreak: newStreak,
      lastStreakDate: today,
    }));
  }, [user, isAuthenticated, profile.dailyStreak, profile.lastStreakDate]);

  const updatePersonalBest = useCallback(async (configKey: string, score: number, accuracy: number): Promise<boolean> => {
    if (!user || !isAuthenticated) return false;

    const existing = personalBests.find(pb => pb.configKey === configKey);
    if (existing && score <= existing.score) return false;

    await supabase.from('personal_bests').upsert({
      user_id: user.id,
      config_key: configKey,
      score,
      accuracy,
      achieved_at: new Date().toISOString(),
    }, { onConflict: 'user_id, config_key' });

    setPersonalBests(prev => {
      const updated = prev.filter(pb => pb.configKey !== configKey);
      return [...updated, { configKey, score, accuracy, achievedAt: new Date().toISOString() }];
    });

    return true;
  }, [user, isAuthenticated, personalBests]);

  const unlockAchievement = useCallback(async (achievementId: string) => {
    if (!user || !isAuthenticated) return;

    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    await supabase.from('achievements').upsert({
      user_id: user.id,
      achievement_id: achievementId,
      title: achievement.title,
      description: achievement.description,
      unlocked_at: new Date().toISOString(),
    }, { onConflict: 'user_id, achievement_id' });

    setAchievements(prev => prev.map(a =>
      a.id === achievementId && !a.unlockedAt
        ? { ...a, unlockedAt: new Date().toISOString() }
        : a
    ));
  }, [user, isAuthenticated, achievements]);

  return {
    user,
    profile,
    masteryMap,
    history,
    achievements,
    personalBests,
    dailyChallenge,
    isLoaded,
    isAuthenticated,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    recordSession,
    checkAndUpdateStreak,
    updatePersonalBest,
    unlockAchievement,
  };
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('At least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('At least 1 uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('At least 1 lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('At least 1 number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('At least 1 special character');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}