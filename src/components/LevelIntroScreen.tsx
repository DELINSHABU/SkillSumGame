'use client';

import type { Level } from '@/lib/levels';

interface LevelIntroScreenProps {
  level: Level;
  onStartLevel: () => void;
}

export function LevelIntroScreen({ level, onStartLevel }: LevelIntroScreenProps) {
  return (
    <div className="w-full flex flex-col gap-5 text-center">
      <h2 className="text-3xl font-bold">{level.title}</h2>
      <p className="text-lg">{level.description}</p>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">💡 Tip & Trick</h3>
        <p>{level.tip}</p>
      </div>
      <button
        onClick={onStartLevel}
        className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-2xl"
      >
        Start Level
      </button>
    </div>
  );
}
