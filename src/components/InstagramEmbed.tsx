import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { processInstagramEmbeds } from '../lib/instagramLoader';

interface InstagramEmbedProps {
  url: string;
  caption?: string;
  creatorHandle?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  caption,
  creatorHandle = 'supriya_9508',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Normalize Instagram permalink URL
  const permalinkUrl = React.useMemo(() => {
    if (!url || typeof url !== 'string') {
      return 'https://www.instagram.com/reel/C8qLd95M6P1/';
    }
    const trimmed = url.trim();
    // Match post, reel, or tv shortcode
    const match = trimmed.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
    if (match && match[1]) {
      return `https://www.instagram.com/reel/${match[1]}/`;
    }
    if (/^[A-Za-z0-9_-]{5,30}$/.test(trimmed)) {
      return `https://www.instagram.com/reel/${trimmed}/`;
    }
    return trimmed.startsWith('http') ? trimmed : `https://www.instagram.com/reel/C8qLd95M6P1/`;
  }, [url]);

  useEffect(() => {
    let isMounted = true;
    setIsProcessing(true);
    setHasError(false);

    const initEmbed = async () => {
      // Ensure the container and blockquote element are mounted in the DOM
      if (!containerRef.current) return;

      try {
        const success = await processInstagramEmbeds(containerRef.current);
        if (isMounted) {
          if (!success) {
            setHasError(true);
          }
          setIsProcessing(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Instagram embed processing notice:', err);
          setHasError(true);
          setIsProcessing(false);
        }
      }
    };

    // Small microtask tick to guarantee DOM layout before calling process
    const timer = setTimeout(initEmbed, 50);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [permalinkUrl]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-2 select-none overflow-hidden rounded-3xl bg-[#0B0914] border border-purple-500/25 p-3 sm:p-4 min-h-[420px] relative">
      {/* Official Instagram Blockquote Container */}
      <div
        ref={containerRef}
        className="w-full flex justify-center max-w-[400px] overflow-hidden min-h-[380px]"
      >
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={permalinkUrl}
          data-instgrm-version="14"
          style={{
            background: '#120D24',
            borderRadius: '1.25rem',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            margin: '0 auto',
            width: '100%',
            maxWidth: '380px',
            minWidth: '280px',
            padding: 0,
          }}
        >
          {/* Inner Fallback rendered while Meta's embed.js transforms the blockquote */}
          <div className="p-6 text-center text-xs text-slate-300 flex flex-col items-center justify-center gap-3 min-h-[320px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            
            <div className="space-y-1">
              <p className="font-serif text-sm font-semibold text-white">
                @{creatorHandle} on Instagram
              </p>
              {caption && (
                <p className="text-[11px] text-slate-400 line-clamp-2 max-w-xs mx-auto">
                  {caption}
                </p>
              )}
            </div>

            {isProcessing ? (
              <div className="flex items-center gap-2 text-[11px] text-purple-300 py-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>Loading Instagram Reel...</span>
              </div>
            ) : (
              <a
                href={permalinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-silver-glass text-xs font-semibold hover:bg-purple-600 hover:text-white transition-colors cursor-pointer mt-2"
              >
                <span>View Reel on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </blockquote>
      </div>

      {hasError && (
        <div className="mt-3 text-center text-xs text-purple-300/80 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20">
          <AlertCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>If Instagram blocks in-frame playback, use the button above to view directly on Instagram.</span>
        </div>
      )}
    </div>
  );
};
