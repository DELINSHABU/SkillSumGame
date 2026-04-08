'use client';

import { useEffect, useState } from 'react';
import type { SessionResult, Level, StarCount } from '@/lib/types';
import { detectWeakSpots } from '@/lib/weakSpots';

interface PostLessonProps {
  session: SessionResult;
  level: Level;
  xpEarned: number;
  onNext: () => void;
  onRetry: () => void;
  onPracticeWeakSpots: () => void;
}

export function PostLesson({ session, level, xpEarned, onNext, onRetry, onPracticeWeakSpots }: PostLessonProps) {
  const [starsRevealed, setStarsRevealed] = useState(0);
  const stars = session.starsEarned || 0;
  const weakSpots = detectWeakSpots(session.attempts);

  // Reveal stars one by one
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setStarsRevealed(count);
      if (count >= stars) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [stars]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">
        {stars === 3 ? '🎉 Perfect!' : stars >= 1 ? '✅ Level Complete!' : '❌ Try Again'}
      </h2>

      {/* Star reveal */}
      <div className="flex gap-3">
        {[1, 2, 3].map(s => (
          <span
            key={s}
            className={`text-5xl transition-all duration-500 ${
              s <= starsRevealed
                ? 'scale-125 opacity-100 drop-shadow-lg'
                : 'scale-100 opacity-20 grayscale'
            }`}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 w-full bg-gray-50 rounded-2xl p-4">
        <StatCell label="Correct" value={session.correct} color="#4caf50" />
        <StatCell label="Wrong" value={session.wrong} color="#f44336" />
        <StatCell label="Accuracy" value={`${session.accuracy.toFixed(0)}%`} color="#2196f3" />
        <StatCell label="Best Streak" value={session.maxStreak} color="#ff9800" />
        <StatCell label="XP Earned" value={`+${xpEarned}`} color="#ff80ab" />
        <StatCell
          label="Avg Speed"
          value={`${(session.durationMs / (session.correct + session.wrong) / 1000).toFixed(1)}s`}
          color="#9c27b0"
        />
      </div>

      {/* Weak spots */}
      {weakSpots.length > 0 && (
        <div className="w-full bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
          <p className="font-semibold text-orange-800 mb-2">⚠️ Weak spots detected:</p>
          {weakSpots.map(ws => (
            <p key={ws.skill} className="text-sm text-orange-700">
              • {ws.skill} — {ws.reason === 'low_accuracy' ? `${ws.accuracy.toFixed(0)}% accuracy` : `${(ws.avgMs / 1000).toFixed(1)}s avg`}
            </p>
          ))}
          <button
            onClick={onPracticeWeakSpots}
            className="mt-3 px-4 py-2 bg-orange-400 text-white rounded-xl text-sm font-bold"
          >
            Practice Weak Spots →
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full">
        {stars >= 1 && (
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl text-lg font-bold text-white"
            style={{ backgroundColor: '#ff80ab', boxShadow: '0 4px 0 #c55f85' }}
          >
            Next Level →
          </button>
        )}
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-2xl text-lg font-bold text-white"
          style={{ backgroundColor: '#90caf9', boxShadow: '0 4px 0 #5e8db0' }}
        >
          {stars === 0 ? 'Try Again' : '↺ Retry for More Stars'}
        </button>
      </div>
    </div>
  );
}

function StatCell({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
