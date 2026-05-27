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
  BookOpen, LifeBuoy, Code2, Award, Zap, Building2, Users, ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/lib/LanguageContext';

/* ── feature categories ─────────────────────────────────── */
const FEATURE_CATEGORIES_EN = [
  {
    label: 'Distribution',
    color: '#25A4E8',
    items: [
      { slug: 'channel-manager',        label: 'Channel Manager',        desc: 'Sync all OTAs from one place',       icon: Globe },
      { slug: 'availability-calendar',  label: 'Availability Calendar',  desc: 'Visual multi-property calendar',     icon: Calendar },
      { slug: 'reservation-management', label: 'Reservation Management', desc: 'Centralize all bookings',            icon: FileText },
    ],
  },
  {
    label: 'Guest Experience',
    color: '#7C69E8',
    items: [
      { slug: 'guest-verification',  label: 'Guest Verification',  desc: 'ID, deposit & contracts',          icon: Shield },
      { slug: 'automated-messaging', label: 'Automated Messaging', desc: 'Guest comms on autopilot',          icon: MessageSquare },
      { slug: 'guest-app',           label: 'Guest App',           desc: 'Mobile guest experience',           icon: Smartphone },
    ],
  },
  {
    label: 'Operations',
    color: '#F59E0B',
    items: [
      { slug: 'smart-lock-automation',   label: 'Smart Lock Automation',  desc: 'Keyless entry management',         icon: Lock },
      { slug: 'housekeeping-management', label: 'Housekeeping',           desc: 'Auto-assign cleaning tasks',       icon: Brush },
      { slug: 'maintenance-management',  label: 'Maintenance',            desc: 'Track & resolve issues fast',      icon: Wrench },
    ],
  },
  {
    label: 'Revenue & Finance',
    color: '#10B981',
    items: [
      { slug: 'revenue-analytics',   label: 'Revenue Analytics',      desc: 'RevPAR, ADR, occupancy',           icon: BarChart2 },
      { slug: 'payment-collection',  label: 'Payment Collection',     desc: 'ZATCA-compliant invoicing',         icon: CreditCard },
      { slug: 'owner-portal',        label: 'Owner Portal',           desc: 'Financial transparency',            icon: DollarSign },
    ],
  },
  {
    label: 'Branding',
    color: '#EC4899',
    items: [
      { slug: 'direct-booking-website', label: 'Direct Booking Website', desc: 'Commission-free bookings',      icon: Link2 },
      { slug: 'referral-links',         label: 'Referral Links',         desc: 'Grow via referrals',            icon: Share2 },
    ],
  },
];

const FEATURE_CATEGORIES_AR = [
  {
    label: 'التوزيع',
    color: '#25A4E8',
    items: [
      { slug: 'channel-manager',        label: 'مدير القنوات',        desc: 'مزامنة جميع OTAs من مكان واحد',    icon: Globe },
      { slug: 'availability-calendar',  label: 'تقويم التوفر',        desc: 'تقويم مرئي متعدد العقارات',        icon: Calendar },
      { slug: 'reservation-management', label: 'إدارة الحجوزات',      desc: 'مركزة جميع الحجوزات',             icon: FileText },
    ],
  },
  {
    label: 'تجربة الضيف',
    color: '#7C69E8',
    items: [
      { slug: 'guest-verification',  label: 'التحقق من الضيوف',  desc: 'هوية، وديعة وعقود',               icon: Shield },
      { slug: 'automated-messaging', label: 'الرسائل الآلية',    desc: 'تواصل الضيوف بشكل تلقائي',        icon: MessageSquare },
      { slug: 'guest-app',           label: 'تطبيق الضيوف',     desc: 'تجربة ضيف على الجوال',            icon: Smartphone },
    ],
  },
  {
    label: 'العمليات',
    color: '#F59E0B',
    items: [
      { slug: 'smart-lock-automation',   label: 'أتمتة الأقفال الذكية',  desc: 'إدارة الدخول بدون مفتاح',       icon: Lock },
      { slug: 'housekeeping-management', label: 'التدبير المنزلي',        desc: 'تعيين مهام التنظيف تلقائياً',  icon: Brush },
      { slug: 'maintenance-management',  label: 'الصيانة',               desc: 'تتبع وحل المشكلات بسرعة',      icon: Wrench },
    ],
  },
  {
    label: 'الإيرادات والمالية',
    color: '#10B981',
    items: [
      { slug: 'revenue-analytics',  label: 'تحليلات الإيرادات',  desc: 'رؤى RevPAR وADR والإشغال',    icon: BarChart2 },
      { slug: 'payment-collection', label: 'تحصيل المدفوعات',    desc: 'فوترة متوافقة مع زاتكا',      icon: CreditCard },
      { slug: 'owner-portal',       label: 'بوابة المالك',        desc: 'الشفافية المالية للملاك',     icon: DollarSign },
    ],
  },
  {
    label: 'العلامة التجارية',
    color: '#EC4899',
    items: [
      { slug: 'direct-booking-website', label: 'موقع الحجز المباشر', desc: 'حجوزات بدون عمولة',    icon: Link2 },
      { slug: 'referral-links',         label: 'روابط الإحالة',      desc: 'النمو عبر الإحالات',   icon: Share2 },
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
  { slug: 'property-managers',          en: 'Property Managers',           ar: 'مديرو العقارات',           desc_en: 'Manage 10–1,000+ units',         desc_ar: 'إدارة 10-1000+ وحدة',        color: '#25A4E8', icon: Building2 },
  { slug: 'vacation-rental-hosts',      en: 'Vacation Rental Hosts',       ar: 'مضيفو الإيجار السياحي',    desc_en: 'For independent hosts',          desc_ar: 'للمضيفين المستقلين',         color: '#7C69E8', icon: Globe },
  { slug: 'hotels-serviced-apartments', en: 'Hotels & Serviced Apartments', ar: 'الفنادق والشقق المفروشة', desc_en: 'Enterprise hotel tooling',       desc_ar: 'أدوات الفنادق المتقدمة',     color: '#F59E0B', icon: Building2 },
  { slug: 'multi-owner-operators',      en: 'Multi-Owner Operators',       ar: 'مشغلو متعددو الملاك',      desc_en: 'Owner portals & split billing',  desc_ar: 'بوابات الملاك وتقسيم الفواتير', color: '#10B981', icon: Users },
];

const RESOURCES_EN = [
  { icon: BookOpen,  label: 'Blog',            desc: 'Tips, updates & guides',         href: '/blog' },
  { icon: LifeBuoy,  label: 'Help Center',     desc: 'Answers to common questions',    href: '/help' },
  { icon: Code2,     label: 'Documentation',   desc: 'Technical integration docs',     href: '/docs' },
  { icon: Award,     label: 'Case Studies',    desc: 'How operators use StayHub',      href: '/case-studies' },
  { icon: Zap,       label: 'Product Updates', desc: "What's new in StayHub",          href: '/updates' },
];
const RESOURCES_AR = [
  { icon: BookOpen,  label: 'المدونة',          desc: 'نصائح وتحديثات وأدلة',          href: '/blog' },
  { icon: LifeBuoy,  label: 'مركز المساعدة',    desc: 'إجابات للأسئلة الشائعة',        href: '/help' },
  { icon: Code2,     label: 'التوثيق',          desc: 'وثائق التكامل التقني',          href: '/docs' },
  { icon: Award,     label: 'دراسات الحالة',    desc: 'كيف يستخدم المشغّلون StayHub',  href: '/case-studies' },
  { icon: Zap,       label: 'تحديثات المنتج',   desc: 'الجديد في StayHub',             href: '/updates' },
];

type MenuKey = 'features' | 'integrations' | 'solutions' | 'resources' | null;

export default function Navbar() {
  const { lang, setLang, t, isAr } = useLanguage();
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null);
  const pathname = usePathname();
  const menuRef  = useRef<HTMLDivElement>(null);
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

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100/80'
            : 'bg-white/85 backdrop-blur-md'
        )}
        ref={menuRef}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/stayhub-logo.svg" alt="StayHub" width={140} height={36} className="h-9 w-auto" priority />
            </Link>

            {/* Desktop nav links */}
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
                  {key === 'features'     ? (isAr ? 'المميزات'      : 'Features')     :
                   key === 'solutions'    ? (isAr ? 'الحلول'         : 'Solutions')    :
                   key === 'integrations' ? (isAr ? 'التكاملات'      : 'Integrations') :
                                           (isAr ? 'الموارد'         : 'Resources')}
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
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-full inset-x-0 bg-white/98 backdrop-blur-xl border-b border-slate-100 shadow-2xl shadow-slate-200/60"
              onMouseEnter={() => openMenu(activeMenu)}
              onMouseLeave={closeMenu}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

                {/* FEATURES */}
                {activeMenu === 'features' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        {isAr ? 'استكشف المميزات حسب الفئة' : 'Explore features by category'}
                      </p>
                      <Link href="/features" className="flex items-center gap-1 text-xs font-bold text-[#25A4E8] hover:underline">
                        {isAr ? 'جميع المميزات' : 'All features'} <ArrowRight size={11} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-5 gap-6">
                      {featureCats.map((cat) => (
                        <div key={cat.label}>
                          <p className="text-[11px] font-extrabold uppercase tracking-widest mb-3" style={{ color: cat.color }}>{cat.label}</p>
                          <div className="space-y-1">
                            {cat.items.map((item) => (
                              <Link key={item.slug} href={`/features/${item.slug}`}
                                className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${cat.color}18` }}>
                                  <item.icon size={14} style={{ color: cat.color }} />
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors leading-tight">{item.label}</p>
                                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SOLUTIONS */}
                {activeMenu === 'solutions' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        {isAr ? 'حلول لكل دور' : 'Solutions for every role'}
                      </p>
                      <Link href="/solutions" className="flex items-center gap-1 text-xs font-bold text-[#25A4E8] hover:underline">
                        {isAr ? 'جميع الحلول' : 'All solutions'} <ArrowRight size={11} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {SOLUTIONS.map((s) => (
                        <Link key={s.slug} href={`/solutions/${s.slug}`}
                          className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                            <s.icon size={22} />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors text-sm">{isAr ? s.ar : s.en}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{isAr ? s.desc_ar : s.desc_en}</p>
                          </div>
                          <ArrowRight size={14} className="ms-auto text-slate-200 group-hover:text-[#25A4E8] transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* INTEGRATIONS */}
                {activeMenu === 'integrations' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        {isAr ? 'جميع تكاملات المنصة' : 'All platform integrations'}
                      </p>
                      <Link href="/integrations" className="flex items-center gap-1 text-xs font-bold text-[#25A4E8] hover:underline">
                        {isAr ? 'جميع التكاملات' : 'All integrations'} <ArrowRight size={11} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {INTEGRATIONS.map((intg) => (
                        <Link key={intg.slug} href={`/integrations/${intg.slug}`}
                          className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shrink-0 shadow-sm" style={{ backgroundColor: intg.color }}>
                            {(isAr ? intg.ar : intg.en).charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors">{isAr ? intg.ar : intg.en}</p>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${intg.color}18`, color: intg.color }}>
                              {isAr ? intg.badge_ar : intg.badge_en}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESOURCES */}
                {activeMenu === 'resources' && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6">
                      {isAr ? 'موارد ومساعدة' : 'Resources & support'}
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                      {resources.map((res) => (
                        <Link key={res.href} href={res.href}
                          className="group flex flex-col items-start gap-2 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <res.icon size={17} className="text-[#25A4E8]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors">{res.label}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{res.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
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
