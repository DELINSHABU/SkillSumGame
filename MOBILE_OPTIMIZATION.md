# Mobile Optimization Guide

## ✅ Implemented Optimizations

### 1. **Touch Target Optimization**
- ✅ All buttons are minimum 44x44px (Apple & Android guidelines)
- ✅ Touch action manipulation to disable double-tap zoom
- ✅ Tap highlight color for better touch feedback

### 2. **Input Zoom Prevention**
- ✅ All inputs use minimum 16px font size to prevent iOS auto-zoom
- ✅ Maximum scale set to 1 in viewport meta tag
- ✅ User-scalable disabled for game consistency

### 3. **Landscape Mode Support**
- ✅ Responsive layout for landscape orientation
- ✅ Reduced padding and margins in landscape mode
- ✅ Smaller font sizes for better fit
- ✅ Scrollable container for tall content

### 4. **Touch Gestures**
- ✅ **Swipe Down**: Pause the game (during gameplay)
- ✅ **Swipe Right**: Go back to home (when paused)
- ✅ Configurable threshold (70px) and timeout (400ms)
- ✅ Passive event listeners for better scroll performance

### 5. **Performance Optimizations**
- ✅ Reduced animations on mobile (max-width: 640px)
- ✅ Smaller confetti particles on mobile (8px vs 10px)
- ✅ Disabled glow animation on mobile
- ✅ Prefers-reduced-motion support
- ✅ Font smoothing for better rendering
- ✅ Overscroll behavior to prevent pull-to-refresh

### 6. **PWA (Progressive Web App) Support**
- ✅ Manifest.json with app metadata
- ✅ Standalone display mode
- ✅ App icons (192x192, 512x512)
- ✅ Theme color for browser UI
- ✅ App shortcuts for quick actions
- ✅ Apple web app capable tags

### 7. **Viewport & Meta Tags**
- ✅ Responsive viewport with device-width
- ✅ Initial scale and maximum scale settings
- ✅ Viewport-fit for notch support (iPhone X+)
- ✅ Theme color for browser chrome
- ✅ Format detection disabled (no phone number links)

### 8. **Responsive Breakpoints**
```css
/* Very small phones */
@media (max-width: 480px) { }

/* Small phones */
@media (max-width: 640px) { }

/* Landscape mode */
@media (orientation: landscape) and (max-height: 600px) { }

/* Tablets landscape */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) { }
```

## 🎮 Mobile Gestures

| Gesture | Action | Context |
|---------|--------|---------|
| **Swipe Down** | Pause game | During gameplay |
| **Swipe Right** | Go back to home | When game is paused |
| **Tap** | Select answer/button | Universal |
| **Long Press** | (Future: Show hint) | During gameplay |

## 📱 Testing Checklist

### Essential Tests
- [ ] Test on iOS Safari (primary browser)
- [ ] Test on Android Chrome (primary browser)
- [ ] Test in portrait mode (vertical)
- [ ] Test in landscape mode (horizontal)
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPad (tablet)
- [ ] Test touch targets (all > 44px)
- [ ] Test input focus (no zoom)
- [ ] Test swipe gestures
- [ ] Verify PWA installation
- [ ] Check offline functionality
- [ ] Test with slow 3G network
- [ ] Verify animations are smooth
- [ ] Check battery consumption

### Device Sizes to Test
- **Small**: 320px - 375px (iPhone SE, older Android)
- **Medium**: 375px - 428px (iPhone 12-15, most Android)
- **Large**: 428px+ (iPhone Pro Max, large Android)
- **Tablet**: 768px+ (iPad, Android tablets)

## 🚀 Performance Tips

### For Development
1. Use Chrome DevTools Device Mode
2. Enable "Show media queries" in DevTools
3. Test with "Slow 3G" network throttling
4. Use Lighthouse for mobile audit
5. Check "Disable cache" to test fresh loads

### For Production
1. Minimize animation complexity
2. Use CSS transforms (GPU accelerated)
3. Lazy load non-critical content
4. Optimize images for mobile
5. Enable service worker caching

## 🔧 Configuration

### Swipe Gesture Settings
Located in `src/hooks/useSwipe.ts`:
```typescript
{
  threshold: 70,  // Minimum swipe distance (pixels)
  timeout: 400    // Maximum swipe duration (ms)
}
```

### Touch Target Sizes
Located in `src/app/globals.css`:
```css
button {
  min-height: 44px;
  min-width: 44px;
}
```

## 📊 Mobile-Specific CSS Classes

- `.game-container` - Main responsive container
- `.confetti-particle` - Optimized for mobile
- Media queries automatically adjust sizes

## 🐛 Common Issues & Fixes

### Issue: Input causes page zoom on iOS
**Fix**: All inputs use 16px font size minimum

### Issue: Double-tap zoom on buttons
**Fix**: `touch-action: manipulation` on buttons

### Issue: Pull-to-refresh interfering
**Fix**: `overscroll-behavior-y: contain` on body

### Issue: Landscape mode cramped
**Fix**: Reduced padding/margins in landscape media query

### Issue: Animations lag on old devices
**Fix**: Simplified animations for mobile, respects `prefers-reduced-motion`

## 🎯 Future Improvements

- [ ] Add haptic feedback for correct/wrong answers
- [ ] Implement offline mode with service worker
- [ ] Add pinch-to-zoom for accessibility
- [ ] Support for foldable devices
- [ ] Dark mode support
- [ ] More swipe gestures (swipe up for hints)
- [ ] Vibration API integration
- [ ] Battery-aware animation adjustments

## 📚 Resources

- [iOS Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/gestures/)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [Web.dev - Mobile Performance](https://web.dev/mobile/)
- [MDN - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
