import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

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
    <div className="fixed inset-0 bg-[#061b36]/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl w-full max-w-[440px] p-7 sm:p-8 relative shadow-[0_20px_40px_rgba(0,20,60,0.2)] border border-[#e2e8f0] animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 bg-transparent border-0 text-[#64748b] cursor-pointer p-1 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f5f9] hover:text-[#0b2341]"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-5">
              <div className="w-[52px] h-[52px] rounded-full bg-[#eaf2fd] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={24} color="#0f3b7d" />
              </div>
              <h3 className="font-sans text-[1.25rem] font-bold text-[#0b2341] m-0 mb-1.5">Password Recovery</h3>
              <p className="font-sans text-[0.85rem] text-[#64748b] leading-relaxed m-0">
                Enter your registered corporate email to receive a secure password reset token.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative flex items-center border border-[#cbd5e1] rounded-lg bg-white h-11 hover:border-[#94a3b8] focus-within:border-[#0b3b82] focus-within:ring-3 focus-within:ring-[#0b3b82]/12 transition-all">
                <span className="flex items-center justify-center pl-3.5 pr-2.5 text-[#64748b] shrink-0" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered corporate email ID"
                  className="w-full h-full border-0 bg-transparent outline-none font-sans text-[0.9rem] text-[#0f172a] pr-3.5 placeholder:text-[#94a3b8]"
                  required
                  autoFocus
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full h-11 border-0 rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer flex items-center justify-center transition-all bg-[#0f3b7d] text-white hover:bg-[#0a2d61] hover:shadow-[0_4px_12px_rgba(15,59,125,0.25)]"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3">
            <CheckCircle2 size={48} color="#16a34a" />
            <h3 className="font-sans text-[1.25rem] font-bold text-[#0b2341] m-0 mb-1.5">Check Your Inbox</h3>
            <p className="font-sans text-[0.85rem] text-[#64748b] leading-relaxed m-0">
              We have sent password reset instructions to <strong>{email}</strong>. For compliance reasons, the link will expire in 15 minutes.
            </p>
            <button
              type="button"
              className="w-full h-11 mt-4 border-0 rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer flex items-center justify-center transition-all bg-[#0f3b7d] text-white hover:bg-[#0a2d61]"
              onClick={handleClose}
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
