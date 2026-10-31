import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
  caption?: string;
  creatorHandle?: string;
  aspectRatio?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  caption,
  creatorHandle = 'supriya_9508',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Normalize Instagram URL
  const normalizedUrl = url.includes('instagram.com')
    ? url.split('?')[0].replace(/\/+$/, '') + '/'
    : `https://www.instagram.com/reel/C2-example/`;

  useEffect(() => {
    let isMounted = true;

    const processEmbed = () => {
      if (window.instgrm?.Embeds) {
        try {
          window.instgrm.Embeds.process();
          if (isMounted) setIsLoaded(true);
        } catch (err) {
          console.warn('Instagram Embeds.process error:', err);
          if (isMounted) setLoadError(true);
        }
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(processEmbed, 150);
      };
      script.onerror = () => {
        if (isMounted) setLoadError(true);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(processEmbed, 100);
    }

    const timer = setTimeout(() => {
      if (isMounted && !isLoaded) {
        setIsLoaded(true); // Don't hang forever
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [normalizedUrl]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-2 select-none overflow-hidden rounded-3xl bg-[#0B0914] border border-purple-500/25 p-3 sm:p-4">
      {/* Official Instagram Embed Container */}
      <div
        ref={containerRef}
        className="w-full flex justify-center max-w-[400px] overflow-hidden"
      >
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={normalizedUrl}
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
          {/* Inner Fallback rendered while Instagram JS parses the blockquote */}
          <div className="p-4 text-center text-xs text-slate-300 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-0.5 flex items-center justify-center">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <p className="font-serif text-sm font-semibold text-white">
              @{creatorHandle} on Instagram
            </p>
            {caption && <p className="text-[11px] text-slate-400 line-clamp-2">{caption}</p>}
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-silver-glass text-xs font-semibold"
            >
              <span>View Reel on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </blockquote>
      </div>

      {loadError && (
        <div className="mt-3 text-center text-xs text-purple-300/80 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>If Instagram blocks in-frame playback, click above to open directly.</span>
        </div>
      )}
    </div>
  );
};
