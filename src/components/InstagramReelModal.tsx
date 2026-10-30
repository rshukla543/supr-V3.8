import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InstagramReel } from '../types';
import { X, Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, Play, Music } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface InstagramReelModalProps {
  reel: InstagramReel | null;
  onClose: () => void;
}

export const InstagramReelModal: React.FC<InstagramReelModalProps> = ({
  reel,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [progress, setProgress] = useState(30);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      {/* Container with Framer Motion Scale In */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[92vh] rounded-[2.5rem] bg-[#0E0A1D] text-white overflow-hidden border border-purple-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between"
      >
        {/* Animated Background simulation for the reel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1236] via-[#120D22] to-[#07050E] z-0" />
        
        {/* Moving cosmic light in reel */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-72 h-72 rounded-full bg-purple-600 blur-3xl animate-pulse" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-20 p-5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white p-1">
              <InstagramIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-purple-200 uppercase">
              Reels
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-purple-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer"
              aria-label="Close Reel Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Canvas: Pose visual & Tap to Pause */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 flex-grow flex flex-col items-center justify-center cursor-pointer select-none px-6 text-center"
        >
          {/* Animated Yogi Silhouette in Reel */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 blur-xl opacity-35 absolute inset-0" />
            <div className="w-36 h-36 rounded-full bg-white/[0.04] border border-purple-500/20 flex items-center justify-center text-4xl font-serif text-slate-200 backdrop-blur-sm relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
              ॐ
            </div>
          </div>

          <div className="mt-4 px-3 py-1 rounded-full bg-black/50 border border-purple-500/20 text-xs font-medium text-purple-300">
            {reel.poseName}
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-20">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Right Interaction Rail (Native Instagram Style) */}
        <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-5">
          {/* Like */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isLiked
                  ? 'bg-purple-600 text-white scale-110 shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-semibold tracking-wide">
              {isLiked ? 'Liked' : reel.likesCount}
            </span>
          </button>

          {/* Comment */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold">{reel.commentsCount}</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold">{reel.sharesCount}</span>
          </div>

          {/* Bookmark / Save */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-purple-400 text-purple-400' : ''}`} />
          </button>
        </div>

        {/* Bottom Details Overlay (Handle, Caption, Audio) */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/85 to-transparent pr-18">
          {/* Creator Profile Row */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#0E0A1D] flex items-center justify-center text-xs font-serif font-bold text-white">
                S
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-wide">
                @{reel.creatorHandle}
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[9px] font-bold">
                ✓
              </span>
              <span className="text-[10px] text-purple-300 font-semibold">• Follow</span>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-slate-100 leading-snug line-clamp-3 mb-2 font-normal">
            {reel.caption}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {reel.tags.map((t) => (
              <span key={t} className="text-[10px] text-purple-300/80 font-medium">
                #{t}
              </span>
            ))}
          </div>

          {/* Audio track marquee */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-white/[0.06] backdrop-blur-md px-3 py-1.5 rounded-full w-fit border border-purple-500/20">
            <Music className="w-3 h-3 text-purple-400 animate-spin" />
            <span className="truncate max-w-[200px]">{reel.audioTrack}</span>
          </div>

          {/* Bottom Progress Bar */}
          <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
};
