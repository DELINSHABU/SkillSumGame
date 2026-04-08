import type { QuestionAttempt, SkillType } from './types';

interface SkillStats {
  correct: number;
  wrong: number;
  totalMs: number;
  count: number;
}

export interface WeakSpotReport {
  skill: SkillType;
  accuracy: number;
  avgMs: number;
  isWeak: boolean;
  reason: 'low_accuracy' | 'slow_speed' | 'both';
}

const ACCURACY_THRESHOLD = 70; // below this = weak
const SPEED_THRESHOLD_MS = 4000; // above this = slow

export function detectWeakSpots(attempts: QuestionAttempt[]): WeakSpotReport[] {
  const stats: Record<string, SkillStats> = {};

  for (const attempt of attempts) {
    if (!stats[attempt.skill]) {
      stats[attempt.skill] = { correct: 0, wrong: 0, totalMs: 0, count: 0 };
    }
    const s = stats[attempt.skill];
    s.count++;
    s.totalMs += attempt.responseMs;
    if (attempt.isCorrect) s.correct++;
    else s.wrong++;
  }

  return Object.entries(stats)
    .filter(([, s]) => s.count >= 3) // need at least 3 attempts to judge
    .map(([skill, s]) => {
      const accuracy = (s.correct / s.count) * 100;
      const avgMs = s.totalMs / s.count;
      const lowAccuracy = accuracy < ACCURACY_THRESHOLD;
      const slowSpeed = avgMs > SPEED_THRESHOLD_MS;
      return {
        skill: skill as SkillType,
        accuracy,
        avgMs,
        isWeak: lowAccuracy || slowSpeed,
        reason: (lowAccuracy && slowSpeed) ? 'both' : lowAccuracy ? 'low_accuracy' : 'slow_speed'
      };
    })
    .filter(r => r.isWeak);
}
