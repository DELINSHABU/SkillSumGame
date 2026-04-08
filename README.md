# SkillSum 2.0 — The Ultimate Mental Math Mastery Platform 🧠⚡

SkillSum 2.0 is a full-featured mental math learning platform designed to turn rote practice into an addictive, RPG-like journey toward mathematical fluency. Combining the structured progression of **TypingClub**, the clean aesthetic obsession of **Monkeytype**, and the engagement loops of **Duolingo**, SkillSum 2.0 teaches real mental math shortcuts — not just speed.

---

## 🌟 Vision & Philosophy

SkillSum 2.0 is built on three core pillars:
- **Accuracy Before Speed**: Early levels focus on mastery thresholds. Stars reward precision first.
- **Teach, Then Test**: Every level introduces a specific "trick" or shortcut via animated tip screens.
- **Micro-Progress**: Real-time progress bars and star thresholds provide immediate, satisfying feedback.

---

## 🎮 Game Modes

### 1. Learn Mode (Structured Curriculum)
Navigate through **8 Worlds** and **400 Levels**. Each level is a carefully designed stepping stone:
- **World Map**: A visual path with star-rated nodes (Gold, Silver, Bronze).
- **Pre-Lesson Tips**: Animated diagrams explaining mental math tricks (e.g., the "Adding 9" trick: `+10, -1`).
- **Boss Levels**: Every 10th level challenges you with a high-intensity comprehensive test.
- **Unlock Gates**: Progress sequentially; master one skill to unlock the next.

### 2. Practice Mode (Monkeytype-style)
For those who want pure, unadulterated speed practice:
- **Custom Configurator**: Choose your mode (Time Attack, Score Target, or Zen), operations (+, -, ×, ÷), and number ranges.
- **Live Statistics**: Minimalist UI with real-time accuracy and streak tracking.
- **Performance Analysis**: Post-session line charts showing your "Performance Over Time" and operation-specific speed breakdowns.

### 3. Daily Challenges
Three rotating tasks every day (e.g., "Get 20 correct in Addition", "90%+ accuracy in Multiplication") to earn massive XP bonuses and unique badges.

---

## 🗺️ The 400-Level Curriculum

| World | Theme | Focus Skills |
|---|---|---|
| **World 1** | Addition Foundation | Singles, Doubles, +9/+8 tricks, 2nd-digit carrying |
| **World 2** | Subtraction Strategies | Borrowing, bridging, and compensation |
| **World 3** | Multiplication Mastery | Tables 2–12, ×5, ×10, ×11, ×25 shortcuts |
| **World 4** | Division Techniques | Inverse tables, ÷5, ÷10, integer division |
| **World 5** | Mixed Operations | Switching between all four ops under pressure |
| **World 6** | Number Sense | Estimation, rounding, and patterns |
| **World 7** | Speed Drills | High-intensity refinement of previous worlds |
| **World 8** | Mental Math Elite | 3-digit ops, mental algebra, and mastery |

---

## 🚀 Key Features

- **RPG Progression**: Earn XP for every correct answer. Level up your account (Lv. 1–100) and maintain your **Daily Streak 🔥**.
- **Weak Spot Detection**: AI-powered analysis identifies exactly where you struggle (e.g., "Slow on ÷ by 7") and offers targeted drills.
- **Achievement System**: 50+ unlockable badges across categories like *Lightning Fast*, *Sharp Mind*, and *Legendary Streaks*.
- **Cloud Sync**: Powered by **Supabase** for secure authentication and cross-device progress persistence.
- **Audio-Visual Polish**: Custom sound effects (Correct/Wrong/Star/Level-Up) and smooth Framer Motion animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), TypeScript.
- **Styling**: Tailwind CSS v4, custom CSS keyframe animations.
- **Backend/Auth**: Supabase (PostgreSQL).
- **AI Integration**: Google Gemini API (Hints, Jokes, and Personalized Feedback).
- **Visualization**: Recharts for performance graphs.
- **State Management**: Robust State Machine pattern for navigation and session tracking.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- Supabase Project URL & Anon Key
- Google Gemini API Key

### Installation
1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/SkillSumGame.git
   cd SkillSumGame
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env.local` and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   GEMINI_API_KEY=your_gemini_key
   ```
4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---

## 📜 License
MIT License. See [LICENSE](LICENSE) for details.

*SkillSum 2.0 — Built with passion for mathematical fluency.*
