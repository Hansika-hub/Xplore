import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext(null);

const DEFAULT_STATE = {
  explorer: {
    name: '',
    school: '',
    section: '',
    avatarId: '',
    grade: '9'
  },
  partAAnswers: {}, // questionId -> score (1-5)
  aptitudeAnswers: {}, // { verbal: { V1: 'A' }, numerical: {}, logical: {} }
  completedZones: [], // array of RIASEC codes complete
  completedVaults: [], // array of vault section IDs complete
  xpTotal: 0,
  isComplete: false
};

export const AssessmentProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('xplore_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed
        };
      }
    } catch (e) {
      console.error('Failed to load session from localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('xplore_session', JSON.stringify(state));

    const allZonesDone = state.completedZones && state.completedZones.length === 6;
    const allVaultsDone = state.completedVaults && state.completedVaults.length === 3;
    
    if (allZonesDone && allVaultsDone && !state.isComplete && state.explorer.name) {
      setState((prev) => {
        if (prev.isComplete) return prev;
        
        const timestamp = Date.now();
        const cleanName = prev.explorer.name.trim().replace(/[^a-zA-Z0-9]/g, '_');
        const uniqueKey = `xplore_session_${timestamp}_${cleanName}`;
        
        const completedData = {
          ...prev,
          isComplete: true,
          date: new Date().toLocaleDateString()
        };
        
        localStorage.setItem(uniqueKey, JSON.stringify(completedData));
        return {
          ...prev,
          isComplete: true
        };
      });
    }
  }, [state]);

  const updateExplorer = (explorerData) => {
    setState((prev) => ({
      ...prev,
      explorer: {
        ...prev.explorer,
        ...explorerData
      }
    }));
  };

  const submitPartA = (answers) => {
    setState((prev) => {
      const newPartA = { ...prev.partAAnswers, ...answers };
      const freshXp = calculateXpGain(newPartA, prev.aptitudeAnswers, prev.completedZones);
      return {
        ...prev,
        partAAnswers: newPartA,
        xpTotal: freshXp
      };
    });
  };

  const completeZone = (zoneCode) => {
    setState((prev) => {
      const completed = prev.completedZones.includes(zoneCode)
        ? prev.completedZones
        : [...prev.completedZones, zoneCode];
      
      const isAllComplete = completed.length >= 6;
      const freshXp = calculateXpGain(prev.partAAnswers, prev.aptitudeAnswers, completed);
      return {
        ...prev,
        completedZones: completed,
        isComplete: isAllComplete,
        xpTotal: freshXp
      };
    });
  };

  const submitAptitude = (section, answers) => {
    setState((prev) => {
      const newAptitude = {
        ...prev.aptitudeAnswers,
        [section]: {
          ...(prev.aptitudeAnswers[section] || {}),
          ...answers
        }
      };
      
      const answeredInSecCount = Object.keys(newAptitude[section] || {}).length;
      const required = section === 'logical' ? 7 : 6;
      let completedVaults = prev.completedVaults || [];
      if (answeredInSecCount >= required && !completedVaults.includes(section)) {
        completedVaults = [...completedVaults, section];
      }
      
      const freshXp = calculateXpGain(prev.partAAnswers, newAptitude, prev.completedZones, completedVaults);
      return {
        ...prev,
        aptitudeAnswers: newAptitude,
        completedVaults,
        xpTotal: freshXp
      };
    });
  };

  const resetSession = () => {
    setState(DEFAULT_STATE);
    localStorage.removeItem('xplore_session');
  };

  const calculateXpGain = (partA, aptitude, completedZonesList, completedVaultsList) => {
    const countA = Object.keys(partA || {}).length;
    const textZonesCount = completedZonesList ? completedZonesList.length : 0;
    
    let countApt = 0;
    if (aptitude) {
      Object.keys(aptitude).forEach((sec) => {
        countApt += Object.keys(aptitude[sec] || {}).length;
      });
    }

    const textVaultsCount = completedVaultsList ? completedVaultsList.length : 0;
    
    return (countA * 10) + (textZonesCount * 350) + (countApt * 10) + (textVaultsCount * 300);
  };

  useEffect(() => {
    const freshXp = calculateXpGain(state.partAAnswers, state.aptitudeAnswers, state.completedZones, state.completedVaults);
    if (freshXp !== state.xpTotal) {
      setState((prev) => ({ ...prev, xpTotal: freshXp }));
    }
  }, []);

  return (
    <AssessmentContext.Provider value={{
      ...state,
      updateExplorer,
      submitPartA,
      completeZone,
      submitAptitude,
      resetSession
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
