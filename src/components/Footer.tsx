import React from 'react';
import { motion } from 'framer-motion';
import { Music, Mail, ArrowUp, MapPin, UserCheck, Shield } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';
import { SiteSettings } from '../types';

interface FooterProps {
  logoUrl?: string;
  siteSettings?: SiteSettings;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl, siteSettings, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const name = siteSettings?.name || 'Supriya Bhavsar';
  const location = siteSettings?.location || 'Vadodara, Gujarat, India';
  const managerName = siteSettings?.managerName || 'Shlok Brahmbhatt';
  const managerHandle = siteSettings?.managerHandle || '@shlok.brahmbhatt';
  const managementEmail = siteSettings?.managementEmail || 'management@supriyabhavsar.com';
  const instagramHandle = siteSettings?.instagramHandle || '@supriya_9508';
  const youtubeChannel = siteSettings?.youtubeChannel || '@supriyabhavsar7343';
  const youtubeUrl = youtubeChannel.startsWith('http')
    ? youtubeChannel
    : `https://youtube.com/${youtubeChannel.startsWith('@') ? youtubeChannel : '@' + youtubeChannel}`;

  return (
    <footer className="bg-[#07050F] text-slate-300 pt-16 pb-20 md:pb-12 border-t border-purple-500/15 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row with Framer Motion scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-500/15 text-center md:text-left"
        >
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${name} Logo`}
                  className="w-9 h-9 rounded-xl object-cover border border-purple-400/30 shadow-md"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-serif text-base font-bold shadow-md">
                  S
                </div>
              )}
              <span className="font-serif text-2xl tracking-wider text-white font-semibold">
                {name.toUpperCase()}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              Empowering conscious movement, somatic nervous system regulation, and elevated lifestyle rituals. Finding stillness amidst modern acceleration.
            </p>

            <div className="flex items-center gap-2 text-xs text-purple-300/80 mb-6 font-medium">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{location}</span>
            </div>

            {/* Social Icons - Center aligned on mobile */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-purple-500/20 flex items-center justify-center text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-all"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-purple-500/20 flex items-center justify-center text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-purple-500/20 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-all"
                aria-label="Spotify Yoga Playlists"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase font-bold tracking-widest text-purple-300 mb-4">
              Explore & Content
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Visual Archive Gallery
                </a>
              </li>
              <li>
                <a href="#yoga-masterclasses" className="hover:text-white transition-colors">
                  Yoga Masterclasses (YouTube)
                </a>
              </li>
              <li>
                <a href="#lifestyle-vlogs" className="hover:text-white transition-colors">
                  Lifestyle & Philosophy Vlogs
                </a>
              </li>
              <li>
                <a href="#asana-reels" className="hover:text-white transition-colors">
                  Bite-Sized Asana Reels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  1-on-1 Online Yoga Mentorship
                </a>
              </li>
              <li>
                <a href="#partnerships" className="hover:text-white transition-colors">
                  Conscious Brand Partnerships
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Practitioner Transformation Stories
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-purple-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  DPDP Privacy Notice (India 2023)
                </button>
              </li>
            </ul>
          </div>

          {/* Management & Inquiries (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase font-bold tracking-widest text-purple-300 mb-4">
              Management & Collaborations
            </h4>
            
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/25 text-left w-full max-w-sm mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">Talent Management</span>
              </div>
              <p className="text-xs text-purple-200/90 font-medium">
                {managerName} <span className="text-purple-400/80 font-mono">({managerHandle})</span>
              </p>
            </div>

            <p className="text-xs text-slate-400 mb-3 max-w-xs">
              For commercial brand partnerships, retreats, and media:
            </p>
            <a
              href={`mailto:${managementEmail}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors py-2 px-3.5 rounded-xl bg-white/[0.04] border border-purple-500/25 w-full max-w-sm justify-center md:justify-start"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>{managementEmail}</span>
            </a>

            <div className="mt-4 pt-4 border-t border-purple-500/15 text-[11px] text-slate-400 max-w-xs flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Press Kit & Rate Card available on request.</span>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar: Copyright, DPDP Privacy & Back to Top - Fully center-aligned on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} {name} • Vadodara, Gujarat. All rights reserved.</p>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-purple-300 hover:text-white underline text-[10px] cursor-pointer"
            >
              DPDP Act 2023 Privacy Rights
            </button>
          </div>

          <p className="text-center sm:text-left max-w-md text-[10px] text-slate-500">
            Educational wellness & somatic movement. Please consult a physician before undertaking vigorous physical practice.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-600/30 transition-all cursor-pointer text-xs"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </footer>
  );
};
