'use client';

import { useState } from 'react';
import type { Level } from '@/lib/types';

interface PreLessonProps {
  level: Level;
  onStart: () => void;
  onBack: () => void;
}

export function PreLesson({ level, onStart, onBack }: PreLessonProps) {
  const [diagramStep, setDiagramStep] = useState(0);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 gap-6">
      <button onClick={onBack} className="self-start text-gray-500">← Back</button>

      <div>
        <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1">
          {level.type === 'boss' ? '⚠️ BOSS LEVEL' : 'LESSON'}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{level.title}</h1>
        <p className="text-gray-600 mt-2">{level.description}</p>
      </div>

      {/* Tip box */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💡</span>
          <h3 className="font-bold text-yellow-800">The Trick</h3>
        </div>
        <p className="text-yellow-900 font-medium">{level.tip}</p>
      </div>

      {/* Animated diagram (if available) */}
      {level.tipDiagram && (
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-3">Try it step by step:</h3>
          <div className="text-2xl font-bold text-center text-pink-500 mb-4">
            {level.tipDiagram.example}
          </div>
          <div className="space-y-2">
            {level.tipDiagram.solution.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  i <= diagramStep ? 'opacity-100 bg-green-50' : 'opacity-30'
                }`}
              >
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="font-medium text-gray-700">{step}</span>
              </div>
            ))}
          </div>
          {diagramStep < level.tipDiagram.solution.length - 1 && (
            <button
              onClick={() => setDiagramStep(s => s + 1)}
              className="mt-3 text-sm text-blue-500 font-semibold"
            >
              Next step →
            </button>
          )}
        </div>
      )}

      {/* Level targets */}
      <div className="flex gap-3">
        {[
          { label: '⭐', score: level.star1Score, color: '#cd7f32' },
          { label: '⭐⭐', score: level.star2Score, color: '#c0c0c0' },
          { label: '⭐⭐⭐', score: level.star3Score, color: '#ffd700' },
        ].map(t => (
          <div key={t.label} className="flex-1 text-center p-3 rounded-xl bg-gray-50 border">
            <div className="text-sm">{t.label}</div>
            <div className="font-bold text-gray-700">{t.score}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full py-5 rounded-2xl text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#ff80ab', boxShadow: '0 6px 0 #c55f85' }}
      >
        I'm Ready — Start! 🚀
      </button>
    </div>
  );
}
