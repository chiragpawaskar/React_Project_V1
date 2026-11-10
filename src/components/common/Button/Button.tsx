import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)] hover:not-disabled:shadow-[0_6px_24px_rgba(99,102,241,0.55)] hover:not-disabled:-translate-y-0.5 border-transparent',
  secondary:
    'bg-white/10 text-[var(--text-primary)] border-white/15 hover:not-disabled:bg-white/15 hover:not-disabled:border-white/25',
  outline:
    'bg-transparent border-white/15 text-[var(--text-primary)] hover:not-disabled:border-indigo-500 hover:not-disabled:bg-indigo-500/10',
  ghost:
    'bg-transparent text-[var(--text-secondary)] border-transparent hover:not-disabled:bg-white/5 hover:not-disabled:text-[var(--text-primary)]',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3.5 py-2 text-[0.813rem] rounded-lg',
  md: 'px-5 py-3 text-[0.938rem] rounded-xl',
  lg: 'px-6.5 py-3.5 text-[1.063rem] rounded-2xl',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      isLoading = false,
      startIcon,
      endIcon,
      disabled,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-semibold font-[var(--font-display)] border transition-all duration-200 cursor-pointer relative overflow-hidden select-none gap-2 leading-none active:not-disabled:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${
          sizeStyles[size]
        } ${variantStyles[variant]} ${isFullWidth ? 'w-full' : ''} ${className}`}
        {...rest}
      >
        {isLoading && (
          <span
            className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            aria-hidden="true"
          />
        )}
        {!isLoading && startIcon && <span className="inline-flex items-center">{startIcon}</span>}
        <span>{children}</span>
        {!isLoading && endIcon && <span className="inline-flex items-center">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
