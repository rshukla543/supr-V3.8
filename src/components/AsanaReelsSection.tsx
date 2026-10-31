import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramReel } from '../types';
import {
  Play,
  Heart,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Flame,
  Music,
} from 'lucide-react';
import { InstagramIcon } from './Icons';

interface AsanaReelsSectionProps {
  reels: InstagramReel[];
  onSelectReel: (reel: InstagramReel) => void;
}

export const AsanaReelsSection: React.FC<AsanaReelsSectionProps> = ({
  reels,
  onSelectReel,
}) => {
  const [localLiked, setLocalLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const handleLikeClick = (e: React.MouseEvent, reel: InstagramReel) => {
    e.stopPropagation();
    const isCurrentlyLiked = !!localLiked[reel.id];
    const baseCount = parseInt(
      reel.likesCount.replace(/[^0-9]/g, '') || '45000',
      10
    );
    const currentCount = likeCounts[reel.id] ?? baseCount;

    setLocalLiked((prev) => ({
      ...prev,
      [reel.id]: !isCurrentlyLiked,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [reel.id]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1,
    }));
  };

  return (
    <section id="asana-reels" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-xs">
            <InstagramIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Section C • Bite-Sized Micro Drills</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Bite-Sized Asana Reels & Drills
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            Instant postural corrections, nervous system vagus nerve hacks, and 60-second morning mobility flows that play directly in your browser.
          </p>

          {/* Direct Instagram Link */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://instagram.com/supriya_9508"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-200 text-xs font-medium hover:text-white hover:bg-purple-900/50 transition-all shadow-sm"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@supriya_9508 • 85K Followers on Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </motion.div>

        {/* 4 Vertical Reels Grid (4 Columns on Desktop, 2 on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {reels.slice(0, 4).map((reel, idx) => {
            const isLiked = !!localLiked[reel.id];
            const baseCount = parseInt(
              reel.likesCount.replace(/[^0-9]/g, '') || '45000',
              10
            );
            const currentLikes = likeCounts[reel.id] ?? baseCount;
            const displayLikes = (currentLikes / 1000).toFixed(1) + 'K';

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelectReel(reel)}
                className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-[#120D24] border border-purple-500/20 hover:border-purple-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] transition-all cursor-pointer flex flex-col justify-between p-4"
              >
                {/* Background Poster Image */}
                {reel.thumbnailUrl ? (
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.poseName}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-80`}
                  />
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

                {/* Top Badge: Duration & Pose Name */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/20 text-[10px] font-semibold text-purple-200">
                    {reel.duration}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleLikeClick(e, reel)}
                    className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Like reel"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-white/80'
                      }`}
                    />
                  </button>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/25">
                  <div className="w-13 h-13 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B0914] shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Card Overlay: Pose title, caption snippet, live likes */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-900/60 backdrop-blur-md border border-purple-400/30 text-[10px] font-semibold text-purple-200 mb-1.5 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-purple-300" />
                    <span className="truncate max-w-[140px]">{reel.poseName}</span>
                  </div>

                  <p className="text-xs text-white leading-snug line-clamp-2 font-medium mb-2 drop-shadow-sm">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 font-mono">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>{displayLikes}</span>
                    </span>

                    <span className="flex items-center gap-1 text-[10px] text-purple-300/80">
                      <Music className="w-2.5 h-2.5" />
                      <span className="truncate max-w-[80px]">Audio</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
