import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ExternalLink, RefreshCw, AlertCircle, RotateCcw } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { parseInstagramUrl } from '../lib/instagram';
import { loadInstagramEmbedScript } from '../lib/instagramLoader';

/**
 * loading        – script/iframe not ready yet
 * rendered       – embed.js replaced our blockquote with Instagram's iframe.
 * script-blocked – embed.js failed to load (CSP, ad-blocker, network)
 * timeout        – nothing rendered after 12s (may still render later)
 * invalid        – the stored URL is not a valid Instagram post URL
 */
export type EmbedStatus = 'loading' | 'rendered' | 'script-blocked' | 'timeout' | 'invalid';

interface InstagramEmbedProps {
  url?: string;
  captioned?: boolean;
  onStatusChange?: (status: EmbedStatus) => void;
  className?: string;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  captioned = false,
  onStatusChange,
  className = '',
}) => {
  const parsed = useMemo(() => parseInstagramUrl(url), [url]);
  const permalink = parsed.ok ? parsed.permalink : null;

  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<EmbedStatus>(permalink ? 'loading' : 'invalid');
  const [renderCount, setRenderCount] = useState(0);

  const statusCb = useRef(onStatusChange);
  statusCb.current = onStatusChange;
  useEffect(() => {
    statusCb.current?.(status);
  }, [status]);

  // Replay / Reload the embed in place without navigating away
  const handleReplay = useCallback(() => {
    setStatus('loading');
    setRenderCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!permalink || !host) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    let cancelled = false;

    // embed.js REPLACES this node with an iframe, so React must never own the child nodes directly.
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', `${permalink}?utm_source=ig_embed&utm_campaign=loading`);
    bq.setAttribute('data-instgrm-version', '14');
    if (captioned) bq.setAttribute('data-instgrm-captioned', '');
    bq.style.cssText =
      'background:#FFF;border:0;border-radius:16px;margin:0 auto;max-width:500px;min-width:320px;padding:0;width:100%;box-shadow:0 10px 30px rgba(0,0,0,0.5);';

    const a = document.createElement('a');
    a.href = permalink;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'View this Reel on Instagram';
    a.style.cssText = 'display:block;padding:16px;color:#6b21a8;font-size:13px;text-align:center;';
    bq.appendChild(a);
    host.replaceChildren(bq);

    const observer = new MutationObserver(() => {
      if (host.querySelector('iframe')) {
        setStatus('rendered');
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });

    loadInstagramEmbedScript()
      .then(() => {
        if (!cancelled) {
          window.instgrm?.Embeds.process();
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('script-blocked');
      });

    const timer = window.setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'timeout' : s));
    }, 12000);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timer);
      host.replaceChildren();
    };
  }, [permalink, captioned, renderCount]);

  if (status === 'invalid') {
    return (
      <div className="w-full max-w-[460px] rounded-2xl border border-rose-500/30 bg-rose-950/30 p-5 text-center">
        <AlertCircle className="w-5 h-5 text-rose-300 mx-auto mb-2" />
        <p className="text-xs text-rose-100">{parsed.ok ? '' : parsed.reason}</p>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
      <div className="relative w-full max-w-[480px] rounded-2xl overflow-hidden bg-[#120D24] shadow-2xl">
        {/* Host container: embed.js automatically calculates iframe height */}
        <div
          ref={hostRef}
          className={`w-full transition-opacity duration-300 ${
            status === 'loading' ? 'min-h-[380px] opacity-0' : 'opacity-100'
          }`}
        />

        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#120D24] p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center animate-pulse shadow-lg shadow-purple-600/30">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-300 font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Initializing Instagram player…</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-[260px] leading-relaxed">
              Fetching Reel directly from Instagram's official embed service.
            </p>
          </div>
        )}
      </div>

      {/* Embedded Controls / Actions Bar */}
      {status === 'rendered' && (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-[11px] cursor-pointer"
            title="Replay Reel from start"
          >
            <RotateCcw className="w-3 h-3 text-purple-400" />
            <span>Replay Reel</span>
          </button>
          {permalink && (
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 border border-purple-500/20 transition-colors text-[11px]"
            >
              <span>View on Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {(status === 'script-blocked' || status === 'timeout') && permalink && (
        <div className="w-full max-w-[460px] text-center text-xs text-slate-300 flex flex-col items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-purple-950/50 border border-purple-500/30">
          <p className="text-[11px] leading-relaxed text-slate-200">
            {status === 'script-blocked'
              ? 'Instagram’s player script was blocked (ad-blocker, browser privacy shield, or Content-Security-Policy).'
              : 'Instagram player is taking longer than usual to initialize. The Reel may be restricted, or embedding may be restricted by the creator.'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
            <a
              href={permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-md"
            >
              <span>Open on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

