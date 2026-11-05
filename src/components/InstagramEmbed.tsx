import React, { useState, useEffect } from 'react';
import { ExternalLink, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface InstagramEmbedProps {
  url: string;
  caption?: string;
  creatorHandle?: string;
}

export type DiagnosticState = 'loading' | 'rendered' | 'failed' | 'unavailable';

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  caption,
  creatorHandle = 'supriya_9508',
}) => {
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>('loading');

  // Extract Instagram clean URL and embed endpoint as per Directive #2
  const { cleanUrl, embedUrl, permalinkUrl } = React.useMemo(() => {
    if (!url || typeof url !== 'string') {
      const fallbackClean = 'https://www.instagram.com/reel/C8qLd95M6P1';
      return {
        cleanUrl: fallbackClean,
        embedUrl: `${fallbackClean}/embed`,
        permalinkUrl: fallbackClean,
      };
    }

    // Strip any query parameters (like ?igshid=...) and trailing slashes
    let sanitized = url.trim().split('?')[0].replace(/\/+$/, '');
    
    // Check if shortcode or full URL
    const match = sanitized.match(/(?:instagram\.com|instagr\.am)\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
    let code = '';
    if (match && match[1]) {
      code = match[1];
    } else if (/^[A-Za-z0-9_-]{5,30}$/.test(sanitized)) {
      code = sanitized;
    }

    if (code) {
      const baseReelUrl = `https://www.instagram.com/reel/${code}`;
      return {
        cleanUrl: baseReelUrl,
        embedUrl: `${baseReelUrl}/embed`,
        permalinkUrl: baseReelUrl,
      };
    }

    if (!sanitized.startsWith('http')) {
      sanitized = `https://www.instagram.com/reel/C8qLd95M6P1`;
    }

    return {
      cleanUrl: sanitized,
      embedUrl: `${sanitized}/embed`,
      permalinkUrl: sanitized,
    };
  }, [url]);

  useEffect(() => {
    setDiagnosticState('loading');
    const timer = setTimeout(() => {
      setDiagnosticState((curr) => (curr === 'loading' ? 'rendered' : curr));
    }, 8000);
    return () => clearTimeout(timer);
  }, [embedUrl]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-2 overflow-hidden rounded-3xl bg-[#0B0914] border border-purple-500/25 p-2 sm:p-3 min-h-[500px] relative">
      {/* Official Meta Direct Embed iFrame with Sleek Loading Skeleton (Directive #2) */}
      <div className="w-full max-w-[400px] min-h-[480px] rounded-2xl overflow-hidden relative bg-[#120D24] flex items-center justify-center">
        {diagnosticState === 'loading' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#120D24] p-6 text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg animate-pulse">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            {/* Sleek Skeleton Bar Placeholders */}
            <div className="w-3/4 h-3 bg-purple-900/30 rounded-full animate-pulse" />
            <div className="w-1/2 h-2.5 bg-purple-900/20 rounded-full animate-pulse" />
            <div className="flex items-center gap-2 text-[11px] text-purple-300 font-mono mt-1">
              <RefreshCw className="w-3 h-3 animate-spin text-purple-400" />
              <span>Connecting Instagram Player...</span>
            </div>
          </div>
        )}

        <iframe
          src={embedUrl}
          title={`Instagram Reel by @${creatorHandle}`}
          width="400"
          height="480"
          frameBorder="0"
          scrolling="no"
          className="w-full max-w-[400px] h-[480px] rounded-2xl border-0 overflow-hidden bg-transparent"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setDiagnosticState('rendered')}
          onError={() => setDiagnosticState('failed')}
        />
      </div>

      {/* Fallback Direct Link */}
      {diagnosticState === 'failed' && (
        <div className="mt-3 text-center text-xs text-purple-300/90 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-purple-950/50 border border-purple-500/30">
          <p className="text-[11px] text-slate-300">
            Instagram may have privacy or embedding restrictions on this post.
          </p>
          <a
            href={permalinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors"
          >
            <span>Watch directly on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
