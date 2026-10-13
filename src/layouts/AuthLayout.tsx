import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ShieldCheck, Moon, Sun, Lock } from 'lucide-react';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="auth-layout">
      {/* Dynamic ambient gradient lighting */}
      <div className="ambient-glow-mesh" aria-hidden="true">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      <div className="grid-overlay" aria-hidden="true" />

      {/* Top enterprise navigation */}
      <header className="auth-navbar">
        <div className="nav-brand">
          <div className="nav-brand-logo">
            <Lock size={18} />
          </div>
          <span className="nav-brand-text">NEXUS IDENTITY</span>
        </div>

        <div className="nav-controls">
          <div className="system-status-indicator" title="All infrastructure clusters reporting normal">
            <span className="status-dot" />
            <span>Zero-Trust Gateway Online</span>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Form Center Content */}
      <main className="auth-main-content">
        <div className="auth-form-container animate-fade-in-up">{children}</div>
      </main>

      {/* Enterprise Security Footer */}
      <footer className="auth-footer">
        <div>
          <span>© 2026 Nexus Enterprise Systems Inc. All rights reserved.</span>
        </div>

        <div className="footer-links">
          <span className="security-badge-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="var(--accent-emerald)" />
            <span>ISO/IEC 27001</span>
          </span>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="footer-link">
            Security Policy
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="footer-link">
            Compliance Disclosures
          </a>
          <a href="#support" onClick={(e) => e.preventDefault()} className="footer-link">
            System Status
          </a>
        </div>
      </footer>
    </div>
  );
};
