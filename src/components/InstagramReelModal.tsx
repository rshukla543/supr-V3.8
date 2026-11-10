import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramReel } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  VolumeX,
  Play,
  Music,
  ExternalLink,
  Sparkles,
  Share2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { InstagramEmbed } from './InstagramEmbed';

interface InstagramReelModalProps {
  reel: InstagramReel | null;
  onClose: () => void;
}

export const InstagramReelModal: React.FC<InstagramReelModalProps> = ({
  reel,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [likesCountNum, setLikesCountNum] = useState(48500);
  const [progress, setProgress] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reel) {
      const parsed = parseInt(
        reel.likesCount.replace(/[^0-9]/g, '') || '48500',
        10
      );
      setLikesCountNum(parsed);
      setIsLiked(false);
      setIsPlaying(true);
      setIsMuted(true);
      setProgress(0);
    }
  }, [reel]);

  // Handle Play/Pause for direct HTML5 video
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle Mute/Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Track video progress
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((current / dur) * 100);
  };

  // Handle Like Toggle
  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikesCountNum((prev) => prev + 1);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    } else {
      setIsLiked(false);
      setLikesCountNum((prev) => Math.max(0, prev - 1));
    }
  };

  // Handle Share Link
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = reel?.reelUrl || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const [remountKey, setRemountKey] = useState(0);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!reel) return null;

  const nativeInstagramUrl =
    reel.reelUrl ||
    `https://instagram.com/${reel.creatorHandle || 'supriya_9508'}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-xl animate-fade-in"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative w-full max-w-[500px] h-[92vh] max-h-[880px] rounded-[2rem] bg-[#0E0A1D] text-white overflow-hidden border border-purple-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between select-none"
      >
        {/* Top Floating Header with Actions */}
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
                @{reel.creatorHandle || 'supriya_9508'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
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

        {/* =========================================================================
            VIDEO STAGE: Instagram Player (Direct Meta Embed System)
           ========================================================================= */}
        <div className="relative flex-grow w-full h-full bg-[#080611] overflow-y-auto no-scrollbar flex items-start justify-center p-2 sm:p-4">
          <div className="w-full max-w-[480px] flex flex-col items-center justify-start my-auto">
            <InstagramEmbed key={`${reel.id}-${remountKey}`} url={reel.reelUrl} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

