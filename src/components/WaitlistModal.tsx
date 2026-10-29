import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/mockData';
import { X, CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!fullName.trim()) {
      setError('Please provide your name.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#26332C] rounded-3xl overflow-hidden border border-[#CBD9D0] shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#FAF8F5] border-b border-[#EADECE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#182C22] text-[#FAF8F5] flex items-center justify-center font-serif text-sm font-semibold">
              S
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#182C22]">
                {selectedService?.type === 'collaboration'
                  ? 'Brand Partnership Inquiry'
                  : 'Join Private Waitlist'}
              </h3>
              <p className="text-[11px] text-[#9E8568]">
                Curated by Supriya • Spring 2026 Season
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#665440] hover:bg-[#E5ECE7] transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#E5ECE7] text-[#2C483A] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-semibold text-[#182C22] mb-2">
                You're on the Priority List!
              </h4>
              <p className="text-sm text-[#665440] max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-[#182C22]">{fullName}</span>. We've reserved your submission for{' '}
                <span className="font-semibold text-[#2C483A]">{selectedService?.title}</span>. We review each application personally and will email{' '}
                <span className="font-semibold text-[#182C22]">{email}</span> within 48 hours.
              </p>

              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#EADECE] text-left max-w-md mx-auto mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#9E8568] mb-1">
                  What happens next?
                </p>
                <p className="text-xs text-[#665440]">
                  1. You will receive a confirmation welcome email with a starter 15-minute alignment sequence.<br />
                  2. For yoga mentorship & nutrition, an intake questionnaire will follow.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-colors cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Program Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#665440] mb-2">
                  Select Program / Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD9D0] bg-white text-sm text-[#182C22] focus:outline-none focus:ring-2 focus:ring-[#4D705E]"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} ({service.subtitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#665440] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD9D0] bg-white text-sm text-[#182C22] focus:outline-none focus:ring-2 focus:ring-[#4D705E]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#665440] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD9D0] bg-white text-sm text-[#182C22] focus:outline-none focus:ring-2 focus:ring-[#4D705E]"
                />
              </div>

              {/* Conditional Experience or Brand details */}
              {selectedService?.type !== 'collaboration' ? (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#665440] mb-1">
                    Movement Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD9D0] bg-white text-sm text-[#182C22] focus:outline-none focus:ring-2 focus:ring-[#4D705E]"
                  >
                    <option value="Complete Beginner (Never stepped on a mat)">
                      Complete Beginner (Never stepped on a mat)
                    </option>
                    <option value="Beginner / Intermediate (Practices 1-2x/week)">
                      Beginner / Intermediate (Practices 1-2x/week)
                    </option>
                    <option value="Consistent Yogi (Daily flow / injury rehab focus)">
                      Consistent Yogi (Daily flow / injury rehab focus)
                    </option>
                    <option value="Advanced / Teacher Training Student">
                      Advanced / Teacher Training Student
                    </option>
                  </select>
                </div>
              ) : null}

              {/* Message / Goals */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#665440] mb-1">
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
                      : 'e.g. Relieving chronic lower back ache, building daily routine, mindfulness...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD9D0] bg-white text-sm text-[#182C22] focus:outline-none focus:ring-2 focus:ring-[#4D705E] resize-none"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Securing Your Spot...</span>
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
                </button>
              </div>

              <p className="text-center text-[11px] text-[#9E8568]">
                We respect your privacy. No spam. You may withdraw at any time.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
