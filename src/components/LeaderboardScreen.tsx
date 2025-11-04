'use client';

import React from 'react';
import type { Difficulty } from './SkillSumGame';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  difficulty: Difficulty;
  maxStreak: number;
  date: string;
  time: number;
}

interface LeaderboardScreenProps {
  onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = React.useState<'all' | Difficulty>('all');

  React.useEffect(() => {
    // Load leaderboard from localStorage
    const stored = localStorage.getItem('skillsum_leaderboard');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LeaderboardEntry[];
        setEntries(parsed);
      } catch (e) {
        console.error('Failed to parse leaderboard data:', e);
      }
    }
  }, []);

  const filteredEntries = entries
    .filter(entry => filter === 'all' || entry.difficulty === filter)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 10);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
    }
  };

  const getDifficultyIcon = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const buttonStyle = {
    backgroundColor: '#80cbc4',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 3px 0 #5e8d8d',
    transition: 'all 0.2s ease-in-out',
    fontFamily: "'Poppins', sans-serif"
  };

  const filterButtonStyle = (isActive: boolean) => ({
    ...buttonStyle,
    backgroundColor: isActive ? '#5e8d8d' : '#b0e0db',
    boxShadow: isActive ? '0 2px 0 #3a5c5c' : '0 3px 0 #80b0ab',
    padding: '8px 16px',
    fontSize: '0.85rem'
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 
          className="text-2xl font-bold"
          style={{ color: '#ff80ab' }}
        >
          🏆 Leaderboard
        </h2>
        <button
          onClick={onBack}
          style={{
            ...buttonStyle,
            padding: '8px 16px',
            fontSize: '0.9rem',
            backgroundColor: '#f44336',
            boxShadow: '0 3px 0 #c62828'
          }}
          className="transform hover:scale-105 active:scale-95"
        >
          ← Back
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-3 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          style={filterButtonStyle(filter === 'all')}
          className="transform hover:scale-105 active:scale-95"
        >
          All
        </button>
        <button
          onClick={() => setFilter('easy')}
          style={filterButtonStyle(filter === 'easy')}
          className="transform hover:scale-105 active:scale-95"
        >
          🟢 Easy
        </button>
        <button
          onClick={() => setFilter('medium')}
          style={filterButtonStyle(filter === 'medium')}
          className="transform hover:scale-105 active:scale-95"
        >
          🟡 Medium
        </button>
        <button
          onClick={() => setFilter('hard')}
          style={filterButtonStyle(filter === 'hard')}
          className="transform hover:scale-105 active:scale-95"
        >
          🔴 Hard
        </button>
      </div>

      {/* Leaderboard List */}
      <div 
        className="bg-white bg-opacity-50 rounded-lg p-3"
        style={{ maxHeight: '400px', overflowY: 'auto' }}
      >
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8" style={{ color: '#4a4a4a' }}>
            <p className="text-2xl mb-2">📊</p>
            <p className="text-sm">No scores yet!</p>
            <p className="text-xs mt-1">Play a game to appear on the leaderboard.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm animate-slide-in"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  border: index < 3 ? '2px solid #ffd700' : 'none'
                }}
              >
                {/* Rank */}
                <div 
                  className="text-2xl font-bold min-w-12 text-center"
                  style={{ color: index < 3 ? '#ffd700' : '#4a4a4a' }}
                >
                  {getRankIcon(index)}
                </div>

                {/* Player Info */}
                <div className="flex-1 text-left">
                  <div className="font-bold" style={{ color: '#4a4a4a', fontSize: '0.95rem' }}>
                    {entry.playerName}
                  </div>
                  <div className="text-xs flex gap-2 items-center" style={{ color: '#666' }}>
                    <span>{getDifficultyIcon(entry.difficulty)} {entry.difficulty}</span>
                    <span>•</span>
                    <span>🔥 {entry.maxStreak}</span>
                    <span>•</span>
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Score */}
                <div 
                  className="text-2xl font-bold"
                  style={{ 
                    color: getDifficultyColor(entry.difficulty),
                    minWidth: '50px',
                    textAlign: 'right'
                  }}
                >
                  {Number.isInteger(entry.score) ? entry.score : entry.score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {entries.length > 0 && (
        <div className="bg-white bg-opacity-50 rounded-lg p-3 mt-2">
          <p className="text-xs font-bold mb-2" style={{ color: '#4a4a4a' }}>
            📈 Your Stats
          </p>
          <div className="flex justify-around text-center">
            <div>
              <div className="font-bold text-lg" style={{ color: '#ff80ab' }}>
                {entries.length}
              </div>
              <div className="text-xs" style={{ color: '#666' }}>Games Played</div>
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: '#4caf50' }}>
                {Math.max(...entries.map(e => e.score))}
              </div>
              <div className="text-xs" style={{ color: '#666' }}>Best Score</div>
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: '#ff9800' }}>
                {Math.max(...entries.map(e => e.maxStreak))}
              </div>
              <div className="text-xs" style={{ color: '#666' }}>Best Streak</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
