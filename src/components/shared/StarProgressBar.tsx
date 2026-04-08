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
