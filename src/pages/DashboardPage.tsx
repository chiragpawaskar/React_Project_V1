import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/common/Button/Button';
import { ShieldCheck, LogOut, Moon, Sun, CheckCircle2, User, Key, Activity } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 md:px-8 bg-[var(--bg-card)] backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 font-display font-bold text-lg text-[var(--text-primary)]">
          <ShieldCheck size={24} color="var(--brand-primary)" />
          <span>NEXUS // PORTAL HOME</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors cursor-pointer"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.username || 'User'}
              className="w-7 h-7 rounded-full object-cover border-2 border-[var(--brand-primary)]"
            />
            <span className="text-sm font-semibold text-[var(--text-primary)]">{user?.username}</span>
          </div>

          <Button variant="outline" size="sm" onClick={logout} startIcon={<LogOut size={16} />}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-10 flex flex-col gap-7 animate-[fadeInUp_0.4s_ease-out]">
        <div className="flex justify-between items-start flex-wrap gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 size={12} /> Active Zero-Trust Session
            </span>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mt-2">
              Welcome to the Workspace, <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">{user?.username}</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-1">
              Authenticated via Enterprise Multi-Factor Captcha. Your credentials and security tokens are verified.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          <div className="p-6 bg-[var(--bg-card)] border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/15 text-indigo-400">
              <User size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.813rem] text-[var(--text-tertiary)]">Assigned Role</span>
              <span className="text-xl font-bold text-[var(--text-primary)]">{user?.role?.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>

          <div className="p-6 bg-[var(--bg-card)] border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.813rem] text-[var(--text-tertiary)]">MFA & Captcha Status</span>
              <span className="text-xl font-bold text-[var(--text-primary)]">Passed (Anti-Bot V3)</span>
            </div>
          </div>

          <div className="p-6 bg-[var(--bg-card)] border border-white/10 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10 text-cyan-400">
              <Activity size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.813rem] text-[var(--text-tertiary)]">Session Established</span>
              <span className="text-[0.938rem] font-medium text-[var(--text-primary)]">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : 'Just now'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[var(--bg-card)] border border-white/10 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Key size={18} color="var(--brand-primary)" />
            <span className="font-semibold text-[var(--text-primary)]">Active Enterprise Bearer Token</span>
          </div>
          <div className="bg-black/40 p-3.5 sm:px-4.5 rounded-xl font-mono text-[0.844rem] text-cyan-400 break-all border border-white/10">
            {token}
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">
            This simulated JWT token confirms full authentication lifecycle management across context and storage.
          </span>
        </div>
      </main>
    </div>
  );
};
