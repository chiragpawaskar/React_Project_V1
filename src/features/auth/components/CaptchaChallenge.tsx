import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { CaptchaChallengeData } from '@/types';
import { captchaGenerator } from '../utils/captchaGenerator';
import { useTheme } from '@/context/ThemeContext';
import { RefreshCw, Volume2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import './CaptchaChallenge.css';

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
    <div className="captcha-container">
      <div className="captcha-label-row">
        <label htmlFor="captcha-input" className="captcha-label">
          <ShieldCheck size={16} color="var(--brand-primary)" />
          Security Verification Captcha
          <span className="input-required-star" aria-hidden="true">*</span>
        </label>
        <span className="captcha-badge">Anti-Bot V3</span>
      </div>

      <div className="captcha-challenge-box">
        <div className="captcha-canvas-wrapper" title="Security visual verification code">
          <canvas
            ref={canvasRef}
            width={240}
            height={52}
            className="captcha-canvas"
            aria-label="Security visual verification challenge"
          />
        </div>

        <div className="captcha-actions">
          <button
            type="button"
            className="captcha-action-btn"
            onClick={handleRefresh}
            disabled={disabled || isRefreshing}
            title="Generate new captcha challenge"
            aria-label="Generate new captcha challenge"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>

          <button
            type="button"
            className="captcha-action-btn"
            onClick={handlePlayAudio}
            disabled={disabled}
            title="Listen to captcha code (accessibility)"
            aria-label="Listen to captcha code"
          >
            <Volume2 size={14} />
          </button>
        </div>
      </div>

      <div className="captcha-input-row">
        <div
          className={`input-wrapper ${error ? 'has-error' : ''} ${isMatched ? 'is-valid' : ''}`}
          style={{ width: '100%' }}
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
            className="input-field"
            style={{
              letterSpacing: '3px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'captcha-error' : undefined}
          />
          {isMatched && (
            <div style={{ paddingRight: '12px', color: 'var(--accent-emerald)', display: 'flex' }}>
              <CheckCircle2 size={18} />
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div id="captcha-error" className="input-error-msg" role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      ) : (
        <div className="captcha-tip">
          <span>Case-insensitive. Letters and numbers only.</span>
        </div>
      )}
    </div>
  );
};
