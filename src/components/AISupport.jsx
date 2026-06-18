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
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    { label: "How to Donate?", value: "donate" },
    { label: "80G Tax Exemption?", value: "tax" },
    { label: "Become a Volunteer?", value: "volunteer" },
    { label: "Is NayePankh Govt. Registered?", value: "reg" }
  ];

  const getAIResponse = (query) => {
    const term = query.toLowerCase().trim();

    if (term.includes("donate") || term.includes("donation") || term.includes("money") || term.includes("contribute") || term.includes("fund") || term.includes("pay") || term.includes("sponsor")) {
      return "To support our ongoing work, click the orange 'Donate Now' button in the top navigation bar, or select a micro-donation amount (₹200, ₹500, ₹1000) from the sticky tray at the bottom. We accept secure payments via UPI, Credit/Debit Cards, and NetBanking.";
    }

    if (term.includes("tax") || term.includes("80g") || term.includes("12a") || term.includes("receipt") || term.includes("exemption") || term.includes("deduction") || term.includes("certificate")) {
      return "Yes, NayePankh Foundation is a government-registered Section 8 NGO (UIN: U85300DL2021NPL384910). All donations qualify for a 50% tax deduction under Section 80G of the Income Tax Act. A formal tax-exemption certificate is instantly generated and sent to your email upon payment confirmation.";
    }

    if (term.includes("volunteer") || term.includes("join") || term.includes("intern") || term.includes("chapters") || term.includes("apply") || term.includes("coordinator") || term.includes("work")) {
      return "We would love to have you! Our student outreach network operates across major college campuses. To join as a volunteer teacher or drive coordinator, please fill out the 3-step 'Become a Volunteer' onboarding form in the Voluntarism section of this page. A regional chapter coordinator will contact you via WhatsApp within 48 hours.";
    }

    if (term.includes("contact") || term.includes("phone") || term.includes("email") || term.includes("address") || term.includes("location") || term.includes("office") || term.includes("where") || term.includes("number")) {
      return "You can reach the NayePankh Foundation team via email at contact@nayepankh.com or by calling/WhatsApping us at +91 8318500748. Our main administrative headquarters is based in Sector 15, Vasundhara, Ghaziabad, UP, India.";
    }

    if (term.includes("food") || term.includes("meal") || term.includes("feed") || term.includes("hungry") || term.includes("drive") || term.includes("porridge")) {
      return "Our daily meal distribution campaigns provide fresh, nutritious porridge and rice dishes to underprivileged children in slum outreach clusters. To date, we have served over 50,000 verified meals. You can sponsor a meal drive directly from our campaigns dashboard!";
    }

    if (term.includes("education") || term.includes("school") || term.includes("teach") || term.includes("study") || term.includes("class") || term.includes("lms") || term.includes("lessons") || term.includes("video")) {
      return "Through our 'Naye Shiksha' Digital School program, we coordinate remote classes and distribute video lessons in Math, English, Science, and Tech. You can toggle the 'Naye Shiksha LMS' portal in the header menu to browse lessons or upload a volunteer lecture.";
    }

    if (term.includes("real") || term.includes("fake") || term.includes("legit") || term.includes("trust") || term.includes("registered") || term.includes("registered under") || term.includes("genuine")) {
      return "NayePankh Foundation is 100% legitimate and registered under Section 8 of the Indian Companies Act, 2013. We are audited annually, and hold active 12A, 80G, and CSR registration certificates. Registration details can be viewed in the 'Exemptions' lightbox from our campaigns list.";
    }

    if (term.includes("founder") || term.includes("president") || term.includes("who started") || term.includes("owner") || term.includes("team") || term.includes("shukla")) {
      return "NayePankh Foundation was founded by Prashant Shukla with the vision of bridging digital learning and meal accessibility gaps in marginalized communities. The organization is powered by a network of over 10,000 student interns and volunteers across India.";
    }

    return "I am the NayePankh Exemption & Onboarding Assistant. You can ask me about: \n• Tax benefits and Section 80G certificates \n• How to make a secure donation \n• Joining a campus volunteer chapter \n• Naye Shiksha digital school lessons \n• Direct phone, WhatsApp & email contact info.";
  };

  const handleQuickClick = (reply) => {
    const userMsg = { id: Date.now(), sender: "user", text: reply.label };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

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

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, sender: "bot", text: botResponse };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: userInput };
    setMessages(prev => [...prev, userMsg]);
    const query = userInput;
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getAIResponse(query);
      const botMsg = { id: Date.now() + 1, sender: "bot", text: botResponse };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-[410px] sm:w-[500px] h-[660px] overflow-hidden flex flex-col justify-between mb-4"
          >
            
            <div className="bg-[#1a365d] text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-[#dd6b20] p-2 rounded-xl text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider leading-none">NayePankh Bot</h4>
                  <span className="text-[10px] text-orange-200 font-bold">Online Exemption Support</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 hover:bg-white/10 rounded-full"
                aria-label="Close support chat panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${msg.sender === 'user' ? 'bg-[#dd6b20] text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/40 dark:border-slate-700/50'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200/40 dark:border-slate-700/50 flex space-x-1.5 items-center">
                    <span className="w-2.5 h-2.5 bg-slate-450 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-slate-450 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-slate-450 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-850 flex flex-wrap gap-2 bg-slate-50 dark:bg-slate-955">
              {quickReplies.map((qr) => (
                <button
                  key={qr.value}
                  type="button"
                  onClick={() => handleQuickClick(qr)}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold rounded-lg transition-colors text-slate-650 dark:text-slate-350"
                >
                  {qr.label}
                </button>
              ))}
            </div>

            
            <form onSubmit={handleSend} className="p-4 border-t border-slate-150 dark:border-slate-850 flex items-center space-x-3">
              <input
                type="text"
                placeholder="Ask NayePankh support..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-850 rounded-xl bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] text-sm"
              />
              <button
                type="submit"
                className="bg-[#1a365d] text-white hover:bg-[#152c4f] p-3 rounded-xl transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#dd6b20] hover:bg-[#c05621] text-white p-6 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group"
        aria-label="Open support chat panel assistant"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Exemption Support Bot
        </span>
      </button>

    </div>
  );
}
