export type ContentCategory = 'Yoga (YouTube)' | 'Lifestyle Vlogs' | 'Reels (Instagram)';

export interface VideoContent {
  id: string;
  title: string;
  category: ContentCategory;
  duration: string;
  views: string;
  date: string;
  description: string;
  tags: string[];
  thumbnailGradient: string;
  thumbnailAccent: string;
  accentIcon: 'yoga' | 'vlog' | 'reel';
  videoUrl?: string;
  customThumbnailUrl?: string;
  chapters?: { time: string; title: string }[];
}

export interface InstagramReel {
  id: string;
  caption: string;
  creatorHandle: string;
  audioTrack: string;
  likesCount: string;
  commentsCount: string;
  sharesCount: string;
  viewsCount: string;
  duration: string;
  gradient: string;
  coverAccent: string;
  poseName: string;
  tags: string[];
  date: string;
  reelUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  priceEstimate: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  type: 'fitness' | 'nutrition' | 'collaboration';
}

export type GalleryFolder = 'All' | 'Asana & Flow' | 'Studio & Space' | 'Travel & Retreats' | 'Casual & Lifestyle';

export interface GalleryImage {
  id: string;
  title: string;
  folder: 'Asana & Flow' | 'Studio & Space' | 'Travel & Retreats' | 'Casual & Lifestyle';
  caption: string;
  gradientHint: string;
  aspectRatio?: string;
  displayOrder?: number;
  imageUrl?: string;
}

export interface WaitlistSubmission {
  id: string;
  serviceId: string;
  fullName: string;
  email: string;
  experienceLevel?: string;
  goals?: string;
  status: 'pending' | 'contacted' | 'accepted' | 'archived';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  interest: string;
  createdAt: string;
}

export interface SiteSettings {
  heroBadge: string;
  headline: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  bioQuote: string;
  bioStory: string;
  logoUrl?: string;
  heroPortraitUrl?: string;
  name?: string;
  location?: string;
  managerName?: string;
  managerHandle?: string;
  managementEmail?: string;
  instagramHandle?: string;
  youtubeChannel?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  message: string;
  imageUrl?: string;
  rating?: number;
  roleOrLocation?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface BrandSponsor {
  id: string;
  name: string;
  tagline?: string;
  category?: string;
  logoUrl?: string;
  affiliateUrl?: string;
  displayOrder?: number;
}

export interface DailyIntention {
  id: string;
  quoteText: string;
  theme?: string;
  sanskritWord?: string;
  sanskritMeaning?: string;
  isActive?: boolean;
  updatedAt?: string;
}

export interface HeroSectionData {
  id?: string;
  badge: string;
  headline: string;
  subtext: string;
  primaryCta: string;
  secondaryCta: string;
  portraitUrl?: string;
}
