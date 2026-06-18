import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Heart, Sparkles, Clock } from 'lucide-react';

export default function Events() {
  const [eventList, setEventList] = useState([
    {
      id: 1,
      title: "Mega Porridge Feed Drive - Kanpur Slums",
      date: "July 5, 2026",
      time: "9:00 AM - 12:30 PM",
      location: "Central Slum Outreach Hub, Kanpur",
      slotsJoined: 42,
      slotsTotal: 50,
      imageTag: "Porridge Distribution"
    },
    {
      id: 2,
      title: "Slum Digital Literacy Classroom Setup",
      date: "July 12, 2026",
      time: "10:00 AM - 3:00 PM",
      location: "Outreach Center, Ghaziabad",
      slotsJoined: 18,
      slotsTotal: 25,
      imageTag: "LMS Classroom Setup"
    },
    {
      id: 3,
      title: "Menstrual Hygiene & Health Awareness Cell",
      date: "July 20, 2026",
      time: "11:00 AM - 1:30 PM",
      location: "Community outreach shelter, Delhi",
      slotsJoined: 30,
      slotsTotal: 30,
      imageTag: "Women Wellness Campaign"
    }
  ]);

  const handleJoinEvent = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id) {
        if (evt.slotsJoined >= evt.slotsTotal) {
          alert("This campaign volunteer crew is already at full capacity. Thank you for your support!");
          return evt;
        }
        alert("Awesome! You are successfully registered as a volunteer coordinator for this drive.");
        return { ...evt, slotsJoined: evt.slotsJoined + 1 };
      }
      return evt;
    }));
  };

  return (
    <section id="events" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">GET ACTIVE</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Upcoming Events & Campaigns</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Sign up to coordinate local ground campaigns. Real-time capacity indicators shown below.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {eventList.map((evt) => {
            const isFull = evt.slotsJoined >= evt.slotsTotal;
            return (
              <motion.div
                key={evt.id}
                whileHover={{ y: -6 }}
                className="bg-[#f7fafc] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                
                {/* Event Cover Photo Placeholder */}
                <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#1a365d]/5">
                    <Sparkles className="w-8 h-8 text-[#dd6b20] mb-2 animate-bounce" />
                    <span className="text-xs font-black text-[#1a365d] dark:text-white uppercase tracking-wider">{evt.imageTag}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{evt.date}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white font-bold text-xs flex items-center space-x-1.5 z-10">
                    <Calendar className="w-4 h-4 text-[#dd6b20]" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#1a365d] dark:text-white leading-snug">
                      {evt.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-start space-x-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    {/* Capacity Indicator */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Volunteer Crew Capacity</span>
                        <span className={isFull ? 'text-red-500' : 'text-[#dd6b20]'}>
                          {evt.slotsJoined} / {evt.slotsTotal} slots {isFull ? '(FULL)' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${isFull ? 'bg-red-500' : 'bg-[#dd6b20]'}`} 
                          style={{ width: `${(evt.slotsJoined / evt.slotsTotal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Register Trigger */}
                  <button
                    onClick={() => handleJoinEvent(evt.id)}
                    className={`mt-6 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                      isFull 
                        ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed' 
                        : 'bg-[#1a365d] text-white hover:bg-[#152c4f]'
                    }`}
                  >
                    {isFull ? 'Capacity Reached' : 'Join Volunteer Crew'}
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
