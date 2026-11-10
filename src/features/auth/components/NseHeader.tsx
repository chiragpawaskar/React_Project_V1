import React from 'react';
import { NseLogo } from '@/components/common/NseLogo';
import { IndianFlag } from '@/components/common/IndianFlag';

export const NseHeader: React.FC = () => {
  return (
    <header className="relative w-full bg-white shadow-[0_2px_10px_rgba(0,32,74,0.05)] z-30">
      <div className="max-w-[1400px] mx-auto px-4 py-2.5 md:px-8 md:py-3 flex items-center justify-between">
        {/* Left Branding Group */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <NseLogo height={44} alt="NSE Logo" />
          </div>

          <div className="w-[1.5px] h-9.5 bg-slate-300" aria-hidden="true" />

          <div className="flex flex-col justify-center">
            <h1 className="font-sans text-[1rem] md:text-[1.15rem] font-bold text-[#0b2341] m-0 leading-tight tracking-[-0.2px]">
              NSE Indices Limited
            </h1>
            <p className="font-sans text-[0.72rem] md:text-[0.815rem] text-[#1e3a5f] m-0 leading-tight font-medium">
              Indices for a better tomorrow.
            </p>
          </div>
        </div>

        {/* Right Slogan Group */}
        <div className="flex items-center gap-2 bg-transparent px-2 py-1">
          <IndianFlag width={22} height={15} />
          <span className="font-sans text-[0.75rem] md:text-[0.84rem] font-semibold text-[#0b2341] tracking-[0.1px]">
            An investment called India
          </span>
        </div>
      </div>

      {/* Decorative smooth curve shape underneath header left/center */}
      <div className="absolute top-full left-0 w-full h-4 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" fill="none" className="w-full h-full">
          <path
            d="M 0,0 L 460,0 C 490,0 520,28 555,28 L 0,28 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </header>
  );
};
