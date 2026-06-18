import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles, Award } from 'lucide-react';

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 1,
      title: "From School Dropout to Scholarship Winner",
      summary: "Priya stopped going to school when her father lost his wage job in 2020. Our volunteers provided counseling and sponsored her admission to modern high school studies.",
      fullStory: "Priya stopped going to school when her family encountered extreme financial strain in 2020. NayePankh volunteers discovered her during a door-to-door digital literacy survey in the Kanpur slum clusters. By assigning a volunteer mentor and financing her full tuition, Priya re-entered high school, completed her boards with honors, and has recently secured a university scholarship to study Computer Applications. She now volunteers as a teacher herself.",
      beneficiary: "Priya Sharma",
      location: "Kanpur Slum Center",
      impactMetric: "100% Tuition Supported",
      image: "/priya_scholarship.png",
      tag: "Education Success"
    },
    {
      id: 2,
      title: "Restoring Health & Hope With Nutritious Meals",
      summary: "Raj's family faced chronic malnutrition. Through our daily nutritional porch distribution drives, his health indicators stabilized, and he returned to studies.",
      fullStory: "Raj, a 7-year-old in Ghaziabad, was suffering from acute nutritional deficiencies, severely affecting his developmental growth. The NayePankh nutritional cell integrated his family into our daily verified meal drives. Over the course of 12 months of clean porridge, milk, and seasonal fruits distribution, Raj's physical indicators fully stabilized. Today, he is healthy, energetic, and enrolled in the local elementary school cell.",
      beneficiary: "Raj Kumar",
      location: "Ghaziabad outreach",
      impactMetric: "300+ Healthy Meals Provided",
      image: "/raj_meals.png",
      tag: "Nutrition Success"
    },
    {
      id: 3,
      title: "Uplifting Slum Education via Digital Classrooms",
      summary: "Karan got access to interactive courses via Naye Shiksha LMS, paving his way to qualify for the district math olympiad.",
      fullStory: "Karan's school had no computers or science labs. By joining the Naye Shiksha digital cell set up by NayePankh volunteers, Karan accessed video learning tutorials, tablet-based math games, and live webinars. His aptitude for math led him to participate in the local district Olympiad where he finished in the top 5 percent. Karan aspires to be an aerospace engineer.",
      beneficiary: "Karan Patel",
      location: "Noida Digital Cell",
      impactMetric: "Top 5% Olympiad Ranker",
      image: "/karan_digital.png",
      tag: "Digital LMS Success"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  return (
    <section id="stories" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">REAL IMPACT</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Wings of Success Stories</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Real outcomes made possible by volunteers and donors. Meet the children behind the numbers.
          </p>
        </div>

        
        <div className="relative max-w-4xl mx-auto">
          
          <div className="overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-sm relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              
              <div className="relative aspect-square md:aspect-auto md:h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
                <img 
                  src={stories[currentIndex].image} 
                  alt={stories[currentIndex].beneficiary}
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#1a365d]/5">
                  <Sparkles className="w-10 h-10 text-[#dd6b20] mb-2 animate-bounce" />
                  <span className="text-xs font-black text-[#1a365d] dark:text-white uppercase tracking-wider">{stories[currentIndex].tag}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{stories[currentIndex].location}</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-800/50">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Impact Metric</div>
                  <div className="text-xs font-black text-[#dd6b20]">{stories[currentIndex].impactMetric}</div>
                </div>
              </div>

              
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-[#dd6b20] font-bold text-xs uppercase tracking-wider block mb-2">{stories[currentIndex].beneficiary}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1a365d] dark:text-white leading-tight mb-4">
                    "{stories[currentIndex].title}"
                  </h3>
                  <p className="text-sm text-slate-550 dark:text-slate-405 leading-relaxed mb-6 font-sans">
                    {stories[currentIndex].summary}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800">
                  <span className="text-xs text-slate-400">{stories[currentIndex].location}</span>
                  <button 
                    onClick={() => setSelectedStory(stories[currentIndex])}
                    className="text-[#1a365d] dark:text-blue-400 hover:text-[#dd6b20] dark:hover:text-[#dd6b20] font-black text-xs uppercase tracking-wider flex items-center space-x-1"
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-1.5">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-[#dd6b20] w-6' : 'bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedStory(null)}></div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800 transform max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close story"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="bg-[#dd6b20]/10 text-[#dd6b20] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block">
                  {selectedStory.tag}
                </span>
                <h3 className="text-2xl font-black text-[#1a365d] dark:text-white mb-2 leading-snug">
                  {selectedStory.title}
                </h3>
                <div className="text-xs text-slate-400 flex items-center space-x-1">
                  <span>Beneficiary: {selectedStory.beneficiary}</span>
                  <span>•</span>
                  <span>Location: {selectedStory.location}</span>
                </div>
              </div>

              <div className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed mb-6 font-sans space-y-4">
                <p>{selectedStory.fullStory}</p>
              </div>

              <div className="bg-[#f7fafc] dark:bg-slate-850 p-4 rounded-xl flex items-center space-x-3 border border-slate-200/50 dark:border-slate-800">
                <Award className="w-6 h-6 text-[#dd6b20]" />
                <div>
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Verified Achievement Metric</div>
                  <div className="text-sm font-black text-[#1a365d] dark:text-white">{selectedStory.impactMetric}</div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedStory(null)}
                className="mt-6 w-full py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-white font-extrabold rounded-xl transition-colors text-center block text-sm"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
