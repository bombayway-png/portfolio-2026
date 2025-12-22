"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Github, Mail, FileText, 
  Cpu, Briefcase, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X
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

  // Verified contact and social links
  const resumeLink = "https://docs.google.com/document/d/1RIPyJ5Y6rhjTkhS9cmMDOOraP3Kg2LjE59TIi3Yd2jw/edit?usp=sharing";
  const linkedInURL = "https://www.linkedin.com/in/adamseumae/";
  const emailAddress = "a.seumae@outlook.com";
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent("Opportunity Inquiry")}`;

  // Verified Passion Project Data - Mapping to your uploaded files
  const passionProjects: PassionProject[] = [
    {
      id: 'lilo-os-admin',
      title: 'LILO OS: Admin Triage',
      description: 'A comprehensive "family operating system" dashboard for dispatching tasks, tracking squad status, and managing household chaos.',
      imageSrc: '/lilo-triage-admin.png',
      altText: 'LILO OS Admin Dashboard view.',
    },
    {
      id: 'lilo-os-blocker',
      title: 'Contextual Issue Tracking',
      description: 'Detailed task modals capturing blockers (e.g., drywall bids) with integrated effort ratings and artifact management.',
      imageSrc: '/lilo-blocking-issue.png',
      altText: 'LILO OS Blocker reporting view.',
    },
    {
      id: 'lilo-os-metrics',
      title: 'Team Reliability & Scorecards',
      description: 'Data-driven performance tracking featuring a "ROT Index" (tasks pending > 5 days) and real-time completion rates.',
      imageSrc: '/lilo-dashboard-admin.png',
      altText: 'LILO OS Team Metrics dashboard.',
    },
    {
      id: 'lilo-os-employee',
      title: 'Gamified Task Execution',
      description: 'Employee-facing view that transforms chores into "work orders" with XP and clear instructions for Sammy and Lucy.',
      imageSrc: '/lilo-employee-view.jpeg',
      altText: 'LILO OS Employee work order view.',
    },
    {
      id: 'lilo-os-scorecard',
      title: 'Individual Performance',
      description: 'Visual scorecards tracking current load and reliability status across team members to prevent operational burnout.',
      imageSrc: '/lilo-employee-scorecard.png',
      altText: 'LILO OS Employee scorecard.',
    },
    {
      id: 'lilo-os-auth',
      title: 'Authentication & Onboarding',
      description: 'Clean, dark-mode entry points for account creation and team code integration to scale the family unit.',
      imageSrc: '/lilologin.png',
      altText: 'LILO OS Sign-in screen.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-blue-400 transition-colors">
            <X size={32} />
          </button>
          <div className="relative w-full max-w-6xl aspect-video">
            <Image src={selectedImage} alt="Expanded view" fill className="object-contain" />
          </div>
        </div>
      )}

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
            <a href="#passion-projects" className="hover:text-blue-600 transition-colors">Passion Projects</a>
            <a 
              href={resumeLink} 
              target="_blank" 
              className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
            >
              <FileText size={16} /> View Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
              <Image src="/headshot.jpeg" alt="Adam Seumae Headshot" fill className="object-cover transition-transform duration-500 group-hover:scale-110" priority />
            </div>
            {/* LinkedIn Verified Badge */}
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
              <a href={mailtoLink} className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-2xl transition-all hover:-translate-y-0.5">
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

      {/* Engineering proof & Key Outcomes */}
      <section id="engineering" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl text-white relative overflow-hidden border border-slate-800">
               <h3 className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase italic font-bold">
                 <Sparkles className="inline mr-2" size={16} /> // Technical Proof of Work
               </h3>
               <h2 className="text-3xl font-bold mb-6 italic text-white tracking-tight">AI Product Development</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Designed and deployed a context-aware LLM agent using the OpenAI API. Built with a modern stack featuring dynamic persona logic and real-time database integration.
               </p>
               <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                 {['React.js', 'OpenAI API', 'Vercel', 'Firebase'].map(tech => (
                   <span key={tech} className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">{tech}</span>
                 ))}
               </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8 tracking-tight text-slate-900 italic">Key Outcomes</h2>
              <div className="grid grid-cols-2 gap-4">
                <OutcomeCard icon={<Zap />} title="On-Time Delivery" sub="Battle.net Gamepad Support" />
                <OutcomeCard icon={<ShieldCheck />} title="MVP Launch" sub="Airloom AI Ops" />
                <OutcomeCard icon={<BarChart3 />} title="$6M Saved" sub="AWS Cost Avoidance" />
                <OutcomeCard icon={<Globe />} title="80% Coverage" sub="Alexa Ad Growth" />
                <OutcomeCard icon={<Activity />} title="15 Locales" sub="Global Benchmarking Automation" />
                <OutcomeCard icon={<Map />} title="The Americas" sub="Alexa Preview Expansion" />
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
            date="Aug 2025 — Present" company="Blizzard Entertainment" role="Product Manager, Battle.net"
            bullets={["Delivered gamepad support for Battle.net Xbox handheld devices on-time.", "Strategy Owner: Video Consumption UX for major franchises (WoW, CoD, Overwatch).", "Launched executive BI dashboards and standardized leadership reporting."]}
            isActive={activeCompany === "Blizzard Entertainment"} onSelect={() => setActiveCompany("Blizzard Entertainment")}
          />
          <ExperienceCard 
            date="2024 — 2025" company="Airloom AI" role="Product Ops & Customer Development"
            bullets={["Successfully co-delivered the Minimum Viable Product (MVP) to market.", "Engineered core business operations: intake, feedback loops, and bug reporting.", "Managed product-market fit analysis through direct customer development loops."]}
            isActive={activeCompany === "Airloom AI"} onSelect={() => setActiveCompany("Airloom AI")}
          />
          <ExperienceCard 
            date="2017 — 2024" company="Amazon & AWS" role="Product & Program Management"
            bullets={["AWS: Managed migration off 3P software, avoiding a multi-year $6M contract renewal.", "Alexa Ads: Increased domain Click-Through-Rate (CTR) from 1.2% to 1.8% in Q1.", "International: Automated benchmarking across 15 locales, defining global metrics.", "Program: Scaled global recruitment program that increased customer pipeline by 20x."]}
            isActive={activeCompany === "Amazon & AWS"} onSelect={() => setActiveCompany("Amazon & AWS")}
          />
        </div>
      </section>

      {/* Passion Projects Section */}
      <section id="passion-projects" className="py-32 max-w-6xl mx-auto px-6 border-t border-slate-100">
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-20 underline decoration-blue-600 decoration-4 underline-offset-8">
          Passion Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {passionProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 cursor-zoom-in"
              onClick={() => setSelectedImage(project.imageSrc)}
            >
              <div className="relative h-56 w-full bg-slate-900">
                <Image src={project.imageSrc} alt={project.altText} fill className="object-cover opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={16} className="text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight italic group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-light">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 text-center text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] border-t border-slate-50 italic">
        Adam Seumae | a.seumae@outlook.com | 2026
      </footer>
    </div>
  );
}

// Sub-components
function OutcomeCard({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 group/card">
      <div className="text-blue-600 mb-3 group-hover/card:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <h4 className="font-bold text-slate-900 mb-1 tracking-tight">{title}</h4>
      <p className="text-xs text-slate-400 uppercase font-bold tracking-[0.15em] italic">{sub}</p>
    </div>
  );
}

function ExperienceCard({ date, company, role, bullets, isActive, onSelect }: any) {
  return (
    <div onClick={onSelect} className={`cursor-pointer group p-8 md:p-12 rounded-[2.5rem] transition-all duration-700 border ${isActive ? 'bg-white border-blue-200 shadow-2xl scale-[1.01] opacity-100' : 'bg-transparent border-slate-100 opacity-25 grayscale blur-[1px] scale-[0.98]'}`}>
      <div className="grid md:grid-cols-[200px_1fr] gap-12 text-slate-900">
        <div className={`font-mono text-[10px] uppercase tracking-widest font-bold pt-2 italic ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{date}</div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`text-3xl font-bold italic ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-blue-600'}`}>{company}</h3>
            {isActive && <CheckCircle2 size={20} className="text-blue-500" />}
          </div>
          <p className={`text-xl mb-8 font-medium italic underline decoration-2 ${isActive ? 'text-blue-500 decoration-blue-200' : 'text-slate-500 decoration-slate-100'}`}>{role}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 leading-relaxed text-sm font-light">
            {bullets.map((b: string, i: number) => (
              <li key={i} className="flex gap-4">
                <span className={`font-bold mt-1 text-[8px] tracking-[0.3em] ${isActive ? 'text-blue-500' : 'text-slate-300'}`}>///</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}