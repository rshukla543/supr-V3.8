import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Copy,
  Check,
  Tag,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Play,
  Heart,
} from 'lucide-react';
import { toast } from 'sonner';
import { BlogEntry } from '../types';
import { getBlogs, getBlogById } from '../lib/supabase';
import { getYouTubeEmbedUrl } from '../lib/videoParser';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogEntry | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;

    async function loadArticle() {
      setIsLoading(true);
      try {
        const blogs = await getBlogs();
        if (!isMounted) return;
        setAllBlogs(blogs);

        if (id) {
          const found =
            blogs.find((b) => b.id === id || b.slug === id) ||
            (await getBlogById(id));
          if (found && isMounted) {
            setBlog(found);
          }
        }
      } catch (err) {
        console.warn('Error loading blog article:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Article link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    if (!blog) return;
    const text = encodeURIComponent(`"${blog.title}" by @supriya_9508: `);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    if (!blog) return;
    const text = encodeURIComponent(`Check out this mindful read by Supriya Bhavsar: "${blog.title}" ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0914] flex items-center justify-center text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider text-purple-300">
            Unfolding article prana...
          </span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0B0914] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-300">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-semibold mb-2">Article Not Found</h1>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          The requested article may have been archived or moved to another sacred collection.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-silver-glass text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>
      </div>
    );
  }

  const ytEmbed = blog.heroVideoUrl ? getYouTubeEmbedUrl(blog.heroVideoUrl) : null;
  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0B0914] text-[#F8FAFC] selection:bg-purple-600/30 selection:text-purple-200">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0914]/85 backdrop-blur-xl border-b border-purple-500/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Sanctuary</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/[0.04] border border-purple-500/20 hover:bg-purple-500/20 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy Article Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShareTwitter}
              className="p-2 rounded-full bg-white/[0.04] border border-purple-500/20 hover:bg-purple-500/20 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Share on Twitter"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        
        {/* Article Breadcrumbs & Category Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/30 text-purple-200 font-semibold uppercase tracking-wider text-[10px]">
            {blog.category}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            {blog.readTime}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-6">
          {blog.title}
        </h1>

        {/* Excerpt / Lead Paragraph */}
        <p className="text-base sm:text-lg text-slate-300/90 font-light leading-relaxed mb-8 border-l-2 border-purple-400/60 pl-4 py-1 italic bg-white/[0.01]">
          {blog.excerpt}
        </p>

        {/* Author Byline Card */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#120D24] border border-purple-500/20 mb-10">
          <div className="flex items-center gap-3">
            <img
              src={blog.authorImage || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80'}
              alt={blog.author}
              className="w-12 h-12 rounded-full object-cover border border-purple-400/40"
            />
            <div>
              <h4 className="font-serif text-sm font-semibold text-white">
                {blog.author}
              </h4>
              <p className="text-xs text-purple-300/80">
                {blog.authorRole || '500-HR Somatic Yoga Practitioner • Vadodara'}
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/supriya_9508"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-200 text-xs font-medium hover:text-white hover:bg-purple-900/40 transition-all"
          >
            <span>@supriya_9508</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Hero Video or Cover Image Stage */}
        <div className="mb-12 rounded-3xl overflow-hidden bg-black/60 border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {ytEmbed ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={`${ytEmbed}?autoplay=0&rel=0&modestbranding=1`}
                title={blog.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : blog.coverImageUrl ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          ) : null}
        </div>

        {/* Rich-Text Article Body */}
        <article className="prose prose-invert prose-purple max-w-none text-slate-300 leading-relaxed space-y-6 text-sm sm:text-base font-light">
          {blog.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="font-serif text-2xl sm:text-3xl font-semibold text-white pt-6 pb-2 border-b border-purple-500/15"
                >
                  {trimmed.replace(/^##\s+/, '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-serif text-xl font-medium text-purple-200 pt-4 pb-1"
                >
                  {trimmed.replace(/^###\s+/, '')}
                </h3>
              );
            }
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote
                  key={idx}
                  className="p-4 my-4 rounded-2xl bg-purple-950/40 border-l-4 border-purple-400 text-purple-100 italic font-serif text-base"
                >
                  {trimmed.replace(/^>\s+/, '')}
                </blockquote>
              );
            }
            if (trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').map((li) => li.replace(/^-\s+/, ''));
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 pl-2">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* Tags Row */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-purple-500/15 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-purple-300 flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Tags:</span>
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-purple-500/20 text-xs text-slate-300 hover:text-white transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Social Share Callout */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#140E28] to-indigo-950/50 border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-semibold text-white">
              Did this reflection resonate with your practice?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Share it with fellow mindful seekers or save for your next somatic session.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/30 text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
            >
              WhatsApp
            </button>
            <button
              onClick={handleShareTwitter}
              className="px-4 py-2 rounded-full bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/30 text-sky-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Share on X
            </button>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-full btn-silver-glass text-xs font-semibold cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Up Next Articles */}
        {otherBlogs.length > 0 && (
          <div className="mt-16 pt-10 border-t border-purple-500/15">
            <h3 className="font-serif text-2xl font-semibold text-white mb-6">
              More From The Mindful Chronicle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherBlogs.map((other) => (
                <Link
                  key={other.id}
                  to={`/blog/${other.id}`}
                  className="group p-5 rounded-3xl bg-[#120D24] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-purple-300 tracking-wider mb-2">
                      <span>{other.category}</span>
                      <span>•</span>
                      <span>{other.readTime}</span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-white group-hover:text-purple-200 transition-colors line-clamp-2 mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 font-light">
                      {other.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs text-purple-300 group-hover:text-white">
                    <span>Read Reflection</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
