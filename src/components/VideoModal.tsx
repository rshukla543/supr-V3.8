import React, { useState, useEffect } from 'react';
import { VideoContent } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { YoutubeIcon } from './Icons';

interface VideoModalProps {
  video: VideoContent | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div className="bg-[#182C22] text-[#FAF8F5] rounded-3xl overflow-hidden border border-[#CBD9D0]/20 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col">
        
        {/* Top bar */}
        <div className="px-6 py-4 bg-[#12221A] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D8C5AF]">
              {video.category} • YouTube Interactive Player
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black flex flex-col justify-between overflow-hidden group">
          {/* Backdrop simulation */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${video.thumbnailGradient} opacity-70`} />
          
          {/* Animated waveform / atmospheric glow when playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-96 h-96 rounded-full bg-[#8EA89D] blur-3xl animate-pulse" />
            </div>
          )}

          {/* Central Yogi visual in player */}
          <div className="relative z-10 flex flex-col items-center justify-center m-auto text-center px-4">
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 text-2xl font-serif border border-white/20">
              ॐ
            </div>
            <p className="text-sm font-semibold tracking-wide text-white/90 max-w-md">
              {isPlaying ? 'Streaming Session Preview' : 'Paused'}
            </p>
            <p className="text-xs text-[#CBD9D0] mt-1 font-mono">
              Current Chapter: {video.chapters?.[activeChapterIndex]?.title || 'Practice in Progress'}
            </p>
          </div>

          {/* Player Controls Bar */}
          <div className="relative z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2">
            
            {/* Progress Scrubber */}
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden relative group/scrub"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, pos)));
              }}
            >
              <div
                className="h-full bg-red-600 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:text-[#D8C5AF] transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-[#CBD9D0]">
                  04:12 / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 transition-colors"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button className="p-1 hover:text-white transition-colors" aria-label="Fullscreen">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Chapters (Scrollable) */}
        <div className="p-6 bg-[#182C22] overflow-y-auto max-h-[35vh] space-y-5">
          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-2">
              {video.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD9D0] leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Interactive Chapter Timestamps */}
          {video.chapters && video.chapters.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#D8C5AF] mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Jump to Session Chapters</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.chapters.map((chap: { time: string; title: string }, idx: number) => (
                  <button
                    key={chap.time}
                    onClick={() => {
                      setActiveChapterIndex(idx);
                      setProgress((idx / video.chapters!.length) * 100 + 5);
                      setIsPlaying(true);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                      activeChapterIndex === idx
                        ? 'bg-[#4D705E] border-[#8EA89D] text-white font-semibold'
                        : 'bg-white/5 border-white/10 text-[#E5ECE7] hover:bg-white/10'
                    }`}
                  >
                    <span>{chap.title}</span>
                    <span className="font-mono text-[11px] opacity-75">{chap.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {video.tags.map((t: string) => (
              <span key={t} className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#D8C5AF]">
                #{t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
