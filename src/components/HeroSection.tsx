import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Heart, Flame } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroSectionProps {
  siteSettings: SiteSettings;
  onStartTraining: () => void;
  onWatchVideo: () => void;
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  siteSettings,
  onStartTraining,
  onWatchVideo,
  isLoading = false,
}) => {
  // Stagger container for word-by-word reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const headlineWords = (siteSettings.headline || "Find Your Balance. Elevate Your Lifestyle.").split(" ");

  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 md:pt-40 md:pb-24 flex items-center overflow-hidden z-10">
      
      {/* Subtle ambient background glow - Midnight Lotus violet */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-purple-600/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-indigo-600/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge - Midnight Lotus Theme */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>{siteSettings.heroBadge}</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            </motion.div>

            {/* Word-by-Word Staggered Animated Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold text-white tracking-tight leading-[1.12] mb-6 flex flex-wrap"
            >
              {headlineWords.map((word, i) => {
                const isAccent = word.toLowerCase().includes('lifestyle') || word.toLowerCase().includes('balance');
                return (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className={`inline-block mr-[0.24em] ${
                      isAccent
                        ? 'text-purple-300 italic font-normal'
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Sleek Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300/85 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              {siteSettings.subtext}
            </motion.p>

            {/* Dual CTA Buttons - Premium White/Silver Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              {/* Primary: Glassmorphic White/Silver with Subtle Violet Hover Glow */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartTraining}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
              >
                <span>{siteSettings.primaryCta || 'Start Training'}</span>
                <ArrowRight className="w-4 h-4 text-[#0B0914]" />
              </motion.button>

              {/* Secondary: Quiet Frosted Glass */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onWatchVideo}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/[0.04] border border-purple-400/20 text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>{siteSettings.secondaryCta || 'Watch Latest Video'}</span>
              </motion.button>
            </motion.div>

            {/* Social Proof Strip - Minimal & Clean */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="pt-6 border-t border-purple-500/15 w-full flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span><strong className="text-white">10,000+</strong> Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-400" />
                <span><strong className="text-white">120K+</strong> Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-indigo-400" />
                <span><strong className="text-white">Rishikesh</strong> Master Certified</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean Creator Portrait Card (Edge-to-Edge, NO Text Badges) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Ambient background glow */}
            <div className="absolute w-[105%] h-[105%] rounded-full bg-purple-600/[0.12] blur-3xl pointer-events-none" />

            {/* Portrait Frame Container with Subtle Float */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2.5rem] border border-purple-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden group bg-[#0F0B1E]"
            >
              {isLoading ? (
                /* Sleek shimmer skeleton while Supabase fetch completes */
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-[#0B0914] animate-pulse flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-purple-400/30 border-t-purple-400 animate-spin mb-4" />
                  <p className="text-xs text-purple-300/70 font-mono tracking-widest uppercase">Loading Portrait...</p>
                </div>
              ) : (
                /* Pure, clean, edge-to-edge corner-to-corner creator portrait with NO text overlay cards */
                <>
                  <img
                    src={
                      siteSettings.heroPortraitUrl ||
                      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85"
                    }
                    alt={siteSettings.name ? `${siteSettings.name} - Yoga Trainer & Lifestyle Creator` : "Supriya Bhavsar - Yoga Trainer & Lifestyle Creator"}
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle inner glass border ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-purple-400/25 rounded-[2.5rem] pointer-events-none" />
                </>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
