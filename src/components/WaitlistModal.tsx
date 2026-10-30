import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/mockData';
import { saveWaitlistSubmission } from '../lib/supabase';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface WaitlistModalProps {
  initialServiceId?: string;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  initialServiceId,
  onClose,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'yoga-1on1'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [goals, setGoals] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner / Intermediate');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const [hasConsent, setHasConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!fullName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!hasConsent) {
      setError('Please consent to processing under India DPDP Act, 2023.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await saveWaitlistSubmission({
        serviceId: selectedServiceId,
        fullName,
        email,
        experienceLevel,
        goals,
      });
    } catch (err) {
      console.warn('Waitlist save error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#0E0A1D] text-[#F8FAFC] rounded-3xl overflow-hidden border border-purple-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#150F2B] border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-serif text-sm font-semibold shadow-md">
              S
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">
                {selectedService?.type === 'collaboration'
                  ? 'Brand Partnership Inquiry'
                  : 'Join Private Waitlist'}
              </h3>
              <p className="text-[11px] text-purple-300">
                Curated by Supriya • Midnight Lotus
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-400 text-purple-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-semibold text-white mb-2">
                You're on the Priority List!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-white">{fullName}</span>. We've reserved your submission for{' '}
                <span className="font-semibold text-purple-300">{selectedService?.title}</span>. We review each application personally and will email{' '}
                <span className="font-semibold text-white">{email}</span> within 48 hours.
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-purple-500/20 text-left max-w-md mx-auto mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  What happens next?
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1. You will receive a confirmation welcome email with a starter 15-minute alignment sequence.<br />
                  2. For yoga mentorship & nutrition, an intake questionnaire will follow.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Program Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Select Program / Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 bg-[#160F2C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.id} className="bg-[#150F2B] text-white">
                      {service.title} ({service.subtitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 bg-[#160F2C] text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 bg-[#160F2C] text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Conditional Experience level */}
              {selectedService?.type !== 'collaboration' ? (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                    Movement Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/20 bg-[#160F2C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Complete Beginner (Never stepped on a mat)" className="bg-[#150F2B]">
                      Complete Beginner (Never stepped on a mat)
                    </option>
                    <option value="Beginner / Intermediate (Practices 1-2x/week)" className="bg-[#150F2B]">
                      Beginner / Intermediate (Practices 1-2x/week)
                    </option>
                    <option value="Consistent Yogi (Daily flow / injury rehab focus)" className="bg-[#150F2B]">
                      Consistent Yogi (Daily flow / injury rehab focus)
                    </option>
                    <option value="Advanced / Teacher Training Student" className="bg-[#150F2B]">
                      Advanced / Teacher Training Student
                    </option>
                  </select>
                </div>
              ) : null}

              {/* Goals / Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                  {selectedService?.type === 'collaboration'
                    ? 'Brand Overview & Campaign Timeline'
                    : 'Primary Health or Lifestyle Goal'}
                </label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder={
                    selectedService?.type === 'collaboration'
                      ? 'Tell us about your brand, campaign vision, and proposed deliverable window...'
                      : 'e.g. Relieving chronic lower back ache, building daily routine, somatic calm...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/20 bg-[#160F2C] text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* India DPDP Act 2023 Consent Checkbox */}
              <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/20 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="dpdp-consent-waitlist"
                  required
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-purple-500/40 bg-[#160F2C] text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="dpdp-consent-waitlist" className="text-[11px] sm:text-xs text-slate-300 leading-snug cursor-pointer">
                  I give informed consent under India's <strong className="text-white">DPDP Act, 2023</strong> for Supriya Bhavsar to process my contact details for reservations and private consultations.
                </label>
              </div>

              {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

              {/* Submit CTA: Glassmorphic White/Silver */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Reserving Your Seat...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        {selectedService?.type === 'collaboration'
                          ? 'Send Partnership Inquiry'
                          : 'Confirm Waitlist Reservation'}
                      </span>
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-center text-[11px] text-slate-400">
                We respect your confidentiality. Zero spam. Cancel anytime.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
