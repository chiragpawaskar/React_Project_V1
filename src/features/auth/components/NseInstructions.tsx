import React from 'react';
import { Monitor, ShieldCheck, FileText, Lock, Headphones } from 'lucide-react';
import './NseInstructions.css';

interface NseInstructionsProps {
  onSupportClick?: () => void;
}

export const NseInstructions: React.FC<NseInstructionsProps> = ({ onSupportClick }) => {
  return (
    <div className="nse-instructions-card">
      {/* Title with orange bar */}
      <div className="nse-instructions-header">
        <h2 className="nse-instructions-title">Important Instructions</h2>
        <div className="nse-accent-underline" aria-hidden="true" />
      </div>

      <div className="nse-instructions-list">
        {/* 1. Browser Requirements */}
        <div className="nse-instruction-item">
          <div className="nse-instruction-icon-box" aria-hidden="true">
            <Monitor size={20} className="nse-instruction-icon" />
          </div>
          <div className="nse-instruction-content">
            <h3 className="nse-instruction-heading">Browser Requirements</h3>
            <ul className="nse-browser-list">
              <li>Edge version 79 and above</li>
              <li>Firefox version 63 and above</li>
              <li>Chrome version 70 and above</li>
              <li>Safari version 12.2 and above</li>
            </ul>
          </div>
        </div>

        {/* 2. Security Notice */}
        <div className="nse-instruction-item">
          <div className="nse-instruction-icon-box" aria-hidden="true">
            <ShieldCheck size={20} className="nse-instruction-icon" />
          </div>
          <div className="nse-instruction-content">
            <h3 className="nse-instruction-heading">Security Notice</h3>
            <p className="nse-instruction-text">
              By entering into this system, you confirm that you have explicit permission for access. Unauthorized access to this system is forbidden and subject to Legal proceedings.
            </p>
          </div>
        </div>

        {/* 3. File Download Policy */}
        <div className="nse-instruction-item">
          <div className="nse-instruction-icon-box" aria-hidden="true">
            <FileText size={20} className="nse-instruction-icon" />
          </div>
          <div className="nse-instruction-content">
            <h3 className="nse-instruction-heading">File Download Policy</h3>
            <p className="nse-instruction-text">
              Each file can be downloaded for maximum of 5 times (not per day). The file will be deleted after 1 week of its upload date.
            </p>
          </div>
        </div>

        {/* 4. Account Security */}
        <div className="nse-instruction-item">
          <div className="nse-instruction-icon-box" aria-hidden="true">
            <Lock size={20} className="nse-instruction-icon" />
          </div>
          <div className="nse-instruction-content">
            <h3 className="nse-instruction-heading">Account Security</h3>
            <p className="nse-instruction-text">
              The account will be locked if incorrect password is entered 3 times consecutively.
            </p>
          </div>
        </div>

        {/* 5. Support */}
        <div className="nse-instruction-item">
          <div className="nse-instruction-icon-box" aria-hidden="true">
            <Headphones size={20} className="nse-instruction-icon" />
          </div>
          <div className="nse-instruction-content">
            <h3 className="nse-instruction-heading">Support</h3>
            <p className="nse-instruction-text">
              For data subscription and query or to unlock the account{' '}
              <button
                type="button"
                className="nse-support-click-link"
                onClick={onSupportClick}
              >
                Click Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
