export type ContentCategory = 'Yoga & Fitness' | 'Lifestyle Vlogs' | 'Shorts/Reels';

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
  chapters?: { time: string; title: string }[];
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
}
