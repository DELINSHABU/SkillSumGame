'use client';

import { useState } from 'react';
import type { Difficulty } from './SkillSumGame';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty, maxTime: number) => void;
  onShowLeaderboard: () => void;
  onStartCampaign: () => void;
}

export function StartScreen({ onStartGame, onShowLeaderboard, onStartCampaign }: StartScreenProps) {
  const [selectedTime, setSelectedTime] = useState<number | 'custom'>(30);
  const [customTime, setCustomTime] = useState<string>('');
  const [username, setUsername] = useState(''); // New state for username

  const timeOptions = [
    { value: 30, label: '30s' },
    { value: 60, label: '60s' },
    { value: 90, label: '90s' },
    { value: 'custom' as const, label: 'Custom' }
  ];

  const difficultyOptions: Array<{ value: Difficulty; label: string }> = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const handleStartGame = (difficulty: Difficulty) => {
    let finalTime = 30; // default
    
    if (selectedTime === 'custom') {
      const parsed = parseInt(customTime, 10);
      finalTime = isNaN(parsed) || parsed < 10 ? 30 : parsed;
    } else {
      finalTime = selectedTime;
    }
    
    // Save username to localStorage
    const playerName = username.trim() || 'Anonymous';
    localStorage.setItem('skillsum_playername', playerName);
    
    onStartGame(difficulty, finalTime);
  };

  const buttonBaseStyle = {
    backgroundColor: '#80cbc4',
    color: '#fff',
    border: 'none',
    padding: '15px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: '15px',
    cursor: 'pointer',
    boxShadow: '0 5px 0 #5e8d8d',
    transition: 'all 0.2s ease-in-out',
    fontFamily: "'Poppins', sans-serif"
  };

  const selectedButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#5e8d8d',
    boxShadow: '0 2px 0 #3a5c5c'
  };


  return (
    <div className="w-full flex flex-col gap-5" role="main" aria-label="Game setup screen">
      {/* Campaign Mode Button */}
      <button
        onClick={onStartCampaign}
        style={{
          ...buttonBaseStyle,
          backgroundColor: '#ffb74d',
          boxShadow: '0 5px 0 #f57c00',
          fontSize: '1.2rem',
          padding: '12px'
        }}
        className="w-full transform hover:scale-105 active:scale-95"
        aria-label="Start campaign mode with progressive levels"
      >
        🚀 Campaign Mode
      </button>

      {/* Leaderboard Button */}
      <button
        onClick={onShowLeaderboard}
        style={{
          ...buttonBaseStyle,
          backgroundColor: '#ffd700',
          boxShadow: '0 5px 0 #d4af37',
          fontSize: '1.2rem',
          padding: '12px'
        }}
        className="w-full transform hover:scale-105 active:scale-95"
        aria-label="View leaderboard and high scores"
      >
        🏆 Leaderboard
      </button>

      {/* Username Input */}
      <div className="mb-3">
        <label 
          htmlFor="username-input"
          className="text-sm font-semibold mb-2 block" 
          style={{ color: '#4a4a4a' }}
        >
          Enter Your Name:
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name (optional)"
          className="w-full max-w-xs mx-auto p-2 text-center border-2 rounded-lg"
          style={{
            borderColor: '#ff80ab',
            fontFamily: "'Poppins', sans-serif"
          }}
          maxLength={15}
          aria-label="Enter your name for the leaderboard"
          aria-describedby="username-hint"
        />
        <span id="username-hint" className="sr-only">
          Optional. If left blank, you&apos;ll be listed as Anonymous
        </span>
      </div>

      <p 
        id="time-selector-label"
        className="text-lg font-semibold" 
        style={{ color: '#4a4a4a' }}
      >
        Set Game Time:
      </p>
      
      <div 
        className="flex justify-center gap-2 flex-wrap mb-5"
        role="group"
        aria-labelledby="time-selector-label"
      >
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedTime(option.value)}
            style={selectedTime === option.value ? selectedButtonStyle : buttonBaseStyle}
            className="transform hover:scale-105 active:scale-95"
            aria-label={`Set game time to ${option.label}`}
            aria-pressed={selectedTime === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedTime === 'custom' && (
        <div className="mb-5">
          <label htmlFor="custom-time-input" className="sr-only">
            Enter custom game time in seconds (minimum 10)
          </label>
          <input
            id="custom-time-input"
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Enter time"
            className="w-20 mx-auto p-2 text-center border-2 rounded-lg"
            style={{
              borderColor: '#80cbc4',
              fontFamily: "'Poppins', sans-serif"
            }}
            min="10"
            aria-label="Custom game time in seconds"
            aria-required="true"
          />
        </div>
      )}

      <p 
        id="difficulty-selector-label"
        className="text-lg font-semibold" 
        style={{ color: '#4a4a4a' }}
      >
        Choose your difficulty:
      </p>
      
      <div 
        className="flex flex-col gap-4 mb-5"
        role="group"
        aria-labelledby="difficulty-selector-label"
      >
        {difficultyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStartGame(option.value)}
            style={buttonBaseStyle}
            className="w-full transform hover:scale-105 active:scale-95"
            aria-label={`Start ${option.label} difficulty game`}
          >
            {option.label}
          </button>
        ))}
      </div>

    </div>
  );
}
