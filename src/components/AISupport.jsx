import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Heart, Info, HelpCircle } from 'lucide-react';

export default function AISupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! Welcome to NayePankh Foundation Support. How can I help you today? Feel free to click on one of the quick topics below."
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const quickReplies = [
    { label: "How to Donate?", value: "donate" },
    { label: "80G Tax Exemption?", value: "tax" },
    { label: "Become a Volunteer?", value: "volunteer" },
    { label: "Is NayePankh Govt. Registered?", value: "reg" }
  ];

  const handleQuickClick = (reply) => {
    // Add user message
    const userMsg = { id: Date.now(), sender: "user", text: reply.label };
    let botResponse = "";

    if (reply.value === "donate") {
      botResponse = "To support our campaigns, simply click the orange 'Donate Now' button in the header or use the bottom-fixed micro-donation tray. We accept UPI, Cards, and NetBanking via our secure payment gateway.";
    } else if (reply.value === "tax") {
      botResponse = "Yes! NayePankh Foundation is registered under Section 12A and 80G. All contributions qualify for a 50% income tax exemption. An instant certificate receipt is generated and emailed upon checkout completion.";
    } else if (reply.value === "volunteer") {
      botResponse = "We welcome student volunteer mentors and coordinators! Scroll down to the 'Become a Volunteer' form, fill out your campus details, select your preferred cause, and our coordinators will reach out.";
    } else if (reply.value === "reg") {
      botResponse = "NayePankh Foundation is a government-registered Section 8 non-profit company (UIN: U85300DL2021NPL384910). We comply with all Indian Ministry of Corporate Affairs regulations and operate transparent audited drives.";
    }

    const botMsg = { id: Date.now() + 1, sender: "bot", text: botResponse };
    setMessages([...messages, userMsg, botMsg]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: userInput };
    let botResponse = "Thank you for reaching out! For specific inquiries on partnerships or offline check donations, please drop an email directly at contact@nayepankh.com or call us at +91 8318500748.";

    // Simple keyword matching
    const query = userInput.toLowerCase();
    if (query.includes("donate") || query.includes("money") || query.includes("fund")) {
      botResponse = "You can securely donate via UPI, NetBanking, or Cards by clicking the 'Donate Now' button. All donations are eligible for 80G tax benefits.";
    } else if (query.includes("volunteer") || query.includes("join") || query.includes("intern")) {
      botResponse = "Please fill out our volunteer application form on the page to register. Our college outreach leads will get back to you soon!";
    } else if (query.includes("tax") || query.includes("80g") || query.includes("12a") || query.includes("receipt")) {
      botResponse = "Yes! All donors receive instant Sec 80G tax exemption certificates on their registered email ids immediately after completing the payment checkout.";
    }

    const botMsg = { id: Date.now() + 1, sender: "bot", text: botResponse };
    setMessages([...messages, userMsg, botMsg]);
    setUserInput('');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      
      {/* Expandable Conversation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-[320px] sm:w-[360px] h-[450px] overflow-hidden flex flex-col justify-between mb-4"
          >
            {/* Header */}
            <div className="bg-[#1a365d] text-white p-4.5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-[#dd6b20] p-1.5 rounded-lg text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider leading-none">NayePankh Bot</h4>
                  <span className="text-[9px] text-orange-200 font-bold">Online Exemption Support</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1 hover:bg-white/10 rounded-full"
                aria-label="Close support chat panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${msg.sender === 'user' ? 'bg-[#dd6b20] text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/40 dark:border-slate-700/50'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-850 flex flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-950">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  type="button"
                  onClick={() => handleQuickClick(qr)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-[9px] font-bold rounded-lg transition-colors text-slate-650 dark:text-slate-350"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-150 dark:border-slate-805 flex items-center space-x-2">
              <input 
                type="text"
                placeholder="Ask NayePankh support..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] text-xs"
              />
              <button 
                type="submit"
                className="bg-[#1a365d] text-white hover:bg-[#152c4f] p-2 rounded-xl transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#dd6b20] hover:bg-[#c05621] text-white p-4.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group"
        aria-label="Open support chat panel assistant"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-2.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Exemption Support Bot
        </span>
      </button>

    </div>
  );
}
