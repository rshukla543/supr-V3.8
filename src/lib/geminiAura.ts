import { GoogleGenAI } from '@google/genai';
import { AuraTheme, AuraThemeId, AURA_THEMES, setActiveAuraTheme } from './auraEngine';

export interface AIHarmonyResult {
  themeId: AuraThemeId;
  poeticMantra: string;
  chakraNote: string;
}

/**
 * Harmonizes the portal's atmosphere using Gemini AI or contextual Ayurvedic intelligence
 */
export async function harmonizeAuraWithAI(intentionPrompt?: string): Promise<AIHarmonyResult> {
  const currentHour = new Date().getHours();
  let recommendedThemeId: AuraThemeId = 'midnight-lotus';

  // Ayurvedic time-of-day circadian rhythm:
  // 04:00 - 08:00 (Brahma Muhurta / Morning) -> Vedic Dawn
  // 08:00 - 16:00 (Pitta / Sun Radiance) -> Surya Solstice
  // 16:00 - 20:00 (Kapha / Water Flow) -> Prana Cyan
  // 20:00 - 04:00 (Vata / Cosmos / Stillness) -> Midnight Lotus
  if (currentHour >= 4 && currentHour < 8) {
    recommendedThemeId = 'vedic-dawn';
  } else if (currentHour >= 8 && currentHour < 16) {
    recommendedThemeId = 'surya-solstice';
  } else if (currentHour >= 16 && currentHour < 20) {
    recommendedThemeId = 'prana-cyan';
  } else {
    recommendedThemeId = 'midnight-lotus';
  }

  try {
    const ai = new GoogleGenAI();
    const prompt = `You are the holistic aura alchemist for Supriya Bhavsar, a luxury 500-HR yoga mentor from Vadodara, Gujarat.
Based on this time of day (${new Date().toLocaleTimeString()}) and practitioner intention ("${intentionPrompt || 'Deep stillness & elevated balance'}"):
Choose one of these 4 themes:
1) "midnight-lotus" (Cosmic violet & stardust)
2) "surya-solstice" (Warm gold & solar prana)
3) "vedic-dawn" (Himalayan rose & spiritual aurora)
4) "prana-cyan" (Bioluminescent fluid unwind)

Return JSON with:
{
  "themeId": "midnight-lotus" | "surya-solstice" | "vedic-dawn" | "prana-cyan",
  "poeticMantra": "Short 1-line Sanskrit/English meditation affirmation (under 12 words)",
  "chakraNote": "Which energy center is attuned (e.g. Anahata Heart or Sahasrara Crown)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      if (parsed.themeId && AURA_THEMES[parsed.themeId as AuraThemeId]) {
        recommendedThemeId = parsed.themeId as AuraThemeId;
        setActiveAuraTheme(recommendedThemeId);
        return {
          themeId: recommendedThemeId,
          poeticMantra: parsed.poeticMantra || AURA_THEMES[recommendedThemeId].mantra,
          chakraNote: parsed.chakraNote || 'Sahasrara • Crown Attunement',
        };
      }
    }
  } catch (err) {
    console.info('Contextual Vedic circadian rhythm active:', err);
  }

  // Graceful fallback based on selected theme
  setActiveAuraTheme(recommendedThemeId);
  const theme = AURA_THEMES[recommendedThemeId];
  return {
    themeId: recommendedThemeId,
    poeticMantra: theme.mantra,
    chakraNote: `${theme.element} • Conscious Circadian Flow`,
  };
}
