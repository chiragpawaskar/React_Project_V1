import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Input.css';

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
      <div className={`input-group ${className}`}>
        {(label || actionLabel) && (
          <div className="input-label-row">
            {label && (
              <label htmlFor={inputId} className="input-label">
                {label}
                {isRequired && <span className="input-required-star" aria-hidden="true">*</span>}
              </label>
            )}
            {actionLabel && (
              <button
                type="button"
                onClick={onActionClick}
                className="input-action-btn-text"
                tabIndex={-1}
                style={{ fontSize: '0.813rem', color: 'var(--brand-primary)', fontWeight: 500 }}
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}

        <div
          className={`input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'has-error' : ''} ${disabled ? 'disabled' : ''}`}
        >
          {startIcon && <div className="input-start-icon">{startIcon}</div>}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={computedType}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...rest}
          />

          <div className="input-end-actions">
            {isPasswordType && (
              <button
                type="button"
                className="input-action-btn"
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
          <div id={`${inputId}-error`} className="input-error-msg" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <div id={`${inputId}-helper`} className="input-helper-msg">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
