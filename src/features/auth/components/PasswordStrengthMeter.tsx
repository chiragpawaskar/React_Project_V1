import React from 'react';
import type { PasswordStrengthResult } from '@/types';
import { Check, X } from 'lucide-react';
import './PasswordStrengthMeter.css';

interface PasswordStrengthMeterProps {
  strength: PasswordStrengthResult;
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength, password }) => {
  if (!password) return null;

  return (
    <div className="password-meter-container" aria-live="polite">
      <div className="password-meter-header">
        <span className="password-meter-title">Password Security Level</span>
        <span className="password-meter-status" style={{ color: strength.color }}>
          {strength.label}
        </span>
      </div>

      <div className="password-meter-bars" role="progressbar" aria-valuenow={strength.score} aria-valuemin={0} aria-valuemax={4}>
        {[1, 2, 3, 4].map((step) => {
          const isFilled = strength.score >= step;
          return (
            <div
              key={step}
              className="password-meter-bar"
              style={{
                backgroundColor: isFilled ? strength.color : undefined,
                boxShadow: isFilled ? `0 0 6px ${strength.color}40` : undefined,
              }}
            />
          );
        })}
      </div>

      <div className="password-criteria-list">
        <span className={`password-criteria-pill ${strength.hasMinLength ? 'satisfied' : ''}`}>
          {strength.hasMinLength ? <Check size={12} /> : <X size={12} />} 8+ chars
        </span>
        <span className={`password-criteria-pill ${strength.hasUppercase && strength.hasLowercase ? 'satisfied' : ''}`}>
          {strength.hasUppercase && strength.hasLowercase ? <Check size={12} /> : <X size={12} />} Aa mixed
        </span>
        <span className={`password-criteria-pill ${strength.hasNumber ? 'satisfied' : ''}`}>
          {strength.hasNumber ? <Check size={12} /> : <X size={12} />} 1 number
        </span>
        <span className={`password-criteria-pill ${strength.hasSpecialChar ? 'satisfied' : ''}`}>
          {strength.hasSpecialChar ? <Check size={12} /> : <X size={12} />} 1 symbol
        </span>
      </div>
    </div>
  );
};
