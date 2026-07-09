import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext.jsx';
import { motion } from 'framer-motion';

const Welcome = () => {
  const { explorer, updateExplorer } = useAssessment();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: explorer.name || '',
    school: explorer.school || '',
    section: explorer.section || '',
    grade: '9' // Hidden grade field set to "9"
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.school.trim() || !formData.section.trim()) {
      setError('Please fill in all briefing fields before accepting the mission!');
      return;
    }
    setError('');
    updateExplorer(formData);
    navigate('/avatar');
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-80px)] flex flex-col justify-between items-center py-6 px-4 select-none">
      {/* Top Section */}
      <div className="w-full max-w-2xl text-center mt-4">
        {/* XPLORE Badge */}
        <div className="inline-flex flex-col items-center mb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-primary">
            XPLORE
          </span>
          <div className="w-8 h-[1px] bg-primary/40 mt-1" />
        </div>

        {/* Big Bold Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight mb-4 tracking-tight font-sans">
          Discover Who<br />You Are Built To Be
        </h1>

        {/* Subtext */}
        <p className="text-text-muted text-sm md:text-base font-semibold max-w-lg mx-auto leading-relaxed">
          A 35-minute mission to understand your natural strengths and interests. Completely honest. No right answers.
        </p>
      </div>

      {/* Middle Section (Form Card) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-50/50 my-8"
      >
        <h2 className="text-lg font-black text-primary mb-5">
          Mission Briefing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-primary/80 mb-1.5 pl-0.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full min-h-[48px] bg-surface border border-indigo-100 rounded-xl px-4 py-3 text-sm font-bold text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-light focus:outline-none transition-all duration-300"
            />
          </div>

          {/* School Name Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-primary/80 mb-1.5 pl-0.5">
              School Name
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Your school"
              className="w-full min-h-[48px] bg-surface border border-indigo-100 rounded-xl px-4 py-3 text-sm font-bold text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-light focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Section Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-primary/80 mb-1.5 pl-0.5">
              Section
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. A, B, C"
              className="w-full min-h-[48px] bg-surface border border-indigo-100 rounded-xl px-4 py-3 text-sm font-bold text-primary placeholder-text-muted focus:ring-2 focus:ring-primary-light focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Hidden Grade Field */}
          <input type="hidden" name="grade" value={formData.grade} />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-bold text-xs text-center mt-2 pl-0.5"
            >
              ⚠️ {error}
            </motion.p>
          )}

          {/* Button */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#312E81' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full min-h-[48px] bg-primary text-white font-extrabold text-sm tracking-wide uppercase py-3.5 rounded-xl shadow-md transition-all duration-350"
            >
              Accept Mission →
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Bottom Section */}
      <div className="text-center text-[10px] text-text-muted font-bold tracking-wide mt-4">
        Xplore Career Discovery Program &middot; SSN College of Engineering
      </div>
    </div>
  );
};

export default Welcome;
