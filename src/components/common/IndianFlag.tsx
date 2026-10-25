import React from 'react';

export const IndianFlag: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 24,
  height = 16,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        borderRadius: '2px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      aria-label="Flag of India"
    >
      {/* Saffron band */}
      <rect width="24" height="5.33" fill="#FF9933" />
      {/* White band */}
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      {/* Green band */}
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="12" cy="8" r="2.1" stroke="#000080" strokeWidth="0.5" fill="none" />
      <circle cx="12" cy="8" r="0.4" fill="#000080" />
      {/* Spokes (simplified 8 cardinal spokes for micro size) */}
      <line x1="12" y1="5.9" x2="12" y2="10.1" stroke="#000080" strokeWidth="0.3" />
      <line x1="9.9" y1="8" x2="14.1" y2="8" stroke="#000080" strokeWidth="0.3" />
      <line x1="10.5" y1="6.5" x2="13.5" y2="9.5" stroke="#000080" strokeWidth="0.3" />
      <line x1="10.5" y1="9.5" x2="13.5" y2="6.5" stroke="#000080" strokeWidth="0.3" />
    </svg>
  );
};
