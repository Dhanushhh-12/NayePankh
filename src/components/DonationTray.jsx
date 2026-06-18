import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, ChevronRight } from 'lucide-react';

export default function DonationTray({ onDonateExecute }) {
  const [selectedAmount, setSelectedAmount] = useState('500');
  const [customVal, setCustomVal] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = selectedAmount === 'custom' ? customVal : selectedAmount;
    if (!val || parseFloat(val) <= 0) return;
    onDonateExecute(val);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-45 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Toggle Collapse Tab */}
        <div className="flex justify-end pr-6 -mb-1 relative z-10 pointer-events-auto">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-[#1a365d] text-white hover:bg-[#152c4f] px-3.5 py-1.5 rounded-t-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-1.5 shadow-md transition-colors"
            aria-label={isCollapsed ? "Expand donation bar" : "Collapse donation bar"}
          >
            <Gift className="w-3.5 h-3.5 animate-pulse" />
            <span>{isCollapsed ? 'Support Us' : 'Minimize'}</span>
          </button>
        </div>

        {/* Donation Tray Bar */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl py-3.5 px-4 sm:px-6 rounded-t-2xl pointer-events-auto border-x border-slate-200/50 dark:border-slate-800/50"
            >
              <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-between gap-4">
                
                {/* Text and Labels */}
                <div className="flex items-center space-x-3 text-center lg:text-left">
                  <span className="p-2 bg-orange-100 dark:bg-orange-500/20 text-[#dd6b20] rounded-xl hidden sm:inline-block">
                    <Heart className="w-5 h-5 fill-current" />
                  </span>
                  <div>
                    <div className="text-sm font-black text-[#1a365d] dark:text-white leading-tight">Fast Tax Exemption Support</div>
                    <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center lg:justify-start space-x-1 mt-0.5">
                      <span>🔒 Secure Checkout</span>
                      <span>•</span>
                      <span>Instant 80G Tax-Exemption Certificate Generated</span>
                    </div>
                  </div>
                </div>

                {/* Amount Chips Selection */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['200', '500', '1000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`px-4.5 py-2 text-xs font-black rounded-lg border transition-all ${
                        selectedAmount === amt 
                          ? 'bg-[#1a365d] border-[#1a365d] text-white' 
                          : 'bg-white border-slate-350 text-slate-650 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={`px-4 py-2 text-xs font-black rounded-lg border transition-all ${
                      selectedAmount === 'custom' 
                        ? 'bg-[#1a365d] border-[#1a365d] text-white' 
                        : 'bg-white border-slate-300 text-slate-650 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Custom
                  </button>

                  {selectedAmount === 'custom' && (
                    <motion.input 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 110, opacity: 1 }}
                      type="number"
                      required
                      min="10"
                      placeholder="Amount in ₹"
                      value={customVal}
                      onChange={(e) => setCustomVal(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 dark:border-slate-750 rounded-lg text-xs bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20]"
                    />
                  )}
                </div>

                {/* Execute Button */}
                <button
                  type="submit"
                  className="w-full lg:w-auto px-7 py-2.5 bg-[#dd6b20] hover:bg-[#c05621] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Donate Now</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
