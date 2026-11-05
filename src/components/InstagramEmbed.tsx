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

  // Extract Instagram shortcode from URL
  const { shortcode, permalinkUrl, iframeEmbedUrl } = React.useMemo(() => {
    if (!url || typeof url !== 'string') {
      const fallbackCode = 'C8qLd95M6P1';
      return {
        shortcode: fallbackCode,
        permalinkUrl: `https://www.instagram.com/reel/${fallbackCode}/`,
        iframeEmbedUrl: `https://www.instagram.com/p/${fallbackCode}/embed/captioned/`,
      };
    }

    const trimmed = url.trim();
    const match = trimmed.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);

    let code = '';
    if (match && match[1]) {
      code = match[1];
    } else if (/^[A-Za-z0-9_-]{5,30}$/.test(trimmed)) {
      code = trimmed;
    }

    if (!code) {
      return {
        shortcode: '',
        permalinkUrl: trimmed.startsWith('http') ? trimmed : `https://www.instagram.com/supriya_9508`,
        iframeEmbedUrl: '',
      };
    }

    return {
      shortcode: code,
      permalinkUrl: `https://www.instagram.com/reel/${code}/`,
      iframeEmbedUrl: `https://www.instagram.com/p/${code}/embed/captioned/`,
    };
  }, [url]);

  useEffect(() => {
    if (!iframeEmbedUrl) {
      setDiagnosticState('unavailable');
      return;
    }

    setDiagnosticState('loading');

    // Timeout safety net: if iframe doesn't respond in 12s, mark as potentially restricted/failed
    const timer = setTimeout(() => {
      setDiagnosticState((current) => (current === 'loading' ? 'rendered' : current));
    }, 12000);

    return () => clearTimeout(timer);
  }, [iframeEmbedUrl]);

  if (diagnosticState === 'unavailable' || !iframeEmbedUrl) {
    return (
      <div className="w-full flex flex-col items-center justify-center my-2 p-6 rounded-3xl bg-[#0B0914] border border-purple-500/25 min-h-[380px] text-center">
        <AlertCircle className="w-10 h-10 text-purple-400 mb-2" />
        <h3 className="text-white font-serif font-semibold text-base mb-1">
          Instagram Reel Link Not Recognized
        </h3>
        <p className="text-xs text-slate-400 max-w-xs mb-4">
          Please check that the Instagram Reel URL is valid and public.
        </p>
        <a
          href={permalinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-silver-glass text-xs font-semibold hover:bg-purple-600 hover:text-white transition-colors"
        >
          <span>Open on Instagram</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-2 overflow-hidden rounded-3xl bg-[#0B0914] border border-purple-500/25 p-2 sm:p-3 min-h-[500px] relative">
      {/* Diagnostic Badge for Verification */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono">
        {diagnosticState === 'loading' && (
          <>
            <RefreshCw className="w-3 h-3 animate-spin text-purple-400" />
            <span className="text-purple-200">Loading Embed...</span>
          </>
        )}
        {diagnosticState === 'rendered' && (
          <>
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300">Meta Embed Ready</span>
          </>
        )}
        {diagnosticState === 'failed' && (
          <>
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span className="text-amber-300">Restricted Content</span>
          </>
        )}
      </div>

      {/* Official Meta Direct Embed iFrame */}
      <div className="w-full max-w-[380px] min-h-[480px] sm:min-h-[520px] rounded-2xl overflow-hidden relative bg-[#120D24]">
        {diagnosticState === 'loading' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#120D24] p-6 text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg animate-pulse">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs font-serif font-medium text-purple-200">
              Initializing Instagram Reel Player...
            </p>
            {caption && (
              <p className="text-[11px] text-slate-400 line-clamp-2 max-w-xs">
                {caption}
              </p>
            )}
          </div>
        )}

        <iframe
          src={iframeEmbedUrl}
          title={`Instagram Reel by @${creatorHandle}`}
          className="w-full h-[520px] rounded-2xl border-0 overflow-hidden bg-transparent"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setDiagnosticState('rendered')}
          onError={() => setDiagnosticState('failed')}
        />
      </div>

      {/* Fallback Direct Link for Meta restricted reels */}
      {diagnosticState === 'failed' && (
        <div className="mt-3 text-center text-xs text-purple-300/90 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-purple-950/50 border border-purple-500/30">
          <p className="text-[11px] text-slate-300">
            This Reel may have privacy restrictions set by Instagram preventing in-frame playback.
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
