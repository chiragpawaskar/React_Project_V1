import React from 'react';
import { Monitor, ShieldCheck, FileText, Lock, Headphones } from 'lucide-react';

interface NseInstructionsProps {
  onSupportClick?: () => void;
}

export const NseInstructions: React.FC<NseInstructionsProps> = ({ onSupportClick }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-9 sm:pb-7 shadow-[0_12px_36px_-6px_rgba(11,35,65,0.09),0_0_0_1px_rgba(226,232,240,0.8)] w-full max-w-[440px] flex flex-col">
      {/* Title with orange bar */}
      <div className="mb-6">
        <h2 className="font-sans text-[1.25rem] sm:text-[1.45rem] font-bold text-[#0b2341] m-0 leading-tight tracking-[-0.3px]">
          Important Instructions
        </h2>
        <div className="w-[46px] h-[3.5px] bg-[#f37021] rounded-xs my-2 sm:mb-3.5" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-5.5">
        {/* 1. Browser Requirements */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#eaf2fd] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <Monitor size={20} className="text-[#1d68d8]" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-[0.92rem] font-bold text-[#0b2341] m-0 mb-1 leading-snug">
              Browser Requirements
            </h3>
            <ul className="m-0 pl-4.5 font-sans text-[0.785rem] text-[#475569] leading-relaxed list-disc">
              <li className="mb-0.5">Edge version 79 and above</li>
              <li className="mb-0.5">Firefox version 63 and above</li>
              <li className="mb-0.5">Chrome version 70 and above</li>
              <li className="mb-0.5">Safari version 12.2 and above</li>
            </ul>
          </div>
        </div>

        {/* 2. Security Notice */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#eaf2fd] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <ShieldCheck size={20} className="text-[#1d68d8]" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-[0.92rem] font-bold text-[#0b2341] m-0 mb-1 leading-snug">
              Security Notice
            </h3>
            <p className="font-sans text-[0.785rem] text-[#475569] leading-relaxed m-0">
              By entering into this system, you confirm that you have explicit permission for access. Unauthorized access to this system is forbidden and subject to Legal proceedings.
            </p>
          </div>
        </div>

        {/* 3. File Download Policy */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#eaf2fd] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <FileText size={20} className="text-[#1d68d8]" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-[0.92rem] font-bold text-[#0b2341] m-0 mb-1 leading-snug">
              File Download Policy
            </h3>
            <p className="font-sans text-[0.785rem] text-[#475569] leading-relaxed m-0">
              Each file can be downloaded for maximum of 5 times (not per day). The file will be deleted after 1 week of its upload date.
            </p>
          </div>
        </div>

        {/* 4. Account Security */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#eaf2fd] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <Lock size={20} className="text-[#1d68d8]" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-[0.92rem] font-bold text-[#0b2341] m-0 mb-1 leading-snug">
              Account Security
            </h3>
            <p className="font-sans text-[0.785rem] text-[#475569] leading-relaxed m-0">
              The account will be locked if incorrect password is entered 3 times consecutively.
            </p>
          </div>
        </div>

        {/* 5. Support */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#eaf2fd] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
            <Headphones size={20} className="text-[#1d68d8]" />
          </div>
          <div className="flex-1">
            <h3 className="font-sans text-[0.92rem] font-bold text-[#0b2341] m-0 mb-1 leading-snug">
              Support
            </h3>
            <p className="font-sans text-[0.785rem] text-[#475569] leading-relaxed m-0">
              For data subscription and query or to unlock the account{' '}
              <button
                type="button"
                className="bg-transparent border-none p-0 text-[#0a58ca] font-sans text-[0.785rem] font-bold underline cursor-pointer inline hover:text-[#053b88]"
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
