import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Users, Heart, BookOpen, Activity, Utensils } from 'lucide-react';

export default function DonationTracker({ onDonateClick }) {
  const getCampaignIcon = (iconName) => {
    if (iconName === 'book') return <BookOpen className="w-6 h-6 text-[#1a365d] dark:text-blue-400" />;
    if (iconName === 'heart') return <Activity className="w-6 h-6 text-[#dd6b20]" />;
    return <Utensils className="w-6 h-6 text-orange-500" />;
  };

  const campaigns = [
    {
      id: 1,
      name: "Education Campaign for Underprivileged Children",
      target: 100000,
      raised: 0,
      donors: 0,
      daysLeft: 12,
      status: "Active",
      desc: "Providing textbooks, digitizing classroom tablets, and supporting volunteer teachers in Uttar Pradesh slums.",
      icon: "book"
    },
    {
      id: 2,
      name: "Slum Healthcare Outreach & Wellness Camp",
      target: 60000,
      raised: 0,
      donors: 0,
      daysLeft: 15,
      status: "Active",
      desc: "Emergency clinics, distribution of sanitary napkins, and healthcare workshops for women.",
      icon: "heart"
    },
    {
      id: 3,
      name: "Emergency Nutritional Porridge Drive",
      target: 150000,
      raised: 0,
      donors: 0,
      daysLeft: 8,
      status: "Active",
      desc: "Providing direct warm breakfast nutrition support to families hit by extreme resource constraints.",
      icon: "utensils"
    }
  ];

  return (
    <section id="campaigns" className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">URGENT NEEDS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Active Donation Campaigns</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Support our targeted drives. Every donation is backed by 50% Sec 80G tax exemptions.
          </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((camp) => {
            const percent = Math.round((camp.raised / camp.target) * 100);
            return (
              <motion.div
                key={camp.id}
                whileHover={{
                  scale: 1.03,
                  rotateY: -8,
                  rotateX: 4,
                  z: 40,
                  boxShadow: "0px 20px 40px rgba(26, 54, 93, 0.12)"
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300"
              >
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      {getCampaignIcon(camp.icon)}
                    </div>
                    <span className="bg-[#dd6b20]/10 text-[#dd6b20] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {camp.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-2 leading-snug line-clamp-2">
                    {camp.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {camp.desc}
                  </p>

                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Raised: ₹{camp.raised.toLocaleString()}</span>
                      <span className="text-[#1a365d] dark:text-blue-400">{percent}% of ₹{camp.target.toLocaleString()} Goal</span>
                    </div>
                    
                    
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-[#dd6b20] h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                
                <div className="px-6 py-4.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  
                  
                  <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{camp.donors} Donors</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{camp.daysLeft} Days left</span>
                    </div>
                  </div>

                  
                  <button
                    onClick={() => onDonateClick(camp.name)}
                    className="px-4 py-2 bg-[#dd6b20] hover:bg-[#c05621] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Support</span>
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
