import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { BrandSponsor } from '../types';

interface BrandMarqueeProps {
  sponsors?: BrandSponsor[];
}

const DEFAULT_SPONSORS: BrandSponsor[] = [
  {
    id: 'b1',
    name: 'Manduka India',
    tagline: 'Eco Pro Alignment Mats & Cork Blocks',
    category: 'Yoga Equipment',
    logoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://manduka.com',
  },
  {
    id: 'b2',
    name: 'Kama Ayurveda',
    tagline: 'Kumkumadi Botanicals & Therapeutic Oils',
    category: 'Ayurvedic Wellness',
    logoUrl: 'https://images.unsplash.com/photo-1608248597359-2e67d268d8ef?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://kamaayurveda.com',
  },
  {
    id: 'b3',
    name: 'Liforme',
    tagline: 'Intelligent Alignment Grip Mats',
    category: 'Performance Gear',
    logoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://liforme.com',
  },
  {
    id: 'b4',
    name: 'Conscious Food',
    tagline: 'Cold-Pressed Oils & Heritage Grains',
    category: 'Organic Nutrition',
    logoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://consciousfood.com',
  },
  {
    id: 'b5',
    name: 'Vahdam India',
    tagline: 'Direct-from-Source Himalayan Herbal Teas',
    category: 'Adaptogens & Tea',
    logoUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://vahdam.com',
  },
  {
    id: 'b6',
    name: 'Alo Yoga',
    tagline: 'Mindful Studio-to-Street Activewear',
    category: 'Conscious Apparel',
    logoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://aloyoga.com',
  },
];

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ sponsors }) => {
  const currentList = sponsors && sponsors.length > 0 ? sponsors : DEFAULT_SPONSORS;
  // Double list for seamless infinite loop
  const marqueeItems = [...currentList, ...currentList];

  return (
    <section id="partnerships" className="py-20 sm:py-28 relative z-10 overflow-hidden border-t border-purple-500/15 bg-[#0B0914]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-3">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span>Brand Partnerships & Conscious Alliances</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Curated Collaborations
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-normal leading-relaxed">
          I partner exclusively with mindful leaders in non-toxic living, organic Ayurvedic nourishment, and sustainable movement technology.
        </p>
      </div>

      {/* Marquee Track Container with Generous Square Cards */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex gap-6 w-max py-4 select-none"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          }}
        >
          {marqueeItems.map((brand, idx) => {
            const CardInner = (
              <div className="w-64 sm:w-72 aspect-square p-6 rounded-3xl bg-[#130E26]/90 hover:bg-[#181130] border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-2xl transition-all duration-300 group shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] flex flex-col justify-between text-left relative overflow-hidden">
                {/* Subtle ambient card corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

                {/* Top Row: Category tag + Verified badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
                    {brand.category || 'Official Partner'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-purple-300/80 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Center: Brand Logo Container & Name */}
                <div className="my-auto z-10 flex flex-col items-start gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-black/50 border border-purple-400/25 p-1.5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shadow-inner">
                    {brand.logoUrl ? (
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-purple-900/40 flex items-center justify-center font-serif text-xl font-bold text-white">
                        {brand.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-slate-300/90 line-clamp-2 mt-1 leading-snug">
                      {brand.tagline || 'Curated wellness & conscious movement alignment.'}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Community Perk & Link */}
                <div className="pt-3 border-t border-purple-500/15 z-10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Code: <strong className="text-purple-300 font-bold">SUPRIYA15</strong>
                  </span>
                  <span className="text-[11px] font-semibold text-purple-300 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
                  {CardInner}
                </a>
              );
            }

            return (
              <div key={`${brand.id}-${idx}`} className="cursor-default">
                {CardInner}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
