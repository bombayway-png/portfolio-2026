"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, X, Database, Linkedin, Code2, Workflow, LayoutDashboard, 
  Server, Bot, ChevronDown, Calendar, ArrowRight, FileText, Zap, Clock
} from 'lucide-react';

// Step states: intake (form entry), review (briefing card)
type FilterState = 'intake' | 'review' | null;

interface TriadProps { icon: React.ElementType; title: string; desc: string; color: string; }
interface ServicePillarProps {
  title: string; pitch: string; proofTitle: string; proofBody: React.ReactNode;
  capabilities: { title: string; desc: string }[];
  corporateScale: string; icon: React.ElementType; visualColor: string;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- Full Form Memory State ---
  const [formData, setFormData] = useState({ 
    name: '', email: '', company: '', projectType: '', description: '', outcome: '', budget: '' 
  });
  
  const outcomeRef = useRef<HTMLTextAreaElement>(null);
  const bottleneckRef = useRef<HTMLTextAreaElement>(null);

  const openPortal = (defaultType: string = '') => {
    setFormData(prev => ({ ...prev, projectType: defaultType }));
    setActiveFilter('intake');
  };

  // Auto-resizing textareas for high-fidelity data ingestion
  useEffect(() => {
    [outcomeRef, bottleneckRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    });
  }, [formData.outcome, formData.description, activeFilter]);

  // --- Dynamic Calendly Prefill Injection ---
  const generateCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/adamseumae/architecture-discovery";
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      'a1': formData.projectType, 
      'a2': `Outcome: ${formData.outcome}\n\nBottleneck: ${formData.description}\n\nBudget: ${formData.budget}`
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handleInitialSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Rigorous synthesis simulation
    setIsSubmitting(false);
    setActiveFilter('review');
  };

  const inputClasses = "w-full text-xl md:text-2xl font-semibold text-slate-900 border-b-2 border-slate-200 focus:border-blue-600 outline-none py-3 bg-transparent placeholder:text-slate-400 transition-colors appearance-none cursor-text";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] md:text-xs">AS</span>
            </div>
            <span className="text-xs md:text-base tracking-tighter">AI Product Architect</span>
          </div>
          <button onClick={() => openPortal()} className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-[10px] md:text-sm uppercase italic">Get Started</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24">
        {/* --- Hero Section --- */}
        <section className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-16 md:mb-24 text-center md:text-left">
          <div className="flex-1 order-2 md:order-1 text-slate-900">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 italic uppercase">
              I Architect Apps. <br /> I Build Backends. <br />
              <span className="text-blue-600">I Deploy AI Agents.</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black text-[10px] md:text-xs uppercase italic tracking-widest mb-6">
               <Clock size={16} /> Strategic Availability: Post-3PM & Weekends
            </div>
            <p className="text-lg md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-10 leading-relaxed mx-auto md:mx-0">
              Leveraging 10+ years at <strong>Amazon, AWS, and Microsoft</strong> to build autonomous frameworks.
            </p>
            <button onClick={() => openPortal()} className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-all shadow-xl italic uppercase">Start Building</button>
          </div>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl grayscale order-1 md:order-2">
             <Image src="/headshot.jpeg" alt="Adam Seumae" fill className="object-cover" priority />
          </div>
        </section>

        {/* --- Triad & Pillars --- */}
        <section className="mb-24 md:mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
            <TriadCard icon={LayoutDashboard} title="UX Architecture" desc="Forged at Blizzard to design high-traffic, reactive interfaces." color="bg-blue-50 text-blue-600" />
            <TriadCard icon={Server} title="Core Infrastructure" desc="Architecting zero-debt frameworks ready for global scaling." color="bg-slate-900 text-white" />
            <TriadCard icon={Bot} title="Agentic Intelligence" desc="Deploying autonomous agents that transform manual friction." color="bg-blue-600 text-white" />
        </section>

        <ServicePillarSection title="App Development" pitch="I engineer high-performance frontends." proofTitle="Feature Owner @ Blizzard" proofBody="Gamepad support for battle.net on Xbox." capabilities={[{title: "Real-Time:", desc: "Firebase state synchronization."}]} corporateScale="High-traffic UX for Call of Duty." icon={Code2} visualColor="text-blue-400" />
        <ServicePillarSection title="Backend & AI" pitch="Chatbots are easy. I build context-aware systems." proofTitle="Ops Excellence @ AWS" proofBody="Internal solutions saving $6M in renewals." capabilities={[{title: "Agentic:", desc: "Multi-agent triage workflows."}]} corporateScale="Alexa International automation." icon={Database} visualColor="text-slate-400" />
      </main>

      {/* --- Handshake Portal --- */}
      <AnimatePresence mode="wait">
        {activeFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12 md:py-20 relative text-left">
              <button onClick={() => setActiveFilter(null)} className="absolute top-0 right-0 p-3 md:p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-900"><X size={24} /></button>
              
              {activeFilter === 'intake' ? (
                <motion.div key="form" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-slate-900">
                  <h2 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 uppercase tracking-tighter">customer intake</h2>
                  <form className="space-y-8 md:space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-3 md:col-span-2 relative">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">I am interested in...</label>
                           <div className="relative"><select className={`${inputClasses} cursor-pointer`} value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}><option value="" disabled>Select Option</option><option value="AI Strategy Consult">AI Strategy Consult</option><option value="First AI Agent Build">First AI Agent Build</option><option value="High-Fidelity Web App">High-Fidelity Web App</option></select><ChevronDown className="absolute right-0 bottom-4 pointer-events-none" size={24} /></div>
                        </div>
                        <div className="space-y-3"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Full Name</label><input className={inputClasses} placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                        <div className="space-y-3"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Business Email</label><input className={inputClasses} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                        <div className="space-y-3"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Company</label><input className={inputClasses} placeholder="Acme" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} /></div>
                        <div className="space-y-3"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Est. Budget</label><input className={inputClasses} placeholder="e.g. $10k" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} /></div>
                        <div className="space-y-3 md:col-span-2"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Desired Outcome</label><textarea ref={outcomeRef} className={`${inputClasses} resize-none overflow-hidden`} rows={1} placeholder="The primary goal..." value={formData.outcome} onChange={(e) => setFormData({...formData, outcome: e.target.value})} /></div>
                        <div className="space-y-3 md:col-span-2"><label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Current Bottleneck</label><textarea ref={bottleneckRef} className={`${inputClasses} resize-none overflow-hidden`} rows={3} placeholder="Describe the friction..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
                     </div>
                    <button type="button" onClick={handleInitialSubmit} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 md:py-8 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-black italic uppercase shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                      {isSubmitting ? "Synthesizing Requirements..." : "Generate Briefing Card"} {!isSubmitting && <ArrowRight size={32} />}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="review" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-left space-y-12">
                  <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><FileText size={120} /></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-400 mb-8 italic">Architecture Briefing Card</h2>
                    <div className="space-y-8 relative z-10 uppercase italic">
                      <div><p className="text-xs font-black text-slate-500 tracking-widest mb-1">Lead</p><p className="text-3xl font-black">{formData.name}</p></div>
                      <div><p className="text-xs font-black text-slate-500 tracking-widest mb-1">Target Bottleneck</p><p className="text-xl font-medium text-slate-300 leading-relaxed">&quot;{formData.description}&quot;</p></div>
                      <div className="pt-6 border-t border-slate-800 flex items-center gap-2 text-blue-400 font-bold"><Zap size={18} /> Ready for Sync</div>
                    </div>
                  </div>
                  <div className="space-y-6 text-slate-900">
                    <h3 className="text-2xl font-black italic uppercase">Synchronize Discovery</h3>
                    <p className="text-lg text-slate-500 italic font-medium max-w-2xl">By approving, these briefing requirements will be injected into our architecture session invitation.</p>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a href={generateCalendlyUrl()} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-6 rounded-full text-2xl font-black italic uppercase hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-xl"><Calendar size={28} /> Approve & Schedule</a>
                      <button onClick={() => setActiveFilter('intake')} className="px-10 py-6 rounded-full text-xl font-bold italic uppercase border-2 border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">Edit Details</button>
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

// Sub-components
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
        <div className="space-y-8 order-2 lg:order-1 text-slate-900">
          <div><h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4 italic">{title}</h2><p className="text-2xl md:text-4xl font-black italic leading-tight">&quot;{pitch}&quot;</p></div>
          <div className="space-y-6"><h3 className="text-xl font-black italic uppercase tracking-tighter"><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded mr-2">The Proof</span> {proofTitle}</h3><p className="text-lg text-slate-600 italic font-medium leading-relaxed">{proofBody}</p></div>
          <div className="space-y-4"><h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Technical Capabilities</h4><ul className="space-y-4">{capabilities.map((cap, index) => (<li key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4"><Workflow size={20} className="text-blue-600 shrink-0 mt-1 hidden md:block" /><p className="text-base md:text-lg text-slate-700 italic font-medium leading-relaxed"><strong className="text-slate-900 block md:inline md:mr-2">{cap.title}</strong> {cap.desc}</p></li>))}</ul></div>
          <div className="pt-6 border-t border-slate-200"><h4 className="text-sm font-black uppercase tracking-widest text-slate-400 italic mb-3">Corporate Scale</h4><p className="text-lg text-slate-600 italic font-medium leading-relaxed flex gap-3"><ShieldCheck size={24} className="text-blue-600 shrink-0" /> {corporateScale}</p></div>
        </div>
        <div className="relative h-64 md:h-full min-h-[300px] lg:min-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 flex items-center justify-center order-1 lg:order-2"><Icon className={`${visualColor} w-32 h-32 md:w-48 md:h-48 opacity-30`} /><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2 }}></div></div>
      </div>
    </section>
  );
}
