import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoContent, InstagramReel, ContentCategory } from '../types';
import { VIDEO_DATA, INSTAGRAM_REELS } from '../data/mockData';
import { Play, Eye, Clock, Sparkles, ExternalLink, Heart, MessageCircle, Film, ArrowRight } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';
import { getYouTubeThumbnailUrl, parseInstagramEmbedUrl } from '../lib/videoParser';

interface ContentVaultSectionProps {
  videos?: VideoContent[];
  reels?: InstagramReel[];
  onSelectVideo: (video: VideoContent) => void;
  onSelectReel: (reel: InstagramReel) => void;
}

export const ContentVaultSection: React.FC<ContentVaultSectionProps> = ({
  videos = VIDEO_DATA,
  reels = INSTAGRAM_REELS,
  onSelectVideo,
  onSelectReel,
}) => {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('Yoga (YouTube)');
  const [localLikedReels, setLocalLikedReels] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const categories: ContentCategory[] = [
    'Yoga (YouTube)',
    'Lifestyle Vlogs',
    'Reels (Instagram)',
  ];

  const currentVideos = videos && videos.length > 0 ? videos : VIDEO_DATA;
  const currentReels = reels && reels.length > 0 ? reels : INSTAGRAM_REELS;

  const filteredVideos = currentVideos.filter(
    (video) => video.category === activeCategory
  );

  const handleLikeReel = (e: React.MouseEvent, reel: InstagramReel) => {
    e.stopPropagation();
    const isCurrentlyLiked = !!localLikedReels[reel.id];
    const baseCount = parseInt(reel.likesCount.replace(/[^0-9]/g, '') || '45000', 10);
    const currentCount = likeCounts[reel.id] ?? baseCount;

    setLocalLikedReels((prev) => ({
      ...prev,
      [reel.id]: !isCurrentlyLiked,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [reel.id]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1,
    }));
  };

  return (
    <section id="content-vault" className="py-20 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Multi-Platform Stream</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            The Content Vault
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            Immersion into full-length practices on YouTube, unscripted Himalayan lifestyle vlogs, and bite-sized somatic adjustments on Instagram Reels.
          </p>

          {/* Centered Social Platform Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://youtube.com/@supriyabhavsar_yoga"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-purple-500/20 hover:border-purple-400 text-slate-200 text-xs font-semibold hover:text-white transition-all shadow-xs backdrop-blur-md"
            >
              <YoutubeIcon className="w-4 h-4 text-purple-400" />
              <span>120K YouTube</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://instagram.com/supriya_9508"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-purple-500/20 hover:border-purple-300 text-slate-200 text-xs font-semibold hover:text-white transition-all shadow-xs backdrop-blur-md"
            >
              <InstagramIcon className="w-4 h-4 text-purple-300" />
              <span>85K Reels</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </motion.div>

        {/* Smooth Centered Interactive Filter Tabs */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto no-scrollbar pb-2">
          <div className="inline-flex p-1.5 rounded-full bg-[#130E24]/80 border border-purple-500/20 backdrop-blur-xl shadow-inner gap-1 relative">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {/* Sliding Background Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    {cat === 'Yoga (YouTube)' && <YoutubeIcon className="w-3.5 h-3.5 text-white" />}
                    {cat === 'Lifestyle Vlogs' && <Film className="w-3.5 h-3.5 text-purple-200" />}
                    {cat === 'Reels (Instagram)' && <InstagramIcon className="w-3.5 h-3.5 text-purple-200" />}
                    <span>{cat}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeCategory === 'Reels (Instagram)' ? (
            
            /* Instagram Integration: Clean Masonry Layout for Reels */
            <motion.div
              key="reels-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {currentReels.map((reel, index) => {
                const isLiked = !!localLikedReels[reel.id];
                const displayLikes = likeCounts[reel.id]
                  ? `${(likeCounts[reel.id] / 1000).toFixed(1)}K`
                  : reel.likesCount;

                return (
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectReel(reel)}
                    className="break-inside-avoid group relative cursor-pointer rounded-3xl overflow-hidden bg-[#140E26] border border-purple-500/20 hover:border-purple-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.22)] transition-all duration-300 flex flex-col justify-between p-5"
                    style={{ minHeight: index % 2 === 0 ? '480px' : '420px' }}
                  >
                    {/* Background dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1C1234] via-[#120D22] to-[#0B0914] opacity-95 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />

                    {/* Top Instagram Reel Native Header */}
                    <div className="relative z-10 flex items-center justify-between pb-3">
                      <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white border border-purple-500/20">
                        <InstagramIcon className="w-3 h-3 text-purple-300" />
                        <span className="font-semibold tracking-wide">Instagram Reel</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-200 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-purple-500/20">
                        {reel.viewsCount}
                      </span>
                    </div>

                    {/* Center Visual Art & Play Pulse */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-6">
                      <div className="relative flex items-center justify-center mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-purple-400/50 scale-100 group-hover:scale-130 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
                      </div>
                      <span className="text-xs font-semibold text-purple-200 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/20">
                        {reel.poseName}
                      </span>
                    </div>

                    {/* Bottom Instagram Reel Metadata Overlay */}
                    <div className="relative z-10 bg-gradient-to-t from-black via-black/90 to-transparent -mx-5 -mb-5 p-5 pt-8 rounded-b-3xl">
                      {/* Creator handle */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-0.5 shrink-0">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-serif font-bold text-white">
                              S
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white">
                            @{reel.creatorHandle}
                          </span>
                        </div>

                        {/* Open native IG link */}
                        {reel.reelUrl && (
                          <a
                            href={reel.reelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-full bg-white/10 hover:bg-purple-600 text-white text-[10px] flex items-center gap-1 px-2 transition-colors"
                            title="Open directly on Instagram"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>

                      {/* Caption snippet */}
                      <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed mb-3.5 font-normal">
                        {reel.caption}
                      </p>

                      {/* Metrics bar with interactive like button */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2.5 border-t border-purple-500/20">
                        <button
                          type="button"
                          onClick={(e) => handleLikeReel(e, reel)}
                          className={`flex items-center gap-1.5 font-medium transition-transform active:scale-125 cursor-pointer ${
                            isLiked ? 'text-rose-400' : 'text-purple-300 hover:text-white'
                          }`}
                          title="Like this reel"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'fill-purple-400/70'}`} />
                          <span>{displayLikes}</span>
                        </button>
                        <div className="flex items-center gap-1.5 text-indigo-300">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{reel.commentsCount}</span>
                        </div>
                        <span className="text-slate-300 font-mono text-[10px]">{reel.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          ) : (

            /* YouTube Integration: Uniform CSS Grid of Sleek Glassmorphic Cards */
            <motion.div
              key="youtube-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectVideo(video)}
                  className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden bg-[#140E26]/85 backdrop-blur-2xl border border-purple-500/20 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.2)] transition-all duration-300"
                >
                  {/* 16:9 YouTube Player Simulation */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0A0714]">
                    {/* Thumbnail: Custom Uploaded Thumbnail, Auto YouTube Thumbnail, or Dark Gradient Artwork */}
                    {video.customThumbnailUrl ? (
                      <img
                        src={video.customThumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : getYouTubeThumbnailUrl(video.videoUrl) ? (
                      <img
                        src={getYouTubeThumbnailUrl(video.videoUrl)!}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1E1238] via-[#110B22] to-black flex items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-purple-400/20 flex items-center justify-center text-3xl font-serif text-purple-200">
                          ॐ
                        </div>
                      </div>
                    )}

                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* YouTube Brand Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-purple-500/25 text-[11px] font-semibold text-white">
                      <YoutubeIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span>{video.category}</span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-[11px] font-mono text-slate-200 border border-white/10">
                      <Clock className="w-3 h-3 text-purple-400" />
                      <span>{video.duration}</span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:scale-115 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#140E26] to-[#0E0A1D]">
                    <div>
                      {/* Meta stats: views count */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                        <div className="flex items-center gap-1.5 text-purple-300/90 font-mono">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{video.views}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">4K Masterclass</span>
                      </div>

                      {/* Video Title */}
                      <h4 className="font-serif text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug mb-2">
                        {video.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed mb-4 font-normal">
                        {video.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs font-semibold text-purple-300 group-hover:text-white transition-colors">
                      <span>Stream Practice</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
