import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Sparkles, Send, Heart, Compass, Shield } from 'lucide-react';
import { saveSubscriber } from '../lib/supabase';

export const AboutNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'flows' | 'recipes' | 'mindset'>('all');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasConsent, setHasConsent] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!hasConsent) {
      setErrorMessage('Please consent to receiving mindful emails under India DPDP Act, 2023.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await saveSubscriber(email, interest);
    } catch (err) {
      console.warn('Newsletter save error:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 400);
  };

  return (
    <section id="about" className="py-20 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Supriya Bio & Pillars (7 cols) with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 w-fit backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>The Journey & Ethos</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              "Movement is not about performance. It is an act of returning home."
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300/85 leading-relaxed mb-8">
              <p>
                I am <strong className="text-white font-semibold">Supriya</strong>. For over eight years, I navigated the unrelenting cadence of corporate tech until severe nervous system burnout compelled me to step off the treadmill and re-learn what it means to actually inhabit the human body.
              </p>
              <p>
                My search brought me to the Himalayan foothills of Rishikesh and the ashrams of Ubud, where I immersed myself in 500+ hours of advanced classical Vinyasa, somatic pranayama, and Ayurvedic chronobiology.
              </p>
              <p>
                Today, I bridge ancient yogic disciplines with contemporary biomechanics. Whether through viral educational reels, long-form YouTube classes, or private cohorts, my mission is to help you cultivate quiet mental clarity, unshakeable physical strength, and a lifestyle that nourishes your soul.
              </p>
            </div>

            {/* 3 Core Philosophy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-500/15">
              <motion.div
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-[#140E26]/80 border border-purple-500/20 backdrop-blur-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-400/30 text-purple-300 flex items-center justify-center mb-2.5">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-white mb-1">
                  Somatic Alignment
                </h4>
                <p className="text-xs text-slate-300/80">
                  Respecting joint geometry and individual fascia over rigid dogma.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-[#140E26]/80 border border-purple-500/20 backdrop-blur-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-white mb-1">
                  Circadian Rituals
                </h4>
                <p className="text-xs text-slate-300/80">
                  Aligning light exposure, herbal teas, and metabolic rhythms.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-[#140E26]/80 border border-purple-500/20 backdrop-blur-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-400/30 text-purple-300 flex items-center justify-center mb-2.5">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-white mb-1">
                  Effortless Power
                </h4>
                <p className="text-xs text-slate-300/80">
                  Building calm resilience from deep transverse abdominal stability.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Minimalist Premium Email Capture Form (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-gradient-to-b from-[#1C1236]/90 via-[#140E26]/85 to-[#0B0914]/95 text-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-purple-500/25 backdrop-blur-2xl relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                  <Mail className="w-6 h-6" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-medium block mb-2">
                  The Weekly Sunday Journal
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3 leading-tight text-white">
                  Join my inner circle for weekly fitness tips.
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Every Sunday dawn, I send one curated 3-minute digest: a somatic postural fix, an anti-inflammatory breakfast recipe, and a nervous system reset practice.
                </p>

                {isSubscribed ? (
                  <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-400/40 text-center animate-in fade-in">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-white mb-1">
                      Welcome to the Inner Circle
                    </h4>
                    <p className="text-xs text-slate-300 mb-4">
                      Check your inbox at <span className="underline font-semibold text-purple-300">{email}</span> for your welcome flow!
                    </p>
                    
                    {/* Sample preview of this week's tip */}
                    <div className="text-left p-3.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs">
                      <p className="font-semibold text-purple-300 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                        Preview of Tip #42 (This Sunday):
                      </p>
                      <p className="text-slate-300 italic text-[11px]">
                        "The 2-minute psoas release to do right before your morning matcha to immediately dissolve thoracic stiffness."
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    {/* Focus Area selector pills */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-purple-300 font-bold mb-2">
                        Customize Your Focus:
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { id: 'all', label: 'All Topics' },
                          { id: 'flows', label: 'Morning Flows' },
                          { id: 'recipes', label: 'Plant Nutrition' },
                          { id: 'mindset', label: 'Breathwork & Calm' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setInterest(item.id as any)}
                            className={`px-3 py-2 rounded-xl text-left transition-colors cursor-pointer border ${
                              interest === item.id
                                ? 'bg-purple-600/30 border-purple-400 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                                : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dark Translucent Input with Violet Focus Rings */}
                    <div>
                      <label htmlFor="newsletter-email" className="block text-[11px] uppercase tracking-wider text-purple-300 font-bold mb-1">
                        Your Best Email
                      </label>
                      <div className="relative">
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-purple-500/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 backdrop-blur-md transition-all shadow-inner"
                        />
                      </div>
                      {errorMessage && (
                        <p className="text-xs text-rose-400 mt-1 font-medium">{errorMessage}</p>
                      )}
                    </div>

                    {/* India DPDP Act 2023 Consent Checkbox */}
                    <div className="p-3 rounded-xl bg-purple-950/25 border border-purple-500/20 flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="dpdp-consent-newsletter"
                        required
                        checked={hasConsent}
                        onChange={(e) => setHasConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-purple-500/40 bg-[#160F2C] text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                      <label htmlFor="dpdp-consent-newsletter" className="text-[11px] text-slate-300 leading-snug cursor-pointer">
                        I consent under India's <strong className="text-white">DPDP Act, 2023</strong> to receive weekly wellness letters. Unsubscribe anytime.
                      </label>
                    </div>

                    {/* Primary Button: Glassmorphic White/Silver with Violet Hover Glow */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Welcoming you...</span>
                      ) : (
                        <>
                          <span>Join My Inner Circle</span>
                          <Send className="w-3.5 h-3.5 ml-1" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[10px] text-slate-400">
                      Zero commercial spam. Unsubscribe anytime with one tap.
                    </p>
                  </form>
                )}

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
