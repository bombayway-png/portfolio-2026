"use client";

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Successful login sends you to the leads
    } catch (error) {
      alert("Access Denied: Admin Only");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <form onSubmit={handleLogin} className="max-w-md w-full space-y-8 bg-slate-800 p-10 rounded-[2rem] shadow-2xl">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-center">LILO-OS Access</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 rounded-xl bg-slate-700 border-none outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl bg-slate-700 border-none outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-black italic uppercase hover:bg-blue-700 transition-all">
          Unlock Dashboard
        </button>
      </form>
    </div>
  );
}