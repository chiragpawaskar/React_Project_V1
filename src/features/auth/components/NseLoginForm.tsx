import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { User, Lock, Mail, Shield, Eye, EyeOff, RotateCw, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { captchaGenerator } from '../utils/captchaGenerator';
import { authValidators } from '../utils/authValidators';
import type { CaptchaChallengeData, LoginCredentials, FormTouchedFields, FormValidationErrors } from '@/types';

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
    username: '',
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
      username: '',
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
      username: true,
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
    <div
      className={`bg-white rounded-[20px] p-6 sm:p-9 sm:pb-7 shadow-[0_12px_36px_-6px_rgba(11,35,65,0.09),0_0_0_1px_rgba(226,232,240,0.8)] w-full max-w-[440px] transition-all duration-200 ${
        isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
      }`}
    >
      {/* Card Header */}
      <div className="mb-6">
        <span className="block font-sans text-[0.95rem] font-medium text-[#64748b] mb-0.5">Welcome to</span>
        <h2 className="font-sans text-[1.25rem] sm:text-[1.45rem] font-bold text-[#0b2341] m-0 leading-tight tracking-[-0.3px]">
          NSE Indices Limited
        </h2>
        <div className="w-[46px] h-[3.5px] bg-[#f37021] rounded-xs my-2 sm:mb-3.5" aria-hidden="true" />
        <p className="font-sans text-[0.825rem] text-[#475569] leading-relaxed m-0">
          Access, manage and download index related files securely.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative flex items-center border rounded-lg bg-white transition-all duration-200 h-11 ${
              touched.username && errors.username
                ? 'border-red-500 bg-[#fffbfa] focus-within:ring-3 focus-within:ring-red-500/15'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] focus-within:border-[#0b3b82] focus-within:ring-3 focus-within:ring-[#0b3b82]/12'
            }`}
          >
            <span className="flex items-center justify-center pl-3.5 pr-2.5 text-[#64748b] shrink-0" aria-hidden="true">
              <User size={18} />
            </span>
            <input
              type="text"
              id="nse-username"
              name="username"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              placeholder="Username"
              disabled={isLoading}
              autoComplete="username"
              className="w-full h-full border-0 bg-transparent outline-none font-sans text-[0.9rem] text-[#0f172a] pr-3.5 placeholder:text-[#94a3b8] placeholder:font-normal"
            />
          </div>
          {touched.username && errors.username && (
            <div className="flex items-center gap-1.5 text-red-500 text-[0.75rem] font-medium pl-1">
              <AlertCircle size={13} />
              <span>{errors.username}</span>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative flex items-center border rounded-lg bg-white transition-all duration-200 h-11 ${
              touched.password && errors.password
                ? 'border-red-500 bg-[#fffbfa] focus-within:ring-3 focus-within:ring-red-500/15'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] focus-within:border-[#0b3b82] focus-within:ring-3 focus-within:ring-[#0b3b82]/12'
            }`}
          >
            <span className="flex items-center justify-center pl-3.5 pr-2.5 text-[#64748b] shrink-0" aria-hidden="true">
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
              className="w-full h-full border-0 bg-transparent outline-none font-sans text-[0.9rem] text-[#0f172a] pr-3.5 placeholder:text-[#94a3b8] placeholder:font-normal"
            />
            <button
              type="button"
              className="bg-transparent border-0 px-3 cursor-pointer text-[#64748b] flex items-center justify-center transition-colors hover:text-[#0b2341]"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <div className="flex items-center gap-1.5 text-red-500 text-[0.75rem] font-medium pl-1">
              <AlertCircle size={13} />
              <span>{errors.password}</span>
            </div>
          )}
        </div>

        {/* Email ID */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative flex items-center border rounded-lg bg-white transition-all duration-200 h-11 ${
              touched.email && errors.email
                ? 'border-red-500 bg-[#fffbfa] focus-within:ring-3 focus-within:ring-red-500/15'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] focus-within:border-[#0b3b82] focus-within:ring-3 focus-within:ring-[#0b3b82]/12'
            }`}
          >
            <span className="flex items-center justify-center pl-3.5 pr-2.5 text-[#64748b] shrink-0" aria-hidden="true">
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
              className="w-full h-full border-0 bg-transparent outline-none font-sans text-[0.9rem] text-[#0f172a] pr-3.5 placeholder:text-[#94a3b8] placeholder:font-normal"
            />
          </div>
          {touched.email && errors.email && (
            <div className="flex items-center gap-1.5 text-red-500 text-[0.75rem] font-medium pl-1">
              <AlertCircle size={13} />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Captcha Input */}
        <div className="flex flex-col gap-1">
          <div
            className={`relative flex items-center border rounded-lg bg-white transition-all duration-200 h-11 ${
              touched.captchaAnswer && errors.captchaAnswer
                ? 'border-red-500 bg-[#fffbfa] focus-within:ring-3 focus-within:ring-red-500/15'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] focus-within:border-[#0b3b82] focus-within:ring-3 focus-within:ring-[#0b3b82]/12'
            }`}
          >
            <span className="flex items-center justify-center pl-3.5 pr-2.5 text-[#64748b] shrink-0" aria-hidden="true">
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
              className="w-full h-full border-0 bg-transparent outline-none font-sans text-[0.9rem] text-[#0f172a] pr-3.5 placeholder:text-[#94a3b8] placeholder:font-normal"
              maxLength={6}
            />
          </div>
          {touched.captchaAnswer && errors.captchaAnswer && (
            <div className="flex items-center gap-1.5 text-red-500 text-[0.75rem] font-medium pl-1">
              <AlertCircle size={13} />
              <span>{errors.captchaAnswer}</span>
            </div>
          )}
        </div>

        {/* Captcha Visual Challenge & Refresh */}
        <div className="flex items-center gap-3 mt-1">
          <div className="flex-1 bg-[#f1f5f9] rounded-lg overflow-hidden flex items-center justify-center shadow-inner border border-[#e2e8f0] h-[52px]" title="Visual security captcha">
            <canvas
              ref={canvasRef}
              width={220}
              height={50}
              className="w-full h-full block"
              aria-label="Security captcha challenge"
            />
          </div>

          <button
            type="button"
            className="w-11 h-11 rounded-full bg-white border border-[#cbd5e1] text-[#0b3b82] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-xs shrink-0 hover:bg-[#f0f4fa] hover:border-[#0b3b82] hover:rotate-[30deg] disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={refreshCaptcha}
            disabled={isRefreshingCaptcha || isLoading}
            title="Refresh captcha code"
            aria-label="Refresh captcha code"
          >
            <RotateCw size={19} className={isRefreshingCaptcha ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Action Buttons: Submit and Reset */}
        <div className="grid grid-cols-2 gap-3.5 mt-2">
          <button
            type="submit"
            id="nse-submit-btn"
            className="h-11 border-0 rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer flex items-center justify-center transition-all duration-200 shadow-xs active:translate-y-px bg-[#0f3b7d] text-white hover:bg-[#0a2d61] hover:shadow-[0_4px_12px_rgba(15,59,125,0.25)] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

          <button
            type="button"
            id="nse-reset-btn"
            className="h-11 border-0 rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer flex items-center justify-center transition-all duration-200 shadow-xs active:translate-y-px bg-[#f37021] text-white hover:bg-[#df5f12] hover:shadow-[0_4px_12px_rgba(243,112,33,0.25)]"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-center mt-1.5">
          <button
            type="button"
            className="bg-transparent border-0 text-[#0a58ca] font-sans text-[0.85rem] font-semibold underline cursor-pointer transition-colors hover:text-[#053b88]"
            onClick={onForgotPasswordClick}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};
