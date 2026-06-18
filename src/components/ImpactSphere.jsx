import React from 'react';
import { Award, Users, MapPin, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ImpactSphere() {
  const chapters = [
    {
      id: 1,
      city: "Hyderabad Chapter",
      campus: "BITS Hyderabad & IIIT Alliance",
      volunteers: 0,
      mealsGoal: 10000,
      mealsServed: 0,
      activeCampaigns: 0,
      topChapter: false,
      image: "/hyderabad_outreach.png"
    },
    {
      id: 2,
      city: "Delhi NCR Chapter",
      campus: "Delhi University Campus Hub",
      volunteers: 0,
      mealsGoal: 20000,
      mealsServed: 0,
      activeCampaigns: 0,
      topChapter: true, // Special Badge
      image: "/delhi_outreach.png"
    },
    {
      id: 3,
      city: "Mumbai Chapter",
      campus: "St. Xavier's & NMIMS Outreach",
      volunteers: 0,
      mealsGoal: 15000,
      mealsServed: 0,
      activeCampaigns: 0,
      topChapter: false,
      image: "/mumbai_outreach.png"
    },
    {
      id: 4,
      city: "Bangalore Chapter",
      campus: "REVA & Christ University Hub",
      volunteers: 0,
      mealsGoal: 12000,
      mealsServed: 0,
      activeCampaigns: 0,
      topChapter: false,
      image: "/bangalore_outreach.png"
    }
  ];

  return (
    <section id="impactsphere" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">CHAPTER NETWORK</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">ImpactSphere Chapter Dashboard</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Real-time synchronization of regional campus outreach cells. Active metrics start at zero for upcoming seasonal campaigns.
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              whileHover={{
                scale: 1.03,
                rotateY: 8,
                rotateX: -4,
                z: 40,
                boxShadow: "0px 20px 40px rgba(26, 54, 93, 0.12)"
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative bg-[#f7fafc] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-full transition-all duration-300"
            >
              
              {/* Image & Badges */}
              <div className="relative aspect-video bg-slate-200 dark:bg-slate-850 flex items-center justify-center overflow-hidden">
                {chapter.topChapter && (
                  <div className="absolute top-3 left-3 bg-[#dd6b20] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md z-10 animate-pulse">
                    <Award className="w-3.5 h-3.5 fill-current" />
                    <span>🏆 Top Chapter</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 text-white font-bold text-xs flex items-center space-x-1.5 z-10">
                  <MapPin className="w-3.5 h-3.5 text-[#dd6b20]" />
                  <span className="shadow-text">{chapter.city}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                
                {/* Fallback Graphic */}
                <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                  <Sparkles className="w-8 h-8 text-[#dd6b20] mb-1 opacity-40" />
                  <span className="text-[10px] uppercase font-bold">{chapter.campus}</span>
                </div>
              </div>

              {/* Stats Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Metric Rows */}
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-200/50 dark:border-slate-805 pb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Volunteers</span>
                      <strong className="text-base text-slate-800 dark:text-white font-black">{chapter.volunteers}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Campaigns</span>
                      <strong className="text-base text-slate-800 dark:text-white font-black">{chapter.activeCampaigns}</strong>
                    </div>
                  </div>

                  {/* Meals Distribution Goal Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Meals Served</span>
                      <span className="text-[#dd6b20]">
                        {chapter.mealsServed} / {chapter.mealsGoal.toLocaleString()} (0%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                      <div className="bg-[#dd6b20] h-1.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/50 dark:border-slate-805 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Outreach Cell</span>
                  <button 
                    onClick={() => alert(`Registration for the ${chapter.city} student committee is open for core volunteers.`)}
                    className="text-[#1a365d] dark:text-blue-400 font-extrabold hover:text-[#dd6b20] dark:hover:text-[#dd6b20] transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
