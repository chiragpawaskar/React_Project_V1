import React from 'react';
import { NseLogo } from './NseLogo';

export const NseBuildingGraphic: React.FC = () => {
  return (
    <div
      className="hidden lg:block absolute top-0 left-0 bottom-0 w-[240px] xl:w-[420px] h-full overflow-hidden pointer-events-none select-none z-[1] lg:opacity-80 xl:opacity-100"
      aria-hidden="true"
    >
      {/* Background Skyscraper Image */}
      <img
        src="/assets/nse-building.jpg"
        alt="NSE Corporate Headquarters Building"
        className="w-full h-full object-cover object-left saturate-[1.15] brightness-[1.02]"
      />

      {/* Glass overlay with depth and color matching */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,55,120,0.15)] via-[rgba(15,60,130,0.1)] to-[#ebf3fc]" />

      {/* Prominent NSE Logo mounted on the building glass facade */}
      <div className="absolute top-[34%] left-[20%] p-0 rounded-lg overflow-hidden shadow-[0_12px_32px_rgba(0,15,45,0.4),0_0_0_1px_rgba(255,255,255,0.22)] backdrop-blur-md [transform:perspective(600px)_rotateY(-8deg)_rotateX(4deg)] transition-transform duration-300 hover:[transform:perspective(600px)_rotateY(-4deg)_rotateX(2deg)_scale(1.02)]">
        <NseLogo size="lg" variant="reverse" />
      </div>

      {/* Soft gradient fade into page content */}
      <div className="absolute top-0 right-0 bottom-0 w-[140px] bg-gradient-to-r from-transparent to-[#ebf3fc]" />
    </div>
  );
};
