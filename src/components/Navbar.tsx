import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Latest Content', href: '#content-hub' },
    { name: 'Work With Me', href: '#services' },
    { name: 'Philosophy & Bio', href: '#about' },
    { name: 'Mindful Pause', href: '#mindful-pause' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs border-b border-[#EADECE]/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="group flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1D3328] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-bold shadow-xs transition-transform duration-300 group-hover:scale-105">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider text-[#182C22] font-semibold leading-tight group-hover:text-[#4D705E] transition-colors">
                SUPRIYA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#9E8568] font-medium">
                Yoga & Lifestyle
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4A3C2C] hover:text-[#182C22] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#4D705E] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenWaitlist()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A] transition-all duration-200 shadow-xs hover:shadow-sm transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Join Waitlist</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#182C22] hover:bg-[#E5ECE7] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EADECE] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#26332C] hover:text-[#4D705E] py-2 border-b border-[#F4EFE6]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenWaitlist();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wider uppercase bg-[#182C22] text-[#FAF8F5] hover:bg-[#2C483A]"
              >
                <Sparkles className="w-4 h-4 text-[#D8C5AF]" />
                <span>Join the Waitlist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
