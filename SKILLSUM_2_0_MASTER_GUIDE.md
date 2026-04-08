# SkillSum 2.0 — Master Game Design & Conversion Guide

> **Purpose:** This document is your complete reference for converting SkillSum v1 into a full-featured mental math learning platform. Follow it top-to-bottom. Every section builds on the previous one.

---

## Table of Contents

1. [Game Vision & Philosophy](#1-game-vision--philosophy)
2. [Complete User Flow](#2-complete-user-flow)
3. [Feature List — What's Included](#3-feature-list--whats-included)
4. [The 400-Level Curriculum Design](#4-the-400-level-curriculum-design)
5. [Architecture Overview](#5-architecture-overview)
6. [Step-by-Step Conversion Guide](#6-step-by-step-conversion-guide)
   - [Step 1 — Project Setup & Cleanup](#step-1--project-setup--cleanup)
   - [Step 2 — Data Layer & Types](#step-2--data-layer--types)
   - [Step 3 — The 400-Level Data File](#step-3--the-400-level-data-file)
   - [Step 4 — User Profile & Persistence](#step-4--user-profile--persistence)
   - [Step 5 — XP & Leveling System](#step-5--xp--leveling-system)
   - [Step 6 — Achievement System](#step-6--achievement-system)
   - [Step 7 — Weak Spot Detection](#step-7--weak-spot-detection)
   - [Step 8 — Daily Challenge System](#step-8--daily-challenge-system)
   - [Step 9 — World Map Component](#step-9--world-map-component)
   - [Step 10 — Pre-Lesson Screen](#step-10--pre-lesson-screen)
   - [Step 11 — In-Game Progress Bar](#step-11--in-game-progress-bar)
   - [Step 12 — Redesign GameScreen](#step-12--redesign-gamescreen)
   - [Step 13 — Post-Lesson Results Screen](#step-13--post-lesson-results-screen)
   - [Step 14 — Practice Mode (Monkeytype-style)](#step-14--practice-mode-monkeytype-style)
   - [Step 15 — Practice Results & Graphs](#step-15--practice-results--graphs)
   - [Step 16 — Profile Screen](#step-16--profile-screen)
   - [Step 17 — Refactor SkillSumGame.tsx (Main Orchestrator)](#step-17--refactor-skillsumgametsx-main-orchestrator)
   - [Step 18 — Animations & Sound Polish](#step-18--animations--sound-polish)
   - [Step 19 — Mobile & PWA Polish](#step-19--mobile--pwa-polish)
   - [Step 20 — Testing Checklist](#step-20--testing-checklist)
7. [File Structure Reference](#7-file-structure-reference)
8. [Design System & UI Tokens](#8-design-system--ui-tokens)
9. [Common Pitfalls & Notes](#9-common-pitfalls--notes)

---

## 1. Game Vision & Philosophy

### What SkillSum 2.0 Is

SkillSum 2.0 is a **dual-mode mental math mastery platform** that teaches real mental math shortcuts — not just rote practice.

It combines:
- **TypingClub's structured learning** — sequential levels, skill-by-skill progression, mastery gates
- **Monkeytype's addictive free-play** — personal bests, statistics, zen mode, clean UI
- **Duolingo's engagement loop** — daily streaks, XP, levels, achievements, daily challenges

### Core Design Principles

| Principle | What it means in practice |
|---|---|
| **Accuracy before speed** | No timer in early levels. Stars reward accuracy first. |
| **Teach, then test** | Every level opens with a tip screen explaining the trick |
| **Micro-progress** | In-game progress bar shows real-time star thresholds |
| **Weakness targeting** | System detects slow/incorrect skills and drills them |
| **Two paths** | Learn Mode for growth. Practice Mode for obsession. |
| **Satisfying feedback** | Sound + animation at every milestone |

### Who It's For

- **Beginners** (World 1): Students who can barely add single digits
- **Intermediate** (Worlds 2–5): People who want to be faster at everyday math
- **Advanced** (Worlds 6–8): Competitive users who want elite mental math speed
- **Free-players**: People who just want to practice a specific skill

---

## 2. Complete User Flow

### 2.1 First-Time User Journey

```
[LANDING]
    │
    ▼
[ONBOARDING — 3 screens]
    ├── Screen 1: "What's your math level?" (beginner / some skills / confident)
    ├── Screen 2: "Set your daily goal" (5 min / 10 min / 20 min)
    └── Screen 3: "Enter your name" + choose avatar emoji
    │
    ▼
[HOME SCREEN]
    ├── Daily Challenge card (top — most prominent)
    ├── "Continue Learning" button → resumes last level
    ├── Quick stats: Streak 🔥, XP today ⚡, Level badge
    ├── [Learn Mode] big button
    └── [Practice Mode] secondary button
```

### 2.2 Learn Mode Flow (TypingClub-style)

```
[HOME] → [Learn Mode]
    │
    ▼
[WORLD SELECT SCREEN]
    ├── Shows 8 worlds as large cards
    ├── Each card: World name, progress bar, locked/unlocked state
    └── First world auto-selected for new users
    │
    ▼
[WORLD MAP]
    ├── Visual path connecting all 50 levels in this world
    ├── Each level = circular node on the path
    │   ├── ⭐⭐⭐ = gold (fully mastered)
    │   ├── ⭐⭐☆ = silver (good)
    │   ├── ⭐☆☆ = bronze (passed)
    │   ├── ○ = unlocked (not yet played)
    │   └── 🔒 = locked (previous level not passed)
    ├── "Boss" levels (every 10th) are larger nodes
    └── Tap any unlocked level → Level Detail
    │
    ▼
[LEVEL DETAIL POPUP]
    ├── Level title and description
    ├── Star target thresholds (e.g., "★ = 8, ★★ = 12, ★★★ = 16")
    ├── Time limit (if any)
    ├── Your best: X stars, X score
    └── [START] button
    │
    ▼
[PRE-LESSON / TIP SCREEN]
    ├── Skill being taught (large heading)
    ├── Animated diagram showing the trick step-by-step
    ├── One interactive "try it" example
    └── [I'm Ready — Start!] button
    │
    ▼
[GAMEPLAY SCREEN]
    ├── Top bar: Level name | Stars progress bar | Timer (if applicable)
    ├── Center: Question displayed large
    ├── Bottom: Number input + Submit button
    ├── Side: Current score, streak flame
    ├── Progress bar fills as you answer correctly
    └── Star icons animate at threshold crossings (⭐ earned!)
    │
    ▼
[POST-LESSON RESULTS]
    ├── Stars earned (animated reveal 1 by 1)
    ├── Score breakdown: Correct / Wrong / Accuracy %
    ├── Speed graph: answers per 10-second block (bar chart)
    ├── Best streak in session
    ├── XP earned (with multipliers shown)
    ├── If weak spots detected: "You were slow on ÷ by 7" banner
    ├── [Practice Weak Spots] → auto-generated drill
    ├── [Retry Level] (to get more stars)
    └── [Next Level] (continues the path)
```

### 2.3 Practice Mode Flow (Monkeytype-style)

```
[HOME] → [Practice Mode]
    │
    ▼
[PRACTICE CONFIGURATOR]
    ├── MODE row:    [Time Attack] [Score Target] [Zen Mode] [Custom]
    ├── TIME row:    [15s] [30s] [60s] [120s] (shown for Time Attack)
    ├── TARGET row:  [10] [25] [50] [100] correct (shown for Score Target)
    ├── OPS row:     [+] [-] [×] [÷] [All] — multi-select
    ├── RANGE row:   [Easy 1-15] [Medium 1-30] [Hard 1-50] [Custom]
    └── Personal Best badge for current config (updates live as you change settings)
    │
    ▼
[PRACTICE SESSION]
    ├── Minimal UI — question dominates screen
    ├── Live stats at top: score | accuracy | time remaining
    ├── No level-up bars — pure speed/accuracy focus
    └── ESC or swipe = pause
    │
    ▼
[PRACTICE RESULTS]
    ├── Large score display
    ├── Accuracy %, Avg response time, Max streak
    ├── Per-second performance graph (line chart)
    ├── PB badge if new personal best achieved
    ├── Operation breakdown: which ops were fastest/slowest
    ├── [Retry Same Config] | [Change Settings] | [Home]
    └── Saves to history (last 100 sessions tracked)
```

### 2.4 Daily Challenge Flow

```
[HOME] — Daily Challenge card visible
    │
    ▼
[DAILY CHALLENGE SCREEN]
    ├── 3 challenges for the day:
    │   ├── Challenge 1: "Get 20 correct in Addition in 60s"
    │   ├── Challenge 2: "Achieve 90%+ accuracy in Multiplication"
    │   └── Challenge 3: "Complete Level X in World Y"
    ├── Progress: 0/3 complete, ██░░░ bar
    ├── Reward preview: "Complete all 3 → 2000 XP + 🏅 Daily Hero badge"
    └── [Start Challenge 1] button
    │
    ▼
[CHALLENGE GAMEPLAY — same as normal session]
    │
    ▼
[CHALLENGE COMPLETE POPUP]
    ├── Challenge result, XP awarded
    ├── "2/3 complete — 1 more today!"
    └── Returns to Daily Challenge screen
```

### 2.5 Profile & Progress Flow

```
[HOME] → [Profile Icon]
    │
    ▼
[PROFILE SCREEN]
    ├── Avatar emoji + username
    ├── Account Level badge (1-100) + XP progress bar to next level
    ├── Streak display: 🔥 23 days
    ├── Tab: [Stats] [Achievements] [History]
    │
    ├── STATS TAB:
    │   ├── Total questions answered, Total correct, All-time accuracy
    │   ├── World completion bars (World 1: 34/50 levels)
    │   ├── Weak skills: "You score 68% on ÷ operations"
    │   └── Best practice session stats
    │
    ├── ACHIEVEMENTS TAB:
    │   ├── Unlocked achievements (with date)
    │   └── Locked achievements (blurred, shows how to unlock)
    │
    └── HISTORY TAB:
        ├── Last 20 sessions
        └── Tap any session → full stats
```

---

## 3. Feature List — What's Included

### Learn Mode Features

| Feature | Description | Priority |
|---|---|---|
| 400-level curriculum | 8 worlds × 50 levels | Core |
| World map UI | Visual path with star-rated nodes | Core |
| Pre-lesson tip screen | Animated trick explanation | Core |
| In-game progress bar | Real-time star thresholds | Core |
| Star rating (0–3) | Based on score vs target | Core |
| Level unlock gates | Must pass to advance | Core |
| Boss levels | Every 10th level, harder | High |
| Bonus levels | Unlocked with perfect stars | Medium |
| Replay levels | Always accessible to improve stars | Core |
| Weak spot banner | Post-lesson detection | High |
| Practice Missed | Auto-drill on failed questions | High |
| Animated tip diagrams | SVG-animated skill explanation | Medium |

### Practice Mode Features

| Feature | Description | Priority |
|---|---|---|
| Time Attack mode | Fixed countdown, max score | Core |
| Score Target mode | Count up to X correct | Core |
| Zen mode | No timer, no pressure | Core |
| Operation selector | Choose +, -, ×, ÷, or mix | Core |
| Number range picker | Easy / Medium / Hard / Custom | Core |
| Personal bests | Per config combination | Core |
| Performance graph | Per-second accuracy line chart | High |
| Session history | Last 100 sessions | Medium |
| Operation breakdown | Which ops are fastest | Medium |

### Engagement Features

| Feature | Description | Priority |
|---|---|---|
| XP system | Earned every session | Core |
| Account levels 1–100 | XP milestones | Core |
| Daily streak | Login + complete sessions | Core |
| Daily challenges | 3 rotating tasks | High |
| 50+ achievements | Badges for milestones | High |
| Leaderboard | Global and friends | Medium |
| Sound effects | Per-action audio feedback | Core |
| Animations | Level-up, star earn, streaks | Core |
| Confetti | Milestone celebrations | Medium |

---

## 4. The 400-Level Curriculum Design

### World Overview

| World | Theme | Levels | Focus Skills |
|---|---|---|---|
| World 1 | Addition Foundation | 1–50 | Singles, Doubles, +9, +10, 2-digit |
| World 2 | Subtraction Strategies | 51–100 | -9, -10, borrowing, bridging |
| World 3 | Multiplication Mastery | 101–150 | All tables 2–12, ×5, ×10, ×11 |
| World 4 | Division Techniques | 151–200 | All tables reversed, ÷5, ÷10 |
| World 5 | Mixed Operations | 201–250 | +/-, ×/÷, all four mixed |
| World 6 | Number Sense | 251–300 | Estimation, rounding, patterns |
| World 7 | Speed Drills | 301–350 | All previous at increased pace |
| World 8 | Mental Math Elite | 351–400 | 3-digit, mental algebra, mastery |

### Difficulty Ramp Per World (applies to every world)

```
Levels X01–X10:  Introduction — No timer, hints allowed, low target (5-8 correct)
Levels X11–X20:  Foundation   — 90s timer, single skill focus, target 10-12
Levels X21–X30:  Building     — 75s timer, 2 skills mixed, target 12-15
Levels X31–X40:  Challenge    — 60s timer, skill combos, target 15-18
Levels X41–X49:  Speed Runs   — 45s timer, all world skills, target 18-22
Level  X50:      Boss Level   — 90s timer, everything, high target 25+
```

### Level Node Types

```typescript
type LevelType =
  | 'intro'      // First 5 of each world — no timer, hints shown
  | 'standard'   // Most levels — normal gameplay
  | 'boss'       // Every 10th level — harder, more time, high target
  | 'bonus'      // Unlocked by 3-starring adjacent levels
  | 'speedrun'   // Last 5 of each world — short, intense
  | 'review'     // Pulls questions from previous world skills
```

### Sample World 1 Level Sequence

```
L1:  1+1 to 5+5 introduction            | No timer | Target: 5  | Type: intro
L2:  Making 10 — all pairs              | No timer | Target: 8  | Type: intro
L3:  Adding to single digits            | 90s      | Target: 10 | Type: standard
L4:  Doubles 1–9                        | 90s      | Target: 10 | Type: standard
L5:  Near Doubles (e.g., 7+8)          | 90s      | Target: 10 | Type: standard
L6:  Adding 10 to 2-digit numbers      | 75s      | Target: 12 | Type: standard
L7:  Adding 9 trick (+10, -1)          | 75s      | Target: 12 | Type: standard
L8:  Adding 8 trick (+10, -2)          | 75s      | Target: 12 | Type: standard
L9:  Mixed: 9s and 10s                 | 60s      | Target: 14 | Type: standard
L10: BOSS — All Addition Basics        | 90s      | Target: 20 | Type: boss
L11: 2-digit + 1-digit (no carry)     | 75s      | Target: 12 | Type: standard
...
L20: BOSS — 2-digit Addition           | 90s      | Target: 22 | Type: boss
...
L50: WORLD BOSS — Everything           | 90s      | Target: 30 | Type: boss
```

---

## 5. Architecture Overview

### App State Machine

```
States:
  'home'          → Home screen with all navigation
  'onboarding'    → First-time setup (3 screens)
  'worldSelect'   → Choose which world to enter
  'worldMap'      → Visual level map within a world
  'levelDetail'   → Popup with level info before starting
  'preLesson'     → Tip/trick explanation screen
  'playing'       → Active gameplay
  'postLesson'    → Results after Learn Mode level
  'practiceSetup' → Practice mode configurator
  'practicing'    → Active practice session
  'practiceResults' → Results after Practice session
  'dailyChallenge' → Daily challenge hub
  'profile'       → User profile, stats, achievements
  'leaderboard'   → Global scores

Transitions:
  home → worldSelect (Learn Mode)
  home → practiceSetup (Practice Mode)
  home → dailyChallenge (Daily Challenge)
  home → profile (Profile icon)
  worldSelect → worldMap
  worldMap → levelDetail (tap level)
  levelDetail → preLesson (tap Start)
  preLesson → playing
  playing → postLesson (time up / target met)
  postLesson → worldMap (next level)
  postLesson → playing (retry)
  practiceSetup → practicing
  practicing → practiceResults
  practiceResults → practiceSetup
```

### Data Flow

```
localStorage (persistent)
    │
    ├── userProfile.json     ← XP, level, streak, settings
    ├── masteryData.json     ← Per-level stars, scores, attempts
    ├── practiceHistory.json ← Last 100 practice sessions
    ├── achievements.json    ← Unlocked achievements + dates
    └── dailyProgress.json   ← Today's challenge completion

React State (runtime)
    │
    ├── gameState            ← Current app state (enum above)
    ├── currentSession       ← Active session data
    ├── userProfile          ← Loaded from localStorage
    └── sessionStats         ← Per-question tracking (ms, correct, wrong)
```

---

## 6. Step-by-Step Conversion Guide

> Follow each step in order. Each step has: **What to do**, **Exact code to write**, **How to test it**.

---

### Step 1 — Project Setup & Cleanup

**What you're doing:** Remove unused code, add missing dependencies, set up the folder structure for 2.0.

#### 1.1 Install additional dependencies

```bash
npm install recharts
npm install @radix-ui/react-dialog
npm install @radix-ui/react-progress
npm install framer-motion
```

#### 1.2 Create new folder structure

```bash
# From your project root:
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/components/learn
mkdir -p src/components/practice
mkdir -p src/components/shared
mkdir -p src/components/profile
mkdir -p src/components/daily
```

#### 1.3 Files to DELETE (replaced in 2.0)

```
src/components/CampaignMapScreen.tsx   → replaced by WorldMap
src/components/LevelIntroScreen.tsx    → replaced by PreLesson
src/components/EndScreen.tsx           → replaced by PostLesson + PracticeResults
src/components/StartScreen.tsx         → replaced by HomeScreen
src/components/LeaderboardScreen.tsx   → will be rebuilt in Step 16
```

> **Do not delete yet.** Keep them open as reference. Delete after each replacement is built and tested.

#### 1.4 Files to KEEP & MODIFY

```
src/components/SkillSumGame.tsx    → major refactor in Step 17
src/components/GameScreen.tsx      → modify in Step 12
src/components/CircularTimer.tsx   → keep as-is
src/components/ConfettiEffect.tsx  → keep as-is
src/hooks/useSound.ts             → add new sounds in Step 18
src/hooks/useSwipe.ts             → keep as-is
src/app/globals.css               → add new CSS variables in Step 8
src/app/layout.tsx                → minor changes
src/app/page.tsx                  → keep as-is
```

#### How to test Step 1

```
✓ npm run dev starts without errors
✓ Existing game still works
✓ New folders exist in src/
```

---

### Step 2 — Data Layer & Types

**What you're doing:** Define all TypeScript types for the new system. This is the foundation everything else builds on.

#### Create: `src/lib/types.ts`

```typescript
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
```

#### How to test Step 2

```
✓ TypeScript compiler reports no errors in types.ts
✓ Run: npx tsc --noEmit
```

---

### Step 3 — The 400-Level Data File

**What you're doing:** Replace the existing 50-level `levels.ts` with the full 400-level curriculum.

> This is the largest single file. Build it in sections — one world at a time. Here's the template and the first world fully written.

#### Create: `src/lib/levels.ts` (replace existing)

```typescript
import type { Level } from './types';

// Helper to generate level ids cleanly
// World 1 = IDs 1-50, World 2 = 51-100, etc.
const w = (worldId: number, localId: number): number =>
  (worldId - 1) * 50 + localId;

const WORLDS = {
  1: "World 1: Addition Foundation",
  2: "World 2: Subtraction Strategies",
  3: "World 3: Multiplication Mastery",
  4: "World 4: Division Techniques",
  5: "World 5: Mixed Operations",
  6: "World 6: Number Sense & Patterns",
  7: "World 7: Speed Drills",
  8: "World 8: Mental Math Elite",
};

// ============================================================
// WORLD 1 — ADDITION FOUNDATION (Levels 1-50)
// ============================================================
const world1Levels: Level[] = [
  {
    id: w(1,1), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "First Steps: Adding Small Numbers",
    description: "Welcome! Let's start with the most basic addition.",
    tip: "Count up from the bigger number. For 3 + 5, start at 5 and count up 3: 6, 7, 8.",
    tipDiagram: {
      steps: ["Look at the bigger number", "Count up from it", "That's your answer!"],
      example: "3 + 5 = ?",
      solution: ["Start at 5", "Count: 6, 7, 8", "Answer: 8"]
    },
    targetScore: 5, star1Score: 3, star2Score: 4, star3Score: 5,
    timeLimit: undefined,
    generationParams: { operators: ['+'], numberRange: [1, 5], skill: 'random' }
  },
  {
    id: w(1,2), worldId: 1, worldName: WORLDS[1], type: 'intro',
    title: "Making Ten",
    description: "Knowing which numbers add to exactly 10 is one of the most powerful skills.",
    tip: "Memorize these pairs: 1+9, 2+8, 3+7, 4+6, 5+5. These are your 'Make 10' friends!",
    tipDiagram: {
      steps: ["1+9=10", "2+8=10", "3+7=10", "4+6=10", "5+5=10"],
      example: "3 + ? = 10",
      solution: ["3 + 7 = 10", "The missing number is 7"]
    },
    targetScore: 8, star1Score: 4, star2Score: 6, star3Score: 8,
    timeLimit: undefined,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'makeTen' }
  },
  {
    id: w(1,3), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Adding to Single Digits",
    description: "Practice adding any two single-digit numbers confidently.",
    tip: "Always start counting from the BIGGER number. It saves steps!",
    targetScore: 10, star1Score: 6, star2Score: 8, star3Score: 10,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'random' }
  },
  {
    id: w(1,4), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Doubles",
    description: "Adding a number to itself — your first mental shortcut!",
    tip: "Memorize these: 1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10, 6+6=12, 7+7=14, 8+8=16, 9+9=18",
    tipDiagram: {
      steps: ["A double is a number + itself", "Think of it as 2 groups"],
      example: "7 + 7 = ?",
      solution: ["7 + 7 = 14", "Two groups of 7"]
    },
    targetScore: 10, star1Score: 6, star2Score: 8, star3Score: 10,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [1, 9], skill: 'doubles' }
  },
  {
    id: w(1,5), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Near Doubles",
    description: "What if the numbers are almost the same? Use your doubles!",
    tip: "For 7+8: think '7+7=14, then add 1 more = 15'. Use the double closest to both numbers.",
    tipDiagram: {
      steps: ["Spot that the numbers are close", "Use the double you know", "Add or subtract the difference"],
      example: "7 + 8 = ?",
      solution: ["7 + 7 = 14 (known double)", "14 + 1 = 15", "Answer: 15"]
    },
    targetScore: 10, star1Score: 6, star2Score: 8, star3Score: 10,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [3, 9], skill: 'nearDoubles' }
  },
  {
    id: w(1,6), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 10' Rule",
    description: "Adding 10 is one of the simplest tricks. Master it!",
    tip: "To add 10, just increase the TENS digit by 1. The ones digit stays the same. 23+10=33.",
    tipDiagram: {
      steps: ["Find the tens digit", "Add 1 to it", "Ones digit stays the same"],
      example: "47 + 10 = ?",
      solution: ["Tens digit is 4 → becomes 5", "Ones digit stays 7", "Answer: 57"]
    },
    targetScore: 12, star1Score: 7, star2Score: 10, star3Score: 12,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 60], skill: 'addTen', fixedOperand: 10 }
  },
  {
    id: w(1,7), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 9' Trick",
    description: "9 is just one less than 10. Use that!",
    tip: "To add 9: add 10 first, then subtract 1. Much faster than counting! Example: 27+9 = 27+10-1 = 37-1 = 36.",
    tipDiagram: {
      steps: ["Add 10 instead of 9", "Then subtract 1"],
      example: "34 + 9 = ?",
      solution: ["34 + 10 = 44 (easy!)", "44 - 1 = 43", "Answer: 43"]
    },
    targetScore: 12, star1Score: 7, star2Score: 10, star3Score: 12,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'addNine', fixedOperand: 9 }
  },
  {
    id: w(1,8), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "The 'Adding 8' Trick",
    description: "Same idea as adding 9, but subtract 2.",
    tip: "To add 8: add 10, then subtract 2. Example: 35+8 = 35+10-2 = 45-2 = 43.",
    tipDiagram: {
      steps: ["Add 10 instead of 8", "Then subtract 2"],
      example: "27 + 8 = ?",
      solution: ["27 + 10 = 37", "37 - 2 = 35", "Answer: 35"]
    },
    targetScore: 12, star1Score: 7, star2Score: 10, star3Score: 12,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'addEight', fixedOperand: 8 }
  },
  {
    id: w(1,9), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "Mixed: 8s, 9s, and 10s",
    description: "Now let's mix all three tricks together!",
    tip: "Before answering, decide: am I adding 8 (add 10, -2), 9 (add 10, -1), or 10 (just +1 to tens)?",
    targetScore: 14, star1Score: 8, star2Score: 11, star3Score: 14,
    timeLimit: 60,
    generationParams: { operators: ['+'], numberRange: [11, 60], skill: 'random' }
  },
  {
    id: w(1,10), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "BOSS: Addition Basics Champion",
    description: "Show what you've learned so far! This is your first boss level.",
    tip: "Stay calm. Use the trick that fits each question. You've got this!",
    targetScore: 20, star1Score: 10, star2Score: 15, star3Score: 20,
    timeLimit: 90,
    generationParams: { operators: ['+'], numberRange: [1, 60], skill: 'random' }
  },
  // Levels 11-50 follow the same pattern, building towards 2-digit addition
  // ... (continue for all 50 levels following the ramp pattern)
  // For brevity, levels 11-50 are shown as template entries:
  {
    id: w(1,11), worldId: 1, worldName: WORLDS[1], type: 'standard',
    title: "2-Digit + 1-Digit (No Carry)",
    description: "Adding a small number to a 2-digit number.",
    tip: "Split it: add the ones digits first, then combine. 43+5 = 40+(3+5) = 40+8 = 48.",
    targetScore: 12, star1Score: 7, star2Score: 10, star3Score: 12,
    timeLimit: 75,
    generationParams: { operators: ['+'], numberRange: [10, 50], skill: 'random' }
  },
  // ... Continue through L50 (World 1 Boss)
  {
    id: w(1,50), worldId: 1, worldName: WORLDS[1], type: 'boss',
    title: "WORLD BOSS: Addition Master",
    description: "The final test for World 1. Prove you've mastered all addition tricks!",
    tip: "Every trick you've learned is fair game. Trust your instincts.",
    targetScore: 30, star1Score: 15, star2Score: 22, star3Score: 30,
    timeLimit: 120,
    generationParams: { operators: ['+'], numberRange: [1, 99], skill: 'random' }
  },
];

// ============================================================
// WORLD 2–8: Follow same pattern
// Build each world in the same structure as World 1
// Adjust: numberRange, skill types, operators per world theme
// ============================================================

// Export all levels combined
export const ALL_LEVELS: Level[] = [
  ...world1Levels,
  // ...world2Levels,
  // ...world3Levels,
  // ...world4Levels,
  // ...world5Levels,
  // ...world6Levels,
  // ...world7Levels,
  // ...world8Levels,
];

export const getLevelById = (id: number): Level | undefined =>
  ALL_LEVELS.find(l => l.id === id);

export const getLevelsByWorld = (worldId: number): Level[] =>
  ALL_LEVELS.filter(l => l.worldId === worldId);

export const getNextLevel = (currentId: number): Level | undefined => {
  const current = getLevelById(currentId);
  if (!current) return undefined;
  return ALL_LEVELS.find(l => l.id === currentId + 1 && l.worldId === current.worldId)
    || ALL_LEVELS.find(l => l.worldId === current.worldId + 1 && l.id === (current.worldId) * 50 + 1);
};

export const WORLDS_META = [
  { id: 1, name: "Addition Foundation", icon: "➕", color: "#ff8fab" },
  { id: 2, name: "Subtraction Strategies", icon: "➖", color: "#ff9f1c" },
  { id: 3, name: "Multiplication Mastery", icon: "✖️", color: "#2ec4b6" },
  { id: 4, name: "Division Techniques", icon: "➗", color: "#7b2d8b" },
  { id: 5, name: "Mixed Operations", icon: "🔀", color: "#e63946" },
  { id: 6, name: "Number Sense", icon: "🧠", color: "#457b9d" },
  { id: 7, name: "Speed Drills", icon: "⚡", color: "#f72585" },
  { id: 8, name: "Mental Math Elite", icon: "🏆", color: "#1d3557" },
];
```

> **Build Note:** Fill in worlds 2-8 following the same pattern. Each world has 50 levels. The `id` helper `w(worldId, localId)` handles the ID math automatically.

#### How to test Step 3

```
✓ Import ALL_LEVELS in a test component, console.log its length
✓ getLevelById(1) returns World 1, Level 1
✓ getLevelsByWorld(1) returns 50 levels
✓ No TypeScript errors
```

---

### Step 4 — User Profile & Persistence

**What you're doing:** Create the hook that manages all user data in localStorage.

#### Create: `src/hooks/useUserProfile.ts`

```typescript
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
```

#### How to test Step 4

```
✓ Import and call useUserProfile in a test component
✓ Profile saves to localStorage after updateProfile()
✓ recordSession() increments XP correctly
✓ Streak logic works: play today → streak 1, play tomorrow → streak 2
```

---

### Step 5 — XP & Leveling System

**What you're doing:** Create the XP calculation logic.

#### Create: `src/lib/xp.ts`

```typescript
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
```

---

### Step 6 — Achievement System

**What you're doing:** Define all 50 achievements and the checking logic.

#### Create: `src/lib/achievements.ts`

```typescript
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
```

---

### Step 7 — Weak Spot Detection

#### Create: `src/lib/weakSpots.ts`

```typescript
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
```

---

### Step 8 — Daily Challenge System

#### Create: `src/lib/dailyChallenges.ts`

```typescript
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
```

---

### Step 9 — World Map Component

#### Create: `src/components/learn/WorldMap.tsx`

```tsx
'use client';

import { useMemo } from 'react';
import type { Level, MasteryMap, StarCount } from '@/lib/types';

interface WorldMapProps {
  worldId: number;
  levels: Level[];
  masteryMap: MasteryMap;
  onLevelSelect: (level: Level) => void;
  onBack: () => void;
}

export function WorldMap({ worldId, levels, masteryMap, onLevelSelect, onBack }: WorldMapProps) {
  const levelStatus = useMemo(() => {
    return levels.map((level, index) => {
      const mastery = masteryMap[level.id];
      const stars: StarCount = mastery?.stars || 0;

      // Unlock logic: level 1 is always unlocked, others need previous completed
      const isUnlocked = index === 0 || !!(masteryMap[levels[index - 1]?.id]?.stars);

      return { level, stars, isUnlocked };
    });
  }, [levels, masteryMap]);

  const worldProgress = levelStatus.filter(l => l.stars > 0).length;
  const totalLevels = levels.length;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 sticky top-0 bg-white z-10 shadow-sm">
        <button onClick={onBack} className="text-2xl">←</button>
        <div className="flex-1">
          <h2 className="font-bold text-lg">{levels[0]?.worldName}</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(worldProgress / totalLevels) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{worldProgress}/{totalLevels}</span>
          </div>
        </div>
      </div>

      {/* Level Grid — scrollable path */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {levelStatus.map(({ level, stars, isUnlocked }, index) => (
            <LevelNode
              key={level.id}
              level={level}
              stars={stars}
              isUnlocked={isUnlocked}
              index={index}
              onSelect={() => isUnlocked && onLevelSelect(level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LevelNodeProps {
  level: Level;
  stars: StarCount;
  isUnlocked: boolean;
  index: number;
  onSelect: () => void;
}

function LevelNode({ level, stars, isUnlocked, index, onSelect }: LevelNodeProps) {
  const isBoss = level.type === 'boss';
  const isNext = isUnlocked && stars === 0;

  const bgColor = !isUnlocked ? '#e0e0e0'
    : stars === 3 ? '#ffd700'
    : stars > 0 ? '#90caf9'
    : isNext ? '#ff80ab'
    : '#b0bec5';

  return (
    <button
      onClick={onSelect}
      disabled={!isUnlocked}
      className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200
        ${isUnlocked ? 'hover:scale-102 active:scale-98 cursor-pointer' : 'cursor-not-allowed opacity-60'}
        ${isNext ? 'animate-pulse shadow-lg' : 'shadow-sm'}
        ${isBoss ? 'border-4 border-yellow-400' : 'border-2 border-gray-100'}
      `}
      style={{ backgroundColor: isUnlocked ? 'white' : '#f5f5f5' }}
    >
      {/* Level circle */}
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white flex-shrink-0
          ${isBoss ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-sm'}
        `}
        style={{ backgroundColor: bgColor }}
      >
        {!isUnlocked ? '🔒' : isBoss ? '💪' : level.id}
      </div>

      {/* Level info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-800 truncate">{level.title}</div>
        <div className="text-xs text-gray-500">
          {level.timeLimit ? `${level.timeLimit}s` : 'No timer'} •
          Target: {level.star3Score} correct
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>

      {/* Arrow if unlocked */}
      {isUnlocked && <span className="text-gray-400">›</span>}
    </button>
  );
}
```

---

### Step 10 — Pre-Lesson Screen

#### Create: `src/components/learn/PreLesson.tsx`

```tsx
'use client';

import { useState } from 'react';
import type { Level } from '@/lib/types';

interface PreLessonProps {
  level: Level;
  onStart: () => void;
  onBack: () => void;
}

export function PreLesson({ level, onStart, onBack }: PreLessonProps) {
  const [diagramStep, setDiagramStep] = useState(0);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 gap-6">
      <button onClick={onBack} className="self-start text-gray-500">← Back</button>

      <div>
        <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
          {level.type === 'boss' ? '⚠️ BOSS LEVEL' : 'LESSON'}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{level.title}</h1>
        <p className="text-gray-600 mt-2">{level.description}</p>
      </div>

      {/* Tip box */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💡</span>
          <h3 className="font-bold text-yellow-800">The Trick</h3>
        </div>
        <p className="text-yellow-900 font-medium">{level.tip}</p>
      </div>

      {/* Animated diagram (if available) */}
      {level.tipDiagram && (
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-3">Try it step by step:</h3>
          <div className="text-2xl font-bold text-center text-pink-500 mb-4">
            {level.tipDiagram.example}
          </div>
          <div className="space-y-2">
            {level.tipDiagram.solution.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  i <= diagramStep ? 'opacity-100 bg-green-50' : 'opacity-30'
                }`}
              >
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="font-medium text-gray-700">{step}</span>
              </div>
            ))}
          </div>
          {diagramStep < level.tipDiagram.solution.length - 1 && (
            <button
              onClick={() => setDiagramStep(s => s + 1)}
              className="mt-3 text-sm text-blue-500 font-semibold"
            >
              Next step →
            </button>
          )}
        </div>
      )}

      {/* Level targets */}
      <div className="flex gap-3">
        {[
          { label: '⭐', score: level.star1Score, color: '#cd7f32' },
          { label: '⭐⭐', score: level.star2Score, color: '#c0c0c0' },
          { label: '⭐⭐⭐', score: level.star3Score, color: '#ffd700' },
        ].map(t => (
          <div key={t.label} className="flex-1 text-center p-3 rounded-xl bg-gray-50 border">
            <div className="text-sm">{t.label}</div>
            <div className="font-bold text-gray-700">{t.score}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full py-5 rounded-2xl text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#ff80ab', boxShadow: '0 6px 0 #c55f85' }}
      >
        I'm Ready — Start! 🚀
      </button>
    </div>
  );
}
```

---

### Step 11 — In-Game Progress Bar

#### Create: `src/components/shared/StarProgressBar.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';

interface StarProgressBarProps {
  current: number;
  star1: number;
  star2: number;
  star3: number;
  onStarEarned?: (star: 1 | 2 | 3) => void;
}

export function StarProgressBar({ current, star1, star2, star3, onStarEarned }: StarProgressBarProps) {
  const earnedStars = current >= star3 ? 3 : current >= star2 ? 2 : current >= star1 ? 1 : 0;
  const progress = Math.min((current / star3) * 100, 100);
  const prevEarnedRef = useRef(0);

  useEffect(() => {
    if (earnedStars > prevEarnedRef.current) {
      onStarEarned?.(earnedStars as 1 | 2 | 3);
      prevEarnedRef.current = earnedStars;
    }
  }, [earnedStars, onStarEarned]);

  return (
    <div className="w-full px-2">
      <div className="relative h-4 bg-gray-200 rounded-full overflow-visible">
        {/* Fill bar */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {/* Star markers */}
        {[
          { threshold: star1, index: 1 },
          { threshold: star2, index: 2 },
          { threshold: star3, index: 3 },
        ].map(({ threshold, index }) => {
          const pos = (threshold / star3) * 100;
          const earned = current >= threshold;
          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-transform duration-300"
              style={{ left: `${pos}%` }}
            >
              <span
                className={`text-xl transition-all duration-500 ${earned ? 'scale-125 drop-shadow-lg' : 'grayscale opacity-50'}`}
              >
                ⭐
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        <span>{current} correct</span>
        <span>Target: {star3}</span>
      </div>
    </div>
  );
}
```

---

### Step 12 — Redesign GameScreen

**What you're doing:** Modify the existing `GameScreen.tsx` to use the new progress bar and track per-question timing.

Key changes to `src/components/GameScreen.tsx`:

```tsx
// ADD at top of GameScreen component:
const questionStartTime = useRef<number>(Date.now());
const sessionAttempts = useRef<QuestionAttempt[]>([]);

// REPLACE the question display section to add:
useEffect(() => {
  questionStartTime.current = Date.now(); // reset timer on new question
}, [gameData.currentQuestion]);

// MODIFY handleAnswerSubmit to track response time:
const handleAnswerSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (!typedAnswer) return;

  const responseMs = Date.now() - questionStartTime.current;
  const userAnswer = parseInt(typedAnswer, 10);
  const isCorrect = userAnswer === gameData.currentAnswer;

  // Track attempt
  sessionAttempts.current.push({
    question: gameData.currentQuestion,
    correctAnswer: gameData.currentAnswer,
    userAnswer,
    isCorrect,
    responseMs,
    skill: 'random', // pass actual skill from level
    operator: '+',   // pass actual operator
  });

  if (isCorrect) onCorrectAnswer();
  else onWrongAnswer();
  setTypedAnswer('');
};

// ADD the StarProgressBar in the JSX (inside the return, after the timer):
{level && (
  <StarProgressBar
    current={gameData.score}
    star1={level.star1Score}
    star2={level.star2Score}
    star3={level.star3Score}
    onStarEarned={(star) => {
      announce(`${star} star${star > 1 ? 's' : ''} earned!`, 'polite');
      // Play star sound
    }}
  />
)}
```

---

### Step 13 — Post-Lesson Results Screen

#### Create: `src/components/learn/PostLesson.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { SessionResult, Level, StarCount } from '@/lib/types';
import { detectWeakSpots } from '@/lib/weakSpots';

interface PostLessonProps {
  session: SessionResult;
  level: Level;
  xpEarned: number;
  onNext: () => void;
  onRetry: () => void;
  onPracticeWeakSpots: () => void;
}

export function PostLesson({ session, level, xpEarned, onNext, onRetry, onPracticeWeakSpots }: PostLessonProps) {
  const [starsRevealed, setStarsRevealed] = useState(0);
  const stars = session.starsEarned || 0;
  const weakSpots = detectWeakSpots(session.attempts);

  // Reveal stars one by one
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setStarsRevealed(count);
      if (count >= stars) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [stars]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">
        {stars === 3 ? '🎉 Perfect!' : stars >= 1 ? '✅ Level Complete!' : '❌ Try Again'}
      </h2>

      {/* Star reveal */}
      <div className="flex gap-3">
        {[1, 2, 3].map(s => (
          <span
            key={s}
            className={`text-5xl transition-all duration-500 ${
              s <= starsRevealed
                ? 'scale-125 opacity-100 drop-shadow-lg'
                : 'scale-100 opacity-20 grayscale'
            }`}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 w-full bg-gray-50 rounded-2xl p-4">
        <StatCell label="Correct" value={session.correct} color="#4caf50" />
        <StatCell label="Wrong" value={session.wrong} color="#f44336" />
        <StatCell label="Accuracy" value={`${session.accuracy.toFixed(0)}%`} color="#2196f3" />
        <StatCell label="Best Streak" value={session.maxStreak} color="#ff9800" />
        <StatCell label="XP Earned" value={`+${xpEarned}`} color="#ff80ab" />
        <StatCell
          label="Avg Speed"
          value={`${(session.durationMs / (session.correct + session.wrong) / 1000).toFixed(1)}s`}
          color="#9c27b0"
        />
      </div>

      {/* Weak spots */}
      {weakSpots.length > 0 && (
        <div className="w-full bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
          <p className="font-semibold text-orange-800 mb-2">⚠️ Weak spots detected:</p>
          {weakSpots.map(ws => (
            <p key={ws.skill} className="text-sm text-orange-700">
              • {ws.skill} — {ws.reason === 'low_accuracy' ? `${ws.accuracy.toFixed(0)}% accuracy` : `${(ws.avgMs / 1000).toFixed(1)}s avg`}
            </p>
          ))}
          <button
            onClick={onPracticeWeakSpots}
            className="mt-3 px-4 py-2 bg-orange-400 text-white rounded-xl text-sm font-bold"
          >
            Practice Weak Spots →
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full">
        {stars >= 1 && (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl text-lg font-bold text-white"
            style={{ backgroundColor: '#ff80ab', boxShadow: '0 4px 0 #c55f85' }}
          >
            Next Level →
          </button>
        )}
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-2xl text-lg font-bold text-white"
          style={{ backgroundColor: '#90caf9', boxShadow: '0 4px 0 #5e8db0' }}
        >
          {stars === 0 ? 'Try Again' : '↺ Retry for More Stars'}
        </button>
      </div>
    </div>
  );
}

function StatCell({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
```

---

### Step 14 — Practice Mode (Monkeytype-style)

#### Create: `src/components/practice/PracticeSetup.tsx`

```tsx
'use client';

import { useState } from 'react';
import type { PracticeConfig, OperationType, PracticeMode, PersonalBest } from '@/lib/types';

interface PracticeSetupProps {
  personalBests: PersonalBest[];
  onStart: (config: PracticeConfig) => void;
  onBack: () => void;
}

export function PracticeSetup({ personalBests, onStart, onBack }: PracticeSetupProps) {
  const [mode, setMode] = useState<PracticeMode>('time');
  const [timeLimit, setTimeLimit] = useState(60);
  const [targetCount, setTargetCount] = useState(25);
  const [operators, setOperators] = useState<OperationType[]>(['+']);
  const [rangePreset, setRangePreset] = useState<'easy' | 'medium' | 'hard'>('easy');

  const rangeMap: Record<string, [number, number]> = {
    easy: [1, 15],
    medium: [1, 30],
    hard: [1, 50],
  };

  const config: PracticeConfig = {
    mode,
    timeLimit: mode === 'time' ? timeLimit : undefined,
    targetCount: mode === 'count' ? targetCount : undefined,
    operators,
    numberRange: rangeMap[rangePreset],
  };

  const configKey = JSON.stringify(config);
  const pb = personalBests.find(p => p.configKey === configKey);

  const toggleOperator = (op: OperationType) => {
    setOperators(prev =>
      prev.includes(op)
        ? prev.length > 1 ? prev.filter(o => o !== op) : prev // keep at least one
        : [...prev, op]
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-500">←</button>
        <h2 className="text-2xl font-bold text-gray-800">Practice</h2>
      </div>

      {/* Mode selector */}
      <Section title="Mode">
        <div className="flex gap-2">
          {(['time', 'count', 'zen'] as PracticeMode[]).map(m => (
            <PillButton key={m} active={mode === m} onClick={() => setMode(m)}>
              {m === 'time' ? '⏱ Time' : m === 'count' ? '🎯 Count' : '🧘 Zen'}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Time limit (for time mode) */}
      {mode === 'time' && (
        <Section title="Time Limit">
          <div className="flex gap-2">
            {[15, 30, 60, 120].map(t => (
              <PillButton key={t} active={timeLimit === t} onClick={() => setTimeLimit(t)}>
                {t}s
              </PillButton>
            ))}
          </div>
        </Section>
      )}

      {/* Target count (for count mode) */}
      {mode === 'count' && (
        <Section title="Target">
          <div className="flex gap-2">
            {[10, 25, 50, 100].map(n => (
              <PillButton key={n} active={targetCount === n} onClick={() => setTargetCount(n)}>
                {n}
              </PillButton>
            ))}
          </div>
        </Section>
      )}

      {/* Operations */}
      <Section title="Operations">
        <div className="flex gap-2">
          {(['+', '-', '×', '÷'] as OperationType[]).map(op => (
            <PillButton key={op} active={operators.includes(op)} onClick={() => toggleOperator(op)}>
              {op}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Number range */}
      <Section title="Number Range">
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map(r => (
            <PillButton key={r} active={rangePreset === r} onClick={() => setRangePreset(r)}>
              {r === 'easy' ? '🟢 Easy' : r === 'medium' ? '🟡 Medium' : '🔴 Hard'}
            </PillButton>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Range: {rangeMap[rangePreset].join(' – ')}</p>
      </Section>

      {/* Personal best */}
      {pb && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 text-center">
          <p className="text-sm text-yellow-700 font-semibold">🏆 Personal Best for this config</p>
          <p className="text-xl font-bold text-yellow-800">{pb.score} correct</p>
          <p className="text-xs text-yellow-600">{pb.accuracy.toFixed(0)}% accuracy</p>
        </div>
      )}

      <button
        onClick={() => onStart(config)}
        className="w-full py-5 rounded-2xl text-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
        style={{ backgroundColor: '#ff80ab', boxShadow: '0 6px 0 #c55f85' }}
      >
        Start Practicing ▶
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        active ? 'text-white shadow-sm' : 'bg-gray-100 text-gray-600'
      }`}
      style={active ? { backgroundColor: '#ff80ab' } : {}}
    >
      {children}
    </button>
  );
}
```

---

### Step 15 — Practice Results & Graphs

#### Create: `src/components/practice/PracticeResults.tsx`

```tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { SessionResult } from '@/lib/types';

interface PracticeResultsProps {
  session: SessionResult;
  xpEarned: number;
  isPersonalBest: boolean;
  onRetry: () => void;
  onChangeConfig: () => void;
  onHome: () => void;
}

export function PracticeResults({ session, xpEarned, isPersonalBest, onRetry, onChangeConfig, onHome }: PracticeResultsProps) {
  // Build per-second chart data from attempts
  const chartData = buildChartData(session);

  return (
    <div className="flex flex-col gap-5 p-6 max-w-md mx-auto">
      {isPersonalBest && (
        <div className="bg-yellow-400 text-white rounded-2xl p-3 text-center font-bold text-lg animate-bounce-in">
          🏆 NEW PERSONAL BEST!
        </div>
      )}

      <div className="text-center">
        <div className="text-6xl font-bold" style={{ color: '#ff80ab' }}>{session.correct}</div>
        <div className="text-gray-500">correct answers</div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Accuracy" value={`${session.accuracy.toFixed(0)}%`} />
        <StatBox label="Best Streak" value={`${session.maxStreak}🔥`} />
        <StatBox label="+XP" value={`${xpEarned}`} />
      </div>

      {/* Speed graph */}
      {chartData.length > 1 && (
        <div className="bg-white rounded-2xl border p-4">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Performance Over Time</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="correct" stroke="#ff80ab" strokeWidth={2} dot={false} />
              <XAxis dataKey="label" tick={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v: number) => [`${v} correct`, '']}
                labelFormatter={() => ''}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button onClick={onRetry} className="w-full py-4 rounded-2xl font-bold text-white text-lg" style={{ backgroundColor: '#ff80ab', boxShadow: '0 4px 0 #c55f85' }}>
          Retry Same Config
        </button>
        <button onClick={onChangeConfig} className="w-full py-4 rounded-2xl font-bold text-gray-700 text-lg bg-gray-100">
          Change Settings
        </button>
        <button onClick={onHome} className="w-full py-3 rounded-2xl text-sm text-gray-500">
          ← Home
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <div className="font-bold text-lg text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function buildChartData(session: SessionResult) {
  // Group attempts into 10-second buckets
  if (!session.attempts.length) return [];
  const bucketMs = 10000;
  const buckets: number[] = [];
  let bucketCorrect = 0;
  let bucketStart = 0;

  for (const attempt of session.attempts) {
    if (attempt.responseMs - bucketStart > bucketMs) {
      buckets.push(bucketCorrect);
      bucketCorrect = 0;
      bucketStart += bucketMs;
    }
    if (attempt.isCorrect) bucketCorrect++;
  }
  buckets.push(bucketCorrect);

  return buckets.map((correct, i) => ({ label: `${i * 10}s`, correct }));
}
```

---

### Step 16 — Profile Screen

#### Create: `src/components/profile/ProfileScreen.tsx`

```tsx
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
```

---

### Step 17 — Refactor SkillSumGame.tsx (Main Orchestrator)

**What you're doing:** Completely replace `SkillSumGame.tsx` with the new state-machine version that wires all 2.0 components together.

```tsx
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
```

---

### Step 18 — Animations & Sound Polish

**Add to `src/hooks/useSound.ts`** — new sounds for 2.0:

```typescript
// Add these cases to the switch in playSound():

case 'starEarned':
  // Ascending chime
  [659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = 'sine';
    gain.gain.setValueAtTime(0.25, now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
    osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.3);
  });
  break;

case 'levelComplete':
  // Full fanfare
  [523, 659, 784, 1047, 784, 1047].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = 'triangle';
    gain.gain.setValueAtTime(0.2, now + i * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.25);
    osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.25);
  });
  break;

case 'personalBest':
  // Triumphant
  [784, 880, 988, 1175].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq; osc.type = 'sine';
    gain.gain.setValueAtTime(0.3, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);
    osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.4);
  });
  break;
```

**Add to `src/app/globals.css`** — new CSS variables and animations:

```css
:root {
  --color-primary: #ff80ab;
  --color-primary-dark: #c55f85;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-info: #2196f3;
  --color-xp: #ffd700;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
}

@keyframes starPop {
  0%   { transform: scale(0) rotate(0deg); opacity: 0; }
  60%  { transform: scale(1.4) rotate(200deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 1; }
}

@keyframes xpFloat {
  0%   { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-50px); }
}

@keyframes levelUp {
  0%   { transform: scale(1); }
  25%  { transform: scale(1.3); }
  50%  { transform: scale(0.95); }
  75%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.animate-star-earn { animation: starPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
.animate-xp-float  { animation: xpFloat 1.5s ease-out forwards; }
.animate-level-up  { animation: levelUp 0.6s ease-in-out; }
```

---

### Step 19 — Mobile & PWA Polish

**Update `public/manifest.json`:**

```json
{
  "name": "SkillSum — Mental Math Mastery",
  "short_name": "SkillSum",
  "description": "Learn mental math tricks through 400 progressive levels",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fce4ec",
  "theme_color": "#ff80ab",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "categories": ["education", "games"],
  "shortcuts": [
    { "name": "Continue Learning", "url": "/?screen=worldMap", "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }] },
    { "name": "Quick Practice", "url": "/?screen=practiceSetup", "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }] }
  ]
}
```

---

### Step 20 — Testing Checklist

Before calling 2.0 done, verify each of these:

**Learn Mode:**
```
☐ World 1 loads all 50 levels in WorldMap
☐ Level 1 is unlocked, Level 2 is locked until L1 passed
☐ Tapping a locked level does nothing
☐ PreLesson tip screen shows correctly for each level type
☐ In-game progress bar fills and stars animate at thresholds
☐ Session ends when timer hits 0
☐ PostLesson shows correct stars (0, 1, 2, 3)
☐ XP is awarded and appears in profile
☐ Completing L1 unlocks L2 in the map
☐ Boss levels are visually distinct (larger node, different color)
```

**Practice Mode:**
```
☐ All mode/time/op/range combinations work
☐ Personal best saves and displays correctly
☐ PracticeResults graph renders with data
☐ "New Personal Best!" banner appears correctly
☐ History tab in profile shows practice sessions
```

**Progression:**
```
☐ XP accumulates correctly across sessions
☐ Account level increases at correct XP thresholds
☐ Daily streak increments once per calendar day
☐ Achievements unlock at correct conditions
☐ Profile screen shows accurate all-time stats
```

**Persistence:**
```
☐ Refresh page → all progress preserved
☐ All 5 localStorage keys are present after first session
☐ No data loss between sessions
```

---

## 7. File Structure Reference

```
src/
├── app/
│   ├── globals.css               ← Updated with 2.0 CSS variables
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── types.ts                  ← NEW: All TypeScript types
│   ├── levels.ts                 ← REPLACED: 400-level curriculum
│   ├── xp.ts                     ← NEW: XP calculation
│   ├── achievements.ts           ← NEW: 50 achievements
│   ├── weakSpots.ts              ← NEW: Weak spot detection
│   └── dailyChallenges.ts        ← NEW: Daily challenge generation
│
├── hooks/
│   ├── useUserProfile.ts         ← NEW: All persistence logic
│   ├── useSound.ts               ← UPDATED: New sounds added
│   ├── useSwipe.ts               ← Unchanged
│   ├── useScreenReader.ts        ← Unchanged
│   └── useHorizontalScroll.ts    ← Unchanged
│
├── components/
│   ├── SkillSumGame.tsx          ← REPLACED: New orchestrator
│   ├── GameScreen.tsx            ← MODIFIED: Timing + progress bar
│   ├── CircularTimer.tsx         ← Unchanged
│   ├── ConfettiEffect.tsx        ← Unchanged
│   ├── LoadingSkeleton.tsx       ← Unchanged
│   │
│   ├── learn/
│   │   ├── WorldMap.tsx          ← NEW
│   │   ├── PreLesson.tsx         ← NEW
│   │   └── PostLesson.tsx        ← NEW
│   │
│   ├── practice/
│   │   ├── PracticeSetup.tsx     ← NEW
│   │   └── PracticeResults.tsx   ← NEW
│   │
│   ├── shared/
│   │   └── StarProgressBar.tsx   ← NEW
│   │
│   ├── profile/
│   │   └── ProfileScreen.tsx     ← NEW
│   │
│   └── daily/
│       └── DailyChallenge.tsx    ← NEW (build after core is done)
│
└── app/
    └── api/
        └── leaderboard/
            └── route.ts          ← Unchanged
```

---

## 8. Design System & UI Tokens

### Colors

```css
/* Primary (Pink) */
--color-primary:        #ff80ab;
--color-primary-dark:   #c55f85;
--color-primary-light:  #ffb3c6;

/* Worlds */
--color-world-1:  #ff8fab;   /* Addition — Pink */
--color-world-2:  #ff9f1c;   /* Subtraction — Orange */
--color-world-3:  #2ec4b6;   /* Multiplication — Teal */
--color-world-4:  #7b2d8b;   /* Division — Purple */
--color-world-5:  #e63946;   /* Mixed — Red */
--color-world-6:  #457b9d;   /* Number Sense — Blue */
--color-world-7:  #f72585;   /* Speed — Hot Pink */
--color-world-8:  #1d3557;   /* Elite — Navy */

/* Stars */
--color-star-3:   #ffd700;   /* Gold */
--color-star-2:   #c0c0c0;   /* Silver */
--color-star-1:   #cd7f32;   /* Bronze */

/* Feedback */
--color-correct:  #4caf50;
--color-wrong:    #f44336;
--color-streak:   #ff9800;
--color-xp:       #ffd700;
```

### Typography Scale

```
Display:  3rem, bold    → Score, big numbers
H1:       1.75rem, bold → Screen titles
H2:       1.25rem, bold → Section headers
Body:     1rem, regular → Descriptions
Caption:  0.75rem       → Labels, metadata
```

### Component Sizes

```
Touch targets:     min 48×48px (mobile)
Border radius:     12px (small), 16px (medium), 24px (large), 9999px (pill)
Shadow (active):   0 6px 0 var(--color-primary-dark)
Shadow (hover):    0 4px 0 var(--color-primary-dark)
Transition:        0.2s ease-in-out (all interactive elements)
```

---

## 9. Common Pitfalls & Notes

### Performance

- The 400-level array is large. Use `useMemo` when filtering levels by world.
- `recharts` can be heavy. Lazy-load `PracticeResults` if needed.
- localStorage reads/writes are synchronous — do them in `useEffect`, not render.

### Data Persistence

- Always use the `isLoaded` flag before rendering any profile-dependent UI. Otherwise you'll flash default values.
- The mastery map uses level IDs as keys. Make sure IDs are globally unique (the `w(worldId, localId)` helper ensures this).

### GameScreen Dual-Mode

- `GameScreen.tsx` needs to handle both Learn Mode (from `currentLevel`) and Practice Mode (from `practiceConfig`). Use a union prop or separate components if it gets too complex.
- The `onSessionEnd` callback is the single exit point from gameplay — keep it clean.

### XP Balance

- The XP formula is tuned so:
  - A typical 60s session earns ~400–600 XP
  - Level 10 requires ~10,000 XP (≈ 20 sessions)
  - Level 100 requires ~500,000 XP (long-term goal)
- Adjust multipliers in `xp.ts` if progression feels too fast/slow.

### Level Unlocking

- The unlock logic checks if the **previous level** has `stars > 0` (i.e., at least 1 star = passed).
- Players should never be stuck — 1 star is achievable with 50% of target score.
- Boss levels (every 10th) have high targets but generous time limits.

### Building the Full 400 Levels

- Do it world by world, not all at once.
- Use the template in Step 3 and follow the difficulty ramp.
- Test each world in isolation before adding the next.
- Levels 11–49 in each world should each introduce one new concept or increase one difficulty parameter.

---

*SkillSum 2.0 Master Guide — Built with Claude | Last updated: April 2026*
