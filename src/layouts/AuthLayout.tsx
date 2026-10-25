import React from 'react';
import { NseHeader } from '@/features/auth/components/NseHeader';
import { NseFooter } from '@/features/auth/components/NseFooter';
import { NseBuildingGraphic } from '@/components/common/NseBuildingGraphic';
import { CandlestickWatermark } from '@/components/common/CandlestickWatermark';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="nse-auth-page-root">
      {/* Top Corporate Navbar */}
      <NseHeader />

      {/* Main Content Area */}
      <main className="nse-auth-main">
        {/* Left Side Building Background Illustration */}
        <NseBuildingGraphic />

        {/* Right Side Candlestick Chart & Watermark */}
        <CandlestickWatermark />

        {/* Center Container for Two Cards */}
        <div className="nse-cards-center-container">
          {children}
        </div>
      </main>

      {/* Deep Navy Corporate Footer */}
      <NseFooter />
    </div>
  );
};
