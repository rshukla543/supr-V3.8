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
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { resolveReelStream } from '../lib/videoParser';
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

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        if (videoRef.current) {
          e.preventDefault();
          togglePlay();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!reel) return null;

  // Resolve accurate media source without fake YouTube fallbacks
  const resolved = resolveReelStream(reel.videoUrl, reel.reelUrl);

  const nativeInstagramUrl =
    reel.reelUrl ||
    `https://instagram.com/${reel.creatorHandle || 'supriya_9508'}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="relative w-full max-w-[390px] sm:max-w-[440px] h-[90vh] max-h-[840px] rounded-[2.5rem] bg-[#0E0A1D] text-white overflow-hidden border border-purple-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between select-none"
      >
        {/* Top Floating Header with Actions */}
        <div className="absolute top-0 inset-x-0 z-40 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center text-white p-1.5 shadow-md">
              <InstagramIcon className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold tracking-wider text-purple-200 uppercase leading-none">
                Asana Reel
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                @{reel.creatorHandle || 'supriya_9508'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Link to Open on Instagram */}
            {nativeInstagramUrl && (
              <a
                href={nativeInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 text-[10px] font-semibold transition-all backdrop-blur-md shadow-xs cursor-pointer"
                title="Open on official Instagram app"
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
            VIDEO STAGE: Exclusively Instagram Player (Direct Meta Embed System)
           ========================================================================= */}
        <div className="relative flex-grow w-full h-full bg-[#0B0914] overflow-hidden flex items-center justify-center pt-16 pb-4 px-3">
          <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto no-scrollbar">
            <InstagramEmbed
              url={reel.reelUrl || 'https://www.instagram.com/reel/C8qLd95M6P1/'}
              caption={reel.caption}
              creatorHandle={reel.creatorHandle}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
