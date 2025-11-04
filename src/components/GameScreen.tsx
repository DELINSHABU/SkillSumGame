'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { GameData } from './SkillSumGame';
import { CircularTimer } from './CircularTimer';
import type { Level } from '@/lib/levels';
import { useScreenReader } from '@/hooks/useScreenReader';
import { useSwipe } from '@/hooks/useSwipe';

interface GameScreenProps {
  gameData: GameData;
  level: Level | null;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  onToggleTestMode: () => void;
  onTogglePause: () => void;
  onGoBack: () => void;
  onRestart: () => void;
}

export function GameScreen({ gameData, level, onCorrectAnswer, onWrongAnswer, onToggleTestMode, onTogglePause, onGoBack, onRestart }: GameScreenProps) {
  const [typedAnswer, setTypedAnswer] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { announce } = useScreenReader();
  const prevScoreRef = React.useRef(gameData.score);
  const prevTimeRef = React.useRef(gameData.time);
  const prevStreakRef = React.useRef(gameData.streak);
  
  // Mobile swipe gestures: swipe down to pause, swipe right when paused to go back
  const handleSwipeDown = useCallback(() => {
    if (!gameData.isPaused) {
      onTogglePause();
      announce('Game paused', 'polite');
    }
  }, [gameData.isPaused, onTogglePause, announce]);
  
  const handleSwipeRight = useCallback(() => {
    if (gameData.isPaused) {
      onGoBack();
    }
  }, [gameData.isPaused, onGoBack]);
  
  useSwipe({
    onSwipeDown: handleSwipeDown,
    onSwipeRight: handleSwipeRight,
  }, {
    threshold: 70,
    timeout: 400
  });

  // Focus the input field when the component mounts or when unpaused
  React.useEffect(() => {
    if (!gameData.isPaused) {
      inputRef.current?.focus();
    }
  }, [gameData.isPaused]);

  // Clear input when question changes
  React.useEffect(() => {
    setTypedAnswer('');
    announce(`New question: ${gameData.currentQuestion}`, 'polite');
  }, [gameData.currentQuestion, announce]);

  // Announce score changes
  useEffect(() => {
    if (gameData.score > prevScoreRef.current) {
      announce(`Correct! Score is now ${gameData.score}`, 'assertive');
    } else if (gameData.score < prevScoreRef.current) {
      announce('Incorrect answer. Try the next one!', 'assertive');
    }
    prevScoreRef.current = gameData.score;
  }, [gameData.score, announce]);

  // Announce time warnings
  useEffect(() => {
    if (gameData.time === 10 && prevTimeRef.current > 10) {
      announce('10 seconds remaining!', 'assertive');
    } else if (gameData.time === 30 && prevTimeRef.current > 30) {
      announce('30 seconds remaining', 'polite');
    }
    prevTimeRef.current = gameData.time;
  }, [gameData.time, announce]);

  // Announce streak changes
  useEffect(() => {
    if (gameData.streak >= 5 && prevStreakRef.current < 5) {
      announce(`Amazing! ${gameData.streak} answer streak!`, 'assertive');
    } else if (gameData.streak === 0 && prevStreakRef.current > 0) {
      announce('Streak ended. Keep going!', 'polite');
    }
    prevStreakRef.current = gameData.streak;
  }, [gameData.streak, announce]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to pause
      if (e.key === 'Escape' && !gameData.isPaused) {
        onTogglePause();
      }
      // Space to toggle pause (if input is not focused)
      if (e.key === ' ' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        onTogglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameData.isPaused, onTogglePause]);

  const handleAnswerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (gameData.isPaused || !typedAnswer) return;

    const userAnswer = parseInt(typedAnswer, 10);
    if (userAnswer === gameData.currentAnswer) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
    setTypedAnswer('');
  };


  return (
    <div 
      className="relative w-full flex flex-col gap-5"
      role="main"
      aria-label="Math game in progress"
    >
      {/* Pause Overlay */}
      {gameData.isPaused && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '15px'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pause-menu-title"
        >
          <div
            className="flex flex-col items-center gap-4 px-8 py-6 rounded-lg"
            style={{
              backgroundColor: '#fff',
              color: '#4a4a4a',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              minWidth: '250px'
            }}
          >
            <div id="pause-menu-title" className="text-2xl font-bold mb-2">⏸️ Game Paused</div>
            
            {/* Pause Menu Options */}
            <div className="flex flex-col gap-3 w-full">
              {/* Restart Button */}
              <button
                onClick={onRestart}
                className="w-full text-sm font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
                  fontFamily: "'Poppins', sans-serif"
                }}
                aria-label="Restart game from beginning"
              >
                🔄 Restart Game
              </button>
              
              {/* Resume Button */}
              <button
                onClick={onTogglePause}
                className="w-full text-sm font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)',
                  fontFamily: "'Poppins', sans-serif"
                }}
                aria-label="Resume game"
                autoFocus
              >
                ▶️ Resume Game
              </button>
              
              {/* Go Home Button */}
              <button
                onClick={onGoBack}
                className="w-full text-sm font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(244, 67, 54, 0.3)',
                  fontFamily: "'Poppins', sans-serif"
                }}
                aria-label="Go to home screen"
              >
                🏠 Go Home
              </button>
            </div>
          </div>
        </div>
      )}
      
      {level && <h2 className="text-2xl font-bold">{level.title}</h2>}

      {/* Scoreboard */}
      <div 
        className="flex justify-between items-center font-bold text-xl p-2 mb-5"
        role="status"
        aria-label="Game statistics"
      >
        <div className="flex flex-col items-center" aria-label={`Current score: ${gameData.score}`}>
          <span className="text-2xl animate-pop" style={{ color: '#ff80ab' }} aria-hidden="true">{gameData.score}</span>
          <span className="text-xs" style={{ color: '#4a4a4a' }} aria-hidden="true">Score</span>
        </div>
        
        <CircularTimer time={gameData.time} maxTime={gameData.maxTime} size={100} />
        
        <div className="flex flex-col items-center" aria-label={`Current streak: ${gameData.streak} correct answers in a row`}>
          {gameData.streak > 0 && (
            <span 
              className="text-2xl animate-pop" 
              style={{ color: gameData.streak >= 5 ? '#ff9800' : '#4caf50' }}
              aria-hidden="true"
            >
              {gameData.streak >= 3 ? '🔥' : '✨'}{gameData.streak}
            </span>
          )}
          {gameData.streak === 0 && (
            <span className="text-2xl" style={{ color: '#ccc' }} aria-hidden="true">-</span>
          )}
          <span className="text-xs" style={{ color: '#4a4a4a' }} aria-hidden="true">Streak</span>
        </div>
      </div>

      {/* Streak Indicator */}
      {gameData.streak >= 5 && (
        <div 
          className="text-sm font-bold px-4 py-2 rounded-full mb-2 animate-glow"
          style={{ 
            backgroundColor: '#ff9800', 
            color: '#fff',
            boxShadow: '0 4px 10px rgba(255, 152, 0, 0.3)'
          }}
        >
          🔥 {gameData.streak}x COMBO! 🔥
        </div>
      )}
      
      {/* Question Area */}
      <div className="flex flex-col items-center gap-2">
        <div 
          className="text-5xl font-bold min-h-20 flex justify-center items-center animate-slide-in"
          style={{ color: '#ff80ab' }}
          key={gameData.currentQuestion}
          role="status"
          aria-live="polite"
          aria-label={`Math question: ${gameData.currentQuestion}`}
        >
          {gameData.currentQuestion}
        </div>
        
        {/* Conditionally show correct answer in test mode */}
        {gameData.testMode && (
          <div 
            className="text-sm font-bold px-3 py-1 rounded-lg mb-2"
            style={{ 
              backgroundColor: '#ffeb3b', 
              color: '#d32f2f',
              border: '2px dashed #d32f2f'
            }}
          >
            🧪 TEST MODE: Correct Answer = {gameData.currentAnswer}
          </div>
        )}
        
        {/* Control Buttons */}
        <div className="flex gap-2 mb-2">
          {/* Test Mode Toggle Button */}
          <button
            onClick={onToggleTestMode}
            className="text-xs font-bold px-3 py-1 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: gameData.testMode ? '#4caf50' : '#ff9800',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 2px 4px ${gameData.testMode ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)'}`,
              fontFamily: "'Poppins', sans-serif"
            }}
            aria-label={gameData.testMode ? 'Switch to normal mode' : 'Switch to test mode to see answers'}
            aria-pressed={gameData.testMode}
          >
            {gameData.testMode ? '🔍 Normal Mode' : '🧪 Test Mode'}
          </button>
          
          {/* Pause/Resume Button */}
          <button
            onClick={onTogglePause}
            className="text-xs font-bold px-3 py-1 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: gameData.isPaused ? '#2196f3' : '#607d8b',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 2px 4px ${gameData.isPaused ? 'rgba(33, 150, 243, 0.3)' : 'rgba(96, 125, 139, 0.3)'}`,
              fontFamily: "'Poppins', sans-serif"
            }}
            aria-label={gameData.isPaused ? 'Resume game' : 'Pause game'}
            aria-pressed={gameData.isPaused}
          >
            {gameData.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          
          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="text-xs font-bold px-3 py-1 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#ff9800',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
              fontFamily: "'Poppins', sans-serif"
            }}
            aria-label="Restart game from beginning"
          >
            🔄 Restart
          </button>
          
          {/* Go Back Button */}
          <button
            onClick={onGoBack}
            className="text-xs font-bold px-3 py-1 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(244, 67, 54, 0.3)',
              fontFamily: "'Poppins', sans-serif"
            }}
            aria-label="Go back to home screen"
          >
            🏠 Back
          </button>
        </div>
        
      </div>

      {/* Answer Input Form */}
      <form 
        onSubmit={handleAnswerSubmit} 
        className="flex flex-col items-center gap-4 w-full mt-4"
        aria-label="Answer submission form"
      >
        <input
          ref={inputRef}
          type="text"
          pattern="[0-9]*" // Allow numeric input
          inputMode="numeric" // Show numeric keyboard on mobile
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
          disabled={gameData.isPaused}
          className="w-full max-w-xs text-center text-3xl font-bold p-3 rounded-lg border-4 focus:outline-none transition-all duration-200"
          style={{
            borderColor: '#80cbc4',
            color: '#ff80ab',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            fontFamily: "'Poppins', sans-serif",
          }}
          placeholder="Your answer"
          autoComplete="off"
          aria-label={`Answer input for question: ${gameData.currentQuestion}`}
          aria-required="true"
          aria-describedby="answer-hint"
        />
        <span id="answer-hint" className="sr-only">
          Enter the answer to the math question and press Enter or click Submit
        </span>
        <button
          type="submit"
          disabled={gameData.isPaused || !typedAnswer}
          className="w-full max-w-xs text-xl font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#ff80ab',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 0 #c55f85',
            fontFamily: "'Poppins', sans-serif",
          }}
          aria-label="Submit your answer"
          aria-disabled={gameData.isPaused || !typedAnswer}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
