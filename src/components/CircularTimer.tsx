'use client';

import React from 'react';

interface CircularTimerProps {
  time: number;
  maxTime: number;
  size?: number;
}

export const CircularTimer = React.memo(function CircularTimer({ time, maxTime, size = 80 }: CircularTimerProps) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = time / maxTime;
  const offset = circumference - progress * circumference;
  
  // Change color based on remaining time
  const getColor = () => {
    const percentage = (time / maxTime) * 100;
    if (percentage > 50) return '#4caf50'; // Green
    if (percentage > 25) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  const isLowTime = time <= 10;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${isLowTime ? 'animate-pulse' : ''}`}
      style={{ width: size, height: size }}
      role="timer"
      aria-label={`${time} seconds remaining`}
      aria-live={isLowTime ? 'assertive' : 'off'}
    >
      <svg 
        width={size} 
        height={size}
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease',
            filter: isLowTime ? 'drop-shadow(0 0 8px currentColor)' : 'none'
          }}
        />
      </svg>
      {/* Time text in center */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          fontSize: size * 0.3,
          color: getColor()
        }}
        aria-hidden="true"
      >
        {time}s
      </div>
    </div>
  );
});
