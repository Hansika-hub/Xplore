import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import AvatarSelect from './pages/AvatarSelect.jsx';
import MissionMap from './pages/MissionMap.jsx';
import ZoneQuestions from './pages/ZoneQuestions.jsx';
import VaultQuestions from './pages/VaultQuestions.jsx';
import Report from './pages/Report.jsx';
import Admin from './pages/Admin.jsx';
import { useAssessment } from './context/AssessmentContext.jsx';
import { avatars } from './data/assessmentData.js';
import { AnimatePresence, motion } from 'framer-motion';

// Navigation guard wrapping protected routes for session gates
const NavigationGuard = ({ children }) => {
  const { explorer, completedZones, completedVaults } = useAssessment();
  const location = useLocation();
  const path = location.pathname;

  const hasExplorer = explorer && explorer.name;
  const zonesCount = completedZones ? completedZones.length : 0;
  const vaultsCount = completedVaults ? completedVaults.length : 0;

  // Rule 1: /map -> redirect to / if explorer not set
  if (path === '/map' && !hasExplorer) {
    return <Navigate to="/" replace />;
  }

  // Rule 2: /zone/:code -> redirect to /map if explorer not set
  if (path.startsWith('/zone/') && !hasExplorer) {
    return <Navigate to="/map" replace />;
  }

  // Rule 3: /vault/:section -> redirect to /map if not all 6 zones complete
  if (path.startsWith('/vault/') && zonesCount < 6) {
    return <Navigate to="/map" replace />;
  }

  // Rule 4: /report -> redirect to /map if not all 6 zones AND 3 vaults complete
  if (path === '/report' && (zonesCount < 6 || vaultsCount < 3)) {
    return <Navigate to="/map" replace />;
  }

  // General fallback
  if (!hasExplorer && path !== '/') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Navigation header displayed across the application
const AppHeader = () => {
  const { explorer, xpTotal, completedZones, resetSession } = useAssessment();
  const location = useLocation();

  // Hide header on welcome and admin pages
  if (location.pathname === '/' || location.pathname === '/admin') return null;

  const currentAvatar = avatars.find(av => av.id === explorer.avatarId);
  const avatarEmoji = currentAvatar ? currentAvatar.emoji : '🚀';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-primary/80 border-b border-primary-light/30 px-4 py-3 md:px-8 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <Link to="/map" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🧭</span>
          <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-violet-300 to-indigo-200 bg-clip-text text-transparent">
            XPLORE MISSIONS
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Explorer Profile Details */}
        {explorer.name && (
          <div className="flex items-center gap-2 md:gap-3 bg-primary-light/20 border border-primary-light/30 px-3 py-1.5 rounded-full">
            <div className="text-xl md:text-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              {avatarEmoji}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider leading-none">Explorer</p>
              <h4 className="text-sm font-extrabold text-white">{explorer.name}</h4>
            </div>
          </div>
        )}

        {/* XP Total Tracker */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-gold/20 border border-gold/40 px-3 py-1.5 rounded-full shadow-inner">
          <span className="text-gold text-lg">✨</span>
          <div className="text-left">
            <p className="text-[10px] text-gold/80 font-black uppercase tracking-widest leading-none">XP Points</p>
            <p className="text-sm font-black text-gold">{xpTotal}</p>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="hidden md:flex flex-col text-right">
          <p className="text-xs text-text-muted font-bold">Missions</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-24 bg-primary-light/30 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: `${(completedZones.length / 6) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-violet-200">{completedZones.length}/6</span>
          </div>
        </div>

        {/* Reset / Exit Button */}
        <button 
          onClick={() => {
            if (confirm("Are you sure you want to reset your space explorer session? All progress will be lost.")) {
              resetSession();
              window.location.href = '/';
            }
          }}
          className="text-xs font-bold text-red-300 hover:text-red-400 border border-red-500/30 hover:border-red-500/50 bg-red-950/10 px-3 py-1.5 rounded-full transition-all duration-300"
        >
          Reset
        </button>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface flex flex-col font-sans select-none overflow-x-hidden text-primary">
        <AppHeader />
        
        <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/avatar" element={<AvatarSelect />} />
            
            {/* Protected Routes */}
            <Route path="/map" element={
              <NavigationGuard>
                <MissionMap />
              </NavigationGuard>
            } />
            <Route path="/zone/:code" element={
              <NavigationGuard>
                <ZoneQuestions />
              </NavigationGuard>
            } />
            <Route path="/vault/:section" element={
              <NavigationGuard>
                <VaultQuestions />
              </NavigationGuard>
            } />
            <Route path="/report" element={
              <NavigationGuard>
                <Report />
              </NavigationGuard>
            } />
            <Route path="/admin" element={<Admin />} />

            {/* Fallback to welcome screen */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
