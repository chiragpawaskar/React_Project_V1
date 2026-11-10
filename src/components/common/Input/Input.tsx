import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isRequired?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      type = 'text',
      error,
      helperText,
      startIcon,
      endIcon,
      isRequired,
      actionLabel,
      onActionClick,
      disabled,
      className = '',
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === 'password';
    const computedType = isPasswordType ? (showPassword ? 'text' : 'password') : type;
    const inputId = id || name || `input_${Math.random().toString(36).substring(2, 7)}`;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={`flex flex-col gap-1.5 w-full relative mb-1 ${className}`}>
        {(label || actionLabel) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={inputId} className="text-[0.844rem] font-medium text-[var(--text-secondary)] flex items-center gap-1 transition-colors">
                {label}
                {isRequired && <span className="text-rose-500" aria-hidden="true">*</span>}
              </label>
            )}
            {actionLabel && (
              <button
                type="button"
                onClick={onActionClick}
                className="text-[0.813rem] text-indigo-500 font-medium hover:underline cursor-pointer"
                tabIndex={-1}
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}

        <div
          className={`relative flex items-center w-full bg-[var(--bg-input)] rounded-xl border transition-all duration-150 overflow-hidden ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          } ${
            error
              ? 'border-rose-500 ring-3 ring-rose-500/25'
              : isFocused
              ? 'border-indigo-500 bg-[var(--bg-input-focus)] ring-3 ring-indigo-500/25'
              : 'border-white/12 hover:border-white/25 hover:bg-[var(--bg-input-focus)]'
          }`}
        >
          {startIcon && (
            <div className={`flex items-center justify-center pl-3.5 transition-colors pointer-events-none ${
              error ? 'text-rose-500' : isFocused ? 'text-indigo-500' : 'text-[var(--text-tertiary)]'
            }`}>
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={computedType}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 w-full px-3.5 py-3 text-[0.938rem] text-[var(--text-primary)] bg-transparent border-none outline-none font-sans placeholder:text-[var(--text-tertiary)] placeholder:opacity-70 disabled:cursor-not-allowed"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...rest}
          />

          <div className="flex items-center pr-3 gap-2">
            {isPasswordType && (
              <button
                type="button"
                className="flex items-center justify-center text-[var(--text-tertiary)] p-1 rounded-md transition-colors hover:text-[var(--text-primary)] hover:bg-white/10 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
            {!isPasswordType && endIcon && <div>{endIcon}</div>}
          </div>
        </div>

        {error && (
          <div id={`${inputId}-error`} className="flex items-center gap-1.5 text-[0.813rem] text-rose-500 animate-[fadeIn_0.2s_ease-in-out]" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <div id={`${inputId}-helper`} className="text-[0.813rem] text-[var(--text-tertiary)]">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
