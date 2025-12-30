export default function LeadManager() {
  const [leads, setLeads] = useState<LiloTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true); // NEW: Track the "checking" phase
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "5kbTnmiFdOQJUtonagrHovqb1sG3") {
        setAuthorized(true);
        setIsVerifying(false); // Stop verifying, we found you
      } else {
        // Only redirect if we are CERTAIN you aren't logged in
        setIsVerifying(false); 
        if (!user) router.push('/'); 
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // Prevent the "Flash" of home page redirect
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-400 italic font-black uppercase">
          <Lock size={48} className="animate-pulse" />
          Verifying Identity...
        </div>
      </div>
    );
  }

  if (!authorized) return null;
}

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, query, where, onSnapshot, orderBy, 
  doc, updateDoc, serverTimestamp, Timestamp 
} from 'firebase/firestore';
import { Clock, User, ArrowRight, Lock } from 'lucide-react'; // Removed CheckCircle2

interface LiloTask {
  id: string;
  artifact_content: string;
  contact_email: string;
  description: string;
  status: string;
  timestamp: Timestamp;
  uid: string;
  orgId: string;
}

export default function LeadManager() {
  const [leads, setLeads] = useState<LiloTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "5kbTnmiFdOQJUtonagrHovqb1sG3") {
        setAuthorized(true);
      } else {
        router.push('/'); 
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!authorized) return;

    const q = query(
      collection(db, "lilo_tasks"),
      where("uid", "==", "5kbTnmiFdOQJUtonagrHovqb1sG3"),
      where("orgId", "==", "J5CITH"),
      orderBy("timestamp", "desc")
    );

    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LiloTask[];
      
      setLeads(leadData);
      setLoading(false);
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

  if (loading && !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-400 italic font-black uppercase">
          <Lock size={48} className="animate-pulse" />
          Verifying Identity...
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Lead Nurture Dashboard</h1>
          <p className="text-slate-500 font-medium italic">Secure Session: Dad</p>
        </div>
        <button 
          onClick={() => auth.signOut()} 
          className="text-xs font-black uppercase italic text-slate-400 hover:text-red-500 transition-colors"
        >
          Secure Sign Out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${
                  lead.status === 'Needs Follow-up' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {lead.status}
                </span>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock size={12} /> {lead.timestamp?.toDate().toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tight">{lead.artifact_content}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1 font-medium italic">
                  <User size={14} /> {lead.contact_email}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-sm italic text-slate-600 leading-relaxed border border-slate-100">
                &quot;{lead.description}&quot;
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => updateStatus(lead.id, lead.status === 'Needs Follow-up' ? 'In Review' : 'Success')}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
              >
                {lead.status === 'Needs Follow-up' ? 'Start Review' : 'Mark Success'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}