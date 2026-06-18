import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote: "Working with NayePankh as a volunteer teacher has completely changed my perspective. Seeing the children in slum cells learn fractions and spelling with tablets is incredibly rewarding. The transparency of operations is real.",
      author: "Aditi Rao",
      role: "Volunteer Teacher, Delhi Chapter",
      category: "Volunteer",
      avatar: "AR"
    },
    {
      id: 2,
      quote: "I was looking to support a non-profit that has audited transparency, and NayePankh's instant 80G receipts and meal logs convinced me. Supporting their porridge drives is now a regular family contribution.",
      author: "Vikram Malhotra",
      role: "Corporate Donor, Bangalore",
      category: "Donor",
      avatar: "VM"
    },
    {
      id: 3,
      quote: "My children now study at the digital portal classroom in Ghaziabad. Their English spelling has improved, and the free nutritional porridge they receive daily is a huge support to our family.",
      author: "Sunita Devi",
      role: "Parent of Beneficiaries, Ghaziabad",
      category: "Beneficiary",
      avatar: "SD"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight font-sans">Voices of Trust</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Hear from the corporate partners, university coordinators, and local families shaping our journey.
          </p>
        </div>

        {/* Testimonials Slide Frame */}
        <div className="relative max-w-3xl mx-auto">
          
          <div className="relative bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-805 rounded-3xl p-8 sm:p-12 shadow-sm">
            
            {/* Quote Icon Background */}
            <span className="absolute top-6 right-8 text-slate-100 dark:text-slate-900 pointer-events-none" aria-hidden="true">
              <Quote className="w-24 h-24 stroke-[1.5]" />
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                {/* Category Chip */}
                <span className="bg-[#dd6b20]/10 text-[#dd6b20] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full inline-block">
                  {testimonials[currentIndex].category}
                </span>

                <blockquote className="text-base sm:text-lg text-slate-650 dark:text-slate-300 italic leading-relaxed font-medium font-sans">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <div className="w-10 h-10 bg-[#1a365d] text-white flex items-center justify-center font-black rounded-full text-xs">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-black text-slate-900 dark:text-white block">
                      {testimonials[currentIndex].author}
                    </cite>
                    <span className="text-[11px] text-slate-450 dark:text-slate-500 font-medium">
                      {testimonials[currentIndex].role}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-6 px-4">
            
            {/* Pagination markers */}
            <div className="flex space-x-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-[#dd6b20] w-6' : 'bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
