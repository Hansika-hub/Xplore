import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { avatars } from '../data/assessmentData.js';
import { motion } from 'framer-motion';

const AvatarSelect = () => {
  const { explorer, updateExplorer } = useAssessment();
  const [selectedId, setSelectedId] = useState(explorer.avatarId || '');
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    updateExplorer({ avatarId: selectedId });
    navigate('/map');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-primary mb-2">
          Choose Your Explorer
        </h1>
        <p className="text-text-muted text-sm font-semibold">
          Pick the one that feels most like you
        </p>
      </div>

      {/* 3x2 Grid of cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full mb-8">
        {avatars.map((av) => {
          const isSelected = selectedId === av.id;
          return (
            <motion.button
              key={av.id}
              onClick={() => handleSelect(av.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 shadow-sm transition-all duration-300 relative ${
                isSelected
                  ? 'border-primary bg-indigo-50/30'
                  : 'border-indigo-100/60 bg-card hover:border-indigo-150 hover:shadow-md'
              }`}
              style={{ borderWidth: isSelected ? '4px' : '2px' }}
            >
              {/* Checkmark badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-black shadow">
                  ✓
                </div>
              )}

              {/* Large Emoji */}
              <span 
                className="text-[80px] leading-none mb-4 filter drop-shadow block" 
                style={{ fontSize: '80px', height: '80px' }}
              >
                {av.emoji}
              </span>

              {/* Name */}
              <span className={`text-xs font-black uppercase tracking-wider ${
                isSelected ? 'text-primary' : 'text-text-muted'
              }`}>
                {av.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Confirm Action */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3.5 border border-indigo-150 hover:bg-white text-primary text-xs font-extrabold rounded-xl transition"
        >
          Back
        </button>
        <motion.button
          whileHover={selectedId ? { scale: 1.02 } : {}}
          whileTap={selectedId ? { scale: 0.98 } : {}}
          onClick={handleConfirm}
          disabled={!selectedId}
          className={`px-12 py-3.5 font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all duration-350 ${
            selectedId
              ? 'bg-primary hover:bg-primary-light text-white cursor-pointer'
              : 'bg-primary/20 text-white/50 cursor-not-allowed shadow-none'
          }`}
        >
          Start Your Mission →
        </motion.button>
      </div>
    </div>
  );
};

export default AvatarSelect;
