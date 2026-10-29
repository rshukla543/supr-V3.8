import { Music, Mail, ArrowUp } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#182C22] text-[#FAF8F5] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#182C22] flex items-center justify-center font-serif text-base font-bold">
                S
              </div>
              <span className="font-serif text-2xl tracking-wider text-white font-semibold">
                SUPRIYA
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#CBD9D0] leading-relaxed max-w-sm mb-6">
              Empowering mindful movement, somatic alignment, and conscious lifestyle rituals. Dedicated to holistic balance for modern living.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:text-white transition-colors"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#EADECE] hover:text-[#182C22] transition-colors"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#8EA89D] hover:text-[#182C22] transition-colors"
                aria-label="Spotify Yoga Playlists"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D8C5AF] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBD9D0]">
              <li>
                <a href="#content-hub" className="hover:text-white transition-colors">
                  Latest Classes & Videos
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
                  Interactive Breathwork Pacer
                </a>
              </li>
            </ul>
          </div>

          {/* Management & Contact (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D8C5AF] mb-4">
              Management & Inquiries
            </h4>
            <p className="text-xs text-[#CBD9D0] mb-3">
              For brand partnerships, press, retreat keynotes, and commercial bookings:
            </p>
            <a
              href="mailto:management@supriyawellness.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FAF8F5] hover:text-[#D8C5AF] transition-colors py-1.5 px-3 rounded-lg bg-white/10 border border-white/15"
            >
              <Mail className="w-4 h-4 text-[#8EA89D]" />
              <span>management@supriyawellness.com</span>
            </a>

            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-[#CBD9D0]/75">
              <span className="font-semibold text-white">Press Kit:</span> Available upon request for media & editorial features.
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#CBD9D0]/70 gap-4">
          <p>© {new Date().getFullYear()} Supriya Wellness LLC. All rights reserved.</p>

          <p className="text-center sm:text-left max-w-md text-[10px] text-[#CBD9D0]/50">
            Disclaimer: Content on this platform is for educational and wellness guidance only. Consult a physician before starting any vigorous physical exercise program.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer text-xs"
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
