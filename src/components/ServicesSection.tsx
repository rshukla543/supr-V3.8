import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { Check, Sparkles, ArrowRight, UserCheck, Utensils, Handshake, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  services?: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services = SERVICES_DATA,
  onSelectService,
}) => {
  const currentServices = services && services.length > 0 ? services : SERVICES_DATA;
  const getIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return <UserCheck className="w-6 h-6 text-purple-300" />;
      case 'nutrition':
        return <Utensils className="w-6 h-6 text-indigo-300" />;
      default:
        return <Handshake className="w-6 h-6 text-purple-200" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 relative z-10 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-purple-600/[0.08] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Monetization & Private Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Work With Me
          </h2>
          <p className="mt-4 text-base text-slate-300/80 leading-relaxed">
            Curated private mentorship for individuals seeking profound postural alchemy, and strategic partnerships for conscious luxury brands.
          </p>
        </motion.div>

        {/* 3 Floating Glass Cards Grid with Hover Lift & Glow Intensification */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {currentServices.map((service, index) => {
            const isFeatured = service.isPopular;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 backdrop-blur-2xl p-8 group cursor-pointer ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#1E1436]/90 via-[#150F28]/85 to-[#0B0914]/95 border-2 border-purple-400/50 shadow-[0_15px_45px_rgba(0,0,0,0.7)] hover:border-purple-300 hover:shadow-[0_25px_60px_rgba(168,85,247,0.3)] lg:-translate-y-3'
                    : 'bg-[#140E26]/75 border border-purple-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-purple-400/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.45)] flex items-center gap-1.5 border border-purple-300/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Requested Mentorship</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-white/[0.05] border border-purple-500/20 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
                      {getIcon(service.type)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 backdrop-blur-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1 group-hover:text-purple-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-purple-300/80 mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-300/85 mb-6">
                    {service.description}
                  </p>

                  {/* Features Checklist */}
                  <div className="pt-5 border-t border-purple-500/15 mb-8">
                    <p className="text-xs uppercase font-bold tracking-wider text-purple-200 mb-3.5">
                      Curated Deliverables:
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 text-purple-300">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="text-slate-200">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button: Glassmorphic White/Silver */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectService(service)}
                    className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'btn-silver-glass'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-purple-400/30 hover:border-purple-300 shadow-sm'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                  <p className="text-center text-[11px] mt-2.5 text-purple-300/70">
                    {service.type === 'collaboration'
                      ? 'Media kit and rate card shared within 24h'
                      : 'Applications reviewed on a rolling basis'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
