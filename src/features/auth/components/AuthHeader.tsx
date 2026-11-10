import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const AuthHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-6">
      <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] mb-1.5">
        <Cpu size={28} />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1">
        <ShieldCheck size={14} />
        <span>NEXUS // SECURE ZERO-TRUST GATEWAY</span>
      </div>

      <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] tracking-tight">
        Enterprise <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Portal Login</span>
      </h1>

      <p className="text-[0.938rem] text-[var(--text-secondary)] max-w-[380px] leading-relaxed">
        Enter your verified credentials and anti-bot verification code to authenticate into the system.
      </p>
    </div>
  );
};
