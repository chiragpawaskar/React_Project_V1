import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Lock, Mail, Shield, Eye, EyeOff, RotateCw, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { captchaGenerator } from '../utils/captchaGenerator';
import { authValidators } from '../utils/authValidators';
import type { CaptchaChallengeData, LoginCredentials, FormTouchedFields, FormValidationErrors } from '@/types';
import './NseLoginForm.css';

interface NseLoginFormProps {
  onSuccess?: () => void;
  onForgotPasswordClick?: () => void;
}

export const NseLoginForm: React.FC<NseLoginFormProps> = ({
  onSuccess,
  onForgotPasswordClick,
}) => {
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    captchaAnswer: '',
    rememberMe: false,
  });

  const [touched, setTouched] = useState<FormTouchedFields>({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<CaptchaChallengeData>(() =>
    captchaGenerator.generateChallenge(6)
  );
  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render captcha to canvas
  useEffect(() => {
    if (canvasRef.current && currentChallenge) {
      captchaGenerator.renderToCanvas(canvasRef.current, currentChallenge.code, false);
    }
  }, [currentChallenge]);

  const refreshCaptcha = useCallback(() => {
    setIsRefreshingCaptcha(true);
    const nextChallenge = captchaGenerator.generateChallenge(6);
    setCurrentChallenge(nextChallenge);
    setCredentials((prev) => ({ ...prev, captchaAnswer: '' }));
    setTimeout(() => {
      setIsRefreshingCaptcha(false);
    }, 350);
  }, []);

  // Validation
  const errors: FormValidationErrors = useMemo(() => {
    return authValidators.validateLoginForm(credentials, currentChallenge.code);
  }, [credentials, currentChallenge]);

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormTouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Reset entire form
  const handleReset = () => {
    setCredentials({
      email: '',
      password: '',
      captchaAnswer: '',
      rememberMe: false,
    });
    setTouched({});
    refreshCaptcha();
    toast.info('Form Reset', 'All input fields have been cleared.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
      captchaAnswer: true,
    });

    const validationErrors = authValidators.validateLoginForm(credentials, currentChallenge.code);
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (hasErrors) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      const firstKey = Object.keys(validationErrors)[0] as keyof FormValidationErrors;
      toast.error('Validation Error', validationErrors[firstKey] || 'Please complete all fields properly.');
      return;
    }

    const success = await login(credentials);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={`nse-login-card ${isShaking ? 'animate-shake' : ''}`}>
      {/* Card Header */}
      <div className="nse-card-header">
        <span className="nse-card-subheading">Welcome to</span>
        <h2 className="nse-card-title">NSE Indices Limited</h2>
        <div className="nse-accent-underline" aria-hidden="true" />
        <p className="nse-card-description">
          Access, manage and download index related files securely.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="nse-form">
        {/* 1. Email ID */}
        <div className="nse-field-group">
          <div className={`nse-input-wrapper ${touched.email && errors.email ? 'has-error' : ''}`}>
            <span className="nse-field-icon" aria-hidden="true">
              <Mail size={18} />
            </span>
            <input
              type="email"
              id="nse-email"
              name="email"
              value={credentials.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="Email ID"
              disabled={isLoading}
              autoComplete="email"
              className="nse-input"
            />
          </div>
          <div className="nse-error-slot">
            {touched.email && errors.email && (
              <div className="nse-error-text">
                <AlertCircle size={13} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Password */}
        <div className="nse-field-group">
          <div className={`nse-input-wrapper ${touched.password && errors.password ? 'has-error' : ''}`}>
            <span className="nse-field-icon" aria-hidden="true">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="nse-password"
              name="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="Password"
              disabled={isLoading}
              autoComplete="current-password"
              className="nse-input"
            />
            <button
              type="button"
              className="nse-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="nse-error-slot">
            {touched.password && errors.password && (
              <div className="nse-error-text">
                <AlertCircle size={13} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Captcha Input */}
        <div className="nse-field-group">
          <div className={`nse-input-wrapper ${touched.captchaAnswer && errors.captchaAnswer ? 'has-error' : ''}`}>
            <span className="nse-field-icon" aria-hidden="true">
              <Shield size={18} />
            </span>
            <input
              type="text"
              id="nse-captcha"
              name="captchaAnswer"
              value={credentials.captchaAnswer}
              onChange={(e) => handleInputChange('captchaAnswer', e.target.value)}
              onBlur={() => handleBlur('captchaAnswer')}
              placeholder="Captcha"
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
              className="nse-input"
              maxLength={6}
            />
          </div>
          <div className="nse-error-slot">
            {touched.captchaAnswer && errors.captchaAnswer && (
              <div className="nse-error-text">
                <AlertCircle size={13} />
                <span>{errors.captchaAnswer}</span>
              </div>
            )}
          </div>
        </div>

        {/* Captcha Visual Challenge & Refresh */}
        <div className="nse-captcha-row">
          <div className="nse-captcha-box" title="Visual security captcha">
            <canvas
              ref={canvasRef}
              width={220}
              height={50}
              className="nse-captcha-canvas"
              aria-label="Security captcha challenge"
            />
          </div>

          <button
            type="button"
            className="nse-captcha-refresh-btn"
            onClick={refreshCaptcha}
            disabled={isRefreshingCaptcha || isLoading}
            title="Refresh captcha code"
            aria-label="Refresh captcha code"
          >
            <RotateCw size={19} className={isRefreshingCaptcha ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Action Buttons: Submit and Reset */}
        <div className="nse-actions-row">
          <button
            type="submit"
            id="nse-submit-btn"
            className="nse-btn nse-btn-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

          <button
            type="button"
            id="nse-reset-btn"
            className="nse-btn nse-btn-reset"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="nse-forgot-row">
          <button
            type="button"
            className="nse-forgot-link"
            onClick={onForgotPasswordClick}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};
