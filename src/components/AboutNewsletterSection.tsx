import React, { useState } from 'react';
import { Mail, Check, Sparkles, Send, Heart, Compass, Shield } from 'lucide-react';

export const AboutNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'flows' | 'recipes' | 'mindset'>('all');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Supriya Bio & Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE7] border border-[#CBD9D0] text-[#2C483A] text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#4D705E]" />
              <span>The Journey & Ethos</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#182C22] tracking-tight mb-6">
              "Movement is not about perfection. It is a return to yourself."
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#665440] leading-relaxed mb-8">
              <p>
                Hi, I'm <strong className="text-[#182C22] font-semibold">Supriya</strong>. For almost a decade, I navigated the unrelenting pace of corporate life until severe physical burnout forced me to halt and listen to what my nervous system was crying out for.
              </p>
              <p>
                That pivotal wake-up call led me to northern India and Bali, where I completed over 500 hours of intensive training in classical Ashtanga, alignment-based Vinyasa, and Himalayan breathwork under revered master practitioners.
              </p>
              <p>
                Today, my work sits at the intersection of traditional yogic science and modern biomechanics. I help people untangle stress from their bodies, rebuild somatic strength, and cultivate a serene inner sanctuary amidst a noisy world.
              </p>
            </div>

            {/* 3 Core Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EADECE]">
              <div className="p-4 rounded-2xl bg-[#F4EFE6]/70 border border-[#EADECE]">
                <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2C483A] flex items-center justify-center mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-[#182C22] mb-1">
                  Mindful Alignment
                </h4>
                <p className="text-xs text-[#665440]">
                  Honoring individual anatomy over rigid poses for lifelong joint longevity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EFE6]/70 border border-[#EADECE]">
                <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2C483A] flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-[#182C22] mb-1">
                  Nourishing Rituals
                </h4>
                <p className="text-xs text-[#665440]">
                  Plant-rich foods, herbal tonics, and restorative sleep hygiene.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EFE6]/70 border border-[#EADECE]">
                <div className="w-8 h-8 rounded-xl bg-[#E5ECE7] text-[#2C483A] flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-semibold text-sm text-[#182C22] mb-1">
                  Sustainable Strength
                </h4>
                <p className="text-xs text-[#665440]">
                  Subtle core engagement and nervous system regulation for daily resilience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Minimal Newsletter Capture Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-[#182C22] to-[#12221A] text-[#FAF8F5] p-8 sm:p-10 shadow-2xl border border-[#CBD9D0]/20 relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4D705E]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#D8C5AF] mb-6">
                  <Mail className="w-6 h-6" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-[#D8C5AF] font-medium block mb-2">
                  The Weekly Sunday Journal
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
                  Join my inner circle for weekly fitness tips.
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD9D0] leading-relaxed mb-6">
                  Every Sunday morning, I send one curated 3-minute read featuring an alignment micro-correction, an anti-inflammatory breakfast recipe, and a breathwork sequence.
                </p>

                {isSubscribed ? (
                  <div className="p-6 rounded-2xl bg-white/10 border border-[#8EA89D]/40 text-center animate-in fade-in">
                    <div className="w-10 h-10 rounded-full bg-[#4D705E] text-white flex items-center justify-center mx-auto mb-3">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-white mb-1">
                      Welcome to the Inner Circle
                    </h4>
                    <p className="text-xs text-[#E5ECE7] mb-4">
                      Check your inbox at <span className="underline font-semibold">{email}</span> for your welcome flow!
                    </p>
                    
                    {/* Sample preview of this week's tip */}
                    <div className="text-left p-3 rounded-xl bg-black/30 border border-white/10 text-xs">
                      <p className="font-semibold text-[#D8C5AF] mb-1">
                        🌿 Preview of Tip #42 (This Sunday):
                      </p>
                      <p className="text-[#CBD9D0] italic text-[11px]">
                        "The 2-minute psoas release to do right before your morning beverage to immediately reset thoracic tightness."
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    {/* Interest pill selector */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D8C5AF] font-bold mb-2">
                        Customize Your Focus:
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { id: 'all', label: 'All Topics' },
                          { id: 'flows', label: 'Morning Flows' },
                          { id: 'recipes', label: 'Plant Nutrition' },
                          { id: 'mindset', label: 'Breathwork & Calm' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setInterest(item.id as any)}
                            className={`px-3 py-2 rounded-xl text-left transition-colors cursor-pointer border ${
                              interest === item.id
                                ? 'bg-white/20 border-[#D8C5AF] text-white font-semibold'
                                : 'bg-white/5 border-white/10 text-[#CBD9D0] hover:bg-white/10'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="newsletter-email" className="block text-[11px] uppercase tracking-wider text-[#D8C5AF] font-bold mb-1">
                        Your Best Email
                      </label>
                      <div className="relative">
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#8EA89D]"
                        />
                      </div>
                      {errorMessage && (
                        <p className="text-xs text-red-400 mt-1 font-medium">{errorMessage}</p>
                      )}
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FAF8F5] text-[#182C22] hover:bg-[#D8C5AF] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Welcoming you...</span>
                      ) : (
                        <>
                          <span>Join My Inner Circle</span>
                          <Send className="w-3.5 h-3.5 ml-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-[#CBD9D0]/70">
                      Zero ads. Zero spam. Unsubscribe anytime with one click.
                    </p>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
