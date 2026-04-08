'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { SessionResult } from '@/lib/types';

interface PracticeResultsProps {
  session: SessionResult;
  xpEarned: number;
  isPersonalBest: boolean;
  onRetry: () => void;
  onChangeConfig: () => void;
  onHome: () => void;
}

export function PracticeResults({ session, xpEarned, isPersonalBest, onRetry, onChangeConfig, onHome }: PracticeResultsProps) {
  // Build per-second chart data from attempts
  const chartData = buildChartData(session);

  return (
    <div className="flex flex-col gap-5 p-6 max-w-md mx-auto">
      {isPersonalBest && (
        <div className="bg-yellow-400 text-white rounded-2xl p-3 text-center font-bold text-lg animate-bounce-in">
          🏆 NEW PERSONAL BEST!
        </div>
      )}

      <div className="text-center">
        <div className="text-6xl font-bold" style={{ color: '#ff80ab' }}>{session.correct}</div>
        <div className="text-gray-500">correct answers</div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Accuracy" value={`${session.accuracy.toFixed(0)}%`} />
        <StatBox label="Best Streak" value={`${session.maxStreak}🔥`} />
        <StatBox label="+XP" value={`${xpEarned}`} />
      </div>

      {/* Speed graph */}
      {chartData.length > 1 && (
        <div className="bg-white rounded-2xl border p-4">
          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Performance Over Time</p>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="correct" stroke="#ff80ab" strokeWidth={2} dot={false} />
              <XAxis dataKey="label" tick={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v: number) => [`${v} correct`, '']}
                labelFormatter={() => ''}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button onClick={onRetry} className="w-full py-4 rounded-2xl font-bold text-white text-lg" style={{ backgroundColor: '#ff80ab', boxShadow: '0 4px 0 #c55f85' }}>
          Retry Same Config
        </button>
        <button onClick={onChangeConfig} className="w-full py-4 rounded-2xl font-bold text-gray-700 text-lg bg-gray-100">
          Change Settings
        </button>
        <button onClick={onHome} className="w-full py-3 rounded-2xl text-sm text-gray-500">
          ← Home
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <div className="font-bold text-lg text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function buildChartData(session: SessionResult) {
  // Group attempts into 10-second buckets
  if (!session.attempts.length) return [];
  const bucketMs = 10000;
  const buckets: number[] = [];
  let bucketCorrect = 0;
  let bucketStart = 0;

  for (const attempt of session.attempts) {
    if (attempt.responseMs - bucketStart > bucketMs) {
      buckets.push(bucketCorrect);
      bucketCorrect = 0;
      bucketStart += bucketMs;
    }
    if (attempt.isCorrect) bucketCorrect++;
  }
  buckets.push(bucketCorrect);

  return buckets.map((correct, i) => ({ label: `${i * 10}s`, correct }));
}
