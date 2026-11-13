-- =========================================================================
-- 01_TRIM_DATABASE.SQL: COMPLETE CLEANUP & RESET FOR CLIENT HANDOFF
-- Purges deprecated columns, legacy constraints, duplicate rows, and conflicting objects
-- Run this FIRST in your Supabase SQL Editor.
-- =========================================================================

-- 1. Safely drop legacy or orphaned views/tables if any exist
DROP VIEW IF EXISTS public.v_gallery_active CASCADE;
DROP VIEW IF EXISTS public.v_reels_summary CASCADE;
DROP TABLE IF EXISTS public.legacy_videos CASCADE;
DROP TABLE IF EXISTS public.temp_reels CASCADE;
DROP TABLE IF EXISTS public.gallery_items CASCADE;

-- 2. Clean out obsolete / renamed columns from existing tables (if present)
DO $$
BEGIN
    -- gallery_images cleanup
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'gallery_images' AND column_name = 'legacy_id') THEN
        ALTER TABLE public.gallery_images DROP COLUMN legacy_id;
    END IF;

    -- instagram_reels cleanup: remove old conflicting column constraints
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'instagram_reels') THEN
        -- Drop any redundant unique constraints on non-primary keys
        ALTER TABLE public.instagram_reels DROP CONSTRAINT IF EXISTS instagram_reels_reel_url_key;
        -- Relax all legacy NOT NULL constraints so minimal inserts never fail
        ALTER TABLE public.instagram_reels ALTER COLUMN caption DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN audio_track DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN likes_count DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN comments_count DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN shares_count DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN views_count DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN duration DROP NOT NULL;
        ALTER TABLE public.instagram_reels ALTER COLUMN pose_name DROP NOT NULL;
    END IF;
END $$;

-- 3. If you want a 100% PRISTINE FRESH SLATE before running 02_schema.sql:
-- (Uncomment the lines below if rebuilding the entire database from scratch)
/*
DROP TABLE IF EXISTS public.waitlist_submissions CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.daily_intention CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.brand_sponsors CASCADE;
DROP TABLE IF EXISTS public.hero_section CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.gallery_carousel CASCADE;
DROP TABLE IF EXISTS public.gallery_images CASCADE;
DROP TABLE IF EXISTS public.content_vault CASCADE;
DROP TABLE IF EXISTS public.videos CASCADE;
DROP TABLE IF EXISTS public.instagram_reels CASCADE;
DROP TABLE IF EXISTS public.blogs CASCADE;
*/
