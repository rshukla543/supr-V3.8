import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DynamicIrisBackground } from './components/DynamicIrisBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { ContentVaultSection } from './components/ContentVaultSection';
import { ServicesSection } from './components/ServicesSection';
import { MindfulnessWidget } from './components/MindfulnessWidget';
import { AboutNewsletterSection } from './components/AboutNewsletterSection';
import { BrandMarquee } from './components/BrandMarquee';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DailyIntentionSection } from './components/DailyIntentionSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { InstagramReelModal } from './components/InstagramReelModal';
import { WaitlistModal } from './components/WaitlistModal';
import { AdminDashboard } from './components/AdminDashboard';
import {
  VideoContent,
  InstagramReel,
  ServiceItem,
  GalleryImage,
  WaitlistSubmission,
  NewsletterSubscriber,
  SiteSettings,
  Testimonial,
  BrandSponsor,
  DailyIntention,
} from './types';
import {
  getVideos,
  getReels,
  getServices,
  getGallery,
  getWaitlistSubmissions,
  getSubscribers,
  getSiteSettings,
  getAllTestimonials,
  getBrandSponsors,
  getDailyIntention,
  INITIAL_SITE_SETTINGS,
} from './lib/supabase';
import { Play, Wind, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

export function App() {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [sponsors, setSponsors] = useState<BrandSponsor[]>([]);
  const [dailyIntention, setDailyIntention] = useState<DailyIntention | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('yoga-1on1');

  // Load all data from Supabase / cached store
  const loadData = async () => {
    try {
      const [v, r, s, g, w, n, settings, t, sp, di] = await Promise.all([
        getVideos(),
        getReels(),
        getServices(),
        getGallery(),
        getWaitlistSubmissions(),
        getSubscribers(),
        getSiteSettings(),
        getAllTestimonials(),
        getBrandSponsors(),
        getDailyIntention(),
      ]);
      setVideos(v);
      setReels(r);
      setServices(s);
      setGallery(g);
      setWaitlist(w);
      setSubscribers(n);
      setSiteSettings(settings);
      setTestimonials(t);
      setSponsors(sp);
      setDailyIntention(di);
    } catch (err) {
      console.warn('Error loading database entities:', err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenWaitlist = (serviceId?: string) => {
    setSelectedServiceId(serviceId || 'yoga-1on1');
    setIsWaitlistOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    setIsWaitlistOpen(true);
  };

  const handleWatchHeroVideo = () => {
    if (videos.length > 0) {
      setSelectedVideo(videos[0]);
    }
  };

  const handleStartTraining = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenWaitlist('yoga-1on1');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0914] text-[#F8FAFC] flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* Dark Ambient Canvas Background with Flying Stars & Subtle Midnight Lotus Spheres */}
      <DynamicIrisBackground />

      {/* Top Fixed Navigation: Single Word Links, Dynamic Logo & Silver Glass CTA */}
      <Navbar
        onOpenWaitlist={() => handleOpenWaitlist()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        logoUrl={siteSettings.logoUrl}
      />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10 pb-16 md:pb-0">
        {/* 1. Hero Section with Word-by-Word Motion and Dynamic Cutout Frame */}
        <HeroSection
          siteSettings={siteSettings}
          onStartTraining={handleStartTraining}
          onWatchVideo={handleWatchHeroVideo}
          isLoading={isLoadingSettings}
        />

        {/* 2. Brand Collaborations Infinite Looping Marquee */}
        <BrandMarquee sponsors={sponsors} />

        {/* 3. 3D Coverflow Drag Carousel Gallery Section (Right Above/Before Content Vault) */}
        <GallerySection images={gallery} />

        {/* 4. The Content Vault (YouTube Videos Grid + Instagram Reels Masonry) */}
        <ContentVaultSection
          videos={videos}
          reels={reels}
          onSelectVideo={(video) => setSelectedVideo(video)}
          onSelectReel={(reel) => setSelectedReel(reel)}
        />

        {/* 5. Work With Me Services ('Future Monetization' Floating Cards) */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectService}
        />

        {/* 6. Transformations & Stories Testimonials Section + Submission Form */}
        <TestimonialsSection
          testimonials={testimonials}
          onTestimonialSubmitted={loadData}
        />

        {/* 7. Interactive Somatic Breathwork Widget */}
        <MindfulnessWidget />

        {/* 8. About & Newsletter */}
        <AboutNewsletterSection />

        {/* 9. Mindful Moment: Daily Intention Liquid-Fill Card (Above Footer) */}
        <DailyIntentionSection intention={dailyIntention || undefined} />
      </main>

      {/* 10. Dark Minimalist Footer - Center Aligned on Mobile with Dynamic Logo */}
      <Footer logoUrl={siteSettings.logoUrl} siteSettings={siteSettings} />

      {/* Mobile Alternative Quick Action Dock */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="bg-[#120D24]/95 backdrop-blur-xl border border-purple-500/25 rounded-2xl p-2 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          <a
            href="#gallery"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[10px] text-slate-300 hover:text-white"
          >
            <ImageIcon className="w-4 h-4 mb-0.5 text-purple-400" />
            <span>Gallery</span>
          </a>

          <a
            href="#content-vault"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[10px] text-slate-300 hover:text-white"
          >
            <Play className="w-4 h-4 mb-0.5 text-indigo-400" />
            <span>Vault</span>
          </a>

          <a
            href="#testimonials"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[10px] text-slate-300 hover:text-white"
          >
            <Wind className="w-4 h-4 mb-0.5 text-purple-300" />
            <span>Stories</span>
          </a>

          <button
            onClick={() => handleOpenWaitlist()}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider btn-silver-glass cursor-pointer"
          >
            <span>Waitlist</span>
            <ArrowUpRight className="w-3 h-3 text-[#0B0914]" />
          </button>
        </div>
      </div>

      {/* Admin Dashboard CMS Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        videos={videos}
        reels={reels}
        services={services}
        gallery={gallery}
        waitlist={waitlist}
        subscribers={subscribers}
        siteSettings={siteSettings}
        testimonials={testimonials}
        sponsors={sponsors}
        dailyIntention={dailyIntention || undefined}
        onRefreshData={loadData}
      />

      {/* Interactive Modals with AnimatePresence */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedReel && (
          <InstagramReelModal
            reel={selectedReel}
            onClose={() => setSelectedReel(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWaitlistOpen && (
          <WaitlistModal
            initialServiceId={selectedServiceId}
            onClose={() => setIsWaitlistOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
