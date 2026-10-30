import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Heart, Flame, Wand2, Compass } from 'lucide-react';
import { SiteSettings } from '../types';
import {
  AURA_THEMES,
  AuraThemeId,
  getActiveAuraTheme,
  setActiveAuraTheme,
  subscribeToAuraChanges,
  AuraTheme,
} from '../lib/auraEngine';
import { harmonizeAuraWithAI, AIHarmonyResult } from '../lib/geminiAura';

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
  const [activeTheme, setActiveTheme] = useState<AuraTheme>(getActiveAuraTheme());
  const [isAiHarmonizing, setIsAiHarmonizing] = useState(false);
  const [harmonyNote, setHarmonyNote] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToAuraChanges((theme) => {
      setActiveTheme(theme);
    });
    return () => unsub();
  }, []);

  const handleSelectTheme = (themeId: AuraThemeId) => {
    setActiveAuraTheme(themeId);
    setHarmonyNote(null);
  };

  const handleAIHarmonize = async () => {
    setIsAiHarmonizing(true);
    try {
      const result: AIHarmonyResult = await harmonizeAuraWithAI();
      setHarmonyNote(`${result.chakraNote}: "${result.poeticMantra}"`);
    } finally {
      setIsAiHarmonizing(false);
    }
  };

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

  const headlineWords = (siteSettings.headline || 'Find Your Balance. Elevate Your Lifestyle.').split(' ');

  return (
    <section className="relative min-h-[95vh] pt-32 pb-16 md:pt-40 md:pb-24 flex items-center overflow-hidden z-10">
      {/* Dynamic Ambient Background Glows responding to active aura */}
      <motion.div
        animate={{
          backgroundColor: activeTheme.accentGlow,
        }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none opacity-40"
      />
      <motion.div
        animate={{
          backgroundColor: activeTheme.primaryColor,
        }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full blur-[160px] pointer-events-none opacity-25"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Copy, AI Atmosphere Switcher & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: activeTheme.primaryColor }}
              />
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
                      isAccent ? 'italic font-normal' : 'text-white'
                    }`}
                    style={isAccent ? { color: activeTheme.primaryColor } : {}}
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
              className="text-base sm:text-lg text-slate-300/85 leading-relaxed max-w-2xl mb-6 font-normal"
            >
              {siteSettings.subtext}
            </motion.p>

            {/* Interactive Artistic AI Atmosphere & Sacred Aura Selector */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#120D24]/70 border border-purple-500/20 backdrop-blur-xl w-full max-w-xl"
            >
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sacred Atmosphere Mode</span>
                </div>
                <button
                  type="button"
                  onClick={handleAIHarmonize}
                  disabled={isAiHarmonizing}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-purple-200 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Harmonize atmosphere using intelligent circadian alignment"
                >
                  <Wand2 className={`w-3 h-3 text-purple-300 ${isAiHarmonizing ? 'animate-spin' : ''}`} />
                  <span>{isAiHarmonizing ? 'Harmonizing...' : '✨ AI Harmonize Aura'}</span>
                </button>
              </div>

              {/* Theme Pill Switches */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(AURA_THEMES) as AuraThemeId[]).map((themeKey) => {
                  const t = AURA_THEMES[themeKey];
                  const isSelected = activeTheme.id === themeKey;
                  return (
                    <button
                      key={themeKey}
                      type="button"
                      onClick={() => handleSelectTheme(themeKey)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 border text-center ${
                        isSelected
                          ? 'bg-white/10 text-white font-semibold border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-black/20 text-slate-400 hover:text-white border-white/5 hover:border-white/15'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <span className="truncate">{t.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Real-time Mantra & Attunement Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={harmonyNote || activeTheme.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono"
                >
                  <span className="truncate text-purple-300/90">
                    {harmonyNote || `${activeTheme.tagline} • ${activeTheme.mantra}`}
                  </span>
                  <span className="text-[10px] opacity-75 shrink-0 pl-2">
                    {activeTheme.element}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartTraining}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
              >
                <span>{siteSettings.primaryCta || 'Start Training'}</span>
                <ArrowRight className="w-4 h-4 text-[#0B0914]" />
              </motion.button>

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

            {/* Social Proof Strip */}
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

          {/* Right Column: Grand Artistic Creator Portrait with Sacred Geometry Aura Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center py-6"
          >
            {/* Grand Rotating Sacred Celestial Torus / Halo Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              className="absolute -inset-10 sm:-inset-14 rounded-full border border-dashed pointer-events-none opacity-30"
              style={{ borderColor: activeTheme.primaryColor }}
            />

            {/* Second Counter-rotating Aura Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
              className="absolute -inset-6 sm:-inset-8 rounded-full border border-dotted pointer-events-none opacity-25"
              style={{ borderColor: activeTheme.secondaryColor }}
            />

            {/* Ambient Breathing Glow */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute w-[115%] h-[115%] rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: activeTheme.accentGlow }}
            />

            {/* Grand Portrait Frame Container with Subtle Float */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2.5rem] border border-purple-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden group bg-[#0F0B1E]"
            >
              {isLoading ? (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-[#0B0914] animate-pulse flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-purple-400/30 border-t-purple-400 animate-spin mb-4" />
                  <p className="text-xs text-purple-300/70 font-mono tracking-widest uppercase">
                    Loading Portrait...
                  </p>
                </div>
              ) : (
                <>
                  <img
                    src={
                      siteSettings.heroPortraitUrl ||
                      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85'
                    }
                    alt={
                      siteSettings.name
                        ? `${siteSettings.name} - Yoga Trainer & Lifestyle Creator`
                        : 'Supriya Bhavsar - Yoga Trainer & Lifestyle Creator'
                    }
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
