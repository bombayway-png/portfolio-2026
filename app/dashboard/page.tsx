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
import { Clock, User, ArrowRight, Play } from 'lucide-react';

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

  // --- 1. THE AGENT TRIGGER ---
  const runAgent = async (leadId: string, description: string) => {
    try {
      const functions = getFunctions();
      const kickstart = httpsCallable(functions, 'kickstartIdeation');
      await kickstart({ leadId, description });
      alert("Agent started! The themes will appear on the card shortly.");
    } catch (err) {
      console.error("Agent Error:", err);
      alert("Agent failed to start. Check Firebase logs.");
    }
  };

  // --- 2. AUTHENTICATION GATE ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Logic: Matches the UID defined in your Firestore Security Rules
      if (user && user.uid === "5kbTnmiFdOQJUtonagrHovqb1sG3") {
        setAuthorized(true);
        setIsVerifying(false);
      } else {
        setAuthorized(false);
        setIsVerifying(false);
        if (!user) router.push('/'); 
      }
    });
    return () => unsubscribeAuth();
  }, [router]);

  // --- 3. DATA SYNC (SECURE QUERY) ---
  useEffect(() => {
    if (!authorized) return;

    // SYNCED TO RULES: Only queries documents owned by 'Dad'
    const q = query(
      collection(db, "lilo_tasks"),
      where("uid", "==", "5kbTnmiFdOQJUtonagrHovqb1sG3")
    );

    const unsubscribeData = onSnapshot(q, (snapshot) => {
      // Diagnostic check: Open Browser Console (F12) to see this
      console.log(`SECURE SYNC: Found ${snapshot.docs.length} leads matching UID.`);
      
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
      // This will trigger if the query and security rules don't match
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

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 italic font-black uppercase text-slate-400 animate-pulse">
        Initializing Secure Dashboard...
      </div>
    );
  }

  // --- 4. ACCESS DENIED UI ---
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-xl border border-red-100 text-center">
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
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <header className="mb-12 flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">LILO-OS</h1>
          <p className="text-blue-600 font-medium italic text-sm mt-1">Status: Secure Admin Mode</p>
        </div>
        <button onClick={() => signOut(auth)} className="text-[10px] font-black uppercase italic text-slate-400 hover:text-red-500 transition-colors">
          Secure Sign Out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leads.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-300 font-black italic uppercase text-2xl border-4 border-dashed border-slate-100 rounded-[3rem]">
            No leads found for this account
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between transition-all hover:translate-y-[-4px]">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic ${
                    lead.status === 'Needs Follow-up' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
                    <Clock size={12} /> {lead.timestamp ? lead.timestamp.toDate().toLocaleDateString() : 'Active'}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 leading-tight">{lead.artifact_content}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1 font-bold italic">
                    <User size={14} /> {lead.contact_email}
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-[1.5rem] text-sm italic text-slate-600 border border-slate-100/50 leading-relaxed">
                  &quot;{lead.description}&quot;
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">Ideation Results</p>
                  {lead.ai_ideation ? (
                    <div className="text-xs italic text-slate-700 bg-blue-50/50 p-5 rounded-[1.5rem] whitespace-pre-wrap leading-relaxed border border-blue-100/50">
                      {lead.ai_ideation}
                    </div>
                  ) : (
                    <button 
                      onClick={() => runAgent(lead.id, lead.description)}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                    >
                      <Play size={14} fill="currentColor" /> Run Ideation Agent
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => updateStatus(lead.id, 'In Review')}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
                >
                  Mark for Review <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}