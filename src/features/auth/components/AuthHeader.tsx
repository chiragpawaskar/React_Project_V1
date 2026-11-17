import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';
import './AuthHeader.css';

export const AuthHeader: React.FC = () => {
  return (
    <div className="auth-header">
      <div className="auth-logo-icon">
        <Cpu size={28} />
      </div>

      <div className="auth-brand-badge">
        <ShieldCheck size={14} />
        <span>NEXUS // SECURE ZERO-TRUST GATEWAY</span>
      </div>

      <h1 className="auth-header-title">
        Enterprise <span className="text-gradient">Portal Login</span>
      </h1>

      <p className="auth-header-subtitle">
        Enter your verified credentials and anti-bot verification code to authenticate into the system.
      </p>
    </div>
  );
};
