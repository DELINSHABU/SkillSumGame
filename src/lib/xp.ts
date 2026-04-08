import type { SessionResult, PracticeConfig } from './types';

export interface XPBreakdown {
  base: number;
  accuracyBonus: number;
  streakBonus: number;
  speedBonus: number;
  modeBonus: number;
  total: number;
  multiplier: number;
}

export function calculateXP(session: SessionResult, config?: {
  isLevelComplete?: boolean;
  isBossLevel?: boolean;
  isPersonalBest?: boolean;
  dailyStreakDays?: number;
}): XPBreakdown {
  // Base: 10 XP per correct answer
  const base = session.correct * 10;

  // Accuracy multiplier (punishes below 70%, rewards above 90%)
  const accuracyMult =
    session.accuracy >= 95 ? 1.8 :
    session.accuracy >= 90 ? 1.5 :
    session.accuracy >= 80 ? 1.2 :
    session.accuracy >= 70 ? 1.0 :
    session.accuracy >= 50 ? 0.6 : 0.2;

  const accuracyBonus = Math.floor(base * (accuracyMult - 1));

  // Speed bonus (avg response time in ms)
  const avgMs = session.durationMs / Math.max(session.correct + session.wrong, 1);
  const speedBonus =
    avgMs < 1500 ? Math.floor(base * 0.5) :
    avgMs < 2500 ? Math.floor(base * 0.25) :
    avgMs < 3500 ? Math.floor(base * 0.1) : 0;

  // Streak bonus
  const streakBonus = session.maxStreak >= 20 ? Math.floor(base * 0.5)
    : session.maxStreak >= 10 ? Math.floor(base * 0.3)
    : session.maxStreak >= 5 ? Math.floor(base * 0.15) : 0;

  // Mode bonus
  let modeBonus = 0;
  if (config?.isLevelComplete) modeBonus += 100;
  if (config?.isBossLevel) modeBonus += 200;
  if (config?.isPersonalBest) modeBonus += 150;

  // Daily streak multiplier (caps at 2x for 30-day streak)
  const streakDays = config?.dailyStreakDays || 1;
  const multiplier = Math.min(1 + (streakDays * 0.03), 2.0);

  const subtotal = base + accuracyBonus + speedBonus + streakBonus + modeBonus;
  const total = Math.floor(subtotal * multiplier);

  return { base, accuracyBonus, speedBonus, streakBonus, modeBonus, total, multiplier };
}

export function getStarsFromScore(score: number, level: { star1Score: number, star2Score: number, star3Score: number }): 0|1|2|3 {
  if (score >= level.star3Score) return 3;
  if (score >= level.star2Score) return 2;
  if (score >= level.star1Score) return 1;
  return 0;
}
