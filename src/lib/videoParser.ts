/**
 * Video & Social Media Media Source Parser Utility
 * Handles YouTube, Instagram, and Direct Video File classification cleanly without fake fallbacks.
 */

/**
 * Checks if a URL points to a YouTube video, short, or embed
 */
export function isYouTubeVideoUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.includes('youtube.com') ||
    trimmed.includes('youtu.be') ||
    trimmed.includes('youtube-nocookie.com')
  );
}

/**
 * Checks if a URL points to an Instagram post, reel, or shortcode
 */
export function isInstagramUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.includes('instagram.com') ||
    trimmed.includes('instagr.am') ||
    /^[A-Za-z0-9_-]{5,30}$/.test(url.trim())
  );
}

/**
 * Checks if a URL points directly to a playable video file (MP4, WebM, OGG, M3U8)
 */
export function isDirectVideoFileUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (isYouTubeVideoUrl(trimmed) || isInstagramUrl(trimmed)) {
    return false;
  }
  return (
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg') ||
    trimmed.endsWith('.m3u8') ||
    trimmed.includes('/video/upload/') ||
    trimmed.includes('.mp4?') ||
    trimmed.includes('.webm?')
  );
}

/**
 * Converts raw YouTube URLs into responsive iframe embed URLs
 */
export function parseYouTubeEmbedUrl(url?: string, autoplay: boolean = true): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If already an embed URL
  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('youtube-nocookie.com/embed/')) {
    const hasParams = trimmed.includes('?');
    return `${trimmed}${hasParams ? '&' : '?'}rel=0&modestbranding=1&playsinline=1${autoplay ? '&autoplay=1' : ''}`;
  }

  // Extract standard 11-char YouTube ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${autoplay ? '&autoplay=1' : ''}`;
  }

  return trimmed;
}

export const getYouTubeEmbedUrl = parseYouTubeEmbedUrl;

/**
 * Extracts YouTube video ID for fetching HD thumbnail
 */
export function getYouTubeVideoId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.trim().match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  return null;
}

/**
 * Returns YouTube High Quality thumbnail image URL
 */
export function getYouTubeThumbnailUrl(url?: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

/**
 * Converts Instagram Reel or Post URLs to proper embed iframe format
 */
export function parseInstagramEmbedUrl(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  const match = trimmed.match(/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed/`;
  }

  if (/^[A-Za-z0-9_-]{5,30}$/.test(trimmed)) {
    return `https://www.instagram.com/reel/${trimmed}/embed/`;
  }

  return trimmed;
}

export type ReelMediaSourceType = 'instagram' | 'youtube' | 'direct_video' | 'none';

export interface ResolvedReelSource {
  type: ReelMediaSourceType;
  streamUrl: string;
  isYouTube: boolean;
  isInstagram: boolean;
  isDirectVideo: boolean;
}

/**
 * Resolves media source classification for a Reel item.
 * Strictly avoids fake YouTube fallbacks for Instagram Reels.
 */
export function resolveReelStream(videoUrl?: string, reelUrl?: string): ResolvedReelSource {
  // 1. Direct Video File (MP4, WebM, etc.)
  if (videoUrl && isDirectVideoFileUrl(videoUrl)) {
    return {
      type: 'direct_video',
      streamUrl: videoUrl,
      isYouTube: false,
      isInstagram: false,
      isDirectVideo: true,
    };
  }

  // 2. YouTube Video URL
  if (videoUrl && isYouTubeVideoUrl(videoUrl)) {
    return {
      type: 'youtube',
      streamUrl: parseYouTubeEmbedUrl(videoUrl, true),
      isYouTube: true,
      isInstagram: false,
      isDirectVideo: false,
    };
  }

  // 3. Instagram Reel URL
  const candidateUrl = reelUrl || videoUrl;
  if (candidateUrl && isInstagramUrl(candidateUrl)) {
    return {
      type: 'instagram',
      streamUrl: candidateUrl,
      isYouTube: false,
      isInstagram: true,
      isDirectVideo: false,
    };
  }

  // 4. No valid playable source
  return {
    type: 'none',
    streamUrl: candidateUrl || '',
    isYouTube: false,
    isInstagram: false,
    isDirectVideo: false,
  };
}
