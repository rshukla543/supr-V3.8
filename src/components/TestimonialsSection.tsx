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
  ShieldCheck,
  HeartHandshake,
  MessageSquareHeart,
  User,
} from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitError('Please fill in your name, email, and reflection story.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      let finalImageUrl = '';

      if (imageFile) {
        try {
          finalImageUrl = await uploadMediaFile(imageFile, 'site-assets', 'testimonials');
        } catch (uploadErr) {
          console.warn('Storage upload fallback:', uploadErr);
          // Fallback to preview data if upload fails
          finalImageUrl = imagePreview;
        }
      }

      await submitTestimonial({
        name: name.trim(),
        email: email.trim(),
        roleOrLocation: roleOrLocation.trim() || 'Practitioner',
        rating,
        message: message.trim(),
        imageUrl: finalImageUrl || undefined,
      });

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setRoleOrLocation('');
      setRating(5);
      setMessage('');
      setImageFile(null);
      setImagePreview('');

      if (onTestimonialSubmitted) {
        onTestimonialSubmitted();
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
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
            Authentic reflections from dedicated practitioners, executives, and athletes who reclaimed nervous system balance, structural freedom, and mindful presence.
          </motion.p>
        </div>

        {/* 1. Approved Testimonials Carousel / Grid */}
        {approvedTestimonials.length > 0 ? (
          <div className="mb-24">
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
                  className="relative p-7 rounded-3xl bg-[#120C24]/80 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 hover:shadow-[0_15px_35px_rgba(168,85,247,0.12)] transition-all flex flex-col justify-between group"
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
                        {item.roleOrLocation || 'Verified Student'}
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
                          {approvedTestimonials[currentIndex].roleOrLocation || 'Verified Student'}
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
                    onClick={handlePrev}
                    aria-label="Previous story"
                    className="p-2.5 rounded-full bg-[#1A1232] border border-purple-500/30 text-white hover:bg-purple-900/40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
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
          <div className="text-center py-12 mb-20 p-8 rounded-3xl bg-[#120C24]/60 border border-purple-500/20 backdrop-blur-md">
            <HeartHandshake className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Stories are being curated</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to share your journey below!</p>
          </div>
        )}

        {/* 2. "Share Your Journey" Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-[#140D28]/90 to-[#0F0A20]/90 border border-purple-500/25 p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
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

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Thank you for sharing your light!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                  Your transformation story has been received and is pending moderation by Supriya. Thank you for enriching our conscious community.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-medium text-purple-300 bg-purple-900/30 border border-purple-500/30 hover:bg-purple-900/50 transition-colors"
                >
                  Submit Another Reflection
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0818] border border-purple-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-purple-400">*</span>
                      <span className="text-[10px] text-slate-500 ml-1.5 font-normal">(Never shown publicly)</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0818] border border-purple-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role or Program */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Program / Location
                    </label>
                    <input
                      type="text"
                      value={roleOrLocation}
                      onChange={(e) => setRoleOrLocation(e.target.value)}
                      placeholder="e.g. 1-on-1 Student • New York"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0818] border border-purple-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0B0818] border border-purple-500/20">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-400 ml-auto font-mono">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo Upload with Preview */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Profile Photo / Headshot <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0B0818] border border-purple-500/20">
                    {imagePreview ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400/50 shrink-0">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200 hover:bg-purple-900/50 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{imageFile ? 'Change Photo' : 'Upload Photo'}</span>
                      </button>
                      <span className="text-[11px] text-slate-400 ml-3 truncate">
                        {imageFile ? imageFile.name : 'PNG, JPG up to 5MB'}
                      </span>
                    </div>

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Message / Reflection */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Transformation Reflection <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how your body, nervous system, or daily lifestyle transformed through your practice with Supriya..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0818] border border-purple-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="w-full py-3.5 px-6 rounded-full font-medium text-sm tracking-wide text-[#0B0914] bg-gradient-to-r from-white via-slate-100 to-purple-100 hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0B0914] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit for Verification</span>
                        <Sparkles className="w-4 h-4 text-purple-700" />
                      </>
                    )}
                  </motion.button>
                  <p className="text-center text-[11px] text-slate-500 mt-2.5">
                    Submitted reviews are saved with pending status (<code className="text-purple-400">is_approved = false</code>) until approved in Supriya's CMS.
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
