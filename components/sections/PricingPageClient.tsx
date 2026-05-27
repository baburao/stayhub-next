'use client';
import Link from 'next/link';
import { Check, ChevronDown, Building2, ArrowRight, Phone } from 'lucide-react';
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
  { q: 'How does per-property pricing work?', a: 'You pay a flat rate for each property you manage. Starter hosts (1–7 properties) pay 54 SAR per property per month. Growth operators (8–15 properties) pay 25 SAR per property per month. Add a new property anytime and it\'s billed at the rate for your tier.' },
  { q: 'What happens if I cross a tier threshold?', a: 'Great news — your rate drops. If you start with 7 properties at 54 SAR each and add an 8th, your entire portfolio moves to the Growth tier at 25 SAR per property. You save more as you grow.' },
  { q: 'Is there a free trial?', a: 'Yes. All plans include a 14-day free trial with no credit card required. You can start immediately and invite your whole team.' },
  { q: 'Do you offer contracts in Arabic?', a: 'Yes. All service agreements, invoices, and in-app content are available in both Arabic and English.' },
  { q: 'Is ZATCA e-invoicing included?', a: 'Yes. Growth and Enterprise plans include full ZATCA Phase 2 compliant e-invoicing built directly into the platform. No extra setup required.' },
];

const faqsAr = [
  { q: 'كيف يعمل التسعير بالعقار؟', a: 'تدفع سعراً ثابتاً لكل عقار تديره. أصحاب المبتدئين (1–7 عقارات) يدفعون 54 ريالاً لكل عقار شهرياً. مشغّلو النمو (8–15 عقاراً) يدفعون 25 ريالاً لكل عقار شهرياً. أضف عقاراً جديداً في أي وقت وسيُحتسب بسعر فئتك.' },
  { q: 'ماذا يحدث إذا تجاوزت حد الفئة؟', a: 'أخبار رائعة — ينخفض سعرك. إذا بدأت بـ7 عقارات بـ54 ريالاً لكل منها وأضفت العقار الثامن، تنتقل محفظتك بأكملها إلى فئة النمو بسعر 25 ريالاً لكل عقار. كلما نمت وفّرت أكثر.' },
  { q: 'هل هناك فترة تجريبية مجانية؟', a: 'نعم. تتضمن جميع الخطط تجربة مجانية لمدة 14 يوماً بدون بطاقة ائتمان. يمكنك البدء فوراً ودعوة فريقك بالكامل.' },
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

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 mb-5">
            <Building2 size={12} />
            {isAr ? 'تسعير شفاف بالعقار' : 'Per-property transparent pricing'}
          </motion.div>
          <motion.h1 {...fadeUp(0.06)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <><span className="gradient-text">ادفع فقط</span> لما تديره</>
              : <>Pay only for what<br /><span className="gradient-text">you manage</span></>}
          </motion.h1>
          <motion.p {...fadeUp(0.12)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'سعر ثابت لكل عقار، شهرياً. لا رسوم حجز، لا مفاجآت. كلما كبرت محفظتك، انخفض سعرك.'
              : 'A flat rate per property, per month. No per-booking fees, no surprises. Your rate drops as your portfolio grows.'}
          </motion.p>
        </div>
      </section>

      {/* ── Tier explainer strip ──────────────────────────── */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            {[
              { range: isAr ? '1 – 7 عقارات' : '1 – 7 props',   rate: isAr ? '54 ريال/عقار' : '54 SAR/prop', color: '#7C69E8' },
              { range: isAr ? '8 – 15 عقاراً' : '8 – 15 props', rate: isAr ? '25 ريال/عقار' : '25 SAR/prop', color: '#25A4E8' },
              { range: isAr ? '+15 عقاراً'   : '15+ props',      rate: isAr ? 'تواصل معنا'    : 'Contact us',  color: '#0F172A' },
            ].map((tier, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: tier.color }} />
                  <span className="text-sm font-semibold text-slate-600">{tier.range}</span>
                  <ArrowRight size={13} className="text-slate-300" />
                  <span className="text-sm font-extrabold" style={{ color: tier.color }}>{tier.rate}</span>
                </div>
                {i < 2 && <ArrowRight size={16} className="text-slate-200 mx-2 shrink-0 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan cards ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, index) => {
              const displayName     = isAr ? plan.arabicName     : plan.name;
              const displayRange    = isAr ? plan.range_ar       : plan.range_en;
              const displayDesc     = isAr ? plan.description_ar : plan.description_en;
              const displayFeatures = isAr ? plan.features_ar    : plan.features_en;
              const displayCta      = isAr ? plan.cta_ar         : plan.cta_en;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                  className={`relative rounded-3xl p-8 border-2 ${
                    plan.popular
                      ? 'border-[#25A4E8] shadow-2xl shadow-blue-500/15 md:scale-105'
                      : 'border-slate-100 shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="px-4 py-1.5 bg-[#25A4E8] text-white text-xs font-bold rounded-full shadow-lg">
                        {isAr ? 'الأكثر شيوعاً' : 'Most Popular'}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    {/* Property range badge */}
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-3 uppercase tracking-wide"
                      style={{ backgroundColor: `${plan.color}14`, color: plan.color }}
                    >
                      <Building2 size={10} />
                      {displayRange}
                    </span>

                    <h2 className="text-xl font-bold text-[#0F172A] mb-1">{displayName}</h2>
                    <p className="text-slate-500 text-sm mb-5 leading-relaxed">{displayDesc}</p>

                    {/* Price display */}
                    {plan.pricePerUnit != null ? (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className="text-4xl font-extrabold" style={{ color: plan.color }}>
                            {plan.pricePerUnit}
                          </span>
                          <div className="text-slate-400 text-sm leading-tight">
                            <p className="font-semibold">{isAr ? 'ريال' : 'SAR'}</p>
                            <p>{isAr ? 'لكل عقار / شهرياً' : 'per property / mo'}</p>
                          </div>
                        </div>
                        {plan.exampleProps != null && (
                          <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-200 pt-2">
                            {isAr
                              ? `مثال: ${plan.exampleProps} عقارات × ${plan.pricePerUnit} = ${plan.exampleProps * plan.pricePerUnit} ريال/شهر`
                              : `e.g. ${plan.exampleProps} props × ${plan.pricePerUnit} = ${plan.exampleProps * plan.pricePerUnit} SAR/mo`}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <p className="text-2xl font-extrabold text-[#0F172A] mb-1">
                          {isAr ? 'سعر مخصص' : 'Custom quote'}
                        </p>
                        <p className="text-[12px] text-slate-400 leading-snug">
                          {isAr ? 'تسعير مُصمَّم لمحفظتك الكبيرة' : 'Tailored for your large portfolio'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/demo'}
                    className={`flex items-center justify-center gap-2 w-full text-center py-3 rounded-xl font-semibold text-sm mb-8 transition-all ${
                      plan.popular
                        ? 'bg-[#25A4E8] text-white hover:bg-[#1A8FD1] shadow-lg shadow-blue-500/25'
                        : plan.name === 'Enterprise'
                          ? 'bg-[#0F172A] text-white hover:bg-slate-800'
                          : 'border-2 hover:bg-slate-50'
                    }`}
                    style={!plan.popular && plan.name !== 'Enterprise' ? { borderColor: plan.color, color: plan.color } : {}}
                  >
                    {plan.name === 'Enterprise' && <Phone size={14} />}
                    {displayCta}
                  </Link>

                  {/* Feature list */}
                  <ul className="space-y-3">
                    {displayFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${plan.color}18` }}
                        >
                          <Check size={12} style={{ color: plan.color }} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it scales callout ─────────────────────────── */}
      <section className="py-10 bg-gradient-to-r from-blue-50 to-violet-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
            <div className="w-12 h-12 rounded-2xl bg-[#25A4E8] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
              <Building2 size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#0F172A] mb-1">
                {isAr ? 'ينخفض سعرك كلما نمت' : 'Your rate drops as you grow'}
              </h3>
              <p className="text-sm text-slate-600">
                {isAr
                  ? 'عند إضافة عقارك الثامن، تنتقل محفظتك بأكملها إلى سعر 25 ريالاً — لا حاجة لخطة منفصلة.'
                  : 'When you add your 8th property, your entire portfolio moves to the 25 SAR rate automatically — no plan change needed.'}
              </p>
            </div>
            <Link href="/demo"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#25A4E8] text-white font-bold text-sm rounded-xl hover:bg-[#1A8FD1] transition-colors shadow-lg shadow-blue-500/20">
              {isAr ? 'احجز عرضاً' : 'Book a demo'} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: isAr ? 'تجربة مجانية 14 يوماً' : '14-day free trial',      icon: '✅' },
              { label: isAr ? 'بدون بطاقة ائتمان'    : 'No credit card required', icon: '💳' },
              { label: isAr ? 'إلغاء في أي وقت'      : 'Cancel anytime',          icon: '🔓' },
              { label: isAr ? 'متوافق مع ZATCA'       : 'ZATCA compliant',         icon: '🇸🇦' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6">
            {isAr
              ? <>جميع الأسعار بالريال السعودي (SAR)، تشمل ضريبة القيمة المضافة. للمحافظ الكبيرة جداً، <Link href="/contact" className="text-[#25A4E8] font-semibold hover:underline">تواصل مع فريقنا</Link>.</>
              : <>All prices in Saudi Riyal (SAR), VAT inclusive. For very large portfolios, <Link href="/contact" className="text-[#25A4E8] font-semibold hover:underline">contact our team</Link> for a custom quote.</>}
          </p>
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
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
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
