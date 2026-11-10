import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { CaptchaChallengeData } from '@/types';
import { captchaGenerator } from '../utils/captchaGenerator';
import { useTheme } from '@/context/ThemeContext';
import { RefreshCw, Volume2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface CaptchaChallengeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onChallengeReady: (challenge: CaptchaChallengeData) => void;
  disabled?: boolean;
}

export const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({
  value,
  onChange,
  error,
  onChallengeReady,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<CaptchaChallengeData>(() =>
    captchaGenerator.generateChallenge(6)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme } = useTheme();

  // Stable callback ref to prevent infinite re-render loops
  const onReadyRef = useRef(onChallengeReady);
  useEffect(() => {
    onReadyRef.current = onChallengeReady;
  }, [onChallengeReady]);

  // Report initial challenge once on mount
  useEffect(() => {
    onReadyRef.current(currentChallenge);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    const nextChallenge = captchaGenerator.generateChallenge(6);
    setCurrentChallenge(nextChallenge);
    onChange(''); // clear previous answer
    onReadyRef.current(nextChallenge);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  }, [onChange]);

  // Re-render canvas when challenge or theme changes
  useEffect(() => {
    if (canvasRef.current && currentChallenge) {
      captchaGenerator.renderToCanvas(canvasRef.current, currentChallenge.code, theme === 'dark');
    }
  }, [currentChallenge, theme]);

  const handlePlayAudio = () => {
    if (currentChallenge) {
      captchaGenerator.speakCode(currentChallenge.code);
    }
  };

  const isMatched =
    currentChallenge &&
    value.trim().length > 0 &&
    value.trim().toUpperCase() === currentChallenge.code.toUpperCase();

  return (
    <div className="flex flex-col gap-2 w-full mt-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor="captcha-input" className="text-[0.844rem] font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
          <ShieldCheck size={16} color="var(--brand-primary)" />
          Security Verification Captcha
          <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <span className="text-[0.688rem] px-1.5 py-0.5 bg-indigo-500/15 text-[var(--brand-primary)] rounded font-semibold uppercase">
          Anti-Bot V3
        </span>
      </div>

      <div className="flex items-stretch gap-2.5 w-full">
        <div className="flex-1 relative bg-[var(--bg-input)] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center min-h-[52px] shadow-inner" title="Security visual verification code">
          <canvas
            ref={canvasRef}
            width={240}
            height={52}
            className="w-full h-[52px] block"
            aria-label="Security visual verification challenge"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <button
            type="button"
            className="flex items-center justify-center w-9 h-6 bg-white/5 border border-white/10 rounded-md text-[var(--text-secondary)] transition-all hover:not-disabled:bg-white/15 hover:not-disabled:text-[var(--text-primary)] hover:not-disabled:border-white/20 active:not-disabled:scale-95 cursor-pointer disabled:opacity-50"
            onClick={handleRefresh}
            disabled={disabled || isRefreshing}
            title="Generate new captcha challenge"
            aria-label="Generate new captcha challenge"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>

          <button
            type="button"
            className="flex items-center justify-center w-9 h-6 bg-white/5 border border-white/10 rounded-md text-[var(--text-secondary)] transition-all hover:not-disabled:bg-white/15 hover:not-disabled:text-[var(--text-primary)] hover:not-disabled:border-white/20 active:not-disabled:scale-95 cursor-pointer disabled:opacity-50"
            onClick={handlePlayAudio}
            disabled={disabled}
            title="Listen to captcha code (accessibility)"
            aria-label="Listen to captcha code"
          >
            <Volume2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`relative flex items-center w-full bg-[var(--bg-input)] rounded-xl border transition-all duration-150 overflow-hidden ${
            error
              ? 'border-rose-500 ring-3 ring-rose-500/25'
              : isMatched
              ? 'border-emerald-500 ring-3 ring-emerald-500/25'
              : 'border-white/12 hover:border-white/25 focus-within:border-indigo-500 focus-within:ring-3 focus-within:ring-indigo-500/25'
          }`}
        >
          <input
            id="captcha-input"
            name="captchaAnswer"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type characters above"
            maxLength={6}
            disabled={disabled}
            autoComplete="off"
            spellCheck="false"
            className="flex-1 w-full px-3.5 py-3 text-[0.938rem] text-[var(--text-primary)] bg-transparent border-none outline-none font-mono tracking-[3px] uppercase font-semibold placeholder:font-sans placeholder:tracking-normal placeholder:normal-case placeholder:font-normal placeholder:text-[var(--text-tertiary)] placeholder:opacity-70"
            aria-invalid={!!error}
            aria-describedby={error ? 'captcha-error' : undefined}
          />
          {isMatched && (
            <div className="pr-3 text-emerald-500 flex items-center">
              <CheckCircle2 size={18} />
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div id="captcha-error" className="flex items-center gap-1.5 text-[0.813rem] text-rose-500" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      ) : (
        <div className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
          <span>Case-insensitive. Letters and numbers only.</span>
        </div>
      )}
    </div>
  );
};
