import React, { useState } from 'react';
import { VideoContent, ContentCategory } from '../types';
import { VIDEO_DATA } from '../data/mockData';
import { Play, Eye, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { YoutubeIcon } from './Icons';

interface ContentHubSectionProps {
  onSelectVideo: (video: VideoContent) => void;
}

export const ContentHubSection: React.FC<ContentHubSectionProps> = ({
  onSelectVideo,
}) => {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('Yoga & Fitness');

  const categories: ContentCategory[] = [
    'Yoga & Fitness',
    'Lifestyle Vlogs',
    'Shorts/Reels',
  ];

  const filteredVideos = VIDEO_DATA.filter(
    (video) => video.category === activeCategory
  ).slice(0, 3); // Ensures 3 cards as requested

  return (
    <section id="content-hub" className="py-20 md:py-28 bg-[#FAF8F5] relative">
      {/* Subtle background decoration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#EADECE]/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE7] text-[#2C483A] text-xs font-semibold tracking-wider uppercase mb-3">
              <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
              <span>Watch & Practice</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#182C22] tracking-tight">
              Latest from Supriya
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#665440] max-w-xl">
              Fresh weekly classes, mindful living rituals, and unfiltered lifestyle vlogs to fuel your practice on and off the mat.
            </p>
          </div>

          {/* YouTube Channel Stat */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#D8C5AF] text-[#182C22] text-xs font-semibold hover:border-red-600 hover:text-red-700 transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>120K Subscribers</span>
              <ExternalLink className="w-3 h-3 text-[#9E8568]" />
            </a>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#F4EFE6] border border-[#EADECE] shadow-inner gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#182C22] text-[#FAF8F5] shadow-sm transform scale-[1.02]'
                      : 'text-[#665440] hover:text-[#182C22] hover:bg-[#E5ECE7]/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* CSS Grid for 3 YouTube-Embedded Style Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer flex flex-col bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#EADECE] hover:border-[#8EA89D] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
            >
              {/* YouTube Embedded Player Video Placeholder */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#182C22]">
                
                {/* Background aesthetic placeholder with category gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${video.thumbnailGradient} opacity-90 transition-transform duration-500 group-hover:scale-105`}
                />

                {/* Subtle Grid / Noise Pattern */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* YouTube Branding Top Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="font-semibold tracking-tight">YouTube Player</span>
                  </div>
                  <span className="text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded text-white/90">
                    HD 4K
                  </span>
                </div>

                {/* Center Visual Art & Big Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  {/* Category Accent Badge */}
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#EADECE] mb-2 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs">
                    {video.category}
                  </span>

                  {/* YouTube Centered Play Icon with pulse ring */}
                  <div className="relative flex items-center justify-center my-1">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-100 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
                  </div>

                  <p className="text-[11px] text-white/80 mt-2 font-medium">Click to Play Preview</p>
                </div>

                {/* Bottom Duration Badge (standard YouTube video corner) */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/85 text-white px-2 py-0.5 rounded text-[11px] font-mono font-medium flex items-center gap-1 z-10">
                  <Clock className="w-3 h-3 text-[#D8C5AF]" />
                  <span>{video.duration}</span>
                </div>

                {/* Bottom Red Progress bar preview */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-red-600 w-1/3 group-hover:w-full transition-all duration-500" />
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#665440]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Video Title */}
                  <h3 className="font-serif text-lg font-semibold text-[#182C22] group-hover:text-[#4D705E] transition-colors line-clamp-2 leading-snug mb-2">
                    {video.title}
                  </h3>

                  {/* Short snippet */}
                  <p className="text-xs text-[#665440] line-clamp-2 leading-relaxed mb-4">
                    {video.description}
                  </p>
                </div>

                {/* Author row & stats */}
                <div className="pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs text-[#9E8568]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#182C22] text-[#FAF8F5] text-[10px] font-bold flex items-center justify-center font-serif">
                      S
                    </div>
                    <span className="font-medium text-[#2C483A]">Supriya</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#9E8568]" />
                      {video.views}
                    </span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hub Footer banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#E5ECE7] via-[#F4EFE6] to-[#FAF8F5] border border-[#CBD9D0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#182C22] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D8C5AF]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#182C22]">New Practices Added Every Tuesday & Friday</p>
              <p className="text-xs text-[#665440]">Join 120,000+ mindful practitioners on the path of somatic alignment.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectVideo(filteredVideos[0])}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-colors cursor-pointer shrink-0"
          >
            Start Today's Flow
          </button>
        </div>

      </div>
    </section>
  );
};
