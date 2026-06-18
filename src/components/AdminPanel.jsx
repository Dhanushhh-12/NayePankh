import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ShieldCheck, Lock, Unlock, TrendingUp, Users, 
  Heart, Calendar, RefreshCw, Check 
} from 'lucide-react';

export default function AdminPanel() {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const monthlyData = [
    { name: 'Jan', donations: 0, volunteers: 0 },
    { name: 'Feb', donations: 0, volunteers: 0 },
    { name: 'Mar', donations: 0, volunteers: 0 },
    { name: 'Apr', donations: 0, volunteers: 0 },
    { name: 'May', donations: 0, volunteers: 0 },
    { name: 'Jun', donations: 0, volunteers: 0 }
  ];

  const volunteerList = [
    { id: 1, name: "Amit Kumar", college: "IIT Kanpur", cause: "Education", status: "Approved" },
    { id: 2, name: "Priya Sen", college: "Delhi University", cause: "Meal Drives", status: "Pending" },
    { id: 3, name: "Rohan Das", college: "REVA University", cause: "Healthcare", status: "Approved" }
  ];

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passkey === 'admin123') {
      setIsAdminUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Admin Passkey. Hint: admin123');
    }
  };

  return (
    <section id="admin" className="py-24 bg-[#f7fafc] dark:bg-slate-900/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dd6b20] font-extrabold text-sm uppercase tracking-widest mb-3 block">MANAGEMENT CORE</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a365d] dark:text-white mb-6 tracking-tight">NGO Admin Panel Dashboard</h2>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400">
            Secure tracking of donations, volunteers validation, and campaign growth analysis.
          </p>
        </div>

        {!isAdminUnlocked ? (
          /* Locked State Lockscreen */
          <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/10 text-[#dd6b20] rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-black text-[#1a365d] dark:text-white mb-2">Admin Dashboard Locked</h3>
            <p className="text-xs text-slate-400 mb-6">Enter secure credentials to inspect private analytics and volunteer registries.</p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input 
                type="password"
                placeholder="Enter Admin Key (admin123)"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:border-[#dd6b20] text-center text-sm"
              />
              
              {errorMsg && <p className="text-red-550 text-xs font-bold">{errorMsg}</p>}

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#1a365d] hover:bg-[#152c4f] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Panel */
          <div className="space-y-8 animate-fade-in">
            
            
            <div className="flex justify-between items-center bg-[#1a365d] text-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3">
                <Unlock className="w-5 h-5 text-[#dd6b20]" />
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider leading-none">Security Access Granted</h3>
                  <span className="text-[10px] text-orange-200">Registered non-profit auditor active</span>
                </div>
              </div>

              <button 
                onClick={() => { setIsAdminUnlocked(false); setPasskey(''); }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold rounded-lg transition-colors"
              >
                Lock Session
              </button>
            </div>

            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Donations</span>
                <div className="text-2xl font-black text-[#1a365d] dark:text-white mt-1">₹0</div>
                <div className="text-[10px] text-green-500 font-bold mt-1.5 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+0% Growth</span>
                </div>
              </div>

              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Active Volunteers</span>
                <div className="text-2xl font-black text-[#1a365d] dark:text-white mt-1">0 Students</div>
                <div className="text-[10px] text-green-500 font-bold mt-1.5 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+0 Chapters</span>
                </div>
              </div>

              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Exemption Invoices</span>
                <div className="text-2xl font-black text-[#1a365d] dark:text-white mt-1">0 receipts</div>
                <div className="text-[10px] text-slate-400 font-bold mt-1.5">100% Tax Compliant</div>
              </div>

              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Meals Dispatched</span>
                <div className="text-2xl font-black text-[#1a365d] dark:text-white mt-1">0</div>
                <div className="text-[10px] text-orange-500 font-bold mt-1.5">Verified Logs</div>
              </div>

            </div>

            
            <div className="grid lg:grid-cols-2 gap-8">
              
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="text-sm font-bold text-[#1a365d] dark:text-white mb-4">Monthly Donation Growth (INR)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#a0aec0" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#a0aec0" style={{ fontSize: '10px' }} />
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Line type="monotone" dataKey="donations" stroke="#dd6b20" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              
              <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="text-sm font-bold text-[#1a365d] dark:text-white mb-4">Monthly Volunteer Chapters Expansion</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#a0aec0" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#a0aec0" style={{ fontSize: '10px' }} />
                      <Tooltip />
                      <Bar dataKey="volunteers" fill="#1a365d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 dark:border-slate-850">
                <h3 className="text-sm font-bold text-[#1a365d] dark:text-white">Pending Volunteer Registrations</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold uppercase">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Chapter / College</th>
                      <th className="p-4">Cause Area</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850 font-medium">
                    {volunteerList.map((vol) => (
                      <tr key={vol.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                        <td className="p-4 font-bold text-slate-900 dark:text-white">{vol.name}</td>
                        <td className="p-4 text-slate-500">{vol.college}</td>
                        <td className="p-4 text-slate-500">{vol.cause}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${vol.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {vol.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => alert(`${vol.name}'s coordinator account is approved.`)}
                            className="text-green-550 hover:text-green-600 font-bold mr-3"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
