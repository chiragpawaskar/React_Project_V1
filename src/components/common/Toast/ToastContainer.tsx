import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const typeStyles = {
  success: {
    border: 'before:bg-emerald-500',
    iconColor: 'text-emerald-500',
  },
  error: {
    border: 'before:bg-rose-500',
    iconColor: 'text-rose-500',
  },
  warning: {
    border: 'before:bg-amber-500',
    iconColor: 'text-amber-500',
  },
  info: {
    border: 'before:bg-cyan-500',
    iconColor: 'text-cyan-500',
  },
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-[420px] w-[calc(100vw-48px)] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 size={20} />;
            case 'error':
              return <XCircle size={20} />;
            case 'warning':
              return <AlertTriangle size={20} />;
            case 'info':
            default:
              return <Info size={20} />;
          }
        };

        const config = typeStyles[toast.type] || typeStyles.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl bg-[var(--bg-card)] backdrop-blur-xl border border-white/15 shadow-2xl text-[var(--text-primary)] relative overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${config.border}`}
            role="alert"
          >
            <div className={`shrink-0 flex items-center justify-center mt-0.5 ${config.iconColor}`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[0.938rem] mb-0.5 text-[var(--text-primary)]">
                {toast.title}
              </div>
              <div className="text-[0.844rem] text-[var(--text-secondary)] leading-relaxed">
                {toast.message}
              </div>
            </div>
            <button
              type="button"
              className="text-[var(--text-tertiary)] flex items-center justify-center p-1 rounded-md transition-all hover:text-[var(--text-primary)] hover:bg-white/10 cursor-pointer"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
