"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, X, Database, Linkedin, Code2, Workflow, LayoutDashboard, 
  Server, Bot, ChevronDown, CheckCircle, Calendar, ArrowRight, FileText, Zap, Clock
} from 'lucide-react';

// --- Firebase Ingestion Imports ---
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type FilterState = 'intake' | 'review' | null;

// --- Strictly Typed Interfaces ---
interface TriadCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}

interface ServicePillarCardProps {
  pillar: string;
  pitch: string;
  proof: string;
  proofDetail: string;
  tech: string;
  scale: string;
  icon: React.ElementType;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', company: '', projectType: '', description: '', outcome: '', budget: '' 
  });
  
  const outcomeRef = useRef<HTMLTextAreaElement>(null);
  const bottleneckRef = useRef<HTMLTextAreaElement>(null);

  // Simplified Placeholders
  const outcomePlaceholder = "What is the #1 thing you want this tool to do for your business?";
  const bottleneckPlaceholder = "Describe the 'busy work' that is currently taking up too much of your time...";

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
    const fullBriefing = `
GOAL: ${formData.projectType}
DESIRED OUTCOME: ${formData.outcome}
MANUAL BOTTLENECK: ${formData.description}
BUDGET ESTIMATE: ${formData.budget || 'To be discussed'}
    `.trim();

    const baseUrl = "https://calendly.com/adamseumae/discovery-session";
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      'a1': fullBriefing 
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // --- Production Data Flow: Unified Schema Update ---
  const handleInitialSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // 1. PUSH TO LILO-OS (Cloud Run Engine)
      const liloEndpoint = "https://calendlywebhook-hven7xzwra-uc.a.run.app";
      const liloPayload = {
        name: formData.name,
        email: formData.email,
        notes: `
PROJECT: ${formData.projectType}
GOAL: ${formData.outcome}
BOTTLENECK: ${formData.description}
BUDGET: ${formData.budget || 'To be discussed'}
        `.trim(),
        source: "Website_Direct_Intake"
      };

      // Standard 'cors' mode supported by updated backend
      await fetch(liloEndpoint, {
        method: "POST",
        mode: "cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(liloPayload)
      });

      // 2. SAVE TO LOCAL FIRESTORE (Updated field name to 'timestamp')
      await addDoc(collection(db, "architect_leads"), {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget || 'Not specified',
        goal: formData.outcome,
        bottleneck: formData.description,
        status: 'pending_booking',
        timestamp: serverTimestamp() // Unified with LILO-OS dashboard field name
      });

      // Maintain the "Synthesis" UX feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      setActiveFilter('review');
    } catch (error) {
      console.error("Submission Error:", error);
      setActiveFilter('review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full text-xl md:text-2xl font-semibold text-slate-900 border-b-2 border-slate-200 focus:border-blue-600 outline-none py-3 bg-transparent placeholder:text-slate-400 transition-colors appearance-none cursor-text";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden text-left">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] md:text-xs">AS</div>
            <span className="text-xs md:text-base tracking-tighter">Adam Seumae</span>
          </div>
          <button onClick={() => openPortal()} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-[10px] md:text-sm uppercase italic hover:bg-blue-700 transition-all shadow-lg">Get Started</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 text-slate-900">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-16 items-center mb-32">
          <div className="flex-1 order-2 md:order-1 text-slate-900">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic uppercase">
              I Build Your Tools. <br /> I Automate Your Work. <br />
              <span className="text-blue-600">I Give You Time Back.</span>
            </h1>
            <div className="flex items-center justify-start gap-2 text-blue-600 font-black text-[10px] md:text-xs uppercase italic tracking-widest mb-8">
               <Clock size={16} /> Strategy & Build Window: Post-3PM & Weekends
            </div>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl font-medium italic mb-10 leading-relaxed">
              I build custom digital tools that handle your repetitive work and turn your complex data into clear insights. From professional websites to smart business apps, I leverage 10+ years of experience at <strong>Amazon and Microsoft</strong> to build professional solutions that give you your time back.
            </p>
            <button onClick={() => openPortal()} className="bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-black hover:scale-105 transition-all shadow-xl italic uppercase">Start My Build</button>
          </div>
          
          <div className="relative order-1 md:order-2 group">
            <div className="relative w-48 h-48 md:w-96 md:h-96 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl grayscale transition-all group-hover:grayscale-0">
               <Image src="/headshot.jpeg" alt="Adam Seumae" fill className="object-cover" priority />
            </div>
            <a href="https://www.linkedin.com/in/adamseumae/" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl text-blue-600 hover:scale-110 hover:text-blue-700 transition-all z-10 border border-slate-100">
              <Linkedin size={24} />
            </a>
          </div>
        </section>

        {/* Simplified Triad */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <TriadCard icon={LayoutDashboard} title="Websites & Apps" desc="Stop using websites that just look pretty. I build active business hubs that handle your customer bookings, manage your client files, and track your business numbers automatically. These tools act as a 24/7 digital manager for your front office." color="bg-blue-50 text-blue-600" />
            <TriadCard icon={Server} title="Digital Machinery" desc="I build the digital 'brain' that connects all your business software so they finally talk to each other. This secure engine automatically moves information between your tools, making sure your operations are fast, safe, and completely hands-off." color="bg-slate-900 text-white" />
            <TriadCard icon={Bot} title="AI Assistants" desc="I build custom AI Agents to do things like categorize, label, read/write and review emails for quality and brand voice before sending. Also, update billing PDFs with an email change order from the field maximizing revenue granularly." color="bg-blue-600 text-white" />
        </section>

        {/* What You'll Get */}
        <section className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white mb-32 shadow-2xl">
          <h2 className="text-4xl md:text-7xl font-black italic mb-20 uppercase tracking-tighter underline decoration-blue-600 underline-offset-[12px]">What You&apos;ll Get:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <GetItem num="01" title="The Efficiency Map" desc="We will clearly define the problem > design a solution > align on the project scope." />
            <GetItem num="02" title="Your Digital Product" desc="A custom-built digital product designed to solve your use case." />
            <GetItem num="03" title="Outcome" desc="An easy-to-use product that lets you spend your time solving the other opportunitiy areas." />
          </div>
        </section>

        {/* Proof Section */}
        <div className="space-y-12 mb-32">
          <ServicePillarCard pillar="Experience" pitch="&quot;Building business-grade tools for top tech companies globally.&quot;" proof="Pedigree" proofDetail="I've managed systems for global brands like Alexa, AWS, Xbox, Procter & Gamble, Blizzard." tech="Modern tech, speed to market." scale="Built with the same rigor used with every company I have worked with." icon={Code2} />
          <ServicePillarCard pillar="Proven Results" pitch="&quot;Turning messy processes into simple savings.&quot;" proof="Direct Impact" proofDetail="At AWS, my team built internal Revenue Operations Sales tooling, saving millions in 3rd party contract renewals." tech="Security: Keeping your business data private and safe." scale="Global: AWS Worldwide Sales adoption." icon={Database} />
        </div>

        {/* Bottom CTA */}
        <section className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white mb-24 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">Free 15-Minute Discovery Session</h2>
          <p className="text-xl md:text-2xl font-medium italic leading-relaxed max-w-4xl mx-auto mb-12 opacity-90">
            Let&apos;s chat about your business goals and find one repetitive task we could automate this week. No technical knowledge required.
          </p>
          <button onClick={() => openPortal('Strategy Talk')} className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl italic uppercase inline-flex items-center gap-4">
            Book a Meeting <ArrowRight size={24} />
          </button>
        </section>
      </main>

      {/* Handshake Portal Modal */}
      <AnimatePresence mode="wait">
        {activeFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-12 md:py-20 relative text-left text-slate-900">
              <button onClick={() => setActiveFilter(null)} className="absolute top-0 right-0 p-3 md:p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-900"><X size={24} /></button>
              
              {activeFilter === 'intake' ? (
                <div>
                  <h2 className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 uppercase tracking-tighter">Business Intake</h2>
                  <form className="space-y-8 md:space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-3 md:col-span-2 relative">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">I need help with...</label>
                           <div className="relative group">
                             <select className={`${inputClasses} cursor-pointer`} value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}>
                               <option value="" disabled>Select an option</option>
                               <option value="Saving time on daily tasks">Saving time on daily tasks</option>
                               <option value="Building a custom tool">Building a custom tool</option>
                               <option value="Building a professional website">Building a professional website</option>
                               <option value="Organizing my data">Organizing my data</option>
                               <option value="AI Strategy talk">Just a strategy talk</option>
                             </select>
                             <ChevronDown className="absolute right-0 bottom-4 text-slate-400 pointer-events-none" size={24} />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Full Name</label>
                           <input className={inputClasses} placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Best Email</label>
                           <input className={inputClasses} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                           <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600 italic">Project Budget (Optional)</label>
                           <input className={inputClasses} placeholder="e.g. $750" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                        </div>
                     </div>
                     <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Main Goal</label>
                        <textarea ref={outcomeRef} className={`${inputClasses} resize-none overflow-hidden`} rows={1} placeholder={outcomePlaceholder} value={formData.outcome} onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
                     </div>
                     <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600">Current Bottleneck</label>
                        <textarea ref={bottleneckRef} className={`${inputClasses} resize-none overflow-hidden`} rows={3} placeholder={bottleneckPlaceholder} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                     </div>
                    <button type="button" onClick={handleInitialSubmit} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 md:py-8 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-black italic uppercase shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                      {isSubmitting ? "Generating Plan..." : "Generate Business Blueprint"} <ArrowRight size={32} />
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-12 text-left">
                  <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><FileText size={120} /></div>
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-blue-400 mb-8 italic">Your Business Blueprint</h2>
                    <div className="space-y-8 relative z-10">
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">Business Owner</p>
                        <p className="text-3xl font-black italic uppercase text-white">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">Project Intent & Budget</p>
                        <p className="text-xl font-bold italic text-blue-400 uppercase tracking-tighter">{formData.projectType} • {formData.budget || 'To Be Discussed'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">Target Bottleneck</p>
                        <p className="text-xl font-medium italic text-slate-300 leading-relaxed">&quot;{formData.description}&quot;</p>
                      </div>
                      <div className="pt-6 border-t border-slate-800 flex items-center gap-2 text-blue-400 font-bold italic">
                        <Zap size={18} /> Ready to Simplify Your Work
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 text-slate-900">
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">Schedule Your Blueprint Review</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <a href={generateCalendlyUrl()} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-10 py-6 rounded-full text-2xl font-black italic uppercase hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-xl">
                        <CheckCircle size={28} /> Confirm & Book <Calendar size={24} />
                      </a>
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

// --- Visual Sub-Components ---
function TriadCard({ icon: Icon, title, desc, color }: TriadCardProps) {
  return (
    <div className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] ${color} space-y-4 md:space-y-6 shadow-xl text-left`}>
      <Icon size={32} />
      <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-tight">{title}</h3>
      <p className="text-sm md:text-base font-medium leading-relaxed opacity-90">{desc}</p>
    </div>
  );
}

function GetItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="space-y-6 text-left">
      <span className="text-blue-600 font-black text-6xl italic opacity-50">{num}</span>
      <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">{title}</h3>
      <p className="text-xl text-slate-400 font-medium italic leading-relaxed">{desc}</p>
    </div>
  );
}

function ServicePillarCard({ pillar, pitch, proof, proofDetail, tech, scale, icon: Icon }: ServicePillarCardProps) {
  return (
    <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-left">
      <div className="flex-1 space-y-8">
        <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] italic">{pillar}</h4>
        <h3 className="text-4xl md:text-5xl font-black italic leading-[1.1] text-slate-900">{pitch}</h3>
        <div className="space-y-4 text-slate-900">
          <div className="flex items-center gap-3">
             <span className="bg-blue-600 text-white px-3 py-1 rounded font-black text-[10px] uppercase italic">Proven Record</span>
             <span className="font-black italic uppercase tracking-tight text-slate-900">{proof}</span>
          </div>
          <p className="text-lg text-slate-500 italic font-medium">{proofDetail}</p>
        </div>
        <div className="pt-6 border-t border-slate-200 space-y-4">
           <p className="text-sm font-black uppercase text-slate-400 italic tracking-widest">How It Helps You</p>
           <div className="flex gap-3 text-slate-700 font-bold italic"><Workflow size={20} className="text-blue-600 shrink-0" /> {tech}</div>
           <div className="flex gap-3 text-slate-700 font-bold italic"><ShieldCheck size={20} className="text-blue-600 shrink-0" /> {scale}</div>
        </div>
      </div>
      <div className="relative w-full lg:w-[400px] aspect-square rounded-[2rem] bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform">
         <Icon size={120} className="text-blue-600 opacity-40" />
      </div>
    </div>
  );
}