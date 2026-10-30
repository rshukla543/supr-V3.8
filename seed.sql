-- =========================================================================
-- SUPRIYA YOGA & LIFESTYLE CREATOR - SEED DATA (SAFE UPSERTS)
-- =========================================================================

-- 1. SEED VIDEOS
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
    'Silent Morning Routine in Rishikesh: Vedic Herbs, Cold Plunge & 5AM Pranayama',
    'Lifestyle Vlogs',
    '19:50',
    '92K views',
    '2 weeks ago',
    'Step into my quiet sacred morning cadence along the misty banks of the Ganges. From ashwagandha golden elixir to sunrise stillness.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ARRAY['Mindful Living', 'Ayurveda', 'Vedic Rituals'],
    'from-[#2C184A] via-[#1A0E2E] to-[#0B0914]',
    '#DDD6FE',
    '[
        {"time": "0:00", "title": "Waking without Screens (Brahma Muhurta)"},
        {"time": "3:40", "title": "Warm Copper Water & Herbal Decoction"},
        {"time": "8:10", "title": "Nadi Shodhana Pranayama by the River"},
        {"time": "13:30", "title": "Simple Kitchari Nourishment Meal Prep"}
    ]'::jsonb
),
(
    'vlog-2',
    'Balinese Bamboo Sanctuary Tour: Architecture for Circadian Vitality & Peace',
    'Lifestyle Vlogs',
    '22:10',
    '114K views',
    '3 weeks ago',
    'A walkthrough of our solar-aligned bamboo studio in Ubud. How organic textures, natural airflow, and zero EMF sanctuaries transform sleep.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ARRAY['Sanctuary Design', 'Circadian Health', 'Bali Studio'],
    'from-[#20133A] via-[#120A21] to-[#0B0914]',
    '#A78BFA',
    '[
        {"time": "0:00", "title": "Passive Cooling Architecture"},
        {"time": "5:30", "title": "Creating an Open-Air Asana Platform"},
        {"time": "12:00", "title": "Water Acoustics for Meditation"},
        {"time": "18:20", "title": "Evening Warm Lighting Ritual"}
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    duration = EXCLUDED.duration,
    views = EXCLUDED.views,
    description = EXCLUDED.description,
    video_url = EXCLUDED.video_url;

-- 2. SEED INSTAGRAM REELS
INSERT INTO public.instagram_reels (id, caption, creator_handle, audio_track, likes_count, comments_count, shares_count, views_count, duration, reel_url, gradient, cover_accent, pose_name, tags, date)
VALUES
(
    'reel-1',
    'Fix your forward head posture in 60 seconds with this subtle suboccipital release. Save this for your 3PM desk slump! 🧘‍♀️',
    'supriyawellness',
    '♫ Original Audio • Ambient Calm Flow',
    '42.8K',
    '384',
    '12.4K',
    '380K',
    '0:48',
    'https://www.instagram.com/reel/C3_sample1/',
    'from-[#291745] via-[#180E2B] to-[#0B0914]',
    '#C084FC',
    'Suboccipital Neck Unwinding',
    ARRAY['PostureFix', 'DeskYoga', 'NeckPainRelief'],
    '2 days ago'
),
(
    'reel-2',
    'Why traditional sit-ups wreck your pelvic floor (and the somatic transverse abdominis breath cue you actually need instead).',
    'supriyawellness',
    '♫ Ethereal Tibetan Singing Bowls',
    '68.1K',
    '512',
    '18.9K',
    '520K',
    '0:55',
    'https://www.instagram.com/reel/C3_sample2/',
    'from-[#1E1136] via-[#130A24] to-[#0B0914]',
    '#E879F9',
    'Core Breath & Pelvic Neutral',
    ARRAY['CoreBiomechanics', 'SomaticTraining', 'WomenFitness'],
    '5 days ago'
),
(
    'reel-3',
    'Morning grounding ritual: 4-7-8 vagal nerve calibration before looking at a single email. Reclaim your sovereignty.',
    'supriyawellness',
    '♫ Nature Rain & Soft Flute Solitude',
    '53.4K',
    '298',
    '15.1K',
    '410K',
    '0:42',
    'https://www.instagram.com/reel/C3_sample3/',
    'from-[#251540] via-[#150D26] to-[#0B0914]',
    '#A78BFA',
    'Vagus Nerve Grounding',
    ARRAY['VagusNerve', 'MorningRoutine', 'BreathworkDaily'],
    '1 week ago'
)
ON CONFLICT (id) DO UPDATE SET
    caption = EXCLUDED.caption,
    likes_count = EXCLUDED.likes_count,
    audio_track = EXCLUDED.audio_track;

-- 3. SEED SERVICES
INSERT INTO public.services (id, title, subtitle, badge, price_estimate, description, features, cta_text, is_popular, type)
VALUES
(
    'yoga-1on1',
    '1-on-1 Online Somatic Yoga',
    'Bespoke Biomechanical Coaching',
    'Limited to 6 Clients',
    '$320 / month',
    'Intimate, tailored 60-minute virtual immersions designed to recalibrate your neuromuscular patterns, correct spinal compensations, and foster deep somatic stillness.',
    ARRAY[
        'Bi-weekly private 60-min live virtual sessions',
        'High-resolution postural & fascial mobility assessment',
        'Custom 15-min daily micro-flow video sequences',
        'Direct WhatsApp voice note coaching & posture auditing'
    ],
    'Join the Waitlist',
    true,
    'fitness'
),
(
    'diet-plans',
    'Ayurvedic Metabolic Diet Plans',
    'Seasonal Circadian Nutrition',
    'Spring Intake Open',
    '$180 one-time',
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
    'Partnerships & Retreat Residencies',
    'Q3/Q4 Enquiries',
    'Custom Scope',
    'Align your mindful label with an engaged, discerning global wellness community. High-production storytelling spanning masterclasses, retreats, and cinematic content.',
    ARRAY[
        'Multi-platform cinematic 4K video features (YouTube & Reels)',
        'Keynote movement workshops & international retreat facilitation',
        'Curated long-term brand ambassadorship campaigns',
        'Authentic audience synergy across 350K+ conscious practitioners'
    ],
    'Initiate Partnership',
    false,
    'collaboration'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    price_estimate = EXCLUDED.price_estimate,
    description = EXCLUDED.description;

-- 4. SEED GALLERY IMAGES
INSERT INTO public.gallery_images (id, title, folder, caption, image_url, aspect_ratio, gradient_hint, display_order)
VALUES
('gal-1', 'Urdhva Dhanurasana (Wheel Pose)', 'Asana & Flow', 'Deep thoracic spine expansion at sunrise over the sacred Ganges.', NULL, '4/5', 'from-[#2A1847] via-[#170E29] to-[#0B0914]', 1),
('gal-2', 'Natarajasana (Lord of the Dance)', 'Asana & Flow', 'Finding poise, pelvic alignment, and an unwavering focal drishti.', NULL, '4/5', 'from-[#23143B] via-[#140B24] to-[#0B0914]', 2),
('gal-3', 'Himalayan Altar & Singing Bowls', 'Studio & Space', 'Hand-hammered brass bells, sandalwood incense, and linen mats.', NULL, '4/5', 'from-[#2A1745] via-[#170E29] to-[#0B0914]', 3),
('gal-4', 'Minimalist Bamboo Studio Nook', 'Studio & Space', 'Natural morning light calibrated for circadian presence and quietude.', NULL, '4/5', 'from-[#1E1133] via-[#120A21] to-[#0B0914]', 4),
('gal-5', 'Ubud Rice Terrace Meditation', 'Travel & Retreats', 'Mid-morning stillness enveloped by tropical mist and birdsong.', NULL, '4/5', 'from-[#26153D] via-[#150C24] to-[#0B0914]', 5),
('gal-6', 'Ganges River Ghats at Dawn', 'Travel & Retreats', 'Chanting ancient mantras along the misty riverbanks of Rishikesh.', NULL, '4/5', 'from-[#1F1033] via-[#120A1F] to-[#0B0914]', 6),
('gal-7', 'Ceremonial Matcha & Journaling', 'Casual & Lifestyle', 'Slow mornings without screens, emails, or external notifications.', NULL, '4/5', 'from-[#281640] via-[#160D26] to-[#0B0914]', 7),
('gal-8', 'Farmer Market Produce Harvest', 'Casual & Lifestyle', 'Vibrant organic heirloom tomatoes and golden turmeric roots.', NULL, '4/5', 'from-[#211236] via-[#130B21] to-[#0B0914]', 8)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    caption = EXCLUDED.caption;

-- 5. SEED SITE SETTINGS
INSERT INTO public.site_settings (key, value)
VALUES
(
    'hero',
    '{
        "badge": "500-HR RYT • Somatic Yoga & Lifestyle Alchemist",
        "headline": "Find Your Balance. Elevate Your Lifestyle.",
        "subtext": "Escape digital fatigue and reclaim somatic vitality. Through the alchemy of dynamic Vinyasa, deep fascial unwinding, and conscious daily rituals, I guide high-achievers into grounded mental stillness and effortless strength.",
        "primary_cta": "Start Training",
        "secondary_cta": "Watch Latest Video",
        "portrait_url": null
    }'::jsonb
),
(
    'bio',
    '{
        "quote": "Movement is not about performance. It is an act of returning home.",
        "story": "For over eight years, I navigated the unrelenting cadence of corporate tech until severe nervous system burnout compelled me to step off the treadmill and re-learn what it means to actually inhabit the human body. My search brought me to Rishikesh and Bali for 500+ hours of advanced classical Vinyasa and somatic breathwork.",
        "location": "Rishikesh & Bali Certified"
    }'::jsonb
),
(
    'branding',
    '{
        "logo_url": null,
        "hero_portrait_url": null
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value;

-- 6. SEED TESTIMONIALS
INSERT INTO public.testimonials (id, name, email, message, image_url, rating, role_or_location, is_approved)
VALUES
(
    'test-1',
    'Elena Rostova',
    'elena.rostova@example.com',
    'Training 1-on-1 with Supriya radically re-architected how I handle executive burnout. Her somatic alignment methods eliminated 4 years of chronic thoracic pain within 6 weeks. She doesn''t just teach postures—she teaches conscious physical liberation.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    5,
    'Private Mentorship Client • London, UK',
    true
),
(
    'test-2',
    'Dr. Marcus Vance',
    'm.vance@wellnessclinic.org',
    'As a surgeon on my feet for 10-hour operations, my posture was collapsing. Supriya’s precision with fascia unwinding and pelvic neutral biomechanics is unmatched. Her guidance is grounded, scientifically rigorous, and deeply restorative.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    5,
    'Orthopedic Surgeon & Daily Yogi • San Francisco, CA',
    true
),
(
    'test-3',
    'Aanya Sharma',
    'aanya.wellness@gmail.com',
    'The custom diet & Ayurvedic rhythm plan designed by Supriya restored my circadian vitality after years of irregular travel. Her philosophy honors real food, cyclical energy, and genuine self-love. I have never felt more balanced in my skin.',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    5,
    'Holistic Nutritionist • Mumbai & Rishikesh',
    true
),
(
    'test-4',
    'Julian Montgomery',
    'julian.m@vibecreatives.co',
    'Her breathwork sessions before our brand retreat completely rewired our collective focus. Supriya brings a grounded calmness that cuts straight through modern noise. An extraordinary teacher and conscious creator.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    5,
    'Creative Director • Brooklyn, NY',
    true
)
ON CONFLICT (id) DO NOTHING;
