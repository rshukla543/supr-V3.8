import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  Upload,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  HeartHandshake,
  MessageSquareHeart,
  User,
  Send,
  KeyRound,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';
import { Testimonial } from '../types';
import { submitTestimonial, uploadMediaFile } from '../lib/supabase';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onTestimonialSubmitted?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onTestimonialSubmitted,
}) => {
  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Accordion drawer state: default to FALSE so only testimonials are visible!
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleOrLocation, setRoleOrLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hasDpdpConsent, setHasDpdpConsent] = useState(false);

  // OTP Verification Step State (simulating Resend email OTP flow)
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const SIMULATED_OTP = '749201';

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter approved testimonials only for public display
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const handlePrev = () => {
    if (approvedTestimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? approvedTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (approvedTestimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev === approvedTestimonials.length - 1 ? 0 : prev + 1));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Photo must be smaller than 5MB');
        toast.error('Photo must be smaller than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 1: Validate & Trigger OTP Verification Modal
  const handleInitiateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitError('Please fill in your name, email, and reflection story.');
      toast.error('Please complete all required fields.');
      return;
    }
    if (!hasDpdpConsent) {
      setSubmitError('Please consent to processing under India DPDP Act, 2023.');
      toast.error('Please provide DPDP Act consent to proceed.');
      return;
    }

    setSubmitError('');
    setOtpError('');
    setOtpCode('');
    setShowOtpModal(true);
    toast.info(`Verification code sent to ${email} (Demo code: ${SIMULATED_OTP})`, {
      duration: 6000,
    });
  };

  // Step 2: Verify OTP & Finalize Submission
  const handleVerifyOtpAndSubmit = async () => {
    if (otpCode.trim() !== SIMULATED_OTP) {
      setOtpError(`Invalid code. For client preview, use: ${SIMULATED_OTP}`);
      toast.error(`Invalid OTP. Enter test code: ${SIMULATED_OTP}`);
      return;
    }

    setIsSubmitting(true);
    setOtpError('');

    try {
      let finalImageUrl = '';

      if (imageFile) {
        try {
          finalImageUrl = await uploadMediaFile(imageFile, 'site-assets', 'testimonials');
        } catch (uploadErr) {
          console.warn('Storage upload fallback:', uploadErr);
          finalImageUrl = imagePreview;
        }
      }

      await submitTestimonial({
        name: name.trim(),
        email: email.trim(),
        roleOrLocation: roleOrLocation.trim() || 'Practitioner • Gujarat',
        rating,
        message: message.trim(),
        imageUrl: finalImageUrl || undefined,
      });

      setIsSubmitted(true);
      setShowOtpModal(false);
      setName('');
      setEmail('');
      setRoleOrLocation('');
      setRating(5);
      setMessage('');
      setImageFile(null);
      setImagePreview('');

      toast.success('Your reflection was verified and submitted for moderation!');

      if (onTestimonialSubmitted) {
        onTestimonialSubmitted();
      }
    } catch (err: any) {
      const errMsg = err.message || 'Something went wrong. Please try again.';
      setSubmitError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wider uppercase mb-5 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Transformations & Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight"
          >
            Real Journeys of <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-300">Awakened Vitality</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Authentic reflections from dedicated practitioners, founders, and students across Gujarat and India who reclaimed nervous system balance, structural freedom, and mindful presence.
          </motion.p>
        </div>

        {/* 1. Approved Testimonials Public Display (Only this is visible by default) */}
        {approvedTestimonials.length > 0 ? (
          <div className="mb-14">
            {/* Desktop 3-Card Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {approvedTestimonials.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
                  className="relative p-7 rounded-3xl bg-[#120C24]/85 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 hover:shadow-[0_15px_35px_rgba(168,85,247,0.15)] transition-all flex flex-col justify-between group"
                >
                  <div className="absolute top-6 right-6 text-purple-400/20 group-hover:text-purple-400/30 transition-colors">
                    <Quote className="w-10 h-10 rotate-180" />
                  </div>

                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light mb-8 italic">
                      "{item.message}"
                    </p>
                  </div>

                  {/* Student Profile Info */}
                  <div className="flex items-center gap-4 pt-5 border-t border-purple-500/15">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/40 shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-purple-400/40 flex items-center justify-center text-white font-medium text-sm">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-white font-medium text-sm tracking-wide truncate">
                          {item.name}
                        </h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      </div>
                      <p className="text-xs text-purple-300/80 truncate">
                        {item.roleOrLocation || 'Verified Student • Gujarat'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile / Tablet Interactive Slider */}
            <div className="lg:hidden relative">
              <AnimatePresence mode="wait">
                {approvedTestimonials[currentIndex] && (
                  <motion.div
                    key={approvedTestimonials[currentIndex].id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#120C24]/90 border border-purple-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: approvedTestimonials[currentIndex].rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-purple-400/30 rotate-180" />
                      </div>

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-6">
                        "{approvedTestimonials[currentIndex].message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-purple-500/15">
                      {approvedTestimonials[currentIndex].imageUrl ? (
                        <img
                          src={approvedTestimonials[currentIndex].imageUrl}
                          alt={approvedTestimonials[currentIndex].name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-purple-400/40"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-purple-400/40 flex items-center justify-center text-white font-medium text-sm">
                          {approvedTestimonials[currentIndex].name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-white font-medium text-sm">
                            {approvedTestimonials[currentIndex].name}
                          </h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <p className="text-xs text-purple-300/80">
                          {approvedTestimonials[currentIndex].roleOrLocation || 'Verified Student • Gujarat'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="flex items-center gap-1.5">
                  {approvedTestimonials.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === dotIdx ? 'w-6 bg-purple-400' : 'w-2 bg-purple-500/30'
                      }`}
                      aria-label={`Slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous story"
                    className="p-2.5 rounded-full bg-[#1A1232] border border-purple-500/30 text-white hover:bg-purple-900/40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next story"
                    className="p-2.5 rounded-full bg-[#1A1232] border border-purple-500/30 text-white hover:bg-purple-900/40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 mb-14 p-8 rounded-3xl bg-[#120C24]/60 border border-purple-500/20 backdrop-blur-md">
            <HeartHandshake className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Stories are being curated</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to share your journey below!</p>
          </div>
        )}

        {/* 2. Slide-Down Accordion Trigger Button: Striking Violet/Purple Shining Glare */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider btn-shimmer-lotus cursor-pointer shadow-[0_4px_25px_rgba(168,85,247,0.45)] active:scale-95 group transition-all"
          >
            <MessageSquareHeart className="w-4 h-4 text-white" />
            <span>{showSubmitForm ? 'Close Story Form' : '✨ Share Your Transformation Story'}</span>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-300 ${
                showSubmitForm ? 'rotate-180' : ''
              }`}
            />
          </button>
          {!showSubmitForm && (
            <p className="text-[11px] text-purple-300/80 mt-2.5 font-mono">
              Have you trained with Supriya? Click above to add your experience to our community wall.
            </p>
          )}
        </div>

        {/* 3. Smooth Slide-Down Accordion Container */}
        <AnimatePresence>
          {showSubmitForm && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              className="overflow-hidden max-w-3xl mx-auto"
            >
              <div className="rounded-3xl bg-gradient-to-b from-[#140D28]/95 to-[#0F0A20]/95 border border-purple-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden mt-6 mb-12">
                {/* Subtle top decorative accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />

                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide mb-3">
                    <MessageSquareHeart className="w-3.5 h-3.5 text-purple-400" />
                    <span>Community Reflections</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                    Share Your <span className="italic text-purple-300">Transformation Journey</span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                    Have you experienced profound somatic release or renewed clarity? Submit your reflection below. (Submissions are gently reviewed before appearing on the public wall).
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    key="submitted-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-medium text-white mb-2">Thank you for sharing your light!</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                      Your transformation story has been received and is pending gentle moderation by Supriya. Thank you for enriching our conscious community.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-medium text-purple-300 bg-purple-900/30 border border-purple-500/30 hover:bg-purple-900/50 transition-colors cursor-pointer"
                    >
                      Submit Another Reflection
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInitiateSubmit} className="space-y-5">
                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                        {submitError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Pooja Shah"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0716] border border-purple-500/20 text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-purple-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Email Address * (Kept Private)
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="pooja.shah@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0716] border border-purple-500/20 text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-purple-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Role or City (e.g., Vadodara / Ahmedabad)
                        </label>
                        <input
                          type="text"
                          value={roleOrLocation}
                          onChange={(e) => setRoleOrLocation(e.target.value)}
                          placeholder="e.g. Private Mentorship Student • Vadodara"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B0716] border border-purple-500/20 text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-purple-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Experience Rating
                        </label>
                        <div className="flex items-center gap-2 h-[46px] px-4 rounded-xl bg-[#0B0716] border border-purple-500/20">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-hidden cursor-pointer"
                              aria-label={`${star} Stars`}
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  star <= rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-600 hover:text-slate-400'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs text-purple-300/80 font-mono ml-2">
                            {rating} of 5 Stars
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Transformation Story *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your journey, shifts in your body, breath, nervous system, or posture..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0716] border border-purple-500/20 text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-purple-400 transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Optional Profile Photo
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-purple-500/20 hover:border-purple-400/40 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-purple-400" />
                          <span>{imageFile ? 'Change Photo' : 'Upload Avatar'}</span>
                        </button>
                        {imagePreview && (
                          <div className="flex items-center gap-2">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-9 h-9 rounded-full object-cover border border-purple-400/40"
                            />
                            <span className="text-xs text-purple-300 font-mono">
                              Photo Attached
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DPDP Act 2023 Statutory Consent Checkbox */}
                    <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/20 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="dpdp-consent-testimonial"
                        required
                        checked={hasDpdpConsent}
                        onChange={(e) => setHasDpdpConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-purple-500/40 bg-[#0E0A1D] text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <label htmlFor="dpdp-consent-testimonial" className="text-[11px] sm:text-xs text-slate-300 leading-snug cursor-pointer">
                        I give my explicit consent under India's <strong className="text-white">Digital Personal Data Protection (DPDP) Act, 2023</strong> for Supriya Bhavsar to process and display my review on this public wall. I may withdraw consent at any time.
                      </label>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowSubmitForm(false)}
                        className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#0B0914]" />
                        <span>Continue to Verification</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleek OTP Email Verification Modal (Simulating Resend Auth Flow) */}
        <AnimatePresence>
          {showOtpModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md rounded-3xl bg-[#140E28] border border-purple-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center text-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
                  <KeyRound className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-2xl font-semibold mb-1.5">
                  Verify Your Reflection
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
                  To prevent automated spam and verify your identity under DPDP guidelines, we sent a 6-digit confirmation code to <strong className="text-purple-300 font-mono">{email}</strong>.
                </p>

                {/* Simulated Notice Pill */}
                <div className="mb-6 p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-mono">Demo Code: <strong>{SIMULATED_OTP}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode(SIMULATED_OTP);
                      setOtpError('');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white transition-colors cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>

                {/* 6-Digit OTP Input */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                      setOtpError('');
                    }}
                    placeholder="••••••"
                    className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 rounded-2xl bg-[#0B0716] border border-purple-500/30 text-white focus:outline-hidden focus:border-purple-400 transition-colors"
                  />
                  {otpError && (
                    <p className="mt-2 text-xs text-rose-400 font-medium">
                      {otpError}
                    </p>
                  )}
                </div>

                {/* Modal Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="w-1/3 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-purple-500/20 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtpAndSubmit}
                    disabled={isSubmitting || otpCode.length < 6}
                    className="w-2/3 py-3 rounded-2xl btn-silver-glass text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0B0914]" />
                    <span>{isSubmitting ? 'Verifying...' : 'Verify & Submit'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
