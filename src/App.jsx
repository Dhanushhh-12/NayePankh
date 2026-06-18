import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sun, Moon, Menu, X,
  Award, Newspaper,
  Mail, Phone, Instagram, Linkedin, Youtube,
  Facebook, Twitter, ShieldCheck,
  Check, Play, Clock, Search, Tv, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Modular Components
import Hero from './components/Hero';
import DonationTray from './components/DonationTray';
import DonationTracker from './components/DonationTracker';
import SuccessStories from './components/SuccessStories';
import VolunteerPortal from './components/VolunteerPortal';
import ImpactSphere from './components/ImpactSphere';
import Testimonials from './components/Testimonials';
import Events from './components/Events';
import AISupport from './components/AISupport';

export default function App() {
  // Theme & General Layout States
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Naye Shiksha LMS Mode Toggle
  const [nayeShikshaActive, setNayeShikshaActive] = useState(false);

  // Modals States
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [isNewspaperOpen, setIsNewspaperOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Donation Submission State
  const [donateSubmitted, setDonateSubmitted] = useState(false);
  const [donateForm, setDonateForm] = useState({
    amount: '1000', customAmount: '', name: '', email: '', pan: '', cause: 'General Funds', method: 'UPI'
  });

  // Naye Shiksha Student state
  const [shikshaSearchQuery, setShikshaSearchQuery] = useState('');
  const [activeLessonCategory, setActiveLessonCategory] = useState('All');
  const [shikshaRole, setShikshaRole] = useState('student');

  // Naye Shiksha Volunteer Teacher state
  const [newLessonForm, setNewLessonForm] = useState({
    title: '', duration: '', category: 'Math', targetClass: 'Class 1-5', videoURL: ''
  });

  const [lessonsList, setLessonsList] = useState([
    {
      id: 1,
      targetClass: "Class 1-5",
      title: "Introduction to Fractions (Visual Math)",
      duration: "12 mins",
      videoURL: "https://www.youtube.com/embed/n0FZhQ_GkKw",
      category: "Math"
    },
    {
      id: 2,
      targetClass: "Class 6-8",
      title: "English Grammar: Tenses and Active Voice",
      duration: "18 mins",
      videoURL: "https://www.youtube.com/embed/tupT1nQe9cQ",
      category: "English"
    },
    {
      id: 3,
      targetClass: "Class 1-5",
      title: "Our Solar System & Planets Explained",
      duration: "15 mins",
      videoURL: "https://www.youtube.com/embed/libKVRa01L8",
      category: "Science"
    },
    {
      id: 4,
      targetClass: "Class 6-10",
      title: "Basics of Computer Logic & Coding with Scratch",
      duration: "22 mins",
      videoURL: "https://www.youtube.com/embed/2eHn3sV-TzY",
      category: "Technology"
    }
  ]);

  const [teacherClasses] = useState([
    { id: 1, topic: "Grade 4 Mathematics - Decimals", date: "Tomorrow, 4:00 PM", students: 48 },
    { id: 2, topic: "Grade 6 English - Reading & Spelling", date: "Friday, 5:30 PM", students: 62 },
    { id: 3, topic: "Grade 9 Science - Newton's Laws", date: "Sunday, 11:00 AM", students: 78 }
  ]);

  // Scroll Animations Observer
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = { threshold: 0.12 };

    const aboutObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAboutVisible(true);
    }, observerOptions);

    if (aboutRef.current) aboutObserver.observe(aboutRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      aboutObserver.disconnect();
    };
  }, [nayeShikshaActive]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Smooth scroll handler
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setNayeShikshaActive(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
    setIsMobileMenuOpen(false);
  };

  const handleDonateChange = (e) => {
    setDonateForm({ ...donateForm, [e.target.name]: e.target.value });
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setDonateSubmitted(true);
    setTimeout(() => {
      setDonateSubmitted(false);
      setIsDonateOpen(false);
      setDonateForm({ amount: '1000', customAmount: '', name: '', email: '', pan: '', cause: 'General Funds', method: 'UPI' });
    }, 4000);
  };

  // Triggers checkout from sticky donation tray or counter cards
  const triggerDonationFlow = (amount) => {
    setDonateForm({
      ...donateForm,
      amount: 'custom',
      customAmount: amount.toString()
    });
    setIsDonateOpen(true);
  };

  const handleAddLessonSubmit = (e) => {
    e.preventDefault();
    const newLesson = {
      id: lessonsList.length + 1,
      ...newLessonForm
    };
    setLessonsList([newLesson, ...lessonsList]);
    setNewLessonForm({ title: '', duration: '', category: 'Math', targetClass: 'Class 1-5', videoURL: '' });
    alert("Lesson uploaded successfully to the platform database!");
  };

  const filteredLessons = lessonsList.filter(lesson => {
    const matchesCategory = activeLessonCategory === 'All' || lesson.category === activeLessonCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(shikshaSearchQuery.toLowerCase()) ||
      lesson.targetClass.toLowerCase().includes(shikshaSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300 antialiased selection:bg-[#dd6b20] selection:text-white">

      {/* ==========================================
          NAVBAR SECTION
          ========================================== */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-3 bg-[#1a365d]/95 backdrop-blur-md border-b border-blue-900/50 text-white' : 'bg-transparent py-5 text-white md:text-slate-800 dark:text-white'}`}>
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center space-x-2 text-2xl font-bold tracking-tight group">
              <div className="bg-[#dd6b20] text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
              </div>
              <span className={`font-extrabold tracking-tight ${isScrolled ? 'text-white' : 'text-[#1a365d] dark:text-white'}`}>Nayepankh</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}>Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}>About Us</a>
              <button
                onClick={() => setIsNewspaperOpen(true)}
                className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}
              >
                Newspaper Recognition
              </button>
              <a href="#impactsphere" onClick={(e) => scrollToSection(e, 'impactsphere')} className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}>ImpactSphere</a>
              <a href="#campaigns" onClick={(e) => scrollToSection(e, 'campaigns')} className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}>Campaigns</a>
              <a href="#volunteer" onClick={(e) => scrollToSection(e, 'volunteer')} className={`font-semibold transition-colors duration-200 ${isScrolled ? 'text-blue-100 hover:text-[#dd6b20]' : 'text-slate-700 hover:text-[#dd6b20] dark:text-slate-300 dark:hover:text-[#dd6b20]'}`}>Volunteer</a>

              <button
                onClick={() => { setNayeShikshaActive(!nayeShikshaActive); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-bold border transition-all duration-300 ${nayeShikshaActive
                    ? 'bg-[#dd6b20] border-[#dd6b20] text-white shadow'
                    : 'border-orange-500/30 text-[#dd6b20] hover:bg-orange-500/10 dark:text-orange-400 dark:border-orange-400/30'
                  }`}
              >
                <Tv className="w-4 h-4 animate-bounce" />
                <span>Naye Shiksha LMS</span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-blue-955 text-blue-200 hover:bg-blue-900' : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-850 dark:text-slate-200'}`}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsDonateOpen(true)}
                className="px-6 py-2.5 bg-[#dd6b20] hover:bg-[#c05621] text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/15 active:scale-95"
              >
                Donate Now
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-3 md:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-slate-100/10 text-white"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md bg-slate-100/10 text-white"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-[#1a365d] border-b border-blue-900 overflow-hidden py-4 px-4 space-y-3 text-white"
            >
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="block py-2 font-semibold hover:text-[#dd6b20]">Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block py-2 font-semibold hover:text-[#dd6b20]">About Us</a>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsNewspaperOpen(true); }}
                className="block w-full text-left py-2 font-semibold hover:text-[#dd6b20]"
              >
                Newspaper Recognition
              </button>
              <a href="#impactsphere" onClick={(e) => scrollToSection(e, 'impactsphere')} className="block py-2 font-semibold hover:text-[#dd6b20]">ImpactSphere</a>
              <a href="#campaigns" onClick={(e) => scrollToSection(e, 'campaigns')} className="block py-2 font-semibold hover:text-[#dd6b20]">Campaigns</a>
              <a href="#volunteer" onClick={(e) => scrollToSection(e, 'volunteer')} className="block py-2 font-semibold hover:text-[#dd6b20]">Volunteer</a>

              <button
                onClick={() => { setNayeShikshaActive(!nayeShikshaActive); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#dd6b20] text-white font-bold rounded-xl shadow-md"
              >
                <Tv className="w-5 h-5" />
                <span>Naye Shiksha LMS Portal</span>
              </button>

              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsDonateOpen(true); }}
                className="w-full text-center block py-2.5 bg-[#dd6b20] text-white font-bold rounded-xl shadow-md"
              >
                Donate Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==========================================
          LMS VIEW
          ========================================== */}
      {nayeShikshaActive ? (
        <main className="pt-24 min-h-screen">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 text-white py-12 px-4 shadow-xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div>
                <span className="bg-teal-500/35 border border-teal-400/35 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">FREE DIGITAL EDUCATION PORTAL</span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">Naye Shiksha</h1>
                <p className="text-lg text-teal-100 max-w-2xl">
                  Providing quality video lessons and resources to underprivileged students across India, building a brighter future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 md:mt-0 w-full md:w-auto">
                <div className="bg-black/20 p-1.5 rounded-xl border border-white/10 flex">
                  <button
                    onClick={() => setShikshaRole('student')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${shikshaRole === 'student' ? 'bg-white text-teal-900 shadow' : 'text-white/80 hover:text-white'}`}
                  >
                    Student Portal
                  </button>
                  <button
                    onClick={() => setShikshaRole('teacher')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${shikshaRole === 'teacher' ? 'bg-white text-teal-900 shadow' : 'text-white/80 hover:text-white'}`}
                  >
                    Volunteer-Teacher Panel
                  </button>
                </div>

                <button
                  onClick={() => setNayeShikshaActive(false)}
                  className="px-6 py-2.5 bg-slate-900/60 hover:bg-slate-950/80 text-white border border-white/20 font-bold rounded-xl transition-all"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* STUDENT PORTAL */}
            {shikshaRole === 'student' ? (
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-black tracking-tight">Interactive Video Lessons</h2>

                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search lessons..."
                        value={shikshaSearchQuery}
                        onChange={(e) => setShikshaSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['All', 'Math', 'English', 'Science', 'Technology'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveLessonCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeLessonCategory === cat
                            ? 'bg-teal-505 border-teal-505 text-white shadow-md'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-805 hover:bg-slate-50 dark:hover:bg-slate-850'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredLessons.length > 0 ? (
                      filteredLessons.map((lesson) => (
                        <div key={lesson.id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <span className="bg-teal-500/10 text-teal-650 dark:text-teal-400 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                                {lesson.category}
                              </span>
                              <span className="text-xs text-slate-400 dark:text-slate-505 font-medium">
                                {lesson.targetClass}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white line-clamp-1">{lesson.title}</h3>
                            <p className="text-xs text-slate-550 dark:text-slate-400 flex items-center space-x-1.5 mb-6">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Duration: {lesson.duration}</span>
                            </p>
                          </div>

                          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-xs text-slate-400 dark:text-slate-555">Instructor: Volunteer Teacher</span>
                            <button
                              onClick={() => setSelectedLesson(lesson)}
                              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Play Video</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12 text-slate-400">
                        No lessons match your search criteria.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column Progress */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-b from-indigo-900 to-indigo-955 text-white p-8 rounded-3xl shadow-lg border border-indigo-850">
                    <div className="flex items-center space-x-3 mb-6">
                      <Heart className="w-6 h-6 text-teal-400" />
                      <h3 className="text-xl font-black tracking-tight">Your Progress Tracker</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-xs text-indigo-200 mb-2 font-bold">
                          <span>Lessons Watched</span>
                          <span>0 / 10 Completed</span>
                        </div>
                        <div className="w-full bg-indigo-955/80 rounded-full h-2.5 border border-indigo-805">
                          <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-indigo-850 pt-6">
                        <div className="bg-indigo-955/40 p-4 rounded-xl text-center">
                          <div className="text-2xl font-black text-teal-400">0 Hrs</div>
                          <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider mt-1">Watch Time</div>
                        </div>

                        <div className="bg-indigo-950/40 p-4 rounded-xl text-center">
                          <div className="text-2xl font-black text-teal-400">0</div>
                          <div className="text-[10px] text-indigo-305 font-bold uppercase tracking-wider mt-1">Practice Points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* VOLUNTEER-TEACHER PANEL */
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="space-y-8">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-xl font-black mb-4">Teacher Dashboard</h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl flex items-center space-x-4 border border-slate-100 dark:border-slate-800">
                        <Heart className="w-8 h-8 text-teal-505" />
                        <div>
                          <div className="text-xl font-extrabold text-slate-900 dark:text-white">1,420</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Total Enrolled Students</div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-855 rounded-xl flex items-center space-x-4 border border-slate-100 dark:border-slate-800">
                        <Clock className="w-8 h-8 text-teal-505" />
                        <div>
                          <div className="text-xl font-extrabold text-slate-900 dark:text-white">120 Hours</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Platform Classes Conducted</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-lg font-black mb-4">Your Live Doubt Sessions</h3>
                    <div className="space-y-4">
                      {teacherClasses.map((cls) => (
                        <div key={cls.id} className="border-b border-slate-150 dark:border-slate-805 pb-3 last:border-0 last:pb-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cls.topic}</h4>
                          <div className="flex justify-between text-xs text-slate-405 mt-1 font-medium">
                            <span>{cls.date}</span>
                            <span>{cls.students} Enrolled</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <h3 className="text-xl font-black">Upload a Video Lesson</h3>
                  </div>

                  <form onSubmit={handleAddLessonSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Lesson Title</label>
                        <input
                          type="text" required
                          value={newLessonForm.title}
                          onChange={(e) => setNewLessonForm({ ...newLessonForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none focus:border-teal-500"
                          placeholder="e.g. Introduction to Solar Energy"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Duration</label>
                        <input
                          type="text" required
                          value={newLessonForm.duration}
                          onChange={(e) => setNewLessonForm({ ...newLessonForm, duration: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none focus:border-teal-500"
                          placeholder="e.g. 15 mins"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Subject Category</label>
                        <select
                          value={newLessonForm.category}
                          onChange={(e) => setNewLessonForm({ ...newLessonForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none focus:border-teal-500"
                        >
                          <option value="Math">Math</option>
                          <option value="English">English</option>
                          <option value="Science">Science</option>
                          <option value="Technology">Technology</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Target Grade / Class</label>
                        <select
                          value={newLessonForm.targetClass}
                          onChange={(e) => setNewLessonForm({ ...newLessonForm, targetClass: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none focus:border-teal-500"
                        >
                          <option value="Class 1-5">Class 1-5 (Elementary)</option>
                          <option value="Class 6-8">Class 6-8 (Middle)</option>
                          <option value="Class 9-10">Class 9-10 (High School)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">YouTube Embed Link</label>
                      <input
                        type="url" required
                        value={newLessonForm.videoURL}
                        onChange={(e) => setNewLessonForm({ ...newLessonForm, videoURL: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-250 dark:border-slate-800 bg-transparent dark:text-white focus:outline-none focus:border-teal-505"
                        placeholder="e.g. https://www.youtube.com/embed/n0FZhQ_GkKw"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-teal-550 hover:bg-teal-600 text-white font-extrabold rounded-xl shadow-lg transition-all"
                    >
                      Publish Lesson to LMS
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        /* HOMEPAGE REDESIGN CONTENT */
        <>

          {/* SECTION 1: HERO & IMPACT SHOWCASE */}
          <Hero
            onDonateClick={() => setIsDonateOpen(true)}
            onVolunteerClick={(e) => scrollToSection(e, 'volunteer')}
            onImpactReportClick={(e) => scrollToSection(e, 'timeline')}
          />

          {/* ABOUT SECTION (Timeline Origin and Founder quote) */}
          <section id="about" ref={aboutRef} className="py-24 bg-[#f7fafc] dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className={`relative transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a365d] to-[#dd6b20] rounded-3xl transform rotate-3 scale-102 opacity-10"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-900">
                    <img
                      src="/children_education_ngo.png"
                      alt="Children learning outdoors"
                      className="w-full h-auto object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 py-4 rounded-2xl shadow-lg flex items-center space-x-4">
                      <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 text-[#dd6b20] rounded-xl">
                        <Heart className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1a365d] dark:text-white">UP Govt. Registered</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">12A & 80G Compliant NGO</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex flex-col justify-center transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
                  <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">WHO WE ARE</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1a365d] dark:text-white tracking-tight mb-6 leading-tight">
                    Think global, <br />
                    <span className="bg-gradient-to-r from-[#1a365d] to-[#dd6b20] bg-clip-text text-transparent">Act local.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-650 dark:text-slate-305 mb-6 leading-relaxed">
                    NayePankh Foundation is a registered student-led organization. We operate daily drives for warm meals, clinical care, menstrual health, and digital literacy.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsCertificatesOpen(true)}
                      className="px-6 py-3.5 bg-[#1a365d] hover:bg-[#152c4f] text-white font-extrabold rounded-xl transition-all duration-300"
                    >
                      Our Certificates
                    </button>
                    <button
                      onClick={() => setIsNewspaperOpen(true)}
                      className="px-6 py-3.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 font-extrabold rounded-xl transition-all duration-300"
                    >
                      Press Recognition
                    </button>
                  </div>
                </div>
              </div>

              {/* History Details */}
              <div className="grid md:grid-cols-2 gap-12 items-start pt-12 border-t border-slate-200 dark:border-slate-850">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#1a365d] dark:text-white">How it started?</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-sans">
                    2020 was a year the world was striving to survive COVID-19. During these dire times we felt an urge to help with whatever resources we could arrange. We started off as a group of highschoolers but now we are a team of numerous student volunteers from different parts of the country. On <strong>28th March 2021</strong>, we officially landed on the ground to serve our duties as the youth of India.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-[#1a365d] dark:text-white">What is NayePankh?</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-sans">
                    "NayePankh" represents <strong>giving wings to uplift the underprivileged</strong>. We are one of the eminent youth-led organizations in India. We distribute porridge to tackle hunger, supply sanitary napkins to slum outreach segments to support menstrual wellness, and run local learning cells. Till date, we have helped over <strong>2 lakh underprivileged people</strong>.
                  </p>
                </div>
              </div>

              {/* Founder quote */}
              <div className="mt-20 bg-gradient-to-r from-orange-500/5 to-blue-500/5 border border-slate-200 dark:border-slate-850 p-8 sm:p-12 rounded-[24px] text-center max-w-4xl mx-auto">
                <span className="text-4xl text-[#dd6b20] block mb-4">“</span>
                <p className="text-lg sm:text-xl font-bold text-[#1a365d] dark:text-slate-200 mb-6 italic leading-relaxed font-sans">
                  If we all do something, then together there is no problem that we cannot solve!
                </p>
                <div>
                  <h4 className="font-extrabold text-[#1a365d] dark:text-white tracking-tight uppercase text-sm">Prashant Shukla</h4>
                  <p className="text-xs text-[#dd6b20] font-bold mt-1">Founder & President, NayePankh Foundation</p>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 6: IMPACTSPHERE DASHBOARD */}
          <ImpactSphere />

          {/* SECTION 3: DONATION PROGRESS TRACKER */}
          <DonationTracker onDonateClick={triggerDonationFlow} />

          {/* SECTION 4: SUCCESS STORIES */}
          <SuccessStories />

          {/* SECTION 9: TESTIMONIALS CAROUSEL */}
          <Testimonials />

          {/* SECTION 10: EVENTS & CAMPAIGNS */}
          <Events />

          {/* SECTION 5: VOLUNTEER REGISTRATION PORTAL */}
          <VolunteerPortal />

          {/* SECTION 2: FIXED STICKY DONATION TRAY */}
          <DonationTray onDonateExecute={triggerDonationFlow} />

        </>
      )}

      {/* SECTION 11: AI SUPPORT ASSISTANT */}
      <AISupport />

      {/* ==========================================
          CONTACT / FOOTER SECTION
          ========================================== */}
      <footer id="contact" className="bg-[#1a365d] text-blue-250 py-16 border-t border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-4 gap-12 mb-16">

            {/* Column 1: Brand */}
            <div className="flex flex-col space-y-4">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white group">
                <div className="bg-[#dd6b20] text-white p-1.5 rounded-lg">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <span>Nayepankh</span>
              </a>
              <p className="text-sm text-blue-100/70 leading-relaxed">
                NayePankh Foundation is a UP Government registered NGO led by the youth of India, helping over 2 lakh people across Kanpur, Ghaziabad, Noida, and Delhi.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://www.facebook.com/nayepankhfoundation" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.instagram.com/nayepankhfoundation" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/company/nayepankh" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href="https://x.com/nayepankh" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@nayepankhfoundation" className="hover:text-white transition-colors" aria-label="YouTube"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors">Home Page</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#impactsphere" onClick={(e) => scrollToSection(e, 'impactsphere')} className="hover:text-white transition-colors">ImpactSphere Dashboard</a></li>
                <li><button onClick={() => setIsNewspaperOpen(true)} className="hover:text-white transition-colors text-left">Newspaper Recognition</button></li>
                <li><button onClick={() => { setNayeShikshaActive(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors text-left">Naye Shiksha LMS</button></li>
              </ul>
            </div>

            {/* Column 3: Legal Policies */}
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Policies</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation and Refund</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping and Exchange</a></li>
                <li><button onClick={() => setIsCertificatesOpen(true)} className="hover:text-white transition-colors">Our Certificates</button></li>
              </ul>
            </div>

            {/* Column 4: Contact Details */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Contact Us</h4>

              <div className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-[#dd6b20] shrink-0 mt-0.5" />
                <span className="break-all text-blue-100">contact@nayepankh.com</span>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-[#dd6b20] shrink-0 mt-0.5" />
                <span className="text-blue-100">+91 8318500748</span>
              </div>

              <div className="text-xs text-blue-100/70 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#dd6b20] shrink-0 mt-0.5" />
                <span>Operations extended in Kanpur, Ghaziabad, Lucknow, Noida, and Delhi.</span>
              </div>
            </div>

          </div>

          <div className="border-t border-blue-900/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-300">
            <p>© {new Date().getFullYear()} NayePankh Foundation. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Registered NGO under Sec 8 of Indian Companies Act, 2013 (UIN: U85300DL2021NPL384910)</p>
          </div>

        </div>
      </footer>

      {/* ==========================================
          DONATION TRANSACTION MODAL
          ========================================== */}
      {isDonateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDonateOpen(false)}></div>

          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-805 transform scale-100 transition-transform animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {donateSubmitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-105 dark:bg-teal-500/20 text-teal-600 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Donation Successful!</h3>
                <p className="text-slate-605 dark:text-slate-305 max-w-sm mb-6 font-medium">
                  Thank you! Your donation of <strong>₹{donateForm.amount === 'custom' ? donateForm.customAmount : donateForm.amount}</strong> to <strong>{donateForm.cause}</strong> has been processed. A tax exemption receipt has been emailed.
                </p>

                <div className="w-full bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl text-left text-sm space-y-2 font-medium border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between"><span className="text-slate-400 font-bold text-xs uppercase">Donor Name:</span> <span className="text-slate-900 dark:text-white">{donateForm.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-bold text-xs uppercase">PAN Card:</span> <span className="text-slate-900 dark:text-white uppercase">{donateForm.pan || 'N/A'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-bold text-xs uppercase">Receipt No:</span> <span className="text-slate-900 dark:text-white font-mono">NP-SEC8-{Math.floor(Math.random() * 899999) + 100000}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-bold text-xs uppercase">Tax Benefit status:</span> <span className="text-green-500 font-bold">Eligible (80G Exemption Benefit)</span></div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Empower Communities</h3>
                  <p className="text-sm text-slate-505 dark:text-slate-400">All donations qualify for 50% Tax Exemption under Sec 80G.</p>
                </div>

                <form onSubmit={handleDonateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-2">Support Amount (INR)</label>

                    {donateForm.amount === 'custom' ? (
                      <input
                        type="number" required min="10" name="customAmount" value={donateForm.customAmount} onChange={handleDonateChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-355 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-orange-505"
                      />
                    ) : (
                      <div className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-extrabold text-slate-900 dark:text-white text-lg">
                        ₹ {donateForm.amount}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text" required name="name" value={donateForm.name} onChange={handleDonateChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-1">Email ID</label>
                      <input
                        type="email" required name="email" value={donateForm.email} onChange={handleDonateChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-1">PAN Card (Optional)</label>
                      <input
                        type="text" name="pan" value={donateForm.pan} onChange={handleDonateChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-1">Support Program</label>
                      <select
                        name="cause" value={donateForm.cause} onChange={handleDonateChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                      >
                        <option value="General Funds">General Core Funds</option>
                        <option value="Education Program">Naye Shiksha digital programs</option>
                        <option value="Meal Services">Nutrition Porridge Drives</option>
                        <option value="Medical Health">Emergency Healthcare Clinics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-505 dark:text-slate-400 mb-2">Mode of Donation</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['UPI', 'Card', 'NetBanking'].map((m) => (
                        <label key={m} className={`flex items-center justify-center py-2.5 border rounded-xl cursor-pointer select-none text-xs font-semibold transition-all duration-200 ${donateForm.method === m ? 'border-[#dd6b20] text-[#dd6b20] bg-orange-50/10 font-black' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-505'}`}>
                          <input
                            type="radio" name="method" value={m} checked={donateForm.method === m} onChange={handleDonateChange}
                            className="sr-only"
                          />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#dd6b20] hover:bg-[#c05621] text-white font-extrabold rounded-xl shadow-lg transition-all duration-200 mt-2"
                  >
                    Donate (Secure Gateway)
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          CERTIFICATES MODAL (LIGHTBOX)
          ========================================== */}
      {isCertificatesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCertificatesOpen(false)}></div>

          <div className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800 transform scale-100 transition-transform animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCertificatesOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Our Certificates</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Verifiable corporate registration and income tax exemption certificates.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-855 p-6 rounded-2xl border-2 border-double border-slate-200 dark:border-slate-700 text-center flex flex-col justify-between h-80">
                <div className="flex flex-col items-center">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase">Section 8 Certificate</h4>
                  <p className="text-xs text-slate-505 mt-1 font-medium">Charitable Non-Profit Incorporation</p>
                </div>

                <div className="my-4 border-y border-dashed border-slate-300 dark:border-slate-600 py-3 text-xs space-y-1 font-mono text-slate-650 dark:text-slate-400">
                  <div>Company No: U85300DL2021NPL384910</div>
                  <div>Issued by: Registrar of Companies, Delhi</div>
                  <div>Date of Registration: 12th August, 2021</div>
                </div>

                <div className="text-[10px] text-slate-405 font-bold uppercase">Approved by Ministry of Corporate Affairs, Gov. of India</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-855 p-6 rounded-2xl border-2 border-double border-slate-200 dark:border-slate-700 text-center flex flex-col justify-between h-80">
                <div className="flex flex-col items-center">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white uppercase">80G & 12A Exemptions</h4>
                  <p className="text-xs text-slate-505 mt-1 font-medium">Income Tax Department Exemption Approval</p>
                </div>

                <div className="my-4 border-y border-dashed border-slate-300 dark:border-slate-600 py-3 text-xs space-y-1 font-mono text-slate-650 dark:text-slate-400">
                  <div>Order No: ITD-DEL-80G-2022-8921</div>
                  <div>Exemption Status: Active Indefinitely</div>
                  <div>Tax Deduction: 50% under Section 80G</div>
                </div>

                <div className="text-[10px] text-slate-405 font-bold uppercase">Issued by Chief Commissioner of Income Tax, India</div>
              </div>
            </div>

            <button
              onClick={() => setIsCertificatesOpen(false)}
              className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-805 dark:text-white font-extrabold rounded-xl transition-all duration-200 text-center block text-sm"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          NEWSPAPER RECOGNITION MODAL (LIGHTBOX)
          ========================================== */}
      {isNewspaperOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setIsNewspaperOpen(false)}></div>

          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800 transform scale-100 transition-transform animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewspaperOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <div className="flex items-center space-x-2 text-teal-605 dark:text-teal-400 mb-2">
                <Newspaper className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">MEDIA EXPOSURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Newspaper Recognition</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Leading publications covering our grassroots efforts and lockdowns support programs.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Clip 1 */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-250 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black tracking-wider text-orange-500 uppercase">Dainik Jagran</span>
                    <span className="text-[10px] text-slate-405 dark:text-slate-500 font-bold">April 2021</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">युवाओं ने बढ़ाए मदद के हाथ, जरूरतमंदों को बांटा राशन</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    कानपुर में कक्षा 12 के छात्रों द्वारा शुरू किए गए नएपंख फाउंडेशन ने महामारी के दौरान 500 से अधिक परिवारों को सूखा राशन, मास्क और सैनिटाइजर वितरित किए।
                  </p>
                </div>
              </div>

              {/* Clip 2 */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-255 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black tracking-wider text-orange-500 uppercase">Hindustan Times</span>
                    <span className="text-[10px] text-slate-405 dark:text-slate-555 font-bold">October 2021</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Student-Led NayePankh Focus on Menstrual Hygiene in Ghaziabad Slums</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    Distributed over 10,000 biodegradable sanitary napkins and held interactive awareness workshops to remove social taboos surrounding menstruation.
                  </p>
                </div>
              </div>

              {/* Clip 3 */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-250 dark:border-slate-805 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black tracking-wider text-orange-505 uppercase">Amar Ujala</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">January 2022</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">नएपंख फाउंडेशन ने झुग्गी-झोपड़ी के बच्चों के लिए शुरू की डिजिटल पाठशाला</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    ग़ाज़ियाबाद और कानपुर के शिक्षा केंद्रों में बच्चों को टैबलेट और ऑनलाइन कोर्स से लैस कर आधुनिक शिक्षा दी जा रही है।
                  </p>
                </div>
              </div>

              {/* Clip 4 */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-250 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black tracking-wider text-orange-500 uppercase">The Times of India</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">July 2023</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Youth-Led NGO Crosses 2 Lakh Beneficiaries Across Uttar Pradesh</h4>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    Founder Prashant Shukla noted that the mission is completely powered by student volunteers from colleges and high schools, proving the capability of Indian youth.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsNewspaperOpen(false)}
              className="mt-8 w-full py-3 bg-slate-100 dark:bg-slate-800 dark:text-white font-extrabold rounded-xl transition-all duration-200 text-center block text-sm"
            >
              Close Gallery
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          VIDEO LESSON PLAYER MODAL
          ========================================== */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedLesson(null)}></div>

          <div className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-805 transform scale-100 transition-transform animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLesson(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-505 bg-teal-500/10 px-2.5 py-1 rounded-full mb-2 inline-block">
                {selectedLesson.category} • {selectedLesson.targetClass}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedLesson.title}</h3>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-250 dark:border-slate-800 bg-black mb-6">
              <iframe
                src={selectedLesson.videoURL}
                title={selectedLesson.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
              <span>Class duration: {selectedLesson.duration}</span>
              <span className="text-teal-505 font-bold">Naye Shiksha LMS Courseware</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
