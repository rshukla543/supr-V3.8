/**
 * Dynamic Aura & Atmosphere Engine for Supriya's Luxury Portal
 * Powers celestial background themes, sacred geometry lighting, and AI Harmonization
 */

export type AuraThemeId = 'midnight-lotus' | 'surya-solstice' | 'vedic-dawn' | 'prana-cyan';

export interface AuraTheme {
  id: AuraThemeId;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  particleColors: string[];
  canvasBg: string;
  element: string;
  mantra: string;
}

export const AURA_THEMES: Record<AuraThemeId, AuraTheme> = {
  'midnight-lotus': {
    id: 'midnight-lotus',
    name: 'Midnight Lotus',
    tagline: 'Deep Cosmic Amethyst & Stardust',
    primaryColor: '#8B5CF6',
    secondaryColor: '#6366F1',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    particleColors: [
      'rgba(248, 250, 252, ',
      'rgba(233, 213, 255, ',
      'rgba(192, 132, 252, ',
      'rgba(255, 255, 255, ',
    ],
    canvasBg: '#0B0914',
    element: 'Ether (Akasha)',
    mantra: 'Om Shanti • Infinite Spacious Mind',
  },
  'surya-solstice': {
    id: 'surya-solstice',
    name: 'Surya Solstice',
    tagline: 'Solar Gold & Sunset Amber Prana',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    particleColors: [
      'rgba(254, 243, 199, ',
      'rgba(253, 230, 138, ',
      'rgba(245, 158, 11, ',
      'rgba(255, 255, 255, ',
    ],
    canvasBg: '#0E090F',
    element: 'Fire (Tejas)',
    mantra: 'Surya Namaskar • Radiance & Vitality',
  },
  'vedic-dawn': {
    id: 'vedic-dawn',
    name: 'Vedic Dawn',
    tagline: 'Himalayan Mystic Rose & Aurora',
    primaryColor: '#EC4899',
    secondaryColor: '#A855F7',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
    particleColors: [
      'rgba(254, 226, 226, ',
      'rgba(244, 114, 182, ',
      'rgba(192, 132, 252, ',
      'rgba(255, 255, 255, ',
    ],
    canvasBg: '#100814',
    element: 'Spirit (Bhakti)',
    mantra: 'Brahma Muhurta • Sacred Awakening',
  },
  'prana-cyan': {
    id: 'prana-cyan',
    name: 'Prana Cyan',
    tagline: 'Bioluminescent Vitality & River Flow',
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    accentGlow: 'rgba(6, 182, 212, 0.45)',
    particleColors: [
      'rgba(207, 250, 254, ',
      'rgba(165, 243, 252, ',
      'rgba(56, 189, 248, ',
      'rgba(255, 255, 255, ',
    ],
    canvasBg: '#070D18',
    element: 'Water (Jala)',
    mantra: 'Pranamaya Kosha • Fluid Unwinding',
  },
};

// Global event bus for aura changes
type AuraListener = (theme: AuraTheme) => void;
const listeners: Set<AuraListener> = new Set();
let currentThemeId: AuraThemeId = 'midnight-lotus';

export function getActiveAuraTheme(): AuraTheme {
  return AURA_THEMES[currentThemeId];
}

export function setActiveAuraTheme(themeId: AuraThemeId): void {
  if (AURA_THEMES[themeId]) {
    currentThemeId = themeId;
    const theme = AURA_THEMES[themeId];
    listeners.forEach((listener) => listener(theme));
  }
}

export function subscribeToAuraChanges(listener: AuraListener): () => void {
  listeners.add(listener);
  listener(getActiveAuraTheme());
  return () => {
    listeners.delete(listener);
  };
}
