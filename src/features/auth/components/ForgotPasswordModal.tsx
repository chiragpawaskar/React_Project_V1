import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import './AuthModals.css';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Invalid Email', 'Please enter a valid registered email address.');
      return;
    }

    setIsSubmitted(true);
    toast.success('Reset Instructions Sent', `A secure recovery link has been dispatched to ${email}`);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="nse-modal-overlay" onClick={handleClose}>
      <div className="nse-modal-box animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="nse-modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="nse-modal-header">
              <div className="nse-modal-icon-badge">
                <ShieldCheck size={24} color="#0f3b7d" />
              </div>
              <h3 className="nse-modal-title">Password Recovery</h3>
              <p className="nse-modal-desc">
                Enter your registered corporate email to receive a secure password reset token.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="nse-modal-form">
              <div className="nse-input-wrapper">
                <span className="nse-field-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered corporate email ID"
                  className="nse-input"
                  required
                  autoFocus
                />
              </div>

              <div className="nse-modal-actions">
                <button type="submit" className="nse-btn nse-btn-submit" style={{ width: '100%' }}>
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="nse-modal-success">
            <CheckCircle2 size={48} color="#16a34a" />
            <h3 className="nse-modal-title">Check Your Inbox</h3>
            <p className="nse-modal-desc">
              We have sent password reset instructions to <strong>{email}</strong>. For compliance reasons, the link will expire in 15 minutes.
            </p>
            <button type="button" className="nse-btn nse-btn-submit" onClick={handleClose} style={{ width: '100%', marginTop: '16px' }}>
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
