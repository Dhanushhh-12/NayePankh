import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, Users, Apple, Heart, Sparkles } from 'lucide-react';

export default function ImpactMap() {
  const [selectedCity, setSelectedCity] = useState({
    name: "Delhi NCR",
    volunteers: 0,
    activeCampaigns: 4,
    mealsServed: 0,
    region: "North India Zone",
    projects: ["Naye Shiksha digital school", "Slum education coordinate drives"]
  });

  const markers = [
    {
      name: "Delhi NCR",
      x: 42, // percent coordinates on simplified map layout
      y: 32,
      volunteers: 0,
      activeCampaigns: 4,
      mealsServed: 0,
      region: "North India Zone",
      projects: ["Naye Shiksha digital school", "Slum education coordinate drives"]
    },
    {
      name: "Kanpur Hub",
      x: 48,
      y: 39,
      volunteers: 0,
      activeCampaigns: 3,
      mealsServed: 0,
      region: "Central Zone",
      projects: ["Porridge nutrition distribution", "Stray animal feeding drives"]
    },
    {
      name: "Mumbai Chapter",
      x: 24,
      y: 60,
      volunteers: 0,
      activeCampaigns: 2,
      mealsServed: 0,
      region: "West India Zone",
      projects: ["Slum coordinate outreach", "Clothing donation drives"]
    },
    {
      name: "Hyderabad Chapter",
      x: 41,
      y: 68,
      volunteers: 0,
      activeCampaigns: 3,
      mealsServed: 0,
      region: "South-Central Zone",
      projects: ["Menstrual hygiene awareness workshops", "Adolescent counseling"]
    },
    {
      name: "Bangalore Chapter",
      x: 38,
      y: 78,
      volunteers: 0,
      activeCampaigns: 2,
      mealsServed: 0,
      region: "South India Zone",
      projects: ["Youth coordinator chapters", "Tablets distribution drives"]
    }
  ];

  return (
    <section id="impactmap" className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">LIVE OUTREACH MAP</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Interactive India Impact Map</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Click on active chapter markers to display volunteer statistics, meals served, and regional performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Interactive Map Visual Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-805 p-6 rounded-3xl shadow-sm relative aspect-[4/5] sm:aspect-square flex items-center justify-center overflow-hidden">
            
            {/* SVG simplified outline of India Map */}
            <svg 
              className="w-full h-full text-slate-100 dark:text-slate-900 opacity-90 transition-colors" 
              viewBox="0 0 100 100" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="0.5"
            >
              {/* Simplistic stylized geometric map path representing India */}
              <path d="M 40 10 L 45 5 L 50 12 L 48 20 L 58 22 L 68 28 L 78 30 L 82 25 L 85 30 L 78 35 L 75 40 L 88 45 L 80 50 L 75 52 L 65 48 L 60 52 L 58 60 L 52 65 L 48 75 L 42 85 L 38 95 L 37 88 L 33 80 L 35 70 L 32 62 L 20 60 L 15 58 L 12 50 L 18 45 L 25 48 L 32 45 L 38 40 L 35 32 L 30 28 L 22 25 L 30 20 L 38 18 Z" />
            </svg>

            {/* Interactive Chapter Pins */}
            {markers.map((marker) => {
              const isSelected = selectedCity.name === marker.name;
              return (
                <button
                  key={marker.name}
                  onClick={() => setSelectedCity(marker)}
                  className="absolute p-2 group transition-all"
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  aria-label={`Show metrics for ${marker.name}`}
                >
                  <span className="relative flex h-4 w-4">
                    {isSelected && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dd6b20] opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center text-[8px] font-black text-white ${isSelected ? 'bg-[#dd6b20]' : 'bg-[#1a365d] group-hover:bg-[#dd6b20]'}`}>
                      •
                    </span>
                  </span>
                  
                  {/* Tooltip Label */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {marker.name}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
              ℹ️ Click pins to view regional statistics
            </div>
          </div>

          {/* Regional Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCity.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-805 p-8 rounded-3xl shadow-sm space-y-6"
              >
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#dd6b20]">
                      {selectedCity.region}
                    </span>
                    <h3 className="text-2xl font-black text-[#1a365d] dark:text-white mt-1">
                      {selectedCity.name}
                    </h3>
                  </div>
                  <MapPin className="w-6 h-6 text-[#dd6b20]" />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 dark:border-slate-850 py-5 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Volunteers</span>
                    <strong className="text-slate-800 dark:text-white text-base font-black">{selectedCity.volunteers}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Active Projects</span>
                    <strong className="text-slate-800 dark:text-white text-base font-black">{selectedCity.activeCampaigns}</strong>
                  </div>
                  <div className="col-span-2 pt-2">
                    <span className="text-slate-400 font-bold block mb-1">Meals served</span>
                    <strong className="text-slate-800 dark:text-white text-base font-black">{selectedCity.mealsServed}</strong>
                  </div>
                </div>

                {/* Active Projects List */}
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-3 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#dd6b20]" />
                    <span>Active Projects</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-550 dark:text-slate-400">
                    {selectedCity.projects.map((proj, idx) => (
                      <li key={idx} className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dd6b20]"></span>
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* General Disclaimer */}
            <div className="bg-[#1a365d]/5 p-6 rounded-2xl border border-[#1a365d]/10 flex items-start space-x-3 text-xs">
              <Info className="w-5 h-5 text-[#1a365d] dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-slate-605 dark:text-slate-400 leading-relaxed font-medium">
                NayePankh's regional campus outreach strategy targets localized distribution loops. Our chapters are monitored centrally from Delhi-NCR and Kanpur Hubs.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
