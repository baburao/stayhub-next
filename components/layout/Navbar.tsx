'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown,
  Globe, Calendar, FileText, Shield, Lock, MessageSquare,
  CreditCard, Brush, Wrench, BarChart2, DollarSign, Link2, Smartphone, Share2,
  BookOpen, LifeBuoy, Code2, Award, Zap, Building2, Users, ArrowRight, Play,
  CheckCircle2, Star, Layers, Cpu, Sparkles,
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/lib/LanguageContext';

/* ── feature categories ─────────────────────────────────── */
const FEATURE_CATEGORIES_EN = [
  {
    label: 'Distribution',
    desc: 'Sync listings across all channels',
    color: '#25A4E8',
    icon: Globe,
    items: [
      { slug: 'channel-manager',        label: 'Channel Manager',        desc: 'Sync all OTAs from one place',      icon: Globe,    isNew: false },
      { slug: 'availability-calendar',  label: 'Availability Calendar',  desc: 'Visual multi-property calendar',    icon: Calendar, isNew: false },
      { slug: 'reservation-management', label: 'Reservation Management', desc: 'Centralize all bookings',           icon: FileText, isNew: false },
    ],
  },
  {
    label: 'Guest Experience',
    desc: 'Delight guests at every touchpoint',
    color: '#7C69E8',
    icon: Users,
    items: [
      { slug: 'guest-verification',  label: 'Guest Verification',  desc: 'ID, deposit & signed contracts',   icon: Shield,       isNew: false },
      { slug: 'automated-messaging', label: 'Automated Messaging', desc: 'Guest comms on autopilot',         icon: MessageSquare, isNew: false },
      { slug: 'guest-app',           label: 'Guest App',           desc: 'Mobile guest experience',          icon: Smartphone,   isNew: true  },
    ],
  },
  {
    label: 'Operations',
    desc: 'Run your team without WhatsApp',
    color: '#F59E0B',
    icon: Cpu,
    items: [
      { slug: 'smart-lock-automation',   label: 'Smart Lock Automation', desc: 'Keyless entry management',         icon: Lock,  isNew: false },
      { slug: 'housekeeping-management', label: 'Housekeeping',          desc: 'Auto-assign cleaning tasks',       icon: Brush, isNew: false },
      { slug: 'maintenance-management',  label: 'Maintenance',           desc: 'Track & resolve issues fast',      icon: Wrench, isNew: false },
    ],
  },
  {
    label: 'Revenue & Finance',
    desc: 'Maximize earnings, stay compliant',
    color: '#10B981',
    icon: BarChart2,
    items: [
      { slug: 'revenue-analytics',  label: 'Revenue Analytics',  desc: 'RevPAR, ADR, occupancy',          icon: BarChart2, isNew: false },
      { slug: 'payment-collection', label: 'Payment Collection', desc: 'ZATCA-compliant invoicing',       icon: CreditCard, isNew: false },
      { slug: 'owner-portal',       label: 'Owner Portal',       desc: 'Financial transparency',          icon: DollarSign, isNew: false },
    ],
  },
  {
    label: 'Branding',
    desc: 'Own your bookings, own your brand',
    color: '#EC4899',
    icon: Sparkles,
    items: [
      { slug: 'direct-booking-website', label: 'Direct Booking Website', desc: 'Commission-free bookings', icon: Link2,  isNew: false },
      { slug: 'referral-links',         label: 'Referral Links',         desc: 'Grow via referrals',       icon: Share2, isNew: true  },
    ],
  },
];

const FEATURE_CATEGORIES_AR = [
  {
    label: 'التوزيع',
    desc: 'زامن القوائم عبر جميع القنوات',
    color: '#25A4E8',
    icon: Globe,
    items: [
      { slug: 'channel-manager',        label: 'مدير القنوات',        desc: 'مزامنة جميع OTAs من مكان واحد',   icon: Globe,    isNew: false },
      { slug: 'availability-calendar',  label: 'تقويم التوفر',        desc: 'تقويم مرئي متعدد العقارات',       icon: Calendar, isNew: false },
      { slug: 'reservation-management', label: 'إدارة الحجوزات',      desc: 'مركزة جميع الحجوزات',            icon: FileText, isNew: false },
    ],
  },
  {
    label: 'تجربة الضيف',
    desc: 'أسعد ضيوفك في كل نقطة اتصال',
    color: '#7C69E8',
    icon: Users,
    items: [
      { slug: 'guest-verification',  label: 'التحقق من الضيوف', desc: 'هوية، وديعة وعقود',             icon: Shield,       isNew: false },
      { slug: 'automated-messaging', label: 'الرسائل الآلية',   desc: 'تواصل الضيوف بشكل تلقائي',     icon: MessageSquare, isNew: false },
      { slug: 'guest-app',           label: 'تطبيق الضيوف',    desc: 'تجربة ضيف على الجوال',          icon: Smartphone,   isNew: true  },
    ],
  },
  {
    label: 'العمليات',
    desc: 'أدر فريقك بدون واتساب',
    color: '#F59E0B',
    icon: Cpu,
    items: [
      { slug: 'smart-lock-automation',   label: 'أتمتة الأقفال الذكية', desc: 'إدارة الدخول بدون مفتاح',      icon: Lock,  isNew: false },
      { slug: 'housekeeping-management', label: 'التدبير المنزلي',       desc: 'تعيين مهام التنظيف تلقائياً', icon: Brush, isNew: false },
      { slug: 'maintenance-management',  label: 'الصيانة',              desc: 'تتبع وحل المشكلات بسرعة',     icon: Wrench, isNew: false },
    ],
  },
  {
    label: 'الإيرادات والمالية',
    desc: 'زد الأرباح وابقَ ملتزماً',
    color: '#10B981',
    icon: BarChart2,
    items: [
      { slug: 'revenue-analytics',  label: 'تحليلات الإيرادات', desc: 'رؤى RevPAR وADR والإشغال',  icon: BarChart2, isNew: false },
      { slug: 'payment-collection', label: 'تحصيل المدفوعات',  desc: 'فوترة متوافقة مع زاتكا',    icon: CreditCard, isNew: false },
      { slug: 'owner-portal',       label: 'بوابة المالك',      desc: 'الشفافية المالية للملاك',   icon: DollarSign, isNew: false },
    ],
  },
  {
    label: 'العلامة التجارية',
    desc: 'امتلك حجوزاتك وعلامتك التجارية',
    color: '#EC4899',
    icon: Sparkles,
    items: [
      { slug: 'direct-booking-website', label: 'موقع الحجز المباشر', desc: 'حجوزات بدون عمولة', icon: Link2,  isNew: false },
      { slug: 'referral-links',         label: 'روابط الإحالة',      desc: 'النمو عبر الإحالات', icon: Share2, isNew: true  },
    ],
  },
];

const INTEGRATIONS = [
  { slug: 'airbnb',                  en: 'Airbnb',                  ar: 'Airbnb',                  color: '#FF5A5F', badge_en: 'OTA',    badge_ar: 'OTA' },
  { slug: 'booking-com',             en: 'Booking.com',             ar: 'Booking.com',             color: '#003580', badge_en: 'OTA',    badge_ar: 'OTA' },
  { slug: 'agoda',                   en: 'Agoda',                   ar: 'أجودا',                   color: '#E31837', badge_en: 'OTA',    badge_ar: 'OTA' },
  { slug: 'expedia',                 en: 'Expedia',                 ar: 'إكسبيديا',                color: '#0066B2', badge_en: 'OTA',    badge_ar: 'OTA' },
  { slug: 'google-vacation-rentals', en: 'Google Vacation Rentals', ar: 'Google Vacation Rentals', color: '#4285F4', badge_en: 'Search', badge_ar: 'بحث' },
  { slug: 'gathern',                 en: 'Gathern',                 ar: 'غثرن',                    color: '#00A651', badge_en: 'Local',  badge_ar: 'محلي' },
];

const SOLUTIONS = [
  { slug: 'property-managers',          en: 'Property Managers',            ar: 'مديرو العقارات',          desc_en: 'Manage 10–1,000+ units',        desc_ar: 'إدارة 10-1000+ وحدة',           color: '#25A4E8', icon: Building2 },
  { slug: 'vacation-rental-hosts',      en: 'Vacation Rental Hosts',        ar: 'مضيفو الإيجار السياحي',   desc_en: 'For independent hosts',         desc_ar: 'للمضيفين المستقلين',            color: '#7C69E8', icon: Globe },
  { slug: 'hotels-serviced-apartments', en: 'Hotels & Serviced Apartments', ar: 'الفنادق والشقق المفروشة', desc_en: 'Enterprise hotel tooling',      desc_ar: 'أدوات الفنادق المتقدمة',        color: '#F59E0B', icon: Layers },
  { slug: 'multi-owner-operators',      en: 'Multi-Owner Operators',        ar: 'مشغلو متعددو الملاك',     desc_en: 'Owner portals & split billing', desc_ar: 'بوابات الملاك وتقسيم الفواتير', color: '#10B981', icon: Users },
];

const RESOURCES_EN = [
  { icon: BookOpen, label: 'Blog',            desc: 'Tips, updates & guides',      href: '/blog' },
  { icon: LifeBuoy, label: 'Help Center',     desc: 'Answers to common questions', href: '/help' },
  { icon: Code2,    label: 'Documentation',   desc: 'Technical integration docs',  href: '/docs' },
  { icon: Award,    label: 'Case Studies',    desc: 'How operators use StayHub',   href: '/case-studies' },
  { icon: Zap,      label: 'Product Updates', desc: "What's new in StayHub",       href: '/updates' },
];
const RESOURCES_AR = [
  { icon: BookOpen, label: 'المدونة',        desc: 'نصائح وتحديثات وأدلة',        href: '/blog' },
  { icon: LifeBuoy, label: 'مركز المساعدة',  desc: 'إجابات للأسئلة الشائعة',      href: '/help' },
  { icon: Code2,    label: 'التوثيق',        desc: 'وثائق التكامل التقني',        href: '/docs' },
  { icon: Award,    label: 'دراسات الحالة',  desc: 'كيف يستخدم المشغّلون StayHub', href: '/case-studies' },
  { icon: Zap,      label: 'تحديثات المنتج', desc: 'الجديد في StayHub',            href: '/updates' },
];

type MenuKey = 'features' | 'integrations' | 'solutions' | 'resources' | null;

/* ── Shared promo panel ─────────────────────────────────── */
function PromoPanel({ isAr }: { isAr: boolean }) {
  return (
    <div className="w-[248px] shrink-0">
      <div
        className="rounded-2xl overflow-hidden h-full min-h-[260px] p-5 flex flex-col"
        style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1e2d6b 50%, #25A4E8 100%)' }}
      >
        {/* Mini dashboard mockup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 relative">
          <div className="flex gap-1.5 mb-2.5">
            <div className="h-1.5 w-16 bg-white/70 rounded-full" />
            <div className="h-1.5 w-8 bg-white/30 rounded-full" />
          </div>
          <div className="space-y-2">
            {[['w-full', 'w-14'], ['w-3/4', 'w-10'], ['w-5/6', 'w-12']].map(([bar, val], i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-2 ${bar} bg-white/20 rounded-full flex-1`} />
                <div className={`h-2 ${val} bg-[#25A4E8]/80 rounded-full shrink-0`} />
              </div>
            ))}
          </div>
          {/* Floating play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
              <Play size={13} className="text-white ms-0.5" fill="white" />
            </div>
          </div>
        </div>

        <p className="text-white font-bold text-[13px] leading-tight mb-3">
          {isAr ? 'شاهد StayHub وهو يعمل' : 'See StayHub in action'}
        </p>
        <div className="space-y-2 flex-1">
          {(isAr
            ? ['أتمتة 7 خطوات لرحلة الضيف', 'فوترة متوافقة مع زاتكا', 'التحقق من الهوية عبر أبشر']
            : ['7-step guest journey automation', 'ZATCA-compliant invoicing', 'Absher ID verification']
          ).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="text-[#25A4E8] shrink-0 mt-0.5" />
              <p className="text-white/80 text-[11px] leading-tight">{item}</p>
            </div>
          ))}
        </div>
        <Link
          href="/demo"
          className="mt-4 flex items-center justify-center gap-1.5 bg-white text-[#0F172A] text-[12px] font-bold py-2 rounded-xl hover:bg-blue-50 transition-colors"
        >
          {isAr ? 'شاهد العرض التجريبي' : 'Watch demo'}
          <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang, t, isAr } = useLanguage();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeMenu,    setActiveMenu]    = useState<MenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null);
  const [activeCatIdx,  setActiveCatIdx]  = useState(0);
  const [activeSolIdx,  setActiveSolIdx]  = useState(0);
  const pathname   = usePathname();
  const menuRef    = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [pathname]);

  const openMenu  = (key: MenuKey) => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setActiveMenu(key); };
  const closeMenu = () => { leaveTimer.current = setTimeout(() => setActiveMenu(null), 120); };

  const featureCats = isAr ? FEATURE_CATEGORIES_AR : FEATURE_CATEGORIES_EN;
  const resources   = isAr ? RESOURCES_AR : RESOURCES_EN;

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-sm border-b border-slate-100/80'
            : 'bg-white/88 backdrop-blur-md'
        )}
        ref={menuRef}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/stayhub-logo.svg" alt="StayHub" width={140} height={36} className="h-9 w-auto" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {(['features', 'solutions', 'integrations', 'resources'] as MenuKey[]).map((key) => (
                <button
                  key={key}
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={closeMenu}
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors capitalize',
                    activeMenu === key
                      ? 'text-[#25A4E8] bg-blue-50'
                      : 'text-slate-600 hover:text-[#25A4E8] hover:bg-blue-50/70'
                  )}
                >
                  {key === 'features'     ? (isAr ? 'المميزات'   : 'Features')     :
                   key === 'solutions'    ? (isAr ? 'الحلول'      : 'Solutions')    :
                   key === 'integrations' ? (isAr ? 'التكاملات'   : 'Integrations') :
                                           (isAr ? 'الموارد'      : 'Resources')}
                  <ChevronDown size={13} className={clsx('transition-transform duration-200', activeMenu === key && 'rotate-180')} />
                </button>
              ))}
              <Link href="/pricing"
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-[#25A4E8] hover:bg-blue-50/70 transition-colors">
                {isAr ? 'الأسعار' : 'Pricing'}
              </Link>
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                <button onClick={() => setLang('en')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'en' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500 hover:text-slate-700')}>EN</button>
                <button onClick={() => setLang('ar')} className={clsx('px-3 py-1.5 rounded-md text-xs font-bold transition-all', lang === 'ar' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500 hover:text-slate-700')}>AR</button>
              </div>
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#25A4E8] transition-colors px-2">
                {isAr ? 'تسجيل الدخول' : 'Sign in'}
              </Link>
              <Link href="/demo" className="px-5 py-2.5 bg-[#25A4E8] text-white text-sm font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.03]">
                {isAr ? 'احجز عرضاً' : 'Book a Demo'}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mega Menu panel ─────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="hidden lg:block absolute top-full inset-x-0 bg-white border-b border-slate-100 shadow-2xl shadow-slate-900/10"
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

                {/* ── FEATURES ── */}
                {activeMenu === 'features' && (
                  <div className="flex gap-5">

                    {/* LEFT: Category selector */}
                    <div className="w-[200px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'الفئات' : 'Categories'}
                      </p>
                      <div className="space-y-0.5">
                        {featureCats.map((cat, i) => (
                          <button
                            key={cat.label}
                            onMouseEnter={() => setActiveCatIdx(i)}
                            onClick={() => setActiveCatIdx(i)}
                            className={clsx(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-all',
                              activeCatIdx === i
                                ? 'bg-white shadow-sm border border-slate-100/80 ring-1 ring-slate-100'
                                : 'hover:bg-slate-50/80 border border-transparent'
                            )}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                              style={{ backgroundColor: activeCatIdx === i ? `${cat.color}18` : `${cat.color}10` }}
                            >
                              <cat.icon size={15} style={{ color: cat.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={clsx('text-[12.5px] font-bold leading-tight truncate',
                                activeCatIdx === i ? 'text-[#0F172A]' : 'text-slate-500')}>
                                {cat.label}
                              </p>
                              <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight truncate">{cat.desc}</p>
                            </div>
                            {activeCatIdx === i && (
                              <ArrowRight size={12} className="text-[#25A4E8] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Features for active category */}
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCatIdx}
                          initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isAr ? 10 : -10 }}
                          transition={{ duration: 0.15, ease }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p
                              className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
                              style={{ color: featureCats[activeCatIdx].color }}
                            >
                              {featureCats[activeCatIdx].label}
                            </p>
                            <Link
                              href="/features"
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#25A4E8] transition-colors"
                            >
                              {isAr ? 'جميع المميزات' : 'All features'}
                              <ArrowRight size={10} />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {featureCats[activeCatIdx].items.map((item) => (
                              <Link
                                key={item.slug}
                                href={`/features/${item.slug}`}
                                className="group flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                              >
                                <div
                                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                                  style={{ backgroundColor: `${featureCats[activeCatIdx].color}14` }}
                                >
                                  <item.icon size={16} style={{ color: featureCats[activeCatIdx].color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                      {item.label}
                                    </p>
                                    {item.isNew && (
                                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 uppercase tracking-wide shrink-0">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom CTA bar */}
                          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                            <p className="text-[11.5px] text-slate-400">
                              {isAr ? 'هل تحتاج حلاً مختلفاً؟' : 'Need a different solution?'}
                            </p>
                            <Link
                              href="/demo"
                              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#25A4E8] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                            >
                              {isAr ? 'تحدث مع المبيعات' : 'Talk to sales'}
                              <ArrowRight size={10} />
                            </Link>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

                {/* ── SOLUTIONS ── */}
                {activeMenu === 'solutions' && (
                  <div className="flex gap-5">

                    {/* LEFT: Role selector */}
                    <div className="w-[210px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'من هو لمن؟' : 'Who it\'s for'}
                      </p>
                      <div className="space-y-0.5">
                        {SOLUTIONS.map((sol, i) => (
                          <button
                            key={sol.slug}
                            onMouseEnter={() => setActiveSolIdx(i)}
                            onClick={() => setActiveSolIdx(i)}
                            className={clsx(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-all',
                              activeSolIdx === i
                                ? 'bg-white shadow-sm border border-slate-100/80 ring-1 ring-slate-100'
                                : 'hover:bg-slate-50/80 border border-transparent'
                            )}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${sol.color}14` }}
                            >
                              <sol.icon size={15} style={{ color: sol.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={clsx('text-[12.5px] font-bold leading-tight truncate',
                                activeSolIdx === i ? 'text-[#0F172A]' : 'text-slate-500')}>
                                {isAr ? sol.ar : sol.en}
                              </p>
                              <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight truncate">
                                {isAr ? sol.desc_ar : sol.desc_en}
                              </p>
                            </div>
                            {activeSolIdx === i && (
                              <ArrowRight size={12} className="text-[#25A4E8] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Solution detail */}
                    <div className="flex-1 min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSolIdx}
                          initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isAr ? 10 : -10 }}
                          transition={{ duration: 0.15, ease }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em]"
                              style={{ color: SOLUTIONS[activeSolIdx].color }}>
                              {isAr ? SOLUTIONS[activeSolIdx].ar : SOLUTIONS[activeSolIdx].en}
                            </p>
                            <Link href="/solutions"
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#25A4E8] transition-colors">
                              {isAr ? 'جميع الحلول' : 'All solutions'} <ArrowRight size={10} />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {[
                              { icon: Globe,    label_en: 'Channel Sync',        label_ar: 'مزامنة القنوات' },
                              { icon: MessageSquare, label_en: 'Automated Messaging', label_ar: 'الرسائل الآلية' },
                              { icon: Shield,   label_en: 'Guest Verification',  label_ar: 'التحقق من الضيوف' },
                              { icon: BarChart2, label_en: 'Revenue Analytics',  label_ar: 'تحليلات الإيرادات' },
                              { icon: CreditCard, label_en: 'ZATCA Invoicing',   label_ar: 'فوترة زاتكا' },
                              { icon: Users,    label_en: 'Team Management',     label_ar: 'إدارة الفريق' },
                            ].map((cap) => (
                              <Link
                                key={cap.label_en}
                                href={`/solutions/${SOLUTIONS[activeSolIdx].slug}`}
                                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: `${SOLUTIONS[activeSolIdx].color}14` }}
                                >
                                  <cap.icon size={14} style={{ color: SOLUTIONS[activeSolIdx].color }} />
                                </div>
                                <p className="text-[12.5px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                  {isAr ? cap.label_ar : cap.label_en}
                                </p>
                              </Link>
                            ))}
                          </div>

                          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                            <p className="text-[11.5px] text-slate-400">
                              {isAr ? 'هل تحتاج حلاً مختلفاً؟' : 'Need a different solution?'}
                            </p>
                            <Link href="/demo"
                              className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#25A4E8] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                              {isAr ? 'تحدث مع المبيعات' : 'Talk to sales'} <ArrowRight size={10} />
                            </Link>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

                {/* ── INTEGRATIONS ── */}
                {activeMenu === 'integrations' && (
                  <div className="flex gap-5">
                    {/* LEFT: Category labels */}
                    <div className="w-[180px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'نوع التكامل' : 'Integration type'}
                      </p>
                      <div className="space-y-0.5">
                        {[
                          { label_en: 'OTA Channels',   label_ar: 'قنوات OTA',        color: '#FF5A5F', icon: Globe },
                          { label_en: 'Payments',       label_ar: 'المدفوعات',         color: '#10B981', icon: CreditCard },
                          { label_en: 'Local Platforms',label_ar: 'المنصات المحلية',   color: '#00A651', icon: Building2 },
                          { label_en: 'Accounting',     label_ar: 'المحاسبة',          color: '#7C69E8', icon: FileText },
                        ].map((cat, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}14` }}>
                              <cat.icon size={13} style={{ color: cat.color }} />
                            </div>
                            <p className="text-[12px] font-semibold text-slate-600">{isAr ? cat.label_ar : cat.label_en}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Integration cards */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                          {isAr ? 'جميع تكاملات المنصة' : 'All platform integrations'}
                        </p>
                        <Link href="/integrations"
                          className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#25A4E8] transition-colors">
                          {isAr ? 'جميع التكاملات' : 'View all'} <ArrowRight size={10} />
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        {INTEGRATIONS.map((intg) => (
                          <Link key={intg.slug} href={`/integrations/${intg.slug}`}
                            className="group flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shrink-0 shadow-sm"
                              style={{ backgroundColor: intg.color }}>
                              {(isAr ? intg.ar : intg.en).charAt(0)}
                            </div>
                            <div>
                              <p className="text-[12.5px] font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">
                                {isAr ? intg.ar : intg.en}
                              </p>
                              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${intg.color}14`, color: intg.color }}>
                                {isAr ? intg.badge_ar : intg.badge_en}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                        <p className="text-[11.5px] text-slate-400">
                          {isAr ? 'هل تريد تكاملاً مختلفاً؟' : 'Missing an integration?'}
                        </p>
                        <Link href="/demo"
                          className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#25A4E8] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                          {isAr ? 'اطلب تكاملاً' : 'Request one'} <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

                {/* ── RESOURCES ── */}
                {activeMenu === 'resources' && (
                  <div className="flex gap-5">
                    {/* LEFT: Resource category labels */}
                    <div className="w-[180px] shrink-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 px-3 mb-3">
                        {isAr ? 'نوع المورد' : 'Resource type'}
                      </p>
                      <div className="space-y-0.5">
                        {[
                          { label_en: 'Learn',   label_ar: 'تعلّم',   icon: BookOpen, color: '#25A4E8' },
                          { label_en: 'Support', label_ar: 'الدعم',   icon: LifeBuoy, color: '#7C69E8' },
                          { label_en: "What's new", label_ar: 'الجديد', icon: Zap,    color: '#F59E0B' },
                        ].map((cat, i) => (
                          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}14` }}>
                              <cat.icon size={13} style={{ color: cat.color }} />
                            </div>
                            <p className="text-[12px] font-semibold text-slate-600">{isAr ? cat.label_ar : cat.label_en}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* CENTER: Resource links */}
                    <div className="flex-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 mb-4">
                        {isAr ? 'موارد ومساعدة' : 'Resources & support'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {resources.map((res) => (
                          <Link key={res.href} href={res.href}
                            className="group flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                              <res.icon size={16} className="text-[#25A4E8]" />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">{res.label}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{res.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-slate-100 self-stretch" />

                    {/* RIGHT: Promo */}
                    <PromoPanel isAr={isAr} />
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: isAr ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto"
          >
            <div className="p-5 pt-20">
              {/* Lang */}
              <div className="flex items-center bg-slate-100 rounded-xl p-1 mb-6 w-fit">
                <button onClick={() => setLang('en')} className={clsx('px-4 py-2 rounded-lg text-sm font-bold transition-all', lang === 'en' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500')}>EN</button>
                <button onClick={() => setLang('ar')} className={clsx('px-4 py-2 rounded-lg text-sm font-bold transition-all', lang === 'ar' ? 'bg-white text-[#25A4E8] shadow-sm' : 'text-slate-500')}>AR</button>
              </div>

              {/* Accordion nav */}
              {(['features', 'solutions', 'integrations', 'resources'] as MenuKey[]).map((key) => (
                <div key={key} className="border-b border-slate-100 pb-2 mb-2">
                  <button
                    className="flex items-center justify-between w-full py-3 text-sm font-bold text-[#0F172A]"
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  >
                    {key === 'features'     ? (isAr ? 'المميزات'   : 'Features')     :
                     key === 'solutions'    ? (isAr ? 'الحلول'      : 'Solutions')    :
                     key === 'integrations' ? (isAr ? 'التكاملات'   : 'Integrations') :
                                             (isAr ? 'الموارد'      : 'Resources')}
                    <ChevronDown size={16} className={clsx('transition-transform duration-200', mobileExpanded === key && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                        <div className="pb-2 space-y-0.5">
                          {key === 'features' && featureCats.flatMap(cat => cat.items).map(item => (
                            <Link key={item.slug} href={`/features/${item.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <item.icon size={15} className="text-[#25A4E8] shrink-0" />{item.label}
                              {item.isNew && <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 uppercase ms-auto">NEW</span>}
                            </Link>
                          ))}
                          {key === 'solutions' && SOLUTIONS.map(s => (
                            <Link key={s.slug} href={`/solutions/${s.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <s.icon size={15} style={{ color: s.color }} className="shrink-0" />{isAr ? s.ar : s.en}
                            </Link>
                          ))}
                          {key === 'integrations' && INTEGRATIONS.map(intg => (
                            <Link key={intg.slug} href={`/integrations/${intg.slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <div className="w-5 h-5 rounded-md shrink-0" style={{ backgroundColor: intg.color }} />{isAr ? intg.ar : intg.en}
                            </Link>
                          ))}
                          {key === 'resources' && resources.map(res => (
                            <Link key={res.href} href={res.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-sm text-slate-700 font-medium">
                              <res.icon size={15} className="text-[#25A4E8] shrink-0" />{res.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link href="/pricing" className="block py-3 text-sm font-bold text-[#0F172A] border-b border-slate-100 mb-6">
                {isAr ? 'الأسعار' : 'Pricing'}
              </Link>

              <div className="flex flex-col gap-3">
                <Link href="/login" className="block text-center py-3 border-2 border-[#25A4E8] text-[#25A4E8] font-bold rounded-xl text-sm">
                  {isAr ? 'تسجيل الدخول' : 'Sign in'}
                </Link>
                <Link href="/demo" className="block text-center py-3 bg-[#25A4E8] text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/20">
                  {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
