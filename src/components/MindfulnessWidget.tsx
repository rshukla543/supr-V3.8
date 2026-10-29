import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Sparkles } from 'lucide-react';

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
          // Transition phase
          setPhase((currentPhase) => {
            if (currentPhase === 'Inhale') return 'Hold';
            if (currentPhase === 'Hold') return 'Exhale';
            if (currentPhase === 'Exhale') return 'Rest';
            // Rest finished
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
        return 'Inhale slowly through the nose, expanding your belly...';
      case 'Hold':
        return 'Hold gently at the top with relaxed shoulders...';
      case 'Exhale':
        return 'Exhale softly through parted lips, releasing tension...';
      case 'Rest':
        return 'Rest in quiet stillness before the next breath...';
    }
  };

  return (
    <section id="mindful-pause" className="py-16 bg-[#F4EFE6]/70 border-y border-[#EADECE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2C483A] text-xs font-semibold tracking-wider uppercase mb-3">
          <Wind className="w-3.5 h-3.5 text-[#4D705E]" />
          <span>Interactive Somatic Pacer</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#182C22] mb-2">
          Take a 60-Second Mindful Breath
        </h3>
        <p className="text-xs sm:text-sm text-[#665440] max-w-lg mx-auto mb-8">
          Follow this 4-4-4-4 Box Breathing cadence designed by Supriya to instantly soothe an overactive sympathetic nervous system.
        </p>

        {/* Breath circle visualization */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center mb-6">
          {/* Animated pulsing outer halo */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-[#8EA89D]/40 transition-all duration-1000 ${
              isActive && (phase === 'Inhale' || phase === 'Hold')
                ? 'scale-110 bg-[#CBD9D0]/30'
                : 'scale-90 bg-transparent'
            }`}
          />

          {/* Inner core circle */}
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-lg ${
              isActive && phase === 'Inhale'
                ? 'bg-[#4D705E] text-white scale-105'
                : isActive && phase === 'Hold'
                ? 'bg-[#385746] text-white scale-105'
                : isActive && phase === 'Exhale'
                ? 'bg-[#8EA89D] text-[#182C22] scale-95'
                : 'bg-[#182C22] text-[#FAF8F5]'
            }`}
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider">
              {isActive ? phase : 'Ready?'}
            </span>
            <span className="font-mono text-2xl font-light mt-1">
              {isActive ? `${secondsLeft}s` : '4-4-4-4'}
            </span>
          </div>
        </div>

        {/* Phase instruction text */}
        <p className="text-sm font-medium text-[#2C483A] h-6 mb-6 transition-opacity">
          {isActive ? getPhaseInstruction() : 'Click start to synchronize your breath with Supriya.'}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-colors cursor-pointer shadow-xs"
          >
            {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span>{isActive ? 'Pause Flow' : 'Begin Breathwork'}</span>
          </button>

          {isActive && (
            <button
              onClick={handleReset}
              className="p-3 rounded-full bg-[#FAF8F5] border border-[#CBD9D0] text-[#665440] hover:text-[#182C22] transition-colors cursor-pointer"
              title="Reset timer"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {cyclesCompleted > 0 && (
          <p className="text-xs text-[#9E8568] mt-4 font-mono">
            {cyclesCompleted} conscious cycles completed ✨
          </p>
        )}
      </div>
    </section>
  );
};
