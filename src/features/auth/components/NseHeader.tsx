import React from 'react';
import { NseLogo } from '@/components/common/NseLogo';
import { IndianFlag } from '@/components/common/IndianFlag';
import './NseHeader.css';

export const NseHeader: React.FC = () => {
  return (
    <header className="nse-header">
      <div className="nse-header-container">
        {/* Left Branding Group */}
        <div className="nse-brand-group">
          <div className="nse-logo-wrapper">
            <NseLogo height={44} alt="NSE Logo" />
          </div>

          <div className="nse-brand-divider" aria-hidden="true" />

          <div className="nse-brand-text">
            <h1 className="nse-company-name">NSE Indices Limited</h1>
            <p className="nse-company-tagline">Indices for a better tomorrow.</p>
          </div>
        </div>

        {/* Right Slogan Group */}
        <div className="nse-slogan-group">
          <IndianFlag width={22} height={15} />
          <span className="nse-slogan-text">An investment called India</span>
        </div>
      </div>
    </header>
  );
};
