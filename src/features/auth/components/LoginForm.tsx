import React, { useState, useMemo, useCallback } from 'react';
import { User, Mail, Lock, ShieldCheck, KeyRound, Sparkles, LockKeyhole } from 'lucide-react';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { CaptchaChallenge } from './CaptchaChallenge';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { authValidators } from '../utils/authValidators';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { CaptchaChallengeData, FormTouchedFields, FormValidationErrors, LoginCredentials } from '@/types';
import './LoginForm.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    email: '',
    password: '',
    captchaAnswer: '',
    rememberMe: false,
  });

  const [touched, setTouched] = useState<FormTouchedFields>({});
  const [currentCaptcha, setCurrentCaptcha] = useState<CaptchaChallengeData | null>(null);
  const [formShake, setFormShake] = useState(false);

  // Evaluate password strength dynamically
  const passwordStrength = useMemo(() => {
    return authValidators.evaluatePasswordStrength(credentials.password);
  }, [credentials.password]);

  // Live validation errors
  const errors: FormValidationErrors = useMemo(() => {
    if (!currentCaptcha) return {};
    return authValidators.validateLoginForm(credentials, currentCaptcha.code);
  }, [credentials, currentCaptcha]);

  const handleInputChange = (field: keyof LoginCredentials, value: string | boolean) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormTouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCaptchaReady = useCallback((challenge: CaptchaChallengeData) => {
    setCurrentCaptcha(challenge);
  }, []);

  const handleFillDemo = () => {
    if (!currentCaptcha) return;
    setCredentials({
      username: 'alex.mercer',
      email: 'alex.mercer@enterprise.io',
      password: 'Nexus#Secure2026!',
      captchaAnswer: currentCaptcha.code,
      rememberMe: true,
    });
    setTouched({
      username: true,
      email: true,
      password: true,
      captchaAnswer: true,
    });
    toast.info('Demo Credentials Loaded', 'Sample enterprise profile and matching captcha populated.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      captchaAnswer: true,
    });

    if (!currentCaptcha) return;

    const validationErrors = authValidators.validateLoginForm(credentials, currentCaptcha.code);
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (hasErrors) {
      setFormShake(true);
      setTimeout(() => setFormShake(false), 500);

      const firstError = Object.values(validationErrors)[0];
      toast.error('Validation Check Failed', firstError || 'Please complete all required fields correctly.');
      return;
    }

    const success = await login(credentials);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form
      id="enterprise-login-form"
      className={`login-form ${formShake ? 'animate-shake' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Demo Credentials Quick-Fill Bar */}
      <div className="demo-credentials-bar">
        <div className="demo-badge">
          <Sparkles size={14} />
          <span>Evaluation Mode</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="demo-fill-btn"
          title="Autofill standard test credentials"
        >
          Auto-fill Demo Data
        </button>
      </div>

      {/* 1. Username Field */}
      <Input
        id="login-username"
        name="username"
        label="Username / Enterprise ID"
        placeholder="e.g. alex.mercer"
        isRequired
        value={credentials.username}
        onChange={(e) => handleInputChange('username', e.target.value)}
        onBlur={() => handleBlur('username')}
        error={touched.username ? errors.username : undefined}
        startIcon={<User size={18} />}
        disabled={isLoading}
        autoComplete="username"
      />

      {/* 2. Corporate Email Field */}
      <Input
        id="login-email"
        name="email"
        type="email"
        label="Corporate Email Address"
        placeholder="alex.mercer@enterprise.io"
        isRequired
        value={credentials.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        startIcon={<Mail size={18} />}
        disabled={isLoading}
        autoComplete="email"
      />

      {/* 3. Password Field with Strength Meter */}
      <div>
        <Input
          id="login-password"
          name="password"
          type="password"
          label="Account Password"
          placeholder="••••••••••••"
          isRequired
          value={credentials.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          startIcon={<Lock size={18} />}
          disabled={isLoading}
          autoComplete="current-password"
          actionLabel="Forgot?"
          onActionClick={() =>
            toast.info('Password Recovery', 'A password reset link has been dispatched to your corporate admin.')
          }
        />
        <PasswordStrengthMeter strength={passwordStrength} password={credentials.password} />
      </div>

      {/* 4. Captcha Verification Challenge */}
      <CaptchaChallenge
        value={credentials.captchaAnswer}
        onChange={(val) => handleInputChange('captchaAnswer', val)}
        error={touched.captchaAnswer ? errors.captchaAnswer : undefined}
        onChallengeReady={handleCaptchaReady}
        disabled={isLoading}
      />

      {/* Remember Me & Privacy */}
      <div className="login-form-options">
        <label className="remember-me-checkbox">
          <input
            id="remember-me-checkbox"
            type="checkbox"
            checked={credentials.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
            disabled={isLoading}
          />
          <span>Remember workstation</span>
        </label>
        <span style={{ fontSize: '0.781rem', color: 'var(--text-tertiary)' }}>
          AES-256 Protected
        </span>
      </div>

      {/* Submit Action */}
      <Button
        id="login-submit-button"
        type="submit"
        variant="primary"
        size="lg"
        isFullWidth
        isLoading={isLoading}
        startIcon={<LockKeyhole size={18} />}
      >
        {isLoading ? 'Verifying Credentials...' : 'Authenticate & Access Portal'}
      </Button>

      {/* Enterprise Security Badges */}
      <div className="security-assurance-box">
        <div className="security-badge-item">
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>SOC 2 Type II Certified</span>
        </div>
        <div className="security-badge-item">
          <KeyRound size={14} color="var(--brand-primary)" />
          <span>FIPS 140-3 Compliant</span>
        </div>
      </div>
    </form>
  );
};
