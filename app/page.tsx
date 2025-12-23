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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
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
              <Sparkles className="text-blue-500" size={12} /> Fractional AI Leadership
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
           </div>
           <div className="w-full lg:w-1/3 aspect-square bg-blue-600/10 rounded-[3rem] border border-blue-500/20 flex items-center justify-center relative">
             <Cpu size={120} className="text-blue-500 opacity-20 animate-pulse" />
           </div>
        </div>
      </section>

      {/* Section 2: Refined Project Intake Form */}
      <section id="intake" className="py-24 bg-slate-50 border-y border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 italic tracking-tight">Project Intake</h2>
            <p className="text-slate-500 font-medium italic font-light italic">Define your use case to begin the architecture process.</p>
          </div>
          <form className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Full Name</label>
                <input type="text" placeholder="e.g. John Smith" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Email Address</label>
                <input type="email" placeholder="john.smith@company.com" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Company</label>
                <input type="text" placeholder="Company Name" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Phone / Text</label>
                <input type="tel" placeholder="(555) 000-0000" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Database size={12} /> Opportunity Description</label>
              <textarea placeholder="Tell me about the project you want to build. Describe the manual workflow or process you want to automate..." rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none" onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Target size={12} /> Desired Outcome</label>
              <textarea placeholder="What is the project goal and/or autonomous outcome are you looking for?" rows={3} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all resize-none" onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center"><Clock size={12} /> Timeline</label>
                <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
                  <option>ASAP (Urgent Friction)</option>
                  <option>1-3 Months (Strategic MVP)</option>
                  <option>Exploring / Discovery</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2 flex gap-2 items-center text-blue-500"><DollarSign size={12} /> Budget Range (Optional)</label>
                <input type="text" placeholder="e.g. $1 - $50k" className="w-full px-6 py-4 bg-blue-50/30 rounded-2xl border border-blue-100 focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              </div>
            </div>

            <button type="button" onClick={handleSendEmail} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 group mt-4">
              Send Strategy Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* Section 3: Impact Matrix */}
      <section id="bulletin" className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 italic text-slate-900 tracking-tight underline decoration-blue-500 decoration-2 underline-offset-8">Global Impact Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <OutcomeCard icon={Zap} title="Efficiency" sub="Battle.net Handheld" />
          <OutcomeCard icon={ShieldCheck} title="Velocity" sub="Airloom AI MVP Strategy" />
          <OutcomeCard icon={BarChart3} title="Scale" sub="$6M AWS Cost Avoidance" />
          <OutcomeCard icon={Globe} title="Growth" sub="80% Alexa Ad Coverage" />
          <OutcomeCard icon={Activity} title="Automation" sub="15 Locales Benchmarked" />
          <OutcomeCard icon={Map} title="Expansion" sub="Alexa Americas Preview" />
        </div>
      </section>

      {/* Section 4: LILO Case Study */}
      <section id="passion-projects" className="py-32 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight italic mb-6">LILO OS Case Study</h2>
          <p className="text-lg text-slate-500 font-medium italic font-light leading-relaxed italic">
            Applying enterprise operational rigor to personal infrastructure through autonomous task dispatching.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['lilologin.png', 'lilo-triage-admin.png', 'lilo-blocking-issue.png'].map((img, idx) => (
            <div key={idx} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all hover:border-blue-200">
              <div className="relative h-56 w-full bg-slate-900">
                <Image src={`/${img}`} alt="LILO Case Study" fill className="object-cover opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100" />
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
