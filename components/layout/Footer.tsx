'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

/* ── Social icon SVGs ──────────────────────────────────── */
const LinkedinIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.83 1.54V6.77a4.85 4.85 0 0 1-1.06-.08z" />
  </svg>
);

const SOCIALS = [
  { icon: LinkedinIcon, href: 'https://linkedin.com/company/stayhubsa', label: 'LinkedIn' },
  { icon: TwitterIcon,  href: 'https://x.com/stayhubsa',                label: 'X / Twitter' },
  { icon: InstagramIcon,href: 'https://instagram.com/stayhubsa',        label: 'Instagram' },
  { icon: TikTokIcon,   href: 'https://tiktok.com/@stayhubsa',          label: 'TikTok' },
];

/* ── link data ─────────────────────────────────────────── */
const FEATURES_EN = [
  { label: 'Channel Manager',        href: '/features/channel-manager' },
  { label: 'Availability Calendar',  href: '/features/availability-calendar' },
  { label: 'Guest Verification',     href: '/features/guest-verification' },
  { label: 'Automated Messaging',    href: '/features/automated-messaging' },
  { label: 'Revenue Analytics',      href: '/features/revenue-analytics' },
  { label: 'Owner Portal',           href: '/features/owner-portal' },
  { label: 'Direct Booking Website', href: '/features/direct-booking-website' },
];
const FEATURES_AR = [
  { label: 'مدير القنوات',            href: '/features/channel-manager' },
  { label: 'تقويم التوفر',            href: '/features/availability-calendar' },
  { label: 'التحقق من الضيوف',        href: '/features/guest-verification' },
  { label: 'الرسائل الآلية',          href: '/features/automated-messaging' },
  { label: 'تحليلات الإيرادات',       href: '/features/revenue-analytics' },
  { label: 'بوابة المالك',            href: '/features/owner-portal' },
  { label: 'موقع الحجز المباشر',      href: '/features/direct-booking-website' },
];

const SOLUTIONS_EN = [
  { label: 'Property Managers',           href: '/solutions/property-managers' },
  { label: 'Vacation Rental Hosts',       href: '/solutions/vacation-rental-hosts' },
  { label: 'Hotels & Serviced Apartments',href: '/solutions/hotels-serviced-apartments' },
  { label: 'Multi-Owner Operators',       href: '/solutions/multi-owner-operators' },
  { label: 'Integrations',               href: '/integrations' },
  { label: 'Pricing',                    href: '/pricing' },
];
const SOLUTIONS_AR = [
  { label: 'مديرو العقارات',             href: '/solutions/property-managers' },
  { label: 'مضيفو الإيجار السياحي',      href: '/solutions/vacation-rental-hosts' },
  { label: 'الفنادق والشقق المفروشة',    href: '/solutions/hotels-serviced-apartments' },
  { label: 'مشغلو متعددو الملاك',        href: '/solutions/multi-owner-operators' },
  { label: 'التكاملات',                  href: '/integrations' },
  { label: 'الأسعار',                    href: '/pricing' },
];

const COMPANY_EN = [
  { label: 'About',         href: '/about' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Careers',       href: '/careers' },
  { label: 'Help Center',   href: '/help' },
  { label: 'Case Studies',  href: '/case-studies' },
  { label: 'Product Updates',href: '/updates' },
];
const COMPANY_AR = [
  { label: 'من نحن',           href: '/about' },
  { label: 'المدونة',          href: '/blog' },
  { label: 'وظائف',            href: '/careers' },
  { label: 'مركز المساعدة',    href: '/help' },
  { label: 'دراسات الحالة',    href: '/case-studies' },
  { label: 'تحديثات المنتج',   href: '/updates' },
];

const LEGAL_EN = [
  { label: 'Privacy Policy',  href: '/privacy' },
  { label: 'Terms of Service',href: '/terms' },
  { label: 'Cookie Policy',   href: '/cookies' },
  { label: 'ZATCA Compliance',href: '/compliance' },
];
const LEGAL_AR = [
  { label: 'سياسة الخصوصية',  href: '/privacy' },
  { label: 'شروط الخدمة',     href: '/terms' },
  { label: 'سياسة الكوكيز',   href: '/cookies' },
  { label: 'امتثال زاتكا',    href: '/compliance' },
];

/* ── Ministry of Tourism license ───────────────────────── */
const LICENSE = {
  authority: { ar: 'مرخصة من وزارة السياحة', en: 'Licensed by the Ministry of Tourism' },
  verified:  { ar: 'منشأة سياحية معتمدة', en: 'Verified tourism establishment' },
  items: [
    { labelAr: 'رقم الترخيص',    labelEn: 'License No.',             valueAr: '73104678',                              valueEn: '73104678' },
    { labelAr: 'السجل التجاري',  labelEn: 'Commercial Registration', valueAr: '1010937195',                            valueEn: '1010937195' },
    { labelAr: 'نوع الترخيص',    labelEn: 'License Type',            valueAr: 'حجز وحدات ضيافة',                        valueEn: 'Hospitality Unit Booking' },
    { labelAr: 'الاسم التجاري',  labelEn: 'Trade Name',              valueAr: 'شركة هب الإقامة للسفر والسياحة',         valueEn: 'Hub Accommodation for Travel & Tourism Co.' },
  ],
};

/* ── component ─────────────────────────────────────────── */
export default function Footer() {
  const { isAr } = useLanguage();

  const features  = isAr ? FEATURES_AR  : FEATURES_EN;
  const solutions = isAr ? SOLUTIONS_AR : SOLUTIONS_EN;
  const company   = isAr ? COMPANY_AR   : COMPANY_EN;
  const legal     = isAr ? LEGAL_AR     : LEGAL_EN;

  const cols = [
    { heading: isAr ? 'المميزات'  : 'Features',  links: features },
    { heading: isAr ? 'الحلول'    : 'Solutions', links: solutions },
    { heading: isAr ? 'الشركة'    : 'Company',   links: company },
  ];

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Mini CTA strip */}
      <div className="border-b border-white/5 bg-gradient-to-r from-[#25A4E8]/10 to-[#7C69E8]/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-white/80">
            {isAr ? '🚀 هل أنت مستعد لأتمتة أعمالك؟ ابدأ اليوم.' : '🚀 Ready to automate your hospitality business? Start today.'}
          </p>
          <div className="flex gap-3 shrink-0">
            <Link href="/demo" className="px-5 py-2.5 bg-[#25A4E8] text-white text-xs font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/20">
              {isAr ? 'احجز عرضاً' : 'Book a Demo'}
            </Link>
            <Link href="/pricing" className="px-5 py-2.5 border border-white/20 text-white text-xs font-semibold rounded-xl hover:bg-white/5 transition-colors">
              {isAr ? 'الأسعار' : 'View Pricing'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/8">

          {/* Brand column — spans 2 */}
          <div className="md:col-span-2">
            <Link href="/">
              <Image src="/stayhub-logo.svg" alt="StayHub" width={140} height={36} className="h-9 w-auto brightness-0 invert mb-4" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {isAr
                ? 'نظام التشغيل لأعمال الضيافة في المملكة العربية السعودية. انشر في كل مكان، أتمت كل شيء، نمّ إيراداتك.'
                : "The operating system for hospitality businesses in Saudi Arabia. List everywhere, automate everything, grow revenue."}
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mb-7">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#25A4E8] flex items-center justify-center transition-all hover:scale-110">
                  <Icon />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a href="tel:0583999902" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#25A4E8]/20 transition-colors text-xs">📞</span>
                0583999902
              </a>
              <a href="mailto:info@stayhub.sa" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#25A4E8]/20 transition-colors text-xs">✉️</span>
                info@stayhub.sa
              </a>
              <a href="https://www.stayhub.sa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#25A4E8]/20 transition-colors text-xs">🌐</span>
                www.stayhub.sa
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors leading-tight block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ministry of Tourism license — compact strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl bg-white/[0.03] border border-white/8 px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold text-xs shrink-0">
            <ShieldCheck size={14} />
            {isAr ? LICENSE.authority.ar : LICENSE.authority.en}
          </span>
          {LICENSE.items.map(item => (
            <span key={item.labelEn} className="text-[11px] text-slate-400 before:content-['•'] before:text-slate-600 before:me-3">
              <span className="text-slate-500">{isAr ? item.labelAr : item.labelEn}:</span>{' '}
              <span className="text-slate-300 font-medium">{isAr ? item.valueAr : item.valueEn}</span>
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-xs text-slate-500">© 2026 StayHub. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <div className="flex gap-4">
              {legal.map(l => (
                <Link key={l.label} href={l.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400">
              {isAr ? '🇸🇦 مبني للسوق السعودي' : '🇸🇦 Built for Saudi Arabia'}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
              {isAr ? 'وزارة السياحة ✓' : 'Ministry of Tourism ✓'}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
              ZATCA ✓
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              Absher ✓
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
