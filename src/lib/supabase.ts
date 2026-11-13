import { createClient } from '@supabase/supabase-js';
import {
  VideoContent,
  InstagramReel,
  ServiceItem,
  GalleryImage,
  WaitlistSubmission,
  NewsletterSubscriber,
  SiteSettings,
  Testimonial,
  BrandSponsor,
  DailyIntention,
  HeroSectionData,
  BlogEntry,
} from '../types';
import { VIDEO_DATA, INSTAGRAM_REELS, SERVICES_DATA } from '../data/mockData';
import { sendConfirmationEmail } from './emailService';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl =
  metaEnv.VITE_SUPABASE_URL || 'https://eialqaovgaphyhpmeunu.supabase.co';
const supabaseAnonKey =
  metaEnv.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYWxxYW92Z2FwaHlocG1ldW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNTYyNzQsImV4cCI6MjEwODgzMjI3NH0.LAKcBiy1zQpIpFu6KwZqo-QJJ6zUYqvbFkvoDes76K4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  // 1. Asana & Flow (8 images)
  {
    id: 'gal-asana-1',
    title: 'Urdhva Dhanurasana (Wheel Pose)',
    folder: 'Asana & Flow',
    caption: 'Deep thoracic spine expansion at sunrise over the sacred Ganges river.',
    gradientHint: 'from-purple-950/80 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
  },
  {
    id: 'gal-asana-2',
    title: 'Natarajasana (Lord of the Dance)',
    folder: 'Asana & Flow',
    caption: 'Finding poised pelvic alignment and an unwavering focal drishti.',
    gradientHint: 'from-indigo-950/80 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
  },
  {
    id: 'gal-asana-3',
    title: 'Bakasana (Crow Pose) Float',
    folder: 'Asana & Flow',
    caption: 'Core suspension, wrist engagement, and shoulder protraction mechanics.',
    gradientHint: 'from-violet-950/80 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
  },
  {
    id: 'gal-asana-4',
    title: 'Eka Pada Rajakapotasana (King Pigeon)',
    folder: 'Asana & Flow',
    caption: 'Releasing stored emotional psoas tension with deep breath cycles.',
    gradientHint: 'from-purple-900/70 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
  },
  {
    id: 'gal-asana-5',
    title: 'Pincha Mayurasana (Forearm Balance)',
    folder: 'Asana & Flow',
    caption: 'Inversion practice defying gravity with focused spinal stacking.',
    gradientHint: 'from-indigo-900/70 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
  },
  {
    id: 'gal-asana-6',
    title: 'Virabhadrasana III (Warrior III)',
    folder: 'Asana & Flow',
    caption: 'Grounding single-leg stability, glute firing, and horizontal energy line.',
    gradientHint: 'from-violet-900/70 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
  },
  {
    id: 'gal-asana-7',
    title: 'Paschimottanasana (Seated Forward Bend)',
    folder: 'Asana & Flow',
    caption: 'Gentle somatic hamstring unwinding and introspective stillness.',
    gradientHint: 'from-purple-950/80 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    displayOrder: 7,
  },
  {
    id: 'gal-asana-8',
    title: 'Vrikshasana (Tree Pose at Dawn)',
    folder: 'Asana & Flow',
    caption: 'Rooting into earth like an ancient banyan tree in Vadodara.',
    gradientHint: 'from-slate-900 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80',
    displayOrder: 8,
  },

  // 2. Studio & Space (8 images)
  {
    id: 'gal-studio-1',
    title: 'Himalayan Singing Bowls & Brass Altar',
    folder: 'Studio & Space',
    caption: 'Hand-hammered brass bells, sacred incense, and linen meditation props.',
    gradientHint: 'from-purple-900/60 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    displayOrder: 9,
  },
  {
    id: 'gal-studio-2',
    title: 'Minimalist Bamboo Studio Nook',
    folder: 'Studio & Space',
    caption: 'Natural morning diffused light calibrated for circadian stillness.',
    gradientHint: 'from-slate-900 via-purple-950/50 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=800&q=80',
    displayOrder: 10,
  },
  {
    id: 'gal-studio-3',
    title: 'Aura Quartz & Botanical Aromatics',
    folder: 'Studio & Space',
    caption: 'Pure lavender mist and selenite crystals cleansing the shala air.',
    gradientHint: 'from-purple-950/70 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-2e67d268d8ef?auto=format&fit=crop&w=800&q=80',
    displayOrder: 11,
  },
  {
    id: 'gal-studio-4',
    title: 'Organic Cork Mats & Cotton Bolsters',
    folder: 'Studio & Space',
    caption: 'Sustainable natural studio essentials providing non-slip tactile grounding.',
    gradientHint: 'from-indigo-950/60 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=800&q=80',
    displayOrder: 12,
  },
  {
    id: 'gal-studio-5',
    title: 'Somatic Sound Bath Sanctorum',
    folder: 'Studio & Space',
    caption: 'Acoustic sanctuary setting resonance frequencies at 432Hz theta state.',
    gradientHint: 'from-violet-950/80 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    displayOrder: 13,
  },
  {
    id: 'gal-studio-6',
    title: 'Zen Garden & Lotus Terracotta Basin',
    folder: 'Studio & Space',
    caption: 'Water elements bringing negative ions and serene micro-climate inside.',
    gradientHint: 'from-purple-900/60 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    displayOrder: 14,
  },
  {
    id: 'gal-studio-7',
    title: 'Palo Santo & Beeswax Candle Ritual',
    folder: 'Studio & Space',
    caption: 'Smokeless burning rituals anchoring mental transitions into quietude.',
    gradientHint: 'from-amber-950/60 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    displayOrder: 15,
  },
  {
    id: 'gal-studio-8',
    title: 'Vadodara Heritage Shala Arches',
    folder: 'Studio & Space',
    caption: 'Historic architectural geometry framing contemplative private sessions.',
    gradientHint: 'from-slate-900 via-indigo-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&w=800&q=80',
    displayOrder: 16,
  },

  // 3. Travel & Retreats (8 images)
  {
    id: 'gal-travel-1',
    title: 'Rishikesh Dawn Ghats Chanting',
    folder: 'Travel & Retreats',
    caption: 'Misty banks of the holy river where classical Vinyasa was born.',
    gradientHint: 'from-purple-950/70 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
    displayOrder: 17,
  },
  {
    id: 'gal-travel-2',
    title: 'Ubud Rice Terrace Meditation',
    folder: 'Travel & Retreats',
    caption: 'Mid-morning stillness enveloped by tropical canopy mist and birdsong.',
    gradientHint: 'from-indigo-950/70 via-purple-950/40 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 18,
  },
  {
    id: 'gal-travel-3',
    title: 'Dharamshala Mountain Shala',
    folder: 'Travel & Retreats',
    caption: 'Crisp cedar air and pine scents filling lungs during silent walking meditation.',
    gradientHint: 'from-slate-900 via-purple-950/60 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 19,
  },
  {
    id: 'gal-travel-4',
    title: 'Varkala Cliffside Sunset Flow',
    folder: 'Travel & Retreats',
    caption: 'Ocean waves crashing below as we flow through evening Chandra Namaskar.',
    gradientHint: 'from-purple-900/80 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 20,
  },
  {
    id: 'gal-travel-5',
    title: 'Ladakh High-Altitude Pranayama',
    folder: 'Travel & Retreats',
    caption: 'Breathing consciously at 11,000 feet amidst barren Himalayan beauty.',
    gradientHint: 'from-indigo-950 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    displayOrder: 21,
  },
  {
    id: 'gal-travel-6',
    title: 'Gokarna Beachside Yin Sessions',
    folder: 'Travel & Retreats',
    caption: 'Soft golden sands providing gentle yielding support for restorative postures.',
    gradientHint: 'from-amber-950/70 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    displayOrder: 22,
  },
  {
    id: 'gal-travel-7',
    title: 'Himalayan Forest Bathing (Shinrin-yoku)',
    folder: 'Travel & Retreats',
    caption: 'Absorbing phytoncides and tuning nervous system to natural rhythms.',
    gradientHint: 'from-slate-900 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 23,
  },
  {
    id: 'gal-travel-8',
    title: 'Spiti Valley Monastic Stillness',
    folder: 'Travel & Retreats',
    caption: 'Timeless monastery silence cultivating deep, unshakeable equanimity.',
    gradientHint: 'from-indigo-950/80 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 24,
  },

  // 4. Casual & Lifestyle (8 images)
  {
    id: 'gal-life-1',
    title: 'Ceremonial Matcha & Morning Journal',
    folder: 'Casual & Lifestyle',
    caption: 'Slow mornings without screens, emails, or sensory overload.',
    gradientHint: 'from-purple-900/50 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    displayOrder: 25,
  },
  {
    id: 'gal-life-2',
    title: 'Organic Herbal Ayurvedic Infusions',
    folder: 'Casual & Lifestyle',
    caption: 'Vibrant tulsi leaves and golden turmeric brewed for internal vitality.',
    gradientHint: 'from-purple-950/70 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    displayOrder: 26,
  },
  {
    id: 'gal-life-3',
    title: 'Vadodara Sunset Walk & Contemplation',
    folder: 'Casual & Lifestyle',
    caption: 'Golden hour strolls along tranquil Sayaji Baug gardens.',
    gradientHint: 'from-amber-950/50 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 27,
  },
  {
    id: 'gal-life-4',
    title: 'Sattvic Nourishment Harvest Bowl',
    folder: 'Casual & Lifestyle',
    caption: 'Seasonal roasted roots, tahini, sprouting greens, and pomegranate seeds.',
    gradientHint: 'from-indigo-950/60 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    displayOrder: 28,
  },
  {
    id: 'gal-life-5',
    title: 'Linen Loungewear & Reading Altar',
    folder: 'Casual & Lifestyle',
    caption: 'Comfortable natural fibers honoring breathability and ease.',
    gradientHint: 'from-purple-900/60 via-slate-900 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    displayOrder: 29,
  },
  {
    id: 'gal-life-6',
    title: 'Cacao Ceremony & Community Circle',
    folder: 'Casual & Lifestyle',
    caption: 'Heart-opening raw heirloom cacao shared with fellow seekers.',
    gradientHint: 'from-violet-950/70 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    displayOrder: 30,
  },
  {
    id: 'gal-life-7',
    title: 'Circadian Sunlight Gaze Routine',
    folder: 'Casual & Lifestyle',
    caption: 'Setting morning cortisol cues naturally with early photon exposure.',
    gradientHint: 'from-amber-950/60 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
    displayOrder: 31,
  },
  {
    id: 'gal-life-8',
    title: 'Evening Digital Detox & Herbal Bath',
    folder: 'Casual & Lifestyle',
    caption: 'Epsom salts, essential rosemary oils, and unconditional silence.',
    gradientHint: 'from-slate-900 via-purple-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    displayOrder: 32,
  },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  heroBadge: '500-HR RYT • Somatic Yoga & Lifestyle Alchemist',
  headline: 'Find Your Balance. Elevate Your Lifestyle.',
  subtext:
    'Escape digital fatigue and reclaim somatic vitality. Through the alchemy of dynamic Vinyasa, deep fascial unwinding, and conscious daily rituals, I guide high-achievers into grounded mental stillness and effortless strength.',
  primaryCta: 'Start Training',
  secondaryCta: 'Watch Latest Video',
  bioQuote: 'Movement is not about performance. It is an act of returning home.',
  bioStory:
    'For over eight years, I navigated the unrelenting cadence of corporate tech until severe nervous system burnout compelled me to step off the treadmill and re-learn what it means to actually inhabit the human body. My search brought me to Rishikesh and Bali for 500+ hours of advanced classical Vinyasa and somatic breathwork. Today, based out of Vadodara, Gujarat, I lead immersive retreats, bespoke 1-on-1 mentorship, and digital holistic masterclasses.',
  logoUrl: '',
  heroPortraitUrl: 'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg',
  name: 'Supriya Bhavsar',
  location: 'Vadodara, Gujarat',
  managerName: 'Shlok Brahmbhatt',
  managerHandle: '@shlok.brahmbhatt',
  managementEmail: 'management@supriyabhavsar.com',
  instagramHandle: '@supriya_9508',
  youtubeChannel: '@supriyabhavsar7343',
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@example.com',
    roleOrLocation: 'Private Mentorship Client • Vadodara & Ahmedabad',
    rating: 5,
    message: 'Training 1-on-1 with Supriya radically re-architected how I handle executive burnout. Her somatic alignment methods eliminated 4 years of chronic thoracic pain within 6 weeks. She doesn\'t just teach postures—she teaches conscious physical liberation.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: 'test-2',
    name: 'Rahul Desai',
    email: 'rahul.desai@innovatecorp.in',
    roleOrLocation: 'Tech Founder & Asana Practitioner • Surat & Mumbai',
    rating: 5,
    message: 'As a startup founder constantly battling screen posture and fatigue, Supriya’s precision with fascia unwinding and pelvic neutral biomechanics has been game changing. Her guidance is grounded, scientifically rigorous, and deeply restorative.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-02-02T14:20:00Z',
  },
  {
    id: 'test-3',
    name: 'Priya Patel',
    email: 'priya.patel@wellnessindia.org',
    roleOrLocation: 'Holistic Nutritionist • Vadodara, Gujarat',
    rating: 5,
    message: 'The custom diet & Ayurvedic rhythm plan designed by Supriya restored my circadian vitality after years of irregular travel. Her philosophy honors real food, cyclical energy, and genuine self-love. I have never felt more balanced in my skin.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-02-18T09:15:00Z',
  },
  {
    id: 'test-4',
    name: 'Devanshi Joshi',
    email: 'devanshi.joshi@designstudio.in',
    roleOrLocation: 'Architect & Asana Practitioner • Ahmedabad, Gujarat',
    rating: 5,
    message: 'Supriya’s morning alignment routines cleared my chronic neck and shoulder stiffness. Her classes are pure medicine—she bridges traditional Patanjali philosophy with modern spinal ergonomics seamlessly.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-02-24T11:00:00Z',
  },
  {
    id: 'test-5',
    name: 'Chirag Mehta',
    email: 'chirag.mehta@barodafit.com',
    roleOrLocation: 'CrossFit Athlete & Breathwork Student • Vadodara, Gujarat',
    rating: 5,
    message: 'Coming from high-intensity lifting, I had severely tight hips and shallow breathing. Supriya taught me how to actually utilize diaphragmatic breath to double my mobility and recovery speed.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-03-01T16:45:00Z',
  },
];

export const INITIAL_BRAND_SPONSORS: BrandSponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Manduka India',
    tagline: 'Eco-Conscious Yoga Mats & Bio-Grip Blocks',
    category: 'Yoga Gear',
    logoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://manduka.com?ref=supriyabhavsar',
    displayOrder: 1,
  },
  {
    id: 'sponsor-2',
    name: 'Kama Ayurveda',
    tagline: 'Pure Ayurvedic Elixirs, Kumkumadi Oils & Botanicals',
    category: 'Ayurvedic Wellness',
    logoUrl: 'https://images.unsplash.com/photo-1608248597359-2e67d268d8ef?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://kamaayurveda.com?ref=supriyabhavsar',
    displayOrder: 2,
  },
  {
    id: 'sponsor-3',
    name: 'Liforme',
    tagline: 'Intelligent Alignment Alignment System Mats',
    category: 'Performance Gear',
    logoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://liforme.com?ref=supriyabhavsar',
    displayOrder: 3,
  },
  {
    id: 'sponsor-4',
    name: 'Conscious Food',
    tagline: 'Organic Wood-Pressed Oils & Heritage Grains',
    category: 'Holistic Nutrition',
    logoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://consciousfood.com?ref=supriyabhavsar',
    displayOrder: 4,
  },
  {
    id: 'sponsor-5',
    name: 'Vahdam India',
    tagline: 'Direct-from-Source Himalayan Herbal Teas',
    category: 'Tea & Adaptogens',
    logoUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://vahdam.com?ref=supriyabhavsar',
    displayOrder: 5,
  },
  {
    id: 'sponsor-6',
    name: 'Alo Yoga',
    tagline: 'Mindful Movement & Studio-to-Street Wear',
    category: 'Activewear',
    logoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=240&q=80',
    affiliateUrl: 'https://aloyoga.com?ref=supriyabhavsar',
    displayOrder: 6,
  },
];

export const INITIAL_DAILY_INTENTION: DailyIntention = {
  id: 'daily-intention-1',
  quoteText: 'The breath is the bridge which connects life to consciousness, uniting the body and the mind in pure stillness.',
  theme: 'Sthira Sukham Asanam (Steadiness and Ease)',
  sanskritWord: 'Prana & Dharana',
  sanskritMeaning: 'Life-force breath and unwavering steady focus in the present moment.',
  isActive: true,
  updatedAt: new Date().toISOString(),
};


// ----------------------------------------------------------------------
// STORAGE HELPERS (gallery-images & site-assets)
// ----------------------------------------------------------------------

export async function uploadMediaFile(
  file: File,
  bucketName: string = 'gallery-images',
  folderName: string = 'uploads'
): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const cleanExt = fileExt.toLowerCase().replace(/[^a-z0-9]/g, '');
    const fileName = `${folderName}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;
    const filePath = `${folderName}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.warn(`Supabase storage upload notice [${bucketName}]:`, uploadError.message);
      // Fallback: create an object URL or Data URL for preview
      return URL.createObjectURL(file);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.warn('Storage helper fallback:', err);
    return URL.createObjectURL(file);
  }
}

export async function uploadGalleryImageFile(file: File): Promise<string> {
  return uploadMediaFile(file, 'gallery-images', 'gallery');
}

// ----------------------------------------------------------------------
// DATA FETCHERS & MUTATIONS
// ----------------------------------------------------------------------

export async function getVideos(): Promise<VideoContent[]> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_videos');
      return local ? JSON.parse(local) : VIDEO_DATA;
    }

    const fetchedVideos: VideoContent[] = data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      duration: item.duration,
      views: item.views,
      date: item.date,
      description: item.description,
      videoUrl: item.video_url || 'https://www.youtube.com/watch?v=sTANio_2E0Q',
      customThumbnailUrl: item.custom_thumbnail_url || undefined,
      tags: item.tags || [],
      thumbnailGradient: item.thumbnail_gradient,
      thumbnailAccent: item.thumbnail_accent,
      accentIcon: item.category === 'Lifestyle Vlogs' ? 'vlog' : item.category === 'Reels (Instagram)' ? 'reel' : 'yoga',
      chapters: item.chapters || [],
    }));

    // Ensure all 12 masterclasses (3 for Yoga, 3 for Pranayam, 3 for Biomechanics, 3 for Strength) and 4 Lifestyle Vlogs are present
    const existingIds = new Set(fetchedVideos.map((v) => v.id));
    const merged = [...fetchedVideos];
    for (const preset of VIDEO_DATA) {
      if (!existingIds.has(preset.id)) {
        merged.push(preset);
      }
    }
    return merged;
  } catch {
    const local = localStorage.getItem('supriya_videos');
    return local ? JSON.parse(local) : VIDEO_DATA;
  }
}

export async function upsertVideo(video: VideoContent): Promise<void> {
  const current = await getVideos();
  const exists = current.some((v) => v.id === video.id);
  const updated = exists ? current.map((v) => (v.id === video.id ? video : v)) : [video, ...current];
  localStorage.setItem('supriya_videos', JSON.stringify(updated));

  try {
    await supabase.from('videos').upsert({
      id: video.id,
      title: video.title,
      category: video.category,
      duration: video.duration,
      views: video.views,
      date: video.date,
      description: video.description,
      video_url: video.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      custom_thumbnail_url: video.customThumbnailUrl || null,
      tags: video.tags,
      thumbnail_gradient: video.thumbnailGradient,
      thumbnail_accent: video.thumbnailAccent,
      chapters: video.chapters || [],
    });
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

export async function deleteVideo(id: string): Promise<void> {
  const current = await getVideos();
  const filtered = current.filter((v) => v.id !== id);
  localStorage.setItem('supriya_videos', JSON.stringify(filtered));

  try {
    await supabase.from('videos').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

// REELS (Exclusively Instagram Reels)
export async function getReels(): Promise<InstagramReel[]> {
  try {
    const { data, error } = await supabase.from('instagram_reels').select('*').order('date', { ascending: false });
    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_reels');
      return local ? JSON.parse(local) : INSTAGRAM_REELS;
    }

    // Map each item and guarantee valid Instagram link
    const mapped: InstagramReel[] = data.map((item, idx) => {
      const fallback = INSTAGRAM_REELS[idx % INSTAGRAM_REELS.length];
      const validReelUrl = item.reel_url || fallback.reelUrl;

      return {
        id: item.id || fallback.id,
        caption: item.caption || fallback.caption,
        creatorHandle:
          item.creator_handle && item.creator_handle !== 'supriyawellness'
            ? item.creator_handle
            : 'supriya_9508',
        audioTrack: item.audio_track || fallback.audioTrack,
        likesCount: item.likes_count || fallback.likesCount,
        commentsCount: item.comments_count || fallback.commentsCount,
        sharesCount: item.shares_count || fallback.sharesCount,
        viewsCount: item.views_count || fallback.viewsCount,
        duration: item.duration || fallback.duration,
        gradient: item.gradient || fallback.gradient,
        coverAccent: item.cover_accent || fallback.coverAccent,
        poseName: item.pose_name || fallback.poseName,
        tags: item.tags && item.tags.length > 0 ? item.tags : fallback.tags,
        date: item.date || fallback.date,
        reelUrl: validReelUrl,
        videoUrl: item.video_url || item.videoUrl || fallback.videoUrl || undefined,
        thumbnailUrl: item.thumbnail_url || item.thumbnailUrl || fallback.thumbnailUrl,
      };
    });

    return mapped;
  } catch {
    const local = localStorage.getItem('supriya_reels');
    return local ? JSON.parse(local) : INSTAGRAM_REELS;
  }
}

export async function upsertReel(reel: InstagramReel): Promise<void> {
  const current = await getReels();
  const exists = current.some((r) => r.id === reel.id);
  const updated = exists ? current.map((r) => (r.id === reel.id ? reel : r)) : [reel, ...current];
  localStorage.setItem('supriya_reels', JSON.stringify(updated));

  try {
    await supabase.from('instagram_reels').upsert({
      id: reel.id,
      caption: reel.caption,
      creator_handle: reel.creatorHandle,
      audio_track: reel.audioTrack,
      likes_count: reel.likesCount,
      comments_count: reel.commentsCount,
      shares_count: reel.sharesCount,
      views_count: reel.viewsCount,
      duration: reel.duration,
      gradient: reel.gradient,
      cover_accent: reel.coverAccent,
      pose_name: reel.poseName,
      tags: reel.tags,
      date: reel.date,
      reel_url: reel.reelUrl || null,
      video_url: reel.videoUrl || null,
      thumbnail_url: reel.thumbnailUrl || null,
    });
  } catch (err) {
    console.warn('Supabase sync notice on upsertReel:', err);
  }
}

export async function deleteReel(id: string): Promise<void> {
  const current = await getReels();
  const filtered = current.filter((r) => r.id !== id);
  localStorage.setItem('supriya_reels', JSON.stringify(filtered));

  try {
    await supabase.from('instagram_reels').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice on deleteReel:', err);
  }
}

// SERVICES
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await supabase.from('services').select('*');
    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_services');
      return local ? JSON.parse(local) : SERVICES_DATA;
    }
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      badge: item.badge,
      priceEstimate: item.price_estimate,
      description: item.description,
      features: item.features || [],
      ctaText: item.cta_text,
      isPopular: item.is_popular,
      type: item.type,
    }));
  } catch {
    const local = localStorage.getItem('supriya_services');
    return local ? JSON.parse(local) : SERVICES_DATA;
  }
}

export async function upsertService(service: ServiceItem): Promise<void> {
  const current = await getServices();
  const exists = current.some((s) => s.id === service.id);
  const updated = exists ? current.map((s) => (s.id === service.id ? service : s)) : [...current, service];
  localStorage.setItem('supriya_services', JSON.stringify(updated));

  try {
    await supabase.from('services').upsert({
      id: service.id,
      title: service.title,
      subtitle: service.subtitle,
      badge: service.badge,
      price_estimate: service.priceEstimate,
      description: service.description,
      features: service.features,
      cta_text: service.ctaText,
      is_popular: service.isPopular,
      type: service.type,
    });
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

export async function deleteService(id: string): Promise<void> {
  const current = await getServices();
  const filtered = current.filter((s) => s.id !== id);
  localStorage.setItem('supriya_services', JSON.stringify(filtered));

  try {
    await supabase.from('services').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

// GALLERY
export async function getGallery(): Promise<GalleryImage[]> {
  try {
    const { data: carouselData } = await supabase
      .from('gallery_carousel')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: imagesData } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    const combined = [...(imagesData || []), ...(carouselData || [])];
    if (combined.length === 0) {
      const local = localStorage.getItem('supriya_gallery');
      return local ? JSON.parse(local) : INITIAL_GALLERY_IMAGES;
    }

    const uniqueMap = new Map<string, GalleryImage>();
    for (const item of combined) {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, {
          id: item.id,
          title: item.title,
          folder: item.folder,
          caption: item.caption,
          aspectRatio: item.aspect_ratio || '4/5',
          gradientHint: item.gradient_hint || 'from-purple-950 via-slate-900 to-black',
          displayOrder: item.display_order ?? 0,
          imageUrl: item.image_url || item.url,
        });
      }
    }
    return Array.from(uniqueMap.values());
  } catch {
    const local = localStorage.getItem('supriya_gallery');
    return local ? JSON.parse(local) : INITIAL_GALLERY_IMAGES;
  }
}

export async function upsertGalleryImage(image: GalleryImage): Promise<void> {
  const current = await getGallery();
  const exists = current.some((g) => g.id === image.id);
  const updated = exists ? current.map((g) => (g.id === image.id ? image : g)) : [...current, image];
  localStorage.setItem('supriya_gallery', JSON.stringify(updated));

  const payload = {
    id: image.id,
    title: image.title,
    folder: image.folder,
    caption: image.caption,
    aspect_ratio: image.aspectRatio,
    gradient_hint: image.gradientHint,
    display_order: image.displayOrder || current.length + 1,
    image_url: image.imageUrl,
  };

  try {
    await supabase.from('gallery_images').upsert(payload);
  } catch (err) {
    console.warn('Supabase sync notice gallery_images:', err);
  }
  try {
    await supabase.from('gallery_carousel').upsert(payload);
  } catch (err) {
    console.warn('Supabase sync notice gallery_carousel:', err);
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const current = await getGallery();
  const filtered = current.filter((g) => g.id !== id);
  localStorage.setItem('supriya_gallery', JSON.stringify(filtered));

  try {
    await supabase.from('gallery_images').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice gallery_images delete:', err);
  }
  try {
    await supabase.from('gallery_carousel').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice gallery_carousel delete:', err);
  }
}

// WAITLIST LEADS & SUBMISSIONS
export async function getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
  try {
    // 1. Check waitlist_leads first
    const { data: leads, error: leadErr } = await supabase
      .from('waitlist_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!leadErr && leads && leads.length > 0) {
      return leads.map((item) => ({
        id: item.id,
        serviceId: item.selected_service,
        fullName: item.name,
        email: item.email,
        experienceLevel: item.experience_level,
        goals: item.goals,
        status: item.status,
        createdAt: item.created_at,
      }));
    }

    // 2. Check waitlist_submissions fallback
    const { data, error } = await supabase
      .from('waitlist_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      const local = localStorage.getItem('supriya_waitlist');
      return local ? JSON.parse(local) : [];
    }
    return data.map((item) => ({
      id: item.id,
      serviceId: item.service_id,
      fullName: item.full_name,
      email: item.email,
      experienceLevel: item.experience_level,
      goals: item.goals,
      status: item.status,
      createdAt: item.created_at,
    }));
  } catch {
    const local = localStorage.getItem('supriya_waitlist');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveWaitlistSubmission(data: {
  serviceId: string;
  fullName: string;
  email: string;
  experienceLevel?: string;
  goals?: string;
}): Promise<void> {
  const newSubmission: WaitlistSubmission = {
    id: `lead-${Date.now()}`,
    serviceId: data.serviceId,
    fullName: data.fullName,
    email: data.email,
    experienceLevel: data.experienceLevel,
    goals: data.goals,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const current = await getWaitlistSubmissions();
  localStorage.setItem('supriya_waitlist', JSON.stringify([newSubmission, ...current]));

  // Trigger automated confirmation email via Resend & Supabase Edge Function
  sendConfirmationEmail({
    type: 'waitlist',
    to: data.email,
    name: data.fullName,
    details: {
      serviceName: data.serviceId,
      experienceLevel: data.experienceLevel,
      goals: data.goals,
    },
  }).catch((err) => console.warn('Email automation notice:', err));

  // Insert into waitlist_leads as explicitly requested
  try {
    await supabase.from('waitlist_leads').insert({
      name: data.fullName,
      email: data.email,
      selected_service: data.serviceId,
      experience_level: data.experienceLevel || 'All Levels',
      goals: data.goals || '',
      status: 'pending',
    });
  } catch (err) {
    console.warn('waitlist_leads insert notice:', err);
  }

  // Also insert into waitlist_submissions for schema parity
  try {
    await supabase.from('waitlist_submissions').insert({
      service_id: data.serviceId,
      full_name: data.fullName,
      email: data.email,
      experience_level: data.experienceLevel,
      goals: data.goals,
    });
  } catch {
    // ignore
  }
}

export async function updateWaitlistStatus(id: string, status: 'pending' | 'contacted' | 'accepted' | 'archived'): Promise<void> {
  const current = await getWaitlistSubmissions();
  const updated = current.map((s) => (s.id === id ? { ...s, status } : s));
  localStorage.setItem('supriya_waitlist', JSON.stringify(updated));

  try {
    await supabase.from('waitlist_leads').update({ status }).eq('id', id);
  } catch {
    // ignore
  }
  try {
    await supabase.from('waitlist_submissions').update({ status }).eq('id', id);
  } catch {
    // ignore
  }
}

// NEWSLETTER
export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      const local = localStorage.getItem('supriya_subscribers');
      return local ? JSON.parse(local) : [];
    }
    return data.map((item) => ({
      id: item.id,
      email: item.email,
      interest: item.interest,
      createdAt: item.created_at,
    }));
  } catch {
    const local = localStorage.getItem('supriya_subscribers');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveSubscriber(email: string, interest: string): Promise<void> {
  const newSub: NewsletterSubscriber = {
    id: `ns-${Date.now()}`,
    email,
    interest,
    createdAt: new Date().toISOString(),
  };

  const current = await getSubscribers();
  const exists = current.some((s) => s.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    localStorage.setItem('supriya_subscribers', JSON.stringify([newSub, ...current]));
  }

  // Trigger automated confirmation email via Resend & Supabase Edge Function
  sendConfirmationEmail({
    type: 'newsletter',
    to: email,
    details: {
      interest,
    },
  }).catch((err) => console.warn('Email automation notice:', err));

  try {
    await supabase.from('newsletter_subscribers').insert({
      email,
      interest,
    });
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

// SITE SETTINGS
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    // Try hero_section first for direct portrait and headline overrides
    let heroTableData: any = null;
    try {
      const { data: heroData } = await supabase.from('hero_section').select('*').limit(1).maybeSingle();
      if (heroData) {
        heroTableData = heroData;
      }
    } catch {
      // hero_section table not created yet, continue
    }

    const { data, error } = await supabase.from('site_settings').select('*');
    if ((error || !data || data.length === 0) && !heroTableData) {
      const local = localStorage.getItem('supriya_site_settings');
      return local ? JSON.parse(local) : INITIAL_SITE_SETTINGS;
    }

    const hero = data?.find((d) => d.key === 'hero')?.value || {};
    const bio = data?.find((d) => d.key === 'bio')?.value || {};
    const branding = data?.find((d) => d.key === 'branding')?.value || {};
    const contact = data?.find((d) => d.key === 'contact')?.value || {};

    return {
      heroBadge: heroTableData?.badge || hero.badge || INITIAL_SITE_SETTINGS.heroBadge,
      headline: heroTableData?.headline || hero.headline || INITIAL_SITE_SETTINGS.headline,
      subtext: heroTableData?.subtext || hero.subtext || INITIAL_SITE_SETTINGS.subtext,
      primaryCta: heroTableData?.primary_cta || hero.primary_cta || INITIAL_SITE_SETTINGS.primaryCta,
      secondaryCta: heroTableData?.secondary_cta || hero.secondary_cta || INITIAL_SITE_SETTINGS.secondaryCta,
      bioQuote: bio.quote || INITIAL_SITE_SETTINGS.bioQuote,
      bioStory: bio.story || INITIAL_SITE_SETTINGS.bioStory,
      logoUrl: branding.logo_url || hero.logo_url || INITIAL_SITE_SETTINGS.logoUrl,
      heroPortraitUrl: heroTableData?.portrait_url || branding.hero_portrait_url || hero.portrait_url || INITIAL_SITE_SETTINGS.heroPortraitUrl,
      name: branding.name || INITIAL_SITE_SETTINGS.name,
      location: branding.location || INITIAL_SITE_SETTINGS.location,
      managerName: contact.manager_name || INITIAL_SITE_SETTINGS.managerName,
      managerHandle: contact.manager_handle || INITIAL_SITE_SETTINGS.managerHandle,
      managementEmail: contact.management_email || INITIAL_SITE_SETTINGS.managementEmail,
      instagramHandle: contact.instagram_handle || INITIAL_SITE_SETTINGS.instagramHandle,
      youtubeChannel: contact.youtube_channel || INITIAL_SITE_SETTINGS.youtubeChannel,
    };
  } catch {
    const local = localStorage.getItem('supriya_site_settings');
    return local ? JSON.parse(local) : INITIAL_SITE_SETTINGS;
  }
}

export async function updateSiteSettings(settings: SiteSettings): Promise<void> {
  localStorage.setItem('supriya_site_settings', JSON.stringify(settings));

  try {
    await supabase.from('site_settings').upsert([
      {
        key: 'hero',
        value: {
          badge: settings.heroBadge,
          headline: settings.headline,
          subtext: settings.subtext,
          primary_cta: settings.primaryCta,
          secondary_cta: settings.secondaryCta,
          portrait_url: settings.heroPortraitUrl || null,
        },
      },
      {
        key: 'bio',
        value: {
          quote: settings.bioQuote,
          story: settings.bioStory,
        },
      },
      {
        key: 'branding',
        value: {
          logo_url: settings.logoUrl || null,
          hero_portrait_url: settings.heroPortraitUrl || null,
          name: settings.name || 'Supriya Bhavsar',
          location: settings.location || 'Vadodara, Gujarat',
        },
      },
      {
        key: 'contact',
        value: {
          manager_name: settings.managerName || 'Shlok Brahmbhatt',
          manager_handle: settings.managerHandle || '@shlok.brahmbhatt',
          management_email: settings.managementEmail || 'management@supriyabhavsar.com',
          instagram_handle: settings.instagramHandle || '@supriya_9508',
          youtube_channel: settings.youtubeChannel || '@supriyabhavsar_yoga',
        },
      },
    ]);
  } catch (err) {
    console.warn('Supabase sync notice on site_settings:', err);
  }

  // Also sync to hero_section table for schema parity
  try {
    await supabase.from('hero_section').upsert({
      id: 'primary',
      badge: settings.heroBadge,
      headline: settings.headline,
      subtext: settings.subtext,
      primary_cta: settings.primaryCta,
      secondary_cta: settings.secondaryCta,
      portrait_url: settings.heroPortraitUrl || null,
    });
  } catch (err) {
    console.warn('Supabase sync notice on hero_section:', err);
  }
}

// ----------------------------------------------------------------------
// BRAND SPONSORS
// ----------------------------------------------------------------------

export async function getBrandSponsors(): Promise<BrandSponsor[]> {
  try {
    const { data, error } = await supabase
      .from('brand_sponsors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_brand_sponsors');
      if (local) {
        return JSON.parse(local);
      }
      localStorage.setItem('supriya_brand_sponsors', JSON.stringify(INITIAL_BRAND_SPONSORS));
      return INITIAL_BRAND_SPONSORS;
    }

    return data.map((d) => ({
      id: d.id,
      name: d.name,
      tagline: d.tagline || undefined,
      category: d.category || undefined,
      logoUrl: d.logo_url || undefined,
      affiliateUrl: d.affiliate_url || undefined,
      displayOrder: d.display_order ?? 0,
    }));
  } catch {
    const local = localStorage.getItem('supriya_brand_sponsors');
    if (local) {
      return JSON.parse(local);
    }
    return INITIAL_BRAND_SPONSORS;
  }
}

export async function upsertBrandSponsor(sponsor: BrandSponsor): Promise<BrandSponsor> {
  const current = await getBrandSponsors();
  const exists = current.some((s) => s.id === sponsor.id);
  const updated = exists ? current.map((s) => (s.id === sponsor.id ? sponsor : s)) : [...current, sponsor];
  localStorage.setItem('supriya_brand_sponsors', JSON.stringify(updated));

  try {
    await supabase.from('brand_sponsors').upsert({
      id: sponsor.id,
      name: sponsor.name,
      tagline: sponsor.tagline || null,
      category: sponsor.category || null,
      logo_url: sponsor.logoUrl || null,
      affiliate_url: sponsor.affiliateUrl || null,
      display_order: sponsor.displayOrder ?? 0,
    });
  } catch (err) {
    console.warn('Supabase sync notice on brand_sponsors:', err);
  }

  return sponsor;
}

export async function deleteBrandSponsor(id: string): Promise<void> {
  const current = await getBrandSponsors();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem('supriya_brand_sponsors', JSON.stringify(updated));

  try {
    await supabase.from('brand_sponsors').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice on delete brand_sponsor:', err);
  }
}

// ----------------------------------------------------------------------
// DAILY INTENTION
// ----------------------------------------------------------------------

export async function getDailyIntention(): Promise<DailyIntention> {
  try {
    const { data, error } = await supabase
      .from('daily_intention')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      const local = localStorage.getItem('supriya_daily_intention');
      if (local) {
        return JSON.parse(local);
      }
      localStorage.setItem('supriya_daily_intention', JSON.stringify(INITIAL_DAILY_INTENTION));
      return INITIAL_DAILY_INTENTION;
    }

    return {
      id: data.id,
      quoteText: data.quote_text || INITIAL_DAILY_INTENTION.quoteText,
      theme: data.theme || INITIAL_DAILY_INTENTION.theme,
      sanskritWord: data.sanskrit_word || INITIAL_DAILY_INTENTION.sanskritWord,
      sanskritMeaning: data.sanskrit_meaning || INITIAL_DAILY_INTENTION.sanskritMeaning,
      isActive: data.is_active ?? true,
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  } catch {
    const local = localStorage.getItem('supriya_daily_intention');
    return local ? JSON.parse(local) : INITIAL_DAILY_INTENTION;
  }
}

export async function updateDailyIntention(patch: Partial<DailyIntention>): Promise<DailyIntention> {
  const current = await getDailyIntention();
  const updated: DailyIntention = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem('supriya_daily_intention', JSON.stringify(updated));

  try {
    await supabase.from('daily_intention').upsert({
      id: updated.id || 'current',
      quote_text: updated.quoteText,
      theme: updated.theme || null,
      sanskrit_word: updated.sanskritWord || null,
      sanskrit_meaning: updated.sanskritMeaning || null,
      is_active: updated.isActive ?? true,
      updated_at: updated.updatedAt,
    });
  } catch (err) {
    console.warn('Supabase sync notice on daily_intention:', err);
  }

  return updated;
}

// ----------------------------------------------------------------------
// TESTIMONIALS (Transformations & Stories + Review Moderation)
function cleanIndianTestimonials(items: Testimonial[]): Testimonial[] {
  const hasForeign = items.some(
    (t) =>
      t.name.toLowerCase().includes('elena') ||
      t.name.toLowerCase().includes('marcus') ||
      t.name.toLowerCase().includes('rostova')
  );
  if (hasForeign) {
    localStorage.setItem('supriya_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    return INITIAL_TESTIMONIALS;
  }
  return items;
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_testimonials');
      if (local) {
        const parsed: Testimonial[] = cleanIndianTestimonials(JSON.parse(local));
        return parsed.filter((t) => t.isApproved);
      }
      return INITIAL_TESTIMONIALS.filter((t) => t.isApproved);
    }

    const fetched = data.map((t) => ({
      id: String(t.id),
      name: t.name,
      email: t.email,
      message: t.message,
      imageUrl: t.image_url || undefined,
      rating: t.rating ?? 5,
      roleOrLocation: t.role_or_location || undefined,
      isApproved: Boolean(t.is_approved),
      createdAt: t.created_at || new Date().toISOString(),
    }));
    return cleanIndianTestimonials(fetched);
  } catch {
    const local = localStorage.getItem('supriya_testimonials');
    if (local) {
      const parsed: Testimonial[] = cleanIndianTestimonials(JSON.parse(local));
      return parsed.filter((t) => t.isApproved);
    }
    return INITIAL_TESTIMONIALS.filter((t) => t.isApproved);
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_testimonials');
      if (local) {
        return cleanIndianTestimonials(JSON.parse(local));
      }
      localStorage.setItem('supriya_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }

    const fetched = data.map((t) => ({
      id: String(t.id),
      name: t.name,
      email: t.email,
      message: t.message,
      imageUrl: t.image_url || undefined,
      rating: t.rating ?? 5,
      roleOrLocation: t.role_or_location || undefined,
      isApproved: Boolean(t.is_approved),
      createdAt: t.created_at || new Date().toISOString(),
    }));
    return cleanIndianTestimonials(fetched);
  } catch {
    const local = localStorage.getItem('supriya_testimonials');
    if (local) {
      return cleanIndianTestimonials(JSON.parse(local));
    }
    localStorage.setItem('supriya_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    return INITIAL_TESTIMONIALS;
  }
}

export async function submitTestimonial(payload: {
  name: string;
  email: string;
  message: string;
  imageUrl?: string;
  rating?: number;
  roleOrLocation?: string;
}): Promise<Testimonial> {
  const newTestimonial: Testimonial = {
    id: `test-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    message: payload.message,
    imageUrl: payload.imageUrl,
    rating: payload.rating ?? 5,
    roleOrLocation: payload.roleOrLocation || 'Practitioner',
    isApproved: false, // strictly pending approval
    createdAt: new Date().toISOString(),
  };

  const current = await getAllTestimonials();
  const updated = [newTestimonial, ...current];
  localStorage.setItem('supriya_testimonials', JSON.stringify(updated));

  try {
    await supabase.from('testimonials').insert({
      id: newTestimonial.id,
      name: newTestimonial.name,
      email: newTestimonial.email,
      message: newTestimonial.message,
      image_url: newTestimonial.imageUrl || null,
      rating: newTestimonial.rating,
      role_or_location: newTestimonial.roleOrLocation,
      is_approved: false,
    });
  } catch (err) {
    console.warn('Supabase sync notice on testimonial submit:', err);
  }

  return newTestimonial;
}

export async function toggleTestimonialApproval(id: string, isApproved: boolean): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.map((t) => (t.id === id ? { ...t, isApproved } : t));
  localStorage.setItem('supriya_testimonials', JSON.stringify(updated));

  try {
    await supabase.from('testimonials').update({ is_approved: isApproved }).eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice on toggle approval:', err);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.filter((t) => t.id !== id);
  localStorage.setItem('supriya_testimonials', JSON.stringify(updated));

  try {
    await supabase.from('testimonials').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice on delete testimonial:', err);
  }
}

// ----------------------------------------------------------------------
// BLOGS & VLOG ARTICLES (Dedicated /blog/:id full-page layouts)
// ----------------------------------------------------------------------
export const INITIAL_BLOGS: BlogEntry[] = [
  {
    id: 'blog-1',
    title: 'The Biomechanics of Surrender: Why Your Nervous System Needs Yin Yoga in 2026',
    slug: 'biomechanics-of-surrender-yin-yoga',
    excerpt: 'Modern hustle culture glorifies sympathetic fight-or-flight overdrive. Here is how slow, targeted connective tissue compression recalibrates the vagus nerve and restores cellular vitality.',
    content: `## The Modern Crisis of Sympathetic Overdrive

In our digital, hyper-connected world, our nervous systems are chronically bombarded by blue-light notifications, deadlines, and subconscious hypervigilance. Most practitioners arrive on their yoga mats carrying tight iliopsoas muscles, clenched jaws, and elevated baseline cortisol.

When you practice vigorous Yang vinyasa exclusively, you train strength and cardiovascular stamina, but you often reinforce the same sympathetic state of striving and output.

> "Surrender is not passive defeat; it is the deliberate neurological decision to stop contracting against reality."

## Fascial Plasticity & Deep Tissue Compression

Unlike dynamic movement which warms and contracts the red muscle fibers, Yin Yoga targets the dense white connective tissues—the fascial sheaths, tendons, and joint capsules.

### 1. The 3-Minute Rule for Collagen Fiber Relaxation
Collagen fibers in the deep myofascial matrix require at least 120 to 180 seconds of steady, gentle tensile pressure before phase transition occurs. Holding positions such as Sphinx, Dragonfly, or Sleeping Swan allows the extracellular matrix to rehydrate, releasing deep-seated cellular memory.

### 2. Vagal Tone Stimulation
Deep, diaphragmatic exhalations during long holds stimulate the ventral vagus nerve branch, signaling immediate parasympathetic safety to the heart, slowing pulse rate and down-regulating systemic inflammation.

## Practical Integration in Your Home Sanctuary

1. **Commit to Props:** Never force your joints into empty space. Use bolster support under the sternum or knees.
2. **Find Your 70% Edge:** Sensation should be dull, therapeutic, and sweet—never sharp, pinching, or burning.
3. **Rest in Savasana:** Give your fascia 5 full minutes of unmoving silence after practice to absorb the energetic recalibration.`,
    heroVideoUrl: 'https://www.youtube.com/watch?v=b1H3xO3x_Js',
    coverImageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    category: 'Somatic Science',
    tags: ['Yin Yoga', 'Vagus Nerve', 'Somatic Health', 'Fascia'],
    author: 'Supriya Bhavsar',
    authorRole: '500-HR Somatic Practitioner • Vadodara',
    authorImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80',
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'blog-2',
    title: 'Brahma Muhurta in Vadodara: The Ayurvedic Science of Rising at 4:30 AM',
    slug: 'brahma-muhurta-ayurvedic-morning-routine',
    excerpt: 'The ninety-six minutes before dawn contain a unique concentration of atmospheric prana. How waking before sunrise in Gujarat transformed my mental drishti and intuitive clarity.',
    content: `## The Sacred Hours Before Dawn

In classical Ayurvedic medicine, the 24-hour circadian cycle is divided into distinct doshic phases. The period from 2:00 AM to 6:00 AM is governed by Vata dosha—the element of ether and air, characterized by lightness, subtlety, and expansiveness.

The exact window known as **Brahma Muhurta** begins approximately 1 hour and 36 minutes before local sunrise. In Vadodara, when the city is still quiet and the cool breeze blows across the Vishwamitri, this stillness offers an irreplaceable spiritual portal.

> "The stillness of the dawn does not simply exist around you; it permeates the cavities of your heart when you sit in silence."

## The 4 Pillars of a Sattvic Morning Routine (Dinacharya)

### 1. Ushapan (Sacred Hydration)
Drink 500ml of warm water stored overnight in a pure copper vessel (Tamra Jal). This naturally balances all three doshas and gently awakens the peristaltic digestive fire.

### 2. Jivha Nirlekhana (Tongue Scraping)
Using a pure copper or silver tongue scraper, gently draw from back to front 7 times to eliminate toxins (Ama) accumulated during sleep.

### 3. Nadi Shodhana Pranayama
Sit with your spine stacked and practice 12 rounds of alternate nostril breathing. This harmonizes Ida (cooling parasympathetic) and Pingala (heating solar) nadis.

### 4. Ten Minutes of Drishti Stillness
Before checking any digital screen, simply watch the natural shifting of morning light across your sanctuary altar.`,
    heroVideoUrl: 'https://www.youtube.com/watch?v=glT0sH_p9z8',
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min read',
    category: 'Ayurvedic Living',
    tags: ['Brahma Muhurta', 'Ayurveda', 'Pranayama', 'Circadian Health'],
    author: 'Supriya Bhavsar',
    authorRole: '500-HR Somatic Practitioner • Vadodara',
    authorImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80',
    publishedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'blog-3',
    title: 'Sanctuary Architecture: How to Curate a High-Frequency Home Movement Space',
    slug: 'sanctuary-architecture-mindful-home-space',
    excerpt: 'Your physical environment directly mirrors and shapes your nervous system tone. A guide to lighting, non-toxic textures, sacred geometry, and minimalist studio curation.',
    content: `## Spatial Resonance & Psychological Safety

Your nervous system constantly conducts environmental neuroception—an unconscious scanning of your physical surroundings for threats versus safety. A cluttered, fluorescently lit room keeps the brain in low-grade cognitive load.

When you step into a dedicated movement space that smells of pure sandalwood and feels grounding beneath your feet, your brain instantly recognizes the cue to enter somatic presence.

### 1. Eliminating Overhead Blue Light
After 6:00 PM, never switch on bright overhead LED lights. Instead, use:
- Salt crystal lamps emitting gentle amber wavelengths (590-620nm)
- Pure beeswax candles that emit negative ions as they burn
- Floor-level diffused paper lanterns

This signals to your pineal gland that darkness has fallen, naturally ramping up endogenous melatonin production for deep restorative sleep.

### 2. Natural Fibers Over Synthetics
Your skin is your largest sensory organ. Replace polyester and acrylic rugs with:
- Unbleached organic cotton mats
- Heavy Belgian linen cushions
- Sustainable cork blocks and meditation zafus

### 3. Indoor Botanical Air Filters
Plants bring living prana and oxygen into your sanctuary. In our Vadodara studio, we cultivate:
- **Snake Plant (Sansevieria):** Releases oxygen overnight.
- **Holy Tulsi:** Sacred Ayurvedic medicinal herb that clears stagnant subtle energy.
- **Peace Lily:** Purifies airborne toxins while maintaining natural humidity.

Your home should be the place where you exhale all performance and return to pure being.`,
    heroVideoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
    coverImageUrl: 'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    category: 'Sanctuary Living',
    tags: ['Interior Sanctuary', 'Circadian Lighting', 'Ayurveda'],
    author: 'Supriya Bhavsar',
    authorRole: '500-HR Somatic Practitioner • Vadodara',
    authorImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80',
    publishedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

export async function getBlogs(): Promise<BlogEntry[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_blogs');
      if (local) {
        return JSON.parse(local);
      }
      localStorage.setItem('supriya_blogs', JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }

    return data.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      heroVideoUrl: b.hero_video_url || undefined,
      coverImageUrl: b.cover_image_url || undefined,
      readTime: b.read_time || '5 min read',
      category: b.category || 'Mindful Living',
      tags: b.tags || [],
      author: b.author || 'Supriya Bhavsar',
      authorRole: b.author_role || '500-HR Somatic Practitioner • Vadodara',
      authorImage: b.author_image || undefined,
      publishedAt: b.published_at || b.created_at || new Date().toISOString(),
      createdAt: b.created_at,
    }));
  } catch {
    const local = localStorage.getItem('supriya_blogs');
    if (local) {
      return JSON.parse(local);
    }
    return INITIAL_BLOGS;
  }
}

export async function getBlogById(idOrSlug: string): Promise<BlogEntry | null> {
  const all = await getBlogs();
  const found = all.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
  return found || null;
}

export async function upsertBlog(blog: BlogEntry): Promise<BlogEntry> {
  const current = await getBlogs();
  const exists = current.some((b) => b.id === blog.id);
  const updated = exists ? current.map((b) => (b.id === blog.id ? blog : b)) : [blog, ...current];
  localStorage.setItem('supriya_blogs', JSON.stringify(updated));

  try {
    await supabase.from('blogs').upsert({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      hero_video_url: blog.heroVideoUrl || null,
      cover_image_url: blog.coverImageUrl || null,
      read_time: blog.readTime,
      category: blog.category,
      tags: blog.tags,
      author: blog.author,
      author_role: blog.authorRole || null,
      author_image: blog.authorImage || null,
      published_at: blog.publishedAt,
    });
  } catch (err) {
    console.warn('Supabase sync notice on upsert blog:', err);
  }

  return blog;
}

export async function deleteBlog(id: string): Promise<void> {
  const current = await getBlogs();
  const updated = current.filter((b) => b.id !== id);
  localStorage.setItem('supriya_blogs', JSON.stringify(updated));

  try {
    await supabase.from('blogs').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice on delete blog:', err);
  }
}


