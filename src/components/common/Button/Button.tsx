import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

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
        className={`btn btn-${variant} btn-${size} ${isFullWidth ? 'btn-full' : ''} ${className}`}
        {...rest}
      >
        {isLoading && <span className="btn-spinner" aria-hidden="true" />}
        {!isLoading && startIcon && <span className="btn-start-icon">{startIcon}</span>}
        <span className="btn-text">{children}</span>
        {!isLoading && endIcon && <span className="btn-end-icon">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
