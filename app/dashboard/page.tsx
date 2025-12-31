"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import { 
  collection, query, where, onSnapshot, 
  doc, updateDoc, serverTimestamp, Timestamp 
} from 'firebase/firestore';
import { Clock, User, ArrowRight, Lock, ShieldAlert } from 'lucide-react';

interface LiloTask {
  id: string;
  artifact_content: string;
  contact_email: string;
  description: string;
  status: string;
  timestamp: Timestamp;
  uid: string;
  orgId: string;
  ai_ideation?: string; 
}

export default function LeadManager() {
  const [leads, setLeads] = useState<LiloTask[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true); 
  const router = useRouter();

  // --- HARD-SYNCED DATA CONSTANTS ---
  const DATA_UID = "5kbTnmiFdOQJUtonagrHovqb1sG3"; 
  const ORG_ID = "J5CITH";

  const runAgent = async (leadId: string, description: string) => {
    try {
      const functions = getFunctions();
      const kickstart = httpsCallable(functions, 'kickstartIdeation');
      await kickstart({ leadId, description });
    } catch (err) {
      console.error("Agent Error:", err);
    }
  };

  // --- 1. EMERGENCY BYPASS: AUTHENTICATION HANDSHAKE ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // MEETING MODE: Trust any authenticated user to avoid "Access Denied" screens
      if (user) {
        console.log("Meeting Mode Active: Authorized as", user.email);
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

  // --- 2. DATA SUBSCRIPTION (LOCKED TO TY FITZPATRICK'S PROJECT) ---
  useEffect(() => {
    if (!authorized) return;

    const q = query(
      collection(db, "lilo_tasks"),
      where("uid", "==", DATA_UID),
      where("orgId", "==", ORG_ID)
    );

    const unsubscribeData = onSnapshot(q, (snapshot) => {
      console.log(`MEETING MODE: Found ${snapshot.docs.length} leads in Firestore.`);
      
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LiloTask[];
      
      const sortedLeads = leadData.sort((a, b) => {
        const timeA = a.timestamp ? a.timestamp.toMillis() : 0;
        const timeB = b.timestamp ? b.timestamp.toMillis() : 0;
        return timeB - timeA;
      });

      setLeads(sortedLeads);
    }, (error) => {
      console.error("Meeting Mode Firestore Error:", error);
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

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-400 italic font-black uppercase text-center">
          <Lock size={48} className="animate-pulse" />
          Preparing Meeting View...
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Lead Nurture Dashboard</h1>
          <p className="text-blue-600 font-medium italic">Status: Live Demo Mode</p>
        </div>
        <button 
          onClick={() => signOut(auth)} 
          className="text-xs font-black uppercase italic text-slate-400 hover:text-red-500 transition-colors"
        >
          Secure Sign Out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-300 font-black italic uppercase text-2xl tracking-widest border-4 border-dashed border-slate-100 rounded-[3rem]">
            No data found for this OrgID
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic ${
                    lead.status === 'Needs Follow-up' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
                    <Clock size={12} /> {lead.timestamp ? lead.timestamp.toDate().toLocaleDateString() : 'Dec 30, 2025'}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight leading-none mb-2">{lead.artifact_content}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1 font-bold italic">
                    <User size={14} /> {lead.contact_email}
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-[1.5rem] text-sm italic text-slate-600 leading-relaxed border border-slate-100/50">
                  &quot;{lead.description}&quot;
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">LILO Agent Kickstart</p>
                  {lead.ai_ideation ? (
                    <div className="text-xs italic text-slate-700 bg-blue-50/50 p-5 rounded-[1.5rem] whitespace-pre-wrap leading-relaxed border border-blue-100/50">
                      {lead.ai_ideation}
                    </div>
                  ) : (
                    <button 
                      onClick={() => runAgent(lead.id, lead.description)}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black italic uppercase text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                    >
                      Run Ideation Agent
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => updateStatus(lead.id, 'Success')}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  Mark Success <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}