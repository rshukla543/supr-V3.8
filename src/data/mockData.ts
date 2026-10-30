import { VideoContent, InstagramReel, ServiceItem } from '../types';

export const VIDEO_DATA: VideoContent[] = [
  // Yoga (YouTube)
  {
    id: 'yoga-yt-1',
    title: '25-Min Radiant Morning Vinyasa: Core Vitality & Solar Plexus Activation',
    category: 'Yoga (YouTube)',
    duration: '25:40',
    views: '168K views',
    date: '3 days ago',
    description: 'Awaken physical strength, ignite metabolic agni, and calibrate your somatic nervous system through fluid, alignment-focused sequences.',
    tags: ['Vinyasa Flow', 'Morning Power', 'All Levels'],
    thumbnailGradient: 'from-[#4C1D95] via-[#2E1065] to-[#0F0728]',
    thumbnailAccent: '#C084FC',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Centering & Pranayama Breath' },
      { time: '4:15', title: 'Spinal Waves & Cat-Cow Dynamic' },
      { time: '9:30', title: 'Surya Namaskar Dynamic Series' },
      { time: '16:00', title: 'Warrior III & Half Moon Balances' },
      { time: '21:40', title: 'Supine Spinal Release & Savasana' },
    ]
  },
  {
    id: 'yoga-yt-2',
    title: 'De-Stress Evening Yin: Deep Fascial Unwinding & Nervous System Downregulation',
    category: 'Yoga (YouTube)',
    duration: '34:10',
    views: '214K views',
    date: '1 week ago',
    description: 'Slow down with therapeutic 4-minute holds targeting deep connective tissue in hips, lower spine, and shoulders for profound sleep restoration.',
    tags: ['Yin Yoga', 'Somatic Release', 'Sleep Hygiene'],
    thumbnailGradient: 'from-[#3B0764] via-[#1E0638] to-[#090214]',
    thumbnailAccent: '#F59E0B',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Setting the Sacred Sanctuary' },
      { time: '3:50', title: 'Supported Supta Baddha Konasana' },
      { time: '12:15', title: 'Dragonfly & Lateral Side Opens' },
      { time: '22:00', title: 'Reclined Deer Pose' },
      { time: '29:30', title: 'Yoga Nidra Integration' },
    ]
  },
  {
    id: 'yoga-yt-3',
    title: 'Biomechanics of Handstands & Inversions: Shoulder Elevation Drills',
    category: 'Yoga (YouTube)',
    duration: '19:25',
    views: '129K views',
    date: '2 weeks ago',
    description: 'Demystifying arm balances through scientific scapular protraction, hollow body tension drills, and safe wall-assisted progressions.',
    tags: ['Inversion Lab', 'Biomechanics', 'Strength'],
    thumbnailGradient: 'from-[#581C87] via-[#2E1065] to-[#120726]',
    thumbnailAccent: '#A78BFA',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Wrist & Scapular Warmup' },
      { time: '4:10', title: 'Hollow Body Conditioning' },
      { time: '8:45', title: 'L-Stand at the Wall' },
      { time: '14:20', title: 'Floating Kickups & Exit Strategies' },
    ]
  },

  // Lifestyle Vlogs
  {
    id: 'vlog-1',
    title: 'A High-Vibration Sunday: High-Protein Plant Meals, Studio Tour & Altar Setup',
    category: 'Lifestyle Vlogs',
    duration: '26:12',
    views: '98K views',
    date: '5 days ago',
    description: 'Cook with me as I prepare anti-inflammatory gut-nourishing lunches, cleanse studio crystals with palo santo, and talk about boundary rituals.',
    tags: ['Plant Based', 'Studio Routine', 'Mindful Living'],
    thumbnailGradient: 'from-[#6B21A8] via-[#3B0764] to-[#140624]',
    thumbnailAccent: '#FBBF24',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'Sunrise Ceremonial Matcha' },
      { time: '5:20', title: 'Farmer\'s Market Whole Food Haul' },
      { time: '11:40', title: 'Cooking Golden Turmeric Bowls' },
      { time: '19:15', title: 'Offline Evening Winddown' },
    ]
  },
  {
    id: 'vlog-2',
    title: 'Inside My 10-Day Silent Vipassana in the Himalayas: What Unfolded',
    category: 'Lifestyle Vlogs',
    duration: '31:50',
    views: '280K views',
    date: '3 weeks ago',
    description: 'Unfiltered audio diary entries and reflections on psychological detox, confronting the shadow self, and integrating stillness into everyday city living.',
    tags: ['Vipassana', 'Meditation Retreat', 'Mental Health'],
    thumbnailGradient: 'from-[#4C1D95] via-[#260C54] to-[#0D041C]',
    thumbnailAccent: '#E9D5FF',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'Surrendering My Phone' },
      { time: '7:15', title: 'The Physical Pain of 10-hr Sittings' },
      { time: '16:40', title: 'The Breakthrough Moment' },
      { time: '24:50', title: 'Returning to the World' },
    ]
  },
  {
    id: 'vlog-3',
    title: 'Minimalist Apartment Sanctuary: Lighting, Linen & Spatial Geometry Tour',
    category: 'Lifestyle Vlogs',
    duration: '18:45',
    views: '76K views',
    date: '1 month ago',
    description: 'How to curate an intentional sanctuary in a small space using warm diffused lighting, natural organic materials, and botanical air purifiers.',
    tags: ['Home Sanctuary', 'Aesthetic Decor', 'Wellness Space'],
    thumbnailGradient: 'from-[#581C87] via-[#380E68] to-[#110424]',
    thumbnailAccent: '#F59E0B',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'The Philosophy of Space' },
      { time: '5:10', title: 'Lighting as Circadian Cue' },
      { time: '12:30', title: 'Sacred Meditation Altar' },
    ]
  }
];

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: 'reel-1',
    caption: 'Stop dumping weight into your wrists in Downward Dog! 🛑 Try this: externally rotate your upper biceps and micro-bend knees. Night and day difference!',
    creatorHandle: 'supriyawellness',
    audioTrack: '♫ Supriya • Somatic Morning Flow (Original Audio)',
    likesCount: '48.2K',
    commentsCount: '1.2K',
    sharesCount: '9.4K',
    viewsCount: '780K',
    duration: '0:42',
    gradient: 'from-violet-900 via-indigo-950 to-midnight-950',
    coverAccent: '#C084FC',
    poseName: 'Adho Mukha Svanasana Fix',
    tags: ['YogaTips', 'Biomechanics', 'FormCheck'],
    date: 'Yesterday'
  },
  {
    id: 'reel-2',
    caption: 'My emergency 3-minute 4-7-8 breathing practice when stress hits a 10/10. Inhale 4s, hold 7s, exhale with an audible sigh 8s. Save for later! 🫁✨',
    creatorHandle: 'supriyawellness',
    audioTrack: '♫ Ambient Crystal Sound Bowls (432Hz)',
    likesCount: '62.7K',
    commentsCount: '890',
    sharesCount: '18.1K',
    viewsCount: '940K',
    duration: '0:55',
    gradient: 'from-purple-900 via-violet-950 to-midnight-950',
    coverAccent: '#F59E0B',
    poseName: 'Vagal Nerve Reset',
    tags: ['Breathwork', 'AnxietyRelief', 'SomaticHealing'],
    date: '3 days ago'
  },
  {
    id: 'reel-3',
    caption: 'What I eat as a 500-HR Certified Yogi with zero calorie counting. Whole foods, warming digestive spices, and listening to hunger cues. 🥑🍵',
    creatorHandle: 'supriyawellness',
    audioTrack: '♫ Lo-Fi Morning Glow - Chillhop',
    likesCount: '34.9K',
    commentsCount: '450',
    sharesCount: '5.2K',
    viewsCount: '510K',
    duration: '0:50',
    gradient: 'from-indigo-900 via-purple-950 to-midnight-950',
    coverAccent: '#FBBF24',
    poseName: 'Plant Vitality Meal',
    tags: ['WhatIEat', 'HolisticNutrition', 'CleanEating'],
    date: '5 days ago'
  },
  {
    id: 'reel-4',
    caption: 'The 60-second morning spinal wave you need to do before checking your notifications. Unclench your jaw and unlock your hips! 🌅',
    creatorHandle: 'supriyawellness',
    audioTrack: '♫ Morning Dew - Supriya Ambient',
    likesCount: '91.4K',
    commentsCount: '2.1K',
    sharesCount: '32.6K',
    viewsCount: '1.4M',
    duration: '0:38',
    gradient: 'from-violet-950 via-purple-900 to-midnight-950',
    coverAccent: '#C084FC',
    poseName: 'Spinal Awakening Flow',
    tags: ['MorningRoutine', 'SpineHealth', 'Mobility'],
    date: '1 week ago'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'yoga-1on1',
    title: '1-on-1 Online Yoga',
    subtitle: 'Private Biomechanical Mentorship',
    badge: 'Limited to 8 Students / Season',
    priceEstimate: 'Quarterly Bespoke Cohort',
    description: 'Ultra-personalized movement calibration designed for high-performers recovering from posture imbalances, rehabilitating joints, or mastering advanced asana.',
    features: [
      'Comprehensive 75-min postural & mobility screen',
      '4x monthly 1-on-1 live 60-minute video mentoring',
      'Custom 4K sequence video library recorded specifically for you',
      'Direct WhatsApp priority voice notes for daily alignment feedback',
      'Weekly nervous system regulation & pranayama progressions'
    ],
    ctaText: 'Join the Waitlist',
    isPopular: true,
    type: 'fitness'
  },
  {
    id: 'diet-plans',
    title: 'Custom Diet Plans',
    subtitle: 'Metabolic & Sattvic Plant Nutrition',
    badge: 'Next Intake Window Active',
    priceEstimate: '8-Week Metabolic Reset',
    description: 'Ditch chronic inflammation and food anxiety. Craft an energizing nutrition blueprint blending modern biochemical science with ancient Ayurvedic wisdom.',
    features: [
      'In-depth metabolic lifestyle & circadian rhythm audit',
      'Custom anti-inflammatory weekly recipe blueprints & shopping lists',
      'Targeted herbal & adaptogenic supplementation protocol',
      'Dining-out and travel survival guide for frequent flyers',
      'Bi-weekly 30-min strategy review calls with Supriya'
    ],
    ctaText: 'Join the Waitlist',
    type: 'nutrition'
  },
  {
    id: 'brand-collabs',
    title: 'Brand Collaborations',
    subtitle: 'Conscious Luxury & Ethical Partnerships',
    badge: 'Media Kit Available',
    priceEstimate: 'Curated Brand Alignment',
    description: 'Partnering exclusively with visionary brands in sustainable luxury activewear, non-toxic living, bio-wellness technology, and conscious hospitality retreats.',
    features: [
      'Authentic storytelling across 120,000+ highly engaged followers',
      'Cinema-grade 4K lifestyle photography and video production',
      'Organic product integrations into viral Sunday vlogs & Reels',
      'Dedicated newsletter spotlight to 24,000+ conscious subscribers',
      'Comprehensive performance analytics & commercial licensing'
    ],
    ctaText: 'Inquire for Partnership',
    type: 'collaboration'
  }
];
