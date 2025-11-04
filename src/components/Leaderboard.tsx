import React, { useState, useEffect } from 'react';
import type { Difficulty } from './SkillSumGame';

interface ScoreEntry {
  username: string;
  score: number;
  difficulty: Difficulty;
  maxTime: number;
  date: string;
}

interface LeaderboardProps {
  onGoBack: () => void;
}

export function Leaderboard({ onGoBack }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterMaxTime, setFilterMaxTime] = useState<number | 'all'>('all');

  const difficultyOptions: Array<{ value: Difficulty | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const timeOptions: Array<{ value: number | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 30, label: '30s' },
    { value: 60, label: '60s' },
    { value: 90, label: '90s' }
  ];

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterDifficulty !== 'all') {
        params.append('difficulty', filterDifficulty);
      }
      if (filterMaxTime !== 'all') {
        params.append('maxTime', filterMaxTime.toString());
      }

      const response = await fetch(`/api/leaderboard?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data: ScoreEntry[] = await response.json();
      setLeaderboard(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [filterDifficulty, filterMaxTime]);

  const buttonStyle = {
    backgroundColor: '#80cbc4',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 3px 0 #5e8d8d',
    transition: 'all 0.2s ease-in-out',
    fontFamily: "'Poppins', sans-serif"
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5e8d8d',
    boxShadow: '0 1px 0 #3a5c5c'
  };

  return (
    <div className="w-full flex flex-col gap-4 text-center">
      <h2 
        className="text-3xl font-bold"
        style={{ color: '#ff80ab' }}
      >
        🏆 Leaderboard
      </h2>

      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {difficultyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilterDifficulty(option.value)}
            style={filterDifficulty === option.value ? selectedButtonStyle : buttonStyle}
            className="transform hover:scale-105 active:scale-95 text-sm"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilterMaxTime(option.value)}
            style={filterMaxTime === option.value ? selectedButtonStyle : buttonStyle}
            className="transform hover:scale-105 active:scale-95 text-sm"
          >
            {option.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-600">Loading leaderboard...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && leaderboard.length === 0 && (
        <p className="text-gray-600">No scores yet. Be the first to play!</p>
      )}

      {!loading && !error && leaderboard.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white bg-opacity-90 rounded-lg">
            <thead>
              <tr style={{ backgroundColor: '#ff80ab', color: '#fff' }}>
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Player</th>
                <th className="py-2 px-4 text-left">Score</th>
                <th className="py-2 px-4 text-left">Difficulty</th>
                <th className="py-2 px-4 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 text-left font-bold" style={{ color: '#4a4a4a' }}>{index + 1}</td>
                  <td className="py-2 px-4 text-left" style={{ color: '#4a4a4a' }}>{entry.username}</td>
                  <td className="py-2 px-4 text-left font-bold" style={{ color: '#ff80ab' }}>{entry.score}</td>
                  <td className="py-2 px-4 text-left" style={{ color: '#4a4a4a' }}>{entry.difficulty}</td>
                  <td className="py-2 px-4 text-left" style={{ color: '#4a4a4a' }}>{entry.maxTime}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={onGoBack}
        style={{
          ...buttonStyle,
          backgroundColor: '#f44336',
          boxShadow: '0 5px 0 #d32f2f',
        }}
        className="mt-4 transform hover:scale-105 active:scale-95"
      >
        🏠 Back to Game
      </button>
    </div>
  );
}
