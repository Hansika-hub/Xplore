import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { zones } from '../data/zones.js';
import { partAQuestions } from '../data/questions.js';
import { motion, AnimatePresence } from 'framer-motion';

const ZoneQuestions = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { partAAnswers, completedZones, submitPartA, completeZone } = useAssessment();

  const zone = zones.find(z => z.code === code);
  const questions = partAQuestions.filter(q => q.code === code);
  const isAlreadyCompleted = completedZones.includes(code);

  // Core navigation states
  const [showEntryScreen, setShowEntryScreen] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);

  // Local answers tracking during active session
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!zone || questions.length === 0) {
      navigate('/map');
    }
  }, [zone, questions, navigate]);

  // Display return to map button after 1 second on completion
  useEffect(() => {
    if (showCompleteScreen) {
      const timer = setTimeout(() => {
        setShowReturnButton(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showCompleteScreen]);

  if (!zone || questions.length === 0) return null;

  const currentQuestion = questions[currentQIndex];
  const currentAnswer = answers[currentQuestion?.id] || partAAnswers[currentQuestion?.id] || null;

  const handleSelectOrb = (rating) => {
    if (isAlreadyCompleted) return; // Read-only state

    const qId = currentQuestion.id;
    const updatedAnswers = { ...answers, [qId]: rating };
    setAnswers(updatedAnswers);

    // Save answer to global context immediately
    submitPartA({ [qId]: rating });

    // Auto-advance after 400ms delay
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        // Complete the zone at the end of the questions
        completeZone(code);
        setShowCompleteScreen(true);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    } else {
      navigate('/map');
    }
  };

  // Helper to render Orb rows
  const OrbRating = ({ value, onChange, readOnly = false, activeColor, hexColor }) => {
    const [hoveredIdx, setHoveredIdx] = useState(null);

    return (
      <div className="flex flex-col items-center gap-3 select-none">
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3, 4, 5].map((index) => {
            const isFilled = value !== null && index <= value;
            const isHoveredGlow = hoveredIdx !== null && index <= hoveredIdx;

            return (
              <div key={index} className="relative">
                <motion.button
                  type="button"
                  disabled={readOnly}
                  onMouseEnter={() => !readOnly && setHoveredIdx(index)}
                  onMouseLeave={() => !readOnly && setHoveredIdx(null)}
                  onClick={() => onChange(index)}
                  className={`w-[52px] h-[52px] md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    readOnly ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  style={{
                    borderColor: isFilled ? hexColor : '#D1D5DB',
                    backgroundColor: isFilled ? hexColor : 'transparent',
                    color: isFilled ? '#FFFFFF' : '#6B7280'
                  }}
                  animate={isFilled ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  whileHover={!readOnly ? {
                    boxShadow: `0 0 14px ${hexColor}60`,
                    borderColor: hexColor
                  } : {}}
                >
                  {index}
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* Labels */}
        <div className="w-full flex justify-between text-[11px] font-black text-text-muted px-2 uppercase tracking-wide">
          <span className="text-left w-20">Not me</span>
          <span className="text-center">Somewhat</span>
          <span className="text-right w-24">Very much me</span>
        </div>
      </div>
    );
  };

  // --- RENDERING ROUTINES ---

  // Already Completed Profile Read-Only Mode
  if (isAlreadyCompleted) {
    return (
      <div className="flex-1 bg-surface py-6 px-4">
        <div className="max-w-xl w-full mx-auto flex flex-col gap-6">
          
          {/* Banner notification */}
          <div className="w-full bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl text-center text-emerald-800 font-bold text-xs">
            ✨ You've already completed this zone. Your answers are saved.
          </div>

          <div className="bg-card border border-indigo-50 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-indigo-50/50 pb-4">
              <span className="text-4xl">{zone.icon}</span>
              <div className="text-left">
                <h2 className="text-lg font-black text-primary">{zone.name} Summary</h2>
                <p className="text-[10px] font-extrabold uppercase tracking-wide mt-0.5 text-emerald-700">
                  Sector {zone.code} &middot; Stream: {zone.stream}
                </p>
              </div>
            </div>

            {/* Render all 7 questions in order */}
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const savedVal = partAAnswers[q.id] || null;
                return (
                  <div key={q.id} className="text-left border-b border-indigo-50/30 pb-5 last:border-0 last:pb-0">
                    <p className="text-[10px] font-black text-text-muted uppercase mb-1.5">Statement {idx + 1} of 7</p>
                    <h4 className="text-xs font-bold text-primary mb-3.5 leading-relaxed">{q.text}</h4>
                    <div className="opacity-75 max-w-sm">
                      <OrbRating 
                        value={savedVal} 
                        readOnly={true} 
                        hexColor={zone.hex} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back button */}
            <div className="border-t border-indigo-50/50 pt-5 mt-4">
              <button
                onClick={() => navigate('/map')}
                className="w-full bg-primary hover:bg-primary-light text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition"
              >
                Back to Map
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Zone Completed Successful Page
  if (showCompleteScreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center py-12 px-6 transition-colors duration-500"
        style={{ backgroundColor: zone.bgLight }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md flex flex-col items-center gap-6"
        >
          {/* Draw checkmark in svg */}
          <div className="w-24 h-24 rounded-full bg-card shadow-lg flex items-center justify-center p-2 mb-2">
            <svg className="w-16 h-16" viewBox="0 0 50 50">
              <motion.path
                d="M 12,25 L 22,35 L 38,15"
                fill="none"
                stroke={zone.hex}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
          </div>

          <h2 className="text-3xl font-black" style={{ color: zone.hex }}>
            Zone Complete!
          </h2>

          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="bg-gradient-to-r from-amber-500 to-gold border border-gold/30 px-6 py-3 rounded-full text-white text-sm font-black shadow-md"
          >
            +{zone.xpReward} XP Badge Secured
          </motion.div>

          <p className="text-text-muted text-xs font-bold leading-relaxed px-4">
            Congratulations Explorer! This zone maps to: <span className="font-extrabold text-primary underline">{zone.stream}</span>. Your metrics have been logged into telemetry database.
          </p>

          <AnimatePresence>
            {showReturnButton && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate('/map')}
                className="w-full mt-4 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all duration-300"
                style={{ backgroundColor: zone.hex }}
              >
                Return to Map →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Zone Entrance Briefing Page
  if (showEntryScreen) {
    return (
      <div 
        className="fixed inset-0 z-40 flex flex-col items-center justify-center py-12 px-6 transition-colors duration-500"
        style={{ backgroundColor: zone.bgLight }}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="bg-card border border-indigo-50 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center flex flex-col items-center gap-6"
        >
          {/* 96px Large Emoji */}
          <span className="text-[96px] leading-none select-none filter drop-shadow animate-bounce" style={{ animationDuration: '4s' }}>
            {zone.icon}
          </span>

          <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color: zone.hex }}>
            {zone.name}
          </h2>

          <p className="text-xs font-semibold text-text-muted leading-relaxed">
            {zone.flavor}
          </p>

          <div className="bg-surface border border-indigo-100 p-4 rounded-xl text-left border-l-4" style={{ borderLeftColor: zone.hex }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">
              Mission Briefing
            </span>
            <p className="text-xs font-bold text-text-muted leading-relaxed">
              You will see 7 statements. For each one, charge the orbs to show how much it sounds like you.
            </p>
          </div>

          <button
            onClick={() => setShowEntryScreen(false)}
            className="w-full text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all duration-300"
            style={{ backgroundColor: zone.hex }}
          >
            Begin Zone →
          </button>
        </motion.div>
      </div>
    );
  }

  // Normal Question Wizard View
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-xl flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center px-1">
          <button
            onClick={handleBack}
            className="text-xs font-black text-primary/75 hover:text-primary flex items-center gap-1 transition-colors"
          >
            ◀ Back
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xl">{zone.icon}</span>
            <span className="font-extrabold text-xs text-primary uppercase tracking-wide">{zone.name}</span>
          </div>

          <span className="text-xs font-black text-text-muted">
            {currentQIndex + 1} / 7
          </span>
        </div>

        {/* Thin progress bar */}
        <div className="w-full bg-gray-200/50 h-1.5 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${((currentQIndex + 1) / questions.length) * 100}%`,
              backgroundColor: zone.hex
            }}
          />
        </div>

        {/* Statement Card with layout slide */}
        <div className="relative bg-card rounded-2xl border border-indigo-150/40 shadow-xl p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[220px]">
          <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: zone.hex }} />
          
          <div className="text-left flex-1 flex flex-col justify-center">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">
              Statement {currentQIndex + 1} of 7
            </p>
            <h2 className="text-lg md:text-xl font-bold text-primary leading-relaxed font-sans">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        {/* Orb Rating Selection Panel */}
        <div className="bg-card border border-indigo-50 shadow-md rounded-2xl p-6 md:p-8">
          <OrbRating 
            value={currentAnswer} 
            onChange={handleSelectOrb} 
            hexColor={zone.hex}
          />
        </div>

      </div>
    </div>
  );
};

export default ZoneQuestions;
