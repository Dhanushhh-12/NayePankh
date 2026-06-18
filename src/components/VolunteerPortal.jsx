import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, Sparkles, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function VolunteerPortal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', skills: '', cause: 'Education', message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email ID is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
        newErrors.phone = "Phone number must be exactly 10 digits";
      }
    } else if (currentStep === 2) {
      if (!formData.college.trim()) newErrors.college = "College / University name is required";
      if (!formData.skills.trim()) newErrors.skills = "Please list at least one skill or capability";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      fetch('http://localhost:5001/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(() => {
          setIsSubmitted(true);
        })
        .catch(err => {
          console.error("Error submitting volunteer form:", err);
          setIsSubmitted(true);
        });
    }
  };

  return (
    <section id="volunteer" className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">GET INVOLVED</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">Become a Volunteer Teacher or Coordinator</h2>
          <p className="text-base text-slate-550 dark:text-slate-400">
            Join thousands of youth mentors using their skills to guide underprivileged children across India.
          </p>
        </div>

        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-black text-[#1a365d] dark:text-white mb-3">Onboarding Application Submitted!</h3>
              <p className="text-slate-600 dark:text-slate-350 max-w-lg mb-8 leading-relaxed font-medium">
                Thank you, <strong>{formData.name}</strong>! Your application is submitted. Our regional coordinators will contact you over WhatsApp and email at <strong>{formData.email}</strong> within 48 hours.
              </p>

              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl text-left text-xs space-y-2 font-medium border border-slate-200/50 dark:border-slate-800 max-w-md w-full">
                <div className="flex justify-between"><span className="text-slate-400 font-bold uppercase tracking-wider">Chapter Allocation:</span> <span className="text-slate-900 dark:text-white font-extrabold">{formData.college} Hub</span></div>
                <div className="flex justify-between"><span className="text-slate-400 font-bold uppercase tracking-wider">Preferred Area:</span> <span className="text-slate-900 dark:text-white font-extrabold">{formData.cause} Support</span></div>
                <div className="flex justify-between"><span className="text-slate-400 font-bold uppercase tracking-wider">Onboarding Code:</span> <span className="text-slate-900 dark:text-white font-mono">NP-VOL-{Math.floor(Math.random() * 89999) + 10000}</span></div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              
              <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-1"></div>
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black relative z-10 border-2 transition-all ${
                      step >= s 
                        ? 'bg-[#1a365d] border-[#1a365d] text-white' 
                        : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
                    }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                ))}
              </div>

              
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-black text-[#1a365d] dark:text-white border-b pb-2">Step 1: Contact Information</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                      <input 
                        type="text" required name="name" value={formData.name} onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                      />
                      {errors.name && <span className="text-red-550 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5" /> <span>{errors.name}</span></span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                      <input 
                        type="email" required name="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                      />
                      {errors.email && <span className="text-red-550 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5" /> <span>{errors.email}</span></span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Mobile Phone (WhatsApp preferred)</label>
                    <input 
                      type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                    />
                    {errors.phone && <span className="text-red-550 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5" /> <span>{errors.phone}</span></span>}
                  </div>
                </motion.div>
              )}

              
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-black text-[#1a365d] dark:text-white border-b pb-2">Step 2: Educational & Professional details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">College / University Name</label>
                    <input 
                      type="text" required name="college" value={formData.college} onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] ${errors.college ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                    />
                    {errors.college && <span className="text-red-550 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5" /> <span>{errors.college}</span></span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Your Core Skills / Area of Studies</label>
                    <input 
                      type="text" required name="skills" value={formData.skills} onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] ${errors.skills ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                    />
                    {errors.skills && <span className="text-red-550 text-xs mt-1 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5" /> <span>{errors.skills}</span></span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Resume Description / Paste Link (Google Drive / LinkedIn)</label>
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                    />
                  </div>
                </motion.div>
              )}

              
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-black text-[#1a365d] dark:text-white border-b pb-2">Step 3: Support Preferences</h3>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Preferred Supporting Cause</label>
                    <select 
                      name="cause" value={formData.cause} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                    >
                      <option value="Education">Naye Shiksha Digital Portal Teaching</option>
                      <option value="Meal drives">Daily Meal Porridge Distribution coordinator</option>
                      <option value="Menstrual Health">Menstrual Hygiene Awareness workshops coordinator</option>
                      <option value="Youth coordination">College Campus chapter mobilization representative</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-805 space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-400">Review Application Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><span className="text-slate-400">Name:</span> <p className="font-bold text-slate-900 dark:text-white">{formData.name}</p></div>
                      <div><span className="text-slate-400">Email:</span> <p className="font-bold text-slate-900 dark:text-white">{formData.email}</p></div>
                      <div><span className="text-slate-400">Chapter:</span> <p className="font-bold text-slate-900 dark:text-white">{formData.college}</p></div>
                      <div><span className="text-slate-400">Skills:</span> <p className="font-bold text-slate-900 dark:text-white">{formData.skills}</p></div>
                    </div>
                  </div>
                </motion.div>
              )}

              
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <button 
                    type="button" onClick={handlePrev}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 dark:text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button 
                    type="button" onClick={handleNext}
                    className="px-6 py-2.5 bg-[#1a365d] text-white hover:bg-[#152c4f] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-8 py-2.5 bg-[#dd6b20] hover:bg-[#c05621] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-orange-500/10"
                  >
                    Submit Application
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
