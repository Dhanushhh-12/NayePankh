import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Clock, MapPin, Apple, BookOpen, UserPlus, HeartPulse } from 'lucide-react';

export default function ImpactTimeline() {
  const events = [
    {
      id: 1,
      title: "Food Distribution Drive Completed",
      desc: "Distributed 250 fresh hot porridge nutrition meals to slum families and daily laborers near the central canal cells.",
      type: "food",
      location: "Kanpur Outskirts Slums",
      time: "2 hours ago",
      icon: Apple,
      color: "bg-orange-500",
      badge: "Verified Drive",
      photoDesc: "Meal packets handed over by Coordinator Amit"
    },
    {
      id: 2,
      title: "School supplies & Notebooks Distributed",
      desc: "Provided textbooks, reference kits, and writing worksheets to 85 students in grades 1 to 5.",
      type: "education",
      location: "Delhi outreach center",
      time: "5 hours ago",
      icon: BookOpen,
      color: "bg-blue-600",
      badge: "Verified Allocation",
      photoDesc: "Study kits distribution log completed"
    },
    {
      id: 3,
      title: "Student Chapter Coordination Set Up",
      desc: "Enrolled core volunteer coordination leads for managing the campus outreach cell drives.",
      type: "volunteer",
      location: "Mumbai Campus Cell",
      time: "1 day ago",
      icon: UserPlus,
      color: "bg-green-500",
      badge: "Verified Team Setup",
      photoDesc: "Volunteers directory database updated"
    },
    {
      id: 4,
      title: "Free Healthcare & Wellness Camp Conducted",
      desc: "Conducted medical checks and distributed sanitary napkins to 120 women in our local cluster blocks.",
      type: "healthcare",
      location: "Bangalore Slums outreach",
      time: "2 days ago",
      icon: HeartPulse,
      color: "bg-red-500",
      badge: "Verified Clinic",
      photoDesc: "Clinical record register logged"
    }
  ];

  return (
    <section id="timeline" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">LIVE UPDATES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Real-Time Impact Timeline</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Audit-tracked activity feed showcasing real-time drives and structural setups across the country.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-12">
          {events.map((ev, idx) => {
            const Icon = ev.icon;
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-8 sm:pl-12"
              >
                {/* Node Dot Icon */}
                <span className={`absolute -left-5 top-1.5 flex h-10 w-10 items-center justify-center rounded-full text-white ${ev.color} border-4 border-white dark:border-slate-950 shadow-md`}>
                  <Icon className="w-4 h-4" />
                </span>

                {/* Timeline Card */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-805 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-black text-[#1a365d] dark:text-white leading-tight">
                        {ev.title}
                      </h3>
                      <span className="bg-green-100 dark:bg-green-500/10 text-green-650 dark:text-green-400 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3 fill-current text-green-550" />
                        <span>{ev.badge}</span>
                      </span>
                    </div>
                    
                    <span className="text-xs text-slate-450 dark:text-slate-500 flex items-center space-x-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{ev.time}</span>
                    </span>
                  </div>

                  <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed mb-4">
                    {ev.desc}
                  </p>

                  {/* Card Footer Details & Media Placeholder */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800 gap-4">
                    
                    {/* Location */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
                      <MapPin className="w-4 h-4 text-[#dd6b20]" />
                      <span>{ev.location}</span>
                    </div>

                    {/* Media Preview Box */}
                    <div className="bg-white dark:bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-805 text-[10px] text-slate-400 flex items-center space-x-2 self-start sm:self-auto shadow-inner">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>📷 {ev.photoDesc}</span>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
