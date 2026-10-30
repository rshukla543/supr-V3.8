# Project Context: Supriya | Yoga & Lifestyle Creator

## 1. System Overview
- **Domain:** Luxury wellness creator, yoga mentorship hub, and multi-platform content portfolio.
- **Frontend Stack:** React 18, Vite 6, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.
- **Database & Backend:** Supabase PostgreSQL, Row Level Security (RLS), Edge-compatible REST SDK.
- **CMS Admin:** Built-in dashboard with real-time CRUD management for Videos, Instagram Reels, Offerings/Services, Gallery Carousel Photos, Waitlist Submissions, and Newsletter Subscribers.

## 2. Supabase Integration Architecture
- **Supabase Endpoint:** `https://eialqaovgaphyhpmeunu.supabase.co`
- **Client Configuration:** `src/lib/supabase.ts` initializing `@supabase/supabase-js` client with environment variable fallback and mock-fallback persistence.
- **Primary Entities:**
  - `videos`: 4K YouTube masterclasses, chapters, tags, view analytics.
  - `instagram_reels`: Short-form vertical reels, sound tracks, engagement counters.
  - `services`: 'Work With Me' offerings (1-on-1, Nutrition, Brand Collabs).
  - `gallery_images`: Categorized photo folders for the interactive drag carousel.
  - `waitlist_submissions`: Lead intake for coaching & brand partnership inquiries.
  - `newsletter_subscribers`: Email subscriber capture with focus area preferences.
  - `site_settings`: Global editable copy for hero headline, quote, and biography.

## 3. Visual & Aesthetic Constitution
- **Atmosphere:** Deep Obsidian (`#07080C`) luxury canvas with subtle floating stars and harmonic ruby crimson & celestial blue spheres.
- **Typography:** Playfair Display editorial serifs paired with Plus Jakarta Sans geometry.
- **Motion Physics:** Word-by-word staggered typography reveals and spring-based drag physics on the image carousel.
