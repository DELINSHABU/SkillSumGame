# SkillSum 2.0 — Mental Math Mastery Platform 🧠✨

SkillSum 2.0 is a comprehensive mental math learning platform that transforms rote practice into an addictive, structured journey toward mathematical mastery. Inspired by the progression of TypingClub and the clean obsession of Monkeytype, SkillSum 2.0 teaches real mental math shortcuts rather than just testing speed.

## 🚀 What's New in 2.0

- **Dual-Mode Gameplay**: 
  - **Learn Mode**: A structured 400-level curriculum across 8 themed Worlds.
  - **Practice Mode**: A "Monkeytype-style" customizable free-play mode with deep statistics.
- **Supabase Integration**: Secure authentication and cloud-sync for your progress, streaks, and achievements.
- **RPG Progression**: Earn XP, level up your account (1-100), and maintain daily streaks.
- **Weak Spot Detection**: AI-powered analysis detects which operations slow you down and generates custom drills to fix them.
- **Daily Challenges**: Three rotating tasks every day to earn massive XP bonuses and unique badges.
- **Achievement System**: 50+ unlockable achievements across categories like Speed, Accuracy, and Mastery.

## 🗺️ The 400-Level Curriculum

Master math step-by-step across 8 unique worlds:

1.  **Addition Foundation**: Singles, Doubles, and the "+9/+8" tricks.
2.  **Subtraction Strategies**: Borrowing, bridging, and compensation.
3.  **Multiplication Mastery**: All tables 2-12, plus special ×5, ×11, and ×25 tricks.
4.  **Division Techniques**: Inverse tables and remainder strategies.
5.  **Mixed Operations**: Fast switching between all four basic operations.
6.  **Number Sense**: Estimation, rounding, and mathematical patterns.
7.  **Speed Drills**: High-intensity versions of previous skills.
8.  **Mental Math Elite**: 3-digit operations and mental algebra.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database & Auth**: Supabase (PostgreSQL)
- **AI Integration**: Google Gemini API (Hints, TTS, and personalized feedback)
- **Animations**: Framer Motion & CSS Keyframes
- **Charts**: Recharts (for performance visualization)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- Supabase Project (URL & Anon Key)
- Google Gemini API key

### Installation

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/your-username/SkillSumGame.git
    cd SkillSumGame
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

3.  **Run Development**:
    ```bash
    npm run dev
    ```

## 🎮 Game Modes

### Learn Mode (TypingClub-style)
Navigate a visual World Map. Each level starts with a **Pre-Lesson Tip** explaining a specific mental math trick. Earn up to 3 stars based on your accuracy and speed to unlock the next challenge. Face "Boss Levels" every 10 stages!

### Practice Mode (Monkeytype-style)
Configure your perfect session:
- **Modes**: Time Attack, Score Target, or Zen Mode.
- **Customization**: Select specific operators (+, -, ×, ÷) and number ranges.
- **Analysis**: View per-second performance graphs and operation-specific speed breakdowns after every run.

## 🏆 Achievements & Streaks
Stay motivated with a **Daily Streak** system. Complete your "Daily Goal" (5, 10, or 20 minutes) to keep your fire burning and earn XP multipliers.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
