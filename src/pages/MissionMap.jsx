import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { zones, vaults } from '../data/zones.js';
import { partAQuestions } from '../data/questions.js';
import { avatars } from '../data/assessmentData.js';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Animated XP Counter component
const AnimatedXPCounter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return controls.stop;
  }, [value]);

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-gold/20 border border-gold/40 px-4 py-2 rounded-full shadow-inner">
      <span className="text-xl animate-spin" style={{ animationDuration: '4s' }}>🪙</span>
      <span className="font-extrabold text-sm text-gold tracking-wide">
        {displayValue.toLocaleString()} XP
      </span>
    </div>
  );
};

const MissionMap = () => {
  const navigate = useNavigate();
  const { explorer, completedZones, partAAnswers, aptitudeAnswers, xpTotal } = useAssessment();

  // Find user avatar details
  const currentAvatar = avatars.find(av => av.id === explorer.avatarId);
  const avatarEmoji = currentAvatar ? currentAvatar.emoji : '🚀';

  // Check if all 6 zones are completed
  const allZonesDone = completedZones.length >= 6;

  // Check completion state of aptitude vaults (each has questions in questions.js)
  const isVaultComplete = (vaultId) => {
    const answers = aptitudeAnswers[vaultId];
    return answers && Object.keys(answers).length >= 6; // 6 questions per verbal/numerical vault, 7 for logical
  };

  const isLogicalVaultComplete = () => {
    const answers = aptitudeAnswers['logical'];
    return answers && Object.keys(answers).length >= 7;
  };

  const isAnyVaultIncomplete = () => {
    return !isVaultComplete('verbal') || !isVaultComplete('numerical') || !isLogicalVaultComplete();
  };

  const allMissionsDone = allZonesDone && !isAnyVaultIncomplete();

  // Calculate questions answered for each zone (7 questions total per zone in the 42 bank)
  const getZoneProgressCount = (zoneCode) => {
    const questionsInZone = partAQuestions.filter(q => q.code === zoneCode);
    let answered = 0;
    questionsInZone.forEach(q => {
      if (partAAnswers[q.id] !== undefined) {
        answered++;
      }
    });
    return answered;
  };

  return (
    <div className="flex-1 flex flex-col bg-surface select-none pb-12">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 w-full bg-card shadow-sm border-b border-indigo-50/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl filter drop-shadow">{avatarEmoji}</span>
          <div>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-wider leading-none">Explorer</p>
            <h2 className="text-sm font-extrabold text-primary mt-0.5">{explorer.name || 'Anonymous Cadet'}</h2>
          </div>
        </div>
        
        <AnimatedXPCounter value={xpTotal} />
      </div>

      {/* Hero Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-2">
          Mission Map
        </h1>
        <p className="text-text-muted text-sm font-semibold">
          Complete all zones to unlock your Explorer Profile
        </p>
      </div>

      {/* ZONE GRID */}
      <div className="max-w-2xl w-full mx-auto px-4 flex flex-col gap-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 mb-1 pl-1">
          Sector Zones
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((zone) => {
            const isCompleted = completedZones.includes(zone.code);
            const answeredCount = getZoneProgressCount(zone.code);
            const totalQuestions = 7;
            const progressPercent = (answeredCount / totalQuestions) * 100;

            return (
              <motion.div
                key={zone.code}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => navigate(`/zone/${zone.code}`)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between h-40 relative overflow-hidden group ${
                  isCompleted
                    ? 'border-2 border-solid shadow-md shadow-indigo-50/20'
                    : 'bg-card border-2 border-gray-200/80 hover:border-indigo-150 hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: isCompleted ? zone.bgLight : '#FFFFFF',
                  borderColor: isCompleted ? zone.hex : '#E5E7EB'
                }}
              >
                {/* Completed Hover Overlay */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-primary/95 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                      Review Completed Sector ✓
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/* Circle icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner shrink-0"
                      style={{ backgroundColor: zone.bgLight, color: zone.hex }}
                    >
                      {zone.icon}
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm text-primary">{zone.name}</h4>
                      <p className="text-[10px] text-text-muted font-bold mt-0.5">{zone.label}</p>
                    </div>
                  </div>

                  {/* Lock / Complete status badge */}
                  <div>
                    {isCompleted ? (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: zone.hex, backgroundColor: zone.bgLight }}>
                          COMPLETE ✓
                        </span>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded">
                          +{zone.xpReward} XP
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg filter grayscale opacity-40">🔒</span>
                    )}
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-text-muted mb-1.5">
                    <span>PROGRESS</span>
                    <span>{answeredCount} / {totalQuestions} Qs</span>
                  </div>
                  <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${progressPercent}%`,
                        backgroundColor: isCompleted ? zone.hex : '#9CA3AF'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* APTITUDE VAULTS */}
      <div className="max-w-2xl w-full mx-auto px-4 mt-8 flex flex-col gap-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary/80 mb-1 pl-1">
          Aptitude Vaults
        </h3>

        {!allZonesDone ? (
          // Locked notification
          <div className="bg-card border-2 border-dashed border-gray-250 p-6 rounded-2xl text-center text-text-muted text-sm font-semibold">
            🔒 Complete all 6 zones to unlock the Aptitude Vaults
          </div>
        ) : (
          // Unlocked vault cards grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vaults.map((vault) => {
              const isDone = isVaultComplete(vault.id) || (vault.id === 'logical' && isLogicalVaultComplete());
              
              return (
                <motion.div
                  key={vault.id}
                  whileHover={{ y: -3 }}
                  onClick={() => navigate(`/vault/${vault.id}`)}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition-all flex flex-col justify-between h-40 bg-card ${
                    isDone 
                      ? 'border-emerald-500 shadow-sm'
                      : 'border-amber-400 animate-pulse shadow-md hover:shadow-lg'
                  }`}
                  style={{ 
                    boxShadow: !isDone ? '0 0 12px rgba(245, 158, 11, 0.25)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{vault.icon}</span>
                    {isDone ? (
                      <span className="text-emerald-600 font-extrabold text-xs">✓ Done</span>
                    ) : (
                      <span className="text-amber-600 font-extrabold text-xs">Unlocked</span>
                    )}
                  </div>
                  
                  <div className="text-left mt-2">
                    <h4 className="font-extrabold text-xs text-primary">{vault.name}</h4>
                    <p className="text-[10px] text-text-muted font-bold mt-1 leading-tight">{vault.description}</p>
                  </div>

                  <div className="text-[9px] font-black text-amber-600 tracking-wider mt-2 pt-2 border-t border-indigo-50/50">
                    +{vault.xpReward} XP Reward
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Action Submit Button */}
      <div className="max-w-2xl w-full mx-auto px-4 mt-10">
        <div className="relative group flex justify-center">
          {/* Tooltip trigger wrapper */}
          {!allMissionsDone && (
            <div className="absolute bottom-full mb-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow">
              ⚠️ Complete all missions first
            </div>
          )}
          
          <button
            onClick={() => allMissionsDone && navigate('/report')}
            disabled={!allMissionsDone}
            className={`w-full font-extrabold text-sm tracking-wider uppercase py-4 rounded-xl shadow-lg transition-all duration-350 ${
              allMissionsDone
                ? 'bg-primary hover:bg-primary-light text-white cursor-pointer hover:scale-[1.01]'
                : 'bg-primary/20 text-white/50 cursor-not-allowed shadow-none'
            }`}
          >
            View My Explorer Profile →
          </button>
        </div>
      </div>

    </div>
  );
};

export default MissionMap;
