import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { vaults } from '../data/zones.js';
import { partBQuestions } from '../data/questions.js';
import { motion, AnimatePresence } from 'framer-motion';

const VaultQuestions = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { completedZones, completedVaults, aptitudeAnswers, submitAptitude } = useAssessment();

  const vault = vaults.find(v => v.id === section);
  const questions = partBQuestions[section] || [];

  // Check if all 6 zones are complete on load, otherwise redirect
  useEffect(() => {
    if (completedZones.length < 6) {
      navigate('/map');
    }
  }, [completedZones, navigate]);

  const [showEntryScreen, setShowEntryScreen] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [localAnswers, setLocalAnswers] = useState({});
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);

  useEffect(() => {
    if (vault && aptitudeAnswers[section]) {
      setLocalAnswers(aptitudeAnswers[section]);
    }
  }, [vault, section, aptitudeAnswers]);

  if (!vault || questions.length === 0) return null;

  const currentQuestion = questions[currentQIndex];

  // Auto-sync selected options when navigating questions
  useEffect(() => {
    if (currentQuestion) {
      setSelectedLetter(localAnswers[currentQuestion.id] || null);
    }
  }, [currentQIndex, localAnswers, currentQuestion]);

  const handleSelectOption = (letter) => {
    setSelectedLetter(letter);
    const updated = { ...localAnswers, [currentQuestion.id]: letter };
    setLocalAnswers(updated);
    
    // Auto-save to context on each selection
    submitAptitude(section, { [currentQuestion.id]: letter });
  };

  const handleNext = () => {
    if (!selectedLetter) return;
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Last question: complete the vault
      setShowCompleteScreen(true);
    }
  };

  const handleBack = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    } else {
      navigate('/map');
    }
  };

  // Helper to parse Quotes / Passages
  const renderQuestionText = (text) => {
    const readFollowingPattern = /Read the following and answer:\s*"(.*?)"\n*(.*)/s;
    const match = text.match(readFollowingPattern);
    
    if (match) {
      const passage = match[1];
      const remaining = match[2];
      return (
        <div className="text-left">
          <div className="bg-slate-50 border-l-4 border-indigo-400 p-4 rounded-xl font-medium text-xs md:text-sm leading-relaxed mb-4 text-primary shadow-inner italic">
            "{passage}"
          </div>
          <p className="text-sm md:text-base font-extrabold text-primary whitespace-pre-line leading-relaxed mt-2">
            {remaining}
          </p>
        </div>
      );
    }
    return (
      <p className="text-left text-sm md:text-base font-extrabold text-primary whitespace-pre-line leading-relaxed">
        {text}
      </p>
    );
  };

  // Determine section name label text
  const getSectionBadgeText = () => {
    if (section === 'verbal') return 'Verbal Reasoning';
    if (section === 'numerical') return 'Numerical Reasoning';
    if (section === 'logical') return 'Logical Reasoning';
    return 'Reasoning';
  };

  const allThreeVaultsComplete = completedVaults && completedVaults.length >= 3;

  return (
    <div className="flex-1 bg-primary text-white min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-6 px-4 select-none relative">
      
      {/* Styles block for keyframe animations */}
      <style>{`
        @keyframes crack-open {
          0% { transform: scale(1) rotate(0deg); }
          10% { transform: scale(1.15) rotate(10deg); }
          20% { transform: scale(1.15) rotate(-10deg); }
          30% { transform: scale(1.15) rotate(10deg); }
          40% { transform: scale(1.15) rotate(-10deg); }
          50% { transform: scale(1.15) rotate(6deg); }
          60% { transform: scale(1.15) rotate(-6deg); }
          70% { transform: scale(1.15) rotate(0deg); }
          100% { transform: scale(1.05) rotate(0deg) translateY(-12px); }
        }
        .animate-crack-open {
          animation: crack-open 1.1s ease-in-out forwards;
        }
      `}</style>

      {/* --- RENDER VAULT COMPLETION OVERLAY --- */}
      {showCompleteScreen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-white text-primary flex flex-col items-center justify-center p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full flex flex-col items-center gap-6"
          >
            {/* Gold Vault crack-open animation */}
            <div className="w-24 h-24 rounded-full bg-amber-50 shadow-inner flex items-center justify-center text-5xl mb-2 animate-crack-open">
              {vault.icon}
            </div>

            <h2 className="text-3xl font-black text-gold">
              Vault Cracked!
            </h2>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-amber-50 border border-gold/45 px-5 py-2.5 rounded-full text-gold font-black text-xs shadow-md"
            >
              +{vault.xpReward} XP Badge Secured
            </motion.div>

            {allThreeVaultsComplete ? (
              <div className="flex flex-col items-center gap-4 mt-2">
                <p className="text-text-muted text-xs font-bold leading-relaxed px-4">
                  Amazing work, Cadet! All Vaults are decrypted. Your final **Explorer Profile** is now complete and ready.
                </p>
                <button
                  onClick={() => navigate('/report')}
                  className="w-full bg-primary hover:bg-primary-light text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition"
                >
                  View Profile →
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-2">
                <p className="text-text-muted text-xs font-bold leading-relaxed px-4">
                  Telemetry unlocked. Return to Map to crack the remaining vaults!
                </p>
                <button
                  onClick={() => navigate('/map')}
                  className="w-full bg-primary hover:bg-primary-light text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition"
                >
                  Return to Map →
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* --- RENDER VAULT ENTRY BRIEFING SCREEN --- */}
      {showEntryScreen && !showCompleteScreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#16143c] border border-primary-light/20 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center flex flex-col items-center gap-6"
        >
          {/* 96px centered gold icon */}
          <span className="text-[96px] leading-none text-gold filter drop-shadow animate-pulse select-none">
            {vault.icon}
          </span>

          <h2 className="text-3xl font-black text-white">
            {vault.name}
          </h2>

          <p className="text-xs font-bold text-indigo-200/80 leading-relaxed px-2">
            {vault.description}
          </p>

          <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-2 rounded-xl text-gold text-xs font-extrabold tracking-wide uppercase">
            <span>🔓</span> Lock status: UNLOCKED
          </div>

          <div className="bg-primary/40 border border-indigo-950 p-4 rounded-xl text-left border-l-4 border-l-gold">
            <span className="text-[10px] font-black uppercase tracking-widest text-gold block mb-1">
              Instructions
            </span>
            <p className="text-xs font-bold text-indigo-100/90 leading-relaxed">
              Answer each challenge. One correct answer per question.
            </p>
          </div>

          <button
            onClick={() => setShowEntryScreen(false)}
            className="w-full bg-gold hover:bg-amber-400 text-primary font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition duration-300"
          >
            Enter Vault →
          </button>
        </motion.div>
      )}

      {/* --- RENDER ACTIVE VAULT QUESTIONS FLOW --- */}
      {!showEntryScreen && !showCompleteScreen && (
        <div className="w-full max-w-xl flex flex-col gap-6">
          
          {/* Top Bar Navigation */}
          <div className="flex justify-between items-center px-1 text-white">
            <button
              onClick={handleBack}
              className="text-xs font-black hover:text-indigo-200 flex items-center gap-1 transition-colors"
            >
              ◀ Back
            </button>
            <span className="font-extrabold text-xs tracking-wider uppercase">{vault.name}</span>
            <span className="text-xs font-black text-gold">
              Q{currentQIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-2xl border border-indigo-100 shadow-2xl p-6 md:p-8 relative text-left min-h-[190px] flex flex-col justify-between">
            {/* Pill badge */}
            <div className="mb-4">
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-850 px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase">
                {getSectionBadgeText()}
              </span>
            </div>

            {/* Question Text */}
            <div className="flex-1 flex flex-col justify-center">
              {renderQuestionText(currentQuestion.text)}
            </div>

            {/* Lightbulb Note hint */}
            {currentQuestion.note && (
              <div className="mt-4 border-t border-indigo-50/50 pt-3 flex items-start gap-1.5 text-xs text-amber-600 font-extrabold italic pl-0.5">
                <span className="text-sm">💡</span>
                <span>{currentQuestion.note}</span>
              </div>
            )}
          </div>

          {/* 4 Stacked Option Buttons */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedLetter === opt.letter;
              
              return (
                <button
                  key={opt.letter}
                  onClick={() => handleSelectOption(opt.letter)}
                  className={`w-full min-h-[56px] flex items-center gap-4 p-4 rounded-xl border-2 text-left bg-white text-primary transition-all duration-200 ${
                    isSelected 
                      ? 'border-gold shadow-md scale-[1.01]' 
                      : 'border-gray-200 hover:border-primary-light'
                  }`}
                  style={{
                    transform: isSelected ? 'scale(1.01)' : 'none',
                    borderColor: isSelected ? 'var(--color-gold)' : ''
                  }}
                >
                  {/* Option letter circle label */}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors shrink-0 ${
                    isSelected 
                      ? 'bg-gold text-primary' 
                      : 'bg-slate-100 text-primary group-hover:bg-primary-light group-hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-gold)' : ''
                  }}>
                    {opt.letter}
                  </span>
                  
                  {/* Option text */}
                  <span className="text-xs font-bold leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Trigger footer button */}
          <div className="pt-2">
            <button
              onClick={handleNext}
              disabled={!selectedLetter}
              className={`w-full font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all duration-350 ${
                selectedLetter
                  ? 'bg-gold hover:bg-amber-400 text-primary cursor-pointer'
                  : 'bg-white/10 text-white/40 cursor-not-allowed shadow-none border border-white/10'
              }`}
              style={{
                backgroundColor: selectedLetter ? 'var(--color-gold)' : '',
                color: selectedLetter ? '#1E1B4B' : ''
              }}
            >
              {currentQIndex < questions.length - 1 ? 'Next Challenge →' : 'Complete Vault →'}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default VaultQuestions;
