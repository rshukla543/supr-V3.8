-- =========================================================================
-- CLIENT HANDOFF PROTOCOL: SAFE RESET AND CLEAN SEED SCRIPT
-- Orion FX Production State Synchronizer (08)
-- Targets: Supabase PostgreSQL (Public Schema)
-- =========================================================================

-- Safely purge test and decoy data
TRUNCATE TABLE public.site_settings CASCADE;
TRUNCATE TABLE public.hero_section CASCADE;
TRUNCATE TABLE public.brand_sponsors CASCADE;
TRUNCATE TABLE public.gallery_images CASCADE;
TRUNCATE TABLE public.gallery_carousel CASCADE;
TRUNCATE TABLE public.videos CASCADE;
TRUNCATE TABLE public.content_vault CASCADE;
TRUNCATE TABLE public.instagram_reels CASCADE;
TRUNCATE TABLE public.blogs CASCADE;
TRUNCATE TABLE public.testimonials CASCADE;
TRUNCATE TABLE public.services CASCADE;
TRUNCATE TABLE public.daily_intention CASCADE;

-- Insert pristine, production-ready frontend data

-- =========================================================================
-- SUPRIYA BHAVSAR - SEED DATA (PERFECTLY ALIGNED WITH SCHEMA.SQL)
-- Name: Supriya Bhavsar
-- Location: Vadodara, Gujarat, India
-- Manager: Shlok Brahmbhatt (@shlok.brahmbhatt)
-- Instagram: @supriya_9508
-- YouTube: @supriyabhavsar7343
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. SITE SETTINGS (Key-Value Global Config)
-- -------------------------------------------------------------------------
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
        "portrait_url": "https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg"
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
        "youtube_channel": "@supriyabhavsar7343",
        "management_email": "management@supriyabhavsar.com"
    }'::jsonb
),
(
    'branding',
    '{
        "name": "Supriya Bhavsar",
        "location": "Vadodara, Gujarat",
        "logo_url": null,
        "hero_portrait_url": "https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg"
    }'::jsonb
),
(
    'contact',
    '{
        "manager_name": "Shlok Brahmbhatt",
        "manager_handle": "@shlok.brahmbhatt",
        "youtube_channel": "@supriyabhavsar7343",
        "instagram_handle": "@supriya_9508",
        "management_email": "management@supriyabhavsar.com"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value;

-- -------------------------------------------------------------------------
-- 2. HERO SECTION
-- -------------------------------------------------------------------------
INSERT INTO public.hero_section (id, badge, headline, subtext, primary_cta, secondary_cta, portrait_url)
VALUES
(
    'primary',
    '500-HR RYT • Somatic Yoga & Lifestyle Alchemist',
    'Find Your Balance. Elevate Your Lifestyle.',
    'Escape digital fatigue and reclaim somatic vitality. Through the alchemy of dynamic Vinyasa, deep fascial unwinding, and conscious daily rituals, I guide high-achievers into grounded mental stillness and effortless strength.',
    'Start Training',
    'Watch Latest Video',
    'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg'
)
ON CONFLICT (id) DO UPDATE SET
    badge = EXCLUDED.badge,
    headline = EXCLUDED.headline,
    subtext = EXCLUDED.subtext,
    primary_cta = EXCLUDED.primary_cta,
    secondary_cta = EXCLUDED.secondary_cta,
    portrait_url = EXCLUDED.portrait_url;

-- -------------------------------------------------------------------------
-- 3. BRAND SPONSORS
-- -------------------------------------------------------------------------
INSERT INTO public.brand_sponsors (id, name, tagline, category, logo_url, affiliate_url, display_order)
VALUES
('sponsor-1', 'Manduka Yoga', 'PRO Mat Series & Cork Props', 'Equipment & Mats', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=300&q=80', 'https://manduka.com/?ref=supriya', 1),
('sponsor-2', 'Organic India', 'Whole Herb Tulsi & Adaptogens', 'Ayurvedic Wellness', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', 'https://organicindia.com/?ref=supriya', 2),
('sponsor-3', 'Forest Essentials', 'Artisanal Ayurvedic Skincare', 'Sattvic Self-Care', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80', 'https://forestessentialsindia.com/?ref=supriya', 3),
('sponsor-4', 'Pure Prana Labs', '432Hz Sound Bowls & Malas', 'Meditation Instruments', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80', 'https://purepranalabs.com/?ref=supriya', 4)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    category = EXCLUDED.category,
    logo_url = EXCLUDED.logo_url,
    affiliate_url = EXCLUDED.affiliate_url,
    display_order = EXCLUDED.display_order;

-- -------------------------------------------------------------------------
-- 4. GALLERY CAROUSEL & IMAGES (32 Curated Images across 4 Folders)
-- -------------------------------------------------------------------------
INSERT INTO public.gallery_images (id, title, folder, caption, image_url, aspect_ratio, gradient_hint, display_order)
VALUES
-- Asana & Flow (8 images)
('gal-asana-1', 'Urdhva Dhanurasana (Wheel Pose)', 'Asana & Flow', 'Deep thoracic spine expansion at sunrise over the sacred Ganges river.', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-950/80 via-slate-900 to-black', 1),
('gal-asana-2', 'Natarajasana (Lord of the Dance)', 'Asana & Flow', 'Finding poised pelvic alignment and an unwavering focal drishti.', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950/80 via-slate-900 to-black', 2),
('gal-asana-3', 'Bakasana (Crow Pose) Float', 'Asana & Flow', 'Core suspension, wrist engagement, and shoulder protraction mechanics.', 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80', '4/5', 'from-violet-950/80 via-slate-900 to-black', 3),
('gal-asana-4', 'Eka Pada Rajakapotasana (King Pigeon)', 'Asana & Flow', 'Releasing stored emotional psoas tension with deep breath cycles.', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/70 via-slate-900 to-black', 4),
('gal-asana-5', 'Pincha Mayurasana (Forearm Balance)', 'Asana & Flow', 'Inversion practice defying gravity with focused spinal stacking.', 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-900/70 via-slate-900 to-black', 5),
('gal-asana-6', 'Virabhadrasana III (Warrior III)', 'Asana & Flow', 'Grounding single-leg stability, glute firing, and horizontal energy line.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', '4/5', 'from-violet-900/70 via-slate-900 to-black', 6),
('gal-asana-7', 'Paschimottanasana (Seated Forward Bend)', 'Asana & Flow', 'Gentle somatic hamstring unwinding and introspective stillness.', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-950/80 via-slate-900 to-black', 7),
('gal-asana-8', 'Vrikshasana (Tree Pose at Dawn)', 'Asana & Flow', 'Rooting into earth like an ancient banyan tree in Vadodara.', 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-purple-950 to-black', 8),

-- Studio & Space (8 images)
('gal-studio-1', 'Himalayan Singing Bowls & Brass Altar', 'Studio & Space', 'Hand-hammered brass bells, sacred incense, and linen meditation props.', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/60 via-slate-950 to-black', 9),
('gal-studio-2', 'Minimalist Bamboo Studio Nook', 'Studio & Space', 'Natural morning diffused light calibrated for circadian stillness.', 'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-purple-950/50 to-black', 10),
('gal-studio-3', 'Aura Quartz & Botanical Aromatics', 'Studio & Space', 'Pure lavender mist and selenite crystals cleansing the shala air.', 'https://images.unsplash.com/photo-1608248597359-2e67d268d8ef?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-950/70 via-slate-950 to-black', 11),
('gal-studio-4', 'Organic Cork Mats & Cotton Bolsters', 'Studio & Space', 'Sustainable natural studio essentials providing non-slip tactile grounding.', 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950/60 via-slate-900 to-black', 12),
('gal-studio-5', 'Somatic Sound Bath Sanctorum', 'Studio & Space', 'Acoustic sanctuary setting resonance frequencies at 432Hz theta state.', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80', '4/5', 'from-violet-950/80 via-slate-950 to-black', 13),
('gal-studio-6', 'Zen Garden & Lotus Terracotta Basin', 'Studio & Space', 'Water elements bringing negative ions and serene micro-climate inside.', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/60 via-slate-900 to-black', 14),
('gal-studio-7', 'Palo Santo & Beeswax Candle Ritual', 'Studio & Space', 'Smokeless burning rituals anchoring mental transitions into quietude.', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80', '4/5', 'from-amber-950/60 via-purple-950 to-black', 15),
('gal-studio-8', 'Vadodara Heritage Shala Arches', 'Studio & Space', 'Historic architectural geometry framing contemplative private sessions.', 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-indigo-950 to-black', 16),

-- Travel & Retreats (8 images)
('gal-travel-1', 'Rishikesh Dawn Ghats Chanting', 'Travel & Retreats', 'Misty banks of the holy river where classical Vinyasa was born.', 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-950/70 via-slate-950 to-black', 17),
('gal-travel-2', 'Ubud Rice Terrace Meditation', 'Travel & Retreats', 'Mid-morning stillness enveloped by tropical canopy mist and birdsong.', 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950/70 via-purple-950/40 to-black', 18),
('gal-travel-3', 'Dharamshala Mountain Shala', 'Travel & Retreats', 'Crisp cedar air and pine scents filling lungs during silent walking meditation.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-purple-950/60 to-black', 19),
('gal-travel-4', 'Varkala Cliffside Sunset Flow', 'Travel & Retreats', 'Ocean waves crashing below as we flow through evening Chandra Namaskar.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/80 via-slate-900 to-black', 20),
('gal-travel-5', 'Ladakh High-Altitude Pranayama', 'Travel & Retreats', 'Breathing consciously at 11,000 feet amidst barren Himalayan beauty.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950 via-slate-900 to-black', 21),
('gal-travel-6', 'Gokarna Beachside Yin Sessions', 'Travel & Retreats', 'Soft golden sands providing gentle yielding support for restorative postures.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', '4/5', 'from-amber-950/70 via-purple-950 to-black', 22),
('gal-travel-7', 'Himalayan Forest Bathing', 'Travel & Retreats', 'Absorbing phytoncides and tuning nervous system to natural rhythms.', 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-purple-950 to-black', 23),
('gal-travel-8', 'Spiti Valley Monastic Stillness', 'Travel & Retreats', 'Timeless monastery silence cultivating deep, unshakeable equanimity.', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950/80 via-slate-950 to-black', 24),

-- Casual & Lifestyle (8 images)
('gal-life-1', 'Ceremonial Matcha & Morning Journal', 'Casual & Lifestyle', 'Slow mornings without screens, emails, or sensory overload.', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/50 via-slate-900 to-black', 25),
('gal-life-2', 'Organic Herbal Ayurvedic Infusions', 'Casual & Lifestyle', 'Vibrant tulsi leaves and golden turmeric brewed for internal vitality.', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-950/70 via-slate-900 to-black', 26),
('gal-life-3', 'Vadodara Sunset Walk & Contemplation', 'Casual & Lifestyle', 'Golden hour strolls along tranquil Sayaji Baug gardens.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', '4/5', 'from-amber-950/50 via-purple-950 to-black', 27),
('gal-life-4', 'Sattvic Nourishment Harvest Bowl', 'Casual & Lifestyle', 'Seasonal roasted roots, tahini, sprouting greens, and pomegranate seeds.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', '4/5', 'from-indigo-950/60 via-slate-900 to-black', 28),
('gal-life-5', 'Linen Loungewear & Reading Altar', 'Casual & Lifestyle', 'Comfortable natural fibers honoring breathability and ease.', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80', '4/5', 'from-purple-900/60 via-slate-900 to-black', 29),
('gal-life-6', 'Cacao Ceremony & Community Circle', 'Casual & Lifestyle', 'Heart-opening raw heirloom cacao shared with fellow seekers.', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80', '4/5', 'from-violet-950/70 via-slate-950 to-black', 30),
('gal-life-7', 'Circadian Sunlight Gaze Routine', 'Casual & Lifestyle', 'Setting morning cortisol cues naturally with early photon exposure.', 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80', '4/5', 'from-amber-950/60 via-purple-950 to-black', 31),
('gal-life-8', 'Evening Digital Detox & Herbal Bath', 'Casual & Lifestyle', 'Epsom salts, essential rosemary oils, and unconditional silence.', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', '4/5', 'from-slate-900 via-purple-950 to-black', 32)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    folder = EXCLUDED.folder,
    caption = EXCLUDED.caption,
    image_url = EXCLUDED.image_url,
    aspect_ratio = EXCLUDED.aspect_ratio,
    gradient_hint = EXCLUDED.gradient_hint,
    display_order = EXCLUDED.display_order;

-- Also seed gallery_carousel for backward compatibility
INSERT INTO public.gallery_carousel (id, title, folder, caption, image_url, aspect_ratio, gradient_hint, display_order)
SELECT id, title, folder, caption, image_url, aspect_ratio, gradient_hint, display_order
FROM public.gallery_images
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    folder = EXCLUDED.folder,
    caption = EXCLUDED.caption,
    image_url = EXCLUDED.image_url,
    aspect_ratio = EXCLUDED.aspect_ratio,
    gradient_hint = EXCLUDED.gradient_hint,
    display_order = EXCLUDED.display_order;

-- -------------------------------------------------------------------------
-- 5. CONTENT VAULT & VIDEOS (Exactly 3 in each of 4 categories = 12 masterclasses + 4 vlogs)
-- -------------------------------------------------------------------------
INSERT INTO public.content_vault (id, title, category, youtube_url, duration, views, description, tags, custom_thumbnail)
VALUES
-- YOGA (3 entries)
(
    'yoga-yt-1',
    '25-Min Radiant Morning Vinyasa: Core Vitality & Solar Plexus Activation',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=sTANio_2E0Q',
    '25:40',
    '168K views',
    'Awaken physical strength, ignite metabolic agni, and calibrate your somatic nervous system through fluid, alignment-focused sequences.',
    ARRAY['Yoga'],
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
),
(
    'yoga-yt-2',
    'De-Stress Evening Yin: Deep Fascial Unwinding & Nervous System Downregulation',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=b1H3xO3x_Js',
    '34:10',
    '214K views',
    'Slow down with therapeutic 4-minute holds targeting deep connective tissue in hips, lower spine, and shoulders for profound sleep restoration.',
    ARRAY['Yoga'],
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
),
(
    'yoga-yt-3',
    'Classical Hatha Alignment: Sthira Sukham Asanam & Structural Equilibrium',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=COp7BR_Dvps',
    '28:50',
    '142K views',
    'Explore the classical roots of Hatha yoga in Baroda. Ground through pada bandha, lengthen through the crown, and inhabit steady ease.',
    ARRAY['Yoga'],
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
),

-- PRANAYAMA (3 entries)
(
    'pranayam-yt-1',
    'Nadi Shodhana & Anulom Vilom: Balancing Solar & Lunar Prana Channels',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=inpok4MKVLM',
    '22:15',
    '185K views',
    'Master alternate nostril breathing to purify Ida and Pingala nadis, calm racing cognitive beta waves, and drop into parasympathetic bliss.',
    ARRAY['Pranayama', 'Pranayam'],
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
),
(
    'pranayam-yt-2',
    'Vagus Nerve 4-7-8 Somatic Reset: Regulating Fight-or-Flight Cortisol',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=hJbRpHZr_d0',
    '18:30',
    '290K views',
    'A scientifically validated breathwork protocol to stimulate the ventral vagus nerve branch, down-regulating anxiety and restoring heart-rate variability.',
    ARRAY['Pranayama', 'Pranayam'],
    'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=1200&q=80'
),
(
    'pranayam-yt-3',
    'Kapalabhati & Bhramari (Humming Bee): Cleansing Pranic Energy & Nitric Oxide',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=glT0sH_p9z8',
    '24:00',
    '135K views',
    'Combine skull-shining active exhalations with humming bee acoustic resonance to boost nasal nitric oxide and induce deep cerebral stillness.',
    ARRAY['Pranayama', 'Pranayam'],
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80'
),

-- BIOMECHANICS (3 entries)
(
    'biomechanics-yt-1',
    'Biomechanics of Inversions: Scapular Elevation & Straight Handstand Line',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=glT0sH_p9z8',
    '19:25',
    '129K views',
    'Demystifying arm balances through scientific serratus anterior activation, hollow body tension drills, and safe wall-assisted progressions.',
    ARRAY['Biomechanics'],
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
),
(
    'biomechanics-yt-2',
    'Pelvic Diaphragm & Neutral Lumbar: Unlocking Psoas Tightness for Desk Workers',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=4pKly2JojMw',
    '31:40',
    '310K views',
    'Scientific myofascial release for chronically shortened hip flexors and deep glutes, easing lower back pressure and restoring pelvic neutral.',
    ARRAY['Biomechanics'],
    'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1200&q=80'
),
(
    'biomechanics-yt-3',
    'Rotator Cuff & Shoulder Centration for Chaturanga: Protecting Your Joints',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=sTANio_2E0Q',
    '21:10',
    '154K views',
    'Learn how to transition into Chaturanga Dandasana without anterior humeral glide. Essential joint kinematics for long-term practice safety.',
    ARRAY['Biomechanics'],
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
),

-- STRENGTH (3 entries)
(
    'strength-yt-1',
    'Dynamic Power Asana: Arm Balances, Bandhas & Core Power Conditioning',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=sTANio_2E0Q',
    '32:00',
    '240K views',
    'Build functional tendon and muscular strength through Uddiyana Bandha engagement, Bakasana float transitions, and sustained isometric holds.',
    ARRAY['Strength'],
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'
),
(
    'strength-yt-2',
    'Isometric Glute & Posterior Chain Awakening for Grounded Balance',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=4pKly2JojMw',
    '26:45',
    '175K views',
    'Strengthen the gluteus medius, hamstrings, and spinal extensors to construct bulletproof balance in standing single-leg postures.',
    ARRAY['Strength'],
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
),
(
    'strength-yt-3',
    'Warrior Endurance Series: Building Lower-Body Stamina & Drishti Grit',
    'Yoga (YouTube)',
    'https://www.youtube.com/watch?v=b1H3xO3x_Js',
    '29:15',
    '198K views',
    'Deep holds in Virabhadrasana I, II, and Reverse Warrior cultivating mental tenacity, quad endurance, and unwavering inner composure.',
    ARRAY['Strength'],
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
),

-- LIFESTYLE VLOGS (4 entries)
(
    'vlog-1',
    'A High-Vibration Sunday: High-Protein Plant Meals, Studio Tour & Altar Setup',
    'Lifestyle Vlogs',
    'https://www.youtube.com/watch?v=hJbRpHZr_d0',
    '22:15',
    '88K views',
    'A restful glimpse into my Sunday ritual in Vadodara: crafting adaptogenic tonics, purifying the home shala with organic dhoop, and setting intention.',
    ARRAY['Plant Based', 'Studio Routine', 'Mindful Living'],
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'
),
(
    'vlog-2',
    'Inside My 10-Day Silent Vipassana in the Himalayas: What Unfolded',
    'Lifestyle Vlogs',
    'https://www.youtube.com/watch?v=COp7BR_Dvps',
    '28:30',
    '142K views',
    '100 hours of noble silence, waking at 4:00 AM, and observing sensations without reaction. The profound psychological recalibration that occurred.',
    ARRAY['Vipassana', 'Meditation Retreat', 'Mental Health'],
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
),
(
    'vlog-3',
    'Tour My Minimalist Mindful Living Apartment in Vadodara: Sacred Design',
    'Lifestyle Vlogs',
    'https://www.youtube.com/watch?v=v7AYKMP6rOE',
    '18:45',
    '115K views',
    'How spatial design, circadian lighting, natural linen textures, and non-toxic earthen materials transform your home into a sanctuary for healing.',
    ARRAY['Minimalism', 'Interior Space', 'Sanctuary Design'],
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
),
(
    'vlog-4',
    'How I Quit Corporate Burnout to Teach Yoga Worldwide: The Raw Story',
    'Lifestyle Vlogs',
    'https://www.youtube.com/watch?v=g_tea8ZNk5A',
    '24:18',
    '188K views',
    'From 12-hour tech shifts in Bangalore to finding authentic purpose on the mat. Honest insights on financial stability, self-doubt, and family reactions.',
    ARRAY['Career Transition', 'Yoga Teacher Life', 'Inspiration'],
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    youtube_url = EXCLUDED.youtube_url,
    duration = EXCLUDED.duration,
    views = EXCLUDED.views,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    custom_thumbnail = EXCLUDED.custom_thumbnail;

-- Also seed public.videos table for modular video queries
INSERT INTO public.videos (id, title, category, duration, views, date, description, video_url, custom_thumbnail_url, tags)
SELECT
    id,
    title,
    category,
    duration,
    views,
    'Recent',
    description,
    youtube_url,
    custom_thumbnail,
    tags
FROM public.content_vault
WHERE category IN ('Yoga (YouTube)', 'Lifestyle Vlogs')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    duration = EXCLUDED.duration,
    views = EXCLUDED.views,
    description = EXCLUDED.description,
    video_url = EXCLUDED.video_url,
    custom_thumbnail_url = EXCLUDED.custom_thumbnail_url,
    tags = EXCLUDED.tags;

-- -------------------------------------------------------------------------
-- 6. INSTAGRAM REELS (Strictly 4 Curated Entries with Real Playable Links)
-- -------------------------------------------------------------------------
INSERT INTO public.content_vault (id, title, category, instagram_url, youtube_url, duration, views, description, tags, custom_thumbnail)
VALUES
(
    'reel-1',
    'Adho Mukha Svanasana Alignment Fix',
    'Reels (Instagram)',
    'https://www.instagram.com/reel/C8qLd95M6P1/',
    'https://www.youtube.com/embed/sTANio_2E0Q?autoplay=1&controls=1&rel=0&modestbranding=1',
    '0:42',
    '780K views',
    'Stop dumping weight into your wrists in Downward Dog! 🛑 Try this: externally rotate your upper biceps and micro-bend knees. Night and day difference!',
    ARRAY['YogaTips', 'Biomechanics', 'FormCheck'],
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'
),
(
    'reel-2',
    'Vagal Nerve 4-7-8 Breathwork Reset',
    'Reels (Instagram)',
    'https://www.instagram.com/reel/C7pKd89x2Z9/',
    'https://www.youtube.com/embed/inpok4MKVLM?autoplay=1&controls=1&rel=0&modestbranding=1',
    '0:55',
    '940K views',
    'My emergency 3-minute 4-7-8 breathing practice when stress hits a 10/10. Inhale 4s, hold 7s, exhale with an audible sigh 8s. Save for later! 🫁✨',
    ARRAY['Breathwork', 'AnxietyRelief', 'SomaticHealing'],
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
),
(
    'reel-3',
    'Plant Vitality Sattvic Meal Routine',
    'Reels (Instagram)',
    'https://www.instagram.com/reel/C6oLk11z8X4/',
    'https://www.youtube.com/embed/4pKly2JojMw?autoplay=1&controls=1&rel=0&modestbranding=1',
    '0:50',
    '510K views',
    'What I eat as a 500-HR Certified Yogi with zero calorie counting. Whole foods, warming digestive spices, and listening to hunger cues. 🥑🍵',
    ARRAY['WhatIEat', 'HolisticNutrition', 'CleanEating'],
    'https://images.unsplash.com/photo-1512290900672-1f02176eecdf?auto=format&fit=crop&w=600&q=80'
),
(
    'reel-4',
    '60-Second Morning Spinal Awakening Wave',
    'Reels (Instagram)',
    'https://www.instagram.com/reel/C5mLp92M4Q8/',
    'https://www.youtube.com/embed/COp7BR_Dvps?autoplay=1&controls=1&rel=0&modestbranding=1',
    '0:38',
    '1.4M views',
    'The 60-second morning spinal wave you need to do before checking your notifications. Unclench your jaw and unlock your hips! 🌅',
    ARRAY['MorningRoutine', 'SpineHealth', 'Mobility'],
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    instagram_url = EXCLUDED.instagram_url,
    youtube_url = EXCLUDED.youtube_url,
    duration = EXCLUDED.duration,
    views = EXCLUDED.views,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    custom_thumbnail = EXCLUDED.custom_thumbnail;

-- Also seed public.instagram_reels table
INSERT INTO public.instagram_reels (id, caption, creator_handle, audio_track, likes_count, comments_count, shares_count, views_count, duration, reel_url, gradient, cover_accent, pose_name, tags, date)
VALUES
(
    'reel-1',
    'Stop dumping weight into your wrists in Downward Dog! 🛑 Try this: externally rotate your upper biceps and micro-bend knees. Night and day difference!',
    'supriya_9508',
    '♫ Supriya • Somatic Morning Flow (Original Audio)',
    '48.2K',
    '1.2K',
    '9.4K',
    '780K views',
    '0:42',
    'https://www.instagram.com/reel/C8qLd95M6P1/',
    'from-violet-900 via-indigo-950 to-midnight-950',
    '#C084FC',
    'Adho Mukha Svanasana Fix',
    ARRAY['YogaTips', 'Biomechanics', 'FormCheck'],
    'Yesterday'
),
(
    'reel-2',
    'My emergency 3-minute 4-7-8 breathing practice when stress hits a 10/10. Inhale 4s, hold 7s, exhale with an audible sigh 8s. Save for later! 🫁✨',
    'supriya_9508',
    '♫ Ambient Crystal Sound Bowls (432Hz)',
    '62.7K',
    '890',
    '18.1K',
    '940K views',
    '0:55',
    'https://www.instagram.com/reel/C7pKd89x2Z9/',
    'from-purple-900 via-violet-950 to-midnight-950',
    '#F59E0B',
    'Vagal Nerve Reset',
    ARRAY['Breathwork', 'AnxietyRelief', 'SomaticHealing'],
    '3 days ago'
),
(
    'reel-3',
    'What I eat as a 500-HR Certified Yogi with zero calorie counting. Whole foods, warming digestive spices, and listening to hunger cues. 🥑🍵',
    'supriya_9508',
    '♫ Lo-Fi Morning Glow - Chillhop',
    '34.9K',
    '450',
    '5.2K',
    '510K views',
    '0:50',
    'https://www.instagram.com/reel/C6oLk11z8X4/',
    'from-indigo-900 via-purple-950 to-midnight-950',
    '#FBBF24',
    'Plant Vitality Meal',
    ARRAY['WhatIEat', 'HolisticNutrition', 'CleanEating'],
    '5 days ago'
),
(
    'reel-4',
    'The 60-second morning spinal wave you need to do before checking your notifications. Unclench your jaw and unlock your hips! 🌅',
    'supriya_9508',
    '♫ Morning Dew - Supriya Ambient',
    '91.4K',
    '2.1K',
    '32.6K',
    '1.4M views',
    '0:38',
    'https://www.instagram.com/reel/C5mLp92M4Q8/',
    'from-violet-950 via-purple-900 to-midnight-950',
    '#C084FC',
    'Spinal Awakening Flow',
    ARRAY['MorningRoutine', 'SpineHealth', 'Mobility'],
    '1 week ago'
)
ON CONFLICT (id) DO UPDATE SET
    caption = EXCLUDED.caption,
    creator_handle = EXCLUDED.creator_handle,
    audio_track = EXCLUDED.audio_track,
    likes_count = EXCLUDED.likes_count,
    comments_count = EXCLUDED.comments_count,
    shares_count = EXCLUDED.shares_count,
    views_count = EXCLUDED.views_count,
    duration = EXCLUDED.duration,
    reel_url = EXCLUDED.reel_url,
    gradient = EXCLUDED.gradient,
    cover_accent = EXCLUDED.cover_accent,
    pose_name = EXCLUDED.pose_name,
    tags = EXCLUDED.tags,
    date = EXCLUDED.date;

-- -------------------------------------------------------------------------
-- 7. BLOGS & VLOG ARTICLES (Exactly 3 Comprehensive Full-Page Guides)
-- -------------------------------------------------------------------------
INSERT INTO public.blogs (id, title, slug, excerpt, content, hero_video_url, cover_image_url, read_time, category, tags, author, author_role, author_image, published_at)
VALUES
(
    'blog-1',
    'The Biomechanics of Surrender: Why Your Nervous System Needs Yin Yoga in 2026',
    'biomechanics-of-surrender-yin-yoga',
    'Modern hustle culture glorifies sympathetic fight-or-flight overdrive. Here is how slow, targeted connective tissue compression recalibrates the vagus nerve and restores cellular vitality.',
    '## The Modern Crisis of Sympathetic Overdrive

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
3. **Rest in Savasana:** Give your fascia 5 full minutes of unmoving silence after practice to absorb the energetic recalibration.',
    'https://www.youtube.com/watch?v=b1H3xO3x_Js',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    '6 min read',
    'Somatic Science',
    ARRAY['Yin Yoga', 'Vagus Nerve', 'Somatic Health', 'Fascia'],
    'Supriya Bhavsar',
    '500-HR Somatic Practitioner • Vadodara',
    'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg',
    NOW() - INTERVAL '3 days'
),
(
    'blog-2',
    'Brahma Muhurta in Vadodara: The Ayurvedic Science of Rising at 4:30 AM',
    'brahma-muhurta-ayurvedic-morning-routine',
    'The ninety-six minutes before dawn contain a unique concentration of atmospheric prana. How waking before sunrise in Gujarat transformed my mental drishti and intuitive clarity.',
    '## The Sacred Hours Before Dawn

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
Before checking any digital screen, simply watch the natural shifting of morning light across your sanctuary altar.',
    'https://www.youtube.com/watch?v=glT0sH_p9z8',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    '8 min read',
    'Ayurvedic Living',
    ARRAY['Brahma Muhurta', 'Ayurveda', 'Pranayama', 'Circadian Health'],
    'Supriya Bhavsar',
    '500-HR Somatic Practitioner • Vadodara',
    'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg',
    NOW() - INTERVAL '10 days'
),
(
    'blog-3',
    'Sanctuary Architecture: How to Curate a High-Frequency Home Movement Space',
    'sanctuary-architecture-mindful-home-space',
    'Your physical environment directly mirrors and shapes your nervous system tone. A guide to lighting, non-toxic textures, sacred geometry, and minimalist studio curation.',
    '## Spatial Resonance & Psychological Safety

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

### 3. Creating an Altar of Presence
You do not need complex religious iconography. Simply place an element of Earth (river stone), Fire (ghee lamp), Water (brass chalice), and Air (frankincense smoke) to ground your senses.',
    'https://www.youtube.com/watch?v=v7AYKMP6rOE',
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    '7 min read',
    'Mindful Living',
    ARRAY['Sanctuary', 'Architecture', 'Interior Design', 'Nervous System'],
    'Supriya Bhavsar',
    '500-HR Somatic Practitioner • Vadodara',
    'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg',
    NOW() - INTERVAL '18 days'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    hero_video_url = EXCLUDED.hero_video_url,
    cover_image_url = EXCLUDED.cover_image_url,
    read_time = EXCLUDED.read_time,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_image = EXCLUDED.author_image;

-- -------------------------------------------------------------------------
-- 8. SERVICES ("WORK WITH ME")
-- -------------------------------------------------------------------------
INSERT INTO public.services (id, title, subtitle, price_estimate, badge, description, features, cta_text, is_popular, category, type)
VALUES
(
    'yoga-1on1',
    '1-on-1 Online Yoga',
    'Private Biomechanical Mentorship',
    'Quarterly Bespoke Cohort',
    'Limited to 8 Students / Season',
    'Ultra-personalized movement calibration designed for high-performers recovering from posture imbalances, rehabilitating joints, or mastering advanced asana.',
    ARRAY[
        'Comprehensive 75-min postural & mobility screen',
        '4x monthly 1-on-1 live 60-minute video mentoring',
        'Custom 4K sequence video library recorded specifically for you',
        'Direct WhatsApp priority voice notes for daily alignment feedback',
        'Weekly nervous system regulation & pranayama progressions'
    ],
    'Join the Waitlist',
    true,
    'fitness',
    'fitness'
),
(
    'diet-plans',
    'Custom Diet Plans',
    'Metabolic & Sattvic Plant Nutrition',
    '8-Week Metabolic Reset',
    'Next Intake Window Active',
    'Ditch chronic inflammation and food anxiety. Craft an energizing nutrition blueprint blending modern biochemical science with ancient Ayurvedic wisdom.',
    ARRAY[
        'In-depth metabolic lifestyle & circadian rhythm audit',
        'Custom anti-inflammatory weekly recipe blueprints & shopping lists',
        'Targeted herbal & adaptogenic supplementation protocol',
        'Dining-out and travel survival guide for frequent flyers',
        'Bi-weekly 30-min strategy review calls with Supriya'
    ],
    'Join the Waitlist',
    false,
    'nutrition',
    'nutrition'
),
(
    'brand-collabs',
    'Brand Collaborations',
    'Conscious Luxury & Ethical Partnerships',
    'Curated Brand Alignment',
    'Media Kit Available',
    'Partnering exclusively with visionary brands in sustainable luxury activewear, non-toxic living, bio-wellness technology, and conscious hospitality retreats.',
    ARRAY[
        'Authentic storytelling across 120,000+ highly engaged followers',
        'Cinema-grade 4K lifestyle photography and video production',
        'Organic product integrations into viral Sunday vlogs & Reels',
        'Dedicated newsletter spotlight to 24,000+ conscious subscribers',
        'Comprehensive performance analytics & commercial licensing'
    ],
    'Inquire for Partnership',
    false,
    'collaboration',
    'collaboration'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    price_estimate = EXCLUDED.price_estimate,
    badge = EXCLUDED.badge,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    cta_text = EXCLUDED.cta_text,
    is_popular = EXCLUDED.is_popular,
    category = EXCLUDED.category,
    type = EXCLUDED.type;

-- -------------------------------------------------------------------------
-- 9. TESTIMONIALS (Indian Cultural Context)
-- -------------------------------------------------------------------------
INSERT INTO public.testimonials (id, name, email, role_or_location, rating, message, image_url, is_approved)
VALUES
(
    'test-1',
    'Anjali Sharma',
    'anjali.sharma@example.com',
    'Private Mentorship Client • Vadodara & Ahmedabad',
    5,
    'Training 1-on-1 with Supriya radically re-architected how I handle executive burnout. Her somatic alignment methods eliminated 4 years of chronic thoracic pain within 6 weeks. She doesn''t just teach postures—she teaches conscious physical liberation.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    true
),
(
    'test-2',
    'Rahul Desai',
    'rahul.desai@innovatecorp.in',
    'Tech Founder & Asana Practitioner • Surat & Mumbai',
    5,
    'As a startup founder constantly battling screen posture and fatigue, Supriya’s precision with fascia unwinding and pelvic neutral biomechanics has been game changing. Her guidance is grounded, scientifically rigorous, and deeply restorative.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    true
),
(
    'test-3',
    'Priya Patel',
    'priya.patel@creativestudio.in',
    'Creative Director & Sunday Journal Reader • Vadodara',
    5,
    'The Sunday Journal newsletter alone is worth gold. But attending her weekend immersion in Baroda completely shifted how I breathe and move throughout my workday. Pure grace and authenticity.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    true
),
(
    'test-4',
    'Dr. Vikram Mehra',
    'vikram.mehra@healthsciences.org',
    'Orthopedic Surgeon & Pranayama Student • Bengaluru',
    5,
    'From a biomechanical standpoint, Supriya’s understanding of the scapulohumeral rhythm and spinal decompression is the most medically sound yoga instruction I have encountered in India.',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    true
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    role_or_location = EXCLUDED.role_or_location,
    rating = EXCLUDED.rating,
    message = EXCLUDED.message,
    image_url = EXCLUDED.image_url,
    is_approved = EXCLUDED.is_approved;

-- -------------------------------------------------------------------------
-- 10. DAILY INTENTION
-- -------------------------------------------------------------------------
INSERT INTO public.daily_intention (id, quote_text, theme, sanskrit_word, sanskrit_meaning)
VALUES
(
    'primary',
    'The breath is the bridge which connects life to consciousness, uniting the body and the mind in pure stillness.',
    'Somatic Vagus Reset & Equanimity',
    'Sthira & Sukha',
    'Steadiness & Joyful Ease'
)
ON CONFLICT (id) DO UPDATE SET
    quote_text = EXCLUDED.quote_text,
    theme = EXCLUDED.theme,
    sanskrit_word = EXCLUDED.sanskrit_word,
    sanskrit_meaning = EXCLUDED.sanskrit_meaning;
