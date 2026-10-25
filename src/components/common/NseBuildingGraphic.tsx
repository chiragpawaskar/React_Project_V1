import React from 'react';
import { NseLogo } from './NseLogo';
import './NseBuildingGraphic.css';

export const NseBuildingGraphic: React.FC = () => {
  return (
    <div className="nse-building-wrapper" aria-hidden="true">
      {/* Background Skyscraper Image */}
      <img
        src="/assets/nse-building.jpg"
        alt="NSE Corporate Headquarters Building"
        className="nse-building-img"
      />

      {/* Glass overlay with depth and color matching */}
      <div className="nse-building-tint-overlay" />

      {/* Prominent NSE Logo mounted on the building glass facade */}
      <div className="nse-building-facade-logo">
        <NseLogo size="lg" variant="reverse" />
      </div>

      {/* Soft gradient fade into page content */}
      <div className="nse-building-gradient-fade" />
    </div>
  );
};
