"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Mail, FileText, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Briefcase, Cpu, Send, MessageSquare,
  Clock, Database, Target, DollarSign
} from 'lucide-react';

interface PassionProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Routing and Identity
  const resumeLink = "https://docs.google.com/document/d/1RIPyJ5Y6rhjTkhS9cmMDOOraP3Kg2LjE59TIi3Yd2jw/edit?usp=sharing";
  const linkedInURL = "https://www.linkedin.com/in/adamseumae/";
  const emailAddress = "a.seumae@outlook.com";

  const passionProjects: PassionProject[] = [
    { id: 'lilo-auth', title: '01. Entry & Identity', description: 'Secure onboarding and authentication logic for proprietary team data.', imageSrc: '/lilologin.png', altText: 'LILO OS Sign-in' },
    { id: 'lilo-admin-brain', title: '02. Command & Control', description: 'Centralized triage for real-time monitoring and autonomous dispatching.', imageSrc: '/lilo-triage-admin.png', altText: 'LILO OS Admin' },
    { id: 'lilo-issue-detail', title: '03. Contextual Awareness', description: 'Synthesizing complex blockers into actionable data points.', imageSrc: '/lilo-blocking-issue.png', altText: 'LILO OS Blocker' },
    { id: 'lilo-execution', title: '04. Autonomous Action', description: 'A field-ready execution layer transforming goals into completed work orders.', imageSrc: '/lilo-employee-view.jpeg', altText: 'LILO OS Employee' },
    { id: 'lilo-scorecard', title: '05. Reliability Loops', description: 'Individual performance scorecards tracking reliability for Sammy and Lucy.', imageSrc: '/lilo-employee-scorecard.png', altText: 'LILO OS Scorecard' },
    { id: 'lilo-metrics', title: '06. Operational Insights', description: 'Automated data synthesis to monitor health and operational friction.', imageSrc: '/lilo-dashboard-admin.png', altText: 'LILO OS Metrics' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Lightbox Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors"><X size={32} /></button>
          <div className="relative w-full max-w-6xl aspect-video"><Image src={selectedImage} alt="Expanded view" fill className="object-contain" /></div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 font-bold">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><span className="text-white font-black text-xs uppercase italic tracking-tighter">AS</span></div>
            <span className="tracking-tighter text-lg uppercase hidden sm:block tracking-widest text-slate-900 font-bold">Adam Seumae</span>
          </div>
          <div className="flex gap-8 items-center text-sm font-semibold text-slate-500">
            <a href="#intake" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-blue-200"><MessageSquare size={16} /> Start Project</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
              <Image src="/headshot.jpeg" alt="Headshot" fill className="object-cover" />
            </div>
          </div>
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles className="text-blue-500" size={12} /> Strategic AI Implementation
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 italic">Building Intelligent <br /><span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic tracking-tight underline decoration-blue-500/30">Agentic Engines.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium italic mb-10 leading-relaxed">
              Leveraging over 10 years of leadership at <strong>Amazon, AWS, and Blizzard</strong> to architect autonomous systems for complex workflows.
            </p>
          </div>
        </div>
      </header>

      {/* Section 1: Agentic Engine Design */}
      <section id="engineering" className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center border border-slate-800">
           <div className="flex-1">
              <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold">// Strategic Capability</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">Agentic Engine Design</h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-light italic">
                I build autonomous systems that **Ingest** complex datasets, **Synthesize** intent, and **Execute** multi-step objectives without constant supervision. 
                Whether refining operational friction or scaling global logic, I architect the "Agentic Engines" that plan, decide, and act for your business.
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm font-mono text-blue-300">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Data Synthesis</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Autonomous Planning</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Multi-step Execution</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Operational Scalability</div>
              </div>
           </div>
           <div className="w-full lg:w-1/3 aspect-square bg-blue-600/10 rounded-[3rem] border border-blue-500/20 flex items-center justify-center relative shadow-inner">
             <Cpu size={120} className="text-blue-500 opacity-20 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Section 2: Refined Project Intake Form */}
      <section id="intake" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 italic tracking-tight">Project Intake</h2>
            <p className="text-slate-500 font-medium italic font-light">Identifying the friction points to bridge the gap to autonomous action.</p>
          </div>
          <form className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
            {/* 1. Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Full Name</label>
                <input type="text" placeholder="Adam Seumae" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Company</label>
                <input type="text" placeholder="Amazon / Blizzard / Startup" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>
            
            {/* 2. The Friction */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Database size={12} /> The "Friction" (The Lead)</label>
              <textarea placeholder="Describe the manual workflow or data chaos you want to automate..." rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none" />
            </div>

            {/* 3. The Goal */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Target size={12} /> The "Water" (The Goal)</label>
              <textarea placeholder="What autonomous outcome are you looking for?" rows={3} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none" />
            </div>

            {/* 4. Timeline & Optional Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Clock size={12} /> Timeline</label>
                <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>ASAP (Urgent Friction)</option>
                  <option>1-3 Months (Strategic MVP)</option>
                  <option>Exploring / Discovery</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center text-blue-500"><DollarSign size={12} /> Budget Range (Optional)</label>
                <input type="text" placeholder="e.g. $25k - $50k" className="w-full px-6 py-4 bg-blue-50/30 rounded-2xl border border-blue-100 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>

            <button type="button" className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 group mt-4">
              Send Strategy Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* Section 3: Global Impact Matrix */}
      <section id="bulletin" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 italic text-slate-900 tracking-tight text-center underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld" />
          <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP Strategy" />
          <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
          <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
          <OutcomeCard icon={Activity} title="Automation" sub="15 Locales Benchmarked" />
          <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
        </div>
      </section>

      {/* Section 4: LILO OS Case Study */}
      <section id="passion-projects" className="py-32 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-6">LILO OS Case Study</h2>
          <p className="text-lg text-slate-500 font-medium italic font-light leading-relaxed">
            Applying enterprise operational rigor to personal infrastructure through autonomous task dispatching.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passionProjects.map((project) => (
            <div key={project.id} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all hover:border-blue-200 cursor-zoom-in" onClick={() => setSelectedImage(project.imageSrc)}>
              <div className="relative h-56 w-full bg-slate-900">
                <Image src={project.imageSrc} alt={project.altText} fill className="object-cover opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight italic group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-light">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 text-center border-t border-slate-50 italic text-slate-900">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] mb-4">Adam Seumae | Fractional AI Leadership | 2026</p>
      </footer>
    </div>
  );
}

// Sub-components
function OutcomeCard({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-300 group/card flex flex-col items-center">
      <div className="text-blue-600 mb-4 group-hover/card:scale-110 transition-transform"><Icon size={32} /></div>
      <h4 className="font-bold text-slate-900 text-sm tracking-tight leading-tight italic">{title}</h4>
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">{sub}</p>
    </div>
  );
}
