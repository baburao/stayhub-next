'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Globe, Building2, BarChart2, Cpu, FileText, CreditCard, MessageSquare, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease },
});

/* ── All integrations — source of truth ─────────────────── */
const INTEGRATIONS = [
  /* OTA */
  { slug: 'aqar',                    en: 'AQAR',                  ar: 'عقار',              logo: '/logos/AQAR.png',                     cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#1B5E93' },
  { slug: 'ejar-ota',                en: 'Ejar',                  ar: 'إيجار',             logo: '/logos/EJAR.svg',                                   cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#1C7C54' },
  { slug: 'airbnb',                  en: 'Airbnb',                ar: 'Airbnb',            logo: '/logos/Airbnb.svg',                   cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#FF5A5F' },
  { slug: 'booking-com',             en: 'Booking.com',           ar: 'Booking.com',       logo: '/logos/Booking.com.svg',              cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#003580' },
  { slug: 'agoda',                   en: 'AGODA',                 ar: 'أجودا',             logo: '/logos/Agoda.svg',                    cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#E31837' },
  { slug: 'google-vacation-rentals', en: 'Google VR',             ar: 'Google VR',         logo: '/logos/GoogleVR.svg',  cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#4285F4' },
  { slug: 'qotoon',                  en: 'Qotoon',                ar: 'قطون',              logo: '/logos/QOTOON.png',                                   cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#7C4DFF' },
  { slug: 'attiude',                 en: 'Attiude',               ar: 'Attiude',           logo: null,                                   cat: 'OTA',           badge_en: 'OTA',          badge_ar: 'OTA',          soon: false, color: '#00897B' },
  { slug: 'almosafer',               en: 'Almosafer',             ar: 'المسافر',           logo: null,                                   cat: 'OTA',           badge_en: 'Soon',         badge_ar: 'قريباً',       soon: true,  color: '#0D47A1' },
  { slug: 'darent',                  en: 'Darent',                ar: 'دارنت',             logo: null,                                   cat: 'OTA',           badge_en: 'Soon',         badge_ar: 'قريباً',       soon: true,  color: '#546E7A' },
  { slug: 'gathern',                 en: 'Gathern',               ar: 'غثرن',              logo: '/logos/gathern.webp',                  cat: 'OTA',           badge_en: 'Soon',         badge_ar: 'قريباً',       soon: true,  color: '#00A651' },
  /* Government */
  { slug: 'absher',                  en: 'Absher',                ar: 'أبشر',              logo: '/logos/Absher.png',                    cat: 'Government',    badge_en: 'Gov',          badge_ar: 'حكومي',        soon: false, color: '#00695C' },
  { slug: 'shmoos',                  en: 'Shmoos',                ar: 'شموس',              logo: '/logos/shomoos.webp',                  cat: 'Government',    badge_en: 'Gov',          badge_ar: 'حكومي',        soon: false, color: '#1565C0' },
  { slug: 'mot',                     en: 'Ministry of Tourism',   ar: 'وزارة السياحة',    logo: null,                                   cat: 'Government',    badge_en: 'Gov',          badge_ar: 'حكومي',        soon: false, color: '#6A1B9A' },
  { slug: 'ejar-gov',                en: 'Ejar',                  ar: 'إيجار',             logo: '/logos/EJAR.svg',                                   cat: 'Government',    badge_en: 'Gov',          badge_ar: 'حكومي',        soon: false, color: '#1C7C54' },
  /* Dynamic Pricing */
  { slug: 'pricelabs',               en: 'PriceLabs',             ar: 'PriceLabs',         logo: '/logos/pricelabs.webp',                cat: 'Pricing',       badge_en: 'Pricing',      badge_ar: 'تسعير',        soon: false, color: '#E65100' },
  /* Smart Home */
  { slug: 'tuya',                    en: 'Tuya',                  ar: 'Tuya',              logo: '/logos/tuya.webp',                     cat: 'Smart Home',    badge_en: 'Smart Home',   badge_ar: 'منزل ذكي',     soon: false, color: '#FF6F00' },
  { slug: 'ttlock',                  en: 'TTLock',                ar: 'TTLock',            logo: '/logos/ttlock.webp',                   cat: 'Smart Home',    badge_en: 'Smart Home',   badge_ar: 'منزل ذكي',     soon: false, color: '#37474F' },
  /* Accounting */
  { slug: 'odoo',                    en: 'Odoo',                  ar: 'Odoo',              logo: '/logos/odoo.webp',                     cat: 'Accounting',    badge_en: 'Accounting',   badge_ar: 'محاسبة',       soon: false, color: '#714B67' },
  { slug: 'quyood',                  en: 'Quyood',                ar: 'قيود',              logo: '/logos/qoyod.webp',                    cat: 'Accounting',    badge_en: 'Accounting',   badge_ar: 'محاسبة',       soon: false, color: '#1A73E8' },
  { slug: 'daftra',                  en: 'Daftra',                ar: 'دفترة',             logo: '/logos/daftra.webp',                   cat: 'Accounting',    badge_en: 'Accounting',   badge_ar: 'محاسبة',       soon: false, color: '#00796B' },
  /* Bank */
  { slug: 'anb',                     en: 'ANB',                   ar: 'البنك العربي',     logo: '/logos/ANB.svg',                       cat: 'Bank',          badge_en: 'Bank',         badge_ar: 'بنك',          soon: false, color: '#0073CF' },
  /* Communication */
  { slug: 'whatsapp',                en: 'WhatsApp',              ar: 'واتساب',            logo: '/icons/whatsapp.svg',                  cat: 'Communication', badge_en: 'Messaging',    badge_ar: 'مراسلة',       soon: false, color: '#25D366' },
  { slug: 'vfirst-sms',              en: 'VFirst SMS',            ar: 'VFirst SMS',        logo: null,                                   cat: 'Communication', badge_en: 'Messaging',    badge_ar: 'مراسلة',       soon: false, color: '#5C6BC0' },
];

/* ── Category tabs ──────────────────────────────────────── */
const CATS = [
  { key: 'All',          en: 'All',              ar: 'الكل',              icon: Globe,         color: '#25A4E8' },
  { key: 'OTA',          en: 'OTA',              ar: 'OTA',               icon: Globe,         color: '#FF5A5F' },
  { key: 'Government',   en: 'Government',       ar: 'حكومي',             icon: Building2,     color: '#10B981' },
  { key: 'Pricing',      en: 'Dynamic Pricing',  ar: 'تسعير ديناميكي',   icon: BarChart2,     color: '#F59E0B' },
  { key: 'Smart Home',   en: 'Smart Home',       ar: 'منزل ذكي',          icon: Cpu,           color: '#6366F1' },
  { key: 'Accounting',   en: 'Accounting',       ar: 'محاسبة',            icon: FileText,      color: '#7C69E8' },
  { key: 'Bank',         en: 'Bank',             ar: 'بنك',               icon: CreditCard,    color: '#0F172A' },
  { key: 'Communication',en: 'Communication',    ar: 'تواصل',             icon: MessageSquare, color: '#25D366' },
];

/* ── Integration card ───────────────────────────────────── */
function IntegrationCard({ intg, isAr }: { intg: typeof INTEGRATIONS[0]; isAr: boolean }) {
  const name  = isAr ? intg.ar       : intg.en;
  const badge = isAr ? intg.badge_ar : intg.badge_en;

  return (
    <Link
      href={`/integrations/${intg.slug}`}
      className={`group flex flex-col items-center text-center gap-0 bg-white rounded-2xl sm:rounded-3xl border p-4 sm:p-7 transition-all duration-200
        ${intg.soon
          ? 'border-slate-100 opacity-80 pointer-events-none'
          : 'border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1'
        }`}
    >
      {/* iOS-style icon box */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[18px] sm:rounded-[24px] bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-3 sm:mb-5 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md p-2.5 sm:p-3">
        {intg.logo ? (
          <Image src={intg.logo} alt={intg.en} width={72} height={72} className="object-contain w-full h-full" />
        ) : (
          <span className="text-lg sm:text-xl font-extrabold tracking-tight" style={{ color: intg.color }}>
            {intg.en.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name */}
      <p className="font-bold text-[#0F172A] text-sm sm:text-base leading-tight mb-1 sm:mb-1.5 group-hover:text-[#25A4E8] transition-colors">
        {name}
      </p>

      {/* Badge */}
      <span className={`text-xs sm:text-sm font-semibold ${intg.soon ? 'text-amber-500' : 'text-[#25A4E8]'}`}>
        {badge}
      </span>
    </Link>
  );
}

export default function IntegrationsPageClient() {
  const { t, isAr } = useLanguage();
  const { openModal }    = useDemoModal();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.cat === activeTab);

  const activeCat = CATS.find(c => c.key === activeTab)!;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-100 text-violet-700 border border-violet-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {isAr ? 'جميع التكاملات' : 'All Integrations'}
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <>{`انشر في كل مكان.`}<br /><span className="gradient-text">{`أدر من مكان واحد.`}</span></>
              : <>List Everywhere.{' '}<span className="gradient-text">Manage from One Place.</span></>
            }
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.integrations.pageSubtitle}
          </motion.p>

          {/* Stats row */}
          <motion.div {...fadeUp(0.22)} className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { value: '22+', label: isAr ? 'تكامل نشط' : 'Active integrations' },
              { value: '7',   label: isAr ? 'فئات' : 'Categories' },
              { value: '2-way', label: isAr ? 'مزامنة في الوقت الفعلي' : 'Real-time sync' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category tabs + grid ─────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Tabs */}
          <motion.div {...fadeUp(0)} className="grid grid-cols-2 gap-2 mb-10 sm:flex sm:flex-wrap sm:justify-center">
            {CATS.map((cat) => {
              const isActive = activeTab === cat.key;
              const label = isAr ? cat.ar : cat.en;
              const count = cat.key === 'All' ? INTEGRATIONS.length : INTEGRATIONS.filter(i => i.cat === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-[13px] sm:text-sm font-semibold transition-all border justify-between sm:justify-start ${
                    isActive
                      ? 'text-white shadow-lg shadow-blue-500/20 border-transparent'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-[#25A4E8]'
                  }`}
                  style={isActive ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <cat.icon size={13} className="shrink-0" />
                    <span className="text-start leading-tight">{label}</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Category header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab !== 'All' && (
                <div className="mb-8 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeCat.color}18` }}
                  >
                    <activeCat.icon size={16} style={{ color: activeCat.color }} />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#0F172A] text-lg">{isAr ? activeCat.ar : activeCat.en}</p>
                    <p className="text-sm text-slate-400">
                      {filtered.length} {isAr ? 'تكاملات' : 'integrations'}
                    </p>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
                {filtered.map((intg, i) => (
                  <motion.div
                    key={intg.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (i % 8) * 0.04, ease }}
                  >
                    <IntegrationCard intg={intg} isAr={isAr} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Missing integration CTA ──────────────────────── */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <p className="font-bold text-[#0F172A] text-sm">
              {isAr ? 'تكامل مفقود؟' : 'Missing an integration?'}
            </p>
            <p className="text-slate-500 text-sm">
              {isAr ? 'أخبرنا وسنضيفه لقائمة الأولويات.' : "Tell us and we'll add it to our priority list."}
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-6 py-3 bg-[#25A4E8] text-white text-sm font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/20 shrink-0"
          >
            {isAr ? 'اطلب تكاملاً' : 'Request an integration'}
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#25A4E8] to-[#7C69E8]">
        <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.integrations.connectTitle}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.integrations.connectDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openModal}
                className="px-8 py-4 bg-white text-[#25A4E8] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                {t.buttons.bookDemoShort}
              </button>
              <Link href="/pricing" className="px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                {t.buttons.viewPricing}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
