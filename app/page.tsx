"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, BarChart3, Globe, Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Cpu, Send, MessageSquare, Clock, Database, 
  Target, DollarSign, ChevronRight, LayoutDashboard, Briefcase
} from 'lucide-react';

// Type for navigation state
type FilterState = 'capabilities' | 'impact' | 'casestudy' | 'intake' | null;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form State for Intake
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    description: '', outcome: '', timeline: 'ASAP (Urgent Friction)', budget: ''
  });

  const emailAddress = "a.seumae@outlook.com";

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`AI Strategy Inquiry: ${formData.company || 'New Project'}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\n` +
      `Opportunity Description:\n${formData.description}\n\nDesired Outcome:\n${formData.outcome}\n\n` +
      `Timeline: ${formData.timeline}\nOptional Budget: ${formData.budget || 'Not Provided'}`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', company: '', phone: '', description: '', outcome: '', timeline: 'ASAP (Urgent Friction)', budget: '' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Persistant Global Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter(null)}>
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white italic tracking-tighter text-xs">AS</span>
            </div>
            <span className="tracking-tight text-lg hidden sm:block">Adam Seumae</span>
          </div>
          <button 
            onClick={() => setActiveFilter('intake')}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100 text-sm"
          >
            <MessageSquare size={16} /> Start Project
          </button>
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
        {/* --- PERSISTENT HERO SECTION --- */}
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
          <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl shrink-0">
            <Image src="/headshot.jpeg" alt="Headshot" fill className="object-cover" />
          </div>
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles className="text-blue-500" size={12} /> Strategic AI Implementation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 italic">
              Building Intelligent <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic underline decoration-blue-500/30">Agentic Engines.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium italic mb-10 leading-relaxed">
              Over 10 years of experience at <strong>Airloom AI, Amazon, AWS and Microsoft (Xbox, Blizzard)</strong> architecting autonomous systems to solve customer problems globally.
            </p>

            {/* --- CONTEXTUAL FILTERS --- */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <FilterButton 
                label="Capabilities" 
                active={activeFilter === 'capabilities'} 
                icon={Cpu} 
                onClick={() => setActiveFilter(activeFilter === 'capabilities' ? null : 'capabilities')} 
              />
              <FilterButton 
                label="Impact Matrix" 
                active={activeFilter === 'impact'} 
                icon={Activity} 
                onClick={() => setActiveFilter(activeFilter === 'impact' ? null : 'impact')} 
              />
              <FilterButton 
                label="Case Study" 
                active={activeFilter === 'casestudy'} 
                icon={LayoutDashboard} 
                onClick={() => setActiveFilter(activeFilter === 'casestudy' ? null : 'casestudy')} 
              />
            </div>
          </div>
        </div>

        {/* --- DYNAMIC CONTENT (ROLL-IN) --- */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeFilter === 'capabilities' && (
              <motion.div 
                key="capabilities"
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="pt-12"
              >
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1">
                    <h3 className="text-blue-400 font-mono text-sm mb-6 uppercase tracking-widest font-bold">// Strategic Technical Proof</h3>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Agentic Engine Design</h2>
                    <p className="text-slate-400 text-xl leading-relaxed mb-10 font-light italic">
                      I build autonomous systems that **Ingest** complex datasets, **Synthesize** intent, and **Execute** multi-step objectives without constant supervision. 
                    </p>
                    <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                      {['React.js', 'OpenAI API', 'Vercel', 'Firebase'].map(t => <span key={t} className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300">{t}</span>)}
                    </div>
                  </div>
                  <Cpu size={140} className="text-blue-500 opacity-20 animate-pulse hidden lg:block" />
                </div>
              </motion.div>
            )}

            {activeFilter === 'impact' && (
              <motion.div 
                key="impact"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-12 text-center"
              >
                <h2 className="text-3xl font-bold mb-12 italic underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld" />
                  <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP" />
                  <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
                  <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
                  <OutcomeCard icon={Activity} title="Automation" sub="15 Locales Benchmarked" />
                  <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
                </div>
                <div className="max-w-4xl mx-auto space-y-6 text-left">
                  <ExperienceCard company="Blizzard Entertainment" role="Product Manager, Battle.net" date="2025-Present" bullets={["Strategy Owner for Video UX.", "Shipped Gamepad support on-time."]} isCurrent={true} />
                  <ExperienceCard company="Amazon, AWS & Alexa" role="Product Management" date="2017-2024" bullets={["AWS: Avoided $6M in costs.", "Alexa Ads: Improved CTR to 1.8%."]} />
                </div>
              </motion.div>
            )}

            {activeFilter === 'casestudy' && (
              <motion.div 
                key="casestudy"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-12"
              >
                <h2 className="text-4xl font-extrabold mb-8 italic">LILO OS Case Study</h2>
                <p className="text-lg text-slate-500 mb-12 font-light italic">Applying enterprise rigor to household operations.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['lilologin.png', 'lilo-triage-admin.png', 'lilo-blocking-issue.png', 'lilo-employee-view.jpeg', 'lilo-employee-scorecard.png', 'lilo-dashboard-admin.png'].map((img, i) => (
                    <div key={i} className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:border-blue-200">
                      <div className="relative h-64 bg-slate-900"><Image src={`/${img}`} alt="Case Study" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform" /></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeFilter === 'intake' && (
              <motion.div 
                key="intake"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-12 max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-extrabold italic">Project Intake</h2>
                  <p className="text-slate-500 italic">Bridging friction to autonomous outcomes.</p>
                </div>
                <form className="space-y-6 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="FULL NAME" value={formData.name} placeholder="e.g. John Smith" onChange={(v:string) => setFormData({...formData, name:v})} />
                      <Input label="EMAIL ADDRESS" value={formData.email} placeholder="john.smith@company.com" onChange={(v:string) => setFormData({...formData, email:v})} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="COMPANY" value={formData.company} placeholder="Company Name" onChange={(v:string) => setFormData({...formData, company:v})} />
                      <Input label="PHONE / TEXT" value={formData.phone} placeholder="(555) 000-0000" onChange={(v:string) => setFormData({...formData, phone:v})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex gap-2"><Database size={12} /> OPPORTUNITY DESCRIPTION</label>
                      <textarea className="w-full px-8 py-4 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all resize-none" value={formData.description} rows={4} placeholder="Describe the manual workflow or process you want to automate..." onChange={(e) => setFormData({...formData, description:e.target.value})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex gap-2"><Target size={12} /> DESIRED OUTCOME</label>
                      <textarea className="w-full px-8 py-4 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all resize-none" value={formData.outcome} rows={3} placeholder="What is the project goal or autonomous outcome you want to achieve?" onChange={(e) => setFormData({...formData, outcome:e.target.value})} />
                   </div>
                   <button type="button" onClick={handleSendEmail} className="w-full bg-slate-900 text-white font-bold py-6 rounded-3xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3">Send Strategy Request <Send size={20} /></button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-12 text-center border-t border-slate-50">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] italic">Adam Seumae | Fractional AI Leadership | 2026</p>
      </footer>
    </div>
  );
}

// --- Specialized UI Components ---

function FilterButton({ label, active, icon: Icon, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 rounded-full flex items-center gap-3 font-bold transition-all duration-300 border shadow-sm ${
        active 
          ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-xl' 
          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );
}

function Input({ label, placeholder, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black tracking-widest text-slate-400 ml-4">{label}</label>
      <input type="text" placeholder={placeholder} value={value} className="w-full px-8 py-4 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-light" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function OutcomeCard({ icon: Icon, title, sub }: any) {
  return (
    <div className="p-8 bg-white rounded-[2rem] border border-slate-100 flex flex-col items-center">
      <Icon size={32} className="text-blue-600 mb-4" />
      <h4 className="font-bold text-slate-900 italic text-sm">{title}</h4>
      <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-2">{sub}</p>
    </div>
  );
}

function ExperienceCard({ company, role, date, bullets, isCurrent }: any) {
  return (
    <div className={`p-8 rounded-[2rem] border ${isCurrent ? 'border-blue-200 shadow-md' : 'border-slate-50'}`}>
      <div className="flex justify-between items-start mb-6">
        <div><h4 className="font-bold text-xl italic">{company}</h4><p className="text-blue-600 font-bold text-sm">{role}</p></div>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{date}</span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bullets.map((b: string, i: number) => <li key={i} className="text-sm text-slate-500 font-light flex gap-2"><span className="text-blue-400 font-black">///</span> {b}</li>)}
      </ul>
    </div>
  );
}
