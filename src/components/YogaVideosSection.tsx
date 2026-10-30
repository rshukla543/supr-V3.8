import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoContent } from '../types';
import { Play, Clock, Eye, Sparkles, ChevronDown } from 'lucide-react';
import { YoutubeIcon } from './Icons';
import { getYouTubeThumbnailUrl } from '../lib/videoParser';

interface YogaVideosSectionProps {
  videos: VideoContent[];
  onSelectVideo: (video: VideoContent) => void;
}

export const YogaVideosSection: React.FC<YogaVideosSectionProps> = ({
  videos,
  onSelectVideo,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter only Yoga (YouTube) videos
  const yogaVideos = useMemo(() => {
    return videos.filter((v) => v.category === 'Yoga (YouTube)');
  }, [videos]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    yogaVideos.forEach((v) => v.tags?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [yogaVideos]);

  // Filter by tag
  const filteredVideos = useMemo(() => {
    if (selectedTag === 'All') return yogaVideos;
    return yogaVideos.filter((v) => v.tags?.includes(selectedTag));
  }, [yogaVideos, selectedTag]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section id="yoga-masterclasses" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-xs">
            <YoutubeIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Section A • Full Length Practices</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Yoga Masterclasses & Sessions
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            High-definition immersive sequences focusing on somatic nervous system regulation, fascial Yin releases, and biomechanical precision.
          </p>

          {/* YouTube Channel Callout */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://youtube.com/@supriyabhavsar_yoga"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-200 text-xs font-medium hover:text-white hover:bg-purple-900/50 transition-all shadow-sm"
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-red-400" />
              <span>120K Subscribers on YouTube</span>
            </a>
          </div>
        </motion.div>

        {/* Filter Chips */}
        {allTags.length > 2 && (
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSelectedTag(tag);
                    setVisibleCount(6);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white border border-purple-500/15 hover:bg-white/[0.08]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {/* 6-Item Initial Grid with 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedVideos.map((video, idx) => {
            const ytThumb = getYouTubeThumbnailUrl(video.videoUrl);
            const thumbSrc = video.customThumbnailUrl || ytThumb;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectVideo(video)}
                className="group relative rounded-3xl overflow-hidden bg-[#130E26]/85 border border-purple-500/20 hover:border-purple-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail Stage */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={video.title}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${
                        video.thumbnailGradient || 'from-purple-900 to-indigo-950'
                      } flex items-center justify-center`}
                    >
                      <Sparkles className="w-10 h-10 text-white/40" />
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130E26] via-transparent to-black/30 pointer-events-none" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B0914] shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-purple-300" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/20 text-[10px] font-semibold text-purple-200">
                    Yoga Practice
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {video.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-purple-300/80 bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-500/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-purple-200 transition-colors mb-2">
                      {video.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 font-light">
                      {video.description}
                    </p>
                  </div>

                  {/* Footer Meta Row */}
                  <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>{video.views}</span>
                    </div>
                    <span className="text-[11px] text-purple-300/80 font-mono">
                      {video.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer active:scale-95 transition-all shadow-md"
            >
              <span>Load More Videos ({filteredVideos.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
