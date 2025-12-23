"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Restored for your headshot
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, TrendingUp, Wallet, X
} from 'lucide-react';

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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
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

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-24">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 italic uppercase">
              Scale Your Operations. <br />
              <span className="text-blue-600">Remove the &quot;Human.&quot;</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium italic mb-12">
              Deploy intelligent agentic engines to automate complex workflows. Architected by an expert with 10+ years at <strong>Amazon, AWS, and Microsoft</strong>.
            </p>
          </div>
          {/* Restored Headshot Placeholder */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all">
             <Image src="/headshot.jpg" alt="Adam Seumae" fill className="object-cover" />
          </div>
        </div>
        
        {/* Authority Strip */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 opacity-30 grayscale border-t border-slate-100 pt-12 italic font-black text-2xl tracking-tighter mb-40 uppercase">
          <span>Amazon</span><span>AWS</span><span>Microsoft</span><span>Xbox</span><span>Blizzard</span><span>Airloom AI</span>
        </div>
      </main>

      <AnimatePresence>
        {activeFilter === 'intake' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-20 relative">
              <button onClick={() => setActiveFilter(null)} className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full"><X size={32}/></button>
              <h2 className="text-6xl md:text-8xl font-black italic mb-12 uppercase italic">Intake Phase</h2>
              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Your Name</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Company</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-600">Bottleneck Description</label>
                  <textarea rows={4} className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic" placeholder="Describe the friction..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <button type="button" onClick={handleSendEmail} className="w-full bg-blue-600 text-white py-8 rounded-[2rem] text-3xl font-black italic uppercase shadow-2xl">Send Strategy Request</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProofCard({ icon: Icon, metric, context, app }: { icon: any, metric: string, context: string, app: string }) {
  return (
    <div className="p-12 bg-white border-4 border-slate-50 rounded-[4rem] hover:border-blue-100 transition-all group">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10"><Icon size={36} /></div>
      <h4 className="text-5xl font-black italic mb-3 tracking-tighter uppercase leading-none">{metric}</h4>
      <p className="text-blue-600 font-black mb-8 text-xs italic uppercase tracking-widest">{context}</p>
      <p className="text-slate-500 leading-relaxed font-semibold italic text-lg">{app}</p>
    </div>
  );
}
