import React, { useEffect, useRef, useState } from 'react';
import { parseInstagramEmbedUrl } from '../lib/videoParser';
import { InstagramIcon } from './Icons';
import { ExternalLink, Sparkles } from 'lucide-react';

interface InstagramEmbedProps {
  url: string;
  caption?: string;
  creatorHandle?: string;
  className?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  caption,
  creatorHandle = 'supriya_9508',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const embedUrl = parseInstagramEmbedUrl(url);

  // Load Instagram official embed script if not present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('instagram-embed-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
          if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        };
        document.body.appendChild(script);
      } else if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }
  }, [url]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-[#0D091B] border border-purple-500/20 shadow-xl flex flex-col items-center justify-center ${className}`}>
      {/* Top Header */}
      <div className="w-full px-4 py-2.5 bg-[#140E26] border-b border-purple-500/15 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-purple-300 font-medium">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>@{creatorHandle}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <span>View on Instagram</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Embed Container */}
      <div ref={containerRef} className="relative w-full min-h-[460px] flex items-center justify-center bg-black/40">
        {/* Loading Spinner */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0E0A1D]">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
            <span className="text-[11px] font-mono text-purple-300/70">Connecting Instagram Reel...</span>
          </div>
        )}

        {/* Embedded Instagram Iframe */}
        <iframe
          src={embedUrl}
          className="w-full h-full min-h-[480px] border-0"
          title={`Instagram Reel by @${creatorHandle}`}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          onLoad={() => setIsIframeLoaded(true)}
        />
      </div>

      {caption && (
        <div className="w-full p-3 bg-[#110B22] border-t border-purple-500/15 text-xs text-slate-300 italic line-clamp-2">
          "{caption}"
        </div>
      )}
    </div>
  );
};
