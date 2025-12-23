"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, TrendingUp, Wallet, X, Zap, Cpu, BarChart3, Sparkles
} from 'lucide-react';

type FilterState = 'intake' | null;

interface CardProps { icon: React.ElementType; metric: string; context: string; app: string; }
interface ServiceProps { num: string; title: string; desc: string; }

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterState>(null);
  const initialFormState = { 
    name: '', 
    email: '', 
    company: '', 
    description: '',
    outcome: '',
    budget: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Build My Agent Workforce: ${formData.company}`);
    const body = encodeURIComponent(
      `Full Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company}\n` +
      `Desired Outcome: ${formData.outcome}\n` +
      `Budget Range: ${formData.budget}\n` +
      `Bottleneck: ${formData.description}`
    );
    window.location.href = `mailto:a.seumae@outlook.com?subject=${subject}&body=${body}`;
    setActiveFilter(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 font-black italic uppercase">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">AS</span>
            </div>
            <span>Adam Seumae</span>
          </div>
          <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase italic">
            Build My Agent Workforce
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-48 pb-24">
        <section className="flex flex-col md:flex-row gap-16 items-center mb-32">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 italic uppercase">
              Scale Your Operations. <br />
              <span className="text-blue-600">Remove the &quot;Human.&quot;</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium italic mb-12">
              Deploy intelligent agentic engines to automate complex workflows. Architected by an expert with 10+ years at <strong>Amazon, AWS, and Microsoft</strong>.
            </p>
            <button onClick={() => setActiveFilter('intake')} className="bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl shadow-blue-100 italic uppercase">
              Build My Agent Workforce
            </button>
          </div>
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-[4rem] overflow-hidden shadow-2xl grayscale">
             {/* Ensure headshot.jpg is in your /public folder */}
             <Image src="/headshot.jpg" alt="Adam Seumae" fill className="object-cover" priority />
          </div>
        </section>

        {/* --- Outcome Metrics --- */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProofCard icon={Wallet} metric="$6M Saved" context="AWS Contract Renewals" app="Identified inefficiencies and built internal autonomous solutions." />
            <ProofCard icon={TrendingUp} metric="20x Growth" context="Amazon Pipeline" app="Deployed systems that scaled outreach without increasing headcount." />
            <ProofCard icon={ShieldCheck} metric="MVP to Market" context="Airloom AI" app="Established architecture and SOPs to launch AI-driven products fast." />
        </section>

        {/* --- Service Offerings --- */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white mb-40">
          <h2 className="text-4xl md:text-6xl font-black italic mb-20 uppercase tracking-tighter underline decoration-blue-500 underline-offset-8">What You&apos;re Buying:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <ServiceItem num="01" title="Workflow Audit" desc="Identifying high-friction manual tasks ripe for agentic replacement." />
            <ServiceItem num="02" title="Agent Architecture" desc="Designing custom AI agents to handle high-volume processing." />
            <ServiceItem num="03" title="Ops Excellence" desc="SOPs and feedback loops to ensure digital workforce growth." />
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeFilter === 'intake' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-20 relative text-left">
              <button onClick={() => setActiveFilter(null)} className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X size={32}/></button>
              <h2 className="text-6xl md:text-8xl font-black italic mb-12 uppercase">Intake Phase</h2>
              
              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Full Name</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Business Email</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Company / Project</label>
                      <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-blue-600">Monthly Budget for Automation</label>
                      <select className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                        <option value="">Select Range</option>
                        <option value="5k-10k">$5k - $10k</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k+">$25k+</option>
                      </select>
                   </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-600">Desired Outcome (e.g., Save 20 hours/week)</label>
                  <input className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" placeholder="Primary Goal" value={formData.outcome} onChange={(e) => setFormData({...formData, outcome: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-blue-600">Operational Bottleneck Details</label>
                  <textarea rows={3} className="w-full text-3xl font-bold border-b-4 border-slate-200 focus:border-blue-600 outline-none py-4 text-slate-900 italic bg-transparent" placeholder="Describe the friction..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <button type="button" onClick={handleSendEmail} className="w-full bg-blue-600 text-white py-8 rounded-[2rem] text-3xl font-black italic uppercase shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Send Strategy Request
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProofCard({ icon: Icon, metric, context, app }: CardProps) {
  return (
    <div className="p-10 bg-white border-4 border-slate-50 rounded-[3rem] hover:border-blue-100 transition-all group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8"><Icon size={28} /></div>
      <h4 className="text-4xl font-black italic mb-2 tracking-tighter uppercase leading-none">{metric}</h4>
      <p className="text-blue-600 font-black mb-6 text-[10px] uppercase tracking-[0.2em]">{context}</p>
      <p className="text-slate-500 leading-relaxed font-semibold italic">{app}</p>
    </div>
  );
}

function ServiceItem({ num, title, desc }: ServiceProps) {
  return (
    <div className="space-y-6">
      <span className="text-blue-500 font-black text-6xl opacity-20 italic">{num}</span>
      <h4 className="text-3xl font-black italic uppercase leading-tight">{title}</h4>
      <p className="text-slate-400 font-medium italic">{desc}</p>
    </div>
  );
}
