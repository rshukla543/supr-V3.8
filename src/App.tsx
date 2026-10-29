import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContentHubSection } from './components/ContentHubSection';
import { ServicesSection } from './components/ServicesSection';
import { MindfulnessWidget } from './components/MindfulnessWidget';
import { AboutNewsletterSection } from './components/AboutNewsletterSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { WaitlistModal } from './components/WaitlistModal';
import { VideoContent, ServiceItem } from './types';
import { VIDEO_DATA } from './data/mockData';

export function App() {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('yoga-1on1');

  const handleOpenWaitlist = (serviceId?: string) => {
    setSelectedServiceId(serviceId || 'yoga-1on1');
    setIsWaitlistOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    setIsWaitlistOpen(true);
  };

  const handleWatchHeroVideo = () => {
    // Open the featured morning vinyasa video
    setSelectedVideo(VIDEO_DATA[0]);
  };

  const handleStartTraining = () => {
    // Scroll smoothly to the Services section and open the waitlist
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenWaitlist('yoga-1on1');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#26332C] flex flex-col font-sans selection:bg-[#CBD9D0] selection:text-[#182C22]">
      {/* Top Fixed Navigation */}
      <Navbar onOpenWaitlist={() => handleOpenWaitlist()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section (Split layout with headline, subtext, dual CTAs, cutout placeholder) */}
        <HeroSection
          onStartTraining={handleStartTraining}
          onWatchVideo={handleWatchHeroVideo}
        />

        {/* 2. Organized Content Hub (Latest from Supriya, 3 interactive filter tabs, YouTube-style grid) */}
        <ContentHubSection onSelectVideo={(video) => setSelectedVideo(video)} />

        {/* 3. Future Monetization Services ('Work With Me', 3 cards, Waitlist triggers) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. Interactive Mindful Breathwork Pause */}
        <MindfulnessWidget />

        {/* 5. About & Newsletter (Bio, pillars, clean email capture form) */}
        <AboutNewsletterSection />
      </main>

      {/* 6. Footer (Social links, management email, copyright) */}
      <Footer />

      {/* Modals */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {isWaitlistOpen && (
        <WaitlistModal
          initialServiceId={selectedServiceId}
          onClose={() => setIsWaitlistOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
