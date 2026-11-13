-- =========================================================================
-- 02_SCHEMA.SQL: COMPLETE UNIFIED PRODUCTION DATABASE SCHEMA
-- Client: Supriya Bhavsar (Somatic Yoga & Lifestyle)
-- Platform: Supabase PostgreSQL (Public Schema)
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. SITE SETTINGS (Key-Value Global Config: Hero, Bio, Socials, Header)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 2. HERO SECTION (Dedicated Table for Headline, Subtext, & Cutout Portrait)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_section (
    id TEXT PRIMARY KEY DEFAULT 'hero-main',
    badge TEXT NOT NULL DEFAULT '500-HR RYT • Somatic Yoga & Lifestyle Alchemist',
    headline TEXT NOT NULL DEFAULT 'Find Your Balance. Elevate Your Lifestyle.',
    subtext TEXT NOT NULL DEFAULT 'Escape digital fatigue and reclaim somatic vitality through dynamic Vinyasa, fascial unwinding, and conscious daily rituals.',
    primary_cta TEXT NOT NULL DEFAULT 'Start Training',
    secondary_cta TEXT NOT NULL DEFAULT 'Watch Latest Video',
    portrait_url TEXT DEFAULT 'https://eialqaovgaphyhpmeunu.supabase.co/storage/v1/object/public/site-assets/hero/hero_1793346300050_f74n68.jpg',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 3. BRAND SPONSORS & PARTNERSHIPS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.brand_sponsors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    category TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    affiliate_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 4. GALLERY IMAGES (32 Curated Images across 4 Folders)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    folder TEXT NOT NULL CHECK (folder IN ('Asana & Flow', 'Studio & Space', 'Travel & Retreats', 'Casual & Lifestyle')),
    caption TEXT NOT NULL,
    image_url TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT '4/5',
    gradient_hint TEXT DEFAULT 'from-purple-950 via-slate-900 to-black',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Dual-sync table for coverflow carousel
CREATE TABLE IF NOT EXISTS public.gallery_carousel (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    folder TEXT NOT NULL,
    caption TEXT NOT NULL,
    image_url TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT '4/5',
    gradient_hint TEXT DEFAULT 'from-purple-950 via-slate-900 to-black',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 5. CONTENT VAULT & YOUTUBE VIDEOS (12 Masterclasses + 4 Vlogs)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_vault (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Yoga (YouTube)', 'Lifestyle Vlogs', 'Reels (Instagram)')),
    youtube_url TEXT,
    instagram_url TEXT,
    video_url TEXT,
    custom_thumbnail TEXT,
    duration TEXT NOT NULL DEFAULT '20:00',
    views TEXT NOT NULL DEFAULT '50K views',
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Yoga (YouTube)', 'Lifestyle Vlogs', 'Reels (Instagram)')),
    duration TEXT NOT NULL,
    views TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    video_url TEXT DEFAULT 'https://www.youtube.com/watch?v=sTANio_2E0Q',
    custom_thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    thumbnail_gradient TEXT DEFAULT 'from-[#1A1230] via-[#100C1F] to-[#0B0914]',
    thumbnail_accent TEXT DEFAULT '#C084FC',
    chapters JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 6. INSTAGRAM REELS (With Instant Direct Playback, Video Frame Thumbnails & Full Metrics)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.instagram_reels (
    id TEXT PRIMARY KEY,
    pose_name TEXT NOT NULL DEFAULT 'Asana Reel',
    caption TEXT NOT NULL DEFAULT 'Bite-sized somatic yoga drill & movement alignment.',
    creator_handle TEXT DEFAULT 'supriya_9508',
    audio_track TEXT DEFAULT '♫ Original Audio • Supriya',
    likes_count TEXT DEFAULT '48.2K',
    comments_count TEXT DEFAULT '1.2K',
    shares_count TEXT DEFAULT '9.4K',
    views_count TEXT DEFAULT '780K',
    duration TEXT DEFAULT '0:42',
    reel_url TEXT DEFAULT 'https://www.instagram.com/reel/C8qLd95M6P1/',
    video_url TEXT DEFAULT '/videos/sample.mp4',
    thumbnail_url TEXT,
    gradient TEXT DEFAULT 'from-[#22163D] via-[#140D26] to-[#0B0914]',
    cover_accent TEXT DEFAULT '#A78BFA',
    tags TEXT[] DEFAULT '{}',
    date TEXT DEFAULT 'Recent',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 7. BLOGS & LIFESTYLE VLOG ARTICLES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    hero_video_url TEXT,
    cover_image_url TEXT,
    read_time TEXT DEFAULT '6 min read',
    category TEXT DEFAULT 'Lifestyle & Philosophy',
    tags TEXT[] DEFAULT '{}',
    author TEXT DEFAULT 'Supriya Bhavsar',
    author_role TEXT DEFAULT '500-HR Somatic Practitioner • Vadodara',
    author_image TEXT,
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 8. TESTIMONIALS (With Display Order & Approval Workflow)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_approved BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 9. SERVICES & RETREAT PACKAGES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    badge TEXT,
    price_estimate TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    cta_text TEXT DEFAULT 'Apply for Private Intake',
    is_popular BOOLEAN DEFAULT false,
    type TEXT DEFAULT 'fitness' CHECK (type IN ('fitness', 'nutrition', 'collaboration')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 10. WAITLIST SUBMISSIONS & NEWSLETTER SUBSCRIBERS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.waitlist_submissions (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    experience_level TEXT,
    goal TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'contacted', 'archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 11. DAILY INTENTION WIDGET
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.daily_intention (
    id TEXT PRIMARY KEY DEFAULT 'daily-intention-1',
    quote_text TEXT NOT NULL,
    theme TEXT NOT NULL,
    sanskrit_word TEXT NOT NULL,
    sanskrit_meaning TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_carousel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_intention ENABLE ROW LEVEL SECURITY;

-- Allow unrestricted reads for frontend visitors
CREATE POLICY "Public Read: site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read: hero_section" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Public Read: brand_sponsors" ON public.brand_sponsors FOR SELECT USING (true);
CREATE POLICY "Public Read: gallery_images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public Read: gallery_carousel" ON public.gallery_carousel FOR SELECT USING (true);
CREATE POLICY "Public Read: content_vault" ON public.content_vault FOR SELECT USING (true);
CREATE POLICY "Public Read: videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public Read: instagram_reels" ON public.instagram_reels FOR SELECT USING (true);
CREATE POLICY "Public Read: blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public Read: testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read: services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read: daily_intention" ON public.daily_intention FOR SELECT USING (true);

-- Allow insertions & updates for CMS admin and public forms
CREATE POLICY "Allow All: site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: hero_section" ON public.hero_section FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: brand_sponsors" ON public.brand_sponsors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: gallery_images" ON public.gallery_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: gallery_carousel" ON public.gallery_carousel FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: content_vault" ON public.content_vault FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: instagram_reels" ON public.instagram_reels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: waitlist_submissions" ON public.waitlist_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: newsletter_subscribers" ON public.newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All: daily_intention" ON public.daily_intention FOR ALL USING (true) WITH CHECK (true);
