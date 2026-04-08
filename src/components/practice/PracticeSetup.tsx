'use client';

import { useState } from 'react';
import type { PracticeConfig, OperationType, PracticeMode, PersonalBest } from '@/lib/types';

interface PracticeSetupProps {
  personalBests: PersonalBest[];
  onStart: (config: PracticeConfig) => void;
  onBack: () => void;
}

export function PracticeSetup({ personalBests, onStart, onBack }: PracticeSetupProps) {
  const [mode, setMode] = useState<PracticeMode>('time');
  const [timeLimit, setTimeLimit] = useState(60);
  const [targetCount, setTargetCount] = useState(25);
  const [operators, setOperators] = useState<OperationType[]>(['+']);
  const [rangePreset, setRangePreset] = useState<'easy' | 'medium' | 'hard'>('easy');

  const rangeMap: Record<string, [number, number]> = {
    easy: [1, 15],
    medium: [1, 30],
    hard: [1, 50],
  };

  const config: PracticeConfig = {
    mode,
    timeLimit: mode === 'time' ? timeLimit : undefined,
    targetCount: mode === 'count' ? targetCount : undefined,
    operators,
    numberRange: rangeMap[rangePreset],
  };

  const configKey = JSON.stringify(config);
  const pb = personalBests.find(p => p.configKey === configKey);

  const toggleOperator = (op: OperationType) => {
    setOperators(prev =>
      prev.includes(op)
        ? prev.length > 1 ? prev.filter(o => o !== op) : prev // keep at least one
        : [...prev, op]
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-gray-500">←</button>
        <h2 className="text-2xl font-bold text-gray-800">Practice</h2>
      </div>

      {/* Mode selector */}
      <Section title="Mode">
        <div className="flex gap-2">
          {(['time', 'count', 'zen'] as PracticeMode[]).map(m => (
            <PillButton key={m} active={mode === m} onClick={() => setMode(m)}>
              {m === 'time' ? '⏱ Time' : m === 'count' ? '🎯 Count' : '🧘 Zen'}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Time limit (for time mode) */}
      {mode === 'time' && (
        <Section title="Time Limit">
          <div className="flex gap-2">
            {[15, 30, 60, 120].map(t => (
              <PillButton key={t} active={timeLimit === t} onClick={() => setTimeLimit(t)}>
                {t}s
              </PillButton>
            ))}
          </div>
        </Section>
      )}

      {/* Target count (for count mode) */}
      {mode === 'count' && (
        <Section title="Target">
          <div className="flex gap-2">
            {[10, 25, 50, 100].map(n => (
              <PillButton key={n} active={targetCount === n} onClick={() => setTargetCount(n)}>
                {n}
              </PillButton>
            ))}
          </div>
        </Section>
      )}

      {/* Operations */}
      <Section title="Operations">
        <div className="flex gap-2">
          {(['+', '-', '×', '÷'] as OperationType[]).map(op => (
            <PillButton key={op} active={operators.includes(op)} onClick={() => toggleOperator(op)}>
              {op}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Number range */}
      <Section title="Number Range">
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map(r => (
            <PillButton key={r} active={rangePreset === r} onClick={() => setRangePreset(r)}>
              {r === 'easy' ? '🟢 Easy' : r === 'medium' ? '🟡 Medium' : '🔴 Hard'}
            </PillButton>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Range: {rangeMap[rangePreset].join(' – ')}</p>
      </Section>

      {/* Personal best */}
      {pb && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 text-center">
          <p className="text-sm text-yellow-700 font-semibold">🏆 Personal Best for this config</p>
          <p className="text-xl font-bold text-yellow-800">{pb.score} correct</p>
          <p className="text-xs text-yellow-600">{pb.accuracy.toFixed(0)}% accuracy</p>
        </div>
      )}

      <button
        onClick={() => onStart(config)}
        className="w-full py-5 rounded-2xl text-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
        style={{ backgroundColor: '#ff80ab', boxShadow: '0 6px 0 #c55f85' }}
      >
        Start Practicing ▶
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        active ? 'text-white shadow-sm' : 'bg-gray-100 text-gray-600'
      }`}
      style={active ? { backgroundColor: '#ff80ab' } : {}}
    >
      {children}
    </button>
  );
}
