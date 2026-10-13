import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/common/Button/Button';
import { ShieldCheck, LogOut, Moon, Sun, CheckCircle2, User, Key, Activity } from 'lucide-react';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user, token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dashboard-container">
      <header className="dashboard-nav">
        <div className="dashboard-nav-brand">
          <ShieldCheck size={24} color="var(--brand-primary)" />
          <span>NEXUS // PORTAL HOME</span>
        </div>

        <div className="dashboard-nav-user">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="user-badge">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.username || 'User'}
              className="user-avatar"
            />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.username}</span>
          </div>

          <Button variant="outline" size="sm" onClick={logout} startIcon={<LogOut size={16} />}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="dashboard-content animate-fade-in-up">
        <div className="dashboard-hero">
          <div>
            <span className="badge-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={12} /> Active Zero-Trust Session
            </span>
            <h2 style={{ marginTop: '8px' }}>
              Welcome to the Workspace, <span className="text-gradient">{user?.username}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              Authenticated via Enterprise Multi-Factor Captcha. Your credentials and security tokens are verified.
            </p>
          </div>
        </div>

        <div className="dashboard-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <User size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Assigned Role</span>
              <span className="stat-value">{user?.role?.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
              <ShieldCheck size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">MFA & Captcha Status</span>
              <span className="stat-value">Passed (Anti-Bot V3)</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)' }}>
              <Activity size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Session Established</span>
              <span className="stat-value" style={{ fontSize: '0.938rem', fontWeight: 500 }}>
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : 'Just now'}
              </span>
            </div>
          </div>
        </div>

        <div className="token-viewer-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} color="var(--brand-primary)" />
            <span style={{ fontWeight: 600 }}>Active Enterprise Bearer Token</span>
          </div>
          <div className="token-code">{token}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            This simulated JWT token confirms full authentication lifecycle management across context and storage.
          </span>
        </div>
      </main>
    </div>
  );
};
