// ============================================================
// SKILL TYPES
// ============================================================
export type OperationType = '+' | '-' | '×' | '÷';

export type SkillType =
  | 'makeTen'
  | 'addTen'
  | 'addNine'
  | 'addEight'
  | 'doubles'
  | 'nearDoubles'
  | 'subtractTen'
  | 'subtractNine'
  | 'multiplyByTwo'
  | 'multiplyByFive'
  | 'multiplyByTen'
  | 'multiplyByEleven'
  | 'integerDivision'
  | 'random';

export type LevelType = 'intro' | 'standard' | 'boss' | 'bonus' | 'speedrun' | 'review';

export type Difficulty = 'easy' | 'medium' | 'hard';

// ============================================================
// LEVEL DEFINITION
// ============================================================
export interface GenerationParams {
  operators: OperationType[];
  numberRange: [number, number];
  skill: SkillType;
  fixedOperand?: number;
  fixedOperandPosition?: 'first' | 'second';
}

export interface Level {
  id: number;
  worldId: number;           // 1-8
  worldName: string;
  title: string;
  description: string;
  tip: string;
  tipDiagram?: TipDiagram;   // optional animated diagram config
  type: LevelType;
  targetScore: number;       // correct answers for 3 stars
  star1Score: number;        // 1 star threshold
  star2Score: number;        // 2 star threshold
  star3Score: number;        // 3 star threshold
  timeLimit?: number;        // seconds, undefined = no timer
  generationParams: GenerationParams;
  unlockRequirement?: number; // level id that must be passed first
}

export interface TipDiagram {
  steps: string[];            // text steps in the animation
  example: string;            // "27 + 9 = ?"
  solution: string[];         // ["27 + 10 = 37", "37 - 1 = 36"]
}

// ============================================================
// USER PROGRESS
// ============================================================
export type StarCount = 0 | 1 | 2 | 3;

export interface LevelMastery {
  levelId: number;
  stars: StarCount;
  bestScore: number;
  bestAccuracy: number;       // 0-100
  bestTimeMs: number;         // fastest completion time
  attempts: number;
  lastPlayedAt: string;       // ISO date
  weakSkillsDetected: SkillType[];
}

export interface UserProfile {
  username: string;
  avatarEmoji: string;
  xp: number;
  accountLevel: number;       // 1-100
  dailyStreak: number;
  lastStreakDate: string;      // ISO date — used to check if streak continues
  dailyXPEarned: number;      // resets each day
  dailyGoalMinutes: number;   // user-set (5/10/20)
  onboardingComplete: boolean;
  mathLevel: 'beginner' | 'intermediate' | 'confident';
  createdAt: string;
}

// ============================================================
// MASTERY DATA (stored separately for performance)
// ============================================================
export type MasteryMap = Record<number, LevelMastery>; // levelId → mastery

// ============================================================
// SESSION TRACKING
// ============================================================
export interface QuestionAttempt {
  question: string;
  correctAnswer: number;
  userAnswer: number | null;
  isCorrect: boolean;
  responseMs: number;         // time from question shown to answer submitted
  skill: SkillType;
  operator: OperationType;
}

export interface SessionResult {
  id: string;                 // uuid
  mode: 'learn' | 'practice' | 'daily';
  levelId?: number;           // for learn/daily modes
  practiceConfig?: PracticeConfig; // for practice mode
  startedAt: string;
  durationMs: number;
  attempts: QuestionAttempt[];
  correct: number;
  wrong: number;
  accuracy: number;           // 0-100
  maxStreak: number;
  xpEarned: number;
  starsEarned?: StarCount;    // for learn mode
  isPersonalBest?: boolean;   // for practice mode
}

// ============================================================
// PRACTICE MODE
// ============================================================
export type PracticeMode = 'time' | 'count' | 'zen';

export interface PracticeConfig {
  mode: PracticeMode;
  timeLimit?: number;         // seconds, for 'time' mode
  targetCount?: number;       // correct answers, for 'count' mode
  operators: OperationType[];
  numberRange: [number, number];
}

export interface PersonalBest {
  configKey: string;          // serialized config key
  score: number;
  accuracy: number;
  achievedAt: string;
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
export type AchievementCategory =
  | 'firstSteps'
  | 'speed'
  | 'accuracy'
  | 'streaks'
  | 'mastery'
  | 'elite'
  | 'hidden';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;               // emoji
  category: AchievementCategory;
  unlockedAt?: string;        // ISO date, undefined = locked
  secret?: boolean;           // hidden until unlocked
  // Unlock condition (checked after each session)
  condition: {
    type: 'totalCorrect' | 'streak' | 'accuracy' | 'speed' | 'levelComplete' | 'worldComplete' | 'accountLevel' | 'custom';
    threshold?: number;
    levelId?: number;
    worldId?: number;
  };
}

// ============================================================
// DAILY CHALLENGES
// ============================================================
export interface DailyChallenge {
  id: string;
  date: string;               // YYYY-MM-DD
  challenges: ChallengeTask[];
  completed: boolean;
  xpReward: number;
  badgeReward?: string;       // achievement id
}

export interface ChallengeTask {
  id: string;
  description: string;
  type: 'score' | 'accuracy' | 'level' | 'streak';
  target: number;
  completed: boolean;
  practiceConfig?: PracticeConfig; // if type is 'score'
  levelId?: number;           // if type is 'level'
}

// ============================================================
// APP STATE
// ============================================================
export type AppScreen =
  | 'onboarding'
  | 'home'
  | 'worldSelect'
  | 'worldMap'
  | 'levelDetail'
  | 'preLesson'
  | 'playing'
  | 'postLesson'
  | 'practiceSetup'
  | 'practicing'
  | 'practiceResults'
  | 'dailyChallenge'
  | 'profile';

export interface AppState {
  screen: AppScreen;
  profile: UserProfile;
  masteryMap: MasteryMap;
  currentLevel: Level | null;
  currentPracticeConfig: PracticeConfig | null;
  currentSession: Partial<SessionResult> | null;
  practiceHistory: SessionResult[];
  achievements: Achievement[];
  todayChallenge: DailyChallenge | null;
  personalBests: PersonalBest[];
}
