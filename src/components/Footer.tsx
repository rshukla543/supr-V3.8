import React from 'react';
import { Music, Mail, ArrowUp } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';

interface FooterProps {
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07050F] text-slate-300 pt-16 pb-20 md:pb-12 border-t border-purple-500/15 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-500/15 text-center md:text-left">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Supriya Brand Logo"
                  className="w-8 h-8 rounded-xl object-cover border border-purple-400/30 shadow-md"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-serif text-base font-bold shadow-md">
                  S
                </div>
              )}
              <span className="font-serif text-2xl tracking-wider text-white font-semibold">
                SUPRIYA
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Empowering conscious movement, somatic nervous system regulation, and elevated lifestyle rituals. Finding stillness amidst modern acceleration.
            </p>

            {/* Social Icons - Center aligned on mobile */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-purple-500/20 flex items-center justify-center text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-all"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
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
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Visual Archive Gallery
                </a>
              </li>
              <li>
                <a href="#content-vault" className="hover:text-white transition-colors">
                  The Content Vault (YouTube + Reels)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  1-on-1 Online Yoga Mentorship
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Custom Plant Nutrition Plans
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Brand Collaboration Inquiries
                </a>
              </li>
              <li>
                <a href="#mindful-pause" className="hover:text-white transition-colors">
                  Interactive Somatic Pacer
                </a>
              </li>
            </ul>
          </div>

          {/* Management & Inquiries (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase font-bold tracking-widest text-purple-300 mb-4">
              Management & Collaborations
            </h4>
            <p className="text-xs text-slate-400 mb-3 max-w-xs">
              For commercial sponsorships, editorial press, and speaking engagements:
            </p>
            <a
              href="mailto:management@supriyawellness.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors py-2 px-3.5 rounded-xl bg-white/[0.04] border border-purple-500/25"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>management@supriyawellness.com</span>
            </a>

            <div className="mt-4 pt-4 border-t border-purple-500/15 text-[11px] text-slate-400 max-w-xs">
              <span className="font-semibold text-white">Press Kit & Media Card:</span> Available upon request.
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top - Fully center-aligned on mobile */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Supriya Wellness LLC. All rights reserved.</p>

          <p className="text-center sm:text-left max-w-md text-[10px] text-slate-500">
            Educational wellness content only. Please consult a qualified physician before undertaking rigorous physical practice.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-600/30 transition-all cursor-pointer text-xs"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
