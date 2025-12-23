"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Linkedin, Mail, FileText, Zap, BarChart3, 
  Globe, ArrowUpRight, CheckCircle2,
  Sparkles, ShieldCheck, Map, Activity,
  Maximize2, X, Briefcase, Cpu, Send, MessageSquare,
  Clock, Database, Target, DollarSign, Phone, User,
  ChevronDown, LayoutDashboard
} from 'lucide-react';

// Type for navigation state
type ViewState = 'home' | 'capabilities' | 'impact' | 'casestudy' | 'intake';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form State for Intake (Preserved from your revisions)
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    description: '', outcome: '', timeline: 'ASAP (Urgent Friction)', budget: ''
  });

  const emailAddress = "a.seumae@outlook.com";

  // Mailto Logic (Preserved from your revisions)
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

  // Helper to switch views and scroll to top
  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setIsDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Lightbox for Images */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-white"><X size={32} /></button>
          <div className="relative w-full max-w-6xl aspect-video"><Image src={selectedImage} alt="Preview" fill className="object-contain" /></div>
        </div>
      )}

      {/* Persistent Professional Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center"><span className="text-white font-black text-xs italic">AS</span></div>
            <span className="font-bold tracking-tight text-lg hidden sm:block">Adam Seumae</span>
          </div>

          {/* Centered Dropdown Exploration */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-5 py-2 rounded-full hover:bg-slate-50 transition-all font-semibold text-slate-500 hover:text-blue-600 border border-slate-100"
            >
              Explore Solutions <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                <DropdownItem icon={Cpu} label="AI Capabilities" sub="Agentic Engine Design" onClick={() => navigateTo('capabilities')} />
                <DropdownItem icon={Activity} label="Impact Matrix" sub="Quantitative Proof" onClick={() => navigateTo('impact')} />
                <DropdownItem icon={LayoutDashboard} label="Passion Projects" sub="LILO Case Study" onClick={() => navigateTo('casestudy')} />
              </div>
            )}
          </div>

          <button 
            onClick={() => navigateTo('intake')}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-blue-100 text-sm"
          >
            <MessageSquare size={16} /> Start Project
          </button>
        </div>
      </nav>

      {/* Dynamic Viewport Container */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'capabilities' && <CapabilitiesView />}
        {currentView === 'impact' && <ImpactView />}
        {currentView === 'casestudy' && <CaseStudyView onSelectImg={setSelectedImage} />}
        {currentView === 'intake' && <IntakeView formData={formData} setFormData={setFormData} handleSendEmail={handleSendEmail} />}
      </main>

      <footer className="py-12 text-center border-t border-slate-50">
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.5em] italic">Adam Seumae | Fractional AI Leadership | 2026</p>
      </footer>
    </div>
  );
}

// --- View Sub-Components ---

function HomeView({ onNavigate }: { onNavigate: (v: ViewState) => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20">
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl blur opacity-25"></div>
          <div className="relative w-56 h-56 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
            <Image src="/headshot.jpeg" alt="Headshot" fill className="object-cover" />
          </div>
        </div>
        <div className="max-w-4xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <Sparkles className="text-blue-500" size={12} /> Strategic AI Implementation
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 italic">Building Intelligent <br /><span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic tracking-tight underline decoration-blue-500/30">Agentic Engines.</span></h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium italic mb-10 leading-relaxed">
            Over 10 years of product experience at <strong>Airloom AI, Amazon, AWS and Microsoft (Xbox, Blizzard)</strong> architecting autonomous systems to solve customer problems globally.
          </p>
          <button onClick={() => onNavigate('capabilities')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-2xl transition-all">Explore Capabilities</button>
        </div>
      </div>
    </div>
  );
}

function CapabilitiesView() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center shadow-2xl border border-slate-800">
        <div className="flex-1">
          <h3 className="text-blue-400 font-mono text-sm mb-6 tracking-widest uppercase italic font-bold">// Technical Proof</h3>
          <h2 className="text-5xl font-bold mb-8 italic tracking-tight">Agentic Engine Design</h2>
          <p className="text-slate-400 text-xl leading-relaxed mb-10 font-light italic">
            I build autonomous systems that **Ingest** complex datasets, **Synthesize** intent, and **Execute** multi-step objectives without constant supervision. Whether refining operational friction or scaling global logic, I architect the "Agentic Engines" that plan, decide, and act for your business.
          </p>
          <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
            {['React.js', 'OpenAI API', 'Vercel', 'Firebase'].map(tech => (
              <span key={tech} className="px-4 py-1.5 bg-slate-800 rounded-lg border border-slate-700 text-blue-300 underline underline-offset-4">{tech}</span>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 aspect-square bg-blue-600/10 rounded-[3rem] border border-blue-500/20 flex items-center justify-center relative shadow-inner">
          <Cpu size={140} className="text-blue-500 opacity-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ImpactView() {
  return (
    <div className="animate-in fade-in duration-500 text-center">
      <h2 className="text-4xl font-bold mb-16 italic text-slate-900 tracking-tight underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld" />
        <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP" />
        <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
        <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
        <OutcomeCard icon={Activity} title="Automation" sub="15 Locales Benchmarked" />
        <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
      </div>
      {/* Experience Stack */}
      <div className="max-w-4xl mx-auto space-y-6 text-left">
        <ExperienceCard company="Blizzard Entertainment" role="Product Manager, Battle.net" date="2025-Present" bullets={["Strategy Owner for Video UX across WoW, CoD, and Overwatch.", "Successfully shipped gamepad support for Xbox handheld devices on-time."]} isCurrent={true} />
        <ExperienceCard company="Amazon, AWS & Alexa" role="Product Management" date="2017-2024" bullets={["AWS: Avoided $6M in costs via strategic 3P migration.", "Alexa Ads: Improved domain CTR from 1.2% to 1.8% in Q1."]} />
      </div>
    </div>
  );
}

function CaseStudyView({ onSelectImg }: { onSelectImg: (s: string) => void }) {
  const passionProjects = [
    { id: 'lilo-auth', title: '01. Entry & Identity', description: 'Secure onboarding and authentication logic built on Firebase.', imageSrc: '/lilologin.png' },
    { id: 'lilo-admin', title: '02. Command & Control', description: 'Centralized triage for real-time monitoring and autonomous dispatching.', imageSrc: '/lilo-triage-admin.png' },
    { id: 'lilo-context', title: '03. Contextual Solving', description: 'Synthesizing complex blockers into actionable data points.', imageSrc: '/lilo-blocking-issue.png' },
    { id: 'lilo-view', title: '04. Autonomous Action', description: 'A field-ready execution layer transforming goals into work orders.', imageSrc: '/lilo-employee-view.jpeg' },
    { id: 'lilo-score', title: '05. Reliability Loops', description: 'Tracking individual performance scorecards for Sammy and Lucy.', imageSrc: '/lilo-employee-scorecard.png' },
    { id: 'lilo-metrics', title: '06. Operational Insights', description: 'Automated data synthesis to monitor health and operational friction.', imageSrc: '/lilo-dashboard-admin.png' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-5xl font-extrabold text-slate-900 mb-8 italic">LILO OS Case Study</h2>
      <p className="text-lg text-slate-500 mb-16 font-light italic">Applying enterprise operational rigor to personal infrastructure.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {passionProjects.map((project) => (
          <div key={project.id} className="group rounded-3xl overflow-hidden border border-slate-100 bg-white hover:border-blue-200 transition-all cursor-zoom-in" onClick={() => onSelectImg(project.imageSrc)}>
            <div className="relative h-64 bg-slate-900"><Image src={project.imageSrc} alt={project.id} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform" /></div>
            <div className="p-8"><h3 className="font-bold text-lg italic">{project.title}</h3><p className="text-sm text-slate-400 mt-2">{project.description}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntakeView({ formData, setFormData, handleSendEmail }: any) {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-16 italic tracking-tight">Project Intake</h2>
      <form className="space-y-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="FULL NAME" placeholder="e.g. John Smith" onChange={(v: string) => setFormData({...formData, name: v})} />
          <Input label="EMAIL ADDRESS" placeholder="john.smith@company.com" onChange={(v: string) => setFormData({...formData, email: v})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input label="COMPANY" placeholder="Company Name" onChange={(v: string) => setFormData({...formData, company: v})} />
          <Input label="PHONE / TEXT" placeholder="(555) 000-0000" onChange={(v: string) => setFormData({...formData, phone: v})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex gap-2"><Database size={12} /> OPPORTUNITY DESCRIPTION</label>
          <textarea className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all resize-none font-light" rows={4} placeholder="Describe the manual workflow or process you want to automate..." onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex gap-2"><Target size={12} /> DESIRED OUTCOME</label>
          <textarea className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all resize-none font-light" rows={3} placeholder="What is the project goal or autonomous outcome you want to achieve?" onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4"><Clock size={12} className="inline mr-2" /> TIMELINE</label>
            <select className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent outline-none appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
              <option>ASAP (Urgent Friction)</option>
              <option>1-3 Months (Strategic MVP)</option>
              <option>Exploring / Discovery</option>
            </select>
          </div>
          <Input label="BUDGET RANGE (OPTIONAL)" placeholder="e.g. $1 - $50k" color="text-blue-500" onChange={(v: string) => setFormData({...formData, budget: v})} />
        </div>
        <button type="button" onClick={handleSendEmail} className="w-full bg-slate-900 text-white font-bold py-6 rounded-3xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
          Send Strategy Request <Send size={20} />
        </button>
      </form>
    </div>
  );
}

// --- Helper UI Components ---
function DropdownItem({ icon: Icon, label, sub, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all group text-left">
      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Icon size={18} /></div>
      <div>
        <div className="text-sm font-bold text-slate-900">{label}</div>
        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{sub}</div>
      </div>
    </button>
  );
}

function Input({ label, placeholder, onChange, color = "text-slate-400" }: any) {
  return (
    <div className="space-y-2">
      <label className={`text-[10px] font-black uppercase tracking-widest ${color} ml-4`}>{label}</label>
      <input type="text" placeholder={placeholder} className="w-full px-8 py-5 bg-slate-50 rounded-3xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-light" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function OutcomeCard({ icon: Icon, title, sub }: any) {
  return (
    <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
      <Icon size={32} className="text-blue-600 mb-4" />
      <h4 className="font-bold text-slate-900 italic text-sm">{title}</h4>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">{sub}</p>
    </div>
  );
}

function ExperienceCard({ company, role, date, bullets, isCurrent }: any) {
  return (
    <div className={`p-8 rounded-[2rem] border ${isCurrent ? 'border-blue-200 shadow-lg' : 'border-slate-50'}`}>
      <div className="flex justify-between items-start mb-6">
        <div><h4 className="font-bold text-xl italic">{company}</h4><p className="text-blue-600 font-bold">{role}</p></div>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{date}</span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bullets.map((b: string, i: number) => <li key={i} className="text-sm text-slate-500 font-light flex gap-2"><span className="text-blue-400 font-black">///</span> {b}</li>)}
      </ul>
    </div>
  );
}
