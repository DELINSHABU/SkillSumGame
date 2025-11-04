'use client';

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { EndScreen } from './EndScreen';
import { ConfettiEffect } from './ConfettiEffect';
import { LoadingSkeleton, ScoreSkeleton } from './LoadingSkeleton';
import type { LeaderboardEntry } from './LeaderboardScreen';
import { useSound } from '@/hooks/useSound';
import { type Level } from '@/lib/levels';

// Lazy load heavy components
const CampaignMapScreen = lazy(() => import('./CampaignMapScreen').then(m => ({ default: m.CampaignMapScreen })));
const LeaderboardScreen = lazy(() => import('./LeaderboardScreen').then(m => ({ default: m.LeaderboardScreen })));
const LevelIntroScreen = lazy(() => import('./LevelIntroScreen').then(m => ({ default: m.LevelIntroScreen })));

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameState = 'start' | 'playing' | 'end' | 'leaderboard' | 'campaignMap' | 'levelIntro';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface GameData {
  score: number;
  time: number;
  maxTime: number;
  difficulty: Difficulty;
  currentQuestion: string;
  currentAnswer: number;
  gameState: GameState;
  testMode: boolean;
  isPaused: boolean;
  streak: number;
  maxStreak: number;
  wrongAnswers: number;
  achievements: Achievement[];
  username: string; // New field
}

export function SkillSumGame() {
  const { playSound } = useSound();
  
  const initialAchievements: Achievement[] = [
    { id: 'first_correct', name: 'First Step', description: 'Answer your first question correctly', icon: '🎯', unlocked: false },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Get 5 correct answers in a row', icon: '⚡', unlocked: false },
    { id: 'perfect_score', name: 'Perfect!', description: 'Complete a game with no wrong answers', icon: '💯', unlocked: false },
    { id: 'math_wizard', name: 'Math Wizard', description: 'Score 20+ points on hard mode', icon: '🧙', unlocked: false },
    { id: 'streak_master', name: 'Streak Master', description: 'Achieve a 10 answer streak', icon: '🔥', unlocked: false },
  ];

  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    time: 30,
    maxTime: 30,
    difficulty: 'easy',
    currentQuestion: '',
    currentAnswer: 0,
    gameState: 'start',
    testMode: false,
    isPaused: false,
    streak: 0,
    maxStreak: 0,
    wrongAnswers: 0,
    achievements: initialAchievements,
    username: 'Guest' // Default username
  });

  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [userProgress, setUserProgress] = useState<{ [levelId: number]: { completed: boolean, score: number } }>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('skillsum_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomOperator = (operators: Array<'+' | '-' | '×' | '÷'>): '+' | '-' | '×' | '÷' => {
    return operators[Math.floor(Math.random() * operators.length)];
  };

  const generateQuestion = useCallback(() => {
    let num1: number;
    let num2: number;
    let operator: '+' | '-' | '×' | '÷';
    let questionText: string;
    let correctAnswer: number;

    if (currentLevel) {
      const params = currentLevel.generationParams;
      const [min, max] = params.numberRange;

      switch (params.skill) {
        case 'makeTen':
          num1 = getRandomNumber(1, 9);
          num2 = 10 - num1;
          operator = '+';
          questionText = `${num1} + ${num2}`;
          correctAnswer = 10;
          break;
        case 'addTen':
          num1 = getRandomNumber(min, max);
          num2 = 10;
          operator = '+';
          questionText = `${num1} + ${num2}`;
          correctAnswer = num1 + num2;
          break;
        case 'addNine':
          num1 = getRandomNumber(min, max);
          num2 = 9;
          operator = '+';
          questionText = `${num1} + ${num2}`;
          correctAnswer = num1 + num2;
          break;
        case 'doubles':
          num1 = getRandomNumber(min, max);
          num2 = num1;
          operator = params.operators[0]; // Should be '+' or 'x'
          questionText = `${num1} ${operator} ${num2}`;
          correctAnswer = operator === '+' ? num1 + num2 : num1 * num2;
          break;
        case 'nearDoubles':
          num1 = getRandomNumber(min, max);
          num2 = num1 + (Math.random() > 0.5 ? 1 : -1);
          if (num2 < min) num2 = num1 + 1; // Ensure num2 is within range and different
          operator = '+';
          questionText = `${num1} + ${num2}`;
          correctAnswer = num1 + num2;
          break;
        case 'subtractTen':
          num1 = getRandomNumber(min, max);
          num2 = 10;
          operator = '-';
          questionText = `${num1} - ${num2}`;
          correctAnswer = num1 - num2;
          break;
        case 'subtractNine':
          num1 = getRandomNumber(min, max);
          num2 = 9;
          operator = '-';
          questionText = `${num1} - ${num2}`;
          correctAnswer = num1 - num2;
          break;
        case 'multiplyByTen':
          num1 = getRandomNumber(min, max);
          num2 = 10;
          operator = '×';
          questionText = `${num1} ${operator} ${num2}`;
          correctAnswer = num1 * num2;
          break;
        case 'multiplyByFive':
          num1 = getRandomNumber(min, max);
          num2 = 5;
          operator = '×';
          questionText = `${num1} ${operator} ${num2}`;
          correctAnswer = num1 * num2;
          break;
        case 'multiplyByEleven':
          num1 = getRandomNumber(min, max);
          num2 = 11;
          operator = '×';
          questionText = `${num1} ${operator} ${num2}`;
          correctAnswer = num1 * num2;
          break;
        case 'integerDivision':
          num2 = params.fixedOperand || getRandomNumber(min, max);
          correctAnswer = getRandomNumber(1, 12); // Result of division
          num1 = num2 * correctAnswer;
          operator = '÷';
          questionText = `${num1} ${operator} ${num2}`;
          break;
        case 'random':
        default:
          operator = getRandomOperator(params.operators);
          num1 = getRandomNumber(min, max);
          num2 = getRandomNumber(min, max);

          if (operator === '÷') {
            if (num1 % num2 !== 0) {
              const multiple = getRandomNumber(1, 10);
              num1 = num2 * multiple;
            }
            correctAnswer = num1 / num2;
          } else if (operator === '-') {
            if (num1 < num2) {
              [num1, num2] = [num2, num1];
            }
            correctAnswer = num1 - num2;
          } else if (operator === '+') {
            correctAnswer = num1 + num2;
          } else if (operator === '×') {
            correctAnswer = num1 * num2;
          }
          questionText = `${num1} ${operator} ${num2}`;
          break;
      }
    } else {
      // Existing Quick Play logic
      num1 = getRandomNumber(1, gameData.difficulty === 'easy' ? 15 : gameData.difficulty === 'medium' ? 30 : 50);
      num2 = getRandomNumber(1, gameData.difficulty === 'easy' ? 15 : gameData.difficulty === 'medium' ? 30 : 50);
      operator = getRandomOperator(gameData.difficulty === 'hard' ? ['+', '-', '×', '÷'] : ['+', '-']);

      if (operator === '÷') {
        if (num1 % num2 !== 0) {
          const multiple = getRandomNumber(1, 10);
          num1 = num2 * multiple;
        }
        correctAnswer = num1 / num2;
      } else if (operator === '-') {
        if (num1 < num2) {
          [num1, num2] = [num2, num1];
        }
        correctAnswer = num1 - num2;
      } else if (operator === '+') {
        correctAnswer = num1 + num2;
      } else if (operator === '×') {
        correctAnswer = num1 * num2;
      }
      questionText = `${num1} ${operator} ${num2}`;
    }

    setGameData(prev => ({
      ...prev,
      currentQuestion: questionText,
      currentAnswer: correctAnswer
    }));
  }, [gameData.difficulty, currentLevel]);

  const toggleTestMode = useCallback(() => {
    setGameData(prev => ({ ...prev, testMode: !prev.testMode }));
  }, []);

  const togglePause = useCallback(() => {
    setGameData(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const goBackToStart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameData(prev => ({
      ...prev,
      gameState: 'start',
      isPaused: false,
      score: 0,
      time: prev.maxTime
    }));
    setCurrentLevel(null);
  }, []);

  const restartGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameData(prev => ({
      ...prev,
      score: 0,
      time: prev.maxTime,
      isPaused: false,
      gameState: 'playing'
    }));
  }, []);

  const checkAchievements = (data: GameData) => {
    const newAchievements = [...data.achievements];
    let updated = false;

    if (data.score >= 1 && !newAchievements.find(a => a.id === 'first_correct')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'first_correct');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        updated = true;
      }
    }

    if (data.streak >= 5 && !newAchievements.find(a => a.id === 'speed_demon')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'speed_demon');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        updated = true;
      }
    }

    if (data.streak >= 10 && !newAchievements.find(a => a.id === 'streak_master')?.unlocked) {
      const idx = newAchievements.findIndex(a => a.id === 'streak_master');
      if (idx !== -1) {
        newAchievements[idx].unlocked = true;
        updated = true;
      }
    }

    if (updated) {
      setGameData(prev => ({ ...prev, achievements: newAchievements }));
    }
  };

  const startGame = useCallback((difficulty: Difficulty, maxTime: number, username: string) => {
    playSound('gameStart');
    setCurrentLevel(null);
    setGameData(prev => ({
      ...prev,
      difficulty,
      maxTime,
      time: maxTime,
      score: 0,
      streak: 0,
      maxStreak: 0,
      wrongAnswers: 0,
      gameState: 'playing',
      username: username
    }));
  }, [playSound]);

  const startCampaign = useCallback(() => {
    setGameData(prev => ({ ...prev, gameState: 'campaignMap' }));
  }, []);

  const startLevel = useCallback((level: Level) => {
    setCurrentLevel(level);
    setGameData(prev => ({ ...prev, gameState: 'levelIntro' }));
  }, []);

  const playLevel = useCallback(() => {
    if (currentLevel) {
      playSound('gameStart');
      setGameData(prev => ({
        ...prev,
        difficulty: 'easy', // Or derive from level
        maxTime: currentLevel.targetTime || 60,
        time: currentLevel.targetTime || 60,
        score: 0,
        streak: 0,
        maxStreak: 0,
        wrongAnswers: 0,
        gameState: 'playing',
      }));
    }
  }, [currentLevel, playSound]);

  const saveScoreToLeaderboard = (gameData: GameData) => {
    const playerName = localStorage.getItem('skillsum_playername') || 'Anonymous';
    
    const entry: LeaderboardEntry = {
      id: Date.now().toString(),
      playerName,
      score: gameData.score,
      difficulty: gameData.difficulty,
      maxStreak: gameData.maxStreak,
      date: new Date().toISOString(),
      time: gameData.maxTime
    };

    const stored = localStorage.getItem('skillsum_leaderboard');
    let leaderboard: LeaderboardEntry[] = [];
    
    if (stored) {
      try {
        leaderboard = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse leaderboard:', e);
      }
    }

    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 100);

    localStorage.setItem('skillsum_leaderboard', JSON.stringify(leaderboard));
  };

  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    playSound('gameEnd');
    
    if (currentLevel) {
      const newProgress = { ...userProgress, [currentLevel.id]: { completed: gameData.score >= currentLevel.targetScore, score: gameData.score } };
      setUserProgress(newProgress);
      localStorage.setItem('skillsum_progress', JSON.stringify(newProgress));
    }

    setGameData(prev => {
      const finalScore = prev.score + 0.5 * prev.maxStreak;
      const newAchievements = [...prev.achievements];
      
      if (prev.wrongAnswers === 0 && prev.score > 0) {
        const idx = newAchievements.findIndex(a => a.id === 'perfect_score');
        if (idx !== -1 && !newAchievements[idx].unlocked) {
          newAchievements[idx].unlocked = true;
        }
      }
      
      if (prev.difficulty === 'hard' && finalScore >= 20) {
        const idx = newAchievements.findIndex(a => a.id === 'math_wizard');
        if (idx !== -1 && !newAchievements[idx].unlocked) {
          newAchievements[idx].unlocked = true;
        }
      }
      
      const updatedData = { ...prev, score: finalScore, gameState: 'end' as GameState, achievements: newAchievements };
      
      if (finalScore > 0 && !currentLevel) {
        saveScoreToLeaderboard(updatedData);
      }
      
      return updatedData;
    });
  };

  const handleCorrectAnswer = useCallback(() => {
    playSound('correct');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
    
    setGameData(prev => {
      const newStreak = prev.streak + 1;
      const newMaxStreak = Math.max(newStreak, prev.maxStreak);
      const newData = { 
        ...prev, 
        score: prev.score + 1, 
        streak: newStreak,
        maxStreak: newMaxStreak
      };
      checkAchievements(newData);
      return newData;
    });
    
    setTimeout(() => {
      if (gameData.time > 0) {
        generateQuestion();
      }
    }, 800);
  }, [playSound, gameData.time, generateQuestion]);

    const handleWrongAnswer = useCallback(() => {
      playSound('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      setGameData(prev => ({ 
        ...prev, 
        streak: 0,
        wrongAnswers: prev.wrongAnswers + 1
      }));
      
      setTimeout(() => {
        if (gameData.time > 0) {
          generateQuestion();
        }
      }, 800);
    }, [playSound, gameData.time, generateQuestion]);

    const resetGame = useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setGameData(prev => ({
        ...prev,
        gameState: 'start',
        score: 0,
        time: 30,
        maxTime: 30
      }));
      setCurrentLevel(null);
    }, []);

    const showLeaderboard = useCallback(() => {
    setGameData(prev => ({ ...prev, gameState: 'leaderboard' }));
  }, []);

  const hideLeaderboard = useCallback(() => {
    setGameData(prev => ({ ...prev, gameState: 'start' }));
  }, []);

  const showCampaignMap = useCallback(() => {
    setGameData(prev => ({ ...prev, gameState: 'campaignMap' }));
  }, []);

  const goToStartScreen = useCallback(() => {
    setGameData(prev => ({ ...prev, gameState: 'start' }));
  }, []);

  const updateProgress = (levelId: number, score: number) => {
    const newProgress = { ...userProgress, [levelId]: { completed: score > 0, score } };
    setUserProgress(newProgress);
    localStorage.setItem('skillsum_progress', JSON.stringify(newProgress));
  };

  // Timer effect
  useEffect(() => {
    if (gameData.gameState === 'playing' && !gameData.isPaused) {
      timerRef.current = setInterval(() => {
        setGameData(prev => {
          if (prev.time <= 10 && prev.time > 1) {
            playSound('tick');
          }
          
          if (prev.time <= 1) {
            return { ...prev, time: 0 };
          }
          return { ...prev, time: prev.time - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameData.gameState, gameData.isPaused, playSound]);

  // End game when time reaches 0
  useEffect(() => {
    if (gameData.gameState === 'playing' && gameData.time === 0) {
      endGame();
    }
  }, [gameData.time, gameData.gameState]);

  // Generate initial question
  useEffect(() => {
    if (gameData.gameState === 'playing') {
      generateQuestion();
    }
  }, [gameData.gameState, generateQuestion]);

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      {showConfetti && <ConfettiEffect />}
      <div className={`flex justify-center items-center min-h-screen p-5 ${shake ? 'animate-shake' : ''}`}>
        <div 
          className={`game-container rounded-3xl shadow-lg p-8 text-center w-full flex flex-col justify-center items-center transition-all duration-300 relative ${
            gameData.gameState === 'campaignMap' || gameData.gameState === 'leaderboard' 
              ? 'max-w-4xl' 
              : 'max-w-md'
          }`}
          style={{
            background: 'linear-gradient(135deg, #fff8e1, #fffde7)',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
        <h1
          className="text-4xl font-bold mb-5 animate-bounce-in"
          style={{ color: '#ff80ab', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.05)' }}
        >
          SKILL SUM
        </h1>
        
        {gameData.gameState === 'playing' && gameData.testMode && (
          <div 
            className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded"
            style={{ 
              backgroundColor: '#ff5722', 
              color: '#fff',
              transform: 'rotate(10deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            TEST MODE
          </div>
        )}

        {gameData.gameState === 'start' && (
          <StartScreen
            onStartGame={startGame}
            onShowLeaderboard={showLeaderboard}
            onStartCampaign={startCampaign}
          />
        )}

        {gameData.gameState === 'campaignMap' && (
          <Suspense fallback={<LoadingSkeleton lines={5} />}>
            <CampaignMapScreen
              onStartLevel={startLevel}
              userProgress={userProgress}
              onBack={goToStartScreen}
              onUpdateProgress={updateProgress}
            />
          </Suspense>
        )}

        {gameData.gameState === 'levelIntro' && currentLevel && (
          <Suspense fallback={<LoadingSkeleton lines={3} />}>
            <LevelIntroScreen
              level={currentLevel}
              onStartLevel={playLevel}
            />
          </Suspense>
        )}

        {gameData.gameState === 'playing' && (
          <GameScreen
            gameData={gameData}
            level={currentLevel}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            onToggleTestMode={toggleTestMode}
            onTogglePause={togglePause}
            onGoBack={goBackToStart}
            onRestart={restartGame}
          />
        )}

        {gameData.gameState === 'end' && (
          <EndScreen
            score={gameData.score}
            maxTime={gameData.maxTime}
            difficulty={gameData.difficulty}
            maxStreak={gameData.maxStreak}
            achievements={gameData.achievements}
            username={gameData.username}
            onPlayAgain={resetGame}
            onViewLeaderboard={showLeaderboard}
            level={currentLevel}
            onNextLevel={showCampaignMap}
          />
        )}

        {gameData.gameState === 'leaderboard' && (
          <Suspense fallback={<ScoreSkeleton showStats={false} />}>
            <LeaderboardScreen
              onBack={hideLeaderboard}
            />
          </Suspense>
        )}
        </div>
      </div>
    </>
  );
}
