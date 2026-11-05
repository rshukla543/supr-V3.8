import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoContent,
  InstagramReel,
  ServiceItem,
  GalleryImage,
  WaitlistSubmission,
  NewsletterSubscriber,
  SiteSettings,
  Testimonial,
  BrandSponsor,
  DailyIntention,
} from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Database,
  Film,
  Briefcase,
  Image as ImageIcon,
  Users,
  Mail,
  Settings,
  Sparkles,
  Upload,
  Link,
  Eye,
  MessageSquareHeart,
  Star,
  ShieldCheck,
  Clock,
  Lock,
  Unlock,
  KeyRound,
  Layout,
  Layers,
  Heart,
  Feather,
  LogOut,
  ExternalLink,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';
import {
  upsertVideo,
  deleteVideo,
  upsertReel,
  deleteReel,
  upsertService,
  deleteService,
  upsertGalleryImage,
  deleteGalleryImage,
  updateWaitlistStatus,
  updateSiteSettings,
  uploadGalleryImageFile,
  uploadMediaFile,
  toggleTestimonialApproval,
  deleteTestimonial,
  submitTestimonial,
  getBrandSponsors,
  upsertBrandSponsor,
  deleteBrandSponsor,
  getDailyIntention,
  updateDailyIntention,
  upsertBlog,
  deleteBlog,
  getAllTestimonials,
  supabase,
} from '../lib/supabase';
import { toast } from 'sonner';
import {
  suggestCaptionAndTitle,
  generateWeeklyContentPlan,
  WeeklyPlanResult,
  DayPlan,
} from '../lib/gemini';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoContent[];
  reels: InstagramReel[];
  services: ServiceItem[];
  gallery: GalleryImage[];
  waitlist: WaitlistSubmission[];
  subscribers: NewsletterSubscriber[];
  siteSettings: SiteSettings;
  testimonials: Testimonial[];
  sponsors?: BrandSponsor[];
  dailyIntention?: DailyIntention;
  onRefreshData: () => void;
}

type AdminSectionTab =
  | 'hero'
  | 'settings'
  | 'marquee'
  | 'gallery'
  | 'vault'
  | 'services'
  | 'testimonials'
  | 'intentions'
  | 'waitlist'
  | 'subscribers'
  | 'ai-strategist';


export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  videos,
  reels,
  services,
  gallery,
  waitlist,
  subscribers,
  siteSettings,
  testimonials,
  sponsors = [],
  dailyIntention,
  onRefreshData,
}) => {
  // 1-Click Client Preview Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('supriya_client_preview_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Section Tab (1-to-1 Section Mapping)
  const [activeTab, setActiveTab] = useState<AdminSectionTab>('hero');
  const [saveSuccess, setSaveSuccess] = useState('');

  // 1. Hero Section Form State
  const [heroBadge, setHeroBadge] = useState(siteSettings.heroBadge);
  const [headline, setHeadline] = useState(siteSettings.headline);
  const [subtext, setSubtext] = useState(siteSettings.subtext);
  const [primaryCta, setPrimaryCta] = useState(siteSettings.primaryCta || 'Start Training');
  const [secondaryCta, setSecondaryCta] = useState(siteSettings.secondaryCta || 'Watch Latest Video');
  const [heroPortraitUrl, setHeroPortraitUrl] = useState(siteSettings.heroPortraitUrl || '');
  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);

  // 2. Site Settings & Global Logo State
  const [logoUrl, setLogoUrl] = useState(siteSettings.logoUrl || '');
  const [bioQuote, setBioQuote] = useState(siteSettings.bioQuote);
  const [bioStory, setBioStory] = useState(siteSettings.bioStory);
  const [managementEmail, setManagementEmail] = useState(siteSettings.managementEmail || 'management@supriyabhavsar.com');
  const [instagramHandle, setInstagramHandle] = useState(siteSettings.instagramHandle || '@supriya_9508');
  const [youtubeChannel, setYoutubeChannel] = useState(siteSettings.youtubeChannel || '@supriyabhavsar_yoga');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // 3. Brand Sponsors State
  const [sponsorsList, setSponsorsList] = useState<BrandSponsor[]>(sponsors || []);
  const [editingSponsor, setEditingSponsor] = useState<BrandSponsor | null>(null);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorTagline, setSponsorTagline] = useState('');
  const [sponsorCategory, setSponsorCategory] = useState('');
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState('');
  const [sponsorAffiliateUrl, setSponsorAffiliateUrl] = useState('');
  const [sponsorOrder, setSponsorOrder] = useState<number>(1);
  const [isUploadingSponsorLogo, setIsUploadingSponsorLogo] = useState(false);

  // 4. Daily Intention State
  const [dailyIntentionState, setDailyIntentionState] = useState<DailyIntention | null>(dailyIntention || null);
  const [intentionQuote, setIntentionQuote] = useState(dailyIntention?.quoteText || 'The breath is the bridge which connects life to consciousness, uniting the body and the mind in pure stillness.');
  const [intentionTheme, setIntentionTheme] = useState(dailyIntention?.theme || 'Sthira Sukham Asanam (Steadiness and Ease)');
  const [intentionSanskritWord, setIntentionSanskritWord] = useState(dailyIntention?.sanskritWord || 'Prana & Dharana');
  const [intentionSanskritMeaning, setIntentionSanskritMeaning] = useState(dailyIntention?.sanskritMeaning || 'Life-force breath & steady focus');
  const [isSavingIntention, setIsSavingIntention] = useState(false);

  // 5. Vault Subtab State
  const [vaultSubtab, setVaultSubtab] = useState<'videos' | 'reels'>('videos');

  // 6. Testimonials Tab State
  const [testimonialFilter, setTestimonialFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialEmail, setNewTestimonialEmail] = useState('');
  const [newTestimonialRole, setNewTestimonialRole] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);
  const [newTestimonialMessage, setNewTestimonialMessage] = useState('');
  const [newTestimonialImageUrl, setNewTestimonialImageUrl] = useState('');
  const [isUploadingTestimonialPhoto, setIsUploadingTestimonialPhoto] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  // 7. Video Form State
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState<'Yoga (YouTube)' | 'Lifestyle Vlogs'>('Yoga (YouTube)');
  const [newVideoDuration, setNewVideoDuration] = useState('20:00');
  const [newVideoViews, setNewVideoViews] = useState('100K views');
  const [newVideoUrl, setNewVideoUrl] = useState('https://www.youtube.com/watch?v=sTANio_2E0Q');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoCustomThumbnail, setNewVideoCustomThumbnail] = useState('');
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  // 8. Reel Form State
  const [editingReel, setEditingReel] = useState<InstagramReel | null>(null);
  const [newReelPose, setNewReelPose] = useState('');
  const [newReelCaption, setNewReelCaption] = useState('');
  const [newReelAudio, setNewReelAudio] = useState('♫ Original Audio • Supriya');
  const [newReelLikes, setNewReelLikes] = useState('50.0K');
  const [newReelDuration, setNewReelDuration] = useState('0:45');
  const [newReelUrl, setNewReelUrl] = useState('https://www.instagram.com/reel/C-xyz123/');
  const [newReelVideoUrl, setNewReelVideoUrl] = useState('');
  const [newReelThumbnailUrl, setNewReelThumbnailUrl] = useState('');

  // 9. Service Form State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceSubtitle, setServiceSubtitle] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceBadge, setServiceBadge] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('');

  // 10. Gallery Form State (with direct Supabase Storage upload)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryFolder, setGalleryFolder] = useState<'Asana & Flow' | 'Studio & Space' | 'Travel & Retreats' | 'Casual & Lifestyle'>('Asana & Flow');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Sync settings whenever props update
  useEffect(() => {
    setHeadline(siteSettings.headline);
    subtext && setSubtext(siteSettings.subtext);
    setHeroBadge(siteSettings.heroBadge);
    setBioQuote(siteSettings.bioQuote);
    setBioStory(siteSettings.bioStory);
    setLogoUrl(siteSettings.logoUrl || '');
    setHeroPortraitUrl(siteSettings.heroPortraitUrl || '');
    if (sponsors && sponsors.length > 0) setSponsorsList(sponsors);
    if (dailyIntention) {
      setDailyIntentionState(dailyIntention);
      setIntentionQuote(dailyIntention.quoteText);
      if (dailyIntention.theme) setIntentionTheme(dailyIntention.theme);
      if (dailyIntention.sanskritWord) setIntentionSanskritWord(dailyIntention.sanskritWord);
      if (dailyIntention.sanskritMeaning) setIntentionSanskritMeaning(dailyIntention.sanskritMeaning);
    }
  }, [siteSettings, sponsors, dailyIntention]);

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    toast.success(msg);
    setTimeout(() => setSaveSuccess(''), 3500);
  };

  // AI Strategist State
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlanResult | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planTheme, setPlanTheme] = useState('Somatic Vagus Nerve Regulation & Biomechanics');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Testimonial Moderation Inline Edit State
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editTestimonialName, setEditTestimonialName] = useState('');
  const [editTestimonialRole, setEditTestimonialRole] = useState('');
  const [editTestimonialMessage, setEditTestimonialMessage] = useState('');
  const [editTestimonialRating, setEditTestimonialRating] = useState(5);
  const [editTestimonialImageUrl, setEditTestimonialImageUrl] = useState('');


  // 1-Click Client Preview Login Action
  const handleOneClickLogin = () => {
    sessionStorage.setItem('supriya_client_preview_auth', 'true');
    setIsAuthenticated(true);
    setAuthError('');
    showNotification('Logged in with 1-Click Client Preview!');
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'admin' || passwordInput.trim() === 'preview') {
      sessionStorage.setItem('supriya_client_preview_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      showNotification('Passkey verified. Welcome to Client CMS!');
    } else {
      setAuthError('Incorrect passkey. (Hint: Use "admin" or click the 1-Click button)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('supriya_client_preview_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // 1. HERO SECTION HANDLERS
  const handleUploadHeroPortrait = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPortrait(true);
    try {
      const publicUrl = await uploadMediaFile(file, 'site-assets', 'hero');
      setHeroPortraitUrl(publicUrl);
      showNotification('Hero cutout portrait uploaded to Supabase Storage!');
    } catch (err) {
      console.warn('Hero portrait upload notice:', err);
    } finally {
      setIsUploadingPortrait(false);
    }
  };

  const handleSaveHeroSection = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteSettings = {
      ...siteSettings,
      headline,
      subtext,
      heroBadge,
      primaryCta,
      secondaryCta,
      heroPortraitUrl: heroPortraitUrl || undefined,
    };
    await updateSiteSettings(updated);
    onRefreshData();
    showNotification('Hero Section headlines & cutout portrait saved!');
  };

  // 2. SITE SETTINGS & LOGO HANDLERS
  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    try {
      const publicUrl = await uploadMediaFile(file, 'site-assets', 'branding');
      setLogoUrl(publicUrl);
      showNotification('Global brand logo uploaded to Supabase Storage!');
    } catch (err) {
      console.warn('Logo upload notice:', err);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteSettings = {
      ...siteSettings,
      logoUrl: logoUrl || undefined,
      bioQuote,
      bioStory,
      managementEmail,
      instagramHandle,
      youtubeChannel,
    };
    await updateSiteSettings(updated);
    onRefreshData();
    showNotification('Site settings, global logo & bio saved to Supabase!');
  };

  // BRAND SPONSORS HANDLERS
  const handleUploadSponsorLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingSponsorLogo(true);
    try {
      const url = await uploadMediaFile(file, 'site-assets', 'sponsors');
      setSponsorLogoUrl(url);
      showNotification('Sponsor logo uploaded to Supabase Storage!');
    } catch (err) {
      console.warn('Sponsor logo upload notice:', err);
    } finally {
      setIsUploadingSponsorLogo(false);
    }
  };

  const handleSaveSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName.trim()) return;
    const sponsorToSave: BrandSponsor = {
      id: editingSponsor ? editingSponsor.id : `sponsor-${Date.now()}`,
      name: sponsorName.trim(),
      tagline: sponsorTagline.trim() || undefined,
      category: sponsorCategory.trim() || undefined,
      logoUrl: sponsorLogoUrl.trim() || undefined,
      affiliateUrl: sponsorAffiliateUrl.trim() || undefined,
      displayOrder: sponsorOrder || sponsorsList.length + 1,
    };
    await upsertBrandSponsor(sponsorToSave);
    setEditingSponsor(null);
    setSponsorName('');
    setSponsorTagline('');
    setSponsorCategory('');
    setSponsorLogoUrl('');
    setSponsorAffiliateUrl('');
    setSponsorOrder(sponsorsList.length + 1);
    const fresh = await getBrandSponsors();
    setSponsorsList(fresh);
    onRefreshData();
    showNotification('Brand Sponsor saved & synced to Supabase database!');
  };

  const handleDeleteSponsor = async (id: string) => {
    await deleteBrandSponsor(id);
    const fresh = await getBrandSponsors();
    setSponsorsList(fresh);
    onRefreshData();
    showNotification('Brand Sponsor removed.');
  };

  // DAILY INTENTION HANDLERS
  const handleSaveDailyIntention = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentionQuote.trim()) return;
    setIsSavingIntention(true);
    try {
      const updated = await updateDailyIntention({
        quoteText: intentionQuote.trim(),
        theme: intentionTheme.trim() || undefined,
        sanskritWord: intentionSanskritWord.trim() || undefined,
        sanskritMeaning: intentionSanskritMeaning.trim() || undefined,
      });
      setDailyIntentionState(updated);
      onRefreshData();
      showNotification('Daily Intention updated and synced to live site!');
    } catch (err) {
      console.warn('Daily intention save error:', err);
    } finally {
      setIsSavingIntention(false);
    }
  };

  // 3. TESTIMONIALS HANDLERS
  const pendingTestimonialsCount = testimonials.filter((t) => !t.isApproved).length;

  const handleToggleTestimonial = async (id: string, currentApproved: boolean) => {
    await toggleTestimonialApproval(id, !currentApproved);
    onRefreshData();
    showNotification(!currentApproved ? 'Testimonial approved & published to website!' : 'Testimonial returned to pending moderation.');
  };

  const handleDeleteTestimonial = async (id: string) => {
    await deleteTestimonial(id);
    onRefreshData();
    showNotification('Testimonial removed from database.');
  };

  const handleManualAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName.trim() || !newTestimonialMessage.trim()) {
      alert('Please fill in client name and reflection message.');
      return;
    }

    const created = await submitTestimonial({
      name: newTestimonialName.trim(),
      email: newTestimonialEmail.trim() || 'student@offline.com',
      roleOrLocation: newTestimonialRole.trim() || 'Verified Student',
      rating: newTestimonialRating,
      message: newTestimonialMessage.trim(),
      imageUrl: newTestimonialImageUrl || undefined,
    });

    // Auto-approve since created directly from CMS
    await toggleTestimonialApproval(created.id, true);

    setNewTestimonialName('');
    setNewTestimonialEmail('');
    setNewTestimonialRole('');
    setNewTestimonialRating(5);
    setNewTestimonialMessage('');
    setNewTestimonialImageUrl('');
    setIsAddingTestimonial(false);
    onRefreshData();
    showNotification('Testimonial created & approved for public wall!');
  };

  const handleUploadTestimonialPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingTestimonialPhoto(true);
    try {
      const url = await uploadMediaFile(file, 'site-assets', 'testimonials');
      setNewTestimonialImageUrl(url);
      showNotification('Testimonial photo uploaded to Supabase Storage!');
    } catch (err) {
      console.warn('Photo upload notice:', err);
    } finally {
      setIsUploadingTestimonialPhoto(false);
    }
  };

  const handleSaveEditedTestimonial = async (autoApprove: boolean = true) => {
    if (!editingTestimonial) return;
    try {
      const updatedTestimonial: Testimonial = {
        ...editingTestimonial,
        name: editTestimonialName.trim() || editingTestimonial.name,
        roleOrLocation: editTestimonialRole.trim() || editingTestimonial.roleOrLocation,
        message: editTestimonialMessage.trim() || editingTestimonial.message,
        rating: editTestimonialRating,
        imageUrl: editTestimonialImageUrl || editingTestimonial.imageUrl,
        isApproved: autoApprove ? true : editingTestimonial.isApproved,
      };

      const all = await getAllTestimonials();
      const updated = all.map((t) => (t.id === updatedTestimonial.id ? updatedTestimonial : t));
      localStorage.setItem('supriya_testimonials', JSON.stringify(updated));

      await supabase.from('testimonials').upsert({
        id: updatedTestimonial.id,
        name: updatedTestimonial.name,
        email: updatedTestimonial.email,
        message: updatedTestimonial.message,
        role_or_location: updatedTestimonial.roleOrLocation,
        rating: updatedTestimonial.rating,
        image_url: updatedTestimonial.imageUrl || null,
        is_approved: updatedTestimonial.isApproved,
      });

      setEditingTestimonial(null);
      onRefreshData();
      showNotification(autoApprove ? 'Testimonial updated & approved for public wall!' : 'Testimonial edits saved.');
    } catch (err: any) {
      toast.error('Failed to update testimonial: ' + (err.message || 'Error'));
    }
  };

  // AI Content Strategist Handler
  const handleGenerateWeeklyPlan = async () => {
    setIsGeneratingPlan(true);
    toast.info('Gemini 3.8 Flash is architecting your 7-day content schedule...');
    try {
      const plan = await generateWeeklyContentPlan(planTheme);
      setWeeklyPlan(plan);
      showNotification('7-Day Strategic Content Plan generated!');
    } catch (err: any) {
      toast.error('Error generating plan: ' + (err.message || 'API error'));
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // AI Caption Suggestion Handlers
  const handleGenerateGalleryCaption = async () => {
    setIsGeneratingCaption(true);
    toast.info('Generating mindful title & caption via Gemini 3.8 Flash...');
    try {
      const res = await suggestCaptionAndTitle({
        folder: galleryFolder,
        currentTitle: galleryTitle,
        imageContext: `Yoga photo in folder ${galleryFolder}`,
      });
      if (res.title) setGalleryTitle(res.title);
      if (res.caption) setGalleryCaption(res.caption);
      showNotification('AI suggestions applied!');
    } catch {
      toast.error('Failed to generate suggestions');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleGenerateVideoCaption = async () => {
    setIsGeneratingCaption(true);
    toast.info('Generating video title & description via Gemini 3.8 Flash...');
    try {
      const res = await suggestCaptionAndTitle({
        category: newVideoCategory,
        currentTitle: newVideoTitle,
        imageContext: `${newVideoCategory} masterclass flow with somatic alignment`,
      });
      if (res.title) setNewVideoTitle(res.title);
      if (res.caption) setNewVideoDesc(res.caption);
      showNotification('AI video metadata generated!');
    } catch {
      toast.error('Failed to generate video metadata');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleGenerateReelCaption = async () => {
    setIsGeneratingCaption(true);
    toast.info('Generating 60-second Reel hook via Gemini 3.8 Flash...');
    try {
      const res = await suggestCaptionAndTitle({
        category: 'Reels (Instagram)',
        currentTitle: newReelPose,
        imageContext: `60-second micro drill for ${newReelPose}`,
      });
      if (res.title) setNewReelPose(res.title);
      if (res.caption) setNewReelCaption(res.caption);
      showNotification('AI Reel hook generated!');
    } catch {
      toast.error('Failed to generate Reel hook');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  // 4. GALLERY HANDLERS
  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const publicUrl = await uploadGalleryImageFile(file);
      setGalleryImageUrl(publicUrl);
      showNotification('Image uploaded to gallery-images bucket!');
    } catch (err) {
      console.warn('Gallery upload notice:', err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageToSave: GalleryImage = {
      id: editingImage ? editingImage.id : `gal-${Date.now()}`,
      title: galleryTitle || 'New Visual Archive',
      folder: galleryFolder,
      caption: galleryCaption || 'Atmospheric moment in movement.',
      gradientHint: 'from-purple-950 via-slate-900 to-black',
      displayOrder: editingImage?.displayOrder || gallery.length + 1,
      imageUrl: galleryImageUrl || editingImage?.imageUrl,
    };
    await upsertGalleryImage(imageToSave);
    setEditingImage(null);
    setGalleryTitle('');
    setGalleryCaption('');
    setGalleryImageUrl('');
    onRefreshData();
    showNotification('Gallery image saved to carousel & database!');
  };

  const handleDeleteGallery = async (id: string) => {
    await deleteGalleryImage(id);
    onRefreshData();
    showNotification('Image deleted from database.');
  };

  // 5. CONTENT VAULT (VIDEOS & REELS) HANDLERS
  const handleUploadVideoThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingThumbnail(true);
    try {
      const publicUrl = await uploadMediaFile(file, 'site-assets', 'thumbnails');
      setNewVideoCustomThumbnail(publicUrl);
      showNotification('Custom video thumbnail uploaded to Supabase Storage!');
    } catch (err) {
      console.warn('Thumbnail upload notice:', err);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoToSave: VideoContent = {
      id: editingVideo ? editingVideo.id : `video-${Date.now()}`,
      title: newVideoTitle || 'New Masterclass Flow',
      category: newVideoCategory,
      duration: newVideoDuration,
      views: newVideoViews,
      date: 'Just added',
      description: newVideoDesc || 'Alignment and pranayama breath practice.',
      videoUrl: newVideoUrl,
      customThumbnailUrl: newVideoCustomThumbnail || editingVideo?.customThumbnailUrl,
      tags: ['Yoga', 'Pranayama'],
      thumbnailGradient: 'from-purple-950 via-slate-900 to-black',
      thumbnailAccent: '#C084FC',
      accentIcon: newVideoCategory === 'Yoga (YouTube)' ? 'yoga' : 'vlog',
    };

    await upsertVideo(videoToSave);
    setEditingVideo(null);
    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    setNewVideoCustomThumbnail('');
    onRefreshData();
    showNotification('Video saved & synced to Supabase database!');
  };

  const handleDeleteVideo = async (id: string) => {
    await deleteVideo(id);
    onRefreshData();
    showNotification('Video deleted from database.');
  };

  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    const reelToSave: InstagramReel = {
      id: editingReel ? editingReel.id : `reel-${Date.now()}`,
      caption: newReelCaption || 'Bite-sized somatic yoga drill & movement alignment.',
      creatorHandle: 'supriya_9508',
      audioTrack: newReelAudio || '♫ Original Audio • Supriya',
      likesCount: newReelLikes || '48.5K',
      commentsCount: editingReel?.commentsCount || '500',
      sharesCount: editingReel?.sharesCount || '2.5K',
      viewsCount: editingReel?.viewsCount || '150K',
      duration: newReelDuration || '0:45',
      gradient: editingReel?.gradient || 'from-purple-950 via-slate-900 to-black',
      coverAccent: editingReel?.coverAccent || '#A855F7',
      poseName: newReelPose || 'Somatic Alignment',
      tags: editingReel?.tags || ['YogaTips', 'Movement'],
      date: editingReel?.date || 'Recent',
      reelUrl: newReelUrl || 'https://www.instagram.com/reel/C8qLd95M6P1/',
      thumbnailUrl: newReelThumbnailUrl || editingReel?.thumbnailUrl || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    };

    await upsertReel(reelToSave);
    setEditingReel(null);
    setNewReelPose('');
    setNewReelCaption('');
    setNewReelUrl('https://www.instagram.com/reel/C8qLd95M6P1/');
    setNewReelVideoUrl('');
    setNewReelThumbnailUrl('');
    onRefreshData();
    showNotification('Instagram Reel saved & synced to Supabase database!');
  };

  const handleDeleteReel = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Instagram Reel?')) {
      await deleteReel(id);
      onRefreshData();
      showNotification('Reel deleted from database.');
    }
  };

  // 6. SERVICES HANDLERS
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    const updated: ServiceItem = {
      ...editingService,
      title: serviceTitle,
      subtitle: serviceSubtitle,
      priceEstimate: servicePrice,
      badge: serviceBadge,
      description: serviceDesc,
      features: serviceFeatures.split('\n').filter((f) => f.trim().length > 0),
    };
    await upsertService(updated);
    setEditingService(null);
    onRefreshData();
    showNotification('Service updated and synced to Supabase database!');
  };

  // 1-to-1 Section Mapping Tab Navigation Roster
  const sectionTabs = [
    { id: 'hero', label: '1. Hero Section', icon: Sparkles, badge: 'Portrait & CTAs' },
    { id: 'settings', label: '2. Site Settings & Logo', icon: Settings, badge: 'Global Emblem' },
    { id: 'marquee', label: '3. Brand Sponsors', icon: Layers, badge: 'Marquee' },
    { id: 'gallery', label: '4. Gallery Carousel', icon: ImageIcon, count: gallery.length },
    { id: 'vault', label: '5. Content Vault', icon: Film, count: videos.length + reels.length },
    { id: 'services', label: '6. Services ("Work With Me")', icon: Briefcase, count: services.length },
    {
      id: 'testimonials',
      label: '7. Testimonials',
      icon: MessageSquareHeart,
      count: testimonials.length,
      pendingBadge: pendingTestimonialsCount,
    },
    { id: 'intentions', label: '8. Daily Intention', icon: Heart, badge: '3.0s Hold' },
    { id: 'waitlist', label: '9. Waitlist Leads', icon: Users, count: waitlist.length },
    { id: 'subscribers', label: '10. Subscribers', icon: Mail, count: subscribers.length },
    { id: 'ai-strategist', label: '11. AI Strategist', icon: Sparkles, badge: 'Gemini 3.8' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="relative w-full max-w-6xl h-[94vh] rounded-3xl bg-[#0D091B] text-[#F8FAFC] overflow-hidden border border-purple-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col"
      >
        {/* ============================================================== */}
        {/* SCREEN 1: 1-CLICK CLIENT PREVIEW LOGIN (If Not Authenticated) */}
        {/* ============================================================== */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-[#140D28] via-[#0D091B] to-[#0A0716]">
            {/* Ambient Glowing Aura */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#120C24]/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl text-center"
            >
              {/* Emblazoned Lotus Emblem */}
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-300/30">
                <Lock className="w-8 h-8 text-white" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-[11px] text-purple-300 font-mono uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Client Preview Access</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-2">
                Supriya Studio <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200">CMS Portal</span>
              </h3>
              <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                Review and manage all website content in real time. Use 1-Click Preview for instant access without credentials.
              </p>

              {/* Action 1: 1-Click Client Preview Button (Primary Highlight) */}
              <motion.button
                onClick={handleOneClickLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full py-4 px-6 rounded-2xl text-sm font-semibold tracking-wide text-[#0B0914] bg-gradient-to-r from-white via-slate-100 to-purple-100 hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2.5 cursor-pointer mb-5"
              >
                <Unlock className="w-4 h-4 text-purple-800" />
                <span>1-Click Client Preview Login</span>
                <Sparkles className="w-4 h-4 text-purple-600" />
              </motion.button>

              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-purple-500/20 w-full" />
                <span className="bg-[#120C24] px-3 text-[10px] text-slate-500 font-mono uppercase">
                  Or enter passkey
                </span>
                <div className="border-t border-purple-500/20 w-full" />
              </div>

              {/* Action 2: Password Entry (password: admin) */}
              <form onSubmit={handlePasswordLogin} className="space-y-3">
                {authError && (
                  <p className="text-xs text-rose-300 bg-rose-950/40 p-2 rounded-xl border border-rose-500/30">
                    {authError}
                  </p>
                )}
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter passkey (e.g. admin)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090615] border border-purple-500/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-purple-200 bg-purple-900/30 border border-purple-500/30 hover:bg-purple-900/50 transition-colors cursor-pointer"
                >
                  Sign In with Passkey
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                <span>Default Passkey:</span>
                <code className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                  admin
                </code>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ============================================================== */
          /* SCREEN 2: 1-to-1 METICULOUS SECTION DASHBOARD */
          /* ============================================================== */
          <>
            {/* Top Bar with Live Sync & Exit Preview */}
            <div className="px-6 py-3.5 bg-[#140E26] border-b border-purple-500/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      Supriya Studio CMS
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync
                    </span>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                      Client Preview
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/70 font-mono">
                    Supabase: eialqaovgaphyhpmeunu.supabase.co
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="text-xs text-purple-200 bg-purple-950/80 border border-purple-400/40 px-3 py-1 rounded-full animate-in fade-in flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-purple-300" />
                    {saveSuccess}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                  title="Lock & Exit Client Preview"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exit Preview</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Body: Dedicated Sidebar + Active Tab Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Dedicated Sidebar for 1-to-1 Section Mapping */}
              <aside className="w-64 sm:w-72 bg-[#100A20] border-r border-purple-500/15 flex flex-col shrink-0 overflow-y-auto no-scrollbar">
                <div className="p-3 border-b border-purple-500/10">
                  <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider px-2 py-1">
                    Frontend Sections (1-to-1)
                  </p>
                </div>

                <nav className="p-2 space-y-1">
                  {sectionTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as AdminSectionTab)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-900/30'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                          <span className="truncate">{tab.label}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {tab.count !== undefined && (
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-purple-950/60 text-purple-300'}`}>
                              {tab.count}
                            </span>
                          )}
                          {tab.badge && (
                            <span className="text-[9px] font-mono uppercase opacity-75 hidden sm:inline">
                              {tab.badge}
                            </span>
                          )}
                          {Boolean(tab.pendingBadge && tab.pendingBadge > 0) && (
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold animate-pulse">
                              {tab.pendingBadge}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-auto p-4 border-t border-purple-500/10 bg-[#0C0818]/60 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">Theme Active</span>
                    <span className="text-purple-300 font-mono">Midnight Lotus</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    All updates reflect across the live preview immediately.
                  </p>
                </div>
              </aside>

              {/* Main Tab Content Area */}
              <main className="flex-1 p-6 overflow-y-auto bg-[#0D091B]">
                {/* -------------------------------------------------------- */}
                {/* 1. HERO SECTION TAB (Cutout Portrait + Headline Text) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'hero' && (
                  <form onSubmit={handleSaveHeroSection} className="space-y-6 max-w-4xl">
                    <div className="border-b border-purple-500/15 pb-4">
                      <h4 className="text-lg font-serif font-semibold text-white">Hero Section Configuration</h4>
                      <p className="text-xs text-purple-300/70">
                        Manage the opening hero split layout: cutout portrait image upload, editorial headline, subtext, and CTA buttons.
                      </p>
                    </div>

                    {/* Cutout Portrait Upload Box */}
                    <div className="p-6 rounded-2xl bg-[#140E26]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] space-y-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs uppercase font-bold tracking-wider text-purple-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span>Hero Cutout Portrait (Transparent PNG or High-Res Photo)</span>
                        </label>
                        {heroPortraitUrl && (
                          <button
                            type="button"
                            onClick={() => setHeroPortraitUrl('')}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            Reset to Default Portrait
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 space-y-3">
                          <p className="text-xs text-slate-300/80 leading-relaxed">
                            Upload a high-resolution portrait or cutout image. It is hosted directly on Supabase Storage (`site-assets/hero`) and rendered inside the organic glassmorphic hero frame.
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <label className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-violet-500/25">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploadingPortrait ? 'Uploading to Supabase...' : 'Upload Portrait File'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadHeroPortrait}
                                disabled={isUploadingPortrait}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={heroPortraitUrl}
                              onChange={(e) => setHeroPortraitUrl(e.target.value)}
                              placeholder="Or paste Direct Supabase Public Image URL"
                              className="flex-1 min-w-[220px] px-3.5 py-2.5 rounded-xl bg-[#090615] border border-white/10 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                            />
                          </div>
                        </div>

                        {/* Live Portrait Preview */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0B0818] border border-purple-500/20">
                          <div className="relative w-28 h-36 rounded-2xl overflow-hidden border border-purple-400/30 bg-gradient-to-b from-purple-900/30 to-black/60 flex items-center justify-center">
                            {heroPortraitUrl ? (
                              <img
                                src={heroPortraitUrl}
                                alt="Hero Cutout Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80"
                                alt="Default Portrait"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-2 font-mono">
                            {heroPortraitUrl ? 'Custom Cutout Active' : 'Default Portrait'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Headlines & Copy */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                          Top Badge / Credentials
                        </label>
                        <input
                          type="text"
                          value={heroBadge}
                          onChange={(e) => setHeroBadge(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                          Main Headline (Serif H1)
                        </label>
                        <input
                          type="text"
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                          Hero Subtext / Movement Philosophy
                        </label>
                        <textarea
                          rows={3}
                          value={subtext}
                          onChange={(e) => setSubtext(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                            Primary CTA Button Label
                          </label>
                          <input
                            type="text"
                            value={primaryCta}
                            onChange={(e) => setPrimaryCta(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                            Secondary CTA Button Label
                          </label>
                          <input
                            type="text"
                            value={secondaryCta}
                            onChange={(e) => setSecondaryCta(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Hero Section to Supabase</span>
                    </button>
                  </form>
                )}

                {/* -------------------------------------------------------- */}
                {/* 2. SITE SETTINGS & LOGO TAB */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'settings' && (
                  <form onSubmit={handleSaveSiteSettings} className="space-y-6 max-w-4xl">
                    <div className="border-b border-purple-500/15 pb-4">
                      <h4 className="text-lg font-serif font-semibold text-white">Global Site Settings & Brand Logo</h4>
                      <p className="text-xs text-purple-300/70">
                        Upload the global brand logo for the navbar/footer and configure bio story & contact handles.
                      </p>
                    </div>

                    {/* Global Logo Upload Box */}
                    <div className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs uppercase font-bold tracking-wider text-purple-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span>Global Brand Logo (Navigation & Footer)</span>
                        </label>
                        {logoUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoUrl('')}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            Reset to Default Monogram
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-2 space-y-3">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Upload your brand mark or emblem. When set, this replaces the default "S" monogram in both the top navigation bar and bottom footer.
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <label className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                              <Upload className="w-4 h-4" />
                              <span>{isUploadingLogo ? 'Uploading to Storage...' : 'Upload Brand Logo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadLogo}
                                disabled={isUploadingLogo}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={logoUrl}
                              onChange={(e) => setLogoUrl(e.target.value)}
                              placeholder="Or paste Direct Logo URL"
                              className="flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        {/* Live Logo Preview */}
                        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0B0818] border border-purple-500/20">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-purple-400/40 flex items-center justify-center bg-gradient-to-tr from-purple-900/40 to-slate-900 shadow-md">
                            {logoUrl ? (
                              <img src={logoUrl} alt="Active Logo" className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-serif text-2xl font-bold text-white">S</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 mt-2 font-mono">
                            {logoUrl ? 'Custom Dynamic Logo' : 'Default "S" Monogram'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio & Philosophy Copy */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                          About Bio Quote
                        </label>
                        <input
                          type="text"
                          value={bioQuote}
                          onChange={(e) => setBioQuote(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                          About Bio Story (Narrative)
                        </label>
                        <textarea
                          rows={4}
                          value={bioStory}
                          onChange={(e) => setBioStory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                            Management Inquiries Email
                          </label>
                          <input
                            type="email"
                            value={managementEmail}
                            onChange={(e) => setManagementEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                            Instagram Handle
                          </label>
                          <input
                            type="text"
                            value={instagramHandle}
                            onChange={(e) => setInstagramHandle(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5">
                            YouTube Channel Name
                          </label>
                          <input
                            type="text"
                            value={youtubeChannel}
                            onChange={(e) => setYoutubeChannel(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Site Settings to Supabase</span>
                    </button>
                  </form>
                )}

                {/* -------------------------------------------------------- */}
                {/* 3. BRAND MARQUEE TAB (Brand Sponsors CRUD) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'marquee' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-white">Brand Sponsors & Partnerships Marquee</h4>
                        <p className="text-xs text-purple-300/70">
                          Add, edit, or remove partner brand emblems, custom logo uploads, and trackable affiliate URLs.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSponsor(null);
                          setSponsorName('');
                          setSponsorTagline('');
                          setSponsorCategory('');
                          setSponsorLogoUrl('');
                          setSponsorAffiliateUrl('');
                          setSponsorOrder(sponsorsList.length + 1);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Sponsor</span>
                      </button>
                    </div>

                    {/* Add/Edit Sponsor Form */}
                    <form onSubmit={handleSaveSponsor} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/25 space-y-4">
                      <div className="flex items-center justify-between border-b border-purple-500/15 pb-2">
                        <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-purple-400" />
                          <span>{editingSponsor ? `Editing: ${editingSponsor.name}` : 'Create Brand Partner Entry'}</span>
                        </h5>
                        {editingSponsor && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSponsor(null);
                              setSponsorName('');
                              setSponsorTagline('');
                              setSponsorCategory('');
                              setSponsorLogoUrl('');
                              setSponsorAffiliateUrl('');
                            }}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Brand Name *</label>
                          <input
                            type="text"
                            required
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                            placeholder="e.g. Manduka India"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Category</label>
                          <input
                            type="text"
                            value={sponsorCategory}
                            onChange={(e) => setSponsorCategory(e.target.value)}
                            placeholder="e.g. Yoga Gear, Ayurvedic Wellness"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Tagline</label>
                          <input
                            type="text"
                            value={sponsorTagline}
                            onChange={(e) => setSponsorTagline(e.target.value)}
                            placeholder="e.g. Eco-Conscious Yoga Mats & Props"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Display Order</label>
                          <input
                            type="number"
                            value={sponsorOrder}
                            onChange={(e) => setSponsorOrder(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase text-slate-300 mb-1">Affiliate / Partnership URL</label>
                        <input
                          type="url"
                          value={sponsorAffiliateUrl}
                          onChange={(e) => setSponsorAffiliateUrl(e.target.value)}
                          placeholder="https://brand.com?ref=supriyabhavsar"
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                        />
                      </div>

                      {/* Logo Upload Box */}
                      <div>
                        <label className="block text-xs uppercase text-slate-300 mb-1">Brand Logo Emblem</label>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="px-3.5 py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploadingSponsorLogo ? 'Uploading to Storage...' : 'Upload Logo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleUploadSponsorLogo}
                              disabled={isUploadingSponsorLogo}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={sponsorLogoUrl}
                            onChange={(e) => setSponsorLogoUrl(e.target.value)}
                            placeholder="Or paste Direct Logo URL"
                            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Sponsor to Supabase</span>
                      </button>
                    </form>

                    {/* Current Sponsors Grid */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                        Active Brand Sponsors ({sponsorsList.length})
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sponsorsList.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl bg-[#140E26] border border-purple-500/20 flex items-center justify-between gap-3 group hover:border-purple-400/40 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {item.logoUrl ? (
                                <img
                                  src={item.logoUrl}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-xl object-cover border border-purple-400/30 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-400/30 flex items-center justify-center font-serif text-sm font-bold text-purple-300 shrink-0">
                                  {item.name.charAt(0)}
                                </div>
                              )}
                              <div className="truncate">
                                <h6 className="text-sm font-semibold text-white truncate">{item.name}</h6>
                                <p className="text-[11px] text-slate-400 truncate">{item.tagline || item.category || 'Partner'}</p>
                                {item.affiliateUrl && (
                                  <a
                                    href={item.affiliateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] text-purple-300 hover:text-white flex items-center gap-1 font-mono mt-0.5 truncate"
                                  >
                                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                    <span className="truncate">{item.affiliateUrl}</span>
                                  </a>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSponsor(item);
                                  setSponsorName(item.name);
                                  setSponsorTagline(item.tagline || '');
                                  setSponsorCategory(item.category || '');
                                  setSponsorLogoUrl(item.logoUrl || '');
                                  setSponsorAffiliateUrl(item.affiliateUrl || '');
                                  setSponsorOrder(item.displayOrder || 1);
                                }}
                                className="p-2 rounded-lg bg-purple-950/40 text-purple-300 hover:text-white"
                                title="Edit Sponsor"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSponsor(item.id)}
                                className="p-2 rounded-lg bg-rose-950/40 text-rose-300 hover:text-white"
                                title="Delete Sponsor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 4. GALLERY CAROUSEL TAB (With Storage Upload) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'gallery' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-white">3D Coverflow Gallery Carousel</h4>
                        <p className="text-xs text-purple-300/70">
                          Upload new images to Supabase Storage (`gallery-images` bucket) or edit titles and folder tags.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingImage(null);
                          setGalleryTitle('');
                          setGalleryCaption('');
                          setGalleryImageUrl('');
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Carousel Photo</span>
                      </button>
                    </div>

                    {/* Upload / Edit Form */}
                    <form onSubmit={handleSaveGallery} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 space-y-4">
                      <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-purple-400" />
                        <span>{editingImage ? 'Edit Carousel Image' : 'Upload New Carousel Photo'}</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={galleryTitle}
                            onChange={(e) => setGalleryTitle(e.target.value)}
                            placeholder="e.g. Urdhva Dhanurasana (Wheel Pose)"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Folder Filter</label>
                          <select
                            value={galleryFolder}
                            onChange={(e) => setGalleryFolder(e.target.value as any)}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          >
                            <option value="Asana & Flow">Asana & Flow</option>
                            <option value="Studio & Space">Studio & Space</option>
                            <option value="Travel & Retreats">Travel & Retreats</option>
                            <option value="Casual & Lifestyle">Casual & Lifestyle</option>
                          </select>
                        </div>
                      </div>

                      {/* Photo File Upload to Supabase Storage */}
                      <div>
                        <label className="block text-xs uppercase text-slate-300 mb-1">Photo File / Storage Upload</label>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="px-3.5 py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleUploadGalleryImage}
                              disabled={isUploadingImage}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={galleryImageUrl}
                            onChange={(e) => setGalleryImageUrl(e.target.value)}
                            placeholder="Or paste Direct Image URL"
                            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                          />
                        </div>

                        {/* Image Preview Box Before Submission */}
                        {galleryImageUrl && (
                          <div className="mt-3 p-3 rounded-xl bg-black/40 border border-purple-500/30 flex items-center gap-3">
                            <img
                              src={galleryImageUrl}
                              alt="Upload Preview"
                              className="w-14 h-16 rounded-lg object-cover border border-purple-400/40 shrink-0"
                            />
                            <div className="text-xs min-w-0">
                              <span className="text-purple-300 font-mono block font-semibold">Image Preview Ready</span>
                              <span className="text-[11px] text-slate-400 truncate max-w-sm block">{galleryImageUrl}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs uppercase text-slate-300">Caption / Story</label>
                          <button
                            type="button"
                            onClick={handleGenerateGalleryCaption}
                            disabled={isGeneratingCaption}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 text-[11px] font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                          >
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            <span>{isGeneratingCaption ? 'Consulting Gemini...' : 'Suggest Text (AI)'}</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={galleryCaption}
                          onChange={(e) => setGalleryCaption(e.target.value)}
                          placeholder="e.g. Deep thoracic spine expansion at sunrise..."
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save to Gallery & Database</span>
                      </button>
                    </form>

                    {/* Gallery Images List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {gallery.map((img) => (
                        <div key={img.id} className="p-3 rounded-2xl bg-[#140E26] border border-purple-500/20 flex gap-3 items-center">
                          <div className="w-16 h-20 rounded-xl overflow-hidden bg-black/40 border border-purple-400/20 shrink-0">
                            {img.imageUrl ? (
                              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-semibold text-white truncate">{img.title}</h5>
                            <span className="text-[10px] text-purple-300 font-mono block">{img.folder}</span>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{img.caption}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => {
                                  setEditingImage(img);
                                  setGalleryTitle(img.title);
                                  setGalleryFolder(img.folder);
                                  setGalleryCaption(img.caption);
                                  setGalleryImageUrl(img.imageUrl || '');
                                }}
                                className="text-[10px] text-purple-300 hover:text-white flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGallery(img.id)}
                                className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 5. CONTENT VAULT (VIDEOS & REELS) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'vault' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-white">Content Vault (YouTube & Reels)</h4>
                        <p className="text-xs text-purple-300/70">
                          Directly update video embed URLs, durations, views, and upload custom thumbnails or add Instagram Reels.
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setVaultSubtab('videos')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            vaultSubtab === 'videos' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:text-white'
                          }`}
                        >
                          <YoutubeIcon className="w-3.5 h-3.5" />
                          <span>YouTube ({videos.length})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setVaultSubtab('reels')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            vaultSubtab === 'reels' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-slate-300 hover:text-white'
                          }`}
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                          <span>Reels ({reels.length})</span>
                        </button>
                      </div>
                    </div>

                    {vaultSubtab === 'videos' ? (
                      <>
                        {/* Video Form */}
                        <form onSubmit={handleSaveVideo} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 space-y-4">
                          <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                            <Film className="w-4 h-4 text-purple-400" />
                            <span>{editingVideo ? `Editing: ${editingVideo.title}` : 'New YouTube Video / Masterclass'}</span>
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Title *</label>
                              <input
                                type="text"
                                required
                                value={newVideoTitle}
                                onChange={(e) => setNewVideoTitle(e.target.value)}
                                placeholder="e.g. 25-Min Radiant Morning Vinyasa"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Category</label>
                              <select
                                value={newVideoCategory}
                                onChange={(e) => setNewVideoCategory(e.target.value as any)}
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              >
                                <option value="Yoga (YouTube)">Yoga (YouTube)</option>
                                <option value="Lifestyle Vlogs">Lifestyle Vlogs</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Duration</label>
                              <input
                                type="text"
                                value={newVideoDuration}
                                onChange={(e) => setNewVideoDuration(e.target.value)}
                                placeholder="25:40"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Views</label>
                              <input
                                type="text"
                                value={newVideoViews}
                                onChange={(e) => setNewVideoViews(e.target.value)}
                                placeholder="168K views"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">YouTube URL</label>
                              <input
                                type="text"
                                value={newVideoUrl}
                                onChange={(e) => setNewVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                              />
                            </div>
                          </div>

                          {/* Custom Thumbnail Upload */}
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Custom Thumbnail Image</label>
                            <div className="flex flex-wrap items-center gap-3">
                              <label className="px-3.5 py-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{isUploadingThumbnail ? 'Uploading...' : 'Upload Thumbnail'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleUploadVideoThumbnail}
                                  disabled={isUploadingThumbnail}
                                  className="hidden"
                                />
                              </label>
                              <input
                                type="text"
                                value={newVideoCustomThumbnail}
                                onChange={(e) => setNewVideoCustomThumbnail(e.target.value)}
                                placeholder="Or leave blank to auto-fetch from YouTube URL"
                                className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                              />
                            </div>

                            {/* Thumbnail Preview Box */}
                            {newVideoCustomThumbnail && (
                              <div className="mt-3 p-3 rounded-xl bg-black/40 border border-purple-500/30 flex items-center gap-3">
                                <img
                                  src={newVideoCustomThumbnail}
                                  alt="Custom Thumbnail Preview"
                                  className="w-20 aspect-video rounded-lg object-cover border border-purple-400/40 shrink-0"
                                />
                                <div className="text-xs min-w-0">
                                  <span className="text-purple-300 font-mono block font-semibold">Custom Thumbnail Attached</span>
                                  <span className="text-[11px] text-slate-400 truncate max-w-sm block">{newVideoCustomThumbnail}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs uppercase text-slate-300">Description</label>
                              <button
                                type="button"
                                onClick={handleGenerateVideoCaption}
                                disabled={isGeneratingCaption}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 text-[11px] font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                              >
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                <span>{isGeneratingCaption ? 'Generating...' : 'Suggest Text (AI)'}</span>
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={newVideoDesc}
                              onChange={(e) => setNewVideoDesc(e.target.value)}
                              placeholder="Brief description of the practice..."
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Video to Supabase</span>
                          </button>
                        </form>

                        {/* Videos List */}
                        <div className="space-y-3">
                          {videos.map((vid) => (
                            <div key={vid.id} className="p-4 rounded-xl bg-[#140E26] border border-purple-500/15 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-lg bg-purple-950/60 border border-purple-400/20 flex items-center justify-center text-purple-300 shrink-0">
                                  <YoutubeIcon className="w-6 h-6" />
                                </div>
                                <div className="truncate">
                                  <h5 className="text-sm font-semibold text-white truncate">{vid.title}</h5>
                                  <span className="text-[11px] text-purple-300 font-mono">{vid.category} • {vid.duration} • {vid.views}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingVideo(vid);
                                    setNewVideoTitle(vid.title);
                                    setNewVideoCategory(vid.category as any);
                                    setNewVideoDuration(vid.duration);
                                    setNewVideoViews(vid.views);
                                    setNewVideoDesc(vid.description);
                                    setNewVideoUrl(vid.videoUrl || '');
                                    setNewVideoCustomThumbnail(vid.customThumbnailUrl || '');
                                  }}
                                  className="p-2 rounded-lg bg-purple-950/40 text-purple-300 hover:text-white"
                                  title="Edit Video"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVideo(vid.id)}
                                  className="p-2 rounded-lg bg-rose-950/40 text-rose-300 hover:text-white"
                                  title="Delete Video"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Instagram Reels Form */}
                        <form onSubmit={handleSaveReel} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 space-y-4">
                          <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                            <InstagramIcon className="w-4 h-4 text-purple-400" />
                            <span>{editingReel ? `Editing Reel: ${editingReel.poseName}` : 'New Instagram Reel'}</span>
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Pose / Drill Title *</label>
                              <input
                                type="text"
                                required
                                value={newReelPose}
                                onChange={(e) => setNewReelPose(e.target.value)}
                                placeholder="e.g. Somatic Hip Opener"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-purple-300 font-semibold mb-1">Instagram Reel URL (e.g. /reel/C8qLd95M6P1/) *</label>
                              <input
                                type="url"
                                required
                                value={newReelUrl}
                                onChange={(e) => setNewReelUrl(e.target.value)}
                                placeholder="https://www.instagram.com/reel/C8qLd95M6P1/"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">
                                Optional Custom Poster / Cover Image URL
                              </label>
                              <input
                                type="text"
                                value={newReelThumbnailUrl}
                                onChange={(e) => setNewReelThumbnailUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                              />
                              {newReelThumbnailUrl && (
                                <div className="mt-2 p-2 rounded-lg bg-black/40 border border-purple-500/30 flex items-center gap-2">
                                  <img
                                    src={newReelThumbnailUrl}
                                    alt="Poster Preview"
                                    className="w-8 h-12 rounded object-cover border border-purple-400/40 shrink-0"
                                  />
                                  <span className="text-[11px] text-purple-300 font-mono truncate">Cover Preview</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Audio Track / Theme</label>
                              <input
                                type="text"
                                value={newReelAudio}
                                onChange={(e) => setNewReelAudio(e.target.value)}
                                placeholder="♫ Original Audio • Supriya"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Likes Count</label>
                              <input
                                type="text"
                                value={newReelLikes}
                                onChange={(e) => setNewReelLikes(e.target.value)}
                                placeholder="48.5K"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase text-slate-300 mb-1">Duration</label>
                              <input
                                type="text"
                                value={newReelDuration}
                                onChange={(e) => setNewReelDuration(e.target.value)}
                                placeholder="0:45"
                                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs uppercase text-slate-300">Caption / Micro-Adjustment Note</label>
                              <button
                                type="button"
                                onClick={handleGenerateReelCaption}
                                disabled={isGeneratingCaption}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 text-[11px] font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                              >
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                <span>{isGeneratingCaption ? 'Consulting Gemini...' : 'Suggest Hook (AI)'}</span>
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={newReelCaption}
                              onChange={(e) => setNewReelCaption(e.target.value)}
                              placeholder="Key somatic cues for this reel..."
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Reel to Supabase</span>
                          </button>
                        </form>

                        {/* Reels List */}
                        <div className="space-y-3">
                          {reels.map((reel) => (
                            <div key={reel.id} className="p-4 rounded-xl bg-[#140E26] border border-purple-500/15 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-lg bg-purple-950/60 border border-purple-400/20 flex items-center justify-center text-purple-300 shrink-0">
                                  <InstagramIcon className="w-6 h-6" />
                                </div>
                                <div className="truncate">
                                  <h5 className="text-sm font-semibold text-white truncate">{reel.poseName}</h5>
                                  <p className="text-xs text-slate-400 truncate">{reel.caption}</p>
                                  <span className="text-[11px] text-purple-300 font-mono">
                                    {reel.likesCount} likes • {reel.duration} • @{reel.creatorHandle}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingReel(reel);
                                    setNewReelPose(reel.poseName);
                                    setNewReelCaption(reel.caption);
                                    setNewReelLikes(reel.likesCount);
                                    setNewReelDuration(reel.duration);
                                    setNewReelAudio(reel.audioTrack);
                                    setNewReelUrl(reel.reelUrl || '');
                                    setNewReelVideoUrl(reel.videoUrl || '');
                                    setNewReelThumbnailUrl(reel.thumbnailUrl || '');
                                  }}
                                  className="p-2 rounded-lg bg-purple-950/40 text-purple-300 hover:text-white"
                                  title="Edit Reel"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteReel(reel.id)}
                                  className="p-2 rounded-lg bg-rose-950/40 text-rose-300 hover:text-white"
                                  title="Delete Reel"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 6. SERVICES ("WORK WITH ME") */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'services' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="border-b border-purple-500/15 pb-4">
                      <h4 className="text-lg font-serif font-semibold text-white">Services ("Work With Me" Offerings)</h4>
                      <p className="text-xs text-purple-300/70">
                        Edit client offerings, pricing estimates, popular badges, and feature checklists.
                      </p>
                    </div>

                    {editingService && (
                      <form onSubmit={handleSaveService} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/30 space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-500/15 pb-2">
                          <h5 className="text-sm font-semibold text-white">Editing: {editingService.title}</h5>
                          <button
                            type="button"
                            onClick={() => setEditingService(null)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Title</label>
                            <input
                              type="text"
                              value={serviceTitle}
                              onChange={(e) => setServiceTitle(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Subtitle</label>
                            <input
                              type="text"
                              value={serviceSubtitle}
                              onChange={(e) => setServiceSubtitle(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Price Estimate</label>
                            <input
                              type="text"
                              value={servicePrice}
                              onChange={(e) => setServicePrice(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Badge Text</label>
                            <input
                              type="text"
                              value={serviceBadge}
                              onChange={(e) => setServiceBadge(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Features (One per line)</label>
                          <textarea
                            rows={4}
                            value={serviceFeatures}
                            onChange={(e) => setServiceFeatures(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Update Offering</span>
                        </button>
                      </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {services.map((svc) => (
                        <div key={svc.id} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 flex flex-col justify-between">
                          <div>
                            {svc.badge && (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30 mb-2 inline-block">
                                {svc.badge}
                              </span>
                            )}
                            <h5 className="text-base font-semibold text-white mt-1">{svc.title}</h5>
                            <span className="text-xs text-purple-400 font-mono block mt-1">{svc.priceEstimate}</span>
                            <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">{svc.description}</p>
                          </div>

                          <button
                            onClick={() => {
                              setEditingService(svc);
                              setServiceTitle(svc.title);
                              setServiceSubtitle(svc.subtitle);
                              setServicePrice(svc.priceEstimate);
                              setServiceBadge(svc.badge || '');
                              setServiceDesc(svc.description);
                              setServiceFeatures(svc.features.join('\n'));
                            }}
                            className="mt-4 px-3 py-2 rounded-xl bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200 hover:bg-purple-900/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Offering Details</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 7. TESTIMONIALS TAB (Transformations & Stories) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-serif font-semibold text-white">Testimonials Moderation</h4>
                          {pendingTestimonialsCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400" />
                              {pendingTestimonialsCount} Pending Approval
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-purple-300/70">
                          Approve or reject reviews submitted via the frontend "Share Your Journey" form. Only approved reviews display publicly.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isAddingTestimonial ? 'Close Form' : 'Add Testimonial'}</span>
                      </button>
                    </div>

                    {/* Manual Add Testimonial Form */}
                    {isAddingTestimonial && (
                      <form onSubmit={handleManualAddTestimonial} className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/30 space-y-4">
                        <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span>Direct Testimonial Intake (Auto-Approved)</span>
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Student Name *</label>
                            <input
                              type="text"
                              required
                              value={newTestimonialName}
                              onChange={(e) => setNewTestimonialName(e.target.value)}
                              placeholder="e.g. Maya Chen"
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Student Email</label>
                            <input
                              type="email"
                              value={newTestimonialEmail}
                              onChange={(e) => setNewTestimonialEmail(e.target.value)}
                              placeholder="maya@example.com"
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Role / Location</label>
                            <input
                              type="text"
                              value={newTestimonialRole}
                              onChange={(e) => setNewTestimonialRole(e.target.value)}
                              placeholder="e.g. 1-on-1 Student • London"
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Rating</label>
                            <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-black/40 border border-purple-500/20">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setNewTestimonialRating(star)}
                                >
                                  <Star className={`w-4 h-4 ${star <= newTestimonialRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                                </button>
                              ))}
                              <span className="text-xs text-slate-400 ml-auto font-mono">{newTestimonialRating} Stars</span>
                            </div>
                          </div>
                        </div>

                        {/* Headshot Upload */}
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Student Photo / Headshot</label>
                          <div className="flex flex-wrap items-center gap-3">
                            <label className="px-3.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploadingTestimonialPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadTestimonialPhoto}
                                disabled={isUploadingTestimonialPhoto}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={newTestimonialImageUrl}
                              onChange={(e) => setNewTestimonialImageUrl(e.target.value)}
                              placeholder="Or paste Direct Photo URL"
                              className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Transformation Reflection *</label>
                          <textarea
                            required
                            rows={3}
                            value={newTestimonialMessage}
                            onChange={(e) => setNewTestimonialMessage(e.target.value)}
                            placeholder="Write the transformation story..."
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Publish Testimonial Directly</span>
                        </button>
                      </form>
                    )}

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 border-b border-purple-500/15 pb-2">
                      {[
                        { id: 'all', label: `All Reviews (${testimonials.length})` },
                        { id: 'pending', label: `Pending Approval (${pendingTestimonialsCount})` },
                        { id: 'approved', label: `Approved & Live (${testimonials.filter((t) => t.isApproved).length})` },
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setTestimonialFilter(f.id as any)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                            testimonialFilter === f.id
                              ? 'bg-purple-600 text-white font-semibold'
                              : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    {/* Inline Moderation & Editing Form */}
                    {editingTestimonial && (
                      <div className="p-5 rounded-2xl bg-[#1A1232] border-2 border-purple-500/50 shadow-2xl space-y-4 mb-4">
                        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                          <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                            <Edit2 className="w-4 h-4 text-purple-400" />
                            <span>Edit & Moderate Testimonial (#{editingTestimonial.id})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingTestimonial(null)}
                            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Student / Client Name *</label>
                            <input
                              type="text"
                              value={editTestimonialName}
                              onChange={(e) => setEditTestimonialName(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Role or Location (e.g., Vadodara)</label>
                            <input
                              type="text"
                              value={editTestimonialRole}
                              onChange={(e) => setEditTestimonialRole(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Rating (1 to 5 Stars)</label>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditTestimonialRating(star)}
                                  className="p-1 cursor-pointer"
                                >
                                  <Star
                                    className={`w-5 h-5 ${
                                      star <= editTestimonialRating
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-slate-600'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs uppercase text-slate-300 mb-1">Photo / Avatar URL</label>
                            <input
                              type="url"
                              value={editTestimonialImageUrl}
                              onChange={(e) => setEditTestimonialImageUrl(e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 text-xs text-white font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Transformation Reflection *</label>
                          <textarea
                            rows={3}
                            value={editTestimonialMessage}
                            onChange={(e) => setEditTestimonialMessage(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 text-xs text-white resize-none"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => handleSaveEditedTestimonial(true)}
                            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Save Changes & Approve</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSaveEditedTestimonial(false)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                          >
                            Save Edits (Keep Unapproved)
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingTestimonial(null)}
                            className="px-3 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Testimonial Cards List */}
                    <div className="space-y-3">
                      {testimonials
                        .filter((t) => {
                          if (testimonialFilter === 'pending') return !t.isApproved;
                          if (testimonialFilter === 'approved') return t.isApproved;
                          return true;
                        })
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              item.isApproved
                                ? 'bg-[#140E26] border-purple-500/20'
                                : 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/40 shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 border-2 border-purple-400/40 flex items-center justify-center text-white font-medium text-sm shrink-0">
                                  {item.name.charAt(0)}
                                </div>
                              )}

                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-bold text-white text-sm">{item.name}</span>
                                  <span className="text-xs text-slate-400 font-mono">({item.email})</span>
                                  <span
                                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                      item.isApproved
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                        : 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                                    }`}
                                  >
                                    {item.isApproved ? (
                                      <>
                                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                        <span>Approved & Public</span>
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="w-3 h-3 text-amber-400" />
                                        <span>Pending Approval</span>
                                      </>
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-purple-300">
                                  <span>{item.roleOrLocation || 'Practitioner'}</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-0.5">
                                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    ))}
                                  </div>
                                </div>

                                <p className="text-xs text-slate-200 italic pt-1 leading-relaxed max-w-2xl">
                                  "{item.message}"
                                </p>

                                <span className="text-[10px] text-slate-500 font-mono block pt-1">
                                  Submitted: {new Date(item.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Actions: Edit, Approve Toggle & Delete */}
                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              <button
                                onClick={() => {
                                  setEditingTestimonial(item);
                                  setEditTestimonialName(item.name);
                                  setEditTestimonialRole(item.roleOrLocation || '');
                                  setEditTestimonialMessage(item.message);
                                  setEditTestimonialRating(item.rating || 5);
                                  setEditTestimonialImageUrl(item.imageUrl || '');
                                }}
                                className="p-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 text-purple-300 hover:text-white transition-colors cursor-pointer"
                                title="Edit & Moderate Text/Image"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleToggleTestimonial(item.id, item.isApproved)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                                  item.isApproved
                                    ? 'bg-white/10 hover:bg-white/20 text-slate-300'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{item.isApproved ? 'Unapprove' : 'Approve & Publish'}</span>
                              </button>

                              <button
                                onClick={() => handleDeleteTestimonial(item.id)}
                                className="p-1.5 rounded-xl bg-rose-950/50 hover:bg-rose-900 border border-rose-500/30 text-rose-300 hover:text-white transition-colors cursor-pointer"
                                title="Delete Review"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 8. DAILY INTENTION TAB (Live Editor & Sync) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'intentions' && (
                  <form onSubmit={handleSaveDailyIntention} className="space-y-6 max-w-4xl">
                    <div className="border-b border-purple-500/15 pb-4">
                      <h4 className="text-lg font-serif font-semibold text-white">Daily Intention & Wellness Card Editor</h4>
                      <p className="text-xs text-purple-300/70">
                        Update the sacred mindful quote revealed when visitors hold the 3.0-second liquid charge button above the footer.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/25 space-y-4">
                      <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Heart className="w-4 h-4 text-purple-400" />
                        <span>Active Guided Intention</span>
                      </h5>

                      <div>
                        <label className="block text-xs uppercase text-slate-300 mb-1 font-semibold">
                          Daily Sacred Quote Text *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={intentionQuote}
                          onChange={(e) => setIntentionQuote(e.target.value)}
                          placeholder="e.g. The breath is the bridge which connects life to consciousness..."
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-sm text-white resize-none font-serif leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Theme</label>
                          <input
                            type="text"
                            value={intentionTheme}
                            onChange={(e) => setIntentionTheme(e.target.value)}
                            placeholder="e.g. Somatic Presence"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Sanskrit Word</label>
                          <input
                            type="text"
                            value={intentionSanskritWord}
                            onChange={(e) => setIntentionSanskritWord(e.target.value)}
                            placeholder="e.g. Sthira & Sukha"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase text-slate-300 mb-1">Sanskrit Meaning</label>
                          <input
                            type="text"
                            value={intentionSanskritMeaning}
                            onChange={(e) => setIntentionSanskritMeaning(e.target.value)}
                            placeholder="e.g. Steadiness and Ease"
                            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Live Visual Preview Card */}
                      <div className="p-4 rounded-xl bg-[#0C081A] border border-purple-500/20 mt-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block mb-2 font-mono">
                          Live Frontend Preview:
                        </span>
                        <div className="text-center py-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-medium mb-3">
                            {intentionSanskritWord || 'Prana'} ({intentionSanskritMeaning || 'Life-Force'}) • {intentionTheme || 'Mindful Calibration'}
                          </span>
                          <blockquote className="font-serif text-base sm:text-lg text-white italic max-w-xl mx-auto">
                            &ldquo;{intentionQuote || 'Your daily intention will appear here.'}&rdquo;
                          </blockquote>
                          <p className="text-[11px] text-purple-300/80 font-mono mt-2">
                            Supriya Bhavsar • Conscious Movement Sanctuary
                          </p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingIntention}
                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSavingIntention ? 'Syncing to Supabase...' : 'Save Daily Intention to Supabase'}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300">
                      ⚡ Press-and-hold duration is configured to exactly <strong>3.0 seconds (3000ms)</strong> on the frontend to allow a complete somatic inhalation cycle before this quote is revealed.
                    </div>
                  </form>
                )}

                {/* -------------------------------------------------------- */}
                {/* 9. WAITLIST LEADS TAB */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'waitlist' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-white">Waitlist Leads & Applications</h4>
                        <p className="text-xs text-purple-300/70">
                          Leads captured from "Work With Me" cards and navbar CTAs.
                        </p>
                      </div>
                      <span className="text-xs text-purple-300 font-mono bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/20">
                        Total: {waitlist.length} Leads
                      </span>
                    </div>

                    <div className="space-y-3">
                      {waitlist.map((sub) => (
                        <div key={sub.id} className="p-4 rounded-xl bg-[#140E26] border border-purple-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-white text-sm">{sub.fullName}</span>
                              <span className="text-xs text-slate-400 font-mono">({sub.email})</span>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                sub.status === 'accepted' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                                sub.status === 'contacted' ? 'bg-blue-950 text-blue-300 border border-blue-500/30' : 'bg-purple-950 text-purple-300 border border-purple-500/30'
                              }`}>
                                {sub.status}
                              </span>
                            </div>
                            <p className="text-xs text-purple-300 font-medium">Program: {sub.serviceId}</p>
                            {sub.goals && <p className="text-xs text-slate-300 mt-1 italic">"{sub.goals}"</p>}
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block">{new Date(sub.createdAt).toLocaleString()}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={sub.status}
                              onChange={async (e) => {
                                await updateWaitlistStatus(sub.id, e.target.value as any);
                                onRefreshData();
                                showNotification(`Status updated to ${e.target.value}`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-[#18112C] border border-purple-500/20 text-xs text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="accepted">Accepted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 10. SUBSCRIBERS TAB */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'subscribers' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-white">Sunday Journal Newsletter Subscribers</h4>
                        <p className="text-xs text-purple-300/70">
                          Captured via the About & Newsletter section at the bottom of the page.
                        </p>
                      </div>
                      <span className="text-xs text-purple-300 font-mono bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/20">
                        Total: {subscribers.length} Subscribers
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#140E26] border border-purple-500/15">
                      <div className="space-y-2">
                        {subscribers.map((s) => (
                          <div key={s.id} className="flex items-center justify-between py-2 border-b border-purple-500/10 last:border-none text-xs">
                            <span className="font-mono text-slate-200">{s.email}</span>
                            <span className="text-purple-300 font-mono text-[11px]">{new Date(s.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* 11. AI STRATEGIST TAB (Gemini 3.8 Flash Content Engine) */}
                {/* -------------------------------------------------------- */}
                {activeTab === 'ai-strategist' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-[11px] text-purple-300 font-mono uppercase tracking-wider mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          <span>Gemini 3.8 Flash Intelligence</span>
                        </div>
                        <h4 className="text-lg font-serif font-semibold text-white">
                          AI Weekly Content Strategist & Production Engine
                        </h4>
                        <p className="text-xs text-purple-300/70">
                          Generate data-driven 7-day content programming, viral mindful hooks, classical ragas/audio, and biomechanical cues for Supriya Bhavsar.
                        </p>
                      </div>

                      {weeklyPlan && (
                        <button
                          type="button"
                          onClick={() => {
                            const markdown = `# Supriya Bhavsar - 7-Day Content Schedule\nTheme: ${weeklyPlan.weeklyTheme}\nCore Intention: ${weeklyPlan.coreIntention}\n\n` +
                              weeklyPlan.days.map((d) => (
                                `### ${d.day}: ${d.topic} (${d.format})\n- Theme: ${d.theme}\n- Hook: "${d.captionHook}"\n- Biomechanics: ${d.biomechanicalCue}\n- Audio/Raga: ${d.recommendedAudio}\n- Production: ${d.productionNotes}\n`
                              )).join('\n');
                            navigator.clipboard.writeText(markdown);
                            showNotification('Full 7-day schedule copied to clipboard as Markdown!');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 cursor-pointer transition-colors shrink-0"
                        >
                          <Copy className="w-3.5 h-3.5 text-purple-400" />
                          <span>Copy Schedule</span>
                        </button>
                      )}
                    </div>

                    {/* Generator Controls */}
                    <div className="p-5 rounded-2xl bg-[#140E26] border border-purple-500/20 space-y-4 shadow-xl">
                      <div>
                        <label className="block text-xs uppercase text-slate-300 mb-1 font-semibold">
                          Weekly Focus Theme / Pedagogical Pillar
                        </label>
                        <input
                          type="text"
                          value={planTheme}
                          onChange={(e) => setPlanTheme(e.target.value)}
                          placeholder="e.g. Somatic Vagus Nerve Regulation & Biomechanics"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-sm text-white"
                        />
                      </div>

                      {/* Quick Preset Pills */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-mono text-slate-400">Quick Themes:</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Somatic Vagus Nerve Regulation & Biomechanics',
                            'Pelvic Floor & Hip Mobility Deep Dive',
                            'Pranayama for High-Stress Executives',
                            'Spinal Health & Postural Alignment',
                            'Asana Foundations for Modern Lifestyles',
                          ].map((theme) => (
                            <button
                              key={theme}
                              type="button"
                              onClick={() => setPlanTheme(theme)}
                              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                                planTheme === theme
                                  ? 'bg-purple-600 text-white border border-purple-400'
                                  : 'bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/20'
                              }`}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleGenerateWeeklyPlan}
                          disabled={isGeneratingPlan}
                          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-silver-glass cursor-pointer flex items-center gap-2.5"
                        >
                          <Sparkles className="w-4 h-4 text-purple-700 animate-spin" />
                          <span>{isGeneratingPlan ? 'Gemini 3.8 Flash is Thinking...' : 'Plan My Week with Gemini 3.8 Flash'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Weekly Plan Result Display */}
                    {weeklyPlan && (
                      <div className="space-y-4">
                        {/* Summary Header Card */}
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-950/40 border border-purple-500/30">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-[10px] uppercase font-mono text-purple-300 block">Focus Pillar</span>
                              <span className="text-white font-semibold">{weeklyPlan.weeklyTheme}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-mono text-purple-300 block">Energy Arc</span>
                              <span className="text-purple-200">{weeklyPlan.targetAudienceEnergy}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-mono text-purple-300 block">Core Intention</span>
                              <span className="text-slate-200 italic">"{weeklyPlan.coreIntention}"</span>
                            </div>
                          </div>
                        </div>

                        {/* 7 Days Cards */}
                        <div className="space-y-3">
                          {weeklyPlan.days.map((day: DayPlan, index: number) => (
                            <div
                              key={index}
                              className="p-4 rounded-2xl bg-[#140E26] border border-purple-500/20 hover:border-purple-400/40 transition-all space-y-3"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs font-bold flex items-center justify-center font-mono">
                                    0{index + 1}
                                  </span>
                                  <div>
                                    <span className="font-bold text-white text-sm block">{day.day} • {day.topic}</span>
                                    <span className="text-[11px] text-purple-300">{day.theme}</span>
                                  </div>
                                </div>

                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-purple-900/50 text-purple-200 border border-purple-400/30">
                                  {day.format}
                                </span>
                              </div>

                              {/* Hook */}
                              <div className="p-2.5 rounded-xl bg-black/40 border border-purple-500/15 flex items-center justify-between gap-2">
                                <div className="text-xs">
                                  <span className="text-[10px] uppercase font-mono text-purple-400 block font-semibold">Opening Hook / Caption:</span>
                                  <span className="text-slate-200 italic font-medium">"{day.captionHook}"</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(day.captionHook);
                                    showNotification(`Hook for ${day.day} copied!`);
                                  }}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                                  title="Copy Hook"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                                <div className="p-2 rounded-lg bg-white/[0.02] border border-purple-500/10">
                                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Biomechanical Cue</span>
                                  <span className="text-slate-300 text-[11px]">{day.biomechanicalCue}</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/[0.02] border border-purple-500/10">
                                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Recommended Audio / Raga</span>
                                  <span className="text-purple-300 text-[11px] font-mono">{day.recommendedAudio}</span>
                                </div>
                                <div className="p-2 rounded-lg bg-white/[0.02] border border-purple-500/10">
                                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Production Notes</span>
                                  <span className="text-slate-400 text-[11px]">{day.productionNotes}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </main>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
