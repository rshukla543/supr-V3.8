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
} from '../types';
import { VIDEO_DATA, INSTAGRAM_REELS, SERVICES_DATA } from '../data/mockData';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl =
  metaEnv.VITE_SUPABASE_URL || 'https://eialqaovgaphyhpmeunu.supabase.co';
const supabaseAnonKey =
  metaEnv.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpYWxxYW92Z2FwaHlocG1ldW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNTYyNzQsImV4cCI6MjEwODgzMjI3NH0.LAKcBiy1zQpIpFu6KwZqo-QJJ6zUYqvbFkvoDes76K4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Urdhva Dhanurasana (Wheel Pose)',
    folder: 'Asana & Flow',
    caption: 'Deep thoracic spine expansion at sunrise over the sacred Ganges.',
    gradientHint: 'from-purple-950/80 via-slate-900 to-black',
    displayOrder: 1,
  },
  {
    id: 'gal-2',
    title: 'Natarajasana (Lord of the Dance)',
    folder: 'Asana & Flow',
    caption: 'Finding poise, pelvic alignment, and an unwavering focal drishti.',
    gradientHint: 'from-indigo-950/80 via-slate-900 to-black',
    displayOrder: 2,
  },
  {
    id: 'gal-3',
    title: 'Himalayan Altar & Singing Bowls',
    folder: 'Studio & Space',
    caption: 'Hand-hammered brass bells, palo santo, and linen mats.',
    gradientHint: 'from-purple-900/60 via-slate-950 to-black',
    displayOrder: 3,
  },
  {
    id: 'gal-4',
    title: 'Minimalist Bamboo Studio Nook',
    folder: 'Studio & Space',
    caption: 'Natural morning light calibrated for circadian presence and quietude.',
    gradientHint: 'from-slate-900 via-purple-950/50 to-black',
    displayOrder: 4,
  },
  {
    id: 'gal-5',
    title: 'Ubud Rice Terrace Meditation',
    folder: 'Travel & Retreats',
    caption: 'Mid-morning stillness enveloped by tropical mist and birdsong.',
    gradientHint: 'from-indigo-950/70 via-purple-950/40 to-black',
    displayOrder: 5,
  },
  {
    id: 'gal-6',
    title: 'Ganges River Ghats at Dawn',
    folder: 'Travel & Retreats',
    caption: 'Chanting ancient mantras along the misty riverbanks of Rishikesh.',
    gradientHint: 'from-purple-950/70 via-slate-950 to-black',
    displayOrder: 6,
  },
  {
    id: 'gal-7',
    title: 'Ceremonial Matcha & Journaling',
    folder: 'Casual & Lifestyle',
    caption: 'Slow mornings without screens, emails, or external notifications.',
    gradientHint: 'from-purple-900/50 via-slate-900 to-black',
    displayOrder: 7,
  },
  {
    id: 'gal-8',
    title: 'Organic Herbal Infusions',
    folder: 'Casual & Lifestyle',
    caption: 'Vibrant Ayurvedic tulsi and golden turmeric roots brewed for balance.',
    gradientHint: 'from-purple-950/70 via-slate-900 to-black',
    displayOrder: 8,
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
    'For over eight years, I navigated the unrelenting cadence of corporate tech until severe nervous system burnout compelled me to step off the treadmill and re-learn what it means to actually inhabit the human body. My search brought me to Rishikesh and Bali for 500+ hours of advanced classical Vinyasa and somatic breathwork.',
  logoUrl: '',
  heroPortraitUrl: '',
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    roleOrLocation: 'Private Mentorship Client • London, UK',
    rating: 5,
    message: 'Training 1-on-1 with Supriya radically re-architected how I handle executive burnout. Her somatic alignment methods eliminated 4 years of chronic thoracic pain within 6 weeks. She doesn\'t just teach postures—she teaches conscious physical liberation.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: 'test-2',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@wellnessclinic.org',
    roleOrLocation: 'Orthopedic Surgeon & Daily Yogi • San Francisco, CA',
    rating: 5,
    message: 'As a surgeon on my feet for 10-hour operations, my posture was collapsing. Supriya’s precision with fascia unwinding and pelvic neutral biomechanics is unmatched. Her guidance is grounded, scientifically rigorous, and deeply restorative.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-02-02T14:20:00Z',
  },
  {
    id: 'test-3',
    name: 'Aanya Sharma',
    email: 'aanya.wellness@gmail.com',
    roleOrLocation: 'Holistic Nutritionist • Mumbai & Rishikesh',
    rating: 5,
    message: 'The custom diet & Ayurvedic rhythm plan designed by Supriya restored my circadian vitality after years of irregular travel. Her philosophy honors real food, cyclical energy, and genuine self-love. I have never felt more balanced in my skin.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-02-18T09:15:00Z',
  },
  {
    id: 'test-4',
    name: 'Julian Montgomery',
    email: 'julian.m@vibecreatives.co',
    roleOrLocation: 'Creative Director • Brooklyn, NY',
    rating: 5,
    message: 'Her breathwork sessions before our brand retreat completely rewired our collective focus. Supriya brings a grounded calmness that cuts straight through modern noise. An extraordinary teacher and conscious creator.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    isApproved: true,
    createdAt: '2025-03-01T16:45:00Z',
  },
];


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

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      duration: item.duration,
      views: item.views,
      date: item.date,
      description: item.description,
      videoUrl: item.video_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      customThumbnailUrl: item.custom_thumbnail_url || undefined,
      tags: item.tags || [],
      thumbnailGradient: item.thumbnail_gradient,
      thumbnailAccent: item.thumbnail_accent,
      accentIcon: item.category === 'Lifestyle Vlogs' ? 'vlog' : item.category === 'Reels (Instagram)' ? 'reel' : 'yoga',
      chapters: item.chapters || [],
    }));
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

// REELS
export async function getReels(): Promise<InstagramReel[]> {
  try {
    const { data, error } = await supabase.from('instagram_reels').select('*');
    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_reels');
      return local ? JSON.parse(local) : INSTAGRAM_REELS;
    }
    return data.map((item) => ({
      id: item.id,
      caption: item.caption,
      creatorHandle: item.creator_handle,
      audioTrack: item.audio_track,
      likesCount: item.likes_count,
      commentsCount: item.comments_count,
      sharesCount: item.shares_count,
      viewsCount: item.views_count,
      duration: item.duration,
      gradient: item.gradient,
      coverAccent: item.cover_accent,
      poseName: item.pose_name,
      tags: item.tags || [],
      date: item.date,
    }));
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
    });
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

export async function deleteReel(id: string): Promise<void> {
  const current = await getReels();
  const filtered = current.filter((r) => r.id !== id);
  localStorage.setItem('supriya_reels', JSON.stringify(filtered));

  try {
    await supabase.from('instagram_reels').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice:', err);
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
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_gallery');
      return local ? JSON.parse(local) : INITIAL_GALLERY_IMAGES;
    }
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      folder: item.folder,
      caption: item.caption,
      aspectRatio: item.aspect_ratio || '4/5',
      gradientHint: item.gradient_hint || 'from-purple-950 via-slate-900 to-black',
      displayOrder: item.display_order,
      imageUrl: item.image_url || item.url,
    }));
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

  try {
    await supabase.from('gallery_images').upsert({
      id: image.id,
      title: image.title,
      folder: image.folder,
      caption: image.caption,
      aspect_ratio: image.aspectRatio,
      gradient_hint: image.gradientHint,
      display_order: image.displayOrder || current.length + 1,
      image_url: image.imageUrl,
    });
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const current = await getGallery();
  const filtered = current.filter((g) => g.id !== id);
  localStorage.setItem('supriya_gallery', JSON.stringify(filtered));

  try {
    await supabase.from('gallery_images').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase sync notice:', err);
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
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error || !data || data.length === 0) {
      const local = localStorage.getItem('supriya_site_settings');
      return local ? JSON.parse(local) : INITIAL_SITE_SETTINGS;
    }

    const hero = data.find((d) => d.key === 'hero')?.value || {};
    const bio = data.find((d) => d.key === 'bio')?.value || {};
    const branding = data.find((d) => d.key === 'branding')?.value || {};

    return {
      heroBadge: hero.badge || INITIAL_SITE_SETTINGS.heroBadge,
      headline: hero.headline || INITIAL_SITE_SETTINGS.headline,
      subtext: hero.subtext || INITIAL_SITE_SETTINGS.subtext,
      primaryCta: hero.primary_cta || INITIAL_SITE_SETTINGS.primaryCta,
      secondaryCta: hero.secondary_cta || INITIAL_SITE_SETTINGS.secondaryCta,
      bioQuote: bio.quote || INITIAL_SITE_SETTINGS.bioQuote,
      bioStory: bio.story || INITIAL_SITE_SETTINGS.bioStory,
      logoUrl: branding.logo_url || hero.logo_url || INITIAL_SITE_SETTINGS.logoUrl,
      heroPortraitUrl: branding.hero_portrait_url || hero.portrait_url || INITIAL_SITE_SETTINGS.heroPortraitUrl,
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
        },
      },
    ]);
  } catch (err) {
    console.warn('Supabase sync notice:', err);
  }
}

// ----------------------------------------------------------------------
// TESTIMONIALS (Transformations & Stories + Review Moderation)
// ----------------------------------------------------------------------

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
        const parsed: Testimonial[] = JSON.parse(local);
        return parsed.filter((t) => t.isApproved);
      }
      return INITIAL_TESTIMONIALS.filter((t) => t.isApproved);
    }

    return data.map((t) => ({
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
  } catch {
    const local = localStorage.getItem('supriya_testimonials');
    if (local) {
      const parsed: Testimonial[] = JSON.parse(local);
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
        return JSON.parse(local);
      }
      localStorage.setItem('supriya_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }

    return data.map((t) => ({
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
  } catch {
    const local = localStorage.getItem('supriya_testimonials');
    if (local) {
      return JSON.parse(local);
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

