'use client';

import { useMemo } from 'react';
import type { Level, MasteryMap, StarCount } from '@/lib/types';

interface WorldMapProps {
  worldId: number;
  levels: Level[];
  masteryMap: MasteryMap;
  onLevelSelect: (level: Level) => void;
  onBack: () => void;
}

export function WorldMap({ worldId, levels, masteryMap, onLevelSelect, onBack }: WorldMapProps) {
  const levelStatus = useMemo(() => {
    return levels.map((level, index) => {
      const mastery = masteryMap[level.id];
      const stars: StarCount = mastery?.stars || 0;

      // Unlock logic: level 1 is always unlocked, others need previous completed
      const isUnlocked = index === 0 || !!(masteryMap[levels[index - 1]?.id]?.stars);

      return { level, stars, isUnlocked };
    });
  }, [levels, masteryMap]);

  const worldProgress = levelStatus.filter(l => l.stars > 0).length;
  const totalLevels = levels.length;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 sticky top-0 bg-white z-10 shadow-sm">
        <button onClick={onBack} className="text-2xl">←</button>
        <div className="flex-1">
          <h2 className="font-bold text-lg">{levels[0]?.worldName}</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(worldProgress / totalLevels) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{worldProgress}/{totalLevels}</span>
          </div>
        </div>
      </div>

      {/* Level Grid — scrollable path */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {levelStatus.map(({ level, stars, isUnlocked }, index) => (
            <LevelNode
              key={level.id}
              level={level}
              stars={stars}
              isUnlocked={isUnlocked}
              index={index}
              onSelect={() => isUnlocked && onLevelSelect(level)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LevelNodeProps {
  level: Level;
  stars: StarCount;
  isUnlocked: boolean;
  index: number;
  onSelect: () => void;
}

function LevelNode({ level, stars, isUnlocked, index, onSelect }: LevelNodeProps) {
  const isBoss = level.type === 'boss';
  const isNext = isUnlocked && stars === 0;

  const bgColor = !isUnlocked ? '#e0e0e0'
    : stars === 3 ? '#ffd700'
    : stars > 0 ? '#90caf9'
    : isNext ? '#ff80ab'
    : '#b0bec5';

  return (
    <button
      onClick={onSelect}
      disabled={!isUnlocked}
      className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200
        ${isUnlocked ? 'hover:scale-102 active:scale-98 cursor-pointer' : 'cursor-not-allowed opacity-60'}
        ${isNext ? 'animate-pulse shadow-lg' : 'shadow-sm'}
        ${isBoss ? 'border-4 border-yellow-400' : 'border-2 border-gray-100'}
      `}
      style={{ backgroundColor: isUnlocked ? 'white' : '#f5f5f5' }}
    >
      {/* Level circle */}
      <div
        className={`flex items-center justify-center rounded-full font-bold text-white flex-shrink-0
          ${isBoss ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-sm'}
        `}
        style={{ backgroundColor: bgColor }}
      >
        {!isUnlocked ? '🔒' : isBoss ? '💪' : level.id}
      </div>

      {/* Level info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-800 truncate">{level.title}</div>
        <div className="text-xs text-gray-500">
          {level.timeLimit ? `${level.timeLimit}s` : 'No timer'} •
          Target: {level.star3Score} correct
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>

      {/* Arrow if unlocked */}
      {isUnlocked && <span className="text-gray-400">›</span>}
    </button>
  );
}
