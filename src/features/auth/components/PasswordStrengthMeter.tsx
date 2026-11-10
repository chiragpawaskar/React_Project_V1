import React from 'react';
import type { PasswordStrengthResult } from '@/types';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  strength: PasswordStrengthResult;
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength, password }) => {
  if (!password) return null;

  return (
    <div className="flex flex-col gap-2 mt-1 mb-2 animate-[fadeIn_0.2s_ease-in-out]" aria-live="polite">
      <div className="flex justify-between items-center text-[0.781rem]">
        <span className="text-[var(--text-tertiary)]">Password Security Level</span>
        <span className="font-semibold transition-colors duration-150" style={{ color: strength.color }}>
          {strength.label}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1" role="progressbar" aria-valuenow={strength.score} aria-valuemin={0} aria-valuemax={4}>
        {[1, 2, 3, 4].map((step) => {
          const isFilled = strength.score >= step;
          return (
            <div
              key={step}
              className={`h-full rounded-full transition-colors duration-250 ${
                isFilled ? '' : 'bg-white/10'
              }`}
              style={{
                backgroundColor: isFilled ? strength.color : undefined,
                boxShadow: isFilled ? `0 0 6px ${strength.color}40` : undefined,
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-0.5">
        <span className={`inline-flex items-center gap-1 text-[0.719rem] px-2 py-0.5 rounded-full border transition-all ${
          strength.hasMinLength
            ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25'
            : 'text-[var(--text-tertiary)] bg-white/5 border-white/10'
        }`}>
          {strength.hasMinLength ? <Check size={12} /> : <X size={12} />} 8+ chars
        </span>
        <span className={`inline-flex items-center gap-1 text-[0.719rem] px-2 py-0.5 rounded-full border transition-all ${
          strength.hasUppercase && strength.hasLowercase
            ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25'
            : 'text-[var(--text-tertiary)] bg-white/5 border-white/10'
        }`}>
          {strength.hasUppercase && strength.hasLowercase ? <Check size={12} /> : <X size={12} />} Aa mixed
        </span>
        <span className={`inline-flex items-center gap-1 text-[0.719rem] px-2 py-0.5 rounded-full border transition-all ${
          strength.hasNumber
            ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25'
            : 'text-[var(--text-tertiary)] bg-white/5 border-white/10'
        }`}>
          {strength.hasNumber ? <Check size={12} /> : <X size={12} />} 1 number
        </span>
        <span className={`inline-flex items-center gap-1 text-[0.719rem] px-2 py-0.5 rounded-full border transition-all ${
          strength.hasSpecialChar
            ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25'
            : 'text-[var(--text-tertiary)] bg-white/5 border-white/10'
        }`}>
          {strength.hasSpecialChar ? <Check size={12} /> : <X size={12} />} 1 symbol
        </span>
      </div>
    </div>
  );
};
