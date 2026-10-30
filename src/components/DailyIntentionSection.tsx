import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, Feather, CheckCircle2 } from 'lucide-react';
import { DailyIntention } from '../types';

interface IntentionQuote {
  quote: string;
  theme: string;
  sanskritWord: string;
  sanskritMeaning: string;
}

const DEFAULT_INTENTIONS: IntentionQuote[] = [
  {
    quote: "The breath is the bridge which connects life to consciousness, uniting the body and the mind in pure stillness.",
    theme: "Sthira Sukham Asanam (Steadiness and Ease)",
    sanskritWord: "Prana & Dharana",
    sanskritMeaning: "Life-force breath & steady focus",
  },
  {
    quote: "Stillness is not the absence of life. It is the gathering of your sacred power before moving forward.",
    theme: "Somatic Presence",
    sanskritWord: "Sthira",
    sanskritMeaning: "Steadiness & Grounding",
  },
  {
    quote: "You do not need to conquer your tension. Simply breathe into its edges and let gravity do the uncoiling.",
    theme: "Gentle Surrender",
    sanskritWord: "Sukha",
    sanskritMeaning: "Ease & Joy",
  },
  {
    quote: "The body keeps the rhythm of every unsaid truth. Unclench your jaw, soften your collarbones, and return home.",
    theme: "Nervous System Calibration",
    sanskritWord: "Pratyahara",
    sanskritMeaning: "Inward Senses",
  },
  {
    quote: "Allow your practice to be an offering, not an audition. You are already whole as you arrive on the mat.",
    theme: "Radical Acceptance",
    sanskritWord: "Santosha",
    sanskritMeaning: "Contentment",
  },
];

interface DailyIntentionSectionProps {
  intention?: DailyIntention;
}

export const DailyIntentionSection: React.FC<DailyIntentionSectionProps> = ({ intention }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const HOLD_DURATION_MS = 3000; // Exactly 3.0 seconds of continuous hold to reveal

  // If dynamic intention is passed from Supabase, inject it as the first quote
  const intentionList: IntentionQuote[] = intention && intention.quoteText ? [
    {
      quote: intention.quoteText,
      theme: intention.theme || "Somatic Alignment",
      sanskritWord: intention.sanskritWord || "Prana",
      sanskritMeaning: intention.sanskritMeaning || "Life-force vitality",
    },
    ...DEFAULT_INTENTIONS,
  ] : DEFAULT_INTENTIONS;

  const activeQuote = intentionList[quoteIndex % intentionList.length];

  // Animation frame loop for buttery-smooth liquid fill progress
  const updateProgress = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);

    setProgress(newProgress);

    if (newProgress < 100) {
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      // Completed hold!
      setIsHolding(false);
      setIsRevealed(true);
      startTimeRef.current = null;
    }
  };

  const handleStartHold = () => {
    if (isRevealed) return;
    setIsHolding(true);
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(updateProgress);
  };

  const handleEndHold = () => {
    if (isRevealed) return;
    setIsHolding(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    startTimeRef.current = null;
    // Drain progress smoothly back to 0
    setProgress(0);
  };

  const handleResetOrNext = () => {
    setIsRevealed(false);
    setProgress(0);
    setQuoteIndex((prev) => (prev + 1) % intentionList.length);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section className="py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Heavy Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="relative rounded-[2.5rem] bg-gradient-to-b from-[#181030]/90 via-[#120C24]/90 to-[#0B0914]/95 border border-purple-500/25 p-8 sm:p-12 md:p-14 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden text-center"
        >
          {/* Subtle ambient violet backlights */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/[0.12] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/[0.10] rounded-full blur-3xl pointer-events-none" />

          {/* Section Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-md">
            <Feather className="w-3.5 h-3.5 text-purple-400" />
            <span>Sacred Pause & Mindful Moment</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            Daily Intention
          </h2>
          <p className="text-sm sm:text-base text-slate-300/80 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
            Take a slow deep breath. Press and hold below to calibrate your somatic frequency and receive today&apos;s guided intention.
          </p>

          <AnimatePresence mode="wait">
            {!isRevealed ? (
              /* Liquid Fill Hold-To-Unlock Stage */
              <motion.div
                key="hold-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-4"
              >
                {/* Hold Button Container */}
                <div
                  onMouseDown={handleStartHold}
                  onMouseUp={handleEndHold}
                  onMouseLeave={handleEndHold}
                  onTouchStart={handleStartHold}
                  onTouchEnd={handleEndHold}
                  className="relative group cursor-pointer select-none touch-none"
                >
                  {/* Outer Pulsing Aura */}
                  <div
                    className={`absolute -inset-2 rounded-full transition-all duration-300 blur-md ${
                      isHolding
                        ? 'bg-gradient-to-r from-purple-500/50 via-violet-500/50 to-indigo-500/50 opacity-100 scale-105'
                        : 'bg-purple-500/10 opacity-40 group-hover:opacity-75'
                    }`}
                  />

                  {/* Main Pill / Liquid Well */}
                  <div className="relative w-64 sm:w-72 h-16 sm:h-18 rounded-full bg-[#0D081B] border-2 border-purple-400/30 overflow-hidden flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    
                    {/* Liquid Fill Progress Background */}
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 transition-all ease-linear"
                      style={{
                        width: `${progress}%`,
                      }}
                    >
                      {/* Fluid wave crest effect on right edge */}
                      {progress > 0 && progress < 100 && (
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 blur-xs" />
                      )}
                    </div>

                    {/* Centered Button Content */}
                    <div className="relative z-10 flex items-center gap-2.5 text-white font-medium text-sm sm:text-base tracking-wide">
                      <div className={`w-3 h-3 rounded-full transition-all ${isHolding ? 'bg-white animate-ping' : 'bg-purple-400'}`} />
                      <span className="drop-shadow-md">
                        {isHolding ? `Charging... ${Math.round(progress)}%` : 'Press & Hold to Awaken'}
                      </span>
                      <Sparkles className={`w-4 h-4 transition-transform duration-300 ${isHolding ? 'scale-125 text-white' : 'text-purple-300'}`} />
                    </div>
                  </div>
                </div>

                {/* Progress bar visual hint */}
                <div className="mt-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span>Hold for 3.0 seconds</span>
                  <span>•</span>
                  <span className={isHolding ? 'text-purple-300 font-semibold' : 'text-slate-400'}>
                    {isHolding ? 'Infusing breath...' : 'Touch and hold continuously'}
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Revealed Intention Stage */
              <motion.div
                key="revealed-stage"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-col items-center py-4"
              >
                {/* Sanskrit Word & Theme Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-medium mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>{activeQuote.sanskritWord} ({activeQuote.sanskritMeaning})</span>
                  <span>•</span>
                  <span className="text-white font-semibold">{activeQuote.theme}</span>
                </div>

                {/* Big Quote */}
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal leading-relaxed max-w-2xl mx-auto mb-6 italic drop-shadow-sm">
                  &ldquo;{activeQuote.quote}&rdquo;
                </blockquote>

                {/* Signature Tag */}
                <div className="flex items-center justify-center gap-2 mb-8 text-xs sm:text-sm text-purple-300/90 font-mono">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-[10px] font-serif font-bold text-white">
                    ॐ
                  </div>
                  <span>Supriya • Conscious Movement Sanctuary</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleResetOrNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/[0.05] border border-purple-500/25 text-slate-200 hover:text-white hover:bg-purple-500/20 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                    <span>Receive Another Intention</span>
                  </button>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#0B0914]" />
                    <span>Carry Into Your Practice</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
