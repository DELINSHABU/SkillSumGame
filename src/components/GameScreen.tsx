'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Level, PracticeConfig, QuestionAttempt, SessionResult } from '@/lib/types';
import { CircularTimer } from './CircularTimer';
import { useScreenReader } from '@/hooks/useScreenReader';
import { useSwipe } from '@/hooks/useSwipe';
import { StarProgressBar } from './shared/StarProgressBar';
import { generateQuestion } from '@/lib/questionGenerator';

interface GameScreenProps {
  level?: Level | null;
  practiceConfig?: PracticeConfig | null;
  onSessionEnd: (session: SessionResult) => void;
  onBack: () => void;
}

interface GameState {
  score: number;
  streak: number;
  time: number;
  currentQuestion: string;
  currentAnswer: number;
  isPaused: boolean;
  testMode: boolean;
  correct: number;
  wrong: number;
  startTime: number;
}

export function GameScreen({ level, practiceConfig, onSessionEnd, onBack }: GameScreenProps) {
  const [typedAnswer, setTypedAnswer] = useState('');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { announce } = useScreenReader();
  
  const questionStartTime = useRef<number>(Date.now());
  const sessionAttempts = useRef<QuestionAttempt[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameStartRef = useRef<number>(Date.now());

  const getMaxTime = () => {
    if (practiceConfig?.mode === 'time' && practiceConfig.timeLimit) {
      return practiceConfig.timeLimit;
    }
    if (level?.timeLimit) {
      return level.timeLimit;
    }
    return 60;
  };

  const getTargetCount = () => {
    if (practiceConfig?.mode === 'count' && practiceConfig.targetCount) {
      return practiceConfig.targetCount;
    }
    return level?.targetScore || 10;
  };

  const generateNewQuestion = useCallback((): { question: string; answer: number } => {
    if (level?.generationParams) {
      return generateQuestion(level.generationParams);
    }
    if (practiceConfig) {
      return generateQuestion({
        operators: practiceConfig.operators,
        numberRange: practiceConfig.numberRange || [1, 20],
        skill: 'random',
      });
    }
    return generateQuestion({ operators: ['+'], numberRange: [1, 10], skill: 'random' });
  }, [level, practiceConfig]);

  useEffect(() => {
    const { question, answer } = generateNewQuestion();
    const maxTime = getMaxTime();
    
    setGameState({
      score: 0,
      streak: 0,
      time: maxTime,
      currentQuestion: question,
      currentAnswer: answer,
      isPaused: false,
      testMode: false,
      correct: 0,
      wrong: 0,
      startTime: Date.now(),
    });
    
    questionStartTime.current = Date.now();
    gameStartRef.current = Date.now();
    sessionAttempts.current = [];

    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (!prev || prev.isPaused) return prev;
        if (prev.time <= 1) {
          clearInterval(timerRef.current!);
          return prev;
        }
        return { ...prev, time: prev.time - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level, practiceConfig]);

  useEffect(() => {
    if (gameState?.time === 0 && gameState.correct + gameState.wrong > 0) {
      endGame();
    }
  }, [gameState?.time]);

  const endGame = useCallback(() => {
    if (!gameState) return;
    
    const durationMs = Date.now() - gameStartRef.current;
    const total = gameState.correct + gameState.wrong;
    const accuracy = total > 0 ? (gameState.correct / total) * 100 : 0;
    const maxStreak = gameState.streak;

    const session: SessionResult = {
      id: crypto.randomUUID(),
      mode: level ? 'learn' : 'practice',
      levelId: level?.id,
      practiceConfig: practiceConfig || undefined,
      startedAt: new Date(gameState.startTime).toISOString(),
      durationMs,
      attempts: sessionAttempts.current,
      correct: gameState.correct,
      wrong: gameState.wrong,
      accuracy,
      maxStreak,
      xpEarned: 0,
    };

    onSessionEnd(session);
  }, [gameState, level, practiceConfig, onSessionEnd]);

  useEffect(() => {
    const targetCount = getTargetCount();
    if (gameState && (gameState.correct + gameState.wrong) >= targetCount && targetCount > 0) {
      endGame();
    }
  }, [gameState?.correct, gameState?.wrong]);

  const handleAnswerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!gameState || gameState.isPaused || !typedAnswer) return;

    const responseMs = Date.now() - questionStartTime.current;
    const userAnswer = parseInt(typedAnswer, 10);
    const isCorrect = userAnswer === gameState.currentAnswer;

    sessionAttempts.current.push({
      question: gameState.currentQuestion,
      correctAnswer: gameState.currentAnswer,
      userAnswer,
      isCorrect,
      responseMs,
      skill: level?.generationParams?.skill || 'random',
      operator: level?.generationParams?.operators?.[0] || practiceConfig?.operators?.[0] || '+',
    });

    if (isCorrect) {
      setGameState(prev => prev ? {
        ...prev,
        score: prev.score + 10 + (prev.streak * 2),
        streak: prev.streak + 1,
        correct: prev.correct + 1,
      } : null);
    } else {
      setGameState(prev => prev ? {
        ...prev,
        streak: 0,
        wrong: prev.wrong + 1,
      } : null);
    }

    const { question, answer } = generateNewQuestion();
    setGameState(prev => prev ? {
      ...prev,
      currentQuestion: question,
      currentAnswer: answer,
    } : null);
    questionStartTime.current = Date.now();
    setTypedAnswer('');
  };

  useEffect(() => {
    if (!gameState?.isPaused) {
      inputRef.current?.focus();
    }
  }, [gameState?.isPaused]);

  useEffect(() => {
    if (gameState) {
      announce(`New question: ${gameState.currentQuestion}`, 'polite');
    }
  }, [gameState?.currentQuestion, announce]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameState && !gameState.isPaused) {
        setGameState(prev => prev ? { ...prev, isPaused: true } : null);
      }
      if (e.key === ' ' && document.activeElement !== inputRef.current && gameState) {
        e.preventDefault();
        setGameState(prev => prev ? { ...prev, isPaused: !prev.isPaused } : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState?.isPaused]);

  useSwipe({
    onSwipeDown: () => {
      if (gameState && !gameState.isPaused) {
        setGameState(prev => prev ? { ...prev, isPaused: true } : null);
      }
    },
    onSwipeRight: () => {
      if (gameState?.isPaused) {
        onBack();
      }
    },
  }, { threshold: 70, timeout: 400 });

  if (!gameState) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const maxTime = getMaxTime();

  return (
    <div className="relative w-full flex flex-col gap-5 p-4" role="main" aria-label="Math game in progress">
      {gameState.isPaused && (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '15px' }}>
          <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-lg bg-white" style={{ minWidth: '250px' }}>
            <div className="text-2xl font-bold">⏸️ Game Paused</div>
            <button onClick={() => setGameState(prev => prev ? { ...prev, isPaused: false } : null)} className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold">▶️ Resume</button>
            <button onClick={onBack} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold">🏠 Go Home</button>
          </div>
        </div>
      )}

      {level && (
        <h2 className="text-xl font-bold text-center">{level.title}</h2>
      )}

      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold" style={{ color: '#ff80ab' }}>{gameState.score}</span>
          <span className="text-xs text-gray-600">Score</span>
        </div>
        
        <CircularTimer time={gameState.time} maxTime={maxTime} size={80} />
        
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold" style={{ color: gameState.streak >= 5 ? '#ff9800' : '#4caf50' }}>
            {gameState.streak > 0 ? (gameState.streak >= 3 ? '🔥' : '✨') + gameState.streak : '-'}
          </span>
          <span className="text-xs text-gray-600">Streak</span>
        </div>
      </div>

      {level && (
        <StarProgressBar
          current={gameState.score}
          star1={level.star1Score}
          star2={level.star2Score}
          star3={level.star3Score}
          onStarEarned={(star) => announce(`${star} star${star > 1 ? 's' : ''} earned!`, 'polite')}
        />
      )}

      {gameState.streak >= 5 && (
        <div className="text-sm font-bold px-4 py-2 rounded-full text-center" style={{ backgroundColor: '#ff9800', color: '#fff' }}>
          🔥 {gameState.streak}x COMBO! 🔥
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl font-bold min-h-16 flex items-center" style={{ color: '#ff80ab' }}>
          {gameState.currentQuestion}
        </div>

        {gameState.testMode && (
          <div className="text-sm font-bold px-3 py-1 rounded-lg" style={{ backgroundColor: '#ffeb3b', color: '#d32f2f' }}>
            🧪 TEST MODE: Answer = {gameState.currentAnswer}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => setGameState(prev => prev ? { ...prev, testMode: !prev.testMode } : null)} className="text-xs px-3 py-1 rounded-lg" style={{ backgroundColor: gameState.testMode ? '#4caf50' : '#ff9800', color: '#fff' }}>
            {gameState.testMode ? '🔍 Normal' : '🧪 Test'}
          </button>
          <button onClick={() => setGameState(prev => prev ? { ...prev, isPaused: true } : null)} className="text-xs px-3 py-1 rounded-lg" style={{ backgroundColor: '#607d8b', color: '#fff' }}>
            ⏸️ Pause
          </button>
          <button onClick={onBack} className="text-xs px-3 py-1 rounded-lg" style={{ backgroundColor: '#f44336', color: '#fff' }}>
            🏠 Back
          </button>
        </div>
      </div>

      <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center gap-4 w-full">
        <input
          ref={inputRef}
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
          disabled={gameState.isPaused}
          className="w-full max-w-xs text-center text-3xl font-bold p-3 rounded-lg border-4"
          style={{ borderColor: '#80cbc4', color: '#ff80ab' }}
          placeholder="Your answer"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={gameState.isPaused || !typedAnswer}
          className="w-full max-w-xs text-xl font-bold px-4 py-3 rounded-lg"
          style={{ backgroundColor: '#ff80ab', color: '#fff' }}
        >
          Submit
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        {gameState.correct + gameState.wrong} / {getTargetCount()} answered
      </div>
    </div>
  );
}