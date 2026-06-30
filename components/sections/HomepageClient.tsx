'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, type CSSProperties, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight, Globe, Shield, MessageSquare, BarChart2, CreditCard,
  Brush, Link2, Calendar, CheckCircle2, Star, Zap, TrendingUp,
  Lock, Users, DollarSign, Smartphone, Building2, ChevronDown,
  CalendarCheck, BadgeCheck, Banknote, Sparkles, RefreshCw,
  ChevronLeft, ChevronRight, X, Flag,
  Layers, AlertTriangle, Phone, FileText, MessageCircle, BarChart3,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

/* ─── data ─────────────────────────────────────────────── */

const AUTOMATION_STEPS_EN = [
  { num: '01', title: 'Booking received',    desc: 'Reservations flow into StayHub from every channel.',      color: '#0aad7a', bg: 'rgba(10,173,122,0.12)' },
  { num: '02', title: 'Guest messaging',     desc: 'WhatsApp and SMS are sent at key moments.',               color: '#14c7c4', bg: 'rgba(20,199,196,0.12)' },
  { num: '03', title: 'Identity verified',   desc: 'Guests verify through Absher before check-in.',           color: '#1473f2', bg: 'rgba(20,115,242,0.12)' },
  { num: '04', title: 'Payment collected',   desc: 'Paylinks and virtual cards secure the stay.',             color: '#4f33eb', bg: 'rgba(79,51,235,0.12)'  },
  { num: '05', title: 'Access granted',      desc: 'Smart-lock access codes are created automatically.',      color: '#ff851c', bg: 'rgba(255,133,28,0.12)' },
  { num: '06', title: 'Task created',        desc: 'Housekeeping starts after checkout.',                     color: '#0aad7a', bg: 'rgba(10,173,122,0.12)' },
  { num: '07', title: 'Review requested',    desc: 'Guests receive a follow-up to improve ratings.',          color: '#f04580', bg: 'rgba(240,69,128,0.12)' },
];
const AUTOMATION_STEPS_AR = [
  { num: '01', title: 'استلام الحجز',        desc: 'تصل الحجوزات إلى StayHub من كل قناة.',                   color: '#0aad7a', bg: 'rgba(10,173,122,0.12)' },
  { num: '02', title: 'مراسلة الضيف',        desc: 'تُرسَل رسائل واتساب وSMS في اللحظات الحرجة.',            color: '#14c7c4', bg: 'rgba(20,199,196,0.12)' },
  { num: '03', title: 'التحقق من الهوية',    desc: 'يتحقق الضيوف عبر أبشر قبل تسجيل الوصول.',               color: '#1473f2', bg: 'rgba(20,115,242,0.12)'  },
  { num: '04', title: 'تحصيل الدفع',         desc: 'تربط روابط الدفع والبطاقات الافتراضية الإقامة.',          color: '#4f33eb', bg: 'rgba(79,51,235,0.12)'  },
  { num: '05', title: 'منح الوصول',          desc: 'تُنشأ رموز الأقفال الذكية تلقائياً.',                    color: '#ff851c', bg: 'rgba(255,133,28,0.12)' },
  { num: '06', title: 'إنشاء المهمة',        desc: 'يبدأ التنظيف بعد تسجيل المغادرة.',                      color: '#0aad7a', bg: 'rgba(10,173,122,0.12)' },
  { num: '07', title: 'طلب التقييم',         desc: 'يتلقى الضيوف متابعة لتحسين التقييمات.',                  color: '#f04580', bg: 'rgba(240,69,128,0.12)' },
];

const OUTCOMES_EN = [
  { title: 'Save time',        desc: 'Reduce manual work by up to 80%' },
  { title: 'Increase revenue', desc: 'More bookings and upsells' },
  { title: 'Delight guests',   desc: 'Faster responses and smoother check-ins' },
  { title: 'Stay compliant',   desc: 'Digital records for every reservation' },
];
const OUTCOMES_AR = [
  { title: 'توفير الوقت',      desc: 'تقليل العمل اليدوي حتى 80%' },
  { title: 'زيادة الإيرادات',  desc: 'المزيد من الحجوزات والبيع الإضافي' },
  { title: 'إسعاد الضيوف',     desc: 'ردود أسرع وتسجيل وصول أكثر سلاسة' },
  { title: 'البقاء ملتزماً',   desc: 'سجلات رقمية لكل حجز' },
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

/* 3D-tilt card: follows the cursor with perspective + spring, lifts on hover.
   Children with `data-depth` (or a translateZ style) parallax forward in 3D. */
function TiltCard({
  delay = 0,
  className = '',
  style,
  children,
}: {
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

/* ─── 3-D glassy feature card ───────────────────────────── */
type Feature = (typeof FEATURES_EN)[0];

function FeatureCard3D({ f, isAr }: { f: Feature; isAr: boolean }) {
  const ref   = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered]   = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const nx = (e.clientX - left) / width  - 0.5;   // −0.5 … 0.5
    const ny = (e.clientY - top)  / height - 0.5;
    setTilt({ x: -ny * 16, y: nx * 16 });
  };

  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="shrink-0 w-[272px]"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.05) translateZ(12px)' : 'scale(1)'}`,
        transition: hovered ? 'transform 0.08s linear' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
        willChange: 'transform',
      }}
    >
      <Link
        href={f.href}
        className="flex flex-col h-full min-h-[250px] rounded-2xl p-7 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(246,248,255,0.88) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: hovered ? `1.5px solid ${f.color}40` : '1.5px solid rgba(226,232,240,0.9)',
          boxShadow: hovered
            ? `0 24px 64px ${f.color}22, 0 8px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.95)`
            : '0 2px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          transition: 'border 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Glossy top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
        {/* Glass sheen upper-left */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-2xl" />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${f.color}18 0%, ${f.color}08 100%)`,
            transform: hovered ? 'scale(1.12) translateZ(4px)' : 'scale(1)',
            color: f.color,
          }}
        >
          <f.icon size={24} />
        </div>

        {/* Category */}
        <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400 mb-2 block relative z-10">
          {f.cat}
        </span>

        {/* Title */}
        <h3
          className="font-bold mb-3 text-base leading-snug relative z-10 transition-colors duration-200"
          style={{ color: hovered ? f.color : '#0F172A' }}
        >
          {f.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed flex-1 relative z-10">{f.desc}</p>

        {/* Learn more */}
        <div
          className="mt-5 flex items-center gap-1.5 text-[11px] font-bold relative z-10 transition-all duration-250"
          style={{ opacity: hovered ? 1 : 0, color: f.color, transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
        >
          {isAr ? 'اكتشف المزيد' : 'Learn more'} <ArrowRight size={11} />
        </div>
      </Link>
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
  const { openModal } = useDemoModal();
  const [activeTab, setActiveTab] = useState<DashTab>(0);
  const tabs = isAr ? DASH_TABS_AR : DASH_TABS_EN;
  const inboxMsgs = isAr ? INBOX_MSGS_AR : INBOX_MSGS;

  return (
    <section className="py-24 bg-gradient-to-br from-[#0F172A] to-[#1E2D4E]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
            <button onClick={openModal} className="inline-flex items-center gap-2 px-6 py-3 bg-[#25A4E8] text-white font-bold rounded-xl hover:bg-[#1A8FD1] transition-all shadow-lg shadow-blue-500/30 text-sm">
              {isAr ? 'شاهد العرض التوضيحي' : 'See it in action'} <ArrowRight size={14} />
            </button>
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
                          <p className="inline-flex items-center gap-0.5 text-[#25A4E8] text-[10px] font-bold">{m.delta}<TrendingUp size={10} /></p>
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

/* ─── Hero 3D floating card ─────────────────────────────── */
type StepData = { num: string; title: string; desc: string; color: string; bg: string };

function HeroCard3D({
  step, floatDuration = 3.5, floatDelay = 0, entryDelay = 0, className = '',
}: {
  step: StepData; floatDuration?: number; floatDelay?: number; entryDelay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const nx = (e.clientX - left) / width - 0.5;
    const ny = (e.clientY - top) / height - 0.5;
    setTilt({ x: -ny * 20, y: nx * 20 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: hovered ? -4 : [0, -9, 0], scale: hovered ? 1.04 : 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.92 }}
      transition={{
        opacity:  { duration: 0.45, delay: entryDelay },
        scale:    { duration: 0.25 },
        y: hovered
          ? { duration: 0.25 }
          : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.08s linear' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
        boxShadow: hovered
          ? `0 20px 60px ${step.color}30, 0 8px 20px rgba(0,0,0,0.12)`
          : '0 8px 32px rgba(0,0,0,0.10)',
        willChange: 'transform',
      }}
      className={`bg-white rounded-2xl p-4 border border-white/80 cursor-default select-none ${className}`}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shrink-0" style={{ backgroundColor: step.bg }}>
        <span className="text-base font-extrabold leading-none" style={{ color: step.color }}>{step.num}</span>
      </div>
      <p className="font-bold text-[#0F172A] text-[13.5px] leading-snug mb-1.5">{step.title}</p>
      <p className="text-slate-400 text-[11.5px] leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

/* ─── main component ────────────────────────────────────── */

export default function HomepageClient() {
  const { t, isAr } = useLanguage();
  const { openModal } = useDemoModal();
  const features = isAr ? FEATURES_AR : FEATURES_EN;

  /* ── Feature carousel ── */
  const featureTrackRef = useRef<HTMLDivElement>(null);
  const isPausedRef     = useRef(false);

  const scrollFeatures = (dir: 'left' | 'right') => {
    const el = featureTrackRef.current;
    if (!el) return;
    if (dir === 'right') {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 60) {
        // seamless loop: jump to start instantly, then continue
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = 0;
        requestAnimationFrame(() => { el.style.scrollBehavior = ''; });
      } else {
        el.scrollBy({ left: 310, behavior: 'smooth' });
      }
    } else {
      el.scrollBy({ left: -310, behavior: 'smooth' });
    }
  };

  /* auto-scroll every 3.2 s, pauses on hover */
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedRef.current) scrollFeatures('right');
    }, 3200);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* ── Hero background video — plays full duration then switches (3-video loop) ── */
  const [bgVideo, setBgVideo] = useState(0); // 0 = hero_video_1, 1 = hero_2_banner, 2 = hero_video_3
  const bgVid1Ref = useRef<HTMLVideoElement>(null);
  const bgVid2Ref = useRef<HTMLVideoElement>(null);
  const bgVid3Ref = useRef<HTMLVideoElement>(null);

  // When active video changes, reset that video to start and play it
  useEffect(() => {
    const refs = [bgVid1Ref, bgVid2Ref, bgVid3Ref];
    const active = refs[bgVideo]?.current;
    if (active) { active.currentTime = 0; active.play(); }
  }, [bgVideo]);

  /* ── Hero slider ── */
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroDir, setHeroDir] = useState(1);
  const heroTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const HERO_SLIDES = [
    {
      badge:   { en: "Saudi Arabia's Smart Hospitality Platform", ar: 'منصة الضيافة الذكية في السعودية' },
      h1En: (<>Run Your Entire<br />Hospitality Business<br />From{' '}<span className="bg-gradient-to-r from-[#25A4E8] to-[#7C69E8] bg-clip-text text-transparent relative inline-block">One Platform<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      h1Ar: (<>أدِر أعمالك في الضيافة<br />بالكامل من{' '}<span className="bg-gradient-to-r from-[#25A4E8] to-[#7C69E8] bg-clip-text text-transparent relative inline-block">منصة واحدة<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      sub:  { en: 'Manage bookings, guests, pricing, smart locks, housekeeping, reviews and payments across Airbnb, Booking.com and direct channels.', ar: 'إدارة الحجوزات والضيوف والأسعار والأقفال الذكية والتنظيف والتقييمات والمدفوعات عبر Airbnb وBooking.com والقنوات المباشرة.' },
      cta2: { en: 'Watch Platform Tour', ar: 'شاهد جولة المنصة' },
    },
    {
      badge:   { en: 'Full Guest Journey Automation', ar: 'أتمتة رحلة الضيف بالكامل' },
      h1En: (<>Automate Every Step<br />of the{' '}<span className="bg-gradient-to-r from-[#10B981] to-[#25A4E8] bg-clip-text text-transparent relative inline-block">Guest Journey<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      h1Ar: (<>أتمت كل خطوة في<br /><span className="bg-gradient-to-r from-[#10B981] to-[#25A4E8] bg-clip-text text-transparent relative inline-block">رحلة الضيف<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      sub:  { en: 'From booking confirmation to checkout — StayHub handles messaging, ID verification, access codes, housekeeping tasks, and review requests on autopilot.', ar: 'من تأكيد الحجز حتى تسجيل المغادرة — يتولى StayHub الرسائل والتحقق من الهوية ورموز الوصول ومهام التنظيف وطلبات التقييم تلقائياً.' },
      cta2: { en: 'Explore Features', ar: 'استكشف الميزات' },
    },
    {
      badge:   { en: 'Built for Saudi Arabia', ar: 'مبني للسوق السعودي' },
      h1En: (<>Built for Saudi Arabia's<br /><span className="bg-gradient-to-r from-[#7C69E8] to-[#25A4E8] bg-clip-text text-transparent relative inline-block">Hospitality Market<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      h1Ar: (<>مبني لسوق الضيافة<br /><span className="bg-gradient-to-r from-[#7C69E8] to-[#25A4E8] bg-clip-text text-transparent relative inline-block">في المملكة العربية السعودية<span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#bef264]" /></span></>),
      sub:  { en: 'ZATCA-compliant invoicing, Absher ID verification, Ejar contracts, Gathern and AQAR integration — everything your Saudi property business needs to scale.', ar: 'فوترة متوافقة مع زاتكا، تحقق عبر أبشر، عقود إيجار، تكامل غثرن وعقار — كل ما تحتاجه للنمو في السوق السعودي.' },
      cta2: { en: 'View Integrations', ar: 'عرض التكاملات' },
    },
  ];

  const goToSlide = (idx: number) => {
    setHeroDir(idx > heroSlide ? 1 : -1);
    setHeroSlide(idx);
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    heroTimerRef.current = setInterval(() => nextHeroSlide(), 5000);
  };
  const nextHeroSlide = () => {
    setHeroDir(1);
    setHeroSlide(s => (s + 1) % 3);
  };
  const prevHeroSlide = () => {
    setHeroDir(-1);
    setHeroSlide(s => (s + 2) % 3);
  };

  useEffect(() => {
    heroTimerRef.current = setInterval(() => {
      setHeroDir(1);
      setHeroSlide(s => (s + 1) % 3);
    }, 5000);
    return () => { if (heroTimerRef.current) clearInterval(heroTimerRef.current); };
  }, []);

  const automationSteps = isAr ? AUTOMATION_STEPS_AR : AUTOMATION_STEPS_EN;
  const outcomes = isAr ? OUTCOMES_AR : OUTCOMES_EN;
  const compliance = isAr ? COMPLIANCE_ITEMS_AR : COMPLIANCE_ITEMS_EN;
  const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_EN;
  const faqs = isAr ? FAQS_AR : FAQS_EN;

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative flex items-center bg-white overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

        {/* Right-side bg panel — two videos always mounted, opacity toggled per slide */}
        <div
          className={`absolute inset-y-0 ${isAr ? 'left-0 rounded-[0_80px_80px_0]' : 'right-0 rounded-[80px_0_0_80px]'} w-[58%] pointer-events-none hidden md:block overflow-hidden`}
        >
          {/* Video 1 → hands off to Video 2 */}
          <video
            ref={bgVid1Ref}
            src="/hero_video_1.mp4"
            autoPlay muted playsInline
            onEnded={() => setBgVideo(1)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: bgVideo === 0 ? 1 : 0 }}
          />
          {/* Video 2 → hands off to Video 3 */}
          <video
            ref={bgVid2Ref}
            src="/hero_2_banner.mp4"
            autoPlay muted playsInline
            onEnded={() => setBgVideo(2)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: bgVideo === 1 ? 1 : 0 }}
          />
          {/* Video 3 → hands off back to Video 1 */}
          <video
            ref={bgVid3Ref}
            src="/hero_video_3.mp4"
            autoPlay muted playsInline
            onEnded={() => setBgVideo(0)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: bgVideo === 2 ? 1 : 0 }}
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* ── Marquee strip — bottom of video ── */}
          <div className="absolute bottom-10 inset-x-0 overflow-hidden pointer-events-auto">
            {/* Fade masks */}
            <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.6), transparent)' }} />

            {/* Scrolling track — cards duplicated for perfectly seamless loop */}
            <div className="flex gap-3 animate-marquee" style={{ width: 'max-content' }}>
              {[...( isAr ? AUTOMATION_STEPS_AR : AUTOMATION_STEPS_EN), ...( isAr ? AUTOMATION_STEPS_AR : AUTOMATION_STEPS_EN)].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shrink-0 border border-white/60 shadow-lg hover:bg-white hover:shadow-xl hover:scale-[1.03] transition-all duration-200 cursor-default"
                  style={{ width: '190px' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: step.bg }}>
                    <span className="text-[11px] font-extrabold" style={{ color: step.color }}>{step.num}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#0F172A] text-[12px] leading-tight mb-1">{step.title}</p>
                    <p className="text-slate-500 text-[10.5px] leading-snug line-clamp-2">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── MOBILE: full-screen background video + overlaid hero ── */}
        <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden">
          <video
            src="/hero_video_1.mp4"
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        </div>

        <div className={`md:hidden relative z-10 w-full px-6 ${isAr ? 'text-right' : 'text-left'}`}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold rounded-full border border-white/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            {isAr ? HERO_SLIDES[0].badge.ar : HERO_SLIDES[0].badge.en}
          </span>

          <h1 className="text-[34px] leading-[1.14] font-extrabold text-white tracking-tight mb-4">
            {isAr ? HERO_SLIDES[0].h1Ar : HERO_SLIDES[0].h1En}
          </h1>

          <p className="text-white/80 text-[15px] leading-relaxed mb-8 max-w-[340px]">
            {isAr ? HERO_SLIDES[0].sub.ar : HERO_SLIDES[0].sub.en}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={openModal}
              className={`inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-500/30`}
            >
              {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
              <ArrowRight size={15} className={isAr ? 'rotate-180' : ''} />
            </button>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2.5 w-full px-7 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-bold rounded-xl text-sm transition-all hover:bg-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <div className="w-0 h-0 border-l-[7px] border-l-white border-y-[4.5px] border-y-transparent ms-0.5" />
              </div>
              {isAr ? 'شاهد جولة المنصة' : 'Watch Platform Tour'}
            </button>
          </div>
        </div>

        <div className="hidden md:block relative max-w-[1400px] mx-auto px-4 md:px-8 w-full">
          <div className={`grid lg:grid-cols-[42%_58%] md:grid-cols-2 gap-6 lg:gap-10 items-center h-full`}>

            {/* ── LEFT: slider ── */}
            <div className={`${isAr ? 'text-right' : 'text-left'} order-2 md:order-1 flex flex-col`}>

              {/* Slide content — badge + headline + subtext only */}
              <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
                <AnimatePresence mode="wait" custom={heroDir}>
                  <motion.div
                    key={heroSlide}
                    custom={heroDir}
                    variants={{
                      enter:  (d: number) => ({ opacity: 0, x: d * 48 }),
                      center: { opacity: 1, x: 0 },
                      exit:   (d: number) => ({ opacity: 0, x: d * -48 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f0fdf4] text-[#15803d] text-[11px] font-bold rounded-full border border-[#bbf7d0] mb-7">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                      {isAr ? HERO_SLIDES[heroSlide].badge.ar : HERO_SLIDES[heroSlide].badge.en}
                    </span>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-5">
                      {isAr ? HERO_SLIDES[heroSlide].h1Ar : HERO_SLIDES[heroSlide].h1En}
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-slate-500 text-sm md:text-base max-w-[360px] leading-relaxed">
                      {isAr ? HERO_SLIDES[heroSlide].sub.ar : HERO_SLIDES[heroSlide].sub.en}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── CTAs — frozen (outside AnimatePresence) ── */}
              <div className={`flex items-center gap-4 mt-8 flex-wrap ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 hover:scale-[1.02]"
                >
                  {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-white border border-slate-200 hover:border-slate-300 text-[#0F172A] font-bold rounded-xl text-sm transition-all hover:shadow-md"
                >
                  <div className="w-6 h-6 rounded-full bg-[#25A4E8]/10 flex items-center justify-center shrink-0">
                    <div className="w-0 h-0 border-l-[7px] border-l-[#25A4E8] border-y-[4.5px] border-y-transparent ms-0.5" />
                  </div>
                  {isAr ? 'شاهد جولة المنصة' : 'Watch Platform Tour'}
                </button>
              </div>

              {/* ── Slider controls ── */}
              <div className={`flex items-center gap-5 mt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                {/* Arrows */}
                <button
                  onClick={() => { prevHeroSlide(); }}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-[#25A4E8] flex items-center justify-center transition-all shadow-sm group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} className="text-slate-500 group-hover:text-[#25A4E8] transition-colors" />
                </button>
                <button
                  onClick={() => { nextHeroSlide(); }}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-[#25A4E8] flex items-center justify-center transition-all shadow-sm group"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-[#25A4E8] transition-colors" />
                </button>

                {/* Dot indicators */}
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  {[0, 1, 2].map(i => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`rounded-full transition-all duration-300 ${heroSlide === i ? 'w-6 h-2.5 bg-[#25A4E8]' : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>


            </div>

            {/* ── RIGHT: empty — marquee is inside the bg panel ── */}
            <div className="hidden md:block order-1 md:order-2 h-[600px]" />

          </div>
        </div>
      </section>

      {/* ── 3. PROBLEM SECTION ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#F4F3FB] to-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Title */}
          <motion.div {...fadeUp()} className="mb-12 text-start">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-[1.08] max-w-2xl">
              {isAr
                ? 'إدارة عقاراتك يجب ألا تكون هكذا'
                : "Managing your rentals shouldn't feel like this"}
            </h2>
            <div className="mt-5 h-1.5 w-24 rounded-full bg-[#7C69E8]" />
          </motion.div>

          {/* ── Bento grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">

            {/* Card 1 — 5+ apps (wide) */}
            <TiltCard
              delay={0.05}
              className="sm:col-span-2 lg:col-span-6 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              {/* icon */}
              <div className="absolute top-6 start-6 lg:top-7 lg:start-7 w-12 h-12 rounded-full bg-[#F1F0FA] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <Layers size={22} className="text-[#7C69E8]" strokeWidth={1.75} />
              </div>
              {/* app pills */}
              <div className={`absolute top-7 ${isAr ? 'left-6' : 'right-6'} flex flex-col gap-2 items-stretch z-10 w-[180px]`} style={{ transform: 'translateZ(60px)' }}>
                {[
                  { name: 'Airbnb',      initial: 'A', color: '#FF5A5F' },
                  { name: 'Booking.com', initial: 'B', color: '#1D4ED8' },
                  { name: 'WhatsApp',    initial: 'W', color: '#25D366' },
                  { name: 'Excel',       initial: 'X', color: '#107C41' },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5 bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-sm">
                    <span className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ backgroundColor: a.color }}>{a.initial}</span>
                    <span className="text-[12px] font-bold" style={{ color: a.color }}>{a.name}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">{isAr ? '+5 علامات أخرى' : '+5 more tabs'}</span>
                </div>
              </div>
              {/* text */}
              <div className="mt-auto relative z-10 max-w-[230px]" style={{ transform: 'translateZ(28px)' }}>
                <span className="inline-flex w-7 h-7 rounded-lg bg-red-50 text-red-500 items-center justify-center mb-3"><X size={15} strokeWidth={2.5} /></span>
                <p className="font-bold text-[#0F172A] text-[17px] leading-snug">
                  {isAr ? '5 تطبيقات مفتوحة في نفس الوقت' : '5+ apps open at all times'}
                </p>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                  {isAr ? 'تبديل مستمر بين منصات متعددة يومياً' : 'Constant switching between platforms every day'}
                </p>
              </div>
            </TiltCard>

            {/* Card 2 — double bookings */}
            <TiltCard
              delay={0.1}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              <div className="absolute top-6 start-6 w-12 h-12 rounded-full bg-[#F1F0FA] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <Calendar size={20} className="text-[#F59E0B]" strokeWidth={1.75} />
              </div>
              {/* mini calendar + warning */}
              <div className={`absolute top-6 ${isAr ? 'left-5' : 'right-5'} z-10`} style={{ transform: 'translateZ(55px)' }}>
                <div className="w-[112px] rounded-xl bg-white border border-slate-100 shadow-md p-2.5">
                  <div className="h-1.5 w-2/3 rounded-full bg-slate-100 mb-2" />
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className={`h-3.5 rounded-[3px] ${i === 6 || i === 7 || i === 12 ? 'bg-red-400' : 'bg-slate-100'}`} />
                    ))}
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute -bottom-2.5 ${isAr ? '-left-2.5' : '-right-2.5'} w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30`}
                >
                  <AlertTriangle size={15} className="text-white" strokeWidth={2.5} />
                </motion.div>
              </div>
              <p className="mt-auto relative z-10 font-bold text-[#0F172A] text-[16px] leading-snug" style={{ transform: 'translateZ(25px)' }}>
                {isAr ? 'حجوزات مزدوجة من منصات غير متزامنة' : 'Double bookings from out-of-sync channels'}
              </p>
            </TiltCard>

            {/* Card 3 — WhatsApp chaos */}
            <TiltCard
              delay={0.15}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              <div className="absolute top-6 start-6 w-12 h-12 rounded-full bg-[#EBF9F0] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <MessageCircle size={20} className="text-[#25D366]" strokeWidth={1.75} />
              </div>
              {/* chat bubbles */}
              <div className={`absolute top-7 ${isAr ? 'left-5' : 'right-5'} flex flex-col gap-2 z-10 w-[150px]`} style={{ transform: 'translateZ(55px)' }}>
                <div className="flex items-end gap-1.5 self-start">
                  <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0"><Users size={11} className="text-slate-400" /></span>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-3 py-2 space-y-1">
                    <div className="h-1.5 w-16 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-10 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="bg-[#DCF8C6] rounded-2xl rounded-br-sm px-3 py-2 space-y-1 self-end">
                  <div className="h-1.5 w-14 rounded-full bg-[#a3d98e]" />
                  <div className="h-1.5 w-8 rounded-full bg-[#a3d98e]" />
                </div>
                <div className="flex items-end gap-1.5 self-start">
                  <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0"><Users size={11} className="text-slate-400" /></span>
                  <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: d }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-auto relative z-10 font-bold text-[#0F172A] text-[16px] leading-snug" style={{ transform: 'translateZ(25px)' }}>
                {isAr ? 'رسائل واتساب لا تنتهي مع فريق التنظيف' : 'Endless WhatsApp threads with cleaning teams'}
              </p>
            </TiltCard>

            {/* Card 4 — owners calling */}
            <TiltCard
              delay={0.2}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              <div className="absolute top-6 start-6 w-12 h-12 rounded-full bg-[#F1F0FA] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <Phone size={20} className="text-[#7C69E8]" strokeWidth={1.75} />
              </div>
              {/* phone + call waves */}
              <div className={`absolute top-7 ${isAr ? 'left-7' : 'right-7'} z-10`} style={{ transform: 'translateZ(55px)' }}>
                <div className="relative w-[84px] h-[84px] flex items-center justify-center">
                  <motion.span
                    className="absolute w-[84px] h-[84px] rounded-full border border-[#7C69E8]/30"
                    animate={{ scale: [0.7, 1.05], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="absolute w-[58px] h-[58px] rounded-full border border-[#7C69E8]/40"
                    animate={{ scale: [0.7, 1.05], opacity: [0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  />
                  <div className="relative w-12 h-[88px] rounded-[14px] bg-[#0F172A] p-1.5 shadow-xl">
                    <div className="w-full h-full rounded-[10px] bg-slate-800 flex flex-col items-center justify-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center"><Users size={11} className="text-slate-300" /></span>
                      <div className="h-1 w-6 rounded-full bg-slate-600" />
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#7C69E8] flex items-center justify-center shadow-lg shadow-[#7C69E8]/40">
                      <Phone size={12} className="text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-auto relative z-10 font-bold text-[#0F172A] text-[16px] leading-snug" style={{ transform: 'translateZ(25px)' }}>
                {isAr ? 'ملاك يتصلون لطلب تقارير الأداء' : 'Owners calling to ask for performance reports'}
              </p>
            </TiltCard>

            {/* Card 5 — ZATCA invoices */}
            <TiltCard
              delay={0.25}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              <div className="absolute top-6 start-6 w-12 h-12 rounded-full bg-[#F1F0FA] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <FileText size={20} className="text-[#7C69E8]" strokeWidth={1.75} />
              </div>
              {/* invoice card */}
              <div className={`absolute top-6 ${isAr ? 'left-5' : 'right-5'} w-[112px] rounded-xl bg-white border border-slate-100 shadow-md p-3 z-10`} style={{ transform: 'translateZ(55px)' }}>
                <p className="text-[8px] font-black tracking-[0.15em] text-slate-400 mb-2">INVOICE</p>
                <div className="space-y-1.5 mb-2.5">
                  <div className="h-1.5 w-full rounded-full bg-slate-100" />
                  <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
                  <div className="h-1.5 w-1/2 rounded-full bg-slate-100" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-black text-[#0F172A]">$ —</span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded-md"><CheckCircle2 size={9} />ZATCA</span>
                </div>
              </div>
              <p className="mt-auto relative z-10 font-bold text-[#0F172A] text-[16px] leading-snug" style={{ transform: 'translateZ(25px)' }}>
                {isAr ? 'فواتير يدوية غير متوافقة مع زاتكا' : 'Manual invoices not compliant with ZATCA'}
              </p>
            </TiltCard>

            {/* Card 6 — no visibility */}
            <TiltCard
              delay={0.3}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(17,12,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(124,105,232,0.22)] hover:border-[#D7D0F5] p-6 lg:p-7 min-h-[240px] flex flex-col"
            >
              <div className="absolute top-6 start-6 w-12 h-12 rounded-full bg-[#F1F0FA] flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(40px)' }}>
                <BarChart3 size={20} className="text-[#25A4E8]" strokeWidth={1.75} />
              </div>
              {/* perf card */}
              <div className={`absolute top-6 ${isAr ? 'left-5' : 'right-5'} w-[124px] rounded-xl bg-white border border-slate-100 shadow-md p-3 z-10`} style={{ transform: 'translateZ(55px)' }}>
                <svg viewBox="0 0 100 38" className="w-full h-9">
                  <motion.polyline
                    fill="none" stroke="#7C69E8" strokeWidth="2.5" points="2,30 22,24 42,27 62,15 82,11 98,4" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
                  />
                  <circle cx="98" cy="4" r="3" fill="#7C69E8" />
                </svg>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-[8px] text-slate-400 font-semibold leading-none mb-0.5">{isAr ? 'الإشغال' : 'Occupancy'}</p>
                    <p className="text-[13px] font-black text-[#0F172A] leading-none">62%</p>
                  </div>
                  <div className="w-7 h-7 rounded-full" style={{ background: 'conic-gradient(#7C69E8 62%, #E9E7F8 0)' }} />
                </div>
              </div>
              <p className="mt-auto relative z-10 font-bold text-[#0F172A] text-[16px] leading-snug" style={{ transform: 'translateZ(25px)' }}>
                {isAr ? 'لا رؤية في الوقت الفعلي لأداء العقارات' : 'No real-time visibility into property performance'}
              </p>
            </TiltCard>

            {/* Card 7 — promo */}
            <TiltCard
              delay={0.35}
              className="lg:col-span-3 group relative overflow-hidden rounded-3xl p-7 min-h-[240px] flex flex-col justify-between shadow-[0_8px_30px_rgba(124,105,232,0.18)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(124,105,232,0.4)]"
              style={{ background: 'linear-gradient(150deg,#CFC9F5 0%,#B7AAF0 100%)' }}
            >
              <div className="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-white/25 blur-xl pointer-events-none" />
              <motion.div
                className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur flex items-center justify-center relative z-10"
                style={{ transform: 'translateZ(50px)' }}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={22} className="text-[#5b46c9]" />
              </motion.div>
              <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <p className="font-extrabold text-[#1a1550] text-[17px] leading-snug mb-4">
                  {isAr
                    ? '«StayHub» — هو المنصة التي تحل جميع هذه المشاكل وتحقق النتائج.'
                    : '"StayHub" — the platform that solves all of this and delivers results.'}
                </p>
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#0F172A] text-white font-bold rounded-full text-sm hover:bg-[#1e293b] transition-colors"
                >
                  {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Free Demo'}
                  <ArrowRight size={15} className={isAr ? 'rotate-180' : ''} />
                </button>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* ── 4. AUTOMATION WORKFLOW ──────────────────────────── */}
      <section className="py-20 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #121447 0%, #4733c7 100%)' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* ── Header row: headline + integration panel ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-12">

            {/* Left: label + headline + subtitle */}
            <motion.div {...fadeUp(0)} className="flex-1">
              <p className="text-[#14c7c4] text-xs font-extrabold uppercase tracking-widest mb-4">
                {isAr ? 'تدفق الأتمتة' : 'AUTOMATION FLOW'}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 max-w-2xl">
                {isAr
                  ? 'من الحجز إلى تسجيل المغادرة، كل خطوة تسير من تلقاء نفسها.'
                  : 'From booking to checkout, every step can run itself.'}
              </h2>
              <p className="text-[#d6e0ff] text-lg leading-relaxed max-w-xl">
                {isAr
                  ? 'يربط StayHub الرسائل والتحقق والمدفوعات والأقفال الذكية والتنظيف وطلبات التقييم في رحلة ضيف متواصلة.'
                  : 'StayHub connects messages, verification, payments, smart locks, housekeeping, and review requests into one continuous guest journey.'}
              </p>
            </motion.div>

            {/* Right: integration chip panel */}
            <motion.div
              {...fadeUp(0.12)}
              className="shrink-0 w-full lg:w-[360px] bg-white/10 border border-white/18 rounded-xl p-6"
            >
              <p className="text-white font-bold text-lg mb-4">
                {isAr ? 'تكاملات قوية' : 'Powerful integrations'}
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2 flex-wrap">
                  {/* WhatsApp text chip */}
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-[#0aad7a]">
                    <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={14} height={14} className="shrink-0" />
                    {isAr ? 'واتساب' : 'WhatsApp'}
                  </span>
                  <span className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-[#14c7c4]">SMS</span>
                  {/* Tuya logo chip */}
                  <span className="flex items-center px-2 py-2 bg-white/90 rounded-lg">
                    <Image src="/logos/tuya.webp" alt="Tuya" width={64} height={28} className="object-contain h-7 w-auto" />
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* TTLock logo chip */}
                  <span className="flex items-center px-2 py-2 bg-white/90 rounded-lg">
                    <Image src="/logos/ttlock.webp" alt="TTLock" width={80} height={28} className="object-contain h-7 w-auto" />
                  </span>
                  <span className="px-3 py-1.5 bg-white/90 rounded-lg text-xs font-semibold text-[#14c7c4]">ANB</span>
                  {/* Absher logo */}
                  <span className="flex items-center px-2 py-2 bg-white/90 rounded-lg">
                    <Image src="/logos/absher.png" alt="Absher" width={80} height={28} className="object-contain h-7 w-auto" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 7 step cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {automationSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="relative bg-white rounded-xl p-4 flex flex-col gap-3 border border-[#d6def0] cursor-default group overflow-hidden"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                {/* Hover colour wash */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${step.bg} 0%, transparent 70%)` }}
                />

                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 0 0 1.5px ${step.color}55, 0 8px 32px ${step.color}30` }}
                />

                {/* Numbered icon */}
                <motion.div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 relative z-10 transition-transform duration-300"
                  style={{ backgroundColor: step.bg }}
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                >
                  <span className="text-lg font-extrabold leading-none" style={{ color: step.color }}>
                    {step.num}
                  </span>
                </motion.div>

                <p className="font-bold text-[#081133] text-[15px] leading-snug relative z-10 group-hover:transition-colors duration-200" style={{ color: undefined }}>
                  {step.title}
                </p>
                <p className="text-[#5c6687] text-[12px] leading-relaxed relative z-10">{step.desc}</p>

                {/* Arrow connector (hidden on last card) */}
                {i < automationSteps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-[7px] top-1/2 -translate-y-1/2 z-20 w-3.5 h-3.5 rounded-full border-2 items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: 'white', borderColor: step.color + '80' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: step.color }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Outcome rail ── */}
          <motion.div
            {...fadeUp(0.4)}
            className="bg-white/10 border border-white/16 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {outcomes.map((outcome, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(20,199,196,0.12)]">
                  <CheckCircle2 size={22} className="text-[#14c7c4]" />
                </div>
                <div>
                  <p className="font-bold text-white text-base leading-snug">{outcome.title}</p>
                  <p className="text-[#d6deff] text-[13px] leading-snug mt-0.5">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 5. FEATURE ECOSYSTEM — glassy carousel ──────────── */}
      <section className="py-24 relative"
        style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF8FF 45%, #F0F4FF 100%)', overflow: 'clip' }}>
        {/* Ambient blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C69E8, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #25A4E8, transparent 70%)' }} />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8">

          {/* Header row: badge + title + arrows */}
          <motion.div {...fadeUp()} className={`flex flex-col md:flex-row md:items-end gap-6 justify-between mb-12 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className={isAr ? 'text-right' : ''}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-100 text-violet-700 border border-violet-200 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {isAr ? 'منظومة المميزات' : 'Feature Ecosystem'}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-3">
                {isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything you need, in one place'}
              </h2>
              <p className="text-slate-500 text-base max-w-xl">
                {isAr ? 'لا تكامل خارجي. لا بيانات متفرقة. منصة واحدة متكاملة.' : 'No external stitching. No fragmented data. One integrated platform.'}
              </p>
            </div>

            {/* Arrow controls */}
            <div className={`flex items-center gap-3 shrink-0 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Link href="/features" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-[#25A4E8] hover:gap-2.5 transition-all me-4">
                {isAr ? 'عرض الكل' : 'View all'} <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => scrollFeatures(isAr ? 'right' : 'left')}
                className="w-11 h-11 rounded-full border-2 border-white/70 bg-white/60 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:border-[#25A4E8] hover:text-[#25A4E8] transition-all shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollFeatures(isAr ? 'left' : 'right')}
                className="w-11 h-11 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-[#25A4E8] transition-all shadow-lg shadow-slate-900/20"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Track wrapper */}
          <div className="relative"
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
          >
            {/* Edge fades — subtle, won't cover hovered cards */}
            <div className={`absolute ${isAr ? 'right-0' : 'left-0'} top-0 bottom-0 w-10 z-10 pointer-events-none`}
              style={{ background: isAr ? 'linear-gradient(to left, #F5F3FF, transparent)' : 'linear-gradient(to right, #F5F3FF, transparent)' }} />
            <div className={`absolute ${isAr ? 'left-0' : 'right-0'} top-0 bottom-0 w-16 z-10 pointer-events-none`}
              style={{ background: isAr ? 'linear-gradient(to right, #F5F3FF, transparent)' : 'linear-gradient(to left, #F5F3FF, transparent)' }} />

            {/* Scrollable track
                py-10 gives 40px vertical room inside the overflow clip boundary
                so the scale(1.05) transform doesn't get clipped at top/bottom     */}
            <div
              ref={featureTrackRef}
              className="flex gap-5 overflow-x-scroll py-10 -my-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            >
              {features.map((f, i) => (
                <FeatureCard3D key={i} f={f} isAr={isAr} />
              ))}

              {/* "View all" end card */}
              <div className="shrink-0 w-[200px] flex items-center justify-center">
                <Link
                  href="/features"
                  className="group flex flex-col items-center justify-center gap-4 w-full h-full min-h-[250px] rounded-2xl p-6 text-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    border: '1.5px dashed rgba(124,105,232,0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#7C69E8'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.8)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,105,232,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)'; }}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#7C69E8]/40 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:border-[#7C69E8] group-hover:bg-violet-50">
                    <ArrowRight size={18} className="text-[#7C69E8]" />
                  </div>
                  <span className="text-sm font-bold text-[#7C69E8] leading-snug">
                    {isAr ? 'عرض جميع المميزات' : 'View all features'}
                  </span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. DASHBOARD SHOWCASE ───────────────────────────── */}
      <DashboardShowcase isAr={isAr} />

      {/* ── 7. SECURITY & COMPLIANCE ────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full border border-green-200 mb-5">
              <Flag size={13} className="shrink-0" />
              {isAr ? 'مبني للسوق السعودي' : 'Built for Saudi Arabia'}
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Stats grid */}
            <motion.div {...fadeUp()} className="grid grid-cols-2 gap-4">
              {[
                { value: '+24%', label: isAr ? 'متوسط زيادة الإيرادات' : 'Avg. revenue uplift', color: '#25A4E8' },
                { value: '-60%', label: isAr ? 'تخفيض وقت الإدارة' : 'Admin time reduction', color: '#7C69E8' },
                { value: '0',    label: isAr ? 'حجوزات مزدوجة' : 'Double bookings', color: '#25A4E8' },
                { value: (<span className="inline-flex items-center justify-center gap-1">4.8<Star size={22} className="fill-current" /></span>), label: isAr ? 'متوسط تقييم الضيوف' : 'Avg. guest rating', color: '#7C69E8' },
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
                  { label: isAr ? 'التقييم' : 'Rating', value: (<span className="inline-flex items-center gap-1">4.9<Star size={12} className="fill-current" /></span>) },
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              {isAr ? 'يتصل بمنصاتك الحالية' : 'Connects with your existing platforms'}
            </h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">
              {isAr ? 'كل OTA رئيسي، أقفال ذكية، بوابات دفع، وأدوات محاسبة.' : 'Every major OTA, smart locks, payment gateways, and accounting tools.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/logos/airbnb.webp',                  name: 'Airbnb',                   badge_en: 'OTA',     badge_ar: 'OTA',         slug: 'airbnb' },
              { src: '/logos/booking-com.webp',             name: 'Booking.com',               badge_en: 'OTA',     badge_ar: 'OTA',         slug: 'booking-com' },
              { src: '/logos/agoda.webp',                   name: 'Agoda',                     badge_en: 'OTA',     badge_ar: 'OTA',         slug: 'agoda' },
              { src: '/logos/vrbo.webp',                    name: 'Vrbo',                      badge_en: 'OTA',     badge_ar: 'OTA',         slug: 'vrbo' },
              { src: '/logos/google-vacation-rentals.webp', name: 'Google Vacation Rentals',   badge_en: 'Search',  badge_ar: 'بحث',         slug: 'google-vacation-rentals' },
              { src: '/logos/gathern.webp',                 name: 'Gathern',                   badge_en: 'Local',   badge_ar: 'محلي',        slug: 'gathern' },
              { src: '/logos/aqar.webp',                    name: 'AQAR',                      badge_en: 'Local',   badge_ar: 'محلي',        slug: 'aqar' },
              { src: '/logos/pricelabs.webp',               name: 'PriceLabs',                 badge_en: 'Pricing', badge_ar: 'تسعير',       slug: 'pricelabs' },
              { src: '/logos/tuya.webp',                    name: 'Tuya',                      badge_en: 'IoT',     badge_ar: 'إنترنت الأشياء', slug: 'tuya' },
              { src: '/logos/ttlock.webp',                  name: 'TTLock',                    badge_en: 'Locks',   badge_ar: 'أقفال',       slug: 'ttlock' },
              { src: '/logos/qoyod.webp',                   name: 'Qoyod',                     badge_en: 'Finance', badge_ar: 'مالية',       slug: 'qoyod' },
              { src: '/logos/daftra.webp',                  name: 'Daftra',                    badge_en: 'Finance', badge_ar: 'مالية',       slug: 'daftra' },
            ].map((intg, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <Link href={`/integrations/${intg.slug}`}
                  className="group flex items-center gap-3 bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all h-full">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-2">
                    <Image src={intg.src} alt={intg.name} width={52} height={52} className="object-contain w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#0F172A] text-sm group-hover:text-[#25A4E8] transition-colors truncate">{intg.name}</p>
                    <span className="text-[11px] font-semibold text-slate-400">{isAr ? intg.badge_ar : intg.badge_en}</span>
                  </div>
                  <ArrowRight size={12} className="ms-auto text-slate-200 group-hover:text-[#25A4E8] transition-colors shrink-0" />
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
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
              <button onClick={openModal} className="px-10 py-4 bg-white text-[#25A4E8] font-extrabold rounded-xl hover:bg-blue-50 transition-colors shadow-2xl text-sm">
                {isAr ? 'احجز عرضاً تجريبياً مجانياً' : 'Book a Free Demo'}
              </button>
              <button onClick={openModal} className="px-10 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-colors text-sm">
                {isAr ? 'عرض الأسعار' : 'View Pricing'}
              </button>
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
