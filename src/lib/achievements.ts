import type { Achievement } from './types';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  // First Steps
  { id: 'first_answer', name: 'First Answer', description: 'Answer your first question', icon: '🎯', category: 'firstSteps', condition: { type: 'totalCorrect', threshold: 1 } },
  { id: 'first_level', name: 'Level Up!', description: 'Complete your first level', icon: '🏅', category: 'firstSteps', condition: { type: 'levelComplete', levelId: 1 } },
  { id: 'first_world', name: 'World 1 Done', description: 'Complete all levels in World 1', icon: '🌍', category: 'firstSteps', condition: { type: 'worldComplete', worldId: 1 } },

  // Speed
  { id: 'speed_1s', name: 'Lightning Fast', description: 'Average under 1 second per answer in a session', icon: '⚡', category: 'speed', condition: { type: 'speed', threshold: 1000 } },
  { id: 'speed_2s', name: 'Quick Thinker', description: 'Average under 2 seconds per answer', icon: '🚀', category: 'speed', condition: { type: 'speed', threshold: 2000 } },

  // Accuracy
  { id: 'perfect_session', name: 'Perfect!', description: 'Complete a session with 100% accuracy', icon: '💯', category: 'accuracy', condition: { type: 'accuracy', threshold: 100 } },
  { id: 'accuracy_95', name: 'Sharp Mind', description: 'Complete a session with 95%+ accuracy', icon: '🎯', category: 'accuracy', condition: { type: 'accuracy', threshold: 95 } },

  // Streaks
  { id: 'streak_5', name: 'On Fire!', description: 'Get 5 correct in a row', icon: '🔥', category: 'streaks', condition: { type: 'streak', threshold: 5 } },
  { id: 'streak_10', name: 'Unstoppable', description: 'Get 10 correct in a row', icon: '💥', category: 'streaks', condition: { type: 'streak', threshold: 10 } },
  { id: 'streak_25', name: 'Legendary', description: 'Get 25 correct in a row', icon: '👑', category: 'streaks', condition: { type: 'streak', threshold: 25 } },
  { id: 'daily_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '📅', category: 'streaks', condition: { type: 'custom' } },
  { id: 'daily_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🗓️', category: 'streaks', condition: { type: 'custom' } },
  { id: 'daily_100', name: 'Centurion', description: 'Maintain a 100-day streak', icon: '🏆', category: 'streaks', condition: { type: 'custom' } },

  // Mastery
  { id: 'total_100', name: 'Centurion Answers', description: 'Answer 100 questions total', icon: '💯', category: 'mastery', condition: { type: 'totalCorrect', threshold: 100 } },
  { id: 'total_1000', name: 'Thousand Club', description: 'Answer 1,000 questions total', icon: '🎰', category: 'mastery', condition: { type: 'totalCorrect', threshold: 1000 } },
  { id: 'total_10000', name: 'Ten Thousand!', description: 'Answer 10,000 questions total', icon: '🌟', category: 'mastery', condition: { type: 'totalCorrect', threshold: 10000 } },
  { id: 'all_worlds', name: 'World Traveler', description: 'Unlock all 8 worlds', icon: '🗺️', category: 'mastery', condition: { type: 'custom' } },
  { id: 'level_400', name: 'Grand Master', description: 'Complete level 400', icon: '👑', category: 'elite', condition: { type: 'levelComplete', levelId: 400 } },

  // Account Level milestones
  { id: 'acc_level_10', name: 'Veteran', description: 'Reach account level 10', icon: '⭐', category: 'mastery', condition: { type: 'accountLevel', threshold: 10 } },
  { id: 'acc_level_50', name: 'Expert', description: 'Reach account level 50', icon: '🌟', category: 'elite', condition: { type: 'accountLevel', threshold: 50 } },
  { id: 'acc_level_100', name: 'Legend', description: 'Reach account level 100', icon: '🏅', category: 'elite', condition: { type: 'accountLevel', threshold: 100 } },

  // Hidden
  { id: 'night_owl', name: 'Night Owl', description: '???', icon: '🦉', category: 'hidden', secret: true, condition: { type: 'custom' } }, // play after midnight
  { id: 'early_bird', name: 'Early Bird', description: '???', icon: '🐦', category: 'hidden', secret: true, condition: { type: 'custom' } }, // play before 7am
];

// Check which achievements to unlock after a session
export function checkAchievements(
  achievements: Achievement[],
  context: {
    totalCorrect: number;
    sessionAccuracy: number;
    sessionMaxStreak: number;
    sessionAvgMs: number;
    accountLevel: number;
    dailyStreak: number;
    lastCompletedLevelId?: number;
    lastCompletedWorldId?: number;
  }
): string[] {
  const newlyUnlocked: string[] = [];

  for (const a of achievements) {
    if (a.unlockedAt) continue; // already unlocked

    let shouldUnlock = false;
    const { condition } = a;

    switch (condition.type) {
      case 'totalCorrect':
        shouldUnlock = context.totalCorrect >= (condition.threshold || 0);
        break;
      case 'accuracy':
        shouldUnlock = context.sessionAccuracy >= (condition.threshold || 100);
        break;
      case 'streak':
        shouldUnlock = context.sessionMaxStreak >= (condition.threshold || 0);
        break;
      case 'speed':
        shouldUnlock = context.sessionAvgMs <= (condition.threshold || 0);
        break;
      case 'accountLevel':
        shouldUnlock = context.accountLevel >= (condition.threshold || 0);
        break;
      case 'levelComplete':
        shouldUnlock = context.lastCompletedLevelId === condition.levelId;
        break;
      case 'worldComplete':
        shouldUnlock = context.lastCompletedWorldId === condition.worldId;
        break;
      case 'custom':
        // Handle special cases elsewhere
        break;
    }

    if (shouldUnlock) newlyUnlocked.push(a.id);
  }

  return newlyUnlocked;
}
