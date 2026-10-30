import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { BrandSponsor } from '../types';

interface BrandMarqueeProps {
  sponsors?: BrandSponsor[];
}

const DEFAULT_SPONSORS: BrandSponsor[] = [
  { id: 'b1', name: 'MANDUKA INDIA', tagline: 'Eco Pro Alignment Mats', category: 'Gear', affiliateUrl: 'https://manduka.com' },
  { id: 'b2', name: 'KAMA AYURVEDA', tagline: 'Botanical Elixirs & Oils', category: 'Ayurveda', affiliateUrl: 'https://kamaayurveda.com' },
  { id: 'b3', name: 'LIFORME', tagline: 'Precision Grip Yoga Mats', category: 'Equipment', affiliateUrl: 'https://liforme.com' },
  { id: 'b4', name: 'CONSCIOUS FOOD', tagline: 'Organic Superfoods', category: 'Nutrition', affiliateUrl: 'https://consciousfood.com' },
  { id: 'b5', name: 'VAHDAM INDIA', tagline: 'Himalayan Herbal Teas', category: 'Adaptogens', affiliateUrl: 'https://vahdam.com' },
  { id: 'b6', name: 'ALO YOGA', tagline: 'Mindful Somatic Wear', category: 'Apparel', affiliateUrl: 'https://aloyoga.com' },
];

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ sponsors }) => {
  const currentList = sponsors && sponsors.length > 0 ? sponsors : DEFAULT_SPONSORS;
  // Double list for seamless infinite loop
  const marqueeItems = [...currentList, ...currentList];

  return (
    <section className="py-14 sm:py-20 relative z-10 overflow-hidden border-y border-purple-500/15 bg-[#0B0914]/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-purple-500/20 text-purple-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md mb-2">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span>Brand Partnerships & Affiliations</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-normal">
          Collaborating with conscious leaders in sustainable activewear, somatic tech, and holistic nutrition.
        </p>
      </div>

      {/* Marquee Track Container with Edge Gradient Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-6 w-max py-2 select-none"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear',
          }}
        >
          {marqueeItems.map((brand, idx) => {
            const CardContent = (
              <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-purple-500/15 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 group shadow-xs">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="w-9 h-9 rounded-xl object-cover border border-purple-500/30 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 font-serif font-bold text-sm group-hover:scale-105 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all shadow-inner">
                    {brand.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif tracking-wider font-semibold text-sm sm:text-base text-slate-100 group-hover:text-purple-200 transition-colors">
                      {brand.name}
                    </span>
                    {brand.affiliateUrl && (
                      <ExternalLink className="w-3 h-3 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 tracking-wide">
                    {brand.tagline || 'Partner Brand'} {brand.category ? `• ${brand.category}` : ''}
                  </span>
                </div>
              </div>
            );

            if (brand.affiliateUrl) {
              return (
                <a
                  key={`${brand.id}-${idx}`}
                  href={brand.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer block no-underline focus:outline-hidden"
                  title={`Visit ${brand.name}`}
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <div key={`${brand.id}-${idx}`} className="cursor-default">
                {CardContent}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
