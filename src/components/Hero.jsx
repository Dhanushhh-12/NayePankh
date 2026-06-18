import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Utensils, GraduationCap, Award } from 'lucide-react';

function Counter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(end)) return;
    
    const increment = end / (duration * 60);
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(handle);
  }, [target, duration]);

  const formattedCount = count.toLocaleString();
  return <span>{formattedCount}{target.includes('+') ? '+' : ''}</span>;
}

export default function Hero({ onDonateClick, onVolunteerClick, onImpactReportClick }) {
  return (
    <section 
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-gradient-to-tr from-[#1a365d] via-slate-900 to-indigo-950 text-white"
      aria-label="Introduction Banner"
    >
      
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#dd6b20] rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center z-10 flex flex-col items-center">
        
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full mb-8 shadow-inner"
        >
          <ShieldCheck className="w-5 h-5 text-[#dd6b20]" aria-hidden="true" />
          <span className="text-xs font-bold tracking-wider uppercase">UP GOVT. | 80G & 12A REGISTERED NGO</span>
        </motion.div>

        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 max-w-5xl"
        >
          Giving Wings to Underprivileged Communities Through <span className="bg-gradient-to-r from-orange-400 to-[#dd6b20] bg-clip-text text-transparent">Food, Healthcare, and Youth Education</span>
        </motion.h1>

        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
        >
          Empowering communities through transparent impact-driven initiatives across India.
        </motion.p>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-16 justify-center"
        >
          <button 
            onClick={onDonateClick}
            className="px-8 py-4 bg-[#dd6b20] hover:bg-[#c05621] text-white font-extrabold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-orange-500/35 transform hover:-translate-y-1 active:translate-y-0"
            aria-label="Donate now to help a cause"
          >
            Donate Now
          </button>
          
          <button 
            onClick={onVolunteerClick}
            className="px-8 py-4 bg-white text-slate-900 font-extrabold text-lg rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-md transform hover:-translate-y-1 active:translate-y-0"
            aria-label="Become a volunteer"
          >
            Become a Volunteer
          </button>

          <button 
            onClick={onImpactReportClick}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold text-lg rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-1 active:translate-y-0"
            aria-label="View the transparency impact report"
          >
            View Impact Report
          </button>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full grid md:grid-cols-3 gap-6 max-w-5xl"
        >
          
          
          <div className="bg-[#1a365d]/50 backdrop-blur border border-blue-900/60 p-6 rounded-2xl text-left hover:scale-[1.02] hover:bg-[#1a365d]/75 transition-all duration-300 shadow-lg group">
            <div className="text-3xl lg:text-4xl font-extrabold text-white flex items-center space-x-2">
              <Counter target="50000" />
              <Utensils className="w-6 h-6 text-[#dd6b20] animate-bounce" />
            </div>
            <div className="text-sm font-bold text-[#dd6b20] mt-1">Verified Meals Served</div>
            <div className="text-xs text-blue-200 mt-2">Real-time drive log tracking enabled</div>
          </div>

          
          <div className="bg-[#1a365d]/50 backdrop-blur border border-blue-900/60 p-6 rounded-2xl text-left hover:scale-[1.02] hover:bg-[#1a365d]/75 transition-all duration-300 shadow-lg group">
            <div className="text-3xl lg:text-4xl font-extrabold text-white flex items-center space-x-2">
              <Counter target="10000" />
              <GraduationCap className="w-6 h-6 text-[#dd6b20] animate-bounce" />
            </div>
            <div className="text-sm font-bold text-[#dd6b20] mt-1">Active Youth Interns</div>
            <div className="text-xs text-blue-200 mt-2">Mobilized across university chapters</div>
          </div>

          
          <div className="bg-[#1a365d]/50 backdrop-blur border border-blue-900/60 p-6 rounded-2xl text-left hover:scale-[1.02] hover:bg-[#1a365d]/75 transition-all duration-300 shadow-lg group">
            <div className="text-3xl lg:text-4xl font-extrabold text-white flex items-center space-x-2">
              <span>100%</span>
              <Award className="w-6 h-6 text-[#dd6b20] animate-bounce" />
            </div>
            <div className="text-sm font-bold text-[#dd6b20] mt-1">Transparency Verified</div>
            <div className="text-xs text-blue-200 mt-2">12A & 80G Certified Non-Profit Organization</div>
          </div>

        </motion.div>

      </div>

      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.46,26.41,180,50,263,67.23,321.39,56.44Z" className="fill-[#f7fafc] dark:fill-slate-955 transition-colors duration-300"></path>
        </svg>
      </div>
    </section>
  );
}
