/**
 * Strict Instagram URL & Embed Code parsing.
 * - Supports direct URLs: /reel/CODE, /p/CODE, /tv/CODE, /username/reel/CODE
 * - Supports pasted official Instagram Embed codes (<blockquote class="instagram-media" ...>)
 * - Extracts canonical permalinks without tracking/query params
 * - Never substitutes a default/placeholder Reel
 * - Returns a clear reason when input is invalid
 */

export type ParsedInstagramUrl =
  | {
      ok: true;
      shortcode: string;
      kind: 'reel' | 'p';
      permalink: string;
      embedUrl: string;
      sourceType: 'url' | 'embed_code';
    }
  | { ok: false; reason: string };

const SHORTCODE_RE = /^[A-Za-z0-9_-]{5,35}$/;
const POST_SEGMENTS = new Set(['reel', 'reels', 'p', 'tv']);

/**
 * Safely extracts an Instagram URL from a pasted HTML embed code block
 */
function extractUrlFromEmbedCode(html: string): string | null {
  // 1. Look for data-instgrm-permalink="..." or '...'
  const permalinkMatch = html.match(/data-instgrm-permalink\s*=\s*["']([^"']+)["']/i);
  if (permalinkMatch && permalinkMatch[1]) {
    return permalinkMatch[1].replace(/&amp;/g, '&');
  }

  // 2. Look for href="https://www.instagram.com/reel/..." or /p/...
  const hrefMatch = html.match(/href\s*=\s*["'](https?:\/\/(?:www\.)?instagram\.com\/(?:reel|reels|p|tv)\/[^"'\s\?]+)/i);
  if (hrefMatch && hrefMatch[1]) {
    return hrefMatch[1];
  }

  // 3. Fallback: Any instagram link inside anchor tag
  const generalAnchorMatch = html.match(/<a\s+[^>]*href\s*=\s*["']([^"']+)["']/i);
  if (generalAnchorMatch && generalAnchorMatch[1]) {
    return generalAnchorMatch[1].replace(/&amp;/g, '&');
  }

  return null;
}

export function parseInstagramUrl(input?: string | null): ParsedInstagramUrl {
  if (!input || typeof input !== 'string' || !input.trim()) {
    return { ok: false, reason: 'Paste an Instagram Reel link or embed snippet.' };
  }

  let raw = input.trim();
  let isEmbedSnippet = false;

  // Check if user pasted an embed HTML block (<blockquote ...> or <iframe ...>)
  if (raw.includes('<') && (raw.includes('instagram-media') || raw.includes('instagram.com') || raw.includes('blockquote'))) {
    const extracted = extractUrlFromEmbedCode(raw);
    if (!extracted) {
      return {
        ok: false,
        reason: 'Could not find a valid Instagram permalink in the pasted embed code snippet.',
      };
    }
    raw = extracted;
    isEmbedSnippet = true;
  }

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
        'Instagram "share" links cannot be embedded directly. Open the Reel in your browser and copy its normal link (…/reel/CODE/).',
    };
  }

  // Supports /reel/CODE, /p/CODE, /tv/CODE, and /username/reel/CODE
  const idx = POST_SEGMENTS.has(parts[0]?.toLowerCase())
    ? 0
    : parts[1] && POST_SEGMENTS.has(parts[1]?.toLowerCase())
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
  return {
    ok: true,
    shortcode: code,
    kind,
    permalink,
    embedUrl: `${permalink}embed/`,
    sourceType: isEmbedSnippet ? 'embed_code' : 'url',
  };
}

export function isInstagramUrl(url?: string | null): boolean {
  return parseInstagramUrl(url).ok;
}

/**
 * Curated high-resolution fallback previews for standard yoga reels
 * when Instagram does not expose a public image without an oEmbed client token.
 */
const KNOWN_REEL_PREVIEWS: Record<string, string> = {
  C8qLd95M6P1: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
  C7pKd89x2Z9: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  C6oLk11z8X4: 'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=800&q=80',
  C5mLp92M4Q8: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
};

const GENERIC_YOGA_FALLBACKS = [
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
];

/**
 * Resolves a thumbnail image URL for an Instagram Reel.
 * 1. Checks if explicit thumbnailUrl is valid.
 * 2. Checks known shortcodes.
 * 3. Uses a deterministic hash fallback based on the URL so each Reel has a distinct image.
 */
export function resolveReelThumbnail(reel?: {
  reelUrl?: string;
  thumbnailUrl?: string;
  id?: string;
}): string {
  if (reel?.thumbnailUrl && reel.thumbnailUrl.trim().startsWith('http')) {
    return reel.thumbnailUrl.trim();
  }

  const parsed = parseInstagramUrl(reel?.reelUrl);
  if (parsed.ok && KNOWN_REEL_PREVIEWS[parsed.shortcode]) {
    return KNOWN_REEL_PREVIEWS[parsed.shortcode];
  }

  // Deterministic fallback based on shortcode or id
  const seed = parsed.ok ? parsed.shortcode : reel?.id || 'default';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % GENERIC_YOGA_FALLBACKS.length;
  return GENERIC_YOGA_FALLBACKS[index];
}


