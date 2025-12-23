"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, X, Database, Linkedin, Code2, Workflow, LayoutDashboard, Server, Bot, ChevronDown
} from 'lucide-react';

type FilterState = 'intake' | null;

// --- Interfaces for Type Safety ---
interface TriadProps { 
  icon: React.ElementType; 
  title: string; 
  desc: string; 
  color: string; 
}

interface ServicePillarProps {
  title: string;
  pitch: string;
  proofTitle: string;
  proofBody: React.ReactNode;
  capabilities: { title: string; desc: string }[];
  corporateScale: string;
  icon: React.ElementType;
  visualColor: string;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const initialFormState = { 
    name: '', 
    email: '', 
    company: '', 
    projectType: '', // Added for dropdown selection
    description: '', 
    outcome: '', 
    budget: '' 
  };
  const [formData, setFormData] = useState(initialFormState);
  
  // Refs for the auto-expanding textareas
  const outcomeRef = useRef<HTMLTextAreaElement>(null);
  const bottleneckRef = useRef<HTMLTextAreaElement>(null);

  // Professional Placeholders derived from Resume Experience
  const outcomePlaceholder = "e.g. Design a scalable GTM engine that automates customer intake and increases operational efficiency by 30%...";
  const bottleneckPlaceholder = "e.g. High manual overhead in lead management, legacy system technical debt, or a lack of real-time BI dashboards to track cross-functional KPIs...";

  // Helper to open portal with specific intent
  const openPortal = (defaultType: string = '') => {
    setFormData(prev => ({ ...prev, projectType: defaultType }));
    setActiveFilter('intake');
  };

  // Shared effect to adjust height for both textareas
  useEffect(() => {
    if (outcomeRef.current) {
      outcomeRef.current.style.height = 'auto';
      outcomeRef.current.style.height = `${outcomeRef.current.scrollHeight}px`;
    }
    if (bottleneckRef.current) {
      bottleneckRef.current.style.height = 'auto';
      bottleneckRef.current.style.height = `${bottleneckRef.current.scrollHeight}px`;
    }
  }, [formData.outcome, formData.description, activeFilter]);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Architect My System [${formData.projectType}]: ${formData.company}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nProject Intent: ${formData.projectType}\nOutcome: ${formData.outcome}\nBudget: ${formData.budget}\nBottleneck: ${formData.description}`
    );
    window.location.href = `mailto:a.seumae@outlook.com?subject=${subject}&body=${body}`;
    setActiveFilter(null);
  };

  const inputClasses = "w-full text-xl md:text-2xl font-semibold text-slate-900 border-b-2 border-slate-200 focus:border-blue-600 outline-none py-3 bg-transparent placeholder:text-slate-400 placeholder:font-normal placeholder:not-italic transition-colors appearance-none";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* --- Sticky Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] md:text-xs">AS</span>
            </div>
            <span className="text-xs md:text-base tracking-tighter">AI Product Architect</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <a href="https://www.linkedin.com/in/adamseumae/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Linkedin size={20} className="md:w-6 md:h-6" />
            </a>
            <button onClick={() => openPortal()} className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-[10px] md:text-sm uppercase italic">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-16 md:mb-24 text-center md:text-left">
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase text-slate-900">
              I Architect Apps. <br /> I Build Backends. <br />
              <span className="text-blue-600">I Deploy AI Agents.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-10 leading-relaxed mx-auto md:mx-0">
              Bridging the gap between Enterprise Strategy and Code. Leveraging 10+ years of experience at <strong>Amazon, AWS, Microsoft, and Blizzard</strong> to build Serverless React Applications and Autonomous Agents.
            </p>
            
            <div className="bg-slate-900 text-white py-4 px-6 rounded-2xl mb-12 inline-block shadow-xl font-mono text-sm md:text-base font-bold tracking-tight">
              Python 3.x | React.js (Vite) | Firebase | Vercel | Electron | OpenAI GPT-4o
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => openPortal()} className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-all shadow-xl shadow-blue-100 italic uppercase">
                Start Building
              </button>
            </div>
          </div>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl grayscale order-1 md:order-2">
             <Image src="/headshot.jpeg" alt="Adam Seumae" fill className="object-cover" priority />
          </div>
        </section>

        {/* --- 2. THE INTEGRATION TRIAD --- */}
        <section className="mb-24 md:mb-40 text-center md:text-left">
           <div className="max-w-4xl mx-auto mb-16">
             <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-600 mb-6 italic text-center">The Integration Play</h2>
             <p className="text-2xl md:text-3xl font-black italic text-slate-900 leading-tight mb-6 text-center text-balance">
               I build autonomous systems that <strong>Ingest</strong> complex datasets, <strong>Synthesize</strong> intent, and <strong>Execute</strong> multi-step objectives.
             </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TriadCard 
                icon={LayoutDashboard} 
                title="UX Architecture" 
                desc="Bridging complex backends with intuitive frontends. From Blizzard’s global consumption UX to context-aware AI interfaces, I design scalable, high-engagement products." 
                color="bg-blue-50 text-blue-600" 
              />
              <TriadCard 
                icon={Server} 
                title="Core Infrastructure" 
                desc="Architecting the nervous systems of global organizations. Drawing from AWS and Amazon, I build secure, serverless frameworks that eliminate legacy debt." 
                color="bg-slate-900 text-white" 
              />
              <TriadCard 
                icon={Bot} 
                title="Agentic Intelligence" 
                desc="Deploying autonomous LLM agents that transform manual workflows into automated pipelines using React.js, Firebase, and real-time OpenAI integration." 
                color="bg-blue-600 text-white" 
              />
           </div>
        </section>

        {/* --- 3. SERVICE PILLARS --- */}
        <ServicePillarSection 
          title="Pillar 1: App & Web Development"
          pitch="I engineer reactive, high-performance frontends."
          proofTitle="Feature Owner @ Blizzard"
          proofBody={<>Delivered gamepad support for <strong>Battle.net on Xbox</strong> handheld devices and owned the <strong>Video Consumption UX</strong> for World of Warcraft.</>}
          capabilities={[
            { title: "Real-Time Data:", desc: "Implemented Firebase Snapshot Listeners to update interfaces instantly." },
            { title: "Cross-Functional:", desc: "Driving fast-follow improvements to meet MVP deliverables at scale." }
          ]}
          corporateScale="Ownership of high-traffic UX for Blizzard franchises including World of Warcraft and Call of Duty."
          icon={Code2}
          visualColor="text-blue-400"
        />

        <ServicePillarSection 
          title="Pillar 2: Backend & Systems Integration"
          pitch="I build the Central Nervous System of your business."
          proofTitle="Operational Excellence @ AWS"
          proofBody={<>Engineered internal solutions at <strong>AWS</strong> to avoid $6M contract renewals and optimized roadmap monitoring for leadership.</>}
          capabilities={[
            { title: "Security First:", desc: "Utilizing serverless node.js backends to ensure zero-trust security." },
            { title: "BI Intelligence:", desc: "Launched KPI dashboards for executive-level reporting and prioritization scoring." }
          ]}
          corporateScale="Designed benchmarking automation across 15 international locales for Alexa International."
          icon={Database}
          visualColor="text-slate-400"
        />

        {/* --- 4. THE AUDIT CONVERSION OFFER --- */}
        <section className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white mb-24 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
            Free &quot;Human-in-the-Loop&quot; Audit
          </h2>
          <p className="text-xl md:text-2xl font-medium italic leading-relaxed max-w-4xl mx-auto mb-12 opacity-90">
            Let&apos;s find some time and chat <strong>Agentic AI</strong>, <strong>Building Custom Applications</strong>, and <strong>Updating your Personal website</strong>
          </p>
          <button 
            onClick={() => openPortal('An AI Strategy Consult')} 
            className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl italic uppercase"
          >
            Schedule a Call
          </button>
        </section>
      </main>

      {/* --- Intake Portal --- */}
      <AnimatePresence>
        {activeFilter === 'intake' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12 md:py-20 relative text-left">
              <button onClick={() => setActiveFilter(null)} className="absolute top-0 right-0 p-3 md:p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X size={24} /></button>
              <h2 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 uppercase text-slate-900">customer intake</h2>
              <form className="space-y-8 md:space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-slate-900">
                  
                  {/* Dropdown Selection: First Field for Clarity */}
                  <div className="space-y-3 md:col-span-2 relative">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">I am interested in...</label>
                    <div className="relative">
                      <select 
                        className={inputClasses} 
                        value={formData.projectType} 
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="An AI Strategy Consult">An AI Strategy Consult</option>
                        <option value="Build your first AI Agent">Build your first AI Agent</option>
                        <option value="Build Multiple AI Autonomous Agents">Build Multiple AI Autonomous Agents</option>
                        <option value="Build a business landing page">Build a business landing page</option>
                        <option value="Build a Multi-User Application">Build a Multi-User Application</option>
                        <option value="Data Synthesis: Visualization and Insights">Data Synthesis: Visualization and Insights</option>
                      </select>
                      <ChevronDown className="absolute right-0 bottom-4 text-slate-400 pointer-events-none" size={24} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Full Name</label>
                    <input className={inputClasses} placeholder="John Smith" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Email Address</label>
                    <input className={inputClasses} placeholder="john@company.com" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Company</label>
                    <input className={inputClasses} placeholder="Acme Corp" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Project Budget</label>
                    <input className={inputClasses} placeholder="e.g. $5,000" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Desired Outcome</label>
                    <textarea 
                      ref={outcomeRef}
                      className={`${inputClasses} resize-none overflow-hidden`}
                      rows={1}
                      placeholder={outcomePlaceholder}
                      value={formData.outcome} 
                      onChange={(e) => setFormData({...formData, outcome: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Current Bottleneck</label>
                    <textarea 
                      ref={bottleneckRef}
                      className={`${inputClasses} resize-none overflow-hidden`}
                      rows={3} 
                      placeholder={bottleneckPlaceholder}
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    />
                  </div>
                </div>
                <button type="button" onClick={handleSendEmail} className="w-full bg-blue-600 text-white py-6 md:py-8 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-black italic uppercase shadow-2xl hover:scale-[1.02] transition-all">
                  Submit Intake Form
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Internal UI Components ---

function TriadCard({ icon: Icon, title, desc, color }: TriadProps) {
  return (
    <div className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] ${color} space-y-4 md:space-y-6 shadow-xl text-left`}>
      <Icon size={32} />
      <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-tight">{title}</h3>
      <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">{desc}</p>
    </div>
  );
}

function ServicePillarSection({ title, pitch, proofTitle, proofBody, capabilities, corporateScale, icon: Icon, visualColor }: ServicePillarProps) {
  return (
    <section className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 mb-16 md:mb-24 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
        <div className="space-y-8 order-2 lg:order-1">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4 italic">{title}</h2>
            <p className="text-2xl md:text-4xl font-black italic text-slate-900 leading-tight">&quot;{pitch}&quot;</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded mr-2">The Proof</span> {proofTitle}
            </h3>
            <p className="text-lg text-slate-600 italic font-medium leading-relaxed">{proofBody}</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Technical Capabilities</h4>
             <ul className="space-y-4">
                {capabilities.map((cap, index) => (
                  <li key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <Workflow size={20} className="text-blue-600 shrink-0 mt-1 hidden md:block" />
                    <p className="text-base md:text-lg text-slate-700 italic font-medium leading-relaxed">
                      <strong className="text-slate-900 block md:inline md:mr-2">{cap.title}</strong> {cap.desc}
                    </p>
                  </li>
                ))}
             </ul>
          </div>
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic mb-3">Corporate Scale</h4>
            <p className="text-lg text-slate-600 italic font-medium leading-relaxed flex gap-3">
              <ShieldCheck size={24} className="text-blue-600 shrink-0" /> {corporateScale}
            </p>
          </div>
        </div>
        <div className="relative h-64 md:h-full min-h-[300px] lg:min-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center order-1 lg:order-2">
            <Icon className={`${visualColor} w-32 h-32 md:w-48 md:h-48 opacity-30`} />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2 }}></div>
        </div>
      </div>
    </section>
  );
}
