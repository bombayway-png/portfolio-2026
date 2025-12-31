"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import { 
  collection, query, onSnapshot, 
  doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { Clock, User, ArrowRight, Play, Filter, Calendar, Loader2 } from 'lucide-react';

// Strict type definitions to pass production linting
type FlexibleTimestamp = {
  toMillis?: () => number;
  toDate?: () => Date;
} | Date | number | null | undefined;

interface LiloTask {
  id: string;
  artifact_content: string | object;
  contact_email: string;
  description: string | object;
  status: string;
  timestamp: FlexibleTimestamp;
  uid: string;
  orgId: string;
  ai_ideation?: string | object; 
}

export default function LeadManager() {
  const [leads, setLeads] = useState<LiloTask[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true); 
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<string>('All');
  
  // Track processing states without using 'any'
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  
  const router = useRouter();

  const safeRender = (val: string | object | undefined): string => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    return JSON.stringify(val);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const now = Date.now();
      const leadTime = (lead.timestamp && typeof lead.timestamp === 'object' && 'toMillis' in lead.timestamp && typeof lead.timestamp.toMillis === 'function') 
        ? lead.timestamp.toMillis() : 0;
      
      let matchesTime = true;
      if (timeFilter === '24h') matchesTime = now - leadTime < 86400000;
      if (timeFilter === '7d') matchesTime = now - leadTime < 604800000;

      return matchesStatus && matchesTime;
    });
  }, [leads, statusFilter, timeFilter]);

  const runAgent = async (leadId: string, description: string | object) => {
    setProcessingIds(prev => new Set(prev).add(leadId));
    
    try {
      const functions = getFunctions(); 
      const kickstart = httpsCallable(functions, 'kickstartIdeation');
      
      await kickstart({ 
        leadId, 
        description: safeRender(description) 
      });

      alert("Success! The AI is now brainstorming themes.");
    } catch (err) {
      // Corrected: Replacing 'any' with type checking to pass Vercel build
      console.error("❌ Agent Deployment Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Check Firebase Logs';
      alert(`Agent Failed: ${errorMessage}`);
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(leadId);
        return next;
      });
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorized(true);
        setIsVerifying(false);
      } else {
        setAuthorized(false);
        setIsVerifying(false);
        router.push('/'); 
      }
    });
    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    const q = query(collection(db, "lilo_tasks"));
    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LiloTask[];
      
      const sortedLeads = leadData.sort((a, b) => {
        const getTime = (ts: FlexibleTimestamp): number => {
          if (ts && typeof ts === 'object' && 'toMillis' in ts && typeof ts.toMillis === 'function') return ts.toMillis();
          return 0;
        };
        return getTime(b.timestamp) - getTime(a.timestamp);
      });
      setLeads(sortedLeads);
    }, (error) => {
      console.error("Database Sync Error:", error.message);
    });
    return () => unsubscribeData();
  }, [authorized]);

  const updateStatus = async (leadId: string, nextStatus: string) => {
    const leadRef = doc(db, "lilo_tasks", leadId);
    await updateDoc(leadRef, { 
      status: nextStatus,
      last_updated: serverTimestamp()
    });
  };

  if (isVerifying) return <div className="min-h-screen flex items-center justify-center bg-slate-50 italic font-black uppercase text-slate-400 animate-pulse">Syncing Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <header className="mb-12 flex flex-col gap-8 border-b border-slate-200 pb-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">LILO-OS</h1>
            <p className="text-blue-600 font-medium italic text-sm mt-1">Status: Active Review Mode</p>
          </div>
          <button onClick={() => signOut(auth)} className="text-[10px] font-black uppercase italic text-slate-400 hover:text-red-500 transition-colors">Secure Sign Out</button>
        </div>

        <div className="flex flex-wrap gap-4 bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 px-4 border-r border-slate-100">
            <Filter size={16} className="text-slate-400" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-xs font-black uppercase italic outline-none bg-transparent cursor-pointer">
              <option value="All">All Statuses</option>
              <option value="Needs Follow-up">Needs Follow-up</option>
              <option value="In Review">In Review</option>
              <option value="Success">Success</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Calendar size={16} className="text-slate-400" />
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="text-xs font-black uppercase italic outline-none bg-transparent cursor-pointer">
              <option value="All">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 flex flex-col justify-between transition-all hover:translate-y-[-4px]">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic ${lead.status === 'Needs Follow-up' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                  {lead.status}
                </span>
                <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
                  <Clock size={12} /> {lead.timestamp && typeof lead.timestamp === 'object' && 'toDate' in lead.timestamp && typeof lead.timestamp.toDate === 'function' ? lead.timestamp.toDate().toLocaleDateString() : 'Active'}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 leading-tight">{safeRender(lead.artifact_content)}</h3>
                <p className="text-slate-400 text-sm flex items-center gap-1 font-bold italic"><User size={14} /> {lead.contact_email}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[1.5rem] text-sm italic text-slate-600 border border-slate-100/50 leading-relaxed">&quot;{safeRender(lead.description)}&quot;</div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">Ideation Results</p>
                {lead.ai_ideation ? (
                  <div className="text-xs italic text-slate-700 bg-blue-50/50 p-5 rounded-[1.5rem] whitespace-pre-wrap leading-relaxed border border-blue-100/50">
                    {safeRender(lead.ai_ideation)}
                  </div>
                ) : (
                  <button 
                    onClick={() => runAgent(lead.id, lead.description)}
                    disabled={processingIds.has(lead.id)}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {processingIds.has(lead.id) ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <><Play size={14} fill="currentColor" className="mr-2" /> Run Ideation Agent</>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button onClick={() => updateStatus(lead.id, 'In Review')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
                Mark for Review <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}