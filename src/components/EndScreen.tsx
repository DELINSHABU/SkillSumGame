'use client';

import { useState, useEffect } from 'react';
import type { Difficulty, Achievement } from './SkillSumGame';
import type { Level } from '@/lib/levels';

interface EndScreenProps {
  score: number;
  maxTime: number;
  difficulty: Difficulty;
  maxStreak: number;
  achievements: Achievement[];
  username: string; // New prop
  onPlayAgain: () => void;
  onViewLeaderboard: () => void; // New prop
  level: Level | null;
  onNextLevel: () => void;
}

export function EndScreen({ score, maxTime, difficulty, maxStreak, achievements, username, onPlayAgain, onViewLeaderboard, level, onNextLevel }: EndScreenProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [feedback, setFeedback] = useState('Generating your personal feedback...');
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Calculate star rating
  const getStars = () => {
    if (level) {
      if (score >= level.targetScore) return 3;
      if (score >= level.targetScore * 0.75) return 2;
      if (score >= level.targetScore * 0.5) return 1;
      return 0;
    }
    const scorePerMinute = (score / maxTime) * 60;
    if (scorePerMinute >= 30) return 3;
    if (scorePerMinute >= 20) return 2;
    if (scorePerMinute >= 10) return 1;
    return 0;
  };
  
  const stars = getStars();
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  const generateFeedback = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/gemini-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: level
            ? `The user just completed a mental math level called '${level.title}'. They got ${score} out of ${level.targetScore} correct. Give them some positive feedback and reinforce the '${level.tip}' they just learned.`
            : `Based on a score of ${score} in a mental math game with a time limit of ${maxTime} seconds, provide a short, encouraging message. Keep it friendly and concise.`
        })
      });
      
      const data = await response.json();
      setFeedback(data.result || 'Great job! Keep practicing to get even better.');
    } catch (error) {
      console.error('Failed to generate feedback:', error);
      setFeedback('Great job! Keep practicing to get even better.');
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async () => {
    if (username === 'Guest' || level) {
      setSubmissionStatus('idle'); // Don't submit if username is Guest or in campaign mode
      return;
    }

    setSubmissionStatus('submitting');
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          score,
          difficulty,
          maxTime,
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        console.error('Failed to submit score:', await response.json());
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting score:', error);
    }
  };

  useEffect(() => {
    if (isClient) {
      generateFeedback();
      submitScore(); // Submit score when component mounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, maxTime, username, difficulty, isClient, level]);

  const buttonStyle = {
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

  return (
    <div 
      className="w-full flex flex-col gap-4 text-center"
      role="main"
      aria-label="Game results screen"
    >
      <h2 
        className="text-3xl font-bold"
        style={{ color: '#ff80ab' }}
        role="status"
        aria-live="polite"
      >
        {level && score >= level.targetScore ? 'Level Complete!' : 'Game Over!'}
      </h2>

      {/* Score Submission Status */}
      {username !== 'Guest' && !level && submissionStatus === 'submitting' && (
        <p className="text-sm text-gray-500" role="status" aria-live="polite">Submitting score...</p>
      )}
      {username !== 'Guest' && !level && submissionStatus === 'success' && (
        <p className="text-sm text-green-600" role="status" aria-live="polite">Score submitted successfully!</p>
      )}
      {username !== 'Guest' && !level && submissionStatus === 'error' && (
        <p className="text-sm text-red-600" role="alert" aria-live="assertive">Failed to submit score. Please try again.</p>
      )}
      {username === 'Guest' && !level && (
        <p className="text-sm text-gray-500" role="status">Log in to submit your score to the leaderboard!</p>
      )}
      
      {/* Star Rating */}
      <div 
        className="flex justify-center gap-2 my-2"
        role="img"
        aria-label={`${stars} out of 3 stars earned`}
      >
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            className={star <= stars ? 'animate-star-pop' : ''}
            style={{
              fontSize: '3rem',
              color: star <= stars ? '#ffd700' : '#e0e0e0',
              filter: star <= stars ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' : 'none',
              animationDelay: `${star * 0.1}s`
            }}
          >
            ⭐
          </span>
        ))}
      </div>
      
      {/* Score Details */}
      <div 
        className="flex justify-around bg-white bg-opacity-50 rounded-lg p-3 mb-2"
        role="region"
        aria-label="Game statistics"
      >
        <div className="flex flex-col" aria-label={`Final score: ${score}`}>
          <span className="text-2xl font-bold" style={{ color: '#ff80ab' }} aria-hidden="true">{score}</span>
          <span className="text-xs" style={{ color: '#4a4a4a' }} aria-hidden="true">Score</span>
        </div>
        {level && (
          <div className="flex flex-col">
            <span className="text-2xl font-bold" style={{ color: '#ff80ab' }}>{level.targetScore}</span>
            <span className="text-xs" style={{ color: '#4a4a4a' }}>Target</span>
          </div>
        )}
        <div className="flex flex-col" aria-label={`Maximum streak: ${maxStreak} correct answers`}>
          <span className="text-2xl font-bold" style={{ color: '#ff9800' }} aria-hidden="true">{maxStreak}</span>
          <span className="text-xs" style={{ color: '#4a4a4a' }} aria-hidden="true">Max Streak</span>
        </div>
        <div 
          className="flex flex-col"
          aria-label={`Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`}
        >
          <span className="text-xl font-bold" style={{ color: '#4caf50' }} aria-hidden="true">
            {difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'}
          </span>
          <span className="text-xs" style={{ color: '#4a4a4a' }} aria-hidden="true">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Achievements */}
      {unlockedAchievements.length > 0 && (
        <div 
          className="bg-white bg-opacity-50 rounded-lg p-3 mb-2"
          style={{ maxHeight: '150px', overflowY: 'auto' }}
          role="region"
          aria-label="Unlocked achievements"
        >
          <p className="text-sm font-bold mb-2" style={{ color: '#4a4a4a' }}>
            🏆 Achievements Unlocked!
          </p>
          <div className="flex flex-col gap-2">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-2 bg-yellow-100 rounded p-2 animate-slide-in"
                style={{ fontSize: '0.85rem' }}
              >
                <span style={{ fontSize: '1.5rem' }}>{achievement.icon}</span>
                <div className="text-left flex-1">
                  <div className="font-bold" style={{ color: '#4a4a4a' }}>{achievement.name}</div>
                  <div className="text-xs" style={{ color: '#666' }}>{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* AI Feedback */}
      <p 
        className={`text-sm ${loading ? 'animate-pulse' : ''}`}
        style={{ color: '#4a4a4a' }}
        role="status"
        aria-live="polite"
        aria-busy={loading}
      >
        {feedback}
      </p>
      
      {level && score >= level.targetScore ? (
        <button
          onClick={onNextLevel}
          style={buttonStyle}
          className="mt-2 transform hover:scale-105 active:scale-95"
          aria-label="Proceed to next level"
          autoFocus
        >
          🚀 Next Level
        </button>
      ) : (
        <button
          onClick={onPlayAgain}
          style={buttonStyle}
          className="mt-2 transform hover:scale-105 active:scale-95"
          aria-label="Start a new game"
          autoFocus
        >
          🎮 Play Again
        </button>
      )}

      {/* Placeholder for View Leaderboard Button */}
      <button
        onClick={onViewLeaderboard}
        style={{
          ...buttonStyle,
          backgroundColor: '#2196f3',
          boxShadow: '0 5px 0 #1976d2',
        }}
        className="mt-2 transform hover:scale-105 active:scale-95"
        aria-label="View leaderboard and compare your score"
      >
        🏆 View Leaderboard
      </button>
    </div>
  );
}
