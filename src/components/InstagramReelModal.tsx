import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramReel } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [likesCountNum, setLikesCountNum] = useState(48500);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControlsNotice, setShowControlsNotice] = useState(false);

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

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    setShowControlsNotice(true);
    setTimeout(() => setShowControlsNotice(false), 700);
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
    setCurrentTime(current);
    setDuration(dur);
    setProgress((current / dur) * 100);
  };

  // Handle Like
  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikesCountNum((prev) => prev + 1);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 1000);
    } else {
      setIsLiked(false);
      setLikesCountNum((prev) => Math.max(0, prev - 1));
    }
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(videoRef.current.muted);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, onClose]);

  if (!reel) return null;

  // Real, direct, high-quality video fallback stream
  const directVideoSource =
    reel.videoUrl ||
    'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-the-beach-at-sunset-40763-large.mp4';

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
        className="relative w-full max-w-[380px] sm:max-w-[420px] h-[88vh] max-h-[820px] rounded-[2.5rem] bg-[#0E0A1D] text-white overflow-hidden border border-purple-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between select-none"
      >
        {/* Top Floating Header with Status & Close Button */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center text-white p-1.5 shadow-md">
              <InstagramIcon className="w-full h-full" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-purple-200 uppercase">
              Asana Reel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors border border-white/10"
              aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
              title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-purple-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-green-400" />
              )}
            </button>

            <a
              href={nativeInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 text-[11px] font-semibold transition-all backdrop-blur-md shadow-xs"
              title="Open and engage on official Instagram app"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white backdrop-blur-md transition-colors border border-white/10 cursor-pointer"
              aria-label="Close Reel Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Stage: Direct HTML5 Video Player */}
        <div
          onClick={togglePlay}
          className="relative flex-grow w-full h-full bg-black flex items-center justify-center overflow-hidden cursor-pointer"
        >
          <video
            ref={videoRef}
            src={directVideoSource}
            poster={reel.thumbnailUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

          {/* Quick Play/Pause Splash Indicator */}
          <AnimatePresence>
            {showControlsNotice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                  {isPlaying ? (
                    <Play className="w-8 h-8 fill-white ml-1" />
                  ) : (
                    <Pause className="w-8 h-8 fill-white" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paused Permanent Watermark */}
          {!isPlaying && !showControlsNotice && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-20">
              <div className="w-16 h-16 rounded-full bg-purple-600/60 backdrop-blur-md border border-purple-300/40 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Sound Muted Notification Pill */}
          {isMuted && (
            <div
              onClick={toggleMute}
              className="absolute top-20 right-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-purple-400/30 text-[10px] text-purple-200 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-black/90 transition-colors shadow-lg"
            >
              <VolumeX className="w-3.5 h-3.5 text-purple-400" />
              <span>Tap to unmute sound</span>
            </div>
          )}

          {/* Floating Heart Burst Animation on Like */}
          <AnimatePresence>
            {showHeartBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.5, y: -50 }}
                exit={{ opacity: 0, scale: 2, y: -90 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute z-30 pointer-events-none flex flex-col items-center"
              >
                <Heart className="w-20 h-20 fill-rose-500 text-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]" />
                <span className="text-xs font-bold text-white mt-1 bg-black/70 px-2.5 py-0.5 rounded-full font-mono">
                  +1 Liked!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Action Rail (Instagram Style) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 sm:right-4 bottom-24 z-30 flex flex-col items-center gap-4.5"
          >
            {/* Like Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Like this reel"
            >
              <div
                className={`p-3 rounded-full backdrop-blur-md transition-all ${
                  isLiked
                    ? 'bg-rose-600 text-white scale-110 shadow-[0_0_20px_rgba(244,63,94,0.7)]'
                    : 'bg-black/60 text-white hover:bg-black/80 hover:scale-105 border border-white/15'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[11px] font-semibold tracking-wide drop-shadow-md">
                {isLiked ? 'Liked' : `${(likesCountNum / 1000).toFixed(1)}K`}
              </span>
            </button>

            {/* Comment */}
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold drop-shadow-md">
                {reel.commentsCount}
              </span>
            </div>

            {/* Share */}
            <a
              href={nativeInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-white hover:text-purple-300 transition-colors"
              title="Open and share on Instagram"
            >
              <div className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold drop-shadow-md">
                {reel.sharesCount}
              </span>
            </a>

            {/* Bookmark / Save */}
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/15 cursor-pointer"
              title="Bookmark reel"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isSaved ? 'fill-purple-400 text-purple-400' : ''
                }`}
              />
            </button>
          </div>

          {/* Bottom Details Overlay (Handle, Caption, Audio, Tag) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 inset-x-0 z-20 p-5 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent pr-16"
          >
            {/* Creator Row */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 p-0.5 shadow-md">
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
                <a
                  href={nativeInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-purple-300 font-semibold hover:underline ml-1"
                >
                  • Follow
                </a>
              </div>
            </div>

            {/* Pose Title Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/30 text-[11px] font-semibold text-purple-200 mb-2 shadow-xs">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{reel.poseName}</span>
            </div>

            {/* Caption */}
            <p className="text-xs text-slate-100 leading-snug line-clamp-2 mb-2 font-light">
              {reel.caption}
            </p>

            {/* Audio track & Ticker */}
            <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-white/[0.08] backdrop-blur-md px-3 py-1 rounded-full w-fit border border-purple-500/20">
              <Music className="w-3 h-3 text-purple-400 shrink-0" />
              <span className="truncate max-w-[200px]">{reel.audioTrack}</span>
            </div>
          </div>

          {/* Thin Video Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-40">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
