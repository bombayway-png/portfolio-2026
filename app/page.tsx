"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Mail, FileText, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Briefcase, Cpu, Send, MessageSquare,
  Clock, Database, Target, DollarSign, Phone, User
} from 'lucide-react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form State for Intake
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    description: '',
    outcome: '',
    timeline: 'ASAP (Urgent Friction)',
    budget: ''
  });

  const emailAddress = "a.seumae@outlook.com";

  // Handles the "Send Strategy Request" action via Mailto
  const handleSendEmail = () => {
    const subject = encodeURIComponent(`AI Strategy Inquiry: ${formData.company || 'New Project'}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone/Text: ${formData.phone}\n` +
      `Company: ${formData.company}\n\n` +
      `Opportunity Description:\n${formData.description}\n\n` +
      `Desired Outcome:\n${formData.outcome}\n\n` +
      `Timeline: ${formData.timeline}\n` +
      `Optional Budget: ${formData.budget || 'Not Provided'}`
    );
    
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const passionProjects = [
    { id: 'lilo-auth', title: '01. Entry & Identity', description: 'Secure onboarding and authentication logic built on Firebase.', imageSrc: '/lilologin.png' },
    { id: 'lilo-admin', title: '02. Command & Control', description: 'Centralized triage for real-time monitoring and autonomous dispatching.', imageSrc: '/lilo-triage-admin.png' },
    { id: 'lilo-context', title: '03. Contextual Solving', description: 'Synthesizing complex blockers into actionable data points.', imageSrc: '/lilo-blocking-issue.png' },
    { id: 'lilo-view', title: '04. Autonomous Action', description: 'A field-ready execution layer transforming goals into work orders.', imageSrc: '/lilo-employee-view.jpeg' },
    { id: 'lilo-score', title: '05. Reliability Loops', description: 'Tracking individual performance scorecards for Sammy and Lucy.', imageSrc: '/lilo-employee-scorecard.png' },
    { id: 'lilo-metrics', title: '06. Operational Insights', description: 'Automated data synthesis to monitor health and operational friction.', imageSrc: '/lilo-dashboard-admin.png' },
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
          <a href="#intake" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-blue-200"><MessageSquare size={16} /> Start Project</a>
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
              Over 10 years of leadership at <strong>Amazon, AWS, and Blizzard</strong> architecting autonomous systems.
            </p>
          </div>
        </div>
      </header>

      {/* Section 1: AI Technical Proof */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center border border-slate-800">
           <div className="flex-1">
              <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold">// Technical Proof</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 italic tracking-tight">Agentic Engine Design</h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-light italic">
                I build autonomous systems that **Ingest** complex datasets, **Synthesize** intent, and **Execute** multi-step objectives without constant human supervision. 
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                {['React.js', 'OpenAI API', 'Vercel', 'Firebase'].map(tech => (
                  <span key={tech} className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">{tech}</span>
                ))}
              </div>
           </div>
           <div className="w-full lg:w-1/3 aspect-square bg-blue-600/10 rounded-[3rem] border border-blue-500/20 flex items-center justify-center relative shadow-inner">
             <Cpu size={120} className="text-blue-500 opacity-20 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Section 2: Updated Project Intake Form */}
      <section id="intake" className="py-24 bg-slate-50 border-y border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 italic tracking-tight">Project Intake</h2>
            <p className="text-slate-500 font-medium italic font-light italic">Define your use case to begin the architecture process.</p>
          </div>
          <form className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">FULL NAME</label>
                <input type="text" placeholder="e.g. John Smith" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">EMAIL ADDRESS</label>
                <input type="email" placeholder="john.smith@company.com" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">COMPANY</label>
                <input type="text" placeholder="Company Name" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">PHONE / TEXT</label>
                <input type="tel" placeholder="(555) 000-0000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Database size={12} /> OPPORTUNITY DESCRIPTION</label>
              <textarea placeholder="Tell me about the project you want to build. Describe the manual workflow or process you want to automate..." rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none font-light" onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Target size={12} /> DESIRED OUTCOME</label>
              <textarea placeholder="What is the project goal and/or autonomous outcome you want to achieve?" rows={3} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none font-light" onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Clock size={12} /> TIMELINE</label>
                <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
                  <option>ASAP (Urgent Friction)</option>
                  <option>1-3 Months (Strategic MVP)</option>
                  <option>Exploring / Discovery</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center text-blue-500"><DollarSign size={12} /> BUDGET RANGE (OPTIONAL)</label>
                <input type="text" placeholder="e.g. $1 - $50k" className="w-full px-6 py-4 bg-blue-50/30 rounded-2xl border border-blue-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              </div>
            </div>

            <button type="button" onClick={handleSendEmail} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 group mt-4">
              Send Strategy Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* Section 3: Global Impact Matrix */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 italic text-slate-900 tracking-tight underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld" />
          <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP Strategy" />
          <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
          <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
          <OutcomeCard icon={Activity} title="Automation" sub="15 Locales Benchmarked" />
          <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
        </div>

        {/* Career Narrative Stack */}
        <div className="max-w-5xl mx-auto space-y-8 text-left">
          <ExperienceCard 
            company="Blizzard Entertainment" role="Product Manager, Battle.net" date="Aug 2025 — Present"
            bullets={["Strategy Owner for Video UX across WoW, CoD, and Overwatch.", "Successfully shipped gamepad support for Xbox handheld devices on-time.", "Launched standardized executive BI dashboards for leadership reporting."]}
            isCurrent={true}
          />
          <ExperienceCard 
            company="Airloom AI" role="Product Ops & Customer Development" date="2024 — 2025"
            bullets={["Delivered the AI Search Minimum Viable Product (MVP) to market.", "Architected core feedback loops and bug reporting operations."]}
          />
          <ExperienceCard 
            company="Amazon, AWS & Alexa" role="Product & Program Management" date="2017 — 2024"
            bullets={["AWS: Avoided $6M in software costs via strategic 3P migration.", "Alexa Ads: Improved domain CTR from 1.2% to 1.8% in Q1.", "International: Automated global benchmarking across 15 locales.", "Expansion: Scaled Alexa Preview across the Americas, growing pipeline 20x."]}
          />
        </div>
      </section>

      {/* Section 4: LILO Case Study */}
      <section id="passion-projects" className="py-32 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-6 underline decoration-blue-600 decoration-4 underline-offset-8">Passion Projects</h2>
          <p className="text-lg text-slate-500 font-medium italic font-light leading-relaxed italic">
            Applying enterprise operational rigor to personal infrastructure.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passionProjects.map((project) => (
            <div key={project.id} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all hover:border-blue-200 cursor-zoom-in" onClick={() => setSelectedImage(project.imageSrc)}>
              <div className="relative h-56 w-full bg-slate-900">
                <Image src={project.imageSrc} alt={project.id} fill className="object-cover opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
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

      <footer className="py-24 text-center border-t border-slate-50 italic text-slate-900">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] mb-4">Adam Seumae | Fractional AI Leadership | 2026</p>
      </footer>
    </div>
  );
}

function OutcomeCard({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-300 group/card flex flex-col items-center">
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
