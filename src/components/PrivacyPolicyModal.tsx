import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Lock, UserCheck, FileText, Mail, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative max-w-2xl w-full max-h-[88vh] rounded-3xl bg-[#0E0A1D] border border-purple-500/30 text-white overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-purple-500/20 bg-[#140E28] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Privacy Notice & DPDP Compliance
              </h3>
              <p className="text-[11px] text-purple-300 font-mono">
                Digital Personal Data Protection Act, 2023 (India)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Privacy Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light">
          
          {/* Fiduciary Intro */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs">
            <p>
              <strong className="text-white font-medium">Data Fiduciary:</strong> Supriya Bhavsar, Yoga Instructor & Somatic Practitioner, Vadodara, Gujarat, India. This notice outlines how we collect, process, and safeguard your personal data in strict compliance with the <strong className="text-purple-300">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
            </p>
          </div>

          {/* Section 1: Consent & Purpose */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>1. Notice & Informed Consent</span>
            </h4>
            <p className="text-slate-300 mb-2">
              We collect your personal data (name, email address, practice goals, and optional feedback stories) solely for specified lawful purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
              <li>Processing your waitlist reservations for 1-on-1 yoga and nutrition cohorts.</li>
              <li>Delivering requested educational mindfulness newsletters and schedule announcements.</li>
              <li>Displaying consented community transformation reflections with attribution.</li>
            </ul>
          </div>

          {/* Section 2: Data Principal Rights */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>2. Your Rights as a Data Principal</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/15">
                <strong className="text-purple-200 block mb-1">Right to Access:</strong>
                Request a summary of personal data held and identities of third parties processed with.
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/15">
                <strong className="text-purple-200 block mb-1">Right to Correction & Erasure:</strong>
                Request updating of outdated details or complete erasure of stored records.
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/15">
                <strong className="text-purple-200 block mb-1">Right of Grievance Redressal:</strong>
                Lodge complaints with our designated Grievance Officer within 48-hour SLA.
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/15">
                <strong className="text-purple-200 block mb-1">Right to Nominate:</strong>
                Nominate an individual to exercise rights in the event of incapacity.
              </div>
            </div>
          </div>

          {/* Section 3: Consent Withdrawal */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>3. Unconditional Right to Withdraw Consent</span>
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              You retain the absolute right to withdraw your consent at any time. Upon receipt of withdrawal, we will cease processing your personal data within 72 hours, except where required by Indian statutory compliance.
            </p>
          </div>

          {/* Section 4: Grievance Officer Details */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30">
            <h4 className="font-serif text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-300" />
              <span>Grievance Redressal Officer (DPDP Act, 2023)</span>
            </h4>
            <div className="text-xs space-y-1 text-slate-300">
              <p><strong className="text-white">Officer:</strong> Shlok Brahmbhatt</p>
              <p><strong className="text-white">Location:</strong> Vadodara, Gujarat, India</p>
              <p><strong className="text-white">Email:</strong> management@supriyabhavsar.com / privacy@supriyabhavsar.com</p>
              <p><strong className="text-white">Response Turnaround:</strong> Within 48 hours of ticket creation.</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-purple-500/20 bg-[#140E28] flex items-center justify-between text-xs text-slate-400">
          <span>Effective Date: November 2024 • Version 1.2</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full btn-silver-glass font-semibold text-xs cursor-pointer shadow-md"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};
