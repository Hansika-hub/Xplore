import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { zones, vaults } from '../data/zones.js';
import { avatars, HollandDescriptions } from '../data/assessmentData.js';
import { scorePartA, scorePartB, generateProfile, riasecMeta } from '../utils/scoring.js';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Career descriptions dictionary to display under suggested career cards
const careerDescriptions = {
  "Mechanical Engineer": "Design, analyze, and manufacture mechanical systems and engines.",
  "Civil Engineer": "Plan and supervise construction projects, highways, bridges, and dams.",
  "Robotics Designer": "Create autonomous systems, smart agents, and mechanical limbs.",
  "Industrial Designer": "Develop concepts and styling for physical consumer products.",
  "Electrician / Technician": "Install, test, and repair electrical grids and equipment.",
  "Research Scientist": "Formulate hypotheses, run lab tests, and advance human knowledge.",
  "Doctor / Physician": "Diagnose, treat, and improve patient health and wellness.",
  "Data Analyst": "Parse complex statistics to discover actionable insights.",
  "Software Engineer": "Design algorithms and engineer scalable software architectures.",
  "Environmental Scientist": "Study ecosystems and build sustainable planet protection systems.",
  "UX/UI Designer": "Shape human-computer interactions and craft beautiful digital interfaces.",
  "Journalist / Writer": "Investigate stories and publish engaging copy and narratives.",
  "Film Director": "Translate scripts into visual scenes and lead movie productions.",
  "Architect": "Design functional buildings, blueprints, and spatial layouts.",
  "Graphic Designer": "Create visual branding, typography, and marketing assets.",
  "Teacher / Professor": "Instruct students, deliver coursework, and shape future minds.",
  "Psychologist / Counselor": "Analyze behavioral patterns and support personal mental health.",
  "Social Worker": "Assist vulnerable communities and coordinate support services.",
  "NGO Program Manager": "Direct non-profit campaigns and manage community outreach.",
  "HR Professional": "Recruit top talent and coordinate workplace culture.",
  "Entrepreneur": "Launch innovative ventures, pitch deals, and drive market growth.",
  "Marketing Manager": "Develop promotional strategies and scale product exposure.",
  "Business Analyst": "Evaluate operations, identify efficiencies, and advise executive teams.",
  "Sales Director": "Lead client acquisition, hit commercial targets, and negotiate deals.",
  "Management Consultant": "Advise corporations on scale, structure, and productivity bottlenecks.",
  "Chartered Accountant": "Prepare financial statements, audit books, and consult on tax laws.",
  "Financial Analyst": "Analyze investments, evaluate market risks, and project budgets.",
  "Operations Manager": "Supervise logistics, coordinate teams, and optimize workflows.",
  "Auditor": "Verify compliance, inspect registers, and identify accounting fraud.",
  "Bank Manager": "Oversee branch activities, check loan approvals, and lead personal bankers."
};

const Report = () => {
  const navigate = useNavigate();
  const { explorer, partAAnswers, aptitudeAnswers, xpTotal, resetSession } = useAssessment();
  const reportRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [savingCard, setSavingCard] = useState(false);
  const [savingPDF, setSavingPDF] = useState(false);

  // Show a 2-second loading screen on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Compute psychometric scores using scoring.js
  const scoredA = scorePartA(partAAnswers);
  const scoredB = scorePartB(aptitudeAnswers);
  const profile = generateProfile(scoredA, scoredB);

  const topThreeCodes = [
    scoredA.sortedTypes[0]?.code,
    scoredA.sortedTypes[1]?.code,
    scoredA.sortedTypes[2]?.code
  ].filter(Boolean);

  const primaryCode = scoredA.dominantCode;
  const primaryZone = zones.find(z => z.code === primaryCode);
  
  const currentAvatar = avatars.find(av => av.id === explorer.avatarId);
  const avatarEmoji = currentAvatar ? currentAvatar.emoji : '🚀';

  // Helper to determine aptitude strength label
  const getStrengthLabel = (percentage) => {
    if (percentage >= 70) return { label: 'Strong', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
    if (percentage >= 40) return { label: 'Developing', color: 'text-amber-700 bg-amber-50 border-amber-100' };
    return { label: 'Emerging', color: 'text-rose-700 bg-rose-50 border-rose-100' };
  };

  // 1. Download ID Card as PNG
  const handleDownloadCard = () => {
    const cardElement = document.getElementById('explorer-card');
    if (!cardElement) return;
    setSavingCard(true);

    html2canvas(cardElement, {
      scale: 3, // Premium resolution
      useCORS: true,
      backgroundColor: null // transparent
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${explorer.name.replace(/\s+/g, '_')}_XploreCard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setSavingCard(false);
    }).catch((err) => {
      console.error('Error generating card PNG:', err);
      setSavingCard(false);
    });
  };

  // 2. Download Full Report as PDF
  const handleDownloadPDF = () => {
    setSavingPDF(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const marginX = 20;
      let currentY = 20;
      
      const primaryColor = [30, 27, 75]; // #1E1B4B
      const goldColor = [245, 158, 11]; // #F59E0B
      const grayColor = [107, 114, 128]; // #6B7280

      // PDF Title Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("XPLORE CAREER DISCOVERY REPORT", marginX, currentY);
      currentY += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      pdf.text(`Cadet: ${explorer.name}   |   School: ${explorer.school}   |   Section: ${explorer.section} (Grade 9)`, marginX, currentY);
      currentY += 4;
      pdf.text(`Date: ${new Date().toLocaleDateString()}   |   Level: ${xpTotal} XP`, marginX, currentY);
      currentY += 8;

      pdf.setDrawColor(229, 231, 235);
      pdf.line(marginX, currentY, 190, currentY);
      currentY += 10;

      // 1. Profile Summary
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("1. Explorer Profile Summary", marginX, currentY);
      currentY += 6;

      pdf.setFontSize(10);
      pdf.setTextColor(30, 30, 30);
      pdf.text(`Holland Code Profile: ${topThreeCodes.join('-')}`, marginX, currentY);
      currentY += 5;

      const typeNames = topThreeCodes.map(c => riasecMeta[c].name).join(' - ');
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      pdf.text(`(${typeNames})`, marginX, currentY);
      currentY += 8;

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      pdf.text(`Stream Signal: ${profile.streamSignal}`, marginX, currentY);
      currentY += 5;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      pdf.text(`Confidence Strength: ${profile.confidence}`, marginX, currentY);
      currentY += 8;

      // Insight background block
      pdf.setFillColor(245, 243, 255);
      pdf.rect(marginX, currentY, 170, 22, 'F');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      const splitInsight = pdf.splitTextToSize(profile.insight, 160);
      pdf.text(splitInsight, marginX + 4, currentY + 5);
      currentY += 28;

      // 2. Interest Profile
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("2. Interest Profile Breakdown", marginX, currentY);
      currentY += 8;

      scoredA.sortedTypes.forEach((type) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(30, 30, 30);
        pdf.text(`${type.name} (${type.code})`, marginX, currentY + 3);

        // Bar container
        pdf.setFillColor(243, 244, 246);
        pdf.rect(65, currentY, 80, 4, 'F');

        // Bar fill
        const fillWidth = (type.raw / 35) * 80;
        const hex = type.hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        pdf.setFillColor(r, g, b);
        pdf.rect(65, currentY, fillWidth, 4, 'F');

        // Percentage text
        pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        pdf.text(`${type.raw} / 35 (${type.percentage}%)`, 150, currentY + 3);
        currentY += 8;
      });
      currentY += 6;

      // 3. Aptitude Profile
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("3. Aptitude Profile Breakdown", marginX, currentY);
      currentY += 8;

      const aptSections = [
        { label: "Verbal Reasoning", data: scoredB.verbal },
        { label: "Numerical Reasoning", data: scoredB.numerical },
        { label: "Logical Reasoning", data: scoredB.logical }
      ];

      aptSections.forEach((sec) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(30, 30, 30);
        pdf.text(sec.label, marginX, currentY + 3);

        pdf.setFillColor(243, 244, 246);
        pdf.rect(65, currentY, 80, 4, 'F');

        const fillWidth = (sec.data.score / sec.data.total) * 80;
        pdf.setFillColor(67, 56, 202); // primary light
        pdf.rect(65, currentY, fillWidth, 4, 'F');

        pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        pdf.text(`${sec.data.score} / ${sec.data.total} (${sec.data.percentage}%)`, 150, currentY + 3);
        currentY += 8;
      });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      pdf.text(`Aptitude Insight: ${profile.secondaryInsight}`, marginX, currentY + 3);
      currentY += 15;

      // 4. Careers
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text("4. Recommended Career Directions", marginX, currentY);
      currentY += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Based on your dominant interest type (${riasecMeta[primaryCode].name}):`, marginX, currentY);
      currentY += 6;

      riasecMeta[primaryCode].careers.slice(0, 5).forEach((career) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(30, 30, 30);
        pdf.text(`• ${career}`, marginX, currentY);
        
        const desc = careerDescriptions[career] || "";
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        pdf.text(`  ${desc}`, marginX, currentY + 4);
        currentY += 9;
      });

      // Footer guidance
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      pdf.text("Xplore Career Discovery Program · This report is for guidance only.", marginX, 285);

      pdf.save(`${explorer.name.replace(/\s+/g, '_')}_XploreReport.pdf`);
    } catch (e) {
      console.error('Error generating PDF:', e);
      alert('Error exporting PDF document.');
    } finally {
      setSavingPDF(false);
    }
  };

  const handleStartOver = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete your profile details and restart?')) {
      resetSession();
      navigate('/');
    }
  };

  // --- RENDERING LOADING RING ORB OVERLAY ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1E1B4B] flex flex-col justify-center items-center gap-6 text-white select-none">
        {/* Spinning gold ring */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-4 border-gold/20 border-t-gold rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-100 animate-pulse font-sans">
          Generating your Explorer Profile...
        </p>
      </div>
    );
  }

  // --- RENDERING THE FULL PREMIUM REPORT ---
  return (
    <div className="flex-1 bg-white max-w-2xl mx-auto rounded-3xl shadow-xl p-6 md:p-10 text-left flex flex-col gap-10 select-none">

      {/* --- SECTION 1: HERO IDENTIFICATION CARD --- */}
      <div 
        id="explorer-card" 
        className="w-full bg-gradient-to-br from-[#1E1B4B] to-[#312E81] rounded-3xl p-5 md:p-8 relative overflow-hidden shadow-xl text-white flex flex-col gap-6"
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/10 rounded-full filter blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-400/5 rounded-full filter blur-2xl" />

        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-300">
          <span>XPLORE</span>
          <span>Explorer Identity Card</span>
        </div>

        <div className="flex items-center gap-4 md:gap-6 mt-2 border-b border-white/10 pb-6">
          {/* Avatar */}
          <span className="text-4xl p-3 md:text-6xl md:p-4 bg-white/5 border border-white/10 rounded-2xl shadow-inner select-none filter drop-shadow">
            {avatarEmoji}
          </span>
          
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {explorer.name}
            </h2>
            <p className="text-xs text-indigo-200 font-bold mt-1.5 uppercase tracking-wide">
              🏫 {explorer.school} &middot; Section {explorer.section}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
          <div className="text-left">
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
              Holland Code Profile
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-gold mt-1 tracking-wider leading-none">
              {topThreeCodes.join('')}
            </h1>
            <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider mt-2 pl-0.5">
              {topThreeCodes.map(c => riasecMeta[c].name).join(' · ')}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-left self-start sm:self-auto">
            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block leading-none mb-1">
              Stream Signal
            </span>
            <span className="text-xs font-black text-gold">
              {profile.streamSignal}
            </span>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: STREAM SIGNAL SUMMARY --- */}
      <div className="text-left border-b border-indigo-50/50 pb-6">
        <h3 className="text-lg font-black text-primary mb-3">Your Stream Signal</h3>
        
        <div className="flex flex-wrap gap-2.5 mb-4">
          {/* Stream pill */}
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border ${
            profile.streamSignal.includes('Science') 
              ? 'bg-blue-50 text-blue-800 border-blue-100'
              : profile.streamSignal.includes('Arts')
              ? 'bg-purple-50 text-purple-800 border-purple-100'
              : profile.streamSignal.includes('Commerce')
              ? 'bg-rose-50 text-rose-800 border-rose-100'
              : profile.streamSignal.includes('Humanities')
              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
              : 'bg-slate-50 text-slate-800 border-slate-100'
          }`}>
            {profile.streamSignal}
          </span>

          {/* Confidence Badge */}
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border ${
            profile.confidence === 'Strong'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
              : 'bg-amber-50 text-amber-800 border-amber-100'
          }`}>
            Signal Strength: {profile.confidence}
          </span>
        </div>

        <p className="text-xs md:text-sm font-bold text-text-muted leading-relaxed">
          {profile.insight}
        </p>
      </div>

      {/* --- SECTION 3: INTEREST RADAR LIST --- */}
      <div className="text-left border-b border-indigo-50/50 pb-6">
        <h3 className="text-lg font-black text-primary">Interest Profile</h3>
        <p className="text-text-muted text-xs font-semibold mb-6 mt-0.5">
          How strongly each zone resonated with you
        </p>

        <div className="space-y-4">
          {scoredA.sortedTypes.map((type, idx) => {
            const isTopMatch = idx === 0;
            return (
              <div key={type.code} className="flex flex-col sm:flex-row sm:items-center gap-2">
                
                {/* Meta details */}
                <div className="w-40 flex items-center gap-2 shrink-0">
                  <span className="text-lg">{zones.find(z => z.code === type.code)?.icon || '🌌'}</span>
                  <span className="font-extrabold text-xs text-primary leading-none">
                    {type.name} ({type.code})
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 h-6 rounded-full overflow-hidden relative border border-slate-200/40">
                    {/* Fill */}
                    <div 
                      className="h-full rounded-full transition-all duration-1000 shadow-sm"
                      style={{ 
                        width: `${type.percentage}%`,
                        backgroundColor: type.hex
                      }}
                    />
                    
                    {/* Top match star label */}
                    {isTopMatch && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-wider text-white flex items-center gap-1 drop-shadow-sm select-none">
                        ⭐ Top Match
                      </span>
                    )}
                  </div>
                  
                  {/* Pct text */}
                  <span className="w-12 text-right text-xs font-black text-primary shrink-0">
                    {type.percentage}%
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* --- SECTION 4: APTITUDE BREAKDOWN PANEL --- */}
      <div className="text-left border-b border-indigo-50/50 pb-6">
        <h3 className="text-lg font-black text-primary">Aptitude Profile</h3>
        <p className="text-text-muted text-[10px] font-bold mb-5 mt-0.5 uppercase tracking-wide leading-relaxed">
          🔒 These scores reflect reasoning ability, not subject knowledge. They grow with practice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vaults.map((vault) => {
            const vaultScore = scoredB[vault.id];
            const strength = getStrengthLabel(vaultScore.percentage);
            
            return (
              <div key={vault.id} className="bg-surface/50 border border-indigo-100/60 p-4 rounded-2xl text-left flex flex-col justify-between h-36">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl filter drop-shadow">{vault.icon}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-xs text-primary leading-tight">
                    {vault.name}
                  </h4>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-text-muted mb-1">
                    <span>ACCURACY</span>
                    <span>{vaultScore.score} / {vaultScore.total}</span>
                  </div>
                  {/* Small Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className="bg-primary h-full transition-all duration-1000"
                      style={{ width: `${vaultScore.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SECTION 5: CAREER DIRECTIONS --- */}
      <div className="text-left border-b border-indigo-50/50 pb-6">
        <h3 className="text-lg font-black text-primary">Where Your Profile Could Lead</h3>
        <p className="text-text-muted text-xs font-semibold mb-6 mt-0.5">
          Based on your top interest type ({scoredA.sortedTypes[0].name})
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riasecMeta[primaryCode].careers.map((career, idx) => {
            const isFull = idx === 4;
            const desc = careerDescriptions[career] || "Engage in advanced professional methodologies in the target industry.";
            return (
              <div 
                key={idx} 
                className={`bg-card p-4 rounded-xl border border-gray-150 flex flex-col justify-center text-left ${
                  isFull ? 'md:col-span-2' : ''
                }`}
                style={{ borderLeftWidth: '5px', borderLeftColor: scoredA.scores[primaryCode].hex }}
              >
                <h4 className="font-extrabold text-xs text-primary mb-1">
                  {career}
                </h4>
                <p className="text-[10px] text-text-muted font-bold leading-normal">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- SECTION 6: ACTIONS & EXPORTS --- */}
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="w-full flex flex-col sm:flex-row gap-4">
          {/* Download ID card button */}
          <button
            onClick={handleDownloadCard}
            disabled={savingCard}
            className="flex-1 bg-primary hover:bg-primary-light disabled:bg-indigo-400 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition"
          >
            {savingCard ? 'Saving...' : '💾 Download Identity Card (PNG)'}
          </button>

          {/* Download PDF button */}
          <button
            onClick={handleDownloadPDF}
            disabled={savingPDF}
            className="flex-1 border border-indigo-150 hover:bg-slate-50 disabled:bg-slate-100 text-primary font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition"
          >
            {savingPDF ? 'Exporting...' : '📄 Download Full Report (PDF)'}
          </button>
        </div>

        {/* Start Over */}
        <a 
          href="/"
          onClick={handleStartOver}
          className="text-xs font-black text-red-500 hover:text-red-700 hover:underline tracking-wide"
        >
          Start Over
        </a>
      </div>

      {/* Footer */}
      <div className="border-t border-indigo-50/50 pt-5 text-center text-[10px] text-text-muted font-bold tracking-wide">
        Xplore Career Discovery Program &middot; This report is for guidance only.
      </div>

    </div>
  );
};

export default Report;
