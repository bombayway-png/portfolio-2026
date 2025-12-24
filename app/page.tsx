"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Linkedin, Calendar, FileText, Zap, Clock 
} from 'lucide-react';

// --- Configuration ---
const CALENDLY_BASE_URL = "https://calendly.com/adamseumae/architecture-discovery";

type FilterState = 'intake' | 'review' | null;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- Form Memory State ---
  const [formData, setFormData] = useState({ 
    name: '', email: '', company: '', description: '' 
  });

  // --- Dynamic Calendly Injection ---
  const generateCalendlyUrl = () => {
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      // Mapping to Calendly custom questions (Check IDs in your dashboard)
      'a1': `Bottleneck: ${formData.description}` 
    });
    return `${CALENDLY_BASE_URL}?${params.toString()}`;
  };

  const handleInitialSubmit = async () => {
    setIsSubmitting(true);
    // Simulate Synthesis Rigor
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveFilter('review');
  };

  const inputClasses = "w-full text-xl md:text-2xl font-semibold text-slate-900 border-b-2 border-slate-200 focus:border-blue-600 outline-none py-3 bg-transparent placeholder:text-slate-400 transition-colors appearance-none cursor-text";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* --- Sticky Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] md:text-xs">AS</span>
            </div>
            <span className="text-xs md:text-base tracking-tighter">AI Product Architect</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/adamseumae/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Linkedin size={20} />
            </a>
            <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-[10px] md:text-sm uppercase italic">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24">
        {/* --- Hero Section --- */}
        <section className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-16 md:mb-24 text-center md:text-left">
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase text-slate-900">
              I Architect Apps. <br /> I Build Backends. <br />
              <span className="text-blue-600">I Deploy AI Agents.</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black text-[10px] md:text-xs uppercase italic tracking-widest mb-6">
               <Clock size={16} /> Strategic Availability: Post-3PM & Weekends
            </div>
            <p className="text-lg md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-10 leading-relaxed mx-auto md:mx-0 text-balance">
              Bridging the gap between Enterprise Strategy and Code. Leveraging 10+ years at <strong>Amazon, AWS, and Microsoft</strong>.
            </p>
            <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-all shadow-xl shadow-blue-100 italic uppercase">
              Start Building
            </button>
          </div>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl grayscale order-1 md:order-2">
             <Image src="/headshot.jpeg" alt="Adam Seumae" fill className="object-cover" priority />
          </div>
        </section>
      </main>

      {/* --- Unified Portal Modal --- */}
      <AnimatePresence mode="wait">
        {activeFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12 md:py-20 relative text-left">
              <button onClick={() => setActiveFilter(null)} className="absolute top-0 right-0 p-3 md:p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-900"><X size={24} /></button>
              
              {activeFilter === 'intake' ? (
                <div className="text-slate-900">
                  <h2 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 uppercase tracking-tighter text-slate-900">Customer Intake</h2>
                  <form className="space-y-8 md:space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-slate-900">
                        <div className="space-y-3">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Full Name</label>
                           <input className={inputClasses} placeholder="John Smith" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Business Email</label>
                           <input className={inputClasses} placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Operational Bottleneck</label>
                        <textarea rows={3} className={inputClasses} placeholder="Describe the friction..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                     </div>
                    <button type="button" onClick={handleInitialSubmit} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 md:py-8 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-black italic uppercase shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                      {isSubmitting ? "Synthesizing Requirements..." : "Generate Briefing Card"}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-left space-y-12">
                  {/* --- Technical Briefing Card --- */}
                  <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><FileText size={120} /></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-400 mb-8 italic">Architecture Briefing Card</h2>
                    
                    <div className="space-y-8 relative z-10">
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">Architectural Lead</p>
                        <p className="text-3xl font-black italic uppercase">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">Target Bottleneck</p>
                        <p className="text-xl font-medium italic text-slate-300 leading-relaxed">&quot;{formData.description}&quot;</p>
                      </div>
                      <div className="pt-6 border-t border-slate-800 flex items-center gap-2 text-blue-400 font-bold italic">
                        <Zap size={18} /> Ready for Sync
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 text-slate-900">
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">Synchronize Discovery</h3>
                    <p className="text-lg text-slate-500 italic font-medium">Clicking Approve will move this briefing card data into the scheduled discovery session.</p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a href={generateCalendlyUrl()} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-6 rounded-full text-2xl font-black italic uppercase hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-xl">
                        <Calendar size={28} /> Approve & Schedule
                      </a>
                      <button onClick={() => setActiveFilter('intake')} className="px-10 py-6 rounded-full text-xl font-bold italic uppercase border-2 border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                        Edit Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
