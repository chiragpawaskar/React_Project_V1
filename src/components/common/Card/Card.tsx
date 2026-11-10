import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', header, footer }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-card)] backdrop-blur-xl shadow-2xl transition-all duration-200 hover:border-white/20 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      {header && <div className="p-5 sm:p-8 pb-3 sm:pb-4">{header}</div>}
      <div className="px-5 sm:px-8 py-3 sm:py-4 pb-6 sm:pb-8">{children}</div>
      {footer && (
        <div className="px-5 sm:px-8 py-3.5 sm:py-4 bg-black/15 border-t border-white/10">
          {footer}
        </div>
      )}
    </div>
  );
};
