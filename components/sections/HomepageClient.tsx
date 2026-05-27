'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Globe, Shield, MessageSquare, BarChart2, CreditCard,
  Brush, Link2, Calendar, CheckCircle2, Star, Zap, TrendingUp,
  Lock, Users, DollarSign, Smartphone, Building2, ChevronDown,
  CalendarCheck, BadgeCheck, Banknote, Sparkles, RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

/* ─── data ─────────────────────────────────────────────── */

const OTA_LOGOS = ['Airbnb', 'Booking.com', 'Agoda', 'Expedia', 'Google', 'Gathern', 'AJAAR'];

const AUTOMATION_STEPS_EN = [
  { icon: CalendarCheck, label: 'Booking Received',      color: '#25A4E8' },
  { icon: MessageSquare, label: 'Guest Communication',   color: '#7C69E8' },
  { icon: BadgeCheck,    label: 'ID Verification',       color: '#25A4E8' },
  { icon: Banknote,      label: 'Payment Collected',     color: '#7C69E8' },
  { icon: Lock,          label: 'Smart Lock Access',     color: '#25A4E8' },
  { icon: Brush,         label: 'Housekeeping Assigned', color: '#7C69E8' },
  { icon: Star,          label: 'Review Follow-up',      color: '#25A4E8' },
];
const AUTOMATION_STEPS_AR = [
  { icon: CalendarCheck, label: 'استلام الحجز',          color: '#25A4E8' },
  { icon: MessageSquare, label: 'التواصل مع الضيف',      color: '#7C69E8' },
  { icon: BadgeCheck,    label: 'التحقق من الهوية',      color: '#25A4E8' },
  { icon: Banknote,      label: 'تحصيل الدفع',          color: '#7C69E8' },
  { icon: Lock,          label: 'الوصول بالقفل الذكي',  color: '#25A4E8' },
  { icon: Brush,         label: 'تكليف التنظيف',        color: '#7C69E8' },
  { icon: Star,          label: 'متابعة التقييم',       color: '#25A4E8' },
];

const FEATURES_EN = [
  { icon: Globe,         title: 'Channel Manager',        desc: 'Sync all OTAs from one dashboard. Zero double bookings.',               href: '/features/channel-manager',         color: '#25A4E8', cat: 'Distribution' },
  { icon: Calendar,      title: 'Availability Calendar',  desc: 'Visual multi-property calendar with instant OTA sync.',                href: '/features/availability-calendar',   color: '#7C69E8', cat: 'Distribution' },
  { icon: Shield,        title: 'Guest Verification',     desc: 'Absher ID, Ejar contracts, and security deposits — all automated.',     href: '/features/guest-verification',      color: '#25A4E8', cat: 'Guest Experience' },
  { icon: MessageSquare, title: 'Automated Messaging',    desc: 'Full guest journey from booking to review — on autopilot.',             href: '/features/automated-messaging',     color: '#7C69E8', cat: 'Guest Experience' },
  { icon: Lock,          title: 'Smart Lock Automation',  desc: 'Auto-generate and revoke door codes per reservation.',                  href: '/features/smart-lock-automation',   color: '#25A4E8', cat: 'Operations' },
  { icon: Brush,         title: 'Housekeeping',           desc: 'Auto-assign tasks. No WhatsApp groups. No missed cleans.',              href: '/features/housekeeping-management', color: '#7C69E8', cat: 'Operations' },
  { icon: BarChart2,     title: 'Revenue Analytics',      desc: 'RevPAR, ADR, and occupancy insights to grow smarter.',                 href: '/features/revenue-analytics',       color: '#25A4E8', cat: 'Revenue & Finance' },
  { icon: CreditCard,    title: 'Payment Collection',     desc: 'Deposits, invoices, extras — ZATCA-compliant, all automated.',         href: '/features/payment-collection',      color: '#7C69E8', cat: 'Revenue & Finance' },
  { icon: Users,         title: 'Owner Portal',           desc: 'Branded portals for each property owner. Full transparency.',           href: '/features/owner-portal',            color: '#25A4E8', cat: 'Revenue & Finance' },
  { icon: Link2,         title: 'Direct Booking Website', desc: 'Your own branded site for commission-free reservations.',              href: '/features/direct-booking-website',  color: '#7C69E8', cat: 'Branding' },
  { icon: Smartphone,    title: 'Guest App',              desc: 'White-label mobile app for your guests with self check-in.',            href: '/features/guest-app',               color: '#25A4E8', cat: 'Branding' },
  { icon: TrendingUp,    title: 'Referral Links',         desc: 'Turn guests into ambassadors with trackable referral campaigns.',       href: '/features/referral-links',          color: '#7C69E8', cat: 'Branding' },
];

const FEATURES_AR = [
  { icon: Globe,         title: 'مدير القنوات',              desc: 'مزامنة جميع OTAs من لوحة تحكم واحدة. صفر حجوزات مزدوجة.',          href: '/features/channel-manager',         color: '#25A4E8', cat: 'التوزيع' },
  { icon: Calendar,      title: 'تقويم التوفر',              desc: 'تقويم مرئي متعدد العقارات مع مزامنة فورية مع OTA.',               href: '/features/availability-calendar',   color: '#7C69E8', cat: 'التوزيع' },
  { icon: Shield,        title: 'التحقق من الضيوف',          desc: 'هوية أبشر، عقود إيجار، والودائع الأمنية — كلها آلية.',            href: '/features/guest-verification',      color: '#25A4E8', cat: 'تجربة الضيف' },
  { icon: MessageSquare, title: 'الرسائل الآلية',            desc: 'رحلة الضيف من الحجز إلى التقييم، بشكل كامل على الطيار الآلي.',   href: '/features/automated-messaging',     color: '#7C69E8', cat: 'تجربة الضيف' },
  { icon: Lock,          title: 'أتمتة الأقفال الذكية',     desc: 'إنشاء رموز الباب وإلغاؤها تلقائياً لكل حجز.',                   href: '/features/smart-lock-automation',   color: '#25A4E8', cat: 'العمليات' },
  { icon: Brush,         title: 'إدارة التدبير المنزلي',    desc: 'تعيين المهام تلقائياً. لا مجموعات واتساب. لا تنظيف فائت.',       href: '/features/housekeeping-management', color: '#7C69E8', cat: 'العمليات' },
  { icon: BarChart2,     title: 'تحليلات الإيرادات',        desc: 'رؤى RevPAR وADR والإشغال للنمو بشكل أذكى.',                      href: '/features/revenue-analytics',       color: '#25A4E8', cat: 'الإيرادات والمالية' },
  { icon: CreditCard,    title: 'تحصيل المدفوعات',          desc: 'الودائع والفواتير والإضافات — متوافقة مع زاتكا، كلها آلية.',     href: '/features/payment-collection',      color: '#7C69E8', cat: 'الإيرادات والمالية' },
  { icon: Users,         title: 'بوابة المالك',             desc: 'بوابات مخصصة لكل مالك عقار. شفافية كاملة.',                       href: '/features/owner-portal',            color: '#25A4E8', cat: 'الإيرادات والمالية' },
  { icon: Link2,         title: 'موقع الحجز المباشر',       desc: 'موقعك الخاص للحجوزات المباشرة بدون عمولة.',                      href: '/features/direct-booking-website',  color: '#7C69E8', cat: 'العلامة التجارية' },
  { icon: Smartphone,    title: 'تطبيق الضيف',              desc: 'تطبيق جوال ذو علامة تجارية لضيوفك مع تسجيل وصول ذاتي.',        href: '/features/guest-app',               color: '#25A4E8', cat: 'العلامة التجارية' },
  { icon: TrendingUp,    title: 'روابط الإحالة',            desc: 'حوّل الضيوف إلى سفراء مع حملات إحالة قابلة للتتبع.',            href: '/features/referral-links',          color: '#7C69E8', cat: 'العلامة التجارية' },
];

const COMPLIANCE_ITEMS_EN = [
  { icon: BadgeCheck, title: 'ZATCA-Compliant Invoicing', desc: 'e-invoices that satisfy Saudi tax authority requirements out of the box.' },
  { icon: Shield,     title: 'Absher ID Verification',    desc: 'Verify every guest identity via Saudi National ID — Absher-integrated.' },
  { icon: Building2,  title: 'Ejar Contract Signing',     desc: 'Legally binding rental contracts via the official Ejar platform.' },
  { icon: Lock,       title: 'NTMP Smart Lock Ready',     desc: 'Natively compatible with Saudi National Tourism Marketplace standards.' },
  { icon: Banknote,   title: 'ANB & Local Bank Support',  desc: 'Collect payments in SAR via ANB, Mada, and all major Saudi banks.' },
  { icon: Globe,      title: 'Arabic-First Platform',     desc: 'Fully bilingual EN/AR interface with RTL support for every screen.' },
];
const COMPLIANCE_ITEMS_AR = [
  { icon: BadgeCheck, title: 'فواتير متوافقة مع زاتكا',    desc: 'فواتير إلكترونية تلبي متطلبات الهيئة الزكاة والضريبة والجمارك.' },
  { icon: Shield,     title: 'التحقق عبر أبشر',             desc: 'التحقق من هوية كل ضيف عبر الهوية الوطنية السعودية — متكامل مع أبشر.' },
  { icon: Building2,  title: 'توقيع عقود إيجار',            desc: 'عقود إيجار ملزمة قانونياً عبر منصة إيجار الرسمية.' },
  { icon: Lock,       title: 'جاهز للأقفال الذكية NTMP',   desc: 'متوافق أصلاً مع معايير المنصة الوطنية لتسويق السياحة.' },
  { icon: Banknote,   title: 'دعم ANB والبنوك السعودية',    desc: 'استقبل المدفوعات بالريال السعودي عبر ANB ومدى وجميع البنوك.' },
  { icon: Globe,      title: 'منصة عربية أولاً',            desc: 'واجهة ثنائية اللغة EN/AR مع دعم RTL لكل شاشة.' },
];

const TESTIMONIALS_EN = [
  { quote: 'StayHub reduced our admin time by 60%. We manage 80 units with a team of 4 — that was impossible before.', name: 'Mohammed Al-Rashid', role: 'Property Manager, Riyadh', rating: 5 },
  { quote: 'The Gathern + Airbnb sync alone saved us from 12 double bookings in the first month. Incredible.', name: 'Sara Al-Ghamdi', role: 'Host, Abha', rating: 5 },
  { quote: "Owner portal is a game-changer. My investors check their performance daily — they haven't called me in weeks.", name: 'Nora Al-Zahrani', role: 'Multi-Owner Operator, Jeddah', rating: 5 },
];
const TESTIMONIALS_AR = [
  { quote: 'خفّض StayHub وقت الإدارة لدينا بنسبة 60٪. ندير 80 وحدة بفريق من 4 أشخاص — كان ذلك مستحيلاً من قبل.', name: 'محمد الراشد', role: 'مدير عقارات، الرياض', rating: 5 },
  { quote: 'مزامنة غثرن + Airbnb وحدها أنقذتنا من 12 حجزاً مزدوجاً في الشهر الأول. رائع.', name: 'سارة الغامدي', role: 'مضيفة، أبها', rating: 5 },
  { quote: 'بوابة المالك غيّرت قواعد اللعبة. مستثمروني يتحققون من أدائهم يومياً — لم يتصلوا بي منذ أسابيع.', name: 'نورة الزهراني', role: 'مشغّلة متعددة الملاك، جدة', rating: 5 },
];

const FAQS_EN = [
  { q: 'Is StayHub compliant with Saudi regulations?', a: 'Yes. StayHub is built specifically for the Saudi market with ZATCA-compliant e-invoicing, Absher ID verification, and Ejar contract integration built in.' },
  { q: 'Which OTA channels does StayHub support?', a: 'We support Airbnb, Booking.com, Agoda, Expedia, Google Vacation Rentals, Gathern, and AJAAR — with more platforms added regularly.' },
  { q: 'How long does onboarding take?', a: 'Most properties are fully connected and live within 24–48 hours. Our team handles the OTA channel setup for you.' },
  { q: 'Can I manage multiple owners from one account?', a: 'Yes. StayHub has a dedicated multi-owner module with per-owner branded portals, split statements, and access control.' },
  { q: 'Does StayHub work on mobile?', a: 'StayHub is fully responsive and works on any device. We also offer a white-label guest app you can deploy under your own brand.' },
];
const FAQS_AR = [
  { q: 'هل StayHub متوافق مع اللوائح السعودية؟', a: 'نعم. StayHub مبني خصيصاً للسوق السعودي مع الفوترة الإلكترونية المتوافقة مع زاتكا، والتحقق من هوية أبشر، وتكامل عقود إيجار.' },
  { q: 'ما قنوات OTA التي يدعمها StayHub؟', a: 'ندعم Airbnb وBooking.com وAgoda وExpedia وGoogle Vacation Rentals وغثرن وAJAAR — مع إضافة منصات جديدة بانتظام.' },
  { q: 'كم يستغرق الإعداد؟', a: 'معظم العقارات تكون متصلة وجاهزة خلال 24-48 ساعة. فريقنا يتولى إعداد قنوات OTA نيابةً عنك.' },
  { q: 'هل يمكنني إدارة ملاك متعددين من حساب واحد؟', a: 'نعم. StayHub يحتوي على وحدة متعددة الملاك مخصصة مع بوابات مخصصة لكل مالك وكشوف منفصلة وتحكم في الوصول.' },
  { q: 'هل يعمل StayHub على الجوال؟', a: 'StayHub متجاوب بالكامل ويعمل على أي جهاز. نقدم أيضاً تطبيق ضيف ذا علامة تجارية يمكنك نشره باسم علامتك التجارية.' },
];

const STATS = [
  { value: '500+', en: 'Property Managers',  ar: 'مدير عقارات',     icon: Users },
  { value: '10K+', en: 'Units Managed',      ar: 'وحدة مُدارة',     icon: Building2 },
  { value: '6+',   en: 'OTA Integrations',   ar: 'تكامل OTA',       icon: Globe },
  { value: '24%',  en: 'Avg. Revenue Uplift',ar: 'زيادة متوسطة في الإيرادات', icon: TrendingUp },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

/* ─── sub-components ────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-[#0F172A] text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 text-sm pb-5 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── dashboard showcase (tabbed) ──────────────────────── */

const DASH_TABS_EN = ['Analytics', 'Calendar', 'Inbox'] as const;
const DASH_TABS_AR = ['التحليلات', 'التقويم', 'البريد الوارد'] as const;
type DashTab = 0 | 1 | 2;

const CALENDAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALENDAR_DATA = [
  [null, null, { ch: 'AB', from: true }, { ch: 'AB' }, { ch: 'AB', to: true }, null, null],
  [null, { ch: 'BK', from: true }, { ch: 'BK' }, { ch: 'BK' }, { ch: 'BK', to: true }, null, null],
  [{ ch: 'GT', from: true }, { ch: 'GT' }, { ch: 'GT' }, null, { ch: 'AB', from: true }, { ch: 'AB' }, { ch: 'AB', to: true }],
];
const CHANNEL_COLORS: Record<string, string> = { AB: '#FF5A5F', BK: '#003580', GT: '#00A651' };
const CHANNEL_NAMES: Record<string, string> = { AB: 'Airbnb', BK: 'Booking', GT: 'Gathern' };

const INBOX_MSGS = [
  { from: 'Mohammed A.', ch: 'AB', preview: 'What time is check-in?', time: '2m', unread: true },
  { from: 'Sarah K.',    ch: 'BK', preview: 'Can we get an early check-in?', time: '15m', unread: true },
  { from: 'Nora Z.',     ch: 'GT', preview: 'Confirmed! Looking forward to it', time: '1h', unread: false },
  { from: 'Khalid M.',   ch: 'AB', preview: 'Is parking available?', time: '3h', unread: false },
];
const INBOX_MSGS_AR = [
  { from: 'محمد أ.', ch: 'AB', preview: 'ما وقت تسجيل الوصول؟', time: 'قبل 2د', unread: true },
  { from: 'سارة ك.', ch: 'BK', preview: 'هل يمكننا وصول مبكر؟', time: 'قبل 15د', unread: true },
  { from: 'نورة ز.', ch: 'GT', preview: 'تم التأكيد! نتطلع للزيارة', time: 'قبل 1س', unread: false },
  { from: 'خالد م.', ch: 'AB', preview: 'هل يوجد موقف سيارات؟', time: 'قبل 3س', unread: false },
];

function DashboardShowcase({ isAr }: { isAr: boolean }) {
  const [activeTab, setActiveTab] = useState<DashTab>(0);
  const tabs = isAr ? DASH_TABS_AR : DASH_TABS_EN;
  const inboxMsgs = isAr ? INBOX_MSGS_AR : INBOX_MSGS;

  return (
    <section className="py-24 bg-gradient-to-br from-[#0F172A] to-[#1E2D4E]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left copy */}
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-6">
              {isAr ? 'لوحة التحكم' : 'Dashboard'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
              {isAr ? 'كل شيء في نظرة واحدة' : 'Everything at a glance'}
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {isAr
                ? 'تقويم موحد، أسعار ديناميكية، مزامنة متعددة القنوات، وتحليلات في الوقت الفعلي — كلها في لوحة تحكم واحدة.'
                : 'Unified calendar, dynamic pricing, multi-channel sync, and real-time analytics — one elegant dashboard.'}
            </p>
            <div className="space-y-3 mb-8">
              {(isAr ? [
                'تقويم متعدد العقارات مع كشف التعارضات فوراً',
                'تحديثات الأسعار التلقائية عبر جميع القنوات',
                'RevPAR وADR ومعدلات الإشغال',
                'صندوق وارد موحد من جميع OTAs',
              ] : [
                'Multi-property calendar with instant conflict detection',
                'Automatic rate updates across all channels',
                'RevPAR, ADR, and occupancy rate tracking',
                'Unified inbox from all OTAs',
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#25A4E8] shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25A4E8] text-white font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/30 text-sm">
              {isAr ? 'شاهد العرض التوضيحي' : 'See it in action'} <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Right — tabbed mock dashboard */}
          <motion.div {...fadeUp(0.15)} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center gap-0 border-b border-white/10 px-4 pt-4">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i as DashTab)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all ${
                    activeTab === i
                      ? 'bg-white/10 text-white border-b-2 border-[#25A4E8]'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <span className="ms-auto text-[10px] text-green-400 font-bold flex items-center gap-1 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {isAr ? 'مباشر' : 'Live'}
              </span>
            </div>

            {/* Tab content */}
            <div className="p-5 min-h-[300px]">
              <AnimatePresence mode="wait">
                {/* ANALYTICS TAB */}
                {activeTab === 0 && (
                  <motion.div key="analytics" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-bold text-sm">{isAr ? 'الأداء هذا الشهر' : 'This month\'s performance'}</span>
                      <span className="text-[10px] text-slate-400">{isAr ? 'مايو 2026' : 'May 2026'}</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-24 mb-5">
                      {[55, 70, 48, 85, 68, 92, 62, 88, 52, 95, 74, 82, 65, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm cursor-pointer hover:opacity-100 transition-opacity"
                          style={{ height: `${h}%`, background: `linear-gradient(to top, #25A4E8, #7C69E8)`, opacity: 0.65 + (i / 30) }} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { label: 'RevPAR', value: 'SAR 312', delta: '+22%' },
                        { label: isAr ? 'الإشغال' : 'Occupancy', value: '89%', delta: '+7%' },
                        { label: 'ADR', value: 'SAR 481', delta: '+14%' },
                        { label: isAr ? 'حجوزات' : 'Bookings', value: '124', delta: '+31%' },
                      ].map((m, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[10px] text-slate-400 mb-1">{m.label}</p>
                          <p className="text-white font-extrabold">{m.value}</p>
                          <p className="text-[#25A4E8] text-[10px] font-bold">{m.delta} ↑</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CALENDAR TAB */}
                {activeTab === 1 && (
                  <motion.div key="calendar" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-bold text-sm">{isAr ? 'تقويم التوفر' : 'Availability Calendar'}</span>
                      <div className="flex gap-2">
                        {Object.entries(CHANNEL_NAMES).map(([k, v]) => (
                          <span key={k} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${CHANNEL_COLORS[k]}30`, color: CHANNEL_COLORS[k] }}>{v}</span>
                        ))}
                      </div>
                    </div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {CALENDAR_DAYS.map(d => (
                        <div key={d} className="text-center text-[10px] font-bold text-slate-500">{d}</div>
                      ))}
                    </div>
                    {/* Property rows */}
                    {['Unit 1', 'Unit 2', 'Unit 3'].map((unit, row) => (
                      <div key={unit} className="mb-2">
                        <p className="text-[10px] text-slate-500 mb-1 font-semibold">{unit}</p>
                        <div className="grid grid-cols-7 gap-1">
                          {CALENDAR_DATA[row].map((cell, col) => (
                            <div key={col} className={`h-7 rounded text-[9px] font-bold flex items-center justify-center transition-all ${
                              cell
                                ? `text-white ${cell.from ? 'rounded-s-full' : ''} ${cell.to ? 'rounded-e-full' : ''}`
                                : 'bg-white/5'
                            }`}
                            style={cell ? { backgroundColor: CHANNEL_COLORS[cell.ch] } : {}}>
                              {cell?.from ? CHANNEL_NAMES[cell.ch].slice(0,2) : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
                      <RefreshCw size={11} className="text-green-400" />
                      <span className="text-[11px] text-green-400 font-semibold">{isAr ? 'مزامن مع جميع القنوات' : 'Synced with all channels'}</span>
                    </div>
                  </motion.div>
                )}

                {/* INBOX TAB */}
                {activeTab === 2 && (
                  <motion.div key="inbox" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-bold text-sm">{isAr ? 'صندوق الوارد الموحد' : 'Unified Inbox'}</span>
                      <span className="text-[10px] font-bold bg-[#25A4E8] text-white px-2 py-0.5 rounded-full">2 {isAr ? 'جديد' : 'new'}</span>
                    </div>
                    <div className="space-y-2">
                      {inboxMsgs.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${msg.unread ? 'bg-white/10 border-white/10' : 'bg-white/3 border-white/5'}`}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ backgroundColor: CHANNEL_COLORS[msg.ch] }}>
                            {msg.from.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-white text-xs font-bold truncate">{msg.from}</p>
                              <span className="text-[9px] font-bold px-1 rounded shrink-0" style={{ backgroundColor: `${CHANNEL_COLORS[msg.ch]}30`, color: CHANNEL_COLORS[msg.ch] }}>
                                {CHANNEL_NAMES[msg.ch]}
                              </span>
                            </div>
                            <p className="text-slate-400 text-[11px] truncate">{msg.preview}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[10px] text-slate-500">{msg.time}</span>
                            {msg.unread && <span className="w-2 h-2 rounded-full bg-[#25A4E8]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-[11px] text-slate-500">{isAr ? 'رسائل من Airbnb + Booking + Gathern في مكان واحد' : 'Messages from Airbnb + Booking + Gathern in one place'}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── main component ────────────────────────────────────── */

export default function HomepageClient() {
  const { t, isAr } = useLanguage();
  const features = isAr ? FEATURES_AR : FEATURES_EN;
  const automationSteps = isAr ? AUTOMATION_STEPS_AR : AUTOMATION_STEPS_EN;
  const compliance = isAr ? COMPLIANCE_ITEMS_AR : COMPLIANCE_ITEMS_EN;
  const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_EN;
  const faqs = isAr ? FAQS_AR : FAQS_EN;

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-[#F3F0FF] py-28 md:py-36">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.12] pointer-events-none" style={{ background: 'radial-gradient(circle, #25A4E8, transparent 65%)' }} />
        <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C69E8, transparent 65%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-200 mb-8">
                <Sparkles size={12} />
                {isAr ? 'منصة الضيافة الذكية في السعودية' : "Saudi Arabia's Smart Hospitality Platform"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.07] tracking-tight mb-6"
            >
              {isAr ? (
                <>نظام التشغيل{' '}<span className="gradient-text">لأعمال الضيافة</span></>
              ) : (
                <>The Operating System for{' '}<span className="gradient-text">Hospitality Businesses</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {isAr
                ? 'وزّع عقاراتك على جميع المنصات، أتمت رحلة الضيف، واحمِ ممتلكاتك — كل ذلك من منصة واحدة.'
                : 'Distribute across every platform, automate the entire guest journey, and protect your properties — all from one platform.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-14"
            >
              <Link href="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-[#25A4E8] text-white font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.03] text-sm">
                {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Free Demo'} <ArrowRight size={15} />
              </Link>
              <Link href="/features" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-[#0F172A] font-semibold rounded-xl hover:border-[#25A4E8] hover:text-[#25A4E8] transition-all text-sm">
                {isAr ? 'استكشف المميزات' : 'Explore Features'}
              </Link>
            </motion.div>

            {/* Floating stat chips */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-10">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/70 shadow-sm">
                  <span className="text-base font-extrabold text-[#25A4E8]">{s.value}</span>
                  <span className="text-xs text-slate-500 font-medium">{isAr ? s.ar : s.en}</span>
                </div>
              ))}
            </motion.div>

            {/* Floating UI cards */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
              className="relative mx-auto max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-blue-100/40 p-6 md:p-8"
            >
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-3 h-7 bg-slate-100 rounded-lg flex items-center px-3">
                  <span className="text-xs text-slate-400">app.stayhub.sa/dashboard</span>
                </div>
              </div>
              {/* Mock metrics row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: isAr ? 'الإيرادات (هذا الشهر)' : 'Revenue (This Month)', value: 'SAR 84,200', trend: '+18%', color: '#25A4E8' },
                  { label: isAr ? 'معدل الإشغال' : 'Occupancy Rate', value: '91%', trend: '+6%', color: '#7C69E8' },
                  { label: isAr ? 'حجوزات نشطة' : 'Active Bookings', value: '47', trend: '+3', color: '#25A4E8' },
                ].map((m, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 text-left">
                    <p className="text-[10px] text-slate-400 mb-1">{m.label}</p>
                    <p className="text-base font-extrabold text-[#0F172A]">{m.value}</p>
                    <p className="text-[10px] font-semibold" style={{ color: m.color }}>{m.trend} ↑</p>
                  </div>
                ))}
              </div>
              {/* Mock OTA sync row */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <RefreshCw size={14} className="text-green-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs font-semibold text-green-700">
                  {isAr ? 'متزامن مع' : 'Synced with'}{' '}
                </span>
                <div className="flex gap-2">
                  {['Airbnb', 'Booking.com', 'Gathern'].map(ch => (
                    <span key={ch} className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold text-slate-600 border border-slate-200">{ch}</span>
                  ))}
                </div>
                <span className="ms-auto text-[10px] text-green-600 font-semibold">● {isAr ? 'مباشر' : 'Live'}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────── */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-bold mb-6">
            {isAr ? 'يعمل مع جميع المنصات الرئيسية' : 'Works with all major platforms'}
          </p>
          <div className="overflow-hidden">
            <div className="animate-marquee flex gap-6 w-max">
              {[...OTA_LOGOS, ...OTA_LOGOS].map((ch, i) => (
                <span key={i} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 whitespace-nowrap">{ch}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROBLEM SECTION ──────────────────────────────── */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 mb-5">
              {isAr ? 'التحدي' : 'The Challenge'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
              {isAr ? 'إدارة عقاراتك يجب ألا تكون هكذا' : "Managing your rentals shouldn't feel like this"}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {isAr
                ? 'معظم مشغّلي الضيافة السعوديين يديرون 5+ تطبيقات، ويردون على رسائل واتساب على مدار الساعة، ويدخلون بيانات يدوياً في جداول بيانات — كل يوم.'
                : 'Most Saudi hospitality operators juggle 5+ apps, answer WhatsApp messages around the clock, and manually enter data into spreadsheets — every single day.'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(isAr ? [
              '5 تطبيقات مفتوحة في نفس الوقت',
              'حجوزات مزدوجة من منصات غير متزامنة',
              'رسائل واتساب لا تنتهي مع فريق التنظيف',
              'ملاك يتصلون لطلب تقارير الأداء',
              'فواتير يدوية غير متوافقة مع زاتكا',
              'لا رؤية في الوقت الفعلي لأداء العقارات',
            ] : [
              '5+ apps open at all times',
              'Double bookings from out-of-sync channels',
              'Endless WhatsApp threads with cleaning teams',
              'Owners calling to ask for performance reports',
              'Manual invoices not compliant with ZATCA',
              'No real-time visibility into property performance',
            ]).map((pain, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="text-red-400 mt-0.5 shrink-0 text-lg">✕</span>
                <p className="text-slate-300 text-sm font-medium">{pain}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.4)} className="mt-10 text-center">
            <p className="text-2xl font-bold text-white">
              {isAr ? 'StayHub يحل كل هذا.' : 'StayHub solves all of it.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. AUTOMATION WORKFLOW ──────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-[#EFF8FF] to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-200 mb-5">
              <Zap size={11} /> {isAr ? 'الأتمتة الكاملة' : 'Full Automation'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'رحلة الضيف بالكامل على الطيار الآلي' : 'The Entire Guest Journey on Autopilot'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {isAr
                ? 'من لحظة الحجز إلى طلب التقييم — كل خطوة مؤتمتة ومتصلة.'
                : 'From the moment a booking lands to the review request — every step automated and connected.'}
            </p>
          </motion.div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="relative">
            <div className="hidden md:block absolute top-9 left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 bg-gradient-to-r from-[#25A4E8] to-[#7C69E8] opacity-20 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 md:gap-2">
              {automationSteps.map((step, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}44)`, border: `1.5px solid ${step.color}33` }}>
                    <step.icon size={22} style={{ color: step.color }} />
                  </div>
                  {i < automationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 start-[calc(50%+32px)] end-0 h-0.5" style={{ background: `linear-gradient(to right, ${step.color}50, transparent)` }} />
                  )}
                  <span className="text-xs font-bold text-[#0F172A] leading-tight">{step.label}</span>
                  <span className="w-5 h-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-400 mt-2">{i + 1}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
            <Link href="/features/automated-messaging" className="inline-flex items-center gap-2 text-[#25A4E8] font-bold hover:gap-3 transition-all text-sm">
              {isAr ? 'اكتشف الأتمتة الكاملة' : 'Explore full automation'} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. FEATURE ECOSYSTEM ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-100 text-violet-700 border border-violet-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {isAr ? 'منظومة المميزات' : 'Feature Ecosystem'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything you need, in one place'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {isAr ? 'لا تكامل خارجي. لا بيانات متفرقة. منصة واحدة متكاملة لعملياتك.' : 'No external stitching. No fragmented data. One integrated platform for your entire operation.'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <Link href={f.href} className="group block bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}15`, color: f.color }}>
                    <f.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">{f.cat}</span>
                  <h3 className="font-bold text-[#0F172A] mb-2 group-hover:text-[#25A4E8] transition-colors text-sm">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#25A4E8] opacity-0 group-hover:opacity-100 transition-opacity">
                    {isAr ? 'اكتشف المزيد' : 'Learn more'} <ArrowRight size={11} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="mt-8 text-center">
            <Link href="/features" className="inline-flex items-center gap-2 text-[#25A4E8] font-bold hover:gap-3 transition-all">
              {isAr ? 'عرض جميع المميزات' : 'View all features'} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. DASHBOARD SHOWCASE ───────────────────────────── */}
      <DashboardShowcase isAr={isAr} />

      {/* ── 7. SECURITY & COMPLIANCE ────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full border border-green-200 mb-5">
              🇸🇦 {isAr ? 'مبني للسوق السعودي' : 'Built for Saudi Arabia'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'الامتثال والأمان بالكامل' : 'Compliance & security, fully covered'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {isAr
                ? 'StayHub هو المنصة الوحيدة المبنية خصيصاً للوفاء بمتطلبات السوق السعودي.'
                : "StayHub is the only platform built from the ground up to meet Saudi market requirements."}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {compliance.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="group bg-gradient-to-br from-white to-[#EFF8FF] rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <item.icon size={20} className="text-[#25A4E8]" />
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. REVENUE ENGINE ───────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#EFF8FF] to-[#F3F0FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Stats grid */}
            <motion.div {...fadeUp()} className="grid grid-cols-2 gap-4">
              {[
                { value: '+24%', label: isAr ? 'متوسط زيادة الإيرادات' : 'Avg. revenue uplift', color: '#25A4E8' },
                { value: '-60%', label: isAr ? 'تخفيض وقت الإدارة' : 'Admin time reduction', color: '#7C69E8' },
                { value: '0',    label: isAr ? 'حجوزات مزدوجة' : 'Double bookings', color: '#25A4E8' },
                { value: '4.8★', label: isAr ? 'متوسط تقييم الضيوف' : 'Avg. guest rating', color: '#7C69E8' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                  <p className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-slate-500 text-xs font-medium">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-200 mb-6">
                <DollarSign size={11} /> {isAr ? 'محرك الإيرادات' : 'Revenue Engine'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-5">
                {isAr ? 'حقق إيرادات أكثر من كل حجز' : 'Earn more from every booking'}
              </h2>
              <p className="text-slate-600 text-lg mb-7 leading-relaxed">
                {isAr
                  ? 'أتمتة الإضافات والترقيات ومجموعات الخدمات. اجمع المدفوعات بروابط مباشرة. أصدر فواتير متوافقة مع زاتكا بنقرة واحدة.'
                  : 'Automate upsells, upgrades, and service bundles. Collect payments with direct links. Issue ZATCA-compliant invoices with one click.'}
              </p>
              <Link href="/features/payment-collection" className="inline-flex items-center gap-2 text-[#25A4E8] font-bold hover:gap-3 transition-all text-sm">
                {isAr ? 'اكتشف محرك الإيرادات' : 'Explore Revenue Engine'} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. OWNER PORTAL ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp()}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest rounded-full border border-violet-200 mb-6">
                <Users size={11} /> {isAr ? 'بوابة المالك' : 'Owner Portal'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-5">
                {isAr ? 'شفافية كاملة لملاكك' : 'Complete transparency for your owners'}
              </h2>
              <p className="text-slate-600 text-lg mb-7 leading-relaxed">
                {isAr
                  ? 'أعطِ كل مالك بوابته الخاصة ببيانات الأداء الحية وكشوف حساب مخصصة. لن يتصلوا بك لطلب التقارير مجدداً.'
                  : "Give each owner their own branded portal with live performance data and custom statements. They'll never call asking for reports again."}
              </p>
              <div className="space-y-3 mb-8">
                {(isAr ? ['تقارير الأداء في الوقت الفعلي', 'كشوف حسابات مخصصة', 'تحكم في وصول المالك', 'فوترة مخصصة لكل مالك'] : ['Real-time performance reports', 'Custom branded statements', 'Per-owner access control', 'Branded invoicing per owner']).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className="text-[#7C69E8] shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/features/owner-portal" className="inline-flex items-center gap-2 text-[#7C69E8] font-bold hover:gap-3 transition-all text-sm">
                {isAr ? 'اكتشف بوابة المالك' : 'Explore Owner Portal'} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="bg-gradient-to-br from-[#F3F0FF] to-white rounded-3xl border border-violet-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5 p-3 bg-white rounded-xl border border-slate-100">
                <div className="w-9 h-9 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-bold text-sm">M</div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{isAr ? 'محمد العتيبي' : 'Mohammed Al-Otaibi'}</p>
                  <p className="text-[10px] text-slate-400">{isAr ? '12 وحدة — الرياض' : '12 units — Riyadh'}</p>
                </div>
                <span className="ms-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">● {isAr ? 'نشط' : 'Active'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: isAr ? 'صافي الإيرادات' : 'Net Revenue', value: 'SAR 41,200' },
                  { label: isAr ? 'معدل الإشغال' : 'Occupancy', value: '87%' },
                  { label: isAr ? 'حجوزات هذا الشهر' : 'Bookings', value: '38' },
                  { label: isAr ? 'التقييم' : 'Rating', value: '4.9 ★' },
                ].map((m, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                    <p className="font-extrabold text-[#0F172A]">{m.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-center text-slate-400">{isAr ? 'آخر تحديث: منذ دقيقتين' : 'Last updated 2 minutes ago'}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. BRANDING & DIRECT BOOKING ───────────────────── */}
      <section className="py-24 bg-[#EFF8FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()} className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-200 mb-5">
              <Sparkles size={11} /> {isAr ? 'العلامة التجارية والحجز المباشر' : 'Branding & Direct Booking'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'علامتك التجارية. حجوزاتك المباشرة.' : 'Your brand. Your direct bookings.'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {isAr
                ? 'أنشئ موقعك الخاص للحجز المباشر وتطبيق الضيوف وروابط الإحالة — بدون عمولة، بعلامتك التجارية الخاصة.'
                : 'Launch your own direct booking website, branded guest app, and referral links — commission-free, under your brand.'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Link2, title: isAr ? 'موقع الحجز المباشر' : 'Direct Booking Website', desc: isAr ? 'موقع مخصص باسمك وتصميمك لقبول الحجوزات مباشرة.' : 'A branded website to accept reservations directly.', href: '/features/direct-booking-website' },
              { icon: Smartphone, title: isAr ? 'تطبيق الضيف' : 'Guest App', desc: isAr ? 'تطبيق جوال بعلامتك التجارية لتسجيل وصول ذاتي وتواصل مع الضيف.' : 'White-label mobile app for self check-in and guest communication.', href: '/features/guest-app' },
              { icon: TrendingUp, title: isAr ? 'روابط الإحالة' : 'Referral Links', desc: isAr ? 'حوّل ضيوفك إلى سفراء لعلامتك التجارية مع تتبع كامل.' : 'Turn your guests into brand ambassadors with full tracking.', href: '/features/referral-links' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}>
                <Link href={item.href} className="group block bg-white rounded-2xl p-7 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 h-full text-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <item.icon size={22} className="text-[#25A4E8]" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2 group-hover:text-[#25A4E8] transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. INTEGRATIONS ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'يتصل بمنصاتك الحالية' : 'Connects with your existing platforms'}
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">
              {isAr ? 'كل OTA رئيسي، أقفال ذكية، بوابات دفع، وأدوات محاسبة.' : 'Every major OTA, smart locks, payment gateways, and accounting tools.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Airbnb', badge: isAr ? 'OTA' : 'OTA', color: '#FF5A5F' },
              { name: 'Booking.com', badge: isAr ? 'OTA' : 'OTA', color: '#003580' },
              { name: 'Agoda', badge: isAr ? 'OTA' : 'OTA', color: '#E3392E' },
              { name: 'Expedia', badge: isAr ? 'OTA' : 'OTA', color: '#FFC20E' },
              { name: 'Gathern', badge: isAr ? 'محلي' : 'Local', color: '#2D8653' },
              { name: 'Google Vacation Rentals', badge: isAr ? 'بحث' : 'Search', color: '#4285F4' },
            ].map((intg, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)}>
                <Link href={`/integrations/${intg.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0" style={{ backgroundColor: intg.color }}>
                    {intg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm group-hover:text-[#25A4E8] transition-colors">{intg.name}</p>
                    <span className="text-xs font-semibold" style={{ color: intg.color }}>{intg.badge}</span>
                  </div>
                  <ArrowRight size={14} className="ms-auto text-slate-300 group-hover:text-[#25A4E8] transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="mt-8 text-center">
            <Link href="/integrations" className="inline-flex items-center gap-2 text-[#25A4E8] font-bold hover:gap-3 transition-all">
              {isAr ? 'عرض جميع التكاملات' : 'View all integrations'} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 12. TESTIMONIALS ────────────────────────────────── */}
      <section className="py-24 bg-[#EFF8FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
              {isAr ? 'مشغّلون سعوديون يثقون بـ StayHub' : 'Saudi operators trust StayHub'}
            </h2>
            <p className="text-slate-500 text-lg">
              {isAr ? 'آراء حقيقية من مشغّلين حقيقيين' : 'Real feedback from real operators'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t2, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t2.rating }).map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">&ldquo;{t2.quote}&rdquo;</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-bold text-[#0F172A] text-sm">{t2.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t2.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. FAQ ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
              {isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-slate-500">
              {isAr ? 'كل ما تحتاج لمعرفته قبل البدء' : 'Everything you need to know before getting started'}
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 md:p-4">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </motion.div>
        </div>
      </section>

      {/* ── 14. FINAL CTA ───────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-[#25A4E8] to-[#7C69E8] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/30 mb-7">
              {isAr ? 'ابدأ اليوم' : 'Get started today'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              {isAr ? 'جاهز لأتمتة أعمالك؟' : 'Ready to automate your hospitality business?'}
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? 'انضم إلى أكثر من 500 مشغّل سعودي يديرون عقاراتهم بذكاء مع StayHub. لا رسوم إعداد. إلغاء في أي وقت.'
                : 'Join 500+ Saudi operators running their properties smarter with StayHub. No setup fees. Cancel anytime.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="px-10 py-4 bg-white text-[#25A4E8] font-extrabold rounded-xl hover:bg-blue-50 transition-colors shadow-2xl text-sm">
                {isAr ? 'احجز عرضاً تجريبياً مجانياً' : 'Book a Free Demo'}
              </Link>
              <Link href="/pricing" className="px-10 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-colors text-sm">
                {isAr ? 'عرض الأسعار' : 'View Pricing'}
              </Link>
            </div>
            <p className="text-white/50 text-xs mt-6">
              {isAr ? '14 يوم تجربة مجانية · لا بطاقة ائتمان مطلوبة' : '14-day free trial · No credit card required'}
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
