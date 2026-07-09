import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { scorePartA, scorePartB, generateProfile, exportToCSV } from '../utils/scoring.js';
import { avatars } from '../data/assessmentData.js';
import { motion } from 'framer-motion';

const Admin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [sessions, setSessions] = useState([]);

  // Scan all keys starting with xplore_session_
  const loadSessionsFromStorage = () => {
    const loaded = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('xplore_session_')) {
        try {
          const val = localStorage.getItem(key);
          if (val) {
            const parsed = JSON.parse(val);
            loaded.push(parsed);
          }
        } catch (e) {
          console.error('Error parsing session from local storage key:', key, e);
        }
      }
    }
    // Also parse active xplore_session if completed
    const activeRaw = localStorage.getItem('xplore_session');
    if (activeRaw) {
      try {
        const parsedActive = JSON.parse(activeRaw);
        if (parsedActive.isComplete && parsedActive.explorer && parsedActive.explorer.name) {
          // Verify if already included via key to avoid duplicates
          const exists = loaded.some(s => s.explorer?.name === parsedActive.explorer?.name && s.xpTotal === parsedActive.xpTotal);
          if (!exists) {
            loaded.push(parsedActive);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    setSessions(loaded);
  };

  useEffect(() => {
    loadSessionsFromStorage();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'xplore2024') {
      setIsAuthorized(true);
      setError('');
    } else {
      setShake(true);
      setError('Incorrect Administrator Password.');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleExportCSV = () => {
    if (sessions.length === 0) {
      alert("No student session records available for export.");
      return;
    }
    const csvContent = exportToCSV(sessions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Xplore_Pilot_Results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAllData = () => {
    if (confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL student pilot results? This will purge all session keys. This action cannot be undone.")) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('xplore_session_') || key === 'xplore_session')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
      alert("All pilot session data has been purged.");
      window.location.reload();
    }
  };

  // Compute stats metrics
  const totalCount = sessions.length;
  let scienceCount = 0;
  let commerceCount = 0;
  let artsCount = 0;
  let exploratoryCount = 0;

  const processedSessions = sessions.map(session => {
    const explorer = session.explorer || {};
    const pA = session.partAAnswers || {};
    const pB = session.partBAnswers || session.aptitudeAnswers || {};

    const scoredA = scorePartA(pA);
    const scoredB = scorePartB(pB);
    const profile = generateProfile(scoredA, scoredB);

    const sig = profile.streamSignal;
    if (sig.includes("Science")) scienceCount++;
    else if (sig.includes("Commerce")) commerceCount++;
    else if (sig.includes("Arts")) artsCount++;
    else if (sig.includes("Cross-stream") || profile.confidence === "Exploratory") exploratoryCount++;

    const avatarObj = avatars.find(a => a.id === explorer.avatarId);

    return {
      name: explorer.name || 'Anonymous',
      school: explorer.school || 'N/A',
      section: explorer.section || 'N/A',
      avatarEmoji: avatarObj ? avatarObj.emoji : '🚀',
      threeLetterCode: scoredA.threeLetterCode,
      streamSignal: profile.streamSignal,
      confidence: profile.confidence,
      verbalPct: scoredB.verbal.percentage,
      numericalPct: scoredB.numerical.percentage,
      logicalPct: scoredB.logical.percentage,
      date: session.date || new Date().toLocaleDateString()
    };
  });

  // --- RENDERING ROUTINE: UNVERIFIED PASSWORD GATE ---
  if (!isAuthorized) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 bg-surface min-h-[calc(100vh-80px)]">
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-card rounded-3xl border border-indigo-100 shadow-2xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-700 text-3xl mb-4 border border-indigo-100">
            🧭
          </div>
          
          <h2 className="text-2xl font-black text-primary mb-1.5">Xplore Pilot Login</h2>
          <p className="text-text-muted text-xs font-semibold mb-6">
            Enter administrative credentials to open pilot results telemetry overrides.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 pl-0.5">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-indigo-100 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary-light focus:outline-none transition min-h-[48px]"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-black text-center mt-1">⚠️ {error}</p>}
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-extrabold text-xs tracking-wider uppercase py-4 rounded-xl shadow-lg transition min-h-[48px]"
            >
              Enter Dashboard →
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-bold text-primary/75 hover:text-primary mt-6 transition"
          >
            ◀ Back to Welcome Screen
          </button>
        </motion.div>
      </div>
    );
  }

  // --- RENDERING ROUTINE: PILOT CONTROL CONSOLE ---
  return (
    <div className="flex-1 bg-surface py-6 px-4 md:px-8">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        {/* Upper title actions bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-indigo-100/50 pb-5">
          <div className="text-left">
            <h2 className="text-2xl font-black text-primary">Xplore Pilot — Admin View</h2>
            <p className="text-text-muted text-xs font-semibold">Consolidated analytics reports and session storage records.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={loadSessionsFromStorage}
              className="px-4 py-3 bg-white border border-indigo-150 text-primary text-xs font-black uppercase rounded-lg hover:bg-indigo-50/20 transition min-h-[48px]"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="px-5 py-3 bg-primary hover:bg-primary-light text-white text-xs font-black uppercase rounded-lg shadow transition min-h-[48px]"
            >
              📥 Export CSV
            </button>
            <button
              onClick={handleClearAllData}
              className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-lg shadow transition min-h-[48px]"
            >
              🗑️ Clear All Data
            </button>
          </div>
        </div>

        {/* Summary metric card columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-card border border-indigo-50 p-4 rounded-2xl text-left shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">Total Students</span>
            <p className="text-3xl font-black text-primary mt-1">{totalCount}</p>
          </div>
          <div className="bg-card border border-indigo-50 p-4 rounded-2xl text-left shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Science Signal</span>
            <p className="text-3xl font-black text-blue-700 mt-1">{scienceCount}</p>
          </div>
          <div className="bg-card border border-indigo-50 p-4 rounded-2xl text-left shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600">Commerce Signal</span>
            <p className="text-3xl font-black text-red-700 mt-1">{commerceCount}</p>
          </div>
          <div className="bg-card border border-indigo-50 p-4 rounded-2xl text-left shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">Arts Signal</span>
            <p className="text-3xl font-black text-purple-700 mt-1">{artsCount}</p>
          </div>
          <div className="bg-card border border-indigo-50 p-4 rounded-2xl text-left shadow-sm col-span-2 md:col-span-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">Exploratory</span>
            <p className="text-3xl font-black text-amber-700 mt-1">{exploratoryCount}</p>
          </div>
        </div>

        {/* Scrollable telemetries table */}
        <div className="bg-card rounded-2xl border border-indigo-100 shadow-md overflow-hidden flex flex-col">
          <div className="overflow-x-auto max-h-[480px]">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-[#1E1B4B] text-white uppercase tracking-wider text-[10px] font-black sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-4 min-w-[140px]">Name</th>
                  <th className="px-4 py-4 min-w-[150px]">School</th>
                  <th className="px-4 py-4">Section</th>
                  <th className="px-4 py-4 text-center">Avatar</th>
                  <th className="px-4 py-4 text-center">Code</th>
                  <th className="px-4 py-4 min-w-[160px]">Stream Signal</th>
                  <th className="px-4 py-4">Confidence</th>
                  <th className="px-4 py-4 text-right">Verbal%</th>
                  <th className="px-4 py-4 text-right">Num%</th>
                  <th className="px-4 py-4 text-right">Logic%</th>
                  <th className="px-4 py-4 text-center min-w-[100px]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50 font-semibold text-primary">
                {processedSessions.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-5 py-12 text-center text-text-muted font-bold text-sm">
                      No completed student session records found. Perform assessments to populate dashboard.
                    </td>
                  </tr>
                ) : (
                  processedSessions.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-indigo-50/20' : 'bg-white hover:bg-slate-50/40'}>
                      <td className="px-5 py-3.5 font-bold text-sm">{row.name}</td>
                      <td className="px-4 py-3.5 text-text-muted">{row.school}</td>
                      <td className="px-4 py-3.5">{row.section}</td>
                      <td className="px-4 py-3.5 text-center text-base select-none">{row.avatarEmoji}</td>
                      <td className="px-4 py-3.5 text-center font-bold text-indigo-700 tracking-wider">{row.threeLetterCode}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.streamSignal.includes('Science')
                            ? 'bg-blue-50 text-blue-800'
                            : row.streamSignal.includes('Arts')
                            ? 'bg-purple-50 text-purple-800'
                            : row.streamSignal.includes('Commerce')
                            ? 'bg-rose-50 text-rose-800'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {row.streamSignal}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.confidence === 'Strong'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {row.confidence}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">{row.verbalPct}%</td>
                      <td className="px-4 py-3.5 text-right">{row.numericalPct}%</td>
                      <td className="px-4 py-3.5 text-right">{row.logicalPct}%</td>
                      <td className="px-4 py-3.5 text-center text-text-muted text-[10px]">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
