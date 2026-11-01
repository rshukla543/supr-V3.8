import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, AlertCircle, Play } from 'lucide-react';
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

export function extractInstagramShortcode(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[A-Za-z0-9_-]{5,30}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
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
  const [loadError, setLoadError] = useState(false);
  const shortcode = extractInstagramShortcode(url);

  // Clean URL format for permalinks
  const normalizedUrl = shortcode
    ? `https://www.instagram.com/reel/${shortcode}/`
    : url.includes('instagram.com')
    ? url.split('?')[0].replace(/\/+$/, '') + '/'
    : 'https://www.instagram.com/reel/C8qLd95M6P1/';

  useEffect(() => {
    let isMounted = true;

    const processEmbed = () => {
      if (window.instgrm?.Embeds) {
        try {
          window.instgrm.Embeds.process();
        } catch (err) {
          console.warn('Instagram Embeds.process notice:', err);
        }
      }
    };

    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setTimeout(processEmbed, 100);
      document.body.appendChild(script);
    } else {
      setTimeout(processEmbed, 50);
    }

    return () => {
      isMounted = false;
    };
  }, [normalizedUrl]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-1 select-none overflow-hidden rounded-3xl bg-[#0B0914] border border-purple-500/25 p-2 sm:p-3 relative">
      {shortcode ? (
        /* Direct Official Instagram Reel Embed Frame */
        <div className="w-full h-full min-h-[460px] sm:min-h-[520px] max-h-[640px] flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden relative border border-purple-500/20">
          <iframe
            src={`https://www.instagram.com/p/${shortcode}/embed/`}
            title={`Instagram Reel by @${creatorHandle}`}
            className="w-full h-[540px] sm:h-[600px] border-0 rounded-2xl"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      ) : (
        /* Blockquote Fallback with Instagram JS Process */
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
                <span>Watch Reel on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </blockquote>
        </div>
      )}
    </div>
  );
};
