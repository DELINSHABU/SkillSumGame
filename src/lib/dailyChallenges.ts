import type { DailyChallenge, ChallengeTask } from './types';

// Generates today's 3 challenges deterministically based on date
// Same date = same challenges for all players
export function generateDailyChallenge(date: string): DailyChallenge {
  // Use date as seed for deterministic generation
  const seed = hashDate(date);

  const templates: ChallengeTask[] = [
    {
      id: 'c1', description: 'Get 20 correct in Addition (60s)',
      type: 'score', target: 20, completed: false,
      practiceConfig: { mode: 'time', timeLimit: 60, operators: ['+'], numberRange: [1, 50] }
    },
    {
      id: 'c2', description: 'Achieve 85%+ accuracy in Multiplication',
      type: 'accuracy', target: 85, completed: false,
      practiceConfig: { mode: 'count', targetCount: 20, operators: ['×'], numberRange: [1, 12] }
    },
    {
      id: 'c3', description: 'Complete a 10-answer streak',
      type: 'streak', target: 10, completed: false
    },
  ];

  return {
    id: `daily_${date}`,
    date,
    challenges: templates.map((t, i) => ({
      ...t,
      id: `${date}_c${i + 1}`
    })),
    completed: false,
    xpReward: 2000,
    badgeReward: undefined,
  };
}

function hashDate(date: string): number {
  return date.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
