"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Github, Mail, FileText, 
  Cpu, Briefcase, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity
} from 'lucide-react';

export default function Home() {
  const [activeCompany, setActiveCompany] = useState<string>("Blizzard Entertainment");

  // Verified contact and social links
  const resumeLink = "https://docs.google.com/document/d/1RIPyJ5Y6rhjTkhS9cmMDOOraP3Kg2LjE59TIi3Yd2jw/edit?usp=sharing";
  const linkedInURL = "https://www.linkedin.com/in/adamseumae/";
  
  // Encoded email with automated subject line placeholders
  const emailAddress = "a.seumae@outlook.com";
  const emailSubject = encodeURIComponent("Opportunity Inquiry from [Contact Name] with [Company Name]");
  const mailtoLink = `mailto:${emailAddress}?subject=${emailSubject}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-50/60 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 font-bold">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs uppercase italic tracking-tighter">AS</span>
            </div>
            <span className="tracking-tighter text-lg uppercase hidden sm:block tracking-widest">Adam Seumae</span>
          </div>
          
          <div className="flex gap-8 items-center text-sm font-semibold text-slate-500">
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a 
              href={resumeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
            >
              <FileText size={16} className="group-hover:rotate-12 transition-transform" /> 
              View Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
              <Image 
                src="/headshot.jpeg" 
                alt="Adam Seumae Headshot"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
            <a 
              href={linkedInURL}
              target="_blank"
              className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 hover:scale-110 transition-transform group/link"
            >
              <div className="flex items-center gap-2">
                <Linkedin size={20} className="text-[#0077b5]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover/link:text-blue-600">Verified</span>
              </div>
            </a>
          </div>

          <div className="max-w-4xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Product Battle.net App @ Blizzard
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
              Product Leader. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic tracking-tight">Strategic Builder.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-12 max-w-2xl font-medium">
              Over a decade of experience driving strategic vision at <strong>Amazon, Microsoft, and Blizzard</strong>. I specialize in launching products that drive 
              <span className="text-slate-900 font-bold italic"> profitability, team satisfaction, customer satisfaction and reducing waste.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href={mailtoLink}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                Let's Chat <ArrowUpRight size={20} />
              </a>
              <div className="flex gap-2">
                <a href={linkedInURL} target="_blank" className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm">
                  <Linkedin size={24} />
                </a>
                <a href={mailtoLink} className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Engineering proof */}
      <section id="engineering" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden group border border-slate-800">
               <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold">
                 <Sparkles className="inline mr-2" size={16} /> // Technical Proof of Work
               </h3>
               <h2 className="text-3xl font-bold mb-6 italic text-white tracking-tight">AI Product Development</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Designed and deployed a context-aware LLM agent using the OpenAI API. 
                Built with a modern stack featuring dynamic persona logic and real-time database integration.
               </p>
               <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                 <span className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">React.js</span>
                 <span className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">OpenAI API</span>
                 <span className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">Vercel</span>
                 <span className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">Firebase</span>
               </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8 tracking-tight text-slate-900 italic">Key Outcomes</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 italic font-light">
                Specializing in data-driven decision-making and global benchmarking across high-scale organizations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Blizzard / Battle.net */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <Zap className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">On-Time Delivery</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">Battle.net Gamepad Support</p>
                </div>
                {/* 2. Airloom AI */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <ShieldCheck className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">MVP Launch</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">Airloom AI Ops</p>
                </div>
                {/* 3. AWS (Switched) */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <BarChart3 className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">$6M Saved</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">AWS Cost Avoidance</p>
                </div>
                {/* 4. Alexa Ads */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <Globe className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">80% Domain Coverage</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">Alexa Ad Growth</p>
                </div>
                 {/* 5. International Benchmarking */}
                 <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <Activity className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">15 Locales</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">Global Benchmarking Automation</p>
                </div>
                {/* 6. Alexa Preview (Switched) */}
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                   <Map className="text-blue-600 mb-3" size={28} />
                   <h4 className="font-bold text-slate-900 mb-1 tracking-tight">The Americas</h4>
                   <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">Alexa Preview Expansion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-20 underline decoration-blue-600 decoration-4 underline-offset-8">
          Recent Professional Experience
        </h2>

        <div className="space-y-8">
          <ExperienceCard 
            date="Aug 2025 — Present"
            company="Blizzard Entertainment"
            role="Product Manager, Battle.net"
            bullets={[
              "Delivered gamepad support for Battle.net Xbox handheld devices on-time.",
              "Strategy Owner: Video Consumption UX for major franchises (WoW, CoD, Overwatch).",
              "Launched executive BI dashboards and standardized leadership reporting."
            ]}
            isActive={activeCompany === "Blizzard Entertainment"}
            onSelect={() => setActiveCompany("Blizzard Entertainment")}
          />

          <ExperienceCard 
            date="2024 — 2025"
            company="Airloom AI"
            role="Product Ops & Customer Development"
            bullets={[
              "Successfully co-delivered the Minimum Viable Product (MVP) to market.",
              "Engineered core business operations: intake, feedback loops, and bug reporting.",
              "Managed product-market fit analysis through direct customer development loops."
            ]}
            isActive={activeCompany === "Airloom AI"}
            onSelect={() => setActiveCompany("Airloom AI")}
          />

          <ExperienceCard 
            date="2017 — 2024"
            company="Amazon & AWS"
            role="Product & Program Management"
            bullets={[
              "AWS: Managed migration off 3P software, avoiding a multi-year $6M contract renewal.",
              "Alexa Ads: Increased domain Click-Through-Rate (CTR) from 1.2% to 1.8% in Q1.",
              "International: Automated benchmarking across 15 locales, defining global metrics.",
              "Program: Scaled global recruitment program that increased customer pipeline by 20x."
            ]}
            isActive={activeCompany === "Amazon & AWS"}
            onSelect={() => setActiveCompany("Amazon & AWS")}
          />
        </div>
      </section>

      <footer className="py-24 text-center text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] border-t border-slate-50 italic">
        Adam Seumae | a.seumae@outlook.com | 2026
      </footer>
    </div>
  );
}

// Experience Card Component with interaction logic
interface ExperienceCardProps {
  date: string;
  company: string;
  role: string;
  bullets: string[];
  isActive: boolean;
  onSelect: () => void;
}

function ExperienceCard({ date, company, role, bullets, isActive, onSelect }: ExperienceCardProps) {
  return (
    <div 
      onClick={onSelect}
      className={`cursor-pointer group p-8 md:p-12 rounded-[2.5rem] transition-all duration-700 border
        ${isActive 
          ? 'bg-white border-blue-200 shadow-2xl shadow-blue-500/10 scale-[1.01] ring-1 ring-blue-50 opacity-100' 
          : 'bg-transparent border-slate-100 opacity-25 grayscale blur-[1px] scale-[0.98]'
        }
      `}
    >
      <div className="grid md:grid-cols-[200px_1fr] gap-12 text-slate-900">
        <div className={`font-mono text-[10px] uppercase tracking-widest font-bold pt-2 italic transition-colors
          ${isActive ? 'text-blue-600' : 'text-slate-400'}
        `}>
          {date}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`text-3xl font-bold tracking-tight italic transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-blue-600'}`}>
              {company}
            </h3>
            {isActive && <CheckCircle2 size={20} className="text-blue-500 animate-in zoom-in duration-300" />}
          </div>
          <p className={`text-xl mb-8 font-medium tracking-tight italic underline decoration-2 transition-all
            ${isActive ? 'text-blue-500 decoration-blue-200' : 'text-slate-500 decoration-slate-100'}
          `}>
            {role}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 max-w-5xl leading-relaxed text-sm font-light">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-4">
                <span className={`font-bold mt-1 text-[8px] tracking-[0.3em] transition-colors
                  ${isActive ? 'text-blue-500' : 'text-slate-300'}
                `}>///</span> 
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}