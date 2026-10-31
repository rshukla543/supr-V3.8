import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VideoContent, BlogEntry } from '../types';
import {
  Play,
  Clock,
  Eye,
  Sparkles,
  Compass,
  ListFilter,
  ChevronDown,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { getYouTubeThumbnailUrl } from '../lib/videoParser';

interface LifestyleVlogsSectionProps {
  videos: VideoContent[];
  blogs?: BlogEntry[];
  onSelectVideo: (video: VideoContent) => void;
}

export const LifestyleVlogsSection: React.FC<LifestyleVlogsSectionProps> = ({
  videos,
  blogs = [],
  onSelectVideo,
}) => {
  const [expandedVlogId, setExpandedVlogId] = useState<string | null>(null);

  // Filter only Lifestyle Vlogs
  const vlogs = useMemo(() => {
    return videos.filter((v) => v.category === 'Lifestyle Vlogs');
  }, [videos]);

  const toggleChapters = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedVlogId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="lifestyle-vlogs" className="py-20 md:py-28 relative z-10 bg-[#0B0914]/90">
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
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Section B • Mindful Chronicles & Articles</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Mindful Lifestyle & Philosophy Vlogs
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            Unfiltered Himalayan retreat diaries, Sattvic whole-food nutrition, and spatial sanctuary curation. Click any story to dive into the full-page rich article and embedded video.
          </p>
        </motion.div>

        {/* Cinematic Vlog & Article Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {vlogs.slice(0, 3).map((vlog, idx) => {
            const ytThumb = getYouTubeThumbnailUrl(vlog.videoUrl);
            const thumbSrc = vlog.customThumbnailUrl || ytThumb;
            const isExpanded = expandedVlogId === vlog.id;

            // Map each vlog card to its matching blog article (blog-1, blog-2, blog-3)
            const targetBlogId = blogs[idx]?.id || `blog-${idx + 1}`;

            return (
              <motion.div
                key={vlog.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-[#140E28]/85 border border-purple-500/20 hover:border-purple-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner with 16:9 ratio - click to watch video */}
                  <div
                    onClick={() => onSelectVideo(vlog)}
                    className="relative aspect-video w-full overflow-hidden bg-black/60 cursor-pointer"
                  >
                    {thumbSrc ? (
                      <img
                        src={thumbSrc}
                        alt={vlog.title}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-tr ${
                          vlog.thumbnailGradient || 'from-purple-900 to-indigo-950'
                        } flex items-center justify-center`}
                      >
                        <Compass className="w-10 h-10 text-white/40" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140E28] via-transparent to-black/30 pointer-events-none" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B0914] shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-purple-300" />
                      <span>{vlog.duration}</span>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/20 text-[10px] font-semibold text-purple-200">
                      Lifestyle Vlog & Article
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {vlog.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-purple-300/80 bg-purple-950/50 px-2 py-0.5 rounded-full border border-purple-500/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-purple-200 transition-colors mb-2.5">
                      {vlog.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 font-light">
                      {vlog.description}
                    </p>

                    {/* Link to Dedicated Blog Route /blog/:id */}
                    <Link
                      to={`/blog/${targetBlogId}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors group/link mb-4"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>Read Full Article &amp; Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    {/* Chapters Accordion Drawer */}
                    {vlog.chapters && vlog.chapters.length > 0 && (
                      <div className="mt-2 pt-3 border-t border-purple-500/15">
                        <button
                          type="button"
                          onClick={(e) => toggleChapters(vlog.id, e)}
                          className="flex items-center justify-between w-full text-xs text-purple-300 hover:text-white font-medium py-1 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <ListFilter className="w-3.5 h-3.5 text-purple-400" />
                            <span>{vlog.chapters.length} Video Timestamps</span>
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-2 space-y-1.5 bg-black/30 p-2.5 rounded-xl border border-purple-500/15"
                            >
                              {vlog.chapters.map((ch, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="flex items-center justify-between text-[11px] text-slate-300 hover:text-purple-300"
                                >
                                  <span className="truncate pr-2 font-light">
                                    {ch.title}
                                  </span>
                                  <span className="font-mono text-purple-400 text-[10px]">
                                    {ch.time}
                                  </span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Row */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>{vlog.views}</span>
                    </div>
                    <span className="text-[11px] text-purple-300/80 font-mono">
                      {vlog.date}
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
