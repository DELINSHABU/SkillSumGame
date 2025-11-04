'use client';

import { useState } from 'react';
import { campaignLevels, type Level } from '@/lib/levels';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface CampaignMapScreenProps {
  onStartLevel: (level: Level) => void;
  userProgress: { [levelId: number]: { completed: boolean, score: number } };
  onBack: () => void;
  onUpdateProgress: (levelId: number, score: number) => void;
}

export function CampaignMapScreen({ onStartLevel, userProgress, onBack, onUpdateProgress }: CampaignMapScreenProps) {
  const [testMode, setTestMode] = useState(false);
  const [levelToSkip, setLevelToSkip] = useState<number | null>(null);
  const scrollRef = useHorizontalScroll();

  const worlds = campaignLevels.reduce((acc, level) => {
    if (!acc[level.world]) {
      acc[level.world] = [];
    }
    acc[level.world].push(level);
    return acc;
  }, {} as { [world: string]: Level[] });

  const getStars = (level: Level) => {
    const progress = userProgress[level.id];
    if (!progress || !progress.completed) return 0;

    if (progress.score >= level.targetScore) return 3;
    if (progress.score >= level.targetScore * 0.75) return 2;
    if (progress.score >= level.targetScore * 0.5) return 1;
    return 0;
  };

  const handleStarChange = (level: Level, stars: number) => {
    let score = 0;
    if (stars === 1) score = level.targetScore * 0.5;
    if (stars === 2) score = level.targetScore * 0.75;
    if (stars === 3) score = level.targetScore;
    onUpdateProgress(level.id, score);
    setLevelToSkip(null);
  };

  return (
    <div className="w-full flex flex-col gap-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800 font-bold hover:bg-gray-400 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 flex-grow">Campaign Map</h2>
        <button
          onClick={() => setTestMode(!testMode)}
          className="px-4 py-2 bg-purple-500 rounded-lg text-white font-bold hover:bg-purple-600 transition-colors"
        >
          {testMode ? 'Exit Test Mode' : 'Test Mode'}
        </button>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-4 pr-8 hide-scrollbar">
          {Object.entries(worlds).map(([worldName, levels]) => (
            <div key={worldName} className="flex-shrink-0 w-96 p-4 bg-white rounded-xl shadow-lg max-h-96 overflow-y-auto hide-scrollbar">
              <h3 className="text-2xl font-bold mb-4 text-pink-500 text-center">{worldName}</h3>
              <div className="grid grid-cols-4 gap-4">
                {levels.map((level, index) => {
                  const isUnlocked = level.id === 1 || userProgress[level.id - 1]?.completed;
                  const stars = getStars(level);
                  const isNextLevel = !userProgress[level.id]?.completed && isUnlocked;

                  return (
                    <div key={level.id} className="flex flex-col items-center">
                      <button
                        disabled={!isUnlocked && !testMode}
                        onClick={() => onStartLevel(level)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white transition-transform transform hover:scale-110 ${isUnlocked || testMode ? (stars > 0 ? 'bg-yellow-500' : 'bg-blue-500') : 'bg-gray-400 cursor-not-allowed'} ${isNextLevel ? 'animate-pulse' : ''}`}
                        style={{boxShadow: 'inset 0 -3px 4px rgba(0,0,0,0.3), 0 3px 5px rgba(0,0,0,0.2)'}}
                      >
                        {isUnlocked || testMode ? level.id : '🔒'}
                      </button>
                      <div className="flex mt-2">
                        {[1, 2, 3].map(star => (
                          <span key={star} className={`text-2xl ${star <= stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      {testMode && (
                        <div className="mt-2">
                          {levelToSkip === level.id ? (
                            <div className="flex gap-1">
                              {[0, 1, 2, 3].map(star => (
                                <button key={star} onClick={() => handleStarChange(level, star)} className={`w-6 h-6 rounded-full text-xs ${getStars(level) === star ? 'bg-green-500' : 'bg-gray-300'}`}>
                                  {star}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <button onClick={() => setLevelToSkip(level.id)} className="px-2 py-1 bg-gray-200 rounded-md text-xs">Skip</button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}