import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

export const MindfulnessWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          setPhase((currentPhase) => {
            if (currentPhase === 'Inhale') return 'Hold';
            if (currentPhase === 'Hold') return 'Exhale';
            if (currentPhase === 'Exhale') return 'Rest';
            setCyclesCompleted((c) => c + 1);
            return 'Inhale';
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setSecondsLeft(4);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'Inhale':
        return 'Inhale smoothly through the nose, expanding your lower diaphragm...';
      case 'Hold':
        return 'Suspend gently with soft shoulders and an open heart...';
      case 'Exhale':
        return 'Exhale softly through parted lips, melting physical tension...';
      case 'Rest':
        return 'Rest in quiet stillness before your next inhalation...';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      id="mindful-pause"
      className="py-20 relative z-10 border-y border-purple-500/15 bg-gradient-to-b from-[#130E26]/70 via-[#0B0914]/80 to-[#130E26]/70 backdrop-blur-2xl"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
          <Wind className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive Somatic Pacer</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">
          Take a 60-Second Mindful Breath
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/80 max-w-lg mx-auto mb-8">
          Synchronize with Supriya's 4-4-4-4 Box Breathing cadence to downregulate your sympathetic nervous system in real-time.
        </p>

        {/* Breath circle visualization with Midnight Lotus aura */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center mb-6">
          {/* Animated pulsing outer halo */}
          <div
            className={`absolute inset-0 rounded-full border border-purple-500/30 transition-all duration-1000 ${
              isActive && (phase === 'Inhale' || phase === 'Hold')
                ? 'scale-115 bg-purple-600/15 shadow-[0_0_50px_rgba(168,85,247,0.3)]'
                : 'scale-90 bg-transparent'
            }`}
          />

          {/* Inner core circle */}
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl border ${
              isActive && phase === 'Inhale'
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white scale-105 border-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                : isActive && phase === 'Hold'
                ? 'bg-gradient-to-tr from-indigo-700 to-purple-800 text-white scale-105 border-indigo-300'
                : isActive && phase === 'Exhale'
                ? 'bg-gradient-to-tr from-purple-900 to-slate-900 text-slate-200 scale-95 border-purple-400'
                : 'bg-[#160F2B] text-white border-purple-500/20'
            }`}
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider">
              {isActive ? phase : 'Ready?'}
            </span>
            <span className="font-mono text-2xl font-light mt-1 text-purple-200">
              {isActive ? `${secondsLeft}s` : '4-4-4-4'}
            </span>
          </div>
        </div>

        {/* Phase instruction text */}
        <p className="text-sm font-medium text-slate-300 h-6 mb-6 transition-opacity">
          {isActive ? getPhaseInstruction() : 'Tap below to synchronize your breath with Supriya.'}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsActive(!isActive)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
          >
            {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span>{isActive ? 'Pause Flow' : 'Begin Breathwork'}</span>
          </motion.button>

          {isActive && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-3.5 rounded-full bg-white/[0.05] border border-purple-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset timer"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {cyclesCompleted > 0 && (
          <p className="text-xs text-purple-300 mt-4 font-mono">
            {cyclesCompleted} conscious cycles completed ✨
          </p>
        )}
      </div>
    </motion.section>
  );
};
