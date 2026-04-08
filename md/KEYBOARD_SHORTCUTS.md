# Keyboard Shortcuts - SkillSumGame

This document lists all keyboard shortcuts available in the game.

## Global Shortcuts

| Key | Action | Available When |
|-----|--------|----------------|
| **Tab** | Navigate to next interactive element | Always |
| **Shift + Tab** | Navigate to previous interactive element | Always |
| **Enter** | Activate focused button / Submit answer | Always |
| **Space** | Activate focused button | Always |

## Game Screen Shortcuts

| Key | Action | Notes |
|-----|--------|-------|
| **Escape** | Pause game | Only when game is active |
| **Space** | Toggle pause | Only when input is NOT focused |
| **Enter** | Submit answer | When typing in answer field |

## Navigation Tips

### Starting a Game
1. Use **Tab** to navigate through time options (30s, 60s, 90s, Custom)
2. Press **Enter** or **Space** to select a time
3. Continue using **Tab** to reach difficulty buttons
4. Press **Enter** or **Space** to start the game

### During Gameplay
1. Answer field is automatically focused when game starts
2. Type your answer using number keys
3. Press **Enter** to submit
4. Press **Escape** or **Space** to pause
5. Use **Tab** to navigate control buttons if needed

### Pause Menu
1. When paused, focus automatically goes to "Resume" button
2. Use **Tab** to cycle through:
   - Restart Game
   - Resume Game
   - Go Home
3. Press **Enter** or **Space** to activate selected option
4. Press **Escape** to resume

### End Screen
1. Primary action button (Play Again / Next Level) is automatically focused
2. Use **Tab** to navigate to "View Leaderboard" button
3. Press **Enter** or **Space** to activate

## Accessibility Features

### Visual Focus Indicators
- Pink outline (#ff80ab) appears around focused elements
- 3px solid outline with 2px offset for visibility
- Additional box-shadow for enhanced contrast

### Skip Navigation
- Press **Tab** on page load to reveal "Skip to main content" link
- Press **Enter** to skip directly to game content

## Screen Reader Users

### NVDA / JAWS (Windows)
- Use **Insert + Down Arrow** to enter forms mode when in input field
- Use **Insert + Z** to toggle screen reader on/off

### VoiceOver (macOS)
- Use **VO + Shift + Down Arrow** to interact with input field
- Use **VO + Space** to activate buttons
- Use **VO + H** to navigate by headings

### Announcements
The game announces:
- New questions when they appear
- Score changes (correct/incorrect)
- Time warnings (30s and 10s remaining)
- Streak milestones (5+ combos)
- Game state changes

## Tips for Best Experience

1. **Use headphones** for better audio feedback with screen readers
2. **Enable focus indicators** in your OS settings for better visibility
3. **Adjust animation settings** in OS preferences if motion causes discomfort
4. **Use browser zoom** (Ctrl/Cmd +/-) to increase text size if needed

## Customization

### Reduce Motion
If you experience motion sickness from animations:
1. **Windows**: Settings → Accessibility → Visual effects → Turn off animations
2. **macOS**: System Preferences → Accessibility → Display → Reduce motion
3. **Linux**: Varies by desktop environment (typically in Accessibility settings)

### High Contrast
To improve visibility:
1. **Windows**: Settings → Accessibility → High contrast
2. **macOS**: System Preferences → Accessibility → Display → Increase contrast
3. **Linux**: Varies by desktop environment

## Browser Extensions

Enhance your experience with these accessibility extensions:

### General
- **Dark Reader**: Dark mode for any website
- **Read Aloud**: Text-to-speech for web pages
- **High Contrast**: Improves color contrast

### For Developers Testing
- **axe DevTools**: Check accessibility compliance
- **WAVE**: Visual accessibility testing
- **Lighthouse**: Built-in Chrome DevTools audit

## Support

If you encounter accessibility issues:
1. Check this guide for keyboard shortcuts
2. Review `ACCESSIBILITY_IMPROVEMENTS.md` for technical details
3. Report issues on the project's GitHub page
4. Include your browser, OS, and assistive technology details

---

**Last Updated**: November 4, 2025  
**Accessibility Priority**: High
