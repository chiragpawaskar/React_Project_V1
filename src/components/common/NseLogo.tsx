import React from 'react';
import nseLogoStandard from '@/assets/NSE@4x-100.jpg';
import nseLogoReverse from '@/assets/NSE_reverse@4x-100.jpg';

export interface NseLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'reverse';
  height?: number | string;
  showText?: boolean; // Maintained for backwards compatibility
  textColor?: string; // Maintained for backwards compatibility
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export const NseLogo: React.FC<NseLogoProps> = ({
  size = 'md',
  variant = 'default',
  height,
  className = '',
  alt = 'National Stock Exchange of India (NSE)',
  style = {},
}) => {
  const heightMap: Record<NonNullable<NseLogoProps['size']>, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const resolvedHeight = height ?? heightMap[size];
  const logoSrc = variant === 'reverse' ? nseLogoReverse : nseLogoStandard;

  return (
    <div
      className={`nse-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
        lineHeight: 0,
        ...style,
      }}
    >
      <img
        src={logoSrc}
        alt={alt}
        style={{
          height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

