import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoContent } from '../types';
import { X, ExternalLink, Clock } from 'lucide-react';
import { YoutubeIcon } from './Icons';
import { parseYouTubeEmbedUrl } from '../lib/videoParser';

interface VideoModalProps {
  video: VideoContent | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const embedUrl = parseYouTubeEmbedUrl(video.videoUrl || 'https://www.youtube.com/watch?v=sTANio_2E0Q');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      {/* Modal Dialog with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#0E0A1D] text-[#F8FAFC] rounded-3xl overflow-hidden border border-purple-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-4xl w-full max-h-[92vh] flex flex-col"
      >
        {/* Top bar */}
        <div className="px-6 py-4 bg-[#140E26] flex items-center justify-between border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <YoutubeIcon className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-300">
              {video.category} • HD Video Player
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={video.videoUrl || 'https://youtube.com'}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-silver-glass text-[11px] font-semibold transition-all"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>Open on YouTube</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 text-white hover:bg-purple-600/40 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display - Real YouTube Embed iframe */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Information & Chapters (Scrollable) */}
        <div className="p-6 bg-[#0E0A1D] overflow-y-auto max-h-[35vh] space-y-5">
          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-2">
              {video.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Interactive Chapter Timestamps */}
          {video.chapters && video.chapters.length > 0 && (
            <div className="border-t border-purple-500/15 pt-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Jump to Session Chapters</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.chapters.map((chap: { time: string; title: string }, idx: number) => (
                  <button
                    key={chap.time}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                      activeChapterIndex === idx
                        ? 'bg-purple-950/80 border-purple-400 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-white/[0.04] border-purple-500/15 text-slate-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{chap.title}</span>
                    <span className="font-mono text-[11px] opacity-80 text-purple-300">{chap.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {video.tags.map((t: string) => (
              <span key={t} className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">
                #{t}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
