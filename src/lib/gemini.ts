import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client using environment variable or fallback
const metaEnv = (import.meta as any).env || {};
const apiKey =
  metaEnv.VITE_GEMINI_API_KEY ||
  metaEnv.GEMINI_API_KEY ||
  (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') ||
  '';

let aiInstance: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!apiKey) return null;
  if (!aiInstance) {
    try {
      aiInstance = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.warn('Gemini client initialization notice:', e);
      return null;
    }
  }
  return aiInstance;
}

export interface DayPlan {
  day: string;
  theme: string;
  topic: string;
  format: 'YouTube Masterclass' | 'Instagram Reel' | 'Mindful Blog' | 'Daily Intention' | string;
  captionHook: string;
  audioOrRaga: string;
  recommendedAudio?: string;
  biomechanicalCue: string;
  productionNotes: string;
}

export interface WeeklyPlanResult {
  overview: string;
  weeklyTheme?: string;
  targetAudienceEnergy?: string;
  coreIntention?: string;
  days: DayPlan[];
  generatedByAI: boolean;
}

const FALLBACK_WEEKLY_PLAN: WeeklyPlanResult = {
  overview:
    '7-Day Strategic Harmonization for Supriya Bhavsar: Balances restorative parasympathetic down-regulation with biomechanical strength progression and Vadodara cultural resonance.',
  weeklyTheme: 'Somatic Vagus Nerve Regulation & Biomechanics',
  targetAudienceEnergy: 'High-Stress Practitioners Seeking Deep Autonomic Grounding',
  coreIntention: 'Uncoil spinal tension and restore somatic trust through breath-calibrated movements.',
  generatedByAI: false,
  days: [
    {
      day: 'Monday',
      theme: 'Spinal Decompression & Vagus Reset',
      topic: 'Somatic Morning Mobility Flow (20 Min)',
      format: 'YouTube Masterclass',
      captionHook: 'Your posture is holding onto the emotional fatigue of the past week. Let’s uncoil it together.',
      audioOrRaga: 'Raag Bhairav • 432Hz Ambient Flute',
      recommendedAudio: 'Raag Bhairav • 432Hz Ambient Flute',
      biomechanicalCue: 'Anchor sit bones; lengthen cervical spine without chin protrusion.',
      productionNotes: 'Shoot in soft morning sunlight with bamboo studio accents.',
    },
    {
      day: 'Tuesday',
      theme: 'Pelvic Poise & Hip Unwinding',
      topic: '60-Second Deep Psoas Release for Desk Workers',
      format: 'Instagram Reel',
      captionHook: 'Sitting 8 hours tightens your iliopsoas. Stop doing generic lunges and try this 3-angle micro drill.',
      audioOrRaga: 'Original Audio: Gentle Singing Bowl Reverberation',
      biomechanicalCue: 'Tuck pelvis slightly (posterior tilt) before shifting weight forward.',
      productionNotes: 'Vertical 9:16 angle focusing on knee-to-hip alignment.',
    },
    {
      day: 'Wednesday',
      theme: 'Mindful Philosophy & Sacred Rituals',
      topic: 'Sattvic Living in Modern Gujarat: Circadian Reset',
      format: 'Mindful Blog',
      captionHook: 'Why waking up before sunrise (Brahma Muhurta) reshaped my nervous system resilience.',
      audioOrRaga: 'Quiet morning silence / Raag Ahir Bhairav',
      biomechanicalCue: 'Inward drishti meditation posture (Padmasana / Sukhasana).',
      productionNotes: 'Include recipe notes for Ayurvedic warm ginger-turmeric infusion.',
    },
    {
      day: 'Thursday',
      theme: 'Inversion Alignment & Shoulder Girdle',
      topic: 'Pincha Mayurasana (Forearm Balance) Wall Drills',
      format: 'Instagram Reel',
      captionHook: 'Struggling with balance? It’s not core weakness—it’s serratus anterior activation.',
      audioOrRaga: 'Trending Minimalist Deep House / Sitar Lo-fi',
      biomechanicalCue: 'Push floor away vigorously to protract shoulder blades; engage bandhas.',
      productionNotes: 'Slow-motion replay on shoulder stacking moment.',
    },
    {
      day: 'Friday',
      theme: 'Fascial Yin Yoga & Stillness',
      topic: '45-Min Parasympathetic Somatic Immersion',
      format: 'YouTube Masterclass',
      captionHook: 'Surrender the need to achieve. Let gravity hold you in this nourishing evening Yin sequence.',
      audioOrRaga: 'Raag Yaman • Tibetan Singing Bowls & Tanpura',
      biomechanicalCue: 'Zero muscle tension; relax breath into diaphragmatic 4-7-8 rhythm.',
      productionNotes: 'Dim evening studio lighting with beeswax candles.',
    },
    {
      day: 'Saturday',
      theme: 'Breathwork & Somatic Energy',
      topic: 'Nadi Shodhana & Bhramari for Anxiety Relief',
      format: 'Daily Intention',
      captionHook: 'Every inhale is vitality received; every exhale is gratitude surrendered.',
      audioOrRaga: 'Natural stream and bird soundscape from Pavagadh foothills',
      biomechanicalCue: 'Nasika mudra right hand; spine unmoving like Mount Meru.',
      productionNotes: 'Interactive press-and-hold meditation graphic.',
    },
    {
      day: 'Sunday',
      theme: 'Community Sanctuary & Retreat Journal',
      topic: 'Rishikesh Solitude: What 10 Days in Silence Taught Me',
      format: 'Mindful Blog',
      captionHook: 'We speak thousands of unnecessary words a day. What happens when you stop for 240 hours?',
      audioOrRaga: 'Ganges river water resonance & bells',
      biomechanicalCue: 'Gentle heart-opening Anahatasana stretch.',
      productionNotes: 'Editorial gallery layout with film-grain retreat photographs.',
    },
  ],
};

export async function generateWeeklyContentPlan(
  focusTheme: string = 'Somatic Vagus Nerve Regulation & Biomechanics'
): Promise<WeeklyPlanResult> {
  const client = getAIClient();

  if (!client) {
    return {
      ...FALLBACK_WEEKLY_PLAN,
      overview: `Strategic Weekly Plan for theme: "${focusTheme}". (Generated with curated agency templates; add GEMINI_API_KEY for real-time generative variants).`,
      generatedByAI: false,
    };
  }

  try {
    const prompt = `You are the lead content director and wellness strategist for Supriya Bhavsar (@supriya_9508), an Indian luxury yoga creator, wellness mentor, and conscious lifestyle influencer based in Vadodara, Gujarat.
Her audience values: biomechanical precision, somatic nervous system regulation, authentic Indian Vedic & Ayurvedic wisdom, and aesthetic minimalist calm.
Her brand colors are "Midnight Lotus" (#0B0914, deep violet, obsidian, soft silver glass).

Theme focus for this week: "${focusTheme}".

Generate a 7-day social content plan in JSON format. Provide an "overview" string and a "days" array with 7 items (Monday through Sunday).
For each day, include:
- day: string ("Monday", "Tuesday", etc.)
- theme: string
- topic: string
- format: "YouTube Masterclass" | "Instagram Reel" | "Mindful Blog" | "Daily Intention"
- captionHook: string (high-converting, mindful, engaging hook)
- audioOrRaga: string (appropriate classical Indian raga or ambient frequency)
- biomechanicalCue: string (anatomical alignment precision cue)
- productionNotes: string (visual style, props, studio setting)

Return strictly valid JSON with no markdown backticks if possible, or format as \`\`\`json { ... } \`\`\`.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    if (!text) {
      return FALLBACK_WEEKLY_PLAN;
    }

    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    const mappedDays: DayPlan[] = (Array.isArray(parsed.days) && parsed.days.length === 7 ? parsed.days : FALLBACK_WEEKLY_PLAN.days).map((d: any) => ({
      ...d,
      recommendedAudio: d.recommendedAudio || d.audioOrRaga || 'Raag Yaman • 432Hz Sound Healing',
      audioOrRaga: d.audioOrRaga || d.recommendedAudio || 'Raag Yaman • 432Hz Sound Healing',
    }));

    return {
      overview: parsed.overview || `Weekly strategy tuned for ${focusTheme}`,
      weeklyTheme: parsed.weeklyTheme || focusTheme,
      targetAudienceEnergy: parsed.targetAudienceEnergy || 'Urban Practitioners Seeking Grounding & Precision',
      coreIntention: parsed.coreIntention || 'Align somatic breathing with postural micro-adjustments.',
      days: mappedDays,
      generatedByAI: true,
    };
  } catch (err) {
    console.warn('Gemini Weekly Plan API error, falling back to curated plan:', err);
    return {
      ...FALLBACK_WEEKLY_PLAN,
      weeklyTheme: focusTheme,
      overview: `Strategic Weekly Plan for theme: "${focusTheme}". (Agency backup activated).`,
      generatedByAI: false,
    };
  }
}

export interface SuggestedTextResult {
  title: string;
  caption: string;
  tags: string[];
  biomechanicalCue: string;
}

export async function suggestCaptionAndTitle(params: {
  imageContext?: string;
  currentTitle?: string;
  folder?: string;
  category?: string;
}): Promise<SuggestedTextResult> {
  const { imageContext, currentTitle, folder, category } = params;
  const client = getAIClient();

  const fallback: SuggestedTextResult = {
    title: currentTitle || (folder ? `${folder} Stillness Flow` : 'Somatic Alignment Practice'),
    caption:
      'Finding balance not in rigidity, but in continuous gentle micro-adjustments. Root through your foundation, soften the shoulder blades down the back ribs, and let each breath deepen your drishti.',
    tags: ['Yoga', 'Biomechanics', 'Pranayam', 'Stillness', 'SomaticHealth'],
    biomechanicalCue:
      'Engage Pada Bandha (four corners of the feet), stack shoulders over pelvis, and maintain neutral lumbar curve.',
  };

  if (!client) {
    return fallback;
  }

  try {
    const prompt = `You are a high-end editorial copywriter for Supriya Bhavsar, an Indian yoga influencer (@supriya_9508, Vadodara, Gujarat).
Create an editorial title, mindful 3-sentence caption, 5 relevant hashtags, and 1 biomechanical cue for a new post.
Context:
Folder/Section: ${folder || category || 'Gallery'}
Current Working Title: ${currentTitle || 'Untitled'}
Details/Notes: ${imageContext || 'High quality yoga pose or mindfulness studio aesthetic'}

Return strictly JSON format:
{
  "title": "string",
  "caption": "string",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "biomechanicalCue": "string"
}`;

    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    if (!text) return fallback;

    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      title: parsed.title || fallback.title,
      caption: parsed.caption || fallback.caption,
      tags: Array.isArray(parsed.tags) ? parsed.tags : fallback.tags,
      biomechanicalCue: parsed.biomechanicalCue || fallback.biomechanicalCue,
    };
  } catch (err) {
    console.warn('Gemini suggestCaption API error:', err);
    return fallback;
  }
}
