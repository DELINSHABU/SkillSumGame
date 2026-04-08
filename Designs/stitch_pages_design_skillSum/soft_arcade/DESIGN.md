# Design System: The Soft Arcade Manifesto

## 1. Overview & Creative North Star: "Tactile Joy"
This design system moves away from the sterile, flat minimalism of modern SaaS and toward a philosophy we call **Tactile Joy**. It is a high-end editorial take on "Soft Arcade" aesthetics—combining the nostalgic physics of 90s gaming with the sophisticated whitespace of a premium lifestyle magazine.

**The Creative North Star:** We are building a "Digital Playground for Growth." The UI should feel like a physical object you want to reach out and squish. We break the "template" look by utilizing intentional asymmetry in our bubble layouts, overlapping floating elements that defy the standard box-model, and a typography scale that feels authoritative yet approachable.

---

## 2. Colors & Atmospheric Tones
Our palette is rooted in warmth. We avoid "digital black" and "clinical white," opting instead for a spectrum of fleshy pinks, sunset oranges, and vibrating teals.

### The Color Tokens
*   **Primary Core:** `primary` (#a23760) / `primary_container` (#ff80ab)
*   **The World Palette:** 
    *   **World 1 (The Bloom):** `primary_container` (#ff8fab)
    *   **World 2 (The Glow):** `secondary_container` (#fd983a)
    *   **World 3 (The Flow):** `tertiary_container` (#11bea8)
*   **Neutral Base:** `background` (#fff7fa) / `surface_container_lowest` (#ffffff)

### The "No-Line" Rule
**Lines are forbidden.** In this system, we do not use 1px solid borders to define sections. Boundaries are created through **Surface Hierarchy**:
*   A card should be defined by its shift from `surface_container_low` to `surface_container_highest`.
*   Use the **Dot-Grid Texture** (rendered in `outline_variant` at 15% opacity) to define "active play areas" without using a stroke.

### The "Glass & Gradient" Rule
To elevate the "Soft Arcade" feel, primary CTAs should not be flat. Use a linear gradient from `primary` to `primary_container` at a 145-degree angle. Floating menus must use **Glassmorphism**: a background of `surface_bright` at 80% opacity with a `24px` backdrop blur.

---

## 3. Typography: Editorial Play
We mix three distinct typefaces to create a "Signature" look that feels custom-tailored.

*   **Display & Headlines (Plus Jakarta Sans / Nunito):** Used for large, expressive moments. These are set with tight letter-spacing (-2%) to feel "plump" and impactful.
*   **Body (Be Vietnam Pro / DM Sans):** Our workhorse. High legibility with generous line-height (1.6) to ensure the educational content feels "breathable" and never daunting.
*   **Stats & Data (Space Grotesk / JetBrains Mono):** Reserved for scores, timers, and streaks. This mono-spaced influence injects a "tech-arcade" DNA into the system, signaling to the user that these numbers are precise and earned.

---

## 4. Elevation & Depth: Tonal Stacking
Forget traditional drop shadows. We use **Physicality** to define importance.

### The Layering Principle
Instead of shadows, stack your surfaces:
1.  **Base:** `surface` (#fff7fa)
2.  **Section:** `surface_container_low`
3.  **Card:** `surface_container_lowest` (Pure white for maximum pop)

### Ambient Shadows & 3D "Pressables"
When an element must float (like a FAB or a Level Node):
*   **Shadows:** Use a 24px blur with 6% opacity. The shadow color must be a tint of `on_surface` (a deep, warm plum), never grey.
*   **3D Buttons:** Buttons utilize a "Shadow Block." A button in `primary` has a bottom-aligned solid 4px block of `on_primary_container` (or #c55f85) to create a tactile, pressable 3D effect.

### The "Ghost Border" Fallback
If contrast is needed for accessibility, use a **Ghost Border**: `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components: Tactile Primitives

### The "Pressable" Button
*   **Primary:** `xl` radius (3rem). Gradient fill. 4px bottom-offset shadow in `on_primary_container`. 
*   **Interaction:** On `:active`, the button shifts 2px down, and the shadow shrinks, mimicking a physical spring.

### Bubble Level Nodes
*   **Style:** Perfectly circular containers using `tertiary_fixed`. 
*   **State:** Completed levels use a "Gloss" overlay—a subtle white-to-transparent gradient in the top-left quadrant to mimic a plastic sphere.

### Cards & Lists
*   **Rule:** No dividers. Separate list items using `md` spacing (1.5rem) and alternating `surface_container` subtle shifts.
*   **Radius:** Always use `lg` (2rem) or `xl` (3rem) for cards. Sharp corners are the enemy of "Soft Arcade."

### Streak Flames & Stars
*   **Streak:** Use `secondary` (#904d00) for the flame core with a `secondary_container` outer glow.
*   **Star Ratings:** Use a "chunky" 3D stroke. Gold stars are not flat yellow; they use a gradient from `secondary_fixed` to `secondary`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace asymmetry. Offset your level nodes in a zig-zag pattern rather than a straight line.
*   **Do** use generous whitespace. If you think there's enough room, add 8px more.
*   **Do** use the "Dot-Grid" for background depth on long scrolls.

### Don’t:
*   **Don’t** use pure black (#000000). Use `on_surface` for all text.
*   **Don’t** use 1px solid borders. If the design feels "bleeding," use a darker surface tone, not a line.
*   **Don’t** use standard easing. Use a "back-out" or "elastic" transition for all button hovers to reinforce the arcade personality.

### Director's Final Note:
Every pixel should feel like it was molded out of clay. If a screen looks like a standard dashboard, you have failed the system. Push the radii, soften the shadows, and let the typography breathe like a high-end magazine.