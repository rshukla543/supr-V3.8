-- =========================================================================
-- SUPRIYA BHAVSAR - SEED DATA (SAFE UPSERTS & REAL INDIAN CONTEXT)
-- Name: Supriya Bhavsar
-- Location: Vadodara, Gujarat, India
-- Manager: @shlok.brahmbhatt (Shlok Brahmbhatt)
-- Instagram: @supriya_9508
-- =========================================================================

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (key, value)
VALUES
(
    'hero',
    '{
        "badge": "500-HR RYT • Somatic Yoga & Lifestyle Alchemist",
        "headline": "Find Your Balance. Elevate Your Lifestyle.",
        "subtext": "Rooted in Vadodara, Gujarat. Through somatic alignment, classical Vinyasa, and conscious rituals, I guide modern seekers into grounded mental stillness and effortless physical vitality.",
        "primary_cta": "Start Training",
        "secondary_cta": "Watch Latest Video",
        "portrait_url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85"
    }'::jsonb
),
(
    'bio',
    '{
        "quote": "Movement is not about performance. It is an act of returning home.",
        "story": "Based in Vadodara, Gujarat, I blend traditional Indian yogic philosophy with modern somatic movement science. Having studied deeply across Rishikesh, Kerala, and Gujarat, my mission is to liberate modern practitioners from digital fatigue and chronic postural stiffness.",
        "location": "Vadodara, Gujarat, India",
        "manager_name": "Shlok Brahmbhatt",
        "manager_handle": "@shlok.brahmbhatt",
        "instagram_handle": "@supriya_9508",
        "management_email": "management@supriyabhavsar.com"
    }'::jsonb
),
(
    'branding',
    '{
        "name": "Supriya Bhavsar",
        "logo_url": null,
        "hero_portrait_url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value;

-- 2. HERO SECTION
INSERT INTO public.hero_section (id, badge, headline, subtext, primary_cta, secondary_cta, portrait_url)
VALUES
(
    'primary',
    '500-HR RYT • Somatic Yoga & Lifestyle Alchemist',
    'Find Your Balance. Elevate Your Lifestyle.',
    'Rooted in Vadodara, Gujarat. Through somatic alignment, classical Vinyasa, and conscious rituals, I guide modern seekers into grounded mental stillness and effortless physical vitality.',
    'Start Training',
    'Watch Latest Video',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85'
)
ON CONFLICT (id) DO UPDATE SET
    badge = EXCLUDED.badge,
    headline = EXCLUDED.headline,
    subtext = EXCLUDED.subtext,
    portrait_url = EXCLUDED.portrait_url;

-- 3. BRAND SPONSORS (Partnerships with Affiliate Links)
INSERT INTO public.brand_sponsors (id, name, tagline, category, logo_url, affiliate_url, display_order)
VALUES
('sp-1', 'Liforme India', 'Biomechanical Alignment Mats', 'Equipment', NULL, 'https://liforme.com?ref=supriya9508', 1),
('sp-2', 'Alo Yoga', 'Mindful Movement Activewear', 'Apparel', NULL, 'https://aloyoga.com?ref=supriya', 2),
('sp-3', 'Kapiva Ayurveda', 'Pure Himalayan Shilajit & Adaptogens', 'Ayurveda', NULL, 'https://kapiva.in?ref=supriya_bhavsar', 3),
('sp-4', 'Cosmix Wellness', 'Plant-Based Adaptogenic Blends', 'Nutrition', NULL, 'https://cosmix.in?ref=supriyayoga', 4),
('sp-5', 'Oura Ring', 'Circadian Sleep & HRV Biometrics', 'Health Tech', NULL, 'https://ouraring.com?ref=supriya', 5),
('sp-6', 'Forest Essentials', 'Authentic Vedic Skin Care', 'Holistic Beauty', NULL, 'https://forestessentialsindia.com', 6)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    affiliate_url = EXCLUDED.affiliate_url;

-- 4. DAILY INTENTION
INSERT INTO public.daily_intention (id, quote_text, theme, sanskrit_word, sanskrit_meaning, is_active)
VALUES
(
    'current',
    'Stillness is not the absence of energy. It is the conscious gathering of your sacred power before moving forward.',
    'Somatic Presence & Grounding',
    'Sthira',
    'Steadiness & Sacred Poise',
    true
)
ON CONFLICT (id) DO UPDATE SET
    quote_text = EXCLUDED.quote_text,
    theme = EXCLUDED.theme,
    sanskrit_word = EXCLUDED.sanskrit_word,
    sanskrit_meaning = EXCLUDED.sanskrit_meaning;

-- 5. TESTIMONIALS (REAL INDIAN NAMES & CONTEXT)
INSERT INTO public.testimonials (id, name, email, message, image_url, rating, role_or_location, is_approved)
VALUES
(
    'test-1',
    'Anjali Sharma',
    'anjali.sharma@mumbaiadvisors.in',
    'Practicing with Supriya from Vadodara completely healed my chronic lower back stiffness after 6 years of grueling corporate desk work in Mumbai. Her cues on pelvic floor stability and gentle breath flossing are absolute genius.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    5,
    'Private Mentorship Client • Mumbai',
    true
),
(
    'test-2',
    'Rahul Desai',
    'rahul.desai@desaiarchitects.com',
    'As an architect constantly on construction sites across Ahmedabad and Vadodara, my posture was compromised. Supriya’s somatic unwinding protocols unlocked my thoracic spine in just 4 weeks. Truly world-class guidance.',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    5,
    'Architect & Daily Yogi • Vadodara & Ahmedabad',
    true
),
(
    'test-3',
    'Priya Patel',
    'priya.patel.dance@gmail.com',
    'Being a classical Kathak dancer in Gujarat, knee and ankle micro-injuries were frequent. Supriya’s Ayurvedic mobility plans and neuromuscular reset restored my joint longevity and artistic stamina. Cannot recommend her enough!',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    5,
    'Classical Kathak Performer • Vadodara, Gujarat',
    true
),
(
    'test-4',
    'Vikramaditya Mehta',
    'vikram@mehtacapital.com',
    'The 1-on-1 virtual sessions with Supriya are the single most valuable hour in my week. She bridges traditional pranayama with nervous system regulation in a way that modern executives desperately need.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    5,
    'Tech Investor • Bengaluru',
    true
),
(
    'test-5',
    'Dr. Neha Kulkarni',
    'dr.neha@holisticphysio.in',
    'From a biomechanical perspective, Supriya teaches movement with surgical precision and deep mindfulness. Her understanding of fascial tension lines is exceptional.',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    5,
    'Senior Physiotherapist • Pune',
    true
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    message = EXCLUDED.message,
    role_or_location = EXCLUDED.role_or_location;

-- 6. CONTENT VAULT (YOUTUBE VIDEOS & INSTAGRAM REELS)
INSERT INTO public.videos (id, title, category, duration, views, date, description, video_url, tags, thumbnail_gradient, thumbnail_accent, chapters)
VALUES
(
    'yoga-yt-1',
    '25-Min Radiant Morning Vinyasa: Core Vitality & Solar Plexus Activation',
    'Yoga (YouTube)',
    '25:40',
    '168K views',
    '3 days ago',
    'Awaken physical strength, ignite metabolic agni, and calibrate your somatic nervous system through fluid, alignment-focused sequences.',
    'https://www.youtube.com/watch?v=sTANio_2E0Q',
    ARRAY['Vinyasa Flow', 'Morning Power', 'All Levels'],
    'from-[#24173D] via-[#160E26] to-[#0B0914]',
    '#C084FC',
    '[
        {"time": "0:00", "title": "Centering & Pranayama Breath"},
        {"time": "4:15", "title": "Spinal Waves & Cat-Cow Dynamic"},
        {"time": "9:30", "title": "Surya Namaskar Dynamic Series"},
        {"time": "16:00", "title": "Warrior III & Half Moon Balances"},
        {"time": "21:40", "title": "Supine Spinal Release & Savasana"}
    ]'::jsonb
),
(
    'yoga-yt-2',
    'Deep Fascial Release & Hip Mobility for Chronic Desk Sitters (No Equipment)',
    'Yoga (YouTube)',
    '38:15',
    '245K views',
    '1 week ago',
    'Target the deep psoas, piriformis, and lumbar fascia. Release emotional tension and restore fluid pelvic alignment with slow restorative holds.',
    'https://www.youtube.com/watch?v=b1H3xO3x_VU',
    ARRAY['Hip Mobility', 'Fascial Release', 'Nervous System Reset'],
    'from-[#1E1236] via-[#130B24] to-[#0B0914]',
    '#E879F9',
    '[
        {"time": "0:00", "title": "Diaphragmatic Breath Assessment"},
        {"time": "6:20", "title": "Low Lunge Psoas Dynamic Flossing"},
        {"time": "14:50", "title": "Supported Pigeon & 90/90 Internal Rotation"},
        {"time": "26:10", "title": "Reclined Butterfly with Sandbag Cueing"},
        {"time": "34:00", "title": "Vagus Nerve Somatic Integration"}
    ]'::jsonb
),
(
    'vlog-1',
    'Silent Morning Routine in Gujarat: Vedic Herbs, Cold Plunge & 5AM Pranayama',
    'Lifestyle Vlogs',
    '19:50',
    '92K views',
    '2 weeks ago',
    'Step into my quiet sacred morning cadence in Vadodara, Gujarat. From ashwagandha golden elixir to sunrise terrace stillness.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ARRAY['Mindful Living', 'Ayurveda', 'Vedic Rituals'],
    'from-[#2C184A] via-[#1A0E2E] to-[#0B0914]',
    '#DDD6FE',
    '[
        {"time": "0:00", "title": "Waking without Screens (Brahma Muhurta)"},
        {"time": "3:40", "title": "Warm Copper Water & Herbal Decoction"},
        {"time": "8:10", "title": "Nadi Shodhana Pranayama"},
        {"time": "13:30", "title": "Simple Kitchari Nourishment Meal Prep"}
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    video_url = EXCLUDED.video_url;

-- 7. INSTAGRAM REELS
INSERT INTO public.instagram_reels (id, caption, creator_handle, audio_track, likes_count, comments_count, shares_count, views_count, duration, reel_url, gradient, cover_accent, pose_name, tags, date)
VALUES
(
    'reel-1',
    'Fix your forward head posture in 60 seconds with this subtle suboccipital release. Save this for your 3PM desk slump! 🧘‍♀️',
    'supriya_9508',
    '♫ Original Audio • Supriya Bhavsar',
    '42.8K',
    '384',
    '12.4K',
    '380K',
    '0:48',
    'https://www.instagram.com/reel/C-xyz123/',
    'from-[#291745] via-[#180E2B] to-[#0B0914]',
    '#C084FC',
    'Suboccipital Neck Unwinding',
    ARRAY['PostureFix', 'DeskYoga', 'NeckPainRelief'],
    '2 days ago'
),
(
    'reel-2',
    'Why traditional sit-ups stress your lumbar spine (and the transverse abdominis breath cue you need instead).',
    'supriya_9508',
    '♫ Ethereal Tibetan Singing Bowls',
    '68.1K',
    '512',
    '18.9K',
    '520K',
    '0:55',
    'https://www.instagram.com/reel/C-xyz456/',
    'from-[#1E1136] via-[#130A24] to-[#0B0914]',
    '#E879F9',
    'Core Breath & Pelvic Neutral',
    ARRAY['CoreBiomechanics', 'SomaticTraining', 'WomenFitness'],
    '5 days ago'
),
(
    'reel-3',
    'Morning grounding ritual in Vadodara: 4-7-8 vagal nerve calibration before looking at any notification.',
    'supriya_9508',
    '♫ Nature Rain & Soft Bansuri Solitude',
    '53.4K',
    '298',
    '15.1K',
    '410K',
    '0:42',
    'https://www.instagram.com/reel/C-xyz789/',
    'from-[#251540] via-[#150D26] to-[#0B0914]',
    '#A78BFA',
    'Vagus Nerve Grounding',
    ARRAY['VagusNerve', 'MorningRoutine', 'VadodaraYoga'],
    '1 week ago'
)
ON CONFLICT (id) DO UPDATE SET
    caption = EXCLUDED.caption,
    creator_handle = EXCLUDED.creator_handle;

-- 8. SERVICES ('WORK WITH ME')
INSERT INTO public.services (id, title, subtitle, badge, price_estimate, description, features, cta_text, is_popular, type)
VALUES
(
    'yoga-1on1',
    '1-on-1 Online Somatic Yoga',
    'Bespoke Biomechanical Coaching',
    'Limited to 6 Clients',
    '₹24,000 / month ($300)',
    'Intimate, tailored 60-minute virtual immersions designed to recalibrate your neuromuscular patterns, correct spinal compensations, and foster deep somatic stillness.',
    ARRAY[
        'Bi-weekly private 60-min live virtual sessions',
        'High-resolution postural & fascial mobility assessment',
        'Custom 15-min daily micro-flow video sequences',
        'Direct WhatsApp voice note coaching with Supriya'
    ],
    'Join the Waitlist',
    true,
    'fitness'
),
(
    'diet-plans',
    'Ayurvedic Metabolic Diet Plans',
    'Seasonal Circadian Nutrition',
    'Intake Open',
    '₹14,500 one-time ($180)',
    'An individualized nutritional blueprint grounded in timeless Ayurvedic doshic wisdom and modern metabolic science. No deprivation, just circadian harmony.',
    ARRAY[
        'Comprehensive Prakriti & Vikriti dosha diagnostic',
        'Seasonal 4-week nutrient-dense whole food meal matrix',
        'Targeted adaptogenic & herbal formulation recommendations',
        'Agni digestion optimization & gut lining repair protocol'
    ],
    'Join the Waitlist',
    false,
    'nutrition'
),
(
    'brand-collabs',
    'Conscious Brand Collaborations',
    'Managed by @shlok.brahmbhatt',
    'Q3/Q4 Enquiries',
    'Custom Scope',
    'Align your mindful label with an engaged, discerning wellness community across Gujarat, India, and globally. High-production storytelling spanning masterclasses and cinematic reels.',
    ARRAY[
        'Multi-platform cinematic 4K video features (YouTube & Reels)',
        'Keynote movement workshops & wellness residency facilitation',
        'Curated long-term brand ambassadorship campaigns',
        'Dedicated management support via @shlok.brahmbhatt'
    ],
    'Initiate Partnership',
    false,
    'collaboration'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle;
