"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Mail, FileText, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Lock, LayoutDashboard,
  Users, LineChart
} from 'lucide-react';

// Interface for Passion Project data
interface PassionProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

export default function Home() {
  const [activeCompany, setActiveCompany] = useState<string>("Blizzard Entertainment");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const resumeLink = "https://docs.google.com/document/d/1RIPyJ5Y6rhjTkhS9cmMDOOraP3Kg2LjE59TIi3Yd2jw/edit?usp=sharing";
  const linkedInURL = "https://www.linkedin.com/in/adamseumae/";
  const mailtoLink = `mailto:a.seumae@outlook.com?subject=${encodeURIComponent("Professional Inquiry")}`;

  // Chronological Story Order for Passion Projects
  const passionProjects: PassionProject[] = [
    { id: 'lilo-auth', title: '01. Entry & Identity', description: 'The front door. Clean authentication and onboarding logic built on Firebase.', imageSrc: '/lilologin.png', altText: 'LILO OS Sign-in' },
    { id: 'lilo-admin-brain', title: '02. Command & Control', description: 'Admin Triage hub. Real-time monitoring and centralized task dispatching.', imageSrc: '/lilo-triage-admin.png', altText: 'LILO OS Admin' },
    { id: 'lilo-issue-detail', title: '03. Contextual Solving', description: 'Drilling into blockers. Capturing bidding details to move stalled tasks forward.', imageSrc: '/lilo-blocking-issue.png', altText: 'LILO OS Blocker' },
    { id: 'lilo-execution', title: '04. Gamified Execution', description: 'Employee view. Transforming chores into XP-enabled Work Orders.', imageSrc: '/lilo-employee-view.jpeg', altText: 'LILO OS Employee' },
    { id: 'lilo-scorecard', title: '05. Feedback Loops', description: 'Individual scorecards. Tracking load and reliability to ensure balance.', imageSrc: '/lilo-employee-scorecard.png', altText: 'LILO OS Scorecard' },
    { id: 'lilo-metrics', title: '06. Operational Insights', description: 'Automated data loops monitoring ROT Index and team reliability.', imageSrc: '/lilo-dashboard-admin.png', altText: 'LILO OS Metrics' },
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

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 font-bold">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><span className="text-white font-black text-xs uppercase italic tracking-tighter">AS</span></div>
            <span className="tracking-tighter text-lg uppercase hidden sm:block tracking-widest">Adam Seumae</span>
          </div>
          <div className="flex gap-8 items-center text-sm font-semibold text-slate-500">
            <a href="#bulletin" className="hover:text-blue-600 transition-colors">Bulletin Board</a>
            <a href="#passion-projects" className="hover:text-blue-600 transition-colors">Passion Projects</a>
            <a href={resumeLink} target="_blank" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all flex items-center gap-2"><FileText size={16} /> View Resume</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-48 h-48 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
              <Image src="/headshot.jpeg" alt="Headshot" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <a href={linkedInURL} target="_blank" className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 hover:scale-110 transition-transform">
              <div className="flex items-center gap-2"><Linkedin size={20} className="text-[#0077b5]" /><span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verified</span></div>
            </a>
          </div>
          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
              Product @ Blizzard Battle.net
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">Product Leader. <br /><span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic tracking-tight">Strategic Builder.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl">Over a decade driving strategy at <strong>Amazon, Microsoft, and Blizzard</strong>. Specializing in launching products that reduce waste and drive profitability.</p>
          </div>
        </div>
      </header>

      {/* Bulletin Board Section */}
      <section id="bulletin" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 italic text-slate-900 tracking-tight">Professional Bulletin Board</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Outcomes Matrix */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Activity size={14} /> Global Impact Matrix</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OutcomeCard icon={Zap} title="On-Time Delivery" sub="Battle.net Gamepad Support" />
                <OutcomeCard icon={ShieldCheck} title="MVP Launch" sub="Airloom AI Ops" />
                <OutcomeCard icon={BarChart3} title="$6M Saved" sub="AWS Cost Avoidance" />
                <OutcomeCard icon={Globe} title="80% Coverage" sub="Alexa Ad Growth" />
                <OutcomeCard icon={Activity} title="15 Locales" sub="Global Benchmarking Automation" />
                <OutcomeCard icon={Map} title="The Americas" sub="Alexa Preview Expansion" />
              </div>
            </div>

            {/* Right Column: Experience Card */}
            <div className="lg:col-span-1">
              <h3 className="text-xs uppercase font-black tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Briefcase size={14} /> Current Engagement</h3>
              <div className="space-y-4">
                <ExperienceCard 
                  company="Blizzard Entertainment" role="Product Manager, Battle.net" date="Aug 2025 — Present"
                  bullets={["Strategy Owner: Video UX for major franchises.", "Delivered Gamepad support on-time.", "Standardized leadership reporting."]}
                  isActive={activeCompany === "Blizzard Entertainment"} onSelect={() => setActiveCompany("Blizzard Entertainment")}
                />
                <ExperienceCard 
                  company="Airloom AI" role="Product Ops" date="2024 — 2025"
                  bullets={["Delivered AI Search MVP to market.", "Engineered core business operations."]}
                  isActive={activeCompany === "Airloom AI"} onSelect={() => setActiveCompany("Airloom AI")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering / AI Proof */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1">
              <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold"><Sparkles className="inline mr-2" size={16} /> // Tech Stack</h3>
              <h2 className="text-4xl font-bold mb-6 italic tracking-tight">AI Product Development</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">Designed a context-aware LLM agent using OpenAI API and Firebase. Built to help teams develop AI products through dynamic persona logic.</p>
              <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                {['React.js', 'OpenAI API', 'Vercel', 'Firebase'].map(tech => (
                  <span key={tech} className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">{tech}</span>
                ))}
              </div>
           </div>
           <div className="w-full md:w-1/3 aspect-square bg-blue-600/10 rounded-3xl border border-blue-500/20 flex items-center justify-center relative">
             <Cpu size={120} className="text-blue-500 opacity-20" />
             <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-xs text-center p-8">Building intelligent systems for complex workflows.</div>
           </div>
        </div>
      </section>

      {/* Passion Projects: The LILO Story */}
      <section id="passion-projects" className="py-32 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-6 underline decoration-blue-600 decoration-4 underline-offset-8">Passion Projects</h2>
          <p className="text-lg text-slate-500 font-medium italic">Solving real-world friction. LILO OS is a "Family Operating System" designed to dispatch the chaos of home management.</p>
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

      <footer className="py-24 text-center text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] border-t border-slate-50 italic">Adam Seumae | a.seumae@outlook.com | 2026</footer>
    </div>
  );
}

// Fixed Sub-components
function OutcomeCard({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 group/card">
      <div className="text-blue-600 mb-3 group-hover/card:scale-110 transition-transform"><Icon size={28} /></div>
      <h4 className="font-bold text-slate-900 mb-1 tracking-tight">{title}</h4>
      <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">{sub}</p>
    </div>
  );
}

function ExperienceCard({ company, role, date, bullets, isActive, onSelect }: any) {
  return (
    <div onClick={onSelect} className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${isActive ? 'bg-white border-blue-200 shadow-lg scale-[1.02]' : 'bg-transparent border-slate-100 opacity-50 grayscale'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-900 italic text-lg">{company}</h4>
          <p className="text-sm text-blue-600 font-medium">{role}</p>
        </div>
        <div className="text-[10px] font-mono font-bold text-slate-400">{date}</div>
      </div>
      <ul className="space-y-2">
        {bullets.map((b: string, i: number) => (
          <li key={i} className="text-xs text-slate-500 flex gap-2"><span className="text-blue-400">///</span> {b}</li>
        ))}
      </ul>
    </div>
  );
}
