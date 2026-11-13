import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { DynamicIrisBackground } from './components/DynamicIrisBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GallerySection } from './components/GallerySection';
import { YogaVideosSection } from './components/YogaVideosSection';
import { LifestyleVlogsSection } from './components/LifestyleVlogsSection';
import { AsanaReelsSection } from './components/AsanaReelsSection';
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
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BlogDetailPage } from './components/BlogDetailPage';
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
  BlogEntry,
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
  getBlogs,
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
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('yoga-1on1');

  // Load all data from Supabase / cached store
  const loadData = async () => {
    try {
      const [v, r, s, g, w, n, settings, t, sp, di, b] = await Promise.all([
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
        getBlogs(),
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
      setBlogs(b);
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
      
      {/* Global Toast Notification Provider */}
      <Toaster position="bottom-right" richColors theme="dark" />

      {/* Dark Ambient Canvas Background with Flying Stars & Subtle Midnight Lotus Spheres */}
      <DynamicIrisBackground />

      {/* Top Fixed Navigation: Single Word Links, Dynamic Logo & Silver Glass CTA */}
      <Navbar
        onOpenWaitlist={() => handleOpenWaitlist()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        logoUrl={siteSettings.logoUrl}
      />

      {/* Dynamic Routing: Main Sanctuary Page vs Dedicated Full-Article Blog Route (/blog/:id) */}
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex-grow relative z-10 pb-16 md:pb-0">
              {/* 1. Hero Section with Grand Sacred Aura & Dynamic AI Atmosphere Engine */}
              <HeroSection
                siteSettings={siteSettings}
                onStartTraining={handleStartTraining}
                onWatchVideo={handleWatchHeroVideo}
                isLoading={isLoadingSettings}
              />

              {/* 2. Visual Archive: 3D Coverflow Drag Carousel Gallery Section (Top Position) */}
              <GallerySection images={gallery} />

              {/* 3. Section A: Yoga Masterclasses & Sessions (YouTube - 6 initial + Load More) */}
              <YogaVideosSection
                videos={videos}
                onSelectVideo={(video) => setSelectedVideo(video)}
              />

              {/* 4. Section B: Mindful Lifestyle & Philosophy Vlogs (Deep-Dive Vlogs with Chapters) */}
              <LifestyleVlogsSection
                videos={videos}
                blogs={blogs}
                onSelectVideo={(video) => setSelectedVideo(video)}
              />

              {/* 5. Section C: Bite-Sized Asana Reels & Drills (8 Vertical Reels with Direct Inline Play) */}
              <AsanaReelsSection
                reels={reels}
                onSelectReel={(reel) => setSelectedReel(reel)}
              />

              {/* 6. Work With Me Services ('Future Monetization' Floating Cards) */}
              <ServicesSection
                services={services}
                onSelectService={handleSelectService}
              />

              {/* 7. Brand Collaborations & Conscious Partnerships (Detailed Square Cards at Bottom) */}
              <BrandMarquee sponsors={sponsors} />

              {/* 8. Transformations & Stories Testimonials Section + Slide-Down Accordion Form */}
              <TestimonialsSection
                testimonials={testimonials}
                onTestimonialSubmitted={loadData}
              />

              {/* 9. Interactive Somatic Breathwork Widget */}
              <MindfulnessWidget />

              {/* 10. About & Newsletter */}
              <AboutNewsletterSection />

              {/* 11. Mindful Moment: Daily Intention Liquid-Fill Card (Above Footer) */}
              <DailyIntentionSection intention={dailyIntention || undefined} />
            </main>
          }
        />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
      </Routes>

      {/* 12. Dark Minimalist Footer - Center Aligned on Mobile with Dynamic Logo & DPDP Notice */}
      <Footer
        logoUrl={siteSettings.logoUrl}
        siteSettings={siteSettings}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

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
            href="#yoga-masterclasses"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[10px] text-slate-300 hover:text-white"
          >
            <Play className="w-4 h-4 mb-0.5 text-indigo-400" />
            <span>Practice</span>
          </a>

          <a
            href="#asana-reels"
            className="flex flex-col items-center justify-center py-1 px-2.5 text-[10px] text-slate-300 hover:text-white"
          >
            <Wind className="w-4 h-4 mb-0.5 text-pink-400" />
            <span>Reels</span>
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
      {isAdminOpen && (
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
      )}

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
            reels={reels}
            onSelectReel={setSelectedReel}
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

      {/* India DPDP Act 2023 Statutory Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <PrivacyPolicyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
