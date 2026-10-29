import React from 'react';
import { ArrowRight, Play, Sparkles, ShieldCheck, Heart, Compass } from 'lucide-react';

interface HeroSectionProps {
  onStartTraining: () => void;
  onWatchVideo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTraining,
  onWatchVideo,
}) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6]/50 to-[#FAF8F5]">
      {/* Decorative ambient background elements */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#CBD9D0]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#EADECE]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE7] border border-[#CBD9D0] text-[#2C483A] text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4D705E]" />
              <span>500-HR RYT • Master Yoga & Lifestyle Mentor</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-semibold text-[#182C22] tracking-tight leading-[1.12] mb-6">
              Find Your Balance.{' '}
              <span className="italic font-normal text-[#4D705E] block sm:inline">
                Elevate Your Lifestyle.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#665440] leading-relaxed max-w-2xl mb-8 font-normal">
              After escaping high-stakes corporate burnout, I spent 8 years studying authentic Vinyasa, somatic breathwork, and intuitive plant nutrition in Rishikesh. Today, I empower modern individuals to release physical tension, restore metabolic vitality, and move through life with quiet grace.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onStartTraining}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Training</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchVideo}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-[#FAF8F5] border border-[#D8C5AF] text-[#2C483A] hover:bg-[#E5ECE7]/60 hover:border-[#8EA89D] transition-all duration-300 shadow-xs cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#182C22] text-[#FAF8F5] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Latest Video</span>
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-6 border-t border-[#EADECE]/80 w-full flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#7A6A55]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4D705E]" />
                <span className="font-medium text-[#2C483A]">10,000+ Students</span> Guided
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#9E8568]" />
                <span className="font-medium text-[#2C483A]">120K+ Global</span> Community
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#4D705E]" />
                <span className="font-medium text-[#2C483A]">Certified in Rishikesh</span> & Bali
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Cutout Portrait Placeholder with Subtle Organic Shape Background (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Subtle Organic Shape Background (SVG fluid blob) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 500 500"
                className="w-[125%] h-[125%] text-[#E4ECE6] fill-current opacity-85 transform -rotate-6 transition-transform duration-1000 hover:rotate-0"
              >
                <path d="M417.8,315.6Q387.6,381.2,324.5,417.2Q261.4,453.2,192.9,431.1Q124.4,409,84.7,346.5Q45,284,72.7,214Q100.4,144,157.7,99.3Q215,54.6,289.4,63.1Q363.8,71.6,405.9,135.8Q448,200,417.8,315.6Z" />
              </svg>
              {/* Secondary sand accent blob */}
              <div className="absolute w-72 h-72 bg-[#EADECE]/60 rounded-full blur-2xl -bottom-4 -left-6" />
            </div>

            {/* Cutout Portrait Container */}
            <div className="relative z-10 w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2.5rem] bg-gradient-to-b from-[#F3F6F4] via-[#E5ECE7] to-[#D8C5AF]/40 border border-[#CBD9D0]/70 p-6 flex flex-col items-center justify-between shadow-2xl backdrop-blur-xs overflow-hidden group">
              
              {/* Top cutout indicator */}
              <div className="w-full flex items-center justify-between text-xs tracking-wider uppercase text-[#665440]">
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/80 font-medium">Portrait Cutout Frame</span>
                <span className="text-[11px] font-mono opacity-70">Supriya • Creator</span>
              </div>

              {/* Aesthetic Cutout Silhouette Graphic Placeholder */}
              <div className="relative my-auto flex flex-col items-center justify-center w-full">
                
                {/* Aura halo */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#8EA89D]/30 to-[#EADECE]/60 blur-md absolute" />

                {/* Yogi Meditative Cutout Silhouette SVG */}
                <svg
                  className="w-56 h-64 text-[#2C483A] fill-current relative z-10 filter drop-shadow-[0_15px_25px_rgba(44,72,58,0.2)] transition-transform duration-500 group-hover:scale-102"
                  viewBox="0 0 200 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle lotus pedestal base */}
                  <path
                    d="M30 205 C 70 195, 130 195, 170 205 C 150 220, 50 220, 30 205 Z"
                    fill="#4D705E"
                    opacity="0.3"
                  />
                  {/* Head & Top Knot Bun */}
                  <circle cx="100" cy="40" r="8" fill="#182C22" />
                  <circle cx="100" cy="56" r="18" fill="#2C483A" />
                  
                  {/* Slender neck & graceful shoulders */}
                  <path
                    d="M93 72 L107 72 L112 85 C 130 88, 148 98, 155 116 C 145 125, 132 118, 126 112 L124 150 L140 178 C 148 190, 155 198, 168 200 C 155 204, 140 203, 130 196 L118 184 L100 186 L82 184 L70 196 C 60 203, 45 204, 32 200 C 45 198, 52 190, 60 178 L76 150 L74 112 C 68 118, 55 125, 45 116 C 52 98, 70 88, 88 85 Z"
                    fill="#182C22"
                  />
                  
                  {/* Hand Mudra gesture in lap */}
                  <ellipse cx="100" cy="172" rx="14" ry="7" fill="#4D705E" />
                  <circle cx="95" cy="170" r="3" fill="#D8C5AF" />
                  <circle cx="105" cy="170" r="3" fill="#D8C5AF" />
                </svg>

                {/* Cutout Note badge overlay */}
                <div className="mt-3 px-4 py-1.5 rounded-full bg-[#FAF8F5]/90 border border-[#D8C5AF] text-[11px] font-medium text-[#4A3C2C] text-center shadow-xs">
                  Aesthetic Portrait Cutout Slot
                </div>
              </div>

              {/* Floating aesthetic feature card bottom-left */}
              <div className="absolute bottom-5 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl p-3 border border-[#EADECE] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5ECE7] text-[#2C483A] flex items-center justify-center font-serif text-sm font-semibold">
                    ॐ
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#182C22]">Daily Awakening Flow</p>
                    <p className="text-[11px] text-[#665440]">Live 7:00 AM IST • Season 4</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#4D705E] text-[#FAF8F5] rounded-full">
                  Active
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
