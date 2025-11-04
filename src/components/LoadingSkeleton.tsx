'use client';

import React from 'react';

interface LoadingSkeletonProps {
  lines?: number;
  height?: string;
  className?: string;
}

export const LoadingSkeleton = React.memo(function LoadingSkeleton({ 
  lines = 3, 
  height = '1rem',
  className = '' 
}: LoadingSkeletonProps) {
  return (
    <div className={`w-full ${className}`} role="status" aria-live="polite" aria-label="Loading">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse mb-2 rounded"
          style={{
            height,
            backgroundColor: '#e0e0e0',
            width: index === lines - 1 ? '80%' : '100%'
          }}
        />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  );
});

interface ButtonSkeletonProps {
  width?: string;
  height?: string;
}

export const ButtonSkeleton = React.memo(function ButtonSkeleton({ 
  width = '100%', 
  height = '44px' 
}: ButtonSkeletonProps) {
  return (
    <div
      className="animate-pulse rounded-lg"
      style={{
        width,
        height,
        backgroundColor: '#e0e0e0'
      }}
      role="status"
      aria-label="Loading button"
    />
  );
});

interface ScoreSkeletonProps {
  showStats?: boolean;
}

export const ScoreSkeleton = React.memo(function ScoreSkeleton({ showStats = true }: ScoreSkeletonProps) {
  return (
    <div className="w-full flex flex-col gap-4" role="status" aria-live="polite">
      {/* Title skeleton */}
      <div 
        className="animate-pulse rounded mx-auto"
        style={{
          width: '200px',
          height: '2rem',
          backgroundColor: '#e0e0e0'
        }}
      />
      
      {/* Stars skeleton */}
      {showStats && (
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-full"
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: '#e0e0e0'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Stats skeleton */}
      {showStats && (
        <div className="flex justify-around p-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className="animate-pulse rounded"
                style={{
                  width: '3rem',
                  height: '2rem',
                  backgroundColor: '#e0e0e0'
                }}
              />
              <div 
                className="animate-pulse rounded"
                style={{
                  width: '4rem',
                  height: '0.75rem',
                  backgroundColor: '#e0e0e0'
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Feedback skeleton */}
      <LoadingSkeleton lines={2} height="0.875rem" />
      
      <span className="sr-only">Loading results...</span>
    </div>
  );
});
