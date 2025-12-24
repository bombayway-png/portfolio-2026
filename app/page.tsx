"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, X, Database, Linkedin, Code2, Workflow, LayoutDashboard, 
  Server, Bot, ChevronDown, Calendar, ArrowRight, FileText, Zap, Clock
} from 'lucide-react';

type FilterState = 'intake' | 'review' | null;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', company: '', projectType: '', description: '', outcome: '', budget: '' 
  });
  
  const outcomeRef = useRef<HTMLTextAreaElement>(null);
  const bottleneckRef = useRef<HTMLTextAreaElement>(null);

  const openPortal = (defaultType: string = '') => {
    setFormData(prev => ({ ...prev, projectType: defaultType }));
    setActiveFilter('intake');
  };

  useEffect(() => {
    [outcomeRef, bottleneckRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    });
  }, [formData.outcome, formData.description, activeFilter]);

  const generateCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/adamseumae/architecture-discovery";
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      'a1': formData.projectType, 
      'a2': `OUTCOME: ${formData.outcome}\n\nBOTTLENECK: ${formData.description}\n\nBUDGET: ${formData.budget}`
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleInitialSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setActiveFilter('review');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* --- Sticky Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] md:text-xs">AS</span>
            </div>
            <span className="text-xs md:text-base tracking-tighter">AI Product Architect</span>
          </div>
          <button onClick={() => openPortal()} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase italic hover:bg-blue-700 transition-all">Get Started</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-slate-900">
        {/* --- Hero Section --- */}
        <section className="flex flex-col md:flex-row gap-16 items-center mb-32 text-center md:text-left">
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic uppercase">
              I Architect Apps. <br /> I Build Backends. <br />
              <span className="text-blue-600">I Deploy AI Agents.</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black text-xs uppercase italic tracking-widest mb-8">
               <Clock size={16} /> Strategic Availability: Post-3PM & Weekends
            </div>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-10 leading-relaxed mx-auto md:mx-0">
              Bridging the gap between Enterprise Strategy and Code. Leveraging 10+ years at <strong>Amazon, AWS, and Microsoft</strong>.
            </p>
            <button onClick={() => openPortal()} className="bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-black hover:scale-105 transition-all shadow-xl italic uppercase">Start Building</button>
          </div>
          <div className="relative w-48 h-48 md:w-96 md:h-96 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl grayscale order-1 md:order-2">
             <Image src="/headshot.jpeg" alt="Adam Seumae" fill className="object-cover" priority />
          </div>
        </section>

        {/* --- WHAT YOU'LL GET (NEW DARK SECTION) --- */}
        <section className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white mb-32 shadow-2xl">
          <h2 className="text-4xl md:text-7xl font-black italic mb-20 uppercase tracking-tighter underline decoration-blue-600 underline-offset-[12px]">What You&apos;ll Get:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <GetItem num="01" title="Workflow Audit" desc="Identifying high-friction manual tasks ripe for agentic replacement." />
            <GetItem num="02" title="Agent Architecture" desc="Designing custom AI agents to handle high-volume processing." />
            <GetItem num="03" title="Ops Excellence" desc="SOPs and feedback loops to ensure digital workforce growth." />
          </div>
        </section>

        {/* --- SERVICE PILLARS (NEW LIGHT CARDS) --- */}
        <div className="space-y-12 mb-32">
          <ServicePillarCard 
            pillar="Pillar 1: App Development"
            pitch="&quot;I engineer reactive, high-performance frontends.&quot;"
            proof="Feature Owner @ Blizzard"
            proofDetail="Delivered gamepad support for battle.net on Xbox."
            tech="Real-Time: Firebase state synchronization."
            scale="Ownership of high-traffic UX for Call of Duty."
            icon={Code2}
          />
          <ServicePillarCard 
            pillar="Pillar 2: Backend & AI"
            pitch="&quot;I build the Central Nervous System of your business.&quot;"
            proof="Ops Excellence @ AWS"
            proofDetail="Engineered solutions saving $6M in renewals."
            tech="Security: Zero-trust serverless backend logic."
            scale="Benchmarking automation across 15 international locales."
            icon={Database}
          />
        </div>
      </main>

      {/* --- Handshake Portal with Updated Budget Ranges --- */}
      <AnimatePresence mode="wait">
        {activeFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12 md:py-20 relative text-left">
              <button onClick={() => setActiveFilter(null)} className="absolute top-0 right-0 p-3 md:p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-900"><X size={24} /></button>
              
              {activeFilter === 'intake' ? (
                <div className="text-slate-900">
                  <h2 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 uppercase tracking-tighter">customer intake</h2>
                  <form className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-3 md:col-span-2 relative">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600 italic">Budget Range</label>
                           <div className="relative group">
                             <select className="w-full text-2xl md:text-4xl font-black border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 bg-transparent cursor-pointer appearance-none uppercase italic" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                               <option value="" disabled>Select Range</option>
                               <option value="5k-10k">$5k - $10k</option>
                               <option value="10k-25k">$10k - $25k</option>
                               <option value="25k+">$25k+</option>
                             </select>
                             <ChevronDown className="absolute right-0 bottom-6 text-slate-400" size={32} />
                           </div>
                        </div>
                        {/* Other fields omitted for length, use previous input classes */}
                     </div>
                     <button type="button" onClick={handleInitialSubmit} className="w-full bg-blue-600 text-white py-8 rounded-[2rem] text-2xl md:text-4xl font-black italic uppercase shadow-2xl hover:scale-[1.02] transition-all">Generate Briefing Card</button>
                  </form>
                </div>
              ) : (
                <div className="text-left space-y-12">
                   {/* Briefing card logic remains as defined in previous handshake update */}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Components ---

function GetItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="space-y-6">
      <span className="text-blue-600 font-black text-6xl italic opacity-50">{num}</span>
      <h3 className="text-4xl font-black italic uppercase tracking-tighter">{title}</h3>
      <p className="text-xl text-slate-400 font-medium italic leading-relaxed">{desc}</p>
    </div>
  );
}

function ServicePillarCard({ pillar, pitch, proof, proofDetail, tech, scale, icon: Icon }: any) {
  return (
    <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
      <div className="flex-1 space-y-8">
        <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] italic">{pillar}</h4>
        <h3 className="text-4xl md:text-5xl font-black italic leading-[1.1] text-slate-900">{pitch}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="bg-blue-600 text-white px-3 py-1 rounded font-black text-[10px] uppercase italic">The Proof</span>
             <span className="font-black italic uppercase tracking-tight">{proof}</span>
          </div>
          <p className="text-lg text-slate-500 italic font-medium">{proofDetail}</p>
        </div>
        <div className="pt-6 border-t border-slate-200 space-y-4">
           <p className="text-sm font-black uppercase text-slate-400 italic tracking-widest">Technical Capabilities</p>
           <div className="flex gap-3 text-slate-700 font-bold italic"><Workflow size={20} className="text-blue-600 shrink-0" /> {tech}</div>
           <div className="flex gap-3 text-slate-700 font-bold italic"><ShieldCheck size={20} className="text-blue-600 shrink-0" /> {scale}</div>
        </div>
      </div>
      <div className="relative w-full lg:w-[400px] aspect-square rounded-[2rem] bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 to-transparent"></div>
         <Icon size={120} className="text-blue-600 opacity-40" />
      </div>
    </div>
  );
}
