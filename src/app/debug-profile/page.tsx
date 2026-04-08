
'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import { useState, useEffect } from 'react';

export default function DebugProfilePage() {
  const { 
    profile, 
    updateProfile, 
    recordSession, 
    isLoaded, 
    masteryMap,
    history
  } = useUserProfile();

  const [testOutput, setTestOutput] = useState<string[]>([]);

  const addLog = (msg: string) => setTestOutput(prev => [...prev, msg]);

  const runTests = () => {
    setTestOutput([]);
    addLog('--- Starting Tests ---');

    // Test 1: updateProfile
    const newName = 'Test Player ' + Math.floor(Math.random() * 1000);
    updateProfile({ username: newName });
    addLog(`✓ updateProfile called with name: ${newName}`);

    // Test 2: recordSession (XP)
    const initialXP = profile.xp;
    const mockSession = {
      id: 'test-session-' + Date.now(),
      mode: 'learn' as const,
      levelId: 1,
      startedAt: new Date().toISOString(),
      durationMs: 30000,
      attempts: [],
      correct: 10,
      wrong: 0,
      accuracy: 100,
      maxStreak: 10,
      xpEarned: 500,
      starsEarned: 3 as const,
    };
    recordSession(mockSession);
    addLog(`✓ recordSession called for 500 XP`);
    
    addLog('Note: React state updates are async, please check the values below after a moment.');
  };

  if (!isLoaded) return <div className="p-8 font-bold">Loading Profile...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-sans">
      <h1 className="text-3xl font-bold border-b pb-2">Profile Hook Debugger</h1>
      
      <div className="flex gap-4">
        <button 
          onClick={runTests}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold shadow-md transition-all active:scale-95"
        >
          Run Debug Tests
        </button>
        <button 
          onClick={() => { localStorage.clear(); window.location.reload(); }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold shadow-md transition-all active:scale-95"
        >
          Clear LocalStorage & Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* State View */}
        <div className="space-y-4">
          <section className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Profile State</h2>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-60">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </section>

          <section className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Mastery Map (L1)</h2>
            <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-40">
              {JSON.stringify(masteryMap[1] || 'No data yet', null, 2)}
            </pre>
          </section>
        </div>

        {/* Test Logs */}
        <section className="bg-gray-800 text-green-400 p-4 rounded-xl shadow-inner font-mono overflow-auto h-full min-h-[400px]">
          <h2 className="text-xl font-bold text-white mb-2 pb-2 border-b border-gray-700">Test Logs</h2>
          {testOutput.map((log, i) => (
            <div key={i} className="mb-1">{`> ${log}`}</div>
          ))}
          {testOutput.length === 0 && <div className="text-gray-500 italic">Click "Run Debug Tests" to start...</div>}
        </section>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">How to test Streak logic manually:</h3>
        <ol className="list-decimal ml-6 text-blue-700 space-y-1">
          <li>Check current <code className="bg-blue-100 px-1 rounded">dailyStreak</code> and <code className="bg-blue-100 px-1 rounded">lastStreakDate</code>.</li>
          <li>Click "Run Debug Tests" — it should increment if last streak was yesterday, or set to 1 if first play today.</li>
          <li>To simulate tomorrow: open Console, run: <br/> 
            <code className="bg-gray-900 text-white p-1 rounded mt-2 block whitespace-pre overflow-x-auto">
              let p = JSON.parse(localStorage.getItem('skillsum_v2_profile')); 
              p.lastStreakDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
              localStorage.setItem('skillsum_v2_profile', JSON.stringify(p));
              window.location.reload();
            </code>
          </li>
          <li>Then click "Run Debug Tests" again to see the streak increment!</li>
        </ol>
      </div>
    </div>
  );
}
