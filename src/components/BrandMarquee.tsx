import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award } from 'lucide-react';

interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
}

const BRANDS: BrandItem[] = [
  { id: 'b1', name: 'ALO YOGA', tagline: 'Mindful Movement', category: 'Apparel' },
  { id: 'b2', name: 'LULULEMON', tagline: 'Holistic Living', category: 'Activewear' },
  { id: 'b3', name: 'MANDUKA', tagline: 'Pro Mats & Gear', category: 'Equipment' },
  { id: 'b4', name: 'CALM', tagline: 'Sleep & Meditation', category: 'App Partner' },
  { id: 'b5', name: 'HEADSPACE', tagline: 'Mindfulness Practice', category: 'Mental Health' },
  { id: 'b6', name: 'RITUAL', tagline: 'Traceable Nutrition', category: 'Supplements' },
  { id: 'b7', name: 'VOGUE WELLNESS', tagline: 'Editorial Feature', category: 'Press' },
  { id: 'b8', name: 'OURA RING', tagline: 'Circadian Biometrics', category: 'Health Tech' },
];

export const BrandMarquee: React.FC = () => {
  // Double list for seamless infinite loop
  const marqueeItems = [...BRANDS, ...BRANDS];

  return (
    <section className="py-14 sm:py-20 relative z-10 overflow-hidden border-y border-purple-500/15 bg-[#0B0914]/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-purple-500/20 text-purple-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md mb-2">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span>Brand Partnerships & Features</span>
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
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-purple-500/15 hover:border-purple-400/40 backdrop-blur-md transition-all duration-300 group cursor-default shadow-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 font-serif font-bold text-sm group-hover:scale-105 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all shadow-inner">
                {brand.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif tracking-wider font-semibold text-sm sm:text-base text-slate-100 group-hover:text-purple-200 transition-colors">
                    {brand.name}
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-slate-400 tracking-wide">
                  {brand.tagline} • <span className="text-purple-300/80">{brand.category}</span>
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
