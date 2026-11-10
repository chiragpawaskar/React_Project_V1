import React from 'react';
import { X, Headphones, Mail, Phone, Clock, FileCheck } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#061b36]/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[440px] p-7 sm:p-8 relative shadow-[0_20px_40px_rgba(0,20,60,0.2)] border border-[#e2e8f0] animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 bg-transparent border-0 text-[#64748b] cursor-pointer p-1 rounded-full flex items-center justify-center transition-colors hover:bg-[#f1f5f9] hover:text-[#0b2341]"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-5">
          <div className="w-[52px] h-[52px] rounded-full bg-[#eaf2fd] flex items-center justify-center mx-auto mb-3">
            <Headphones size={24} color="#0f3b7d" />
          </div>
          <h3 className="font-sans text-[1.25rem] font-bold text-[#0b2341] m-0 mb-1.5">NSE Indices Helpdesk</h3>
          <p className="font-sans text-[0.85rem] text-[#64748b] leading-relaxed m-0">
            Support services for account unlocking, data subscriptions, and technical assistance.
          </p>
        </div>

        <div className="flex flex-col gap-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Mail size={18} color="#0b3b82" className="shrink-0 mt-0.5" />
            <div>
              <strong className="text-[0.825rem] text-[#0b2341] block">Email Support:</strong>
              <p className="text-[0.8rem] text-[#475569] mt-0.5 mb-0 leading-snug">indices@nse.co.in / datafeed@nse.co.in</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={18} color="#0b3b82" className="shrink-0 mt-0.5" />
            <div>
              <strong className="text-[0.825rem] text-[#0b2341] block">Toll-Free Helpline:</strong>
              <p className="text-[0.8rem] text-[#475569] mt-0.5 mb-0 leading-snug">1800 266 0050 / +91-22-26598386</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={18} color="#0b3b82" className="shrink-0 mt-0.5" />
            <div>
              <strong className="text-[0.825rem] text-[#0b2341] block">Operating Hours:</strong>
              <p className="text-[0.8rem] text-[#475569] mt-0.5 mb-0 leading-snug">Monday - Friday: 08:30 AM to 06:30 PM IST</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileCheck size={18} color="#0b3b82" className="shrink-0 mt-0.5" />
            <div>
              <strong className="text-[0.825rem] text-[#0b2341] block">Account Unlocking:</strong>
              <p className="text-[0.8rem] text-[#475569] mt-0.5 mb-0 leading-snug">Accounts locked after 3 attempts unlock automatically after 30 minutes, or contact helpdesk with your corporate ID.</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="w-full h-11 border-0 rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer flex items-center justify-center transition-all bg-[#0f3b7d] text-white hover:bg-[#0a2d61]"
            onClick={onClose}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
