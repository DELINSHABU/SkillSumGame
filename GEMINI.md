# Gemini Guidance

This file provides guidance to Gemini when working with code in this repository.

## Project Overview

Skill Sum is an interactive mental math game built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The game features timed challenges with three difficulty levels and AI-powered features through Google Gemini API integration (hints, text-to-speech, and personalized feedback).

## Development Commands

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

**Required:** Create `.env.local` from `.env.example` and add your Google Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

The Gemini API is used for:
- Generating AI-powered feedback on EndScreen
- Text-to-speech functionality
- Math hints and jokes

**Note:** API routes for `/api/gemini-text` and `/api/gemini-tts` are referenced in code but do not exist yet. These need to be implemented in `src/app/api/` directory structure.

## Architecture

### Component Structure

This is a **single-page application** with a state machine pattern:
- `SkillSumGame` (main component) - Manages game state and orchestrates all game logic
- `StartScreen` - Game configuration (time, difficulty selection)
- `GameScreen` - Active gameplay with questions and answers
- `EndScreen` - Results display with AI-generated feedback
- `LeaderboardScreen` - Displays the game leaderboard
- `Leaderboard` - Component for displaying individual leaderboard entries

### State Management

Game state is centralized in `SkillSumGame.tsx` using React's `useState`:
- `gameState`: 'start' | 'playing' | 'end' (controls which screen is shown)
- `difficulty`: 'easy' | 'medium' | 'hard'
- `score`, `time`, `maxTime`: Core game metrics
- `testMode`: Developer feature showing correct answers
- `isPaused`: Controls pause state during gameplay

State flows unidirectionally from `SkillSumGame` down to child components via props.

### Game Logic

**Question Generation** (`generateQuestion` in `SkillSumGame.tsx`):
- Numbers are randomized based on difficulty (easy: 1-15, medium: 1-30, hard: 1-50)
- Operators vary by difficulty (easy/medium: +/-, hard: +/-/×/÷)
- Division always produces integer results
- Subtraction always produces positive results

**Answer Options** (`GameScreen.tsx`):
- Generates 4 options including 1 correct answer
- Fake answers are within ±10 of correct answer and always positive
- Options are shuffled randomly each time

**Timer Management**:
- Uses `setInterval` with `useRef` to track timer
- Pauses when `isPaused` is true
- Game ends automatically when time reaches 0
- Timer cleanup on unmount prevents memory leaks

### Styling Approach

- **Tailwind CSS v4** for utility classes
- **Inline styles** for component-specific colors/shadows (game-themed UI)
- **Custom CSS animations** in `globals.css`:
  - `animate-shake` - Wrong answer feedback
  - `animate-bounce-in` - Title entrance animation
- **Poppins font** from Google Fonts for consistent game aesthetic
- User selection is disabled (`user-select: none`) for better game UX

### Path Aliases

TypeScript paths are configured with `@/*` mapping to `./src/*`:
```typescript
import { SkillSumGame } from '@/components/SkillSumGame';
```

## Known Issues / TODOs

1.  **Missing API Routes**: The following API endpoints are referenced but not implemented:
    *   `/api/gemini-text` - For hints, jokes, and feedback generation
    *   `/api/gemini-tts` - For text-to-speech functionality

    The `/api/leaderboard` route is implemented for fetching and submitting scores.

    The Gemini API routes should be created as Next.js Route Handlers in `src/app/api/gemini-text/route.ts` and `src/app/api/gemini-tts/route.ts`

2.  **Features Mentioned But Not Implemented**:
    *   AI-powered hints (button exists in README but not in GameScreen)
    *   Text-to-speech for questions
    *   Math jokes feature

3.  **EndScreen API Call**: Currently makes a fetch to `/api/gemini-text` which will fail until implemented. Has fallback message.

## Leaderboard Functionality

-   **API Route**: `/api/leaderboard` handles fetching and submitting scores.
-   **Data Storage**: Scores are stored in `jsonDatabase/leaderboard.json`.
-   **Components**: `LeaderboardScreen.tsx` displays the leaderboard, and `Leaderboard.tsx` renders individual entries.

## Testing

No test framework is currently configured. To add tests, consider:
- Jest + React Testing Library for unit/component tests
- Playwright or Cypress for E2E tests