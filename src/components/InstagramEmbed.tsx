import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { parseInstagramUrl } from '../lib/instagram';
import { loadInstagramEmbedScript } from '../lib/instagramLoader';

/**
 * loading        – script/iframe not ready yet
 * rendered       – embed.js replaced our blockquote with Instagram's iframe.
 *                  NOTE: this proves the embed mounted, NOT that the post is
 *                  playable/available (decided inside Instagram's iframe).
 * script-blocked – embed.js failed to load (CSP, ad-blocker, network)
 * timeout        – nothing rendered after 12s (may still render later)
 * invalid        – the stored URL is not a valid Instagram post URL
 */
export type EmbedStatus = 'loading' | 'rendered' | 'script-blocked' | 'timeout' | 'invalid';

interface InstagramEmbedProps {
  url?: string;
  captioned?: boolean;
  onStatusChange?: (status: EmbedStatus) => void;
}

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  captioned = false,
  onStatusChange,
}) => {
  const parsed = useMemo(() => parseInstagramUrl(url), [url]);
  const permalink = parsed.ok ? parsed.permalink : null;

  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<EmbedStatus>(permalink ? 'loading' : 'invalid');

  const statusCb = useRef(onStatusChange);
  statusCb.current = onStatusChange;
  useEffect(() => {
    statusCb.current?.(status);
  }, [status]);

  useEffect(() => {
    const host = hostRef.current;
    if (!permalink || !host) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    let cancelled = false;

    // embed.js REPLACES this node with an iframe, so React must never own it.
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', `${permalink}?utm_source=ig_embed&utm_campaign=loading`);
    bq.setAttribute('data-instgrm-version', '14');
    if (captioned) bq.setAttribute('data-instgrm-captioned', '');
    bq.style.cssText =
      'background:#FFF;border:0;border-radius:12px;margin:0;max-width:540px;min-width:326px;padding:0;width:100%;';

    const a = document.createElement('a');
    a.href = permalink;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'View this Reel on Instagram';
    a.style.cssText = 'display:block;padding:16px;color:#6b21a8;font-size:13px;';
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
        if (!cancelled) window.instgrm?.Embeds.process();
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
  }, [permalink, captioned]);

  if (status === 'invalid') {
    return (
      <div className="w-full max-w-[400px] rounded-2xl border border-rose-500/30 bg-rose-950/30 p-5 text-center">
        <AlertCircle className="w-5 h-5 text-rose-300 mx-auto mb-2" />
        <p className="text-xs text-rose-100">{parsed.ok ? '' : parsed.reason}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative w-full max-w-[400px] rounded-2xl overflow-hidden bg-[#120D24]">
        {/* No fixed height: embed.js sizes the iframe to the Reel. */}
        <div ref={hostRef} className={status === 'loading' ? 'min-h-[360px]' : ''} />

        {status === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#120D24] p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center animate-pulse">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-purple-300 font-mono">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Loading Instagram player…</span>
            </div>
          </div>
        )}
      </div>

      {(status === 'script-blocked' || status === 'timeout') && permalink && (
        <div className="w-full max-w-[400px] text-center text-xs text-slate-300 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-purple-950/50 border border-purple-500/30">
          <p className="text-[11px]">
            {status === 'script-blocked'
              ? 'Instagram’s player script could not load (ad-blocker, network or Content-Security-Policy).'
              : 'The player has not appeared yet. The Reel may be private, age-restricted, have embedding turned off, or be slow to load.'}
          </p>
          <a
            href={permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors"
          >
            <span>Open on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
