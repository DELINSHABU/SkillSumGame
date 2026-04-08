'use client';

import { useRef, useCallback, useEffect } from 'react';

export type SoundType = 'correct' | 'wrong' | 'click' | 'tick' | 'gameStart' | 'gameEnd' | 'starEarned' | 'levelComplete' | 'personalBest';

// Simple oscillator-based sounds using Web Audio API
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(true);

  useEffect(() => {
    // Initialize AudioContext on first user interaction
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabledRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    try {
      switch (type) {
        case 'correct':
          // Happy ascending notes
          [523.25, 659.25, 783.99].forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, now + i * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
            
            oscillator.start(now + i * 0.1);
            oscillator.stop(now + i * 0.1 + 0.2);
          });
          break;

        case 'wrong':
          // Descending "bonk" sound
          const wrongOsc = ctx.createOscillator();
          const wrongGain = ctx.createGain();
          
          wrongOsc.connect(wrongGain);
          wrongGain.connect(ctx.destination);
          
          wrongOsc.frequency.setValueAtTime(300, now);
          wrongOsc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
          wrongOsc.type = 'sawtooth';
          
          wrongGain.gain.setValueAtTime(0.3, now);
          wrongGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          
          wrongOsc.start(now);
          wrongOsc.stop(now + 0.2);
          break;

        case 'click':
          // Short click sound
          const clickOsc = ctx.createOscillator();
          const clickGain = ctx.createGain();
          
          clickOsc.connect(clickGain);
          clickGain.connect(ctx.destination);
          
          clickOsc.frequency.value = 800;
          clickOsc.type = 'sine';
          
          clickGain.gain.setValueAtTime(0.2, now);
          clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          
          clickOsc.start(now);
          clickOsc.stop(now + 0.05);
          break;

        case 'tick':
          // Timer tick sound
          const tickOsc = ctx.createOscillator();
          const tickGain = ctx.createGain();
          
          tickOsc.connect(tickGain);
          tickGain.connect(ctx.destination);
          
          tickOsc.frequency.value = 1000;
          tickOsc.type = 'square';
          
          tickGain.gain.setValueAtTime(0.1, now);
          tickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          
          tickOsc.start(now);
          tickOsc.stop(now + 0.05);
          break;

        case 'gameStart':
          // Uplifting start sound
          [392, 494, 587, 784].forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0.2, now + i * 0.08);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
            
            oscillator.start(now + i * 0.08);
            oscillator.stop(now + i * 0.08 + 0.15);
          });
          break;

        case 'gameEnd':
          // Completion sound
          [523.25, 587.33, 659.25, 783.99].forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.15, now + i * 0.12);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.3);
            
            oscillator.start(now + i * 0.12);
            oscillator.stop(now + i * 0.12 + 0.3);
          });
          break;

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
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  const toggleSound = useCallback(() => {
    soundEnabledRef.current = !soundEnabledRef.current;
    return soundEnabledRef.current;
  }, []);

  return { playSound, toggleSound, isSoundEnabled: () => soundEnabledRef.current };
}
