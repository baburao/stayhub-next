'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ChevronDown, Building2, ArrowRight, X, CheckCircle2, Flag, CreditCard, Unlock, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

/* ── Pricing tiers ─────────────────────────────────────────── */
const plans = [
  {
    name: 'Starter',
    arabicName: 'المبتدئ',
    range_en: '1 – 7 properties',
    range_ar: '1 – 7 عقارات',
    pricePerUnit: 54,           // SAR per property per month
    exampleProps: 5,
    description_en: 'Perfect for independent hosts getting started with short-term rentals.',
    description_ar: 'مثالي للمضيفين المستقلين الذين يبدأون في تأجير العقارات قصيرة الأمد.',
    color: '#7C69E8',
    popular: false,
    cta_en: 'Start Free Trial',
    cta_ar: 'ابدأ التجربة المجانية',
    features_en: [
      'Up to 7 properties',
      'Channel Manager (all OTAs)',
      'Automated guest messaging',
      'Availability calendar',
      'Basic analytics',
      'Guest verification (Absher)',
      'Email & chat support',
      'Mobile app access',
    ],
    features_ar: [
      'حتى 7 عقارات',
      'مدير القنوات (جميع OTAs)',
      'مراسلة ضيوف مؤتمتة',
      'تقويم التوفر',
      'تحليلات أساسية',
      'التحقق من الضيوف (أبشر)',
      'دعم عبر البريد والدردشة',
      'الوصول عبر التطبيق المحمول',
    ],
  },
  {
    name: 'Growth',
    arabicName: 'النمو',
    range_en: '8 – 15 properties',
    range_ar: '8 – 15 عقاراً',
    pricePerUnit: 25,
    exampleProps: 10,
    description_en: 'For growing operators who need full automation and compliance tools.',
    description_ar: 'للمشغّلين الناميين الذين يحتاجون إلى أتمتة كاملة وأدوات الامتثال.',
    color: '#25A4E8',
    popular: true,
    cta_en: 'Start Free Trial',
    cta_ar: 'ابدأ التجربة المجانية',
    features_en: [
      '8 to 15 properties',
      'All Starter features',
      'Smart lock automation',
      'Revenue analytics & insights',
      'Owner portal',
      'Payment collection (ANB)',
      'Housekeeping & maintenance',
      'Direct booking website',
      'ZATCA-compliant invoicing',
      'Team task management',
      'Priority support',
    ],
    features_ar: [
      '8 إلى 15 عقاراً',
      'جميع مميزات المبتدئ',
      'أتمتة القفل الذكي',
      'تحليلات الإيرادات والرؤى',
      'بوابة المالك',
      'تحصيل المدفوعات (ANB)',
      'التنظيف والصيانة',
      'موقع الحجز المباشر',
      'فواتير متوافقة مع ZATCA',
      'إدارة مهام الفريق',
      'دعم ذو أولوية',
    ],
  },
  {
    name: 'Enterprise',
    arabicName: 'المؤسسات',
    range_en: '15+ properties',
    range_ar: 'أكثر من 15 عقاراً',
    pricePerUnit: null,
    exampleProps: null,
    description_en: 'Custom pricing for large portfolios. We tailor a plan to your exact needs.',
    description_ar: 'أسعار مخصصة للمحافظ الكبيرة. نصمم خطة تناسب احتياجاتك تماماً.',
    color: '#0F172A',
    popular: false,
    cta_en: 'Contact Sales',
    cta_ar: 'تواصل مع المبيعات',
    features_en: [
      'Unlimited properties',
      'All Growth features',
      'Dedicated account manager',
      'Custom integrations & API',
      'White-label owner portal',
      'Custom reporting',
      'Multi-brand support',
      'Ejar & Tawuniya integration',
      'SLA guarantee',
      'Onboarding & training',
    ],
    features_ar: [
      'عقارات غير محدودة',
      'جميع مميزات النمو',
      'مدير حساب مخصص',
      'تكاملات مخصصة والوصول إلى API',
      'بوابة مالك ذات علامة بيضاء',
      'تقارير مخصصة',
      'دعم متعدد العلامات التجارية',
      'تكامل إيجار وتعاونية',
      'ضمان مستوى الخدمة SLA',
      'تأهيل وتدريب',
    ],
  },
];

/* ── FAQ ───────────────────────────────────────────────────── */
const faqsEn = [
  { q: 'How do I get a quote?', a: 'Simply click "Book a Free Demo" and our team will prepare a personalised quote based on the size of your portfolio and the features you need.' },
  { q: 'Is there a free trial?', a: 'Yes. All plans include a 14-day free trial with no credit card required. You can start immediately and invite your whole team.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade, downgrade, or switch plans at any time. Our team will help you find the right fit as your portfolio grows.' },
  { q: 'Do you offer contracts in Arabic?', a: 'Yes. All service agreements, invoices, and in-app content are available in both Arabic and English.' },
  { q: 'Is ZATCA e-invoicing included?', a: 'Yes. Growth and Enterprise plans include full ZATCA Phase 2 compliant e-invoicing built directly into the platform. No extra setup required.' },
];

const faqsAr = [
  { q: 'كيف أحصل على عرض سعر؟', a: 'ببساطة اضغط على "احجز عرضاً مجانياً" وسيقوم فريقنا بإعداد عرض سعر مخصص بناءً على حجم محفظتك والمميزات التي تحتاجها.' },
  { q: 'هل هناك فترة تجريبية مجانية؟', a: 'نعم. تتضمن جميع الخطط تجربة مجانية لمدة 14 يوماً بدون بطاقة ائتمان. يمكنك البدء فوراً ودعوة فريقك بالكامل.' },
  { q: 'هل يمكنني تغيير خطتي لاحقاً؟', a: 'بالطبع. يمكنك الترقية أو التخفيض أو تغيير الخطط في أي وقت. سيساعدك فريقنا في إيجاد الخطة المناسبة مع نمو محفظتك.' },
  { q: 'هل تقدمون العقود باللغة العربية؟', a: 'نعم. جميع اتفاقيات الخدمة والفواتير ومحتوى التطبيق متاحة باللغتين العربية والإنجليزية.' },
  { q: 'هل الفوترة الإلكترونية لـ ZATCA مدرجة؟', a: 'نعم. تتضمن خطتا النمو والمؤسسات الفوترة الإلكترونية المتوافقة مع المرحلة الثانية من ZATCA مباشرةً داخل المنصة. لا يلزم أي إعداد إضافي.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-[#0F172A] text-sm md:text-base">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="shrink-0 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPageClient() {
  const { t, isAr } = useLanguage();
  const faqs = isAr ? faqsAr : faqsEn;

  /* ── Demo modal state ── */
  const TOTAL_STEPS = 3;
  const [modalOpen, setModalOpen]   = useState(false);
  const [step,      setStep]        = useState(1);
  const [form, setForm] = useState({ email: '', name: '', phone: '', properties: '' });

  const openModal  = () => { setStep(1); setForm({ email: '', name: '', phone: '', properties: '' }); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const nextStep   = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const progress   = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const slideVariants = {
    enter: { opacity: 0, x: isAr ? -24 : 24 },
    center: { opacity: 1, x: 0 },
    exit:  { opacity: 0, x: isAr ? 24 : -24 },
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ══ DEMO MODAL ══════════════════════════════════════ */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-slate-900/55 backdrop-blur-[3px] z-50"
              onClick={closeModal}
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{   opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-[480px] p-8 md:p-10 relative ${isAr ? 'text-right' : ''}`}>

                {/* Close */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Step label */}
                <p className="text-sm font-semibold text-slate-400 mb-3">
                  {step < TOTAL_STEPS
                    ? (isAr ? `الخطوة ${step} من ${TOTAL_STEPS - 1}` : `Step ${step} of ${TOTAL_STEPS - 1}`)
                    : ' '}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#25A4E8]"
                    initial={{ width: 0 }}
                    animate={{ width: step === TOTAL_STEPS ? '100%' : `${progress}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <Image src="/stayhub-logo.svg" alt="StayHub" width={130} height={34} className="h-8 w-auto mb-5" />
                  {step < TOTAL_STEPS && (
                    <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight">
                      {isAr ? 'احجز عرضاً مجانياً' : 'Book a free demo'}
                    </h2>
                  )}
                </div>

                {/* ── Step content ── */}
                <AnimatePresence mode="wait">

                  {/* STEP 1 — Email */}
                  {step === 1 && (
                    <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.22 }}>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {isAr ? 'البريد الإلكتروني' : 'Enter your e-mail address'}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder={isAr ? 'example@email.com' : 'Enter your e-mail address'}
                        className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition mb-6"
                        dir="ltr"
                      />
                      <button
                        onClick={nextStep}
                        disabled={!form.email.includes('@')}
                        className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01]"
                      >
                        {isAr ? 'التالي' : 'Next'}
                        <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2 — Details */}
                  {step === 2 && (
                    <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit"
                      transition={{ duration: 0.22 }} className="space-y-4">

                      {/* Full name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          {isAr ? 'الاسم الكامل' : 'Full name'}
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                          className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          {isAr ? 'رقم الهاتف' : 'Phone'}
                        </label>
                        <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#25A4E8] focus-within:ring-2 focus-within:ring-[#25A4E8]/20 transition">
                          <span className="flex items-center gap-1.5 px-4 py-4 text-sm font-semibold text-slate-600 bg-slate-50 border-r border-slate-200 shrink-0 select-none">
                            <Flag size={14} className="text-slate-500" /> +966
                          </span>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="5X XXX XXXX"
                            className="flex-1 px-4 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none bg-white"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      {/* Properties */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                          {isAr ? 'عدد العقارات المُدارة' : 'Number of properties managed'}
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={form.properties}
                          onChange={e => setForm(f => ({ ...f, properties: e.target.value }))}
                          placeholder={isAr ? 'عدد العقارات' : 'Number of properties managed'}
                          className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition"
                          dir="ltr"
                        />
                      </div>

                      <button
                        onClick={nextStep}
                        disabled={!form.name || !form.phone}
                        className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] !mt-6"
                      >
                        {isAr ? 'التالي' : 'Next'}
                        <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                      </button>

                      <p className="text-[11px] text-slate-400 leading-relaxed !mt-4">
                        {isAr
                          ? 'قد نتواصل معك عبر البريد الإلكتروني أو الهاتف بشأن طلبك. يمكنك إلغاء الاشتراك في أي وقت.'
                          : 'We may contact you by email or phone about your request. You can opt out at any time.'}
                      </p>
                    </motion.div>
                  )}

                  {/* STEP 3 — Success */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }} className="text-center py-4">
                      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={44} className="text-green-500" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">
                        {isAr ? 'تم بنجاح!' : "You're all set!"}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        {isAr
                          ? 'شكراً لك! سيتواصل معك فريقنا خلال 24 ساعة لترتيب عرضك التجريبي المجاني.'
                          : 'Thanks! Our team will reach out within 24 hours to schedule your free demo.'}
                      </p>
                      <button
                        onClick={closeModal}
                        className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition-all"
                      >
                        {isAr ? 'العودة للموقع' : 'Back to site'}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Footer sign-in link */}
                {step < TOTAL_STEPS && (
                  <p className={`text-sm text-slate-400 mt-6 ${isAr ? 'text-right' : 'text-center'}`}>
                    {isAr ? 'مستخدم StayHub بالفعل؟' : 'Already a StayHub user?'}{' '}
                    <Link href="/login" className="font-semibold text-[#0F172A] underline underline-offset-2 hover:text-[#25A4E8] transition-colors">
                      {isAr ? 'تسجيل الدخول' : 'Sign in'}
                    </Link>
                  </p>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 mb-5">
            <Building2 size={12} />
            {isAr ? 'خطط مرنة لكل حجم' : 'Flexible plans for every size'}
          </motion.div>
          <motion.h1 {...fadeUp(0.06)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <><span className="gradient-text">الخطة المثالية</span> لعملك</>
              : <>The right plan for<br /><span className="gradient-text">your business</span></>}
          </motion.h1>
          <motion.p {...fadeUp(0.12)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'اختر الخطة التي تناسب حجم محفظتك. تواصل معنا للحصول على عرض مخصص.'
              : 'Choose the plan that fits your portfolio. Get in touch for a personalised quote.'}
          </motion.p>
        </div>
      </section>


      {/* ── Plan cards ───────────────────────────────────── */}
      <section className="py-20 bg-[#F3F2FA]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-7 items-stretch">
            {plans.map((plan, index) => {
              const displayDesc     = isAr ? plan.description_ar : plan.description_en;
              const displayFeatures = isAr ? plan.features_ar    : plan.features_en;
              const displayCta      = isAr ? plan.cta_ar         : plan.cta_en;

              const CARD_NUMS    = ['01', '02', '03'];
              const TYPE_EN      = ['Starter Plan', 'Growth Plan', 'Enterprise'];
              const TYPE_AR      = ['خطة المبتدئ', 'خطة النمو', 'المؤسسات'];
              const BOLD_EN      = ['Start', 'Grow', 'Scale'];
              const SOFT_EN      = ['small', 'fast', 'up'];
              const BOLD_AR      = ['ابدأ', 'انمُ', 'توسَّع'];
              const SOFT_AR      = ['صغيراً', 'سريعاً', 'كثيراً'];
              const GRAD         = 'linear-gradient(135deg, #FF6B9D 0%, #FF9052 32%, #A855F7 66%, #6366F1 100%)';

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease }}
                  whileHover={!plan.popular ? { scale: 1.02, transition: { duration: 0.22 } } : undefined}
                  className="relative group"
                >
                  {/* ── "Best value" top badge (popular only) ── */}
                  {plan.popular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                      <span
                        className="px-5 py-1.5 text-white text-[10px] font-extrabold uppercase tracking-[0.18em] rounded-full shadow-lg"
                        style={{ background: GRAD }}
                      >
                        {isAr ? 'أفضل قيمة مقابل السعر' : 'BEST VALUE TO PRICE'}
                      </span>
                    </div>
                  )}

                  {/* ── Border wrapper ── */}
                  {/* bg-slate-200 = default gray border; gradient ring fades in on hover/popular */}
                  <div
                    className={`relative p-[2px] rounded-[28px] h-full overflow-hidden ${
                      plan.popular ? 'shadow-2xl shadow-purple-300/30' : ''
                    }`}
                    style={{ background: plan.popular ? GRAD : undefined, backgroundColor: plan.popular ? undefined : '#E2E8F0' }}
                  >
                    {/* Gradient ring overlay — hidden for non-popular, fades in on hover */}
                    {!plan.popular && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: GRAD }}
                      />
                    )}

                    {/* ── White card body ── */}
                    <div className="relative bg-white rounded-[26px] h-full flex flex-col p-7">

                      {/* Top row: number · plan type · dots */}
                      <div className={`flex items-center justify-between mb-7 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <span className="text-[11px] font-extrabold text-slate-300 tabular-nums">
                            {CARD_NUMS[index]}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            {isAr ? TYPE_AR[index] : TYPE_EN[index]}
                          </span>
                        </div>
                        <span className="text-slate-200 text-lg font-black tracking-[0.25em] select-none">···</span>
                      </div>

                      {/* Plan name — bold + italic soft word */}
                      <div className={`mb-3 ${isAr ? 'text-right' : ''}`}>
                        <h2 className="text-[3.2rem] leading-none tracking-tight">
                          <span className="font-extrabold text-[#0F172A]">
                            {isAr ? BOLD_AR[index] : BOLD_EN[index]}
                          </span>
                          <span
                            className="font-extralight text-slate-400 ms-1"
                            style={{ fontStyle: 'italic' }}
                          >
                            {isAr ? SOFT_AR[index] : SOFT_EN[index]}
                          </span>
                        </h2>
                      </div>

                      {/* Description */}
                      <p className={`text-slate-400 text-sm mb-8 leading-relaxed ${isAr ? 'text-right' : ''}`}>
                        {displayDesc}
                      </p>

                      {/* CTA + Price inline row */}
                      <div className={`flex items-center gap-5 mb-8 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                        {/* Button — opens modal for Starter/Growth, navigates for Enterprise */}
                        {plan.name === 'Enterprise' ? (
                          <Link
                            href="/contact"
                            className="shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.03] border-2 border-slate-200 text-[#0F172A] bg-white hover:border-[#7C69E8] hover:text-[#7C69E8]"
                          >
                            {displayCta}
                          </Link>
                        ) : (
                          <button
                            onClick={openModal}
                            className={`shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.03] ${
                              plan.popular
                                ? 'bg-[#7C69E8] text-white hover:bg-[#6B5BD6] shadow-lg shadow-violet-400/25'
                                : 'border-2 border-slate-200 text-[#0F172A] bg-white hover:border-[#7C69E8] hover:text-[#7C69E8]'
                            }`}
                          >
                            {displayCta}
                          </button>
                        )}

                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-slate-100 mb-6" />

                      {/* Feature list */}
                      <ul className="space-y-3.5 flex-1">
                        {displayFeatures.map((feature, fi) => (
                          <li
                            key={fi}
                            className={`flex items-center gap-3 text-sm text-slate-600 ${isAr ? 'flex-row-reverse text-right' : ''}`}
                          >
                            <Check
                              size={14}
                              strokeWidth={2.5}
                              className="shrink-0"
                              style={{ color: plan.popular ? '#7C69E8' : '#A3B1C6' }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                    </div>{/* end white card */}
                  </div>{/* end border wrapper */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── Trust bar ─────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: isAr ? 'تجربة مجانية 14 يوماً' : '14-day free trial',      icon: BadgeCheck },
              { label: isAr ? 'بدون بطاقة ائتمان'    : 'No credit card required', icon: CreditCard },
              { label: isAr ? 'إلغاء في أي وقت'      : 'Cancel anytime',          icon: Unlock },
              { label: isAr ? 'متوافق مع ZATCA'       : 'ZATCA compliant',         icon: Flag },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                <item.icon size={16} className="text-[#25A4E8] shrink-0" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
            </span>
            <h2 className="text-3xl font-bold text-[#0F172A]">{t.pricing.faqTitle}</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <FAQItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#25A4E8] to-[#7C69E8]">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.pricing.startTrial}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.pricing.startTrialDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="px-8 py-4 bg-white text-[#25A4E8] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t.buttons.bookDemoShort}
              </Link>
              <Link href="/signup" className="px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                {t.buttons.startTrial}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
