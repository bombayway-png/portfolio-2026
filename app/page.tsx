"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, BarChart3, Globe, Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Cpu, Send, MessageSquare, Clock, Database, 
  Target, DollarSign, ChevronRight, LayoutDashboard, Briefcase, TrendingUp, Wallet
} from 'lucide-react';

type FilterState = 'intake' | null;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const initialFormState = { name: '', email: '', company: '', phone: '', description: '', outcome: '', timeline: 'ASAP (Urgent Friction)', budget: '' };
  const [formData, setFormData] = useState(initialFormState);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Build My Agent Workforce: ${formData.company}`);
    const body = encodeURIComponent(`Full Name: ${formData.name}\nEmail: ${formData.email}\nDescription: ${formData.description}`);
    window.location.href = `mailto:a.seumae@outlook.com?subject=${subject}&body=${body}`;
    setFormData(initialFormState);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white italic tracking-tighter text-xs">AS</span>
            </div>
            <span className="tracking-tight text-lg hidden sm:block uppercase">Adam Seumae</span>
          </div>
          <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all font-bold text-sm shadow-xl shadow-blue-100 italic uppercase">
            Build My Agent Workforce
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        {/* --- 1. HERO SECTION: IMMEDIATE CLARITY --- */}
        <section className="pt-48 pb-24 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 italic uppercase">
            Scale Your Operations. <br />
            <span className="text-blue-600">Remove the "Human."</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-12 leading-relaxed">
            Deploy intelligent agentic engines and autonomous systems to automate complex workflows. Architected by an expert with 10+ years at <strong>Airloom AI, Amazon, AWS, and Microsoft</strong>.
          </p>
          
          <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl shadow-blue-100 italic uppercase mb-16">
            Build My Agent Workforce
          </button>

          {/* Grayscale Logo Strip */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-12 gap-y-6 opacity-30 grayscale border-t border-slate-100 pt-12">
            <span className="font-black text-2xl tracking-tighter italic">AMAZON</span>
            <span className="font-black text-2xl tracking-tighter italic">AWS</span>
            <span className="font-black text-2xl tracking-tighter italic">MICROSOFT</span>
            <span className="font-black text-2xl tracking-tighter italic">XBOX</span>
            <span className="font-black text-2xl tracking-tighter italic">BLIZZARD</span>
            <span className="font-black text-2xl tracking-tighter italic">AIRLOOM AI</span>
          </div>
        </section>

        {/* --- 2. THE PROBLEM/SOLUTION BLOCK (THE "WHY") --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-32 border-y border-slate-100 mb-24">
          <div className="space-y-6">
            <h3 className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">// The Bottleneck</h3>
            <p className="text-4xl font-bold italic leading-tight text-slate-400">
              Your team is bogged down by repetitive technical tasks. You are scaling headcount, <span className="text-slate-900">not efficiency.</span>
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">// The Solution</h3>
            <p className="text-4xl font-bold italic leading-tight">
              Stop hiring humans to do robot work. I build custom autonomous workforces that handle execution while you <span className="underline decoration-blue-500 underline-offset-8">focus on strategy.</span>
            </p>
          </div>
        </section>

        {/* --- 3. THE "AUTHORITY" SECTION: PROOF OF COMPETENCE --- */}
        <section className="py-24 mb-24">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">Authority & Proven ROI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ProofCard 
              icon={Wallet} 
              metric="$6M Saved" 
              context="AWS Contract Renewals" 
              app="I identify inefficiencies in your tech stack and build internal solutions to stop the cash bleed." 
            />
            <ProofCard 
              icon={TrendingUp} 
              metric="20x Growth" 
              context="Amazon Pipeline" 
              app="I deploy systems that scale your outreach and operations without scaling your stress." 
            />
            <ProofCard 
              icon={ShieldCheck} 
              metric="MVP to Market" 
              context="Airloom AI Launch" 
              app="Whether you are a startup or enterprise, I establish the SOPs and architecture needed to launch fast." 
            />
          </div>
        </section>

        {/* --- 4. THE SERVICE OFFERINGS (THE "WHAT") --- */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white mb-40">
          <h2 className="text-4xl md:text-6xl font-black italic mb-16 uppercase tracking-tighter">Strategic Implementation:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <ServiceItem num="01" title="Workflow Audit" desc="Identifying high-friction 'human in the loop' tasks ripe for autonomous agentic replacement." />
            <ServiceItem num="02" title="Agent Architecture" desc="Designing and building custom AI agents to handle high-volume intake, processing, and output." />
            <ServiceItem num="03" title="Operational Excellence" desc="Establishing the SOPs and feedback loops to ensure your digital workforce improves over time." />
          </div>
        </section>

        {/* --- 5. THE CLOSER --- */}
        <section className="text-center pb-40">
          <h2 className="text-6xl md:text-8xl font-black italic mb-10 uppercase tracking-tighter">Ready to Automate?</h2>
          <p className="text-xl md:text-2xl text-slate-500 mb-16 italic font-medium max-w-3xl mx-auto">
            I have solved global problems for Xbox, Blizzard, and Amazon. Let me solve yours.
          </p>
          <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-16 py-8 rounded-full text-3xl font-black hover:scale-105 transition-all shadow-2xl shadow-blue-100 italic uppercase">
            Book My Discovery Call
          </button>
        </section>
      </main>

      {/* --- INTAKE PORTAL --- */}
      <AnimatePresence>
        {activeFilter === 'intake' && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-20 relative">
              <button onClick={() => setActiveFilter(null)} className="fixed top-8 right-8 p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                <X size={32} className="text-slate-900" />
              </button>
              
              <div className="mb-20">
                <h2 className="text-6xl md:text-8xl font-black italic mb-6 uppercase tracking-tighter">Intake Phase</h2>
                <p className="text-2xl text-slate-400 italic font-medium">Define your bottleneck to begin the architecture process.</p>
              </div>

              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <PortalInput label="YOUR NAME" placeholder="e.g. John Smith" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                  <PortalInput label="EMAIL ADDRESS" placeholder="john@company.com" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 ml-2">WHAT SHOULD MY AGENTS SOLVE FOR YOU?</label>
                  <textarea 
                    className="w-full text-2xl md:text-4xl font-bold border-b-4 border-slate-100 focus:border-blue-600 outline-none py-6 placeholder:text-slate-100 transition-all resize-none italic" 
                    rows={4} 
                    placeholder="DESCRIBE THE FRICTION..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <button type="button" onClick={handleSendEmail} className="w-full bg-slate-900 text-white py-10 rounded-[2rem] text-3xl font-black italic uppercase hover:bg-blue-600 transition-all shadow-2xl">
                  Send Strategy Request
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 text-center border-t border-slate-50 italic text-slate-900 bg-slate-50/50">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] mb-4 italic">Adam Seumae | Fractional AI Leadership | 2026</p>
      </footer>
    </div>
  );
}

// --- Internal Components ---

function ProofCard({ icon: Icon, metric, context, app }: any) {
  return (
    <div className="p-12 bg-white border-4 border-slate-50 rounded-[4rem] hover:border-blue-100 transition-all group">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform"><Icon size={36} /></div>
      <h4 className="text-5xl font-black italic mb-3 tracking-tighter uppercase leading-none">{metric}</h4>
      <p className="text-blue-600 font-black mb-8 text-xs italic uppercase tracking-widest">{context}</p>
      <p className="text-slate-500 leading-relaxed font-semibold italic text-lg">{app}</p>
    </div>
  );
}

function ServiceItem({ num, title, desc }: any) {
  return (
    <div className="space-y-8">
      <span className="text-blue-500 font-black text-6xl opacity-20 italic leading-none">{num}</span>
      <h4 className="text-3xl font-black italic uppercase tracking-tight leading-tight">{title}</h4>
      <p className="text-slate-400 leading-relaxed font-medium italic text-lg">{desc}</p>
    </div>
  );
}

function PortalInput({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-4">
      <label className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 ml-2">{label}</label>
      <input 
        className="w-full text-2xl md:text-3xl font-bold border-b-4 border-slate-100 focus:border-blue-600 outline-none py-4 placeholder:text-slate-100 transition-all italic" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
