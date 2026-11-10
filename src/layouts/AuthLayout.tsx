import React from 'react';
import { NseHeader } from '@/features/auth/components/NseHeader';
import { NseFooter } from '@/features/auth/components/NseFooter';
import { NseBuildingGraphic } from '@/components/common/NseBuildingGraphic';
import { CandlestickWatermark } from '@/components/common/CandlestickWatermark';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e3eefb] via-[#ebf3fc] to-[#f4f8fe] relative overflow-x-hidden">
      {/* Top Corporate Navbar */}
      <NseHeader />

      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center px-4 py-8 md:px-8 md:pt-14 md:pb-[72px] w-full">
        {/* Left Side Building Background Illustration */}
        <NseBuildingGraphic />

        {/* Right Side Candlestick Chart & Watermark */}
        <CandlestickWatermark />

        {/* Center Container for Two Cards */}
        <div className="relative z-10 w-full max-w-[960px] flex justify-center">
          {children}
        </div>
      </main>

      {/* Deep Navy Corporate Footer */}
      <NseFooter />
    </div>
  );
};
