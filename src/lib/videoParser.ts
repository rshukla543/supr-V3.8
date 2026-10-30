/**
 * Video URL Parser Utility for YouTube and Instagram
 * Robust converter for raw user URLs into safe, responsive embed targets
 */

/**
 * Converts raw YouTube URLs into valid responsive iframe embed URLs
 * Handles:
 * - https://www.youtube.com/watch?v=sTANio_2E0Q
 * - https://youtu.be/sTANio_2E0Q
 * - https://www.youtube.com/shorts/sTANio_2E0Q
 * - https://m.youtube.com/watch?v=sTANio_2E0Q
 * - Already formed embed URLs
 */
export function parseYouTubeEmbedUrl(url?: string, autoplay: boolean = true): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // If already an embed url
  if (trimmed.includes('youtube.com/embed/')) {
    const hasParams = trimmed.includes('?');
    return `${trimmed}${hasParams ? '&' : '?'}rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
  }

  // Extract standard 11-char YouTube ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
  }

  // Fallback to original url
  return trimmed;
}

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
 * e.g. https://www.instagram.com/reel/C-xyz123/ -> https://www.instagram.com/reel/C-xyz123/embed/
 */
export function parseInstagramEmbedUrl(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Check if reel or p format
  const match = trimmed.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  if (match && match[1]) {
    return `https://www.instagram.com/reel/${match[1]}/embed/`;
  }

  return trimmed;
}
