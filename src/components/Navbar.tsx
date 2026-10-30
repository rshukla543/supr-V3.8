import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Database } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: (serviceId?: string) => void;
  onOpenAdmin: () => void;
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist, onOpenAdmin, logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Strict requirement: single-word links
  const navLinks = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'Practices', href: '#yoga-masterclasses' },
    { name: 'Vlogs', href: '#lifestyle-vlogs' },
    { name: 'Reels', href: '#asana-reels' },
    { name: 'Services', href: '#services' },
    { name: 'Stories', href: '#testimonials' },
    { name: 'About', href: '#about' },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0914]/90 backdrop-blur-xl border-b border-purple-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.7)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Dynamic Supabase Logo or Midnight Lotus Monogram */}
          <a href="#" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Supriya Brand Logo"
                  className="w-10 h-10 rounded-xl object-cover border border-purple-300/40 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-purple-300/30">
                  S
                </div>
              )}
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider text-white font-semibold leading-tight group-hover:text-purple-300 transition-colors">
                SUPRIYA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium flex items-center gap-1.5">
                <span>Yoga</span>
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                <span>Lifestyle</span>
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span className="text-purple-300">Creator</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav: Single Word Links */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-purple-500/15 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* CMS Portal Trigger Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-purple-400/40 transition-all cursor-pointer shadow-xs"
              title="Open Supabase CMS Dashboard"
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>CMS Admin</span>
            </button>

            {/* Primary Button: Glassmorphic White/Silver with Subtle Violet Hover Glow */}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenWaitlist()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass cursor-pointer"
            >
              <span>Join Waitlist</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl text-purple-300 bg-white/[0.05] border border-purple-500/20 text-xs flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>CMS</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-200 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0F0B1E]/95 backdrop-blur-2xl border-b border-purple-500/20 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-200 hover:text-purple-300 py-2.5 border-b border-white/[0.06] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-white/[0.06] border border-purple-500/20 text-white"
                >
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Open Supabase CMS Admin</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenWaitlist();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase btn-silver-glass"
                >
                  <span>Join the Waitlist</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
