"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type FilterState = 'intake' | null;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const initialFormState = { name: '', email: '', company: '', description: '' };
  const [formData, setFormData] = useState(initialFormState);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Build My Agent Workforce: ${formData.company}`);
    const body = encodeURIComponent(`Full Name: ${formData.name}\nEmail: ${formData.email}\nDescription: ${formData.description}`);
    window.location.href = `mailto:a.seumae@outlook.com?subject=${subject}&body=${body}`;
    setActiveFilter(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">AS</span>
            </div>
            <span>Adam Seumae</span>
          </div>
          <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase italic">
            Build My Agent Workforce
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-24 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 italic uppercase">
          Scale Your Operations. <br />
          <span className="text-blue-600">Remove the &quot;Human.&quot;</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl font-medium italic mb-12">
          Deploy intelligent agentic engines to automate complex workflows. Architected by an expert with 10+ years at <strong>Amazon, AWS, and Microsoft</strong>.
        </p>

        {/* Restore Headshot Component */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden shadow-2xl grayscale mb-12 mx-auto md:mx-0">
          <Image src="/headshot.jpg" alt="Adam Seumae" fill className="object-cover" priority />
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 opacity-30 grayscale border-t border-slate-100 pt-12 italic font-black text-2xl tracking-tighter uppercase">
          <span>Amazon</span><span>AWS</span><span>Microsoft</span><span>Xbox</span><span>Blizzard</span><span>Airloom AI</span>
        </div>
      </main>

      <AnimatePresence>
        {activeFilter === 'intake' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-20 relative">
              <button onClick={() => setActiveFilter(null)} className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                <X size={32}/>
              </button>
              <h2 className="text-6xl font-black italic mb-12 uppercase italic">Intake Phase</h2>
              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Your Name</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Company</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-4 text-left">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-600">Bottleneck Description</label>
                  <textarea rows={4} className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Describe the friction..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <button type="button" onClick={handleSendEmail} className="w-full bg-blue-600 text-white py-8 rounded-[2rem] text-3xl font-black italic uppercase shadow-2xl transition-all active:scale-95">
                  Send Strategy Request
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
