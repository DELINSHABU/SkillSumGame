# SkillSum 2.0 — Custom SVG & Asset Requirement List

This document outlines every custom visual asset required for SkillSum 2.0, organized by category. Designing these as custom SVGs rather than using standard emojis will ensure a cohesive, premium "Soft Arcade" aesthetic across all devices.

## 1. Gamification & Core Progress Icons
These are the most frequently seen assets. They need to be highly polished, warm, and support animation (like popping or glowing).

* **Stars (The Core Currency):**
    * `star-empty.svg` (Gray/Inactive state)
    * `star-bronze.svg` (Level 1 threshold)
    * `star-silver.svg` (Level 2 threshold)
    * `star-gold.svg` (Level 3 / Perfect threshold)
* **Streak Fire:**
    * `streak-flame.svg` (Needs to look good small for the header, and support a glowing/flickering CSS animation).
* **Experience Points (XP):**
    * `xp-lightning.svg` (Used for the top header and post-lesson toast notifications).
* **Accuracy & Results:**
    * `target-bullseye.svg` (Used for accuracy stats).
    * `check-correct.svg` (Green, rounded, friendly checkmark).
    * `cross-wrong.svg` (Red, rounded, non-aggressive X).

## 2. Global Navigation & UI Elements
Clean, minimal icons with a rounded terminal style to match the Nunito/DM Sans typography.

* `nav-home.svg` (Home screen)
* `nav-learn.svg` (Books or a brain icon for the 400-level Learn Mode)
* `nav-practice.svg` (Lightning bolt or stopwatch for Practice Mode)
* `nav-daily.svg` (Calendar with a checkmark for Daily Challenges)
* `nav-profile.svg` (User silhouette or avatar placeholder)
* `icon-back-arrow.svg` (Left-facing, soft rounded arrow)
* `icon-settings.svg` (Gear icon for profile/settings)
* `icon-pause.svg` (Pause bars for the gameplay screen)
* `icon-lock.svg` (Padlock for locked worlds/levels)
* `icon-play.svg` (Start/Go triangle)
* `icon-retry.svg` (Circular arrow for retry/refresh)

## 3. World Themes (Curriculum Concepts)
These icons sit on the World Select cards and should match their designated gradient backgrounds.

* `world-1-addition.svg` (Heavy, rounded plus sign)
* `world-2-subtraction.svg` (Heavy, rounded minus sign)
* `world-3-multiplication.svg` (Heavy, rounded multiply sign)
* `world-4-division.svg` (Heavy, rounded division sign)
* `world-5-mixed.svg` (Shuffle or intersecting math symbols)
* `world-6-number-sense.svg` (A glowing brain or abstract pattern)
* `world-7-speed.svg` (A lightning bolt with motion lines)
* `world-8-elite.svg` (A grand trophy or crown)

## 4. Map & Level Node Assets
Special assets for the "Bubble Path" world map UI.

* **Pathing:** `dotted-path.svg` (A tileable, curving SVG path that can be animated with stroke-dashoffset).
* **Boss Level Indicator:** `node-boss-crown.svg` (A crown that sits on top of the every-10th-level nodes).
* **Current Level Indicator:** `node-current-glow.svg` (An SVG ring that pulses around the next playable level).

## 5. The Achievement Badge System
There are 50 achievements, but many share categories. You can design base templates for categories and swap out the center emblem, or design 19 unique icons based on the `achievements.ts` file:

* **First Steps:**
    * `badge-first-answer.svg` (Target)
    * `badge-level-up.svg` (Medal)
    * `badge-world-done.svg` (Globe/Earth)
* **Speed:**
    * `badge-speed-1s.svg` (Single Lightning)
    * `badge-speed-2s.svg` (Rocket)
* **Accuracy:**
    * `badge-perfect-100.svg` (100 symbol or flawless diamond)
* **Streaks:**
    * `badge-streak-10.svg` (Explosion/Spark)
    * `badge-streak-25.svg` (Crown)
    * `badge-daily-calendar.svg` (Calendar pages)
* **Mastery/Elite:**
    * `badge-total-1000.svg` (Slot machine or tally marks)
    * `badge-total-10000.svg` (Glowing star)
    * `badge-all-worlds.svg` (Treasure map)
* **Hidden/Secret:**
    * `badge-secret-locked.svg` (A stylish question mark)
    * `badge-owl.svg` (Night Owl)
    * `badge-bird.svg` (Early Bird)

## 6. Gameplay & Interactive Elements
* **Custom Numpad:** * `key-backspace.svg` (Delete arrow with an X inside)
    * `key-minus.svg` (For toggling negative numbers)
* **Tip Screen Illustrations:** * `icon-tip-lightbulb.svg` (Used for "The Trick" sections).
* **Weak Spot Detection:**
    * `icon-warning.svg` (Soft yellow/orange caution triangle).

## 7. App Icons & PWA Assets
* `logo-full.svg` (SkillSum typography + icon for desktop header)
* `icon-192.png` (Exported SVG for PWA manifest)
* `icon-512.png` (Exported SVG for PWA manifest)
* `apple-touch-icon.png` (Exported SVG with solid pink background for iOS)
