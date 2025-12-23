"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Mail, FileText, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Briefcase, Cpu, Calendar, Send
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

  const resumeLink = "https://docs.google.com/document/d/1RIPyJ5Y6rhjTkhS9cmMDOOraP3Kg2LjE59TIi3Yd2jw/edit?usp=sharing";
  const linkedInURL = "https://www.linkedin.com/in/adamseumae/";
  
  // Professional Mailto Routing for iCloud/Outlook
  const emailAddress = "a.seumae@outlook.com";
  const emailSubject = encodeURIComponent("AI Strategy Consultation Inquiry");
  const emailBody = encodeURIComponent("Hi Adam,\n\nI saw your Agentic AI proof of work and your experience at Blizzard/Amazon. I'd like to discuss a potential AI use case for my business.\n\nBest,");
  const schedulingLink = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  const passionProjects: PassionProject[] = [
    { id: 'lilo-auth', title: '01. Entry & Identity', description: 'Secure onboarding and authentication logic for proprietary team data.', imageSrc: '/lilologin.png', altText: 'LILO OS Sign-in' },
    { id: 'lilo-admin-brain', title: '02. Command & Control', description: 'Centralized triage for real-time monitoring and autonomous dispatching.', imageSrc: '/lilo-triage-admin.png', altText: 'LILO OS Admin' },
    { id: 'lilo-issue-detail', title: '03. Contextual Awareness', description: 'Synthesizing complex blockers into actionable data points.', imageSrc: '/lilo-blocking-issue.png', altText: 'LILO OS Blocker' },
    { id: 'lilo-execution', title: '04. Autonomous Action', description: 'A field-ready execution layer transforming goals into completed work orders.', imageSrc: '/lilo-employee-view.jpeg', altText: 'LILO OS Employee' },
    { id: 'lilo-scorecard', title: '05. Reliability Loops', description: 'Tracking individual performance and system stability at scale.', imageSrc: '/lilo-employee-scorecard.png', altText: 'LILO OS Scorecard' },
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
            <a href="#engineering" className="hover:text-blue-600 transition-colors">AI Capabilities</a>
            <a href="#bulletin" className="hover:text-blue-600 transition-colors">Impact</a>
            <a href={schedulingLink} className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-blue-200"><Send size={16} /> Contact Adam</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
              <Image src="/headshot.jpeg" alt="Headshot" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles className="text-blue-500" size={12} /> Fractional AI Leadership
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 italic">Intelligent Systems for <br /><span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic tracking-tight underline decoration-blue-500/30">Complex Workflows.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium italic mb-10 leading-relaxed">
              Leveraging over 10 years of leadership at <strong>Amazon, Microsoft, and Blizzard</strong> to architect the Agentic Engines of the future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href={schedulingLink} className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-2xl transition-all hover:-translate-y-1">
                Request Strategy Session <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1: AI Capabilities */}
      <section id="engineering" className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center border border-slate-800">
           <div className="flex-1">
              <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold">// Strategic Capability</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">Agentic Engine Design</h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-light italic">
                I build autonomous systems that **Ingest** complex datasets, **Synthesize** intent, and **Execute** multi-step objectives without constant human supervision. 
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm font-mono text-blue-300">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Data Synthesis</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Autonomous Planning</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Real-time Execution</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Scalable GTM</div>
              </div>
           </div>
           <div className="w-full lg:w-1/3 aspect-square bg-blue-600/10 rounded-[3rem] border border-blue-500/20 flex items-center justify-center relative shadow-inner">
             <Cpu size={120} className="text-blue-500 opacity-20 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Section 2: Professional Bulletin Board */}
      <section id="bulletin" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 italic text-slate-900 tracking-tight text-center underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld Launch" />
            <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP Strategy" />
            <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
            <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
            <OutcomeCard icon={Activity} title="Automation" sub="Global Benchmarking" />
            <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <ExperienceCard 
              company="Blizzard Entertainment" role="Product Manager, Battle.net" date="Aug 2025 — Present"
              bullets={["Directing Video UX strategy for major franchises.", "Delivered hardware-optimized handheld support on-time.", "Standardizing executive reporting and BI workflows."]}
              isCurrent={true}
            />
            <ExperienceCard 
              company="Airloom AI" role="Fractional Product Operations" date="2024 — 2025"
              bullets={["Guided AI Search MVP from concept to production launch.", "Engineered core operational loops for customer development."]}
            />
            <ExperienceCard 
              company="Amazon, AWS & Alexa" role="Product & Program Management" date="2017 — 2024"
              bullets={["AWS: Saved $6M through strategic migration of global 3P software.", "Alexa Ads: Optimized CTR from 1.2% to 1.8% through AI-driven benchmarking.", "Expansion: Scaled Alexa's footprint across the Americas."]}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Passion Projects */}
      <section id="passion-projects" className="py-32 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-6">Case Study: LILO OS</h2>
          <p className="text-lg text-slate-500 font-medium italic font-light leading-relaxed">
            A deep-dive into operational friction. LILO OS is a proprietary "Family Operating System" built to solve home management chaos through data-driven task dispatching and gamification.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passionProjects.map((project) => (
            <div key={project.id} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 cursor-zoom-in" onClick={() => setSelectedImage(project.imageSrc)}>
              <div className="relative h-56 w-full bg-slate-900">
                <Image src={project.imageSrc} alt={project.altText} fill className="object-cover opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 size={16} className="text-white" /></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight italic group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-light">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 text-center border-t border-slate-50">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] italic mb-8">Adam Seumae | Product Leadership | 2026</p>
        <a href={schedulingLink} className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4 font-mono uppercase tracking-widest text-xs italic">Build your Agentic Engine &rarr;</a>
      </footer>
    </div>
  );
}

// Sub-components
function OutcomeCard({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-300 group/card flex flex-col items-center text-center">
      <div className="text-blue-600 mb-4 group-hover/card:scale-110 transition-transform"><Icon size={32} /></div>
      <h4 className="font-bold text-slate-900 text-sm tracking-tight leading-tight italic">{title}</h4>
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">{sub}</p>
    </div>
  );
}

function ExperienceCard({ company, role, date, bullets, isCurrent = false }: any) {
  return (
    <div className={`p-8 rounded-2xl border transition-all duration-500 bg-white ${isCurrent ? 'border-blue-200 shadow-lg ring-1 ring-blue-50' : 'border-slate-100 hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-bold text-slate-900 italic text-2xl tracking-tight">{company}</h4>
          <p className="text-lg text-blue-600 font-semibold italic">{role}</p>
        </div>
        <div className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{date}</div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {bullets.map((b: string, i: number) => (
          <li key={i} className="text-sm text-slate-600 flex gap-3 font-light leading-relaxed">
            <span className="text-blue-400 font-black tracking-tighter shrink-0 mt-0.5">///</span> {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
