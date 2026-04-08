# SkillSum 2.0 — Complete UI Design Plan
### Mobile-First & Desktop Responsive | Attractive, Animated, Addictive

---

## Table of Contents

1. [Design Philosophy & Aesthetic Direction](#1-design-philosophy--aesthetic-direction)
2. [Design System — Tokens & Foundations](#2-design-system--tokens--foundations)
3. [Typography System](#3-typography-system)
4. [Color Palette & Themes](#4-color-palette--themes)
5. [Animation & Motion System](#5-animation--motion-system)
6. [Component Library](#6-component-library)
7. [Screen-by-Screen Designs — Mobile](#7-screen-by-screen-designs--mobile)
8. [Screen-by-Screen Designs — Desktop](#8-screen-by-screen-designs--desktop)
9. [Responsive Layout Strategy](#9-responsive-layout-strategy)
10. [Implementation Code Snippets](#10-implementation-code-snippets)

---

## 1. Design Philosophy & Aesthetic Direction

### The Concept: "Soft Arcade"

SkillSum 2.0 lives at the intersection of **warm educational app** and **polished game UI**. The aesthetic is:

> **Playful but not childish. Clean but not cold. Rewarding but not overwhelming.**

Think: Duolingo's emotional warmth + Monkeytype's typographic precision + a hint of arcade game energy.

### Aesthetic Pillars

| Pillar | What it means | How it shows |
|---|---|---|
| **Warmth** | Users should feel safe and encouraged | Soft pinks, rounded corners, gentle shadows |
| **Precision** | Every pixel is intentional | 8px grid, consistent spacing, clean alignment |
| **Delight** | Micro-moments of joy at every interaction | Spring animations, particle bursts, sound-visual sync |
| **Clarity** | Math is hard enough — UI should never be | High contrast questions, no clutter in game view |
| **Progress** | Always showing how far you've come | XP bars, stars, streak flames everywhere |

### The Unforgettable Element

**The "bubble path" world map** — levels are displayed as colorful bubbles connected by a winding path (like a board game), with depth, shadows, and gentle floating animations. Nothing else in the math app space looks like this.

---

## 2. Design System — Tokens & Foundations

### Spacing (8px Grid)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### Border Radius

```css
:root {
  --radius-sm:   8px;   /* small buttons, tags */
  --radius-md:   14px;  /* cards, inputs */
  --radius-lg:   20px;  /* panels, modals */
  --radius-xl:   28px;  /* large cards, screens */
  --radius-full: 9999px; /* pills, circles */
}
```

### Elevation (Shadows)

```css
:root {
  /* Colored depth shadows — signature SkillSum look */
  --shadow-sm:     0 2px 0 0 rgba(0,0,0,0.08);
  --shadow-md:     0 4px 0 0 rgba(0,0,0,0.10);
  --shadow-lg:     0 6px 0 0 rgba(0,0,0,0.12);
  --shadow-xl:     0 8px 0 0 rgba(0,0,0,0.15);

  /* Button "press" shadows (colored, matches button) */
  --shadow-btn-primary:   0 6px 0 #c55f85;
  --shadow-btn-success:   0 6px 0 #388e3c;
  --shadow-btn-info:      0 6px 0 #1565c0;
  --shadow-btn-warning:   0 6px 0 #e65100;

  /* Ambient glow for active elements */
  --glow-primary: 0 0 20px rgba(255, 128, 171, 0.4);
  --glow-success: 0 0 20px rgba(76, 175, 80, 0.4);
  --glow-gold:    0 0 20px rgba(255, 215, 0, 0.5);
}
```

### Z-Index Scale

```css
:root {
  --z-base:    0;
  --z-raised:  10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-modal:   1000;
  --z-toast:   2000;
  --z-confetti: 9999;
}
```

---

## 3. Typography System

### Font Choices

**Display Font:** `Nunito` (Google Fonts)
- Rounded terminals, warm, friendly, very readable at all sizes
- Used for: scores, questions, level numbers, headings

**Body Font:** `DM Sans`
- Clean, modern geometric sans-serif
- Used for: descriptions, labels, body text, UI copy

**Mono Font:** `JetBrains Mono`
- Used for: timer display, statistics, numbers in results

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
  --font-display: 'Nunito', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

### Type Scale

```css
/* Display — question text, big scores */
.text-display {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* H1 — screen titles */
.text-h1 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  line-height: 1.2;
}

/* H2 — section headers */
.text-h2 {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
}

/* Body — descriptions */
.text-body {
  font-family: var(--font-body);
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 400;
  line-height: 1.6;
}

/* Label — small UI text */
.text-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Stat — numbers in results */
.text-stat {
  font-family: var(--font-mono);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
}
```

---

## 4. Color Palette & Themes

### Core Palette

```css
:root {
  /* ─── Primary (Warm Pink) ─── */
  --pink-50:  #fff0f5;
  --pink-100: #ffe0ec;
  --pink-200: #ffb3cc;
  --pink-300: #ff80ab;   /* PRIMARY */
  --pink-400: #ff5c96;
  --pink-500: #e0396e;
  --pink-600: #c55f85;   /* pressed state */

  /* ─── Backgrounds ─── */
  --bg-canvas:   #fef6f9;   /* overall page bg — very light warm pink */
  --bg-card:     #ffffff;
  --bg-surface:  #fdf2f6;   /* secondary surfaces */
  --bg-overlay:  rgba(254, 246, 249, 0.85); /* glassmorphism */

  /* ─── World Colors ─── */
  --world-1: #ff8fab;  /* Addition — Pink */
  --world-2: #ff9a3c;  /* Subtraction — Orange */
  --world-3: #26c6b0;  /* Multiplication — Teal */
  --world-4: #9b59d0;  /* Division — Purple */
  --world-5: #ef5350;  /* Mixed — Red */
  --world-6: #42a5f5;  /* Number Sense — Blue */
  --world-7: #f72585;  /* Speed — Hot Pink */
  --world-8: #1a237e;  /* Elite — Deep Navy */

  /* ─── Semantic ─── */
  --correct:  #4caf50;
  --wrong:    #f44336;
  --warning:  #ff9800;
  --info:     #2196f3;
  --xp-gold:  #ffd700;
  --streak:   #ff6b35;

  /* ─── Stars ─── */
  --star-gold:   #ffd700;
  --star-silver: #c0c0c0;
  --star-bronze: #cd7f32;
  --star-empty:  #e0e0e0;

  /* ─── Text ─── */
  --text-primary:   #1a1a2e;
  --text-secondary: #6b7280;
  --text-tertiary:  #9ca3af;
  --text-on-dark:   #ffffff;
  --text-on-pink:   #ffffff;
}
```

### World Color Gradients (used in cards, backgrounds)

```css
/* Each world gets a gradient pair */
.world-1-gradient { background: linear-gradient(135deg, #ff8fab, #ff5c7a); }
.world-2-gradient { background: linear-gradient(135deg, #ff9a3c, #ff6b00); }
.world-3-gradient { background: linear-gradient(135deg, #26c6b0, #00897b); }
.world-4-gradient { background: linear-gradient(135deg, #9b59d0, #6a1b9a); }
.world-5-gradient { background: linear-gradient(135deg, #ef5350, #b71c1c); }
.world-6-gradient { background: linear-gradient(135deg, #42a5f5, #1565c0); }
.world-7-gradient { background: linear-gradient(135deg, #f72585, #c2185b); }
.world-8-gradient { background: linear-gradient(135deg, #534bae, #1a237e); }
```

### Background Pattern

The canvas background uses a subtle dot-grid pattern for texture:

```css
body {
  background-color: var(--bg-canvas);
  background-image: radial-gradient(circle, rgba(255,128,171,0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## 5. Animation & Motion System

### Principles

1. **Spring, not linear** — everything bounces slightly at the end
2. **Staggered reveals** — lists appear item by item, not all at once
3. **Feedback is instant** — correct/wrong response in < 100ms
4. **Celebrations are big** — star earn, level complete deserve full moments
5. **Never block the user** — animations play alongside, not instead of, action

### Keyframe Library

```css
/* ─── Entry Animations ─── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ─── Attention Animations ─── */
@keyframes springPop {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25); }
  60%  { transform: scale(0.92); }
  80%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  15%       { transform: translateX(-8px) rotate(-2deg); }
  35%       { transform: translateX(8px) rotate(2deg); }
  55%       { transform: translateX(-6px) rotate(-1deg); }
  75%       { transform: translateX(6px) rotate(1deg); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0); }
  25%       { transform: rotate(-8deg); }
  75%       { transform: rotate(8deg); }
}

/* ─── Progress Animations ─── */
@keyframes fillBar {
  from { width: 0%; }
  to   { width: var(--target-width); }
}

@keyframes countUp {
  from { transform: translateY(8px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* ─── Star Animations ─── */
@keyframes starEarn {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  50%  { transform: scale(1.4) rotate(10deg); opacity: 1; }
  70%  { transform: scale(0.9) rotate(-5deg); }
  85%  { transform: scale(1.1) rotate(2deg); }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}

@keyframes starShimmer {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 4px rgba(255,215,0,0.3)); }
  50%       { filter: brightness(1.3) drop-shadow(0 0 12px rgba(255,215,0,0.8)); }
}

/* ─── XP Float ─── */
@keyframes xpFloat {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  60%  { opacity: 1; transform: translateY(-30px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.9); }
}

/* ─── Level Up ─── */
@keyframes levelUp {
  0%   { transform: scale(1); }
  20%  { transform: scale(1.5); }
  40%  { transform: scale(0.9); }
  60%  { transform: scale(1.2); }
  80%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}

/* ─── Streak Fire ─── */
@keyframes flicker {
  0%, 100% { transform: scale(1) translateY(0); }
  33%       { transform: scale(1.05) translateY(-2px); }
  66%       { transform: scale(0.97) translateY(1px); }
}

/* ─── Bubble Float (world map) ─── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}

/* ─── Button press ─── */
@keyframes btnPress {
  0%   { transform: translateY(0); box-shadow: var(--shadow-btn-primary); }
  50%  { transform: translateY(4px); box-shadow: 0 2px 0 #c55f85; }
  100% { transform: translateY(0); box-shadow: var(--shadow-btn-primary); }
}

/* ─── Confetti ─── */
@keyframes confettiFall {
  0%   { transform: translate(0, -10px) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--drift-x), 100vh) rotate(var(--spin)); opacity: 0; }
}

/* ─── Pulse glow (current level indicator) ─── */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,128,171, 0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(255,128,171, 0); }
}
```

### CSS Utility Classes (animation helpers)

```css
/* Timing functions */
.ease-spring { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
.ease-smooth { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

/* Duration utilities */
.duration-fast   { animation-duration: 0.2s; }
.duration-base   { animation-duration: 0.35s; }
.duration-slow   { animation-duration: 0.6s; }
.duration-slower { animation-duration: 0.9s; }

/* Stagger helpers (used in lists) */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.10s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.20s; }
.stagger-5 { animation-delay: 0.25s; }

/* Named animation classes */
.animate-fade-up      { animation: fadeUp 0.4s ease-out both; }
.animate-scale-in     { animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.animate-star-earn    { animation: starEarn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.animate-spring-pop   { animation: springPop 0.5s ease both; }
.animate-shake        { animation: shake 0.5s ease both; }
.animate-float        { animation: float 3s ease-in-out infinite; }
.animate-flicker      { animation: flicker 1.5s ease-in-out infinite; }
.animate-pulse-glow   { animation: pulseGlow 2s ease-in-out infinite; }
.animate-star-shimmer { animation: starShimmer 2s ease-in-out infinite; }
.animate-xp-float     { animation: xpFloat 1.2s ease-out forwards; }
.animate-level-up     { animation: levelUp 0.8s ease both; }
```

### Framer Motion Variants (React)

```typescript
// src/lib/motionVariants.ts

export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 28 } }
};

export const staggerChildren = {
  visible: { transition: { staggerChildren: 0.07 } }
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
};

export const springPop = {
  tap:  { scale: 0.94 },
  rest: { scale: 1 },
};

export const starReveal = {
  hidden:  { scale: 0, rotate: -30, opacity: 0 },
  visible: {
    scale: 1, rotate: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  }
};
```

---

## 6. Component Library

### 6.1 Primary Button

Visual: Tall, rounded, colored shadow giving a 3D "pressable" feel.

```
┌─────────────────────────────┐
│      🚀  Start Level        │  ← Nunito Bold, 18px
└─────────────────────────────┘
  ████████████████████████      ← 6px colored bottom shadow
```

States:
- **Default:** Full color, 6px shadow
- **Hover:** Shadow reduces to 4px, translates down 2px (feels like pressing)
- **Active/Press:** Shadow 2px, translates down 4px
- **Disabled:** 40% opacity, no shadow, cursor: not-allowed

```css
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  min-height: 56px;
  border-radius: var(--radius-lg);
  background: var(--pink-300);
  color: white;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-btn-primary);
  transform: translateY(0);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.btn-primary:hover {
  transform: translateY(2px);
  box-shadow: 0 4px 0 #c55f85;
}

.btn-primary:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #c55f85;
}
```

### 6.2 Level Node (World Map Bubble)

```
     ┌──────────────────┐
     │                  │
     │    ⭐⭐⭐         │  ← stars (only shown if played)
     │   [  42  ]       │  ← level number in circle
     │  The Adding 9    │  ← title below
     │      Trick       │
     └──────────────────┘

Circle states:
  ✓ Completed (3 stars) = Gold gradient circle, shimmer animation
  ✓ Completed (<3 stars) = Blue gradient circle
  ○ Next to play = Pink circle, pulse-glow animation
  ○ Unlocked = Grey circle
  🔒 Locked = Dark grey, lock icon
  💪 Boss = Larger circle (1.3x), yellow border, crown icon
```

### 6.3 Progress Bar (In-Game Stars)

```
  ⭐         ⭐         ⭐
   │          │          │
───●──────────●──────────●───
[=====░░░░░░░░░░░░░░░░░░░░░]
   8          12         16

Legend:
  ● = star marker (gold when passed, grey when not)
  = = filled progress
  ░ = unfilled
```

### 6.4 XP Toast Notification

Appears at top-right after every correct answer (in practice mode) or on level complete:

```
┌──────────────────┐
│  ⚡ +240 XP      │  ← slides in from right, fades out
│  ×1.3 streak     │  ← small multiplier line
└──────────────────┘
```

### 6.5 Streak Counter

```
  ╔═══════════════╗
  ║  🔥 8         ║
  ║  STREAK       ║
  ╚═══════════════╝
  
  At streak 5+: orange glow, flame flickers
  At streak 10+: flame grows larger, pulsing
  At streak 20+: rainbow border, full glow
```

### 6.6 World Card (World Select Screen)

```
┌─────────────────────────────────────────┐
│  [Gradient background matching world]    │
│                                          │
│  ➕  World 1                            │
│       Addition Foundation               │
│                                          │
│  [████████████░░░░░░░] 34/50 levels     │
│                                          │
│  ⭐⭐⭐ ×12   ⭐⭐ ×8   ⭐ ×14            │
└─────────────────────────────────────────┘
```

### 6.7 Achievement Badge

```
Unlocked:                      Locked:
┌───────────┐                  ┌───────────┐
│           │                  │           │
│    🔥     │                  │    ❓     │   (if secret)
│           │                  │           │
│  On Fire! │                  │    ???    │
│ 5 in a row│                  │ Keep      │
│           │                  │ playing.. │
│ ✓ Today   │                  │           │
└───────────┘                  └───────────┘
 Gold border                    Grey, blurred
```

### 6.8 Daily Streak Widget (Home Screen)

```
┌─────────────────────────────────────────────┐
│   🔥  23-Day Streak!                         │
│                                              │
│   [M] [T] [W] [T] [F] [S] [S]              │
│   [✓] [✓] [✓] [✓] [✓] [✓] [⬤]            │
│          Today →                             │
└─────────────────────────────────────────────┘
```

---

## 7. Screen-by-Screen Designs — Mobile

> All mobile designs target 390px wide (iPhone 14 standard). All heights are flexible.

---

### 7.1 Home Screen (Mobile)

```
╔═══════════════════════════════════╗
║  SkillSum              [👤 Profile] ║  ← Top bar, sticky
╠═══════════════════════════════════╣
║                                    ║
║  Good morning, Delin! 👋           ║  ← Personalized greeting, Nunito 24px
║  🔥 23 days • Lv.14 • 4,200 XP   ║  ← Status row, smaller text
║                                    ║
║ ─────────── TODAY ──────────────  ║
║  ┌───────────────────────────────┐ ║
║  │ 📅 Daily Challenge             │ ║
║  │ 1/3 complete  [██░░░░░░░]     │ ║
║  │ Reward: 2000 XP + 🏅 badge    │ ║
║  │           [Go →]              │ ║
║  └───────────────────────────────┘ ║
║                                    ║
║ ─────────── CONTINUE ───────────  ║
║  ┌───────────────────────────────┐ ║
║  │ 📚 Level 7 — Adding 9 Trick   │ ║
║  │ World 1: Addition ★☆☆         │ ║
║  │           [Continue →]        │ ║
║  └───────────────────────────────┘ ║
║                                    ║
║  ┌──────────────┐ ┌──────────────┐ ║
║  │ 📚 Learn     │ │ ⚡ Practice   │ ║
║  │ Mode         │ │ Mode          │ ║
║  │              │ │               │ ║
║  │ 400 Levels   │ │ Monkeytype    │ ║
║  │ 8 Worlds     │ │ style         │ ║
║  └──────────────┘ └──────────────┘ ║
║                                    ║
║  ─────── YOUR PROGRESS ──────────  ║
║  [XP bar: 4,200 / 5,000 to Lv 15] ║
║                                    ║
╚═══════════════════════════════════╝

Navigation: No bottom nav bar on mobile.
Everything accessible from the home screen cards.
```

**Animations:**
- Greeting text fades up on load (`fadeUp`, 0.4s)
- Daily challenge card slides in from left with slight delay
- Continue card slides in from right
- XP bar fills from current value with spring animation on mount
- Streak flame flickers continuously

---

### 7.2 World Select Screen (Mobile)

```
╔═══════════════════════════════════╗
║  ← Back    Choose Your World      ║  ← Back button + title
╠═══════════════════════════════════╣
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │ ╔══════ GRADIENT ═══════╗     │ ║
║  │ ║ ➕  World 1            ║     │ ║
║  │ ║ Addition Foundation    ║     │ ║
║  │ ╚═══════════════════════╝     │ ║
║  │ [████████████░░] 34/50        │ ║
║  └───────────────────────────────┘ ║
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │ ╔══════ GRADIENT ═══════╗     │ ║
║  │ ║ ➖  World 2            ║     │ ║
║  │ ║ Subtraction Strategies ║     │ ║
║  │ ╚═══════════════════════╝     │ ║
║  │ [░░░░░░░░░░░░░░] 0/50         │ ║
║  └───────────────────────────────┘ ║
║                                    ║
║  ┌─ ─ ─ ─ LOCKED ─ ─ ─ ─ ─ ─ ─ ┐ ║
║  │ ✖️  World 3                    │ ║
║  │ 🔒 Complete World 2 to unlock  │ ║
║  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘ ║
║                                    ║
╚═══════════════════════════════════╝
```

**Animations:**
- Each world card staggered fade-up (0.07s stagger between cards)
- Locked worlds appear at 40% opacity and slightly blurred
- Progress bar fills with spring animation when card enters viewport
- Hover/tap state: card lifts 4px with shadow increase

---

### 7.3 World Map (Mobile)

```
╔═══════════════════════════════════╗
║  ← World 1: Addition Foundation    ║
║  [██████████████████░░░] 34/50     ║
╠═══════════════════════════════════╣
║           (scrollable)             ║
║                                    ║
║        ┌──[BOSS 10]──┐             ║
║        │  💪 Giant   │             ║
║        │   bubble    │             ║
║        │  ⭐⭐⭐      │             ║
║        └─────────────┘             ║
║              │                     ║
║      ┌──────[9]──────┐            ║
║      │   ● Small     │            ║
║      │   bubble      │            ║
║      │   ⭐⭐☆        │            ║
║      └───────────────┘            ║
║              │                     ║
║   ┌────────[8]────────┐           ║
║   │  ● Small bubble    │          ║
║   │  ⭐⭐⭐             │          ║
║   └────────────────────┘          ║
║              │                     ║
║        ┌───[7]───┐  ←── PULSING   ║
║        │  NEXT!  │      GLOW      ║
║        │  ○ Pink  │               ║
║        └──────────┘               ║
║              │                     ║
║    ┌───[6]───┘                    ║
║    │ ● ⭐⭐⭐                      ║
║    └─────────┐                    ║
║         ┌───[5]───┐              ║
║         │ ● ⭐⭐☆  │              ║
║         └─────────┘               ║
║                                   ║
║  (scrolls to show all 50 levels)  ║
╚═══════════════════════════════════╝

Path style: Dashed/dotted curved SVG path connecting all bubbles
Colors: Each bubble has a colored shadow (world color)
Bubbles "float" with gentle vertical animation
```

**Animations:**
- Path draws itself with SVG stroke animation on first load
- Completed bubbles have a shimmer sweep animation (gold ones)
- Current level bubble pulses with glow ring
- Boss bubbles are 1.4× larger and have a crown emoji
- Tapping a level causes bubble to spring-scale up before opening detail

---

### 7.4 Level Detail Popup (Mobile)

Appears as a **bottom sheet** sliding up from bottom of screen (not a separate page):

```
╔═══════════════════════════════════╗
║                                    ║
║      [Drag handle]                 ║
╠═══════════════════════════════════╣
║                                    ║
║  Level 7                           ║  ← small label
║  The 'Adding 9' Trick              ║  ← H1, Nunito
║                                    ║
║  Add 9 by adding 10, then -1       ║  ← description
║                                    ║
║  ─────── STAR TARGETS ───────────  ║
║  ┌──────────┬──────────┬──────────┐║
║  │    ⭐    │   ⭐⭐   │  ⭐⭐⭐  ║
║  │  8 pts   │  12 pts  │  16 pts  ║
║  └──────────┴──────────┴──────────┘║
║                                    ║
║  ⏱ Time limit: 75 seconds          ║
║                                    ║
║  ─────── YOUR BEST ──────────────  ║
║  ⭐⭐☆ | 11 correct | 85% accuracy ║
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │      🚀 Start Level!          │ ║
║  └───────────────────────────────┘ ║
║  ┌───────────────────────────────┐ ║
║  │      📖 See the tip first     │ ║
║  └───────────────────────────────┘ ║
║                                    ║
╚═══════════════════════════════════╝
```

**Animations:**
- Bottom sheet slides up with spring (translateY: 100% → 0)
- Background dims with overlay
- Content fades up inside the sheet
- Tap outside → sheet slides back down

---

### 7.5 Pre-Lesson / Tip Screen (Mobile)

```
╔═══════════════════════════════════╗
║  ← Back              Level 7 / 50 ║
╠═══════════════════════════════════╣
║                                    ║
║  💡 Today's Trick                  ║  ← label
║                                    ║
║  The 'Adding 9' Method             ║  ← H1
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │  34 + 9 = ?                   │ ║  ← Example, big pink text
║  │                               │ ║
║  │  Step 1:   34 + 10 = 44       │ ║  ← appears with animation
║  │             (add 10 instead)  │ ║
║  │                               │ ║
║  │  Step 2:   44 − 1  = 43       │ ║  ← appears after tap
║  │             (then minus 1)    │ ║
║  │                               │ ║
║  │  ✓ Answer: 43 ✓               │ ║  ← appears last
║  └───────────────────────────────┘ ║
║                                    ║
║  [Step 1 •○○]  ← tap to advance   ║  ← dot navigation
║                                    ║
║  ─────── WHY IT WORKS ──────────  ║
║  9 is one less than 10.            ║
║  Adding 10 is easy (just +1 to     ║
║  tens digit), so use that trick!   ║
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │   I'm Ready — Let's Go! 🚀    │ ║
║  └───────────────────────────────┘ ║
╚═══════════════════════════════════╝
```

**Animations:**
- Each step in the diagram reveals with a slide-right + fade animation
- Number transforms: show "34" → "44" with a counting up animation
- The subtraction shows with a crossout through the 10, then -1 appears
- "I'm Ready" button pulses gently until tapped

---

### 7.6 Gameplay Screen (Mobile)

This is the MOST critical screen. It must be clean and distraction-free.

```
╔═══════════════════════════════════╗
║  World 1 · Lv7     ⏸  [⚙️ 37s]   ║  ← Minimal top bar. Timer circular.
╠═══════════════════════════════════╣
║                                    ║
║  [⭐────────●────────●────────⭐⭐⭐] ║  ← Star progress bar
║   0        8       12      16      ║
║                                    ║
╠═══════════════════════════════════╣
║                                    ║
║                                    ║
║                                    ║
║              47 + 9                ║  ← HUGE, centered, Nunito 900
║                                    ║  ← Question is the HERO of this screen
║                                    ║
║                                    ║
╠═══════════════════════════════════╣
║                                    ║
║  Score: 11    🔥 5 streak          ║  ← score and streak, compact
║                                    ║
║  ┌─────────────────────────────┐   ║
║  │          56                 │   ║  ← Answer input, huge text
║  └─────────────────────────────┘   ║
║                                    ║
║  ┌─────────────────────────────┐   ║
║  │        ✓ Submit             │   ║  ← Big primary button
║  └─────────────────────────────┘   ║
║                                    ║
║  [1][2][3][4][5][6][7][8][9][0][⌫] ║  ← Custom numpad (no system keyboard)
╚═══════════════════════════════════╝

Key design decisions:
- Use CUSTOM number pad (not system keyboard) on mobile.
  System keyboard pushes content up and breaks the layout.
- Question takes up 40% of screen height.
- Timer is circular in top-right, small but visible.
- NO distractions: no advertisements, no extra buttons visible.
- Pause accessible via ⏸ icon only.
```

**Animations (in-game):**
- Correct answer: input flashes green, score increments with spring animation, streak counter jumps
- Wrong answer: screen shakes subtly, input flashes red, streak resets
- Star earned: star icon at top animates with `starEarn` keyframe + sound
- Timer turns orange at 15s, red at 10s with a pulse
- XP toast floats up from score when question answered correctly (practice mode)

**Custom Numpad Design:**

```
┌─────────────────────────────────────┐
│  [  7  ]   [  8  ]   [  9  ]       │
│  [  4  ]   [  5  ]   [  6  ]       │
│  [  1  ]   [  2  ]   [  3  ]       │
│  [ ─ ]     [  0  ]   [ ⌫ ]        │
└─────────────────────────────────────┘

Each key:
- 60px tall, rounded (12px radius)
- White background, light border
- Active/press: scale 0.9, bg slightly darkened
- Vibration on press (if supported by device)
```

---

### 7.7 Post-Lesson Results (Mobile)

```
╔═══════════════════════════════════╗
║                                    ║
║           ⭐  ⭐  ⭐               ║  ← Stars reveal one at a time
║                                    ║  ← Dramatic pause between each
║       Level Complete!              ║
║                                    ║
╠═══════════════════════════════════╣
║                                    ║
║  ┌──────────┬──────────┬──────────┐║
║  │ Correct  │  Wrong   │ Accuracy ║
║  │   14     │    2     │  87.5%   ║
║  └──────────┴──────────┴──────────┘║
║                                    ║
║  ┌──────────┬──────────┬──────────┐║
║  │ Best     │ Avg Spd  │ XP Won   ║
║  │ Streak 8 │  2.1s/q  │ +380     ║
║  └──────────┴──────────┴──────────┘║
║                                    ║
║  ─────── SPEED CHART ────────────  ║
║  ▁▃▅▇▆▇▇▅▆▇▇▆▅▄▇▇               ║  ← Bar chart
║  (answers per 15-second block)     ║
║                                    ║
║  ─── WANT MORE STARS? ──────────  ║
║  You need 2 more to reach ⭐⭐⭐    ║
║  Try again with the trick in mind! ║
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │       Next Level →            │ ║
║  └───────────────────────────────┘ ║
║  ┌───────────────────────────────┐ ║
║  │    ↺ Retry for More Stars     │ ║
║  └───────────────────────────────┘ ║
╚═══════════════════════════════════╝
```

**Animations:**
- Screen loads with white flash (like a camera flash — satisfying!)
- Stars reveal one by one with 0.6s intervals, each with `starEarn` animation + sound
- If 3 stars: confetti explodes from top of screen
- Stats grid items count up from 0 with spring animation
- XP number floats up from bottom before settling in stat cell
- Bar chart bars grow upward with staggered delay

---

### 7.8 Practice Setup Screen (Mobile)

```
╔═══════════════════════════════════╗
║  ← Back         ⚡ Practice Mode  ║
╠═══════════════════════════════════╣
║                                    ║
║  ─── MODE ──────────────────────  ║
║  [⏱ Time] [🎯 Count] [🧘 Zen]     ║  ← Pill selector, 3 options
║                                    ║
║  ─── TIME LIMIT ────────────────  ║
║  [ 15s ] [ 30s ] [●60s●] [ 120s ] ║  ← Pill selector, active = pink
║                                    ║
║  ─── OPERATIONS ────────────────  ║
║  [●+●] [●-●] [ × ] [ ÷ ]          ║  ← Multi-select pills
║                                    ║
║  ─── DIFFICULTY ────────────────  ║
║  [●Easy 1-15●] [Medium] [Hard]     ║
║                                    ║
║ ──────────────────────────────────║
║  🏆 Your PB for this config:       ║
║     42 correct  |  91% accuracy    ║
║     Set on March 12                ║
║ ──────────────────────────────────║
║                                    ║
║  ┌───────────────────────────────┐ ║
║  │       ▶ Start Practice        │ ║
║  └───────────────────────────────┘ ║
╚═══════════════════════════════════╝
```

**Animations:**
- PB card fades in with slight scale-up when config matches saved PB
- When config changes: PB card updates with a quick flash transition
- Pill selector: active pill morphs with background color transition (spring)

---

### 7.9 Profile Screen (Mobile)

```
╔═══════════════════════════════════╗
║  ← Back                  ⚙️ Edit  ║
╠═══════════════════════════════════╣
║                                    ║
║  🧠  Delin                         ║  ← Avatar + Name
║       Level 14 · 4,200 XP          ║
║                                    ║
║  [████████████████░░░░] → Lv.15    ║  ← XP progress
║                                    ║
║  🔥 23 days      📚 34 levels done ║
║                                    ║
╠═══════════════════════════════════╣
║  [Stats]  [Achievements]  [History] ║  ← Tab bar
╠═══════════════════════════════════╣
║                                    ║
║  ─── STATS ─────────────────────  ║
║  ┌──────────────┐ ┌──────────────┐ ║
║  │ 1,247 ✅     │ │   89.3% 🎯   │ ║
║  │ Correct      │ │ Accuracy     │ ║
║  └──────────────┘ └──────────────┘ ║
║  ┌──────────────┐ ┌──────────────┐ ║
║  │  23 Sessions │ │  2.3s Avg    │ ║
║  │ this week    │ │ per answer   │ ║
║  └──────────────┘ └──────────────┘ ║
║                                    ║
║  ─── WORLD PROGRESS ────────────  ║
║  World 1  [████████████░░] 34/50   ║
║  World 2  [░░░░░░░░░░░░░░] 0/50    ║
║  ...                               ║
╚═══════════════════════════════════╝
```

---

## 8. Screen-by-Screen Designs — Desktop

> Desktop targets 1280px wide with a 3-column layout. Minimum 768px supported.

---

### 8.1 Desktop Layout System

The desktop version uses a **persistent sidebar** on the left:

```
╔══════════╦═══════════════════════════════════════════╗
║          ║                                            ║
║          ║          MAIN CONTENT AREA                ║
║ SIDEBAR  ║        (changes per screen)               ║
║  (fixed) ║                                            ║
║ 260px    ║          1020px                            ║
╚══════════╩════════════════════════════════════════════╝
```

**Sidebar Contents (always visible):**

```
┌──────────────────────────────┐
│                              │
│  🧠 SkillSum                  │  ← Logo + name
│                              │
│  ┌──────────────────────┐   │
│  │ 🧠 Delin   Lv. 14   │   │  ← Avatar + level
│  │ [███████░░] → Lv.15  │   │  ← XP bar
│  │ 🔥 23 days           │   │  ← Streak
│  └──────────────────────┘   │
│                              │
│  ─── NAVIGATE ─────────    │
│  🏠  Home                   │  ← Active = pink bg
│  📚  Learn Mode              │
│  ⚡  Practice Mode           │
│  📅  Daily Challenge         │
│  👤  Profile                 │
│                              │
│  ─── QUICK STATS ──────    │
│  Today: 0 XP earned         │
│  Best streak: 42 🔥          │
│  Accuracy: 89.3% 🎯          │
│                              │
└──────────────────────────────┘
```

---

### 8.2 Home Screen (Desktop)

```
╔══════════╦═══════════════════════════════════════════╗
║          ║  Good morning, Delin! 👋                  ║
║ SIDEBAR  ║  Wednesday, April 7                       ║
║          ╠═══════════════════════════════════════════╣
║          ║                                           ║
║          ║  ┌──────────────┐  ┌────────────────────┐║
║          ║  │  📅 DAILY    │  │  📚 CONTINUE        ║
║          ║  │  CHALLENGE   │  │  Level 7 of World 1 ║
║          ║  │              │  │  The Adding 9 Trick  ║
║          ║  │  1/3 tasks   │  │  ⭐⭐☆ Your best    ║
║          ║  │  ████░░░░░   │  │  [Continue →]        ║
║          ║  │  [Start →]   │  └────────────────────┘║
║          ║  └──────────────┘                         ║
║          ║                                           ║
║          ║  ┌──────────────┐  ┌──────────────┐      ║
║          ║  │ 📚 Learn     │  │ ⚡ Practice   │      ║
║          ║  │ Mode         │  │ Mode          │      ║
║          ║  │              │  │               │      ║
║          ║  │ 400 Levels   │  │ Your PB: 42   │      ║
║          ║  │ 8 Worlds     │  │ [Start Now →] │      ║
║          ║  │ [Explore →]  │  └──────────────┘      ║
║          ║  └──────────────┘                         ║
║          ║                                           ║
║          ║  ─── RECENT ACHIEVEMENTS ──────────────  ║
║          ║  🔥 On Fire! (5 streak)  — Yesterday      ║
║          ║  ⭐ First Level Done     — March 30        ║
╚══════════╩═══════════════════════════════════════════╝
```

---

### 8.3 World Map (Desktop)

The world map gets a **two-panel layout** on desktop:

```
╔══════════╦══════════════════════╦══════════════════════╗
║          ║    WORLD MAP         ║   LEVEL DETAIL       ║
║ SIDEBAR  ║    (left panel)      ║   (right panel)      ║
║          ║                      ║                      ║
║          ║  World 1: Addition   ║  Level 7             ║
║          ║  Foundation          ║  The Adding 9 Trick  ║
║          ║  [████████░] 34/50   ║                      ║
║          ║                      ║  ⭐ 8  ⭐⭐ 12  ⭐⭐⭐ 16║
║          ║    [BOSS 10]         ║                      ║
║          ║      💪 ⭐⭐⭐        ║  ⏱ 75 seconds       ║
║          ║       │              ║                      ║
║          ║      [9] ⭐⭐☆        ║  Your best:          ║
║          ║       │              ║  ⭐⭐☆ | 11 correct  ║
║          ║  → [7] ← CURRENT     ║                      ║
║          ║   🔵 pulsing          ║  [💡 See Tip]        ║
║          ║       │              ║                      ║
║          ║      [6] ⭐⭐⭐        ║  [🚀 Start Level!]   ║
║          ║       │              ║                      ║
║          ║      [5] ⭐⭐☆        ║                      ║
║          ║                      ║                      ║
╚══════════╩══════════════════════╩══════════════════════╝

Left panel: scrollable, shows bubble path
Right panel: sticky, updates when level is selected
Clicking a level highlights it in left panel and updates right panel
```

---

### 8.4 Gameplay Screen (Desktop)

Desktop gameplay is wider — use the extra space wisely:

```
╔══════════╦═══════════════════════════════════════════╗
║          ║                                           ║
║ SIDEBAR  ║  World 1 · Level 7 · The Adding 9 Trick  ║  ← breadcrumb
║          ╠═══════════════════════════════════════════╣
║          ║                                           ║
║          ║  [⭐────────────●────────●──────────⭐⭐⭐] ║  ← full width
║          ║   0            8        12           16  ║
║          ║                                           ║
║          ╠═══════════════════════════════════════════╣
║          ║                                           ║
║          ║  ┌──────────────────────────────────────┐ ║
║          ║  │                                      │ ║
║          ║  │           47 + 9 = ?                 │ ║  ← Giant question
║          ║  │                                      │ ║
║          ║  └──────────────────────────────────────┘ ║
║          ║                                           ║
║          ║  ┌───────────────┐  ┌──────────────────┐  ║
║          ║  │               │  │                  │  ║
║          ║  │  [ 56    ]    │  │   ⏱  37s        │  ║
║          ║  │               │  │   (circular)     │  ║
║          ║  │  [✓ Submit]   │  │   Score: 11      │  ║
║          ║  │               │  │   🔥 5 streak    │  ║
║          ║  └───────────────┘  └──────────────────┘  ║
║          ║                                           ║
║          ║  (no custom numpad on desktop —           ║
║          ║   users type directly with keyboard)      ║
╚══════════╩═══════════════════════════════════════════╝

Desktop uses real keyboard input (no custom numpad needed).
Hit Enter to submit — no need to click Submit button.
```

---

### 8.5 Practice Results (Desktop)

```
╔══════════╦═════════════════════════════════════════════╗
║          ║                                              ║
║ SIDEBAR  ║  ⚡ Practice Results                         ║
║          ║                                              ║
║          ║  🏆 NEW PERSONAL BEST! (if applicable)       ║
║          ║                                              ║
║          ║  ┌──────────────────────────────────────┐   ║
║          ║  │           42                          │   ║  ← huge
║          ║  │       correct answers                 │   ║
║          ║  └──────────────────────────────────────┘   ║
║          ║                                              ║
║          ║  ┌──────────┬──────────┬──────────┬────────┐║
║          ║  │ Accuracy │ Avg Speed│ Best Strk│ XP     ║
║          ║  │  91.3%   │  1.8s/q  │ 🔥 12    │ +520   ║
║          ║  └──────────┴──────────┴──────────┴────────┘║
║          ║                                              ║
║          ║  ─── PERFORMANCE CHART ───────────────────  ║
║          ║                                              ║
║          ║  ▁▂▃▅▇▆▇▇▇▅▆▇▇▆▅▄▇▇▆▅▅▄▃▂▁ (line chart)   ║
║          ║  (per-10-second correct answers)             ║
║          ║                                              ║
║          ║  ─── OPERATIONS BREAKDOWN ───────────────   ║
║          ║  + Addition:      22 correct | 95.7% acc    ║
║          ║  - Subtraction:   20 correct | 87.0% acc    ║
║          ║                                              ║
║          ║  [↺ Same Config]  [⚙️ Change]  [🏠 Home]    ║
╚══════════╩═════════════════════════════════════════════╝
```

---

### 8.6 Profile Screen (Desktop)

```
╔══════════╦═════════════════════════════════════════════╗
║          ║  👤 Profile                                  ║
║          ║                                              ║
║ SIDEBAR  ║  ┌────────────────────────────────────────┐  ║
║          ║  │  🧠  Delin                              │  ║
║          ║  │      Level 14 · 4,200 XP               │  ║
║          ║  │  [████████████████░░░░] 4200/5000       │  ║
║          ║  │  🔥 23 days · 📅 Joined March 2025      │  ║
║          ║  └────────────────────────────────────────┘  ║
║          ║                                              ║
║          ║  [Stats]  [Achievements]  [History]          ║
║          ║  ────────────────────────────────────────    ║
║          ║                                              ║
║          ║  ┌──────────┐ ┌──────────┐ ┌──────────┐     ║
║          ║  │ 1,247 ✅ │ │  89.3%  │ │ 34 lvls  │     ║
║          ║  │ Correct  │ │ Accuracy│ │ Complete │     ║
║          ║  └──────────┘ └──────────┘ └──────────┘     ║
║          ║                                              ║
║          ║  ─── WORLD PROGRESS ──────────────────────  ║
║          ║  World 1: [████████████████████████░] 34/50 ║
║          ║  World 2: [░░░░░░░░░░░░░░░░░░░░░░░░░] 0/50  ║
║          ║  ...                                         ║
╚══════════╩═════════════════════════════════════════════╝
```

---

## 9. Responsive Layout Strategy

### Breakpoints

```css
/* Mobile first */
/* Default: 0px – 767px (mobile) */

/* Tablet: 768px – 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { }

/* Wide desktop: 1440px+ */
@media (min-width: 1440px) { }
```

### Layout Changes Per Breakpoint

| Element | Mobile (< 768) | Tablet (768–1023) | Desktop (1024+) |
|---|---|---|---|
| Navigation | Cards on home screen | Side drawer | Persistent sidebar |
| World Map | Single column, scroll down | Single column, wider | Two panels (map + detail) |
| Gameplay | Full screen, custom numpad | Full screen, keyboard | Centered 600px, keyboard |
| Results | Full screen cards | Centered 600px | Two columns |
| Profile | Tabbed, scroll | Two columns | Three columns |
| Card grid | 1 column | 2 columns | 3 columns |

### CSS Grid Layout System

```css
/* Main layout shell */
.app-shell {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr; /* mobile: no sidebar */
  grid-template-rows: auto 1fr; /* header + content */
}

@media (min-width: 1024px) {
  .app-shell {
    grid-template-columns: 260px 1fr; /* desktop: sidebar + content */
    grid-template-rows: 1fr; /* single row, full height */
  }
}

/* Sidebar */
.sidebar {
  display: none; /* hidden on mobile */
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 260px;
  overflow-y: auto;
  background: white;
  border-right: 1px solid rgba(0,0,0,0.06);
  z-index: var(--z-sticky);
}

@media (min-width: 1024px) {
  .sidebar { display: flex; flex-direction: column; }
}

/* Content area */
.main-content {
  min-height: 100vh;
  overflow-y: auto;
}

@media (min-width: 1024px) {
  .main-content {
    margin-left: 260px;
  }
}

/* Centered content container (used for gameplay, results) */
.content-center {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}
```

### Custom Numpad (Mobile Only)

```css
.numpad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  padding: var(--space-4);
}

/* Hide on desktop — use native keyboard */
@media (min-width: 768px) {
  .numpad { display: none; }
}
```

---

## 10. Implementation Code Snippets

### 10.1 Sidebar Component (Desktop)

```tsx
// src/components/shared/Sidebar.tsx
'use client';

import { type AppScreen } from '@/lib/types';

interface SidebarProps {
  currentScreen: AppScreen;
  profile: { username: string; avatarEmoji: string; accountLevel: number; xp: number; dailyStreak: number; };
  onNavigate: (screen: AppScreen) => void;
}

const NAV_ITEMS = [
  { screen: 'home' as AppScreen,           icon: '🏠', label: 'Home' },
  { screen: 'worldSelect' as AppScreen,    icon: '📚', label: 'Learn Mode' },
  { screen: 'practiceSetup' as AppScreen,  icon: '⚡', label: 'Practice' },
  { screen: 'dailyChallenge' as AppScreen, icon: '📅', label: 'Daily Challenge' },
  { screen: 'profile' as AppScreen,        icon: '👤', label: 'Profile' },
];

export function Sidebar({ currentScreen, profile, onNavigate }: SidebarProps) {
  const xpToNext = Math.floor(500 * Math.pow(profile.accountLevel, 1.5));
  const xpProgress = (profile.xp / xpToNext) * 100;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-black" style={{ fontFamily: 'Nunito', color: 'var(--pink-300)' }}>
          SkillSum
        </h1>
      </div>

      {/* Profile mini-card */}
      <div className="p-4 mx-4 my-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{profile.avatarEmoji}</span>
          <div>
            <div className="font-bold text-sm">{profile.username}</div>
            <div className="text-xs text-gray-500">Level {profile.accountLevel}</div>
          </div>
        </div>
        {/* XP bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${xpProgress}%`, background: 'linear-gradient(90deg, var(--pink-300), var(--pink-400))' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{profile.xp.toLocaleString()} XP</span>
          <span>Lv.{profile.accountLevel + 1}</span>
        </div>
        {/* Streak */}
        <div className="mt-2 text-sm font-semibold" style={{ color: 'var(--streak)' }}>
          🔥 {profile.dailyStreak} day streak
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1">
        {NAV_ITEMS.map(item => {
          const isActive = currentScreen === item.screen ||
            (item.screen === 'worldSelect' && ['worldMap', 'preLesson', 'playing', 'postLesson'].includes(currentScreen));
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-left transition-all duration-200"
              style={{
                backgroundColor: isActive ? 'var(--pink-50)' : 'transparent',
                color: isActive ? 'var(--pink-400)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span style={{ fontFamily: 'DM Sans' }}>{item.label}</span>
              {isActive && <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--pink-300)' }} />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
```

### 10.2 Custom Number Pad (Mobile)

```tsx
// src/components/shared/NumPad.tsx
'use client';

interface NumPadProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export function NumPad({ value, onChange, onSubmit }: NumPadProps) {
  const handleKey = (key: string) => {
    if (key === '⌫') {
      onChange(value.slice(0, -1));
    } else if (key === '─') {
      // Toggle negative (if needed)
      onChange(value.startsWith('-') ? value.slice(1) : '-' + value);
    } else {
      if (value.length < 6) onChange(value + key);
    }
  };

  const keys = ['7','8','9','4','5','6','1','2','3','─','0','⌫'];

  return (
    <div className="grid grid-cols-3 gap-2 p-4 md:hidden">
      {keys.map(key => (
        <button
          key={key}
          onClick={() => key === '0' && value === '' && key !== '0' ? null : handleKey(key)}
          onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.92)'; e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
          onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'white'; }}
          className="h-14 rounded-xl font-bold text-xl"
          style={{
            backgroundColor: 'white',
            border: '2px solid #f0f0f0',
            fontFamily: 'Nunito',
            color: key === '⌫' ? '#f44336' : key === '─' ? '#ff9800' : '#1a1a2e',
            transition: 'transform 0.1s ease, background-color 0.1s ease',
            boxShadow: '0 2px 0 #e0e0e0',
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
```

### 10.3 Star Progress Bar (In-Game)

```tsx
// src/components/shared/StarProgressBar.tsx
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
  const prevEarned = useRef(0);
  const stars = current >= star3 ? 3 : current >= star2 ? 2 : current >= star1 ? 1 : 0;
  const progress = Math.min((current / star3) * 100, 100);

  useEffect(() => {
    if (stars > prevEarned.current) {
      onStarEarned?.(stars as 1|2|3);
      prevEarned.current = stars;
    }
  }, [stars, onStarEarned]);

  const markers = [
    { score: star1, star: 1, pos: (star1 / star3) * 100 },
    { score: star2, star: 2, pos: (star2 / star3) * 100 },
    { score: star3, star: 3, pos: 100 },
  ];

  return (
    <div className="px-4 py-3 w-full">
      <div className="relative h-3 rounded-full overflow-visible" style={{ backgroundColor: '#e0e0e0' }}>
        {/* Fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--pink-200), var(--pink-300))',
            boxShadow: '0 0 8px rgba(255,128,171,0.4)',
          }}
        />
        {/* Star markers */}
        {markers.map(({ score, star, pos }) => {
          const earned = current >= score;
          return (
            <div
              key={star}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${pos}%` }}
            >
              <span
                className={`text-2xl transition-all duration-500 ${earned ? 'animate-star-shimmer' : 'grayscale opacity-40'}`}
                style={{ filter: earned ? 'drop-shadow(0 0 6px rgba(255,215,0,0.8))' : undefined }}
              >
                ⭐
              </span>
            </div>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex justify-between text-xs mt-1 px-1" style={{ color: 'var(--text-tertiary)', fontFamily: 'DM Sans' }}>
        <span>{current} correct</span>
        <span>{star3} for ⭐⭐⭐</span>
      </div>
    </div>
  );
}
```

### 10.4 XP Toast Notification

```tsx
// src/components/shared/XPToast.tsx
'use client';

import { useEffect, useState } from 'react';

interface XPToastProps {
  xp: number;
  multiplier?: number;
  trigger: number; // change this value to re-trigger
}

export function XPToast({ xp, multiplier, trigger }: XPToastProps) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger > 0) {
      setVisible(true);
      setKey(k => k + 1);
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div
      key={key}
      className="fixed top-20 right-4 z-toast pointer-events-none"
      style={{ animation: 'xpFloat 1.5s ease-out forwards' }}
    >
      <div
        className="flex flex-col items-end gap-0.5 px-4 py-2 rounded-2xl shadow-lg"
        style={{ backgroundColor: 'var(--xp-gold)', color: '#1a1a2e' }}
      >
        <span className="font-black text-lg" style={{ fontFamily: 'Nunito' }}>⚡ +{xp} XP</span>
        {multiplier && multiplier > 1 && (
          <span className="text-xs font-semibold opacity-70">×{multiplier.toFixed(1)} streak</span>
        )}
      </div>
    </div>
  );
}
```

### 10.5 Global CSS — Full Implementation

```css
/* src/app/globals.css — Complete 2.0 styles */

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');
@import "tailwindcss";

/* ─── Design Tokens ─── */
:root {
  --pink-50:  #fff0f5;
  --pink-100: #ffe0ec;
  --pink-200: #ffb3cc;
  --pink-300: #ff80ab;
  --pink-400: #ff5c96;
  --pink-500: #e0396e;
  --pink-600: #c55f85;

  --bg-canvas:   #fef6f9;
  --bg-card:     #ffffff;
  --bg-surface:  #fdf2f6;

  --text-primary:   #1a1a2e;
  --text-secondary: #6b7280;
  --text-tertiary:  #9ca3af;

  --correct:  #4caf50;
  --wrong:    #f44336;
  --streak:   #ff6b35;
  --xp-gold:  #ffd700;

  --font-display: 'Nunito', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --radius-sm:   8px;
  --radius-md:   14px;
  --radius-lg:   20px;
  --radius-xl:   28px;
  --radius-full: 9999px;

  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px;  --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px;

  --shadow-btn-primary: 0 6px 0 #c55f85;
  --glow-primary: 0 0 20px rgba(255, 128, 171, 0.4);
  --glow-gold:    0 0 20px rgba(255, 215, 0, 0.5);

  --z-sticky:  200;
  --z-modal:   1000;
  --z-toast:   2000;
  --z-confetti: 9999;
}

/* ─── Base ─── */
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  background-color: var(--bg-canvas);
  background-image: radial-gradient(circle, rgba(255,128,171,0.07) 1px, transparent 1px);
  background-size: 24px 24px;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior-y: contain;
  -webkit-tap-highlight-color: transparent;
}

/* Prevent zoom on input focus (iOS) */
input, textarea { font-size: 16px !important; }

/* Minimum touch targets */
button { min-height: 44px; touch-action: manipulation; }

/* ─── Layout ─── */
.app-shell {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .app-shell { grid-template-columns: 260px 1fr; }
}

.sidebar {
  display: none;
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 260px;
  overflow-y: auto;
  background: white;
  border-right: 1px solid rgba(0,0,0,0.06);
  z-index: var(--z-sticky);
  flex-direction: column;
}

@media (min-width: 1024px) { .sidebar { display: flex; } }

.main-content { min-height: 100vh; overflow-y: auto; }

@media (min-width: 1024px) { .main-content { margin-left: 260px; } }

.content-center {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

/* ─── Animations (from Section 5) ─── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes springPop {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.25); }
  60%  { transform: scale(0.92); }
  80%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  15%      { transform: translateX(-8px); }
  35%      { transform: translateX(8px); }
  55%      { transform: translateX(-6px); }
  75%      { transform: translateX(6px); }
}
@keyframes starEarn {
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  50%  { transform: scale(1.4) rotate(10deg); opacity: 1; }
  70%  { transform: scale(0.9) rotate(-5deg); }
  85%  { transform: scale(1.1) rotate(2deg); }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}
@keyframes starShimmer {
  0%,100% { filter: brightness(1) drop-shadow(0 0 4px rgba(255,215,0,0.3)); }
  50%      { filter: brightness(1.3) drop-shadow(0 0 12px rgba(255,215,0,0.8)); }
}
@keyframes xpFloat {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  60%  { opacity: 1; transform: translateY(-30px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.9); }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}
@keyframes pulseGlow {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,128,171, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(255,128,171, 0); }
}
@keyframes flicker {
  0%,100% { transform: scale(1) translateY(0); }
  33%      { transform: scale(1.05) translateY(-2px); }
  66%      { transform: scale(0.97) translateY(1px); }
}
@keyframes levelUp {
  0%   { transform: scale(1); }
  20%  { transform: scale(1.5); }
  40%  { transform: scale(0.9); }
  60%  { transform: scale(1.2); }
  80%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes confettiFall {
  0%   { transform: translate(0,-10px) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--drift-x, 0), 100vh) rotate(var(--spin, 360deg)); opacity: 0; }
}

/* Animation utility classes */
.animate-fade-up      { animation: fadeUp 0.4s ease-out both; }
.animate-scale-in     { animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.animate-spring-pop   { animation: springPop 0.5s ease both; }
.animate-shake        { animation: shake 0.5s ease both; }
.animate-star-earn    { animation: starEarn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.animate-star-shimmer { animation: starShimmer 2s ease-in-out infinite; }
.animate-float        { animation: float 3s ease-in-out infinite; }
.animate-pulse-glow   { animation: pulseGlow 2s ease-in-out infinite; }
.animate-flicker      { animation: flicker 1.5s ease-in-out infinite; }
.animate-level-up     { animation: levelUp 0.8s ease both; }
.animate-xp-float     { animation: xpFloat 1.5s ease-out forwards; }

/* Stagger delays */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.10s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.20s; }
.stagger-5 { animation-delay: 0.25s; }

/* ─── Accessibility ─── */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
}

*:focus-visible {
  outline: 3px solid var(--pink-300);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Reference: Which Animation Goes Where

| Event | Animation | Duration |
|---|---|---|
| Screen transition | `fadeUp` staggered | 0.4s |
| Button tap | `scale(0.94)` → `scale(1)` | 0.12s |
| Correct answer | Green flash + `springPop` on score | 0.3s |
| Wrong answer | `shake` on question card | 0.5s |
| Star earned | `starEarn` on ⭐ + sound | 0.7s |
| 3-star result | Confetti + `levelUp` on header | Full celebration |
| Level unlocked | New bubble slides in from below | 0.5s |
| XP earned | `xpFloat` toast from answer area | 1.5s |
| Streak milestone | `flicker` on flame + border glow | Continuous |
| World map load | Path draws with SVG dash-offset | 1.0s |
| Achievement unlock | Modal scales in + golden glow | 0.6s |
| PB achieved | `springPop` on score + gold flash | 0.8s |

---

*SkillSum 2.0 UI Design Plan — Designed for Mobile & Desktop | April 2026*
