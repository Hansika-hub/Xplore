// Psychometric Scoring and Profile Generation Utility Functions

import { partAQuestions, partBQuestions } from '../data/questions.js';

export const riasecMeta = {
  R: { name: "Realistic", label: "Hands-on & Technical", stream: "Science / Engineering", hex: "#B45309", careers: ["Mechanical Engineer", "Civil Engineer", "Robotics Designer", "Industrial Designer", "Electrician / Technician"] },
  I: { name: "Investigative", label: "Analytical & Scientific", stream: "Science / Research", hex: "#1D4ED8", careers: ["Research Scientist", "Doctor / Physician", "Data Analyst", "Software Engineer", "Environmental Scientist"] },
  A: { name: "Artistic", label: "Creative & Expressive", stream: "Arts / Humanities / Design", hex: "#6D28D9", careers: ["UX/UI Designer", "Journalist / Writer", "Film Director", "Architect", "Graphic Designer"] },
  S: { name: "Social", label: "People-oriented", stream: "Humanities / Education", hex: "#065F46", careers: ["Teacher / Professor", "Psychologist / Counselor", "Social Worker", "NGO Program Manager", "HR Professional"] },
  E: { name: "Enterprising", label: "Persuasive & Leadership", stream: "Commerce / Business", hex: "#B91C1C", careers: ["Entrepreneur", "Marketing Manager", "Business Analyst", "Sales Director", "Management Consultant"] },
  C: { name: "Conventional", label: "Organized & Detail-oriented", stream: "Commerce / Accounts", hex: "#0E7490", careers: ["Chartered Accountant", "Financial Analyst", "Operations Manager", "Auditor", "Bank Manager"] }
};

/**
 * Calculates raw scores, percentages, ranks, and Holland codes for Part A (Interests).
 * @param {Object} partAAnswers - { "1": 4, "2": 5, ... }
 */
export const scorePartA = (partAAnswers = {}) => {
  const scores = {};

  // Compute raw and percentage for each code
  Object.keys(riasecMeta).forEach((code) => {
    const questionsInCode = partAQuestions.filter(q => q.code === code);
    let rawSum = 0;
    
    questionsInCode.forEach((q) => {
      // Support both integer and string keys defensively
      const val = partAAnswers[q.id] !== undefined 
        ? partAAnswers[q.id] 
        : (partAAnswers[String(q.id)] || 0);
      rawSum += Number(val);
    });

    const percentage = Number(((rawSum / 35) * 100).toFixed(1));
    scores[code] = {
      raw: rawSum,
      percentage,
      ...riasecMeta[code]
    };
  });

  // Sort RIASEC codes by raw score descending to assign ranks
  const sortedCodes = Object.keys(riasecMeta).sort((a, b) => scores[b].raw - scores[a].raw);

  // Assign ranks and build ordered array
  const sortedTypes = sortedCodes.map((code, index) => {
    const rank = index + 1;
    scores[code].rank = rank;
    return {
      code,
      ...scores[code]
    };
  });

  const dominantCode = sortedCodes[0];
  const twoLetterCode = sortedCodes.slice(0, 2).join('');
  const threeLetterCode = sortedCodes.slice(0, 3).join('');

  return {
    scores,
    sortedTypes,
    dominantCode,
    twoLetterCode,
    threeLetterCode
  };
};

/**
 * Counts correct answers in each Section of Part B (Aptitude).
 * @param {Object} partBAnswers - { verbal: { V1: 'A' }, numerical: {}, logical: {} }
 */
export const scorePartB = (partBAnswers = {}) => {
  const verbalAnswers = partBAnswers.verbal || {};
  const numericalAnswers = partBAnswers.numerical || {};
  const logicalAnswers = partBAnswers.logical || {};

  const getCorrectCount = (section, answers) => {
    const questions = partBQuestions[section] || [];
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const verbalScore = getCorrectCount('verbal', verbalAnswers);
  const numericalScore = getCorrectCount('numerical', numericalAnswers);
  const logicalScore = getCorrectCount('logical', logicalAnswers);

  const verbalPct = Number(((verbalScore / 6) * 100).toFixed(1));
  const numericalPct = Number(((numericalScore / 6) * 100).toFixed(1));
  const logicalPct = Number(((logicalScore / 7) * 100).toFixed(1));

  // Determine strongest aptitude dimension
  const pcts = {
    verbal: verbalPct,
    numerical: numericalPct,
    logical: logicalPct
  };

  const strongestDimension = Object.entries(pcts)
    .sort((a, b) => b[1] - a[1])[0][0];

  return {
    verbal: { score: verbalScore, total: 6, percentage: verbalPct },
    numerical: { score: numericalScore, total: 6, percentage: numericalPct },
    logical: { score: logicalScore, total: 7, percentage: logicalPct },
    strongestDimension
  };
};

/**
 * Combines Interest and Aptitude scores to evaluate Convergence Signals.
 * @param {Object} partAScores - output from scorePartA
 * @param {Object} partBScores - output from scorePartB
 */
export const generateProfile = (partAScores, partBScores) => {
  const dom = partAScores.dominantCode;
  const v = partBScores.verbal.percentage;
  const n = partBScores.numerical.percentage;
  const l = partBScores.logical.percentage;

  let streamSignal = "";
  let confidence = "";
  let insight = "";

  if ((dom === "R" || dom === "I") && (n >= 50 && l >= 50)) {
    streamSignal = "Science & Engineering / Research";
    confidence = "Strong";
    insight = "Your hands-on or investigative instincts are matched by solid numerical and logical reasoning — a strong foundation for science and engineering paths.";
  } else if (dom === "A" && v >= 50) {
    streamSignal = "Arts, Humanities & Design";
    confidence = "Strong";
    insight = "Your creative orientation is backed by strong verbal reasoning — you're wired for fields where expression and communication are central.";
  } else if ((dom === "E" || dom === "C") && n >= 50) {
    streamSignal = "Commerce & Business";
    confidence = "Strong";
    insight = "Your drive for leadership or structure, combined with numerical reasoning, points clearly toward business and commerce paths.";
  } else if (dom === "S" && v >= 50) {
    streamSignal = "Humanities, Education & Social Work";
    confidence = "Strong";
    insight = "Your people-first orientation is supported by strong verbal ability — fields like education, psychology, and social impact are natural fits.";
  } else {
    streamSignal = "Cross-stream — explore further";
    confidence = "Exploratory";
    insight = "Your interest and aptitude patterns point in different directions — this often means you'd thrive in interdisciplinary fields. Read the detailed breakdown below.";
  }

  // Generate secondary insight based on strongest dimension
  const strongest = partBScores.strongestDimension;
  let secondaryInsight = "";
  if (strongest === 'verbal') {
    secondaryInsight = "Your strongest cognitive dimension is Verbal Reasoning, indicating excellent capacity for language-based logic, verbal comprehension, and structured communication.";
  } else if (strongest === 'numerical') {
    secondaryInsight = "Your strongest cognitive dimension is Numerical Reasoning, showing strong skill in parsing data, managing numbers, and quantitative logic.";
  } else if (strongest === 'logical') {
    secondaryInsight = "Your strongest cognitive dimension is Logical/Abstract Reasoning, pointing to a natural ability for pattern recognition, deduction, and abstract problem-solving.";
  }

  return {
    streamSignal,
    confidence,
    insight,
    secondaryInsight,
    topType: riasecMeta[dom],
    topCareers: riasecMeta[dom].careers
  };
};

/**
 * Converts array of explorer sessions into a standard CSV spreadsheet string.
 * @param {Array} sessions - Array of session storage states
 */
export const exportToCSV = (sessions = []) => {
  const headers = [
    "Name", "School", "Section", "Date", "AvatarId", 
    "DominantCode", "TwoLetterCode", "ThreeLetterCode", 
    "StreamSignal", "Confidence", "Verbal%", "Numerical%", "Logical%", 
    "R_Score", "I_Score", "A_Score", "S_Score", "E_Score", "C_Score"
  ];

  const rows = [headers.join(",")];

  sessions.forEach((session) => {
    const explorer = session.explorer || {};
    const pA = session.partAAnswers || {};
    const pB = session.partBAnswers || session.aptitudeAnswers || {};
    
    const scoredA = scorePartA(pA);
    const scoredB = scorePartB(pB);
    const profile = generateProfile(scoredA, scoredB);
    
    const dateStr = session.date || new Date().toLocaleDateString();

    const escapeCSV = (val) => {
      const str = String(val === null || val === undefined ? '' : val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const row = [
      escapeCSV(explorer.name),
      escapeCSV(explorer.school),
      escapeCSV(explorer.section),
      escapeCSV(dateStr),
      escapeCSV(explorer.avatarId),
      escapeCSV(scoredA.dominantCode),
      escapeCSV(scoredA.twoLetterCode),
      escapeCSV(scoredA.threeLetterCode),
      escapeCSV(profile.streamSignal),
      escapeCSV(profile.confidence),
      escapeCSV(`${scoredB.verbal.percentage}%`),
      escapeCSV(`${scoredB.numerical.percentage}%`),
      escapeCSV(`${scoredB.logical.percentage}%`),
      scoredA.scores.R.raw,
      scoredA.scores.I.raw,
      scoredA.scores.A.raw,
      scoredA.scores.S.raw,
      scoredA.scores.E.raw,
      scoredA.scores.C.raw
    ];

    rows.push(row.join(","));
  });

  return rows.join("\n");
};
