import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage, GalleryFolder } from '../types';
import { ChevronLeft, ChevronRight, X, Maximize2, Compass, Sparkles, Image as ImageIcon } from 'lucide-react';

interface GallerySectionProps {
  images: GalleryImage[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const [activeFolder, setActiveFolder] = useState<GalleryFolder>('All');
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const folders: GalleryFolder[] = [
    'All',
    'Asana & Flow',
    'Studio & Space',
    'Travel & Retreats',
    'Casual & Lifestyle',
  ];

  const filteredImages = activeFolder === 'All'
    ? images
    : images.filter((img) => img.folder === activeFolder);

  // Initialize centered on middle image when images populate
  useEffect(() => {
    if (filteredImages.length > 0) {
      // Pick a balanced center index (e.g., index 1 or 2 if multiple items exist)
      const centerInitial = Math.floor(filteredImages.length / 2);
      setActiveIdx(centerInitial);
    }
  }, [filteredImages.length, activeFolder]);

  // Clamp index safely
  const safeActiveIdx = Math.min(
    Math.max(0, activeIdx),
    Math.max(0, filteredImages.length - 1)
  );

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  const handleFolderChange = (folder: GalleryFolder) => {
    setActiveFolder(folder);
  };

  // Keyboard Escape listener for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage, filteredImages.length]);

  const isMobile = windowWidth < 640;
  const slideSpacing = isMobile ? 190 : 270;

  return (
    <section id="gallery" className="py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-purple-500/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-purple-300" />
              <span>Visual Archive & Lifestyle</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Captured Moments
            </h2>
            <p className="mt-2 text-sm text-slate-300/80 max-w-xl">
              From sacred sunrise asanas in Rishikesh to minimal studio mornings and conscious travel chronicles.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-purple-300/70 hidden sm:inline mr-2 font-mono">
              3D Coverflow • Drag or Click
            </span>
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/[0.04] border border-purple-500/20 text-slate-200 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/50 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/[0.04] border border-purple-500/20 text-slate-200 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/50 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Folder Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {folders.map((folder) => {
            const isActive = activeFolder === folder;
            const count = folder === 'All' ? images.length : images.filter((i) => i.folder === folder).length;
            return (
              <button
                key={folder}
                onClick={() => handleFolderChange(folder)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white bg-white/[0.03] border border-purple-500/15 hover:bg-purple-500/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryFolder"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.35)] border border-purple-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{folder}</span>
                  <span className="text-[10px] opacity-75 font-mono">
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Coverflow Carousel Stage */}
        <div className="relative h-[460px] sm:h-[520px] w-full overflow-hidden select-none [perspective:1400px]">
          {filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-2">
              <ImageIcon className="w-8 h-8 text-purple-400/50" />
              <span>No images in this folder yet.</span>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {filteredImages.map((img, idx) => {
                const offset = idx - safeActiveIdx;
                const isCenter = offset === 0;

                // Render window of 4 slides on each side
                if (Math.abs(offset) > 4) return null;

                const xTranslation = offset * slideSpacing;
                const scale = isCenter ? 1.06 : Math.max(0.72, 1 - Math.abs(offset) * 0.12);
                const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.25);
                const rotateY = offset * -15;
                const zIndex = 35 - Math.abs(offset);

                return (
                  <motion.div
                    key={img.id}
                    className="absolute top-1/2 left-1/2 w-72 sm:w-84 aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
                    style={{
                      zIndex,
                    }}
                    animate={{
                      x: `calc(-50% + ${xTranslation}px)`,
                      y: '-50%',
                      scale,
                      opacity,
                      rotateY,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -35) handleNext();
                      else if (info.offset.x > 35) handlePrev();
                    }}
                    onClick={() => {
                      if (isCenter) {
                        setLightboxImage(img);
                      } else {
                        setActiveIdx(idx);
                      }
                    }}
                  >
                    <div
                      className={`relative w-full h-full rounded-3xl overflow-hidden bg-[#130E24] p-5 flex flex-col justify-between transition-all duration-300 ${
                        isCenter
                          ? 'border-2 border-purple-400/70 shadow-[0_20px_60px_rgba(168,85,247,0.35)]'
                          : 'border border-purple-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                      }`}
                    >
                      {/* Image background if URL exists, else gradient hint */}
                      {img.imageUrl ? (
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-b ${img.gradientHint || 'from-purple-950 via-slate-900 to-black'} opacity-90`} />
                          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-5 [background-size:16px_16px]" />
                        </>
                      )}

                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-[#0B0914]/40 to-transparent pointer-events-none" />

                      {/* Top Pill & Action */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-400/20 text-[11px] font-medium text-purple-200">
                          {img.folder}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white hover:scale-110 transition-all">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Center Decorative Symbol (Shown if no photo) */}
                      {!img.imageUrl && (
                        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-purple-500/20 backdrop-blur-sm flex items-center justify-center text-2xl font-serif text-purple-200 shadow-inner">
                            ॐ
                          </div>
                        </div>
                      )}

                      {/* Bottom Title & Caption */}
                      <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent -mx-5 -mb-5 p-5 pt-8 rounded-b-3xl">
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-white mb-1 drop-shadow-sm leading-snug">
                          {img.title}
                        </h3>
                        <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed font-normal">
                          {img.caption}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sleek Pagination Dots */}
        {filteredImages.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {filteredImages.map((_, dotIdx) => {
              const isSelected = dotIdx === safeActiveIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIdx(dotIdx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-8 h-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-300 shadow-[0_0_12px_rgba(168,85,247,0.7)]'
                      : 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to image slide ${dotIdx + 1}`}
                />
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal with Full-Screen Clean Z-Index (z-[100]) & Highly Visible Close Button */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-[#110D20] border border-purple-500/40 p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh]"
            >
              {/* Header Bar with prominent Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>{lightboxImage.folder}</span>
                </span>
                
                {/* Highly Visible, Prominent Close Button */}
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 hover:border-purple-400 transition-all cursor-pointer shadow-lg active:scale-95 group"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5 text-white transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* Main Image Stage */}
              <div className={`relative aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden ${lightboxImage.imageUrl ? 'bg-black' : `bg-gradient-to-b ${lightboxImage.gradientHint}`} flex flex-col items-center justify-center text-center border border-purple-500/25 mb-4`}>
                {lightboxImage.imageUrl ? (
                  <img
                    src={lightboxImage.imageUrl}
                    alt={lightboxImage.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/[0.05] border border-purple-400/20 flex items-center justify-center text-4xl font-serif text-white mb-4 shadow-inner">
                    ॐ
                  </div>
                )}
                
                {/* Overlay Text Details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 sm:p-6 text-left">
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    {lightboxImage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-xl">
                    {lightboxImage.caption}
                  </p>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="font-mono text-[11px] text-purple-300/80">
                  Supriya Visual Archive • Midnight Lotus
                </span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-xs"
                >
                  Close (ESC)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
