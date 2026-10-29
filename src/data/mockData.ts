import { VideoContent, ServiceItem } from '../types';

export const VIDEO_DATA: VideoContent[] = [
  // Yoga & Fitness
  {
    id: 'yoga-1',
    title: '20-Min Morning Vinyasa for Core Stability & Nervous System Reset',
    category: 'Yoga & Fitness',
    duration: '22:15',
    views: '142K views',
    date: '3 days ago',
    description: 'Awaken your spine, calibrate your breathing pattern, and ground into quiet confidence with this full-body morning flow.',
    tags: ['Vinyasa Flow', 'Morning Ritual', 'All Levels'],
    thumbnailGradient: 'from-[#4D705E] via-[#385746] to-[#1D3328]',
    thumbnailAccent: '#E5ECE7',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Centering & Pranayama' },
      { time: '3:45', title: 'Gentle Cat-Cow & Hip Warmup' },
      { time: '8:20', title: 'Sun Salutation A & B' },
      { time: '14:30', title: 'Standing Balances & Warrior Flow' },
      { time: '19:10', title: 'Supine Twist & Savasana' },
    ]
  },
  {
    id: 'yoga-2',
    title: 'De-Stress Evening Yin: Hip Openers & Deep Myofascial Release',
    category: 'Yoga & Fitness',
    duration: '31:40',
    views: '98K views',
    date: '1 week ago',
    description: 'Long holds and mindful props to release stored tension in hips, lower back, and hamstrings after a taxing work day.',
    tags: ['Yin Yoga', 'Hip Mobility', 'Stress Relief'],
    thumbnailGradient: 'from-[#6E5A44] via-[#524130] to-[#2C2117]',
    thumbnailAccent: '#F4EFE6',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Setting the Sacred Space' },
      { time: '4:15', title: 'Supported Butterfly Pose' },
      { time: '12:00', title: 'Dragonfly & Half Frog' },
      { time: '22:30', title: 'Reclined Pigeon' },
      { time: '28:00', title: 'Yoga Nidra Integration' },
    ]
  },
  {
    id: 'yoga-3',
    title: 'Posture Rehab & Desk Worker Sequence: Neck, Shoulders & Thoracic Spine',
    category: 'Yoga & Fitness',
    duration: '16:50',
    views: '210K views',
    date: '2 weeks ago',
    description: 'Counteract the tech-neck slouch with biomechanically targeted mobility drills and restorative shoulder flossing.',
    tags: ['Postural Alignment', 'Mobility', 'Desk Reset'],
    thumbnailGradient: 'from-[#3A5346] via-[#283C32] to-[#16231D]',
    thumbnailAccent: '#CBD9D0',
    accentIcon: 'yoga',
    chapters: [
      { time: '0:00', title: 'Breath Biomechanics' },
      { time: '3:10', title: 'Cervical Spine Retraction' },
      { time: '7:40', title: 'Thread the Needle & Eagle Arms' },
      { time: '13:00', title: 'Chest Expansion against wall' },
    ]
  },

  // Lifestyle Vlogs
  {
    id: 'vlog-1',
    title: 'A Realistic Sunday in My Life: High-Protein Vegan Meal Prep & Digital Detox',
    category: 'Lifestyle Vlogs',
    duration: '24:08',
    views: '84K views',
    date: '5 days ago',
    description: 'Cook with me as I prepare 4 gut-friendly plant-based lunches, clean my studio altar, and discuss setting boundary rituals.',
    tags: ['Meal Prep', 'Plant Based', 'Mindful Living'],
    thumbnailGradient: 'from-[#5C6E58] via-[#485645] to-[#243022]',
    thumbnailAccent: '#EADECE',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'Sunrise Matcha & Journaling' },
      { time: '4:30', title: 'Farmer\'s Market Haul' },
      { time: '10:15', title: 'Batch Cooking Golden Lentil Bowls' },
      { time: '18:00', title: 'Evening Sound Bath & Offline Hours' },
    ]
  },
  {
    id: 'vlog-2',
    title: 'My 14-Day Silent Meditation Retreat in Himachal: What Really Happened',
    category: 'Lifestyle Vlogs',
    duration: '28:35',
    views: '195K views',
    date: '3 weeks ago',
    description: 'Reflections on solitude, facing mental chatter, emotional catharsis, and lessons I brought back to my everyday coaching.',
    tags: ['Meditation', 'Mindset', 'Retreat Travel'],
    thumbnailGradient: 'from-[#4D5D53] via-[#334239] to-[#1C2621]',
    thumbnailAccent: '#D8C5AF',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'The Decision to Go Offline' },
      { time: '6:20', title: 'The Hardest Days (3 to 6)' },
      { time: '15:10', title: 'The Breakthrough' },
      { time: '22:40', title: 'Integrating Back into Civilization' },
    ]
  },
  {
    id: 'vlog-3',
    title: 'Building a Home Sanctuary: Minimalist Studio Tour & Lighting Setup',
    category: 'Lifestyle Vlogs',
    duration: '18:12',
    views: '67K views',
    date: '1 month ago',
    description: 'Transforming an ordinary apartment nook into a grounded sanctuary using natural timber, linen, soft lighting, and air-purifying greenery.',
    tags: ['Home Sanctuary', 'Aesthetic Room Tour', 'Wellness Space'],
    thumbnailGradient: 'from-[#7A6A55] via-[#5C4F3F] to-[#30281F]',
    thumbnailAccent: '#F3F6F4',
    accentIcon: 'vlog',
    chapters: [
      { time: '0:00', title: 'Space Philosophy & Principles' },
      { time: '4:50', title: 'Sustainable Props & Mats' },
      { time: '11:20', title: 'Aromatherapy & Soundscapes' },
    ]
  },

  // Shorts / Reels
  {
    id: 'reel-1',
    title: 'Fix Your Downward Dog in 30 Seconds: 3 Micro-Adjustments',
    category: 'Shorts/Reels',
    duration: '0:48',
    views: '680K views',
    date: 'Yesterday',
    description: 'Stop dumping weight into your wrists. External rotation of biceps + soft bend in knees transforms your posture instantly.',
    tags: ['Form Check', 'Quick Fix', 'Yoga Tips'],
    thumbnailGradient: 'from-[#3F6352] via-[#2A4437] to-[#17271F]',
    thumbnailAccent: '#CBD9D0',
    accentIcon: 'reel'
  },
  {
    id: 'reel-2',
    title: 'My 3-Minute 4-7-8 Breathing Sequence for Instant Anxiety Relief',
    category: 'Shorts/Reels',
    duration: '0:59',
    views: '412K views',
    date: '4 days ago',
    description: 'Inhale 4, hold 7, exhale 8 with an audible sigh. Activates the parasympathetic vagal nerve anywhere, anytime.',
    tags: ['Breathwork', 'Nervous System', 'Calm'],
    thumbnailGradient: 'from-[#6E543C] via-[#4F3B29] to-[#2B1F14]',
    thumbnailAccent: '#EADECE',
    accentIcon: 'reel'
  },
  {
    id: 'reel-3',
    title: 'What I Eat in a Day as a 500hr Certified Yogi (No Calorie Counting)',
    category: 'Shorts/Reels',
    duration: '0:55',
    views: '890K views',
    date: '1 week ago',
    description: 'Whole foods, intuitive nourishment, warm digestive teas, and balanced plant proteins that fuel active practice.',
    tags: ['What I Eat', 'Nutrition', 'Intuitive Eating'],
    thumbnailGradient: 'from-[#4D705E] via-[#355243] to-[#1C2C23]',
    thumbnailAccent: '#F4EFE6',
    accentIcon: 'reel'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'yoga-1on1',
    title: '1-on-1 Online Yoga',
    subtitle: 'Private Movement Mentorship',
    badge: 'Limited to 8 Students / Season',
    priceEstimate: 'Quarterly Cohort',
    description: 'Intimate bespoke coaching designed for those recovering from injuries, deepening alignment, or building an unbreakable home practice.',
    features: [
      'Comprehensive 60-min biomechanical assessment',
      '4x monthly 1-on-1 live 60-minute video sessions',
      'Personalized video sequence recordings for home self-practice',
      'Direct WhatsApp voice note access for form questions',
      'Progressive mobility and pranayama weekly roadmap'
    ],
    ctaText: 'Join the Waitlist',
    isPopular: true,
    type: 'fitness'
  },
  {
    id: 'diet-plans',
    title: 'Custom Diet Plans',
    subtitle: 'Holistic & Plant-Focused Nutrition',
    badge: 'Next Intake Opens Soon',
    priceEstimate: '8-Week Program',
    description: 'Say goodbye to fad diets. Develop sustainable energy, gut vitality, and hormonal balance grounded in evidence and ancient Ayurvedic wisdom.',
    features: [
      'Deep dive health history & metabolic lifestyle intake',
      'Weekly anti-inflammatory meal planner with adaptable swaps',
      'Custom macro & micro breakdown tailored to your activity level',
      'Printable pantry overhaul & grocery shopping cheat-sheets',
      'Bi-weekly 30-min strategy review calls with Supriya'
    ],
    ctaText: 'Join the Waitlist',
    type: 'nutrition'
  },
  {
    id: 'brand-collabs',
    title: 'Brand Collaborations',
    subtitle: 'Intentional & Ethical Partnerships',
    badge: 'Media Kit Available',
    priceEstimate: 'Select Partnerships',
    description: 'Dedicated to partnering with conscious brands in sustainable activewear, clean beauty, non-toxic living, and wellness retreats.',
    features: [
      'Authentic multi-platform storytelling (YouTube, Reels, Newsletter)',
      'High-production 4K lifestyle photography and video assets',
      'Dedicated integration in high-performing morning routines & vlogs',
      'Engaged audience of 120,000+ mindful wellness enthusiasts',
      'Transparent analytics, deliverables report, and licensing options'
    ],
    ctaText: 'Inquire for Partnership',
    type: 'collaboration'
  }
];
