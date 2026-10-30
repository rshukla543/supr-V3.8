-- =========================================================================
-- SUPRIYA BHAVSAR - YOGA TRAINER & LIFESTYLE CREATOR (VADODARA, GUJARAT)
-- Complete Idempotent PostgreSQL & Supabase DDL Schema
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. SITE SETTINGS TABLE (Global Branding, Logo & Management Details)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 2. HERO SECTION TABLE (Hero Headlines, CTAs & Cutout Portrait)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_section (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    badge TEXT NOT NULL DEFAULT '500-HR RYT • Somatic Yoga & Lifestyle Alchemist',
    headline TEXT NOT NULL DEFAULT 'Find Your Balance. Elevate Your Lifestyle.',
    subtext TEXT NOT NULL DEFAULT 'Rooted in Vadodara, Gujarat. Through somatic alignment, classical Vinyasa, and conscious rituals, I guide modern seekers into grounded mental stillness and effortless physical grace.',
    primary_cta TEXT NOT NULL DEFAULT 'Start Training',
    secondary_cta TEXT NOT NULL DEFAULT 'Watch Latest Video',
    portrait_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS portrait_url TEXT;
ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS badge TEXT DEFAULT '500-HR RYT • Somatic Yoga & Lifestyle Alchemist';
ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS headline TEXT DEFAULT 'Find Your Balance. Elevate Your Lifestyle.';
ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS subtext TEXT;
ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS primary_cta TEXT DEFAULT 'Start Training';
ALTER TABLE public.hero_section ADD COLUMN IF NOT EXISTS secondary_cta TEXT DEFAULT 'Watch Latest Video';

-- -------------------------------------------------------------------------
-- 3. BRAND SPONSORS TABLE (Partnerships Marquee with Logos & Affiliate Links)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.brand_sponsors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    category TEXT,
    logo_url TEXT,
    affiliate_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.brand_sponsors ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.brand_sponsors ADD COLUMN IF NOT EXISTS affiliate_url TEXT;
ALTER TABLE public.brand_sponsors ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE public.brand_sponsors ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.brand_sponsors ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- -------------------------------------------------------------------------
-- 4. GALLERY CAROUSEL TABLE (3D Coverflow Visual Archive)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_carousel (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    folder TEXT NOT NULL CHECK (folder IN ('Asana & Flow', 'Studio & Space', 'Travel & Retreats', 'Casual & Lifestyle')),
    caption TEXT NOT NULL,
    image_url TEXT,
    aspect_ratio TEXT DEFAULT '4/5',
    gradient_hint TEXT DEFAULT 'from-violet-950/80 via-slate-900 to-[#0B0914]',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gallery_carousel ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.gallery_carousel ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- Alias backward compatibility for gallery_images
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    folder TEXT NOT NULL,
    caption TEXT NOT NULL,
    image_url TEXT,
    aspect_ratio TEXT DEFAULT '4/5',
    gradient_hint TEXT DEFAULT 'from-violet-950/80 via-slate-900 to-[#0B0914]',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 5. CONTENT VAULT TABLE (YouTube Embeds, Instagram Reels & Thumbnails)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_vault (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Yoga (YouTube)', 'Lifestyle Vlogs', 'Reels (Instagram)')),
    youtube_url TEXT,
    instagram_url TEXT,
    custom_thumbnail TEXT,
    duration TEXT NOT NULL DEFAULT '20:00',
    views TEXT NOT NULL DEFAULT '50K views',
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.content_vault ADD COLUMN IF NOT EXISTS youtube_url TEXT;
ALTER TABLE public.content_vault ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE public.content_vault ADD COLUMN IF NOT EXISTS custom_thumbnail TEXT;
ALTER TABLE public.content_vault ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Separate tables for YouTube Videos & Instagram Reels for modular queries
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

ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS custom_thumbnail_url TEXT;

CREATE TABLE IF NOT EXISTS public.instagram_reels (
    id TEXT PRIMARY KEY,
    caption TEXT NOT NULL,
    creator_handle TEXT DEFAULT 'supriya_9508' NOT NULL,
    audio_track TEXT NOT NULL,
    likes_count TEXT NOT NULL,
    comments_count TEXT NOT NULL,
    shares_count TEXT NOT NULL,
    views_count TEXT NOT NULL,
    duration TEXT NOT NULL,
    reel_url TEXT DEFAULT 'https://www.instagram.com/reel/C-xyz123/',
    gradient TEXT DEFAULT 'from-[#22163D] via-[#140D26] to-[#0B0914]',
    cover_accent TEXT DEFAULT '#A78BFA',
    pose_name TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    date TEXT DEFAULT 'Recent',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.instagram_reels ADD COLUMN IF NOT EXISTS reel_url TEXT;

-- -------------------------------------------------------------------------
-- 6. TESTIMONIALS TABLE (Client Reflections with Moderation Approval)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    image_url TEXT,
    rating INT DEFAULT 5,
    role_or_location TEXT DEFAULT 'Practitioner',
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS rating INT DEFAULT 5;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS role_or_location TEXT DEFAULT 'Practitioner';
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials (is_approved);

-- -------------------------------------------------------------------------
-- 7. WAITLIST LEADS TABLE (Intake for 1-on-1, Nutrition & Collaborations)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.waitlist_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    selected_service TEXT NOT NULL,
    experience_level TEXT DEFAULT 'All Levels',
    goals TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'accepted', 'archived')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.waitlist_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    experience_level TEXT,
    goals TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 8. DAILY INTENTION TABLE (Mindful Click-and-Hold Wellness Quotes)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.daily_intention (
    id TEXT PRIMARY KEY DEFAULT 'current',
    quote_text TEXT NOT NULL,
    theme TEXT DEFAULT 'Somatic Presence',
    sanskrit_word TEXT DEFAULT 'Sthira',
    sanskrit_meaning TEXT DEFAULT 'Steadiness & Grounding',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.daily_intention ADD COLUMN IF NOT EXISTS quote_text TEXT;
ALTER TABLE public.daily_intention ADD COLUMN IF NOT EXISTS theme TEXT;
ALTER TABLE public.daily_intention ADD COLUMN IF NOT EXISTS sanskrit_word TEXT;
ALTER TABLE public.daily_intention ADD COLUMN IF NOT EXISTS sanskrit_meaning TEXT;
ALTER TABLE public.daily_intention ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- -------------------------------------------------------------------------
-- 9. SERVICES & NEWSLETTER TABLES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    badge TEXT,
    price_estimate TEXT,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    cta_text TEXT NOT NULL DEFAULT 'Join the Waitlist',
    is_popular BOOLEAN DEFAULT false,
    type TEXT NOT NULL CHECK (type IN ('fitness', 'nutrition', 'collaboration')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    interest TEXT DEFAULT 'all',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -------------------------------------------------------------------------
-- 10. STORAGE BUCKETS CONFIGURATION (gallery-images & site-assets)
-- -------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('gallery-images', 'gallery-images', true),
    ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Gallery Images" ON storage.objects;
CREATE POLICY "Public Read Gallery Images" 
ON storage.objects FOR SELECT 
USING (bucket_id IN ('gallery-images', 'site-assets'));

DROP POLICY IF EXISTS "Public Insert Gallery Images" ON storage.objects;
CREATE POLICY "Public Insert Gallery Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id IN ('gallery-images', 'site-assets'));

DROP POLICY IF EXISTS "Public Update Gallery Images" ON storage.objects;
CREATE POLICY "Public Update Gallery Images" 
ON storage.objects FOR UPDATE 
USING (bucket_id IN ('gallery-images', 'site-assets'));

DROP POLICY IF EXISTS "Public Delete Gallery Images" ON storage.objects;
CREATE POLICY "Public Delete Gallery Images" 
ON storage.objects FOR DELETE 
USING (bucket_id IN ('gallery-images', 'site-assets'));

-- -------------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES (CLEAN & NON-DUPLICATIVE)
-- -------------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_carousel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_intention ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 11.1 site_settings
DROP POLICY IF EXISTS "Public Read Site Settings" ON public.site_settings;
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Settings" ON public.site_settings;
CREATE POLICY "Admin All Settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- 11.2 hero_section
DROP POLICY IF EXISTS "Public Read Hero Section" ON public.hero_section;
CREATE POLICY "Public Read Hero Section" ON public.hero_section FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Hero Section" ON public.hero_section;
CREATE POLICY "Admin All Hero Section" ON public.hero_section FOR ALL USING (true) WITH CHECK (true);

-- 11.3 brand_sponsors
DROP POLICY IF EXISTS "Public Read Brand Sponsors" ON public.brand_sponsors;
CREATE POLICY "Public Read Brand Sponsors" ON public.brand_sponsors FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Brand Sponsors" ON public.brand_sponsors;
CREATE POLICY "Admin All Brand Sponsors" ON public.brand_sponsors FOR ALL USING (true) WITH CHECK (true);

-- 11.4 gallery_carousel & gallery_images
DROP POLICY IF EXISTS "Public Read Gallery Carousel" ON public.gallery_carousel;
CREATE POLICY "Public Read Gallery Carousel" ON public.gallery_carousel FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Gallery Carousel" ON public.gallery_carousel;
CREATE POLICY "Admin All Gallery Carousel" ON public.gallery_carousel FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Gallery" ON public.gallery_images;
CREATE POLICY "Public Read Gallery" ON public.gallery_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Gallery" ON public.gallery_images;
CREATE POLICY "Admin All Gallery" ON public.gallery_images FOR ALL USING (true) WITH CHECK (true);

-- 11.5 content_vault, videos, instagram_reels
DROP POLICY IF EXISTS "Public Read Content Vault" ON public.content_vault;
CREATE POLICY "Public Read Content Vault" ON public.content_vault FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Content Vault" ON public.content_vault;
CREATE POLICY "Admin All Content Vault" ON public.content_vault FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Videos" ON public.videos;
CREATE POLICY "Public Read Videos" ON public.videos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Videos" ON public.videos;
CREATE POLICY "Admin All Videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Reels" ON public.instagram_reels;
CREATE POLICY "Public Read Reels" ON public.instagram_reels FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Reels" ON public.instagram_reels;
CREATE POLICY "Admin All Reels" ON public.instagram_reels FOR ALL USING (true) WITH CHECK (true);

-- 11.6 testimonials
DROP POLICY IF EXISTS "Public Read Approved Testimonials" ON public.testimonials;
CREATE POLICY "Public Read Approved Testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
DROP POLICY IF EXISTS "Public Insert Testimonials" ON public.testimonials;
CREATE POLICY "Public Insert Testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Testimonials" ON public.testimonials;
CREATE POLICY "Admin All Testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

-- 11.7 waitlist_leads & waitlist_submissions
DROP POLICY IF EXISTS "Public Read Waitlist Leads" ON public.waitlist_leads;
CREATE POLICY "Public Read Waitlist Leads" ON public.waitlist_leads FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Waitlist Leads" ON public.waitlist_leads;
CREATE POLICY "Public Insert Waitlist Leads" ON public.waitlist_leads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Waitlist Leads" ON public.waitlist_leads;
CREATE POLICY "Admin All Waitlist Leads" ON public.waitlist_leads FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Waitlist Submissions" ON public.waitlist_submissions;
CREATE POLICY "Public Read Waitlist Submissions" ON public.waitlist_submissions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Waitlist Submissions" ON public.waitlist_submissions;
CREATE POLICY "Public Insert Waitlist Submissions" ON public.waitlist_submissions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Waitlist Submissions" ON public.waitlist_submissions;
CREATE POLICY "Admin All Waitlist Submissions" ON public.waitlist_submissions FOR ALL USING (true) WITH CHECK (true);

-- 11.8 daily_intention
DROP POLICY IF EXISTS "Public Read Daily Intention" ON public.daily_intention;
CREATE POLICY "Public Read Daily Intention" ON public.daily_intention FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Daily Intention" ON public.daily_intention;
CREATE POLICY "Admin All Daily Intention" ON public.daily_intention FOR ALL USING (true) WITH CHECK (true);

-- 11.9 services & newsletter_subscribers
DROP POLICY IF EXISTS "Public Read Services" ON public.services;
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin All Services" ON public.services;
CREATE POLICY "Admin All Services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public Read Newsletter" ON public.newsletter_subscribers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public Insert Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin All Newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Admin All Newsletter" ON public.newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);
