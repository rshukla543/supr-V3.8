/**
 * Singleton Instagram Script Loader and Embed Processor
 * Ensures https://www.instagram.com/embed.js is loaded once safely,
 * avoiding race conditions, duplicate script tags, or unhandled script errors.
 */

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: (element?: HTMLElement | null) => void;
      };
    };
  }
}

let scriptState: 'idle' | 'loading' | 'loaded' | 'error' = 'idle';
let loadPromise: Promise<void> | null = null;

/**
 * Loads Instagram's official embed.js script safely.
 * Returns a promise that resolves when the script is loaded and window.instgrm is ready.
 */
export function loadInstagramEmbedScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window unavailable'));
  }

  // If already loaded and window.instgrm is ready
  if (window.instgrm?.Embeds) {
    scriptState = 'loaded';
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  // Check if script tag is already in DOM
  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src*="instagram.com/embed.js"]'
  );

  scriptState = 'loading';

  loadPromise = new Promise<void>((resolve, reject) => {
    const handleSuccess = () => {
      scriptState = 'loaded';
      resolve();
    };

    const handleError = (err: Event | string) => {
      scriptState = 'error';
      loadPromise = null;
      console.warn('Instagram embed.js script load error:', err);
      reject(new Error('Failed to load Instagram embed script'));
    };

    if (existingScript) {
      if (window.instgrm?.Embeds) {
        handleSuccess();
      } else {
        existingScript.addEventListener('load', handleSuccess, { once: true });
        existingScript.addEventListener('error', handleError, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;

    script.onload = () => handleSuccess();
    script.onerror = (e) => handleError(e);

    document.body.appendChild(script);
  });

  return loadPromise;
}

/**
 * Triggers Instagram's official Embeds.process() method on a target container or element.
 */
export async function processInstagramEmbeds(targetElement?: HTMLElement | null): Promise<boolean> {
  try {
    await loadInstagramEmbedScript();
    if (window.instgrm?.Embeds?.process) {
      if (targetElement) {
        window.instgrm.Embeds.process(targetElement);
      } else {
        window.instgrm.Embeds.process();
      }
      return true;
    }
  } catch (err) {
    console.warn('Notice: Could not process Instagram embed:', err);
  }
  return false;
}
