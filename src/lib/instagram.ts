/**
 * Strict Instagram URL parsing.
 * - Never substitutes a default/placeholder Reel.
 * - Never treats a bare string as a shortcode.
 * - Returns a reason the admin can act on.
 */

export type ParsedInstagramUrl =
  | {
      ok: true;
      shortcode: string;
      kind: 'reel' | 'p';
      permalink: string;
      embedUrl: string;
    }
  | { ok: false; reason: string };

const SHORTCODE_RE = /^[A-Za-z0-9_-]{5,30}$/;
const POST_SEGMENTS = new Set(['reel', 'reels', 'p', 'tv']);

export function parseInstagramUrl(input?: string | null): ParsedInstagramUrl {
  if (!input || typeof input !== 'string' || !input.trim()) {
    return { ok: false, reason: 'Paste an Instagram Reel link.' };
  }

  const raw = input.trim();
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { ok: false, reason: 'That is not a valid URL.' };
  }

  const host = url.hostname.toLowerCase().replace(/^(www|m)\./, '');
  if (host !== 'instagram.com' && host !== 'instagr.am') {
    return { ok: false, reason: 'This is not an instagram.com link.' };
  }

  const parts = url.pathname.split('/').filter(Boolean);

  if (parts[0]?.toLowerCase() === 'share') {
    return {
      ok: false,
      reason:
        'Instagram "share" links cannot be embedded. Open the Reel and copy its normal link (…/reel/CODE/).',
    };
  }

  // Supports /reel/CODE, /p/CODE, /tv/CODE and /username/reel/CODE
  const idx = POST_SEGMENTS.has(parts[0]?.toLowerCase())
    ? 0
    : POST_SEGMENTS.has(parts[1]?.toLowerCase())
    ? 1
    : -1;

  const code = idx >= 0 ? parts[idx + 1] : undefined;
  if (!code || !SHORTCODE_RE.test(code)) {
    return {
      ok: false,
      reason: 'No Reel code found. Expected a link like https://www.instagram.com/reel/XXXXXXXXXXX/',
    };
  }

  const kind: 'reel' | 'p' = parts[idx].toLowerCase() === 'p' ? 'p' : 'reel';
  const permalink = `https://www.instagram.com/${kind}/${code}/`;
  return { ok: true, shortcode: code, kind, permalink, embedUrl: `${permalink}embed/` };
}

export function isInstagramUrl(url?: string | null): boolean {
  return parseInstagramUrl(url).ok;
}
