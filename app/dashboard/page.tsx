"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, query, where, onSnapshot, orderBy, 
  doc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { Clock, DollarSign, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LeadManager() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME DATA FETCH
  useEffect(() => {
    // Queries only your leads within your Org, sorted by newest first
    const q = query(
      collection(db, "lilo_tasks"),
      where("uid", "==", "5kbTnmiFdOQJUtonagrHovqb1sG3"),
      where("orgId", "==", "J5CITH"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. INTERACTIVE STATUS UPDATE
  const updateStatus = async (leadId: string, nextStatus: string) => {
    const leadRef = doc(db, "lilo_tasks", leadId);
    await updateDoc(leadRef, { 
      status: nextStatus,
      last_updated: serverTimestamp()
    });
  };

  if (loading) return <div className="p-10 font-black italic uppercase">Loading LILO-OS Pipeline...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Lead Nurture Dashboard</h1>
          <p className="text-slate-500 font-medium italic">Org: J5CITH | User: Dad</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Active Pipeline</p>
          <p className="text-2xl font-black italic">{leads.length} Leads</p>
        </div>
      </header>

      {/* LEAD GRID */}
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
              {lead.status === 'Needs Follow-up' ? (
                <button 
                  onClick={() => updateStatus(lead.id, 'In Review')}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-black italic uppercase text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  Start Review <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-black italic uppercase text-xs flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={14} /> Success
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}