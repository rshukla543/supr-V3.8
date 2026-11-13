import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramReel } from '../types';
import {
  X,
  ExternalLink,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { InstagramEmbed } from './InstagramEmbed';
import { resolveReelThumbnail } from '../lib/instagram';
import { Play, Sparkles } from 'lucide-react';

interface InstagramReelModalProps {
  reel: InstagramReel | null;
  reels?: InstagramReel[];
  onSelectReel?: (reel: InstagramReel) => void;
  onClose: () => void;
}

export const InstagramReelModal: React.FC<InstagramReelModalProps> = ({
  reel,
  reels = [],
  onSelectReel,
  onClose,
}) => {
  const [remountKey, setRemountKey] = useState(0);
  const [viewMode, setViewMode] = useState<'video' | 'embed'>(
    reel?.videoUrl ? 'video' : 'embed'
  );

  // Sync viewMode when reel changes
  useEffect(() => {
    if (reel?.videoUrl) {
      setViewMode('video');
    } else {
      setViewMode('embed');
    }
  }, [reel?.id, reel?.videoUrl]);

  // Determine index & navigation capability
  const currentIndex = reel && reels.length > 0 ? reels.findIndex((r) => r.id === reel.id) : -1;
  const hasMultiple = reels.length > 1;

  const handleNext = useCallback(() => {
    if (!hasMultiple || !onSelectReel) return;
    const nextIdx = (currentIndex + 1) % reels.length;
    onSelectReel(reels[nextIdx]);
  }, [currentIndex, hasMultiple, onSelectReel, reels]);

  const handlePrev = useCallback(() => {
    if (!hasMultiple || !onSelectReel) return;
    const prevIdx = (currentIndex - 1 + reels.length) % reels.length;
    onSelectReel(reels[prevIdx]);
  }, [currentIndex, hasMultiple, onSelectReel, reels]);

  // Touch Swipe Gesture Detection on Modal Backdrop
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe > 45px with dominant X movement
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation listener (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  if (!reel) return null;

  const nativeInstagramUrl =
    reel.reelUrl ||
    `https://instagram.com/${reel.creatorHandle || 'supriya_9508'}`;

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl select-none"
    >
      {/* Desktop Flank Navigation: Previous Reel */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-purple-600 text-white backdrop-blur-md border border-white/15 items-center justify-center transition-all shadow-xl hover:scale-105 cursor-pointer"
          title="Previous Reel (← Arrow Left)"
          aria-label="Previous Reel"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Reel Viewer Container */}
      <motion.div
        key={reel.id}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="relative w-full max-w-[500px] h-[92vh] max-h-[880px] rounded-[2rem] bg-[#0E0A1D] text-white overflow-hidden border border-purple-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between"
      >
        {/* Top Minimal Header */}
        <div className="shrink-0 z-40 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between bg-gradient-to-b from-[#140E2A] via-[#100B22] to-transparent border-b border-purple-500/15 pointer-events-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center text-white p-1.5 shadow-md shrink-0">
              <InstagramIcon className="w-full h-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold tracking-wider text-purple-200 uppercase leading-none truncate">
                {reel.poseName || 'Asana Reel'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">
                {hasMultiple && currentIndex >= 0
                  ? `Reel ${currentIndex + 1} of ${reels.length} • `
                  : ''}
                @{reel.creatorHandle || 'supriya_9508'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Mode Switcher if both video and embed URL available */}
            {reel.videoUrl && reel.reelUrl && (
              <div className="hidden sm:flex items-center rounded-full bg-black/40 p-0.5 border border-purple-500/20 text-[10px]">
                <button
                  type="button"
                  onClick={() => setViewMode('video')}
                  className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'video'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Play video directly in browser"
                >
                  Direct Video
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('embed')}
                  className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    viewMode === 'embed'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="View official Meta embed"
                >
                  IG Embed
                </button>
              </div>
            )}

            {/* Quick In-Modal Replay */}
            <button
              type="button"
              onClick={() => setRemountKey((k) => k + 1)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
              title="Replay / Reload Reel"
              aria-label="Replay Reel"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Direct Link to Open on Instagram */}
            {nativeInstagramUrl && (
              <a
                href={nativeInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 text-[10px] font-semibold transition-all backdrop-blur-md shadow-xs cursor-pointer"
                title="Open on official Instagram"
              >
                <span>IG</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white backdrop-blur-md transition-colors border border-white/10 cursor-pointer"
              aria-label="Close Reel Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Stage: Direct HTML5 Video with autoPlay OR Official Meta Embed */}
        <div className="relative flex-grow w-full h-full bg-[#080611] overflow-y-auto no-scrollbar flex items-center justify-center p-2 sm:p-4">
          {viewMode === 'video' && reel.videoUrl ? (
            <div className="w-full h-full max-w-[480px] flex flex-col items-center justify-center relative">
              <video
                key={`${reel.id}-${remountKey}`}
                src={reel.videoUrl}
                poster={resolveReelThumbnail(reel)}
                autoPlay
                playsInline
                controls
                loop
                className="w-full h-full object-contain max-h-[75vh] rounded-2xl bg-black border border-purple-500/30 shadow-2xl"
              />
            </div>
          ) : (
            <div className="w-full max-w-[480px] flex flex-col items-center justify-start my-auto">
              <InstagramEmbed key={`${reel.id}-${remountKey}`} url={reel.reelUrl} />
            </div>
          )}
        </div>

        {/* Mobile Swipe Guidance Footer (Visible if multiple reels exist) */}
        {hasMultiple && (
          <div className="shrink-0 px-4 py-2 border-t border-purple-500/10 bg-[#0B0818] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <span className="text-[10px] text-purple-300/80">
              Swipe or use Arrow Keys to Browse
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Desktop Flank Navigation: Next Reel */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-purple-600 text-white backdrop-blur-md border border-white/15 items-center justify-center transition-all shadow-xl hover:scale-105 cursor-pointer"
          title="Next Reel (→ Arrow Right)"
          aria-label="Next Reel"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};


