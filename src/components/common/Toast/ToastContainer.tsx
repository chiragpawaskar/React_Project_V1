import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import './Toast.css';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
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

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type}`} role="alert">
            <div className="toast-icon-wrapper">{getIcon()}</div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              type="button"
              className="toast-close-btn"
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
