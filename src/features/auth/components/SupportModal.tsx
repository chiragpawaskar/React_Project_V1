import React from 'react';
import { X, Headphones, Mail, Phone, Clock, FileCheck } from 'lucide-react';
import './AuthModals.css';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="nse-modal-overlay" onClick={onClose}>
      <div className="nse-modal-box animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="nse-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="nse-modal-header">
          <div className="nse-modal-icon-badge">
            <Headphones size={24} color="#0f3b7d" />
          </div>
          <h3 className="nse-modal-title">NSE Indices Helpdesk</h3>
          <p className="nse-modal-desc">
            Support services for account unlocking, data subscriptions, and technical assistance.
          </p>
        </div>

        <div className="nse-support-details">
          <div className="nse-support-row">
            <Mail size={18} color="#0b3b82" />
            <div>
              <strong>Email Support:</strong>
              <p>indices@nse.co.in / datafeed@nse.co.in</p>
            </div>
          </div>

          <div className="nse-support-row">
            <Phone size={18} color="#0b3b82" />
            <div>
              <strong>Toll-Free Helpline:</strong>
              <p>1800 266 0050 / +91-22-26598386</p>
            </div>
          </div>

          <div className="nse-support-row">
            <Clock size={18} color="#0b3b82" />
            <div>
              <strong>Operating Hours:</strong>
              <p>Monday - Friday: 08:30 AM to 06:30 PM IST</p>
            </div>
          </div>

          <div className="nse-support-row">
            <FileCheck size={18} color="#0b3b82" />
            <div>
              <strong>Account Unlocking:</strong>
              <p>Accounts locked after 3 attempts unlock automatically after 30 minutes, or contact helpdesk with your corporate ID.</p>
            </div>
          </div>
        </div>

        <div className="nse-modal-actions" style={{ marginTop: '20px' }}>
          <button type="button" className="nse-btn nse-btn-submit" onClick={onClose} style={{ width: '100%' }}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
