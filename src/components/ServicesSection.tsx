import React from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { Check, Sparkles, ArrowRight, UserCheck, Utensils, Handshake, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return <UserCheck className="w-5 h-5 text-[#4D705E]" />;
      case 'nutrition':
        return <Utensils className="w-5 h-5 text-[#9E8568]" />;
      default:
        return <Handshake className="w-5 h-5 text-[#4D705E]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-[#F4EFE6]/60 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CBD9D0]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE7] border border-[#CBD9D0] text-[#2C483A] text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4D705E]" />
            <span>Monetization & Private Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#182C22] tracking-tight">
            Work With Me
          </h2>
          <p className="mt-4 text-base text-[#665440] leading-relaxed">
            Whether you are an individual seeking profound postural and physical transformation, or a conscious brand sharing the ethos of mindful living.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES_DATA.map((service) => {
            const isFeatured = service.isPopular;

            return (
              <div
                key={service.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#182C22] text-[#FAF8F5] shadow-2xl border-2 border-[#8EA89D] lg:-translate-y-2'
                    : 'bg-[#FAF8F5] text-[#26332C] border border-[#EADECE] shadow-sm hover:shadow-xl hover:border-[#8EA89D]'
                } p-8`}
              >
                {/* Badge if featured */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D8C5AF] text-[#182C22] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Requested Mentorship</span>
                  </div>
                )}

                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isFeatured ? 'bg-white/10 text-white' : 'bg-[#E5ECE7]'
                      }`}
                    >
                      {getIcon(service.type)}
                    </div>
                    {service.badge && (
                      <span
                        className={`text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full ${
                          isFeatured
                            ? 'bg-white/10 text-[#D8C5AF]'
                            : 'bg-[#E5ECE7] text-[#2C483A]'
                        }`}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`font-serif text-2xl font-semibold mb-1 ${
                      isFeatured ? 'text-white' : 'text-[#182C22]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs font-medium uppercase tracking-wider mb-4 ${
                      isFeatured ? 'text-[#D8C5AF]' : 'text-[#9E8568]'
                    }`}
                  >
                    {service.subtitle}
                  </p>

                  {/* Short description */}
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-[#CBD9D0]' : 'text-[#665440]'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Deliverables / Feature list */}
                  <div
                    className={`pt-5 border-t ${
                      isFeatured ? 'border-white/15' : 'border-[#EADECE]'
                    } mb-8`}
                  >
                    <p
                      className={`text-xs uppercase font-bold tracking-wider mb-3 ${
                        isFeatured ? 'text-[#D8C5AF]' : 'text-[#2C483A]'
                      }`}
                    >
                      What's Included:
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <div
                            className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isFeatured
                                ? 'bg-[#4D705E] text-white'
                                : 'bg-[#E5ECE7] text-[#4D705E]'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span
                            className={isFeatured ? 'text-[#E5ECE7]' : 'text-[#4A3C2C]'}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onSelectService(service)}
                    className={`w-full py-4 px-6 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#FAF8F5] text-[#182C22] hover:bg-[#D8C5AF] shadow-md hover:shadow-lg'
                        : 'bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] shadow-xs hover:shadow-md'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <p
                    className={`text-center text-[11px] mt-2.5 ${
                      isFeatured ? 'text-white/60' : 'text-[#9E8568]'
                    }`}
                  >
                    {service.type === 'collaboration'
                      ? 'Media kit and rate card shared upon request'
                      : 'Zero commitment • We review applications weekly'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
