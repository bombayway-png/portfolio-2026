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

  const runAgent = async (leadId: string, description: string) => {
    try {
      const functions = getFunctions();
      const kickstart = httpsCallable(functions, 'kickstartIdeation');
      await kickstart({ leadId, description });
    } catch (err) {
      console.error("Agent Error:", err);
      alert("Agent Error: Check console for details.");
    }
  };

  // --- 1. AUTHENTICATION HANDSHAKE ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Security: Matches the UID from Ty's production lead
      if (user && user.uid === "5kbTnmiFdOQJUtonagrHovqb1sG3") {
        setAuthorized(true);
        setIsVerifying(false);
      } else {
        setAuthorized(false);
        setIsVerifying(false);
        // Redirect to landing if not logged in at all
        if (!user) router.push('/'); 
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // --- 2. DATA SUBSCRIPTION ---
  useEffect(() => {
    if (!authorized) return;

    // Filters match Ty Fitzpatrick's exact document
    const q = query(
      collection(db, "lilo_tasks"),
      where("uid", "==", "5kbTnmiFdOQJUtonagrHovqb1sG3"),
      where("orgId", "==", "J5CITH")
    );

   const unsubscribeData = onSnapshot(q, (snapshot) => {
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
      // Correctly handles the error callback without syntax errors
      console.error("Firestore Error:", error);
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

  // --- 3. PRODUCTION RENDER GATES ---

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-400 italic font-black uppercase text-center">
          <Lock size={48} className="animate-pulse" />
          Verifying Identity...
        </div>
      </div>
    );
  }

  // Prevents the "White Screen" if the session doesn't match the Admin UID
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-xl border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2 text-slate-900">Access Denied</h2>
          <p className="text-slate-500 text-sm italic font-medium leading-relaxed mb-8">
            Terminal restricted. Current ID does not match the administrative clearance for LILO-OS.
          </p>
          <button 
            onClick={() => signOut(auth)}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic uppercase text-xs hover:bg-slate-800 transition-all"
          >
            Sign Out & Switch Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Lead Nurture Dashboard</h1>
          <p className="text-slate-500 font-medium italic">Secure Session: Dad</p>
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
            No leads captured yet
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic ${
                    lead.status === 'Needs Follow-up' ? 'bg-blue-50 text-blue-600' : 
                    lead.status === 'In Review' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
                    <Clock size={12} /> {lead.timestamp ? lead.timestamp.toDate().toLocaleDateString() : 'Pending'}
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
                  onClick={() => updateStatus(lead.id, lead.status === 'Needs Follow-up' ? 'In Review' : 'Success')}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  {lead.status === 'Needs Follow-up' ? 'Start Review' : 'Mark Success'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}