'use client';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
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

const plans = [
  {
    name: 'Starter',
    arabicName: 'المبتدئ',
    price: { monthly: 299, annual: 249 },
    description: 'Perfect for individual hosts with 1–5 properties.',
    arabicDescription: 'مثالي للمضيفين الأفراد ذوي 1–5 عقارات.',
    color: '#7C69E8',
    accentClass: 'from-violet-500/10 to-violet-500/5',
    borderClass: 'border-violet-100',
    features: [
      'Up to 5 properties',
      'Channel Manager (3 OTAs)',
      'Automated guest messaging',
      'Availability calendar',
      'Basic analytics',
      'Email support',
      'Mobile app access',
    ],
    arabicFeatures: [
      'حتى 5 عقارات',
      'مدير القنوات (3 OTAs)',
      'مراسلة ضيوف مؤتمتة',
      'تقويم التوفر',
      'تحليلات أساسية',
      'دعم عبر البريد الإلكتروني',
      'الوصول عبر التطبيق المحمول',
    ],
    cta: 'Start Free Trial',
    arabicCta: 'ابدأ التجربة المجانية',
    popular: false,
  },
  {
    name: 'Growth',
    arabicName: 'النمو',
    price: { monthly: 799, annual: 649 },
    description: 'For growing property managers with 6–50 units.',
    arabicDescription: 'لمديري العقارات النامين ذوي 6–50 وحدة.',
    color: '#25A4E8',
    accentClass: 'from-blue-500/10 to-blue-500/5',
    borderClass: 'border-blue-200',
    features: [
      'Up to 50 properties',
      'Unlimited OTA channels',
      'Guest verification (Absher, Ejar)',
      'Smart lock automation',
      'Revenue analytics & insights',
      'Owner portal',
      'Payment collection',
      'Housekeeping & maintenance',
      'Direct booking website',
      'ZATCA-compliant invoicing',
      'Priority support',
    ],
    arabicFeatures: [
      'حتى 50 عقاراً',
      'قنوات OTA غير محدودة',
      'التحقق من الضيوف (أبشر، إيجار)',
      'أتمتة القفل الذكي',
      'تحليلات الإيرادات والرؤى',
      'بوابة المالك',
      'تحصيل المدفوعات',
      'التنظيف والصيانة',
      'موقع الحجز المباشر',
      'فواتير متوافقة مع ZATCA',
      'دعم ذو أولوية',
    ],
    cta: 'Start Free Trial',
    arabicCta: 'ابدأ التجربة المجانية',
    popular: true,
  },
  {
    name: 'Enterprise',
    arabicName: 'المؤسسات',
    price: { monthly: null, annual: null },
    description: 'For large property managers with 50+ units.',
    arabicDescription: 'لمديري العقارات الكبار ذوي أكثر من 50 وحدة.',
    color: '#0F172A',
    accentClass: 'from-slate-500/10 to-slate-500/5',
    borderClass: 'border-slate-200',
    features: [
      'Unlimited properties',
      'All Growth features',
      'Custom integrations',
      'Dedicated account manager',
      'White-label owner portal',
      'Custom reporting',
      'API access',
      'Multi-brand support',
      'SLA guarantee',
      'Onboarding training',
    ],
    arabicFeatures: [
      'عقارات غير محدودة',
      'جميع مميزات النمو',
      'تكاملات مخصصة',
      'مدير حساب مخصص',
      'بوابة مالك ذات علامة بيضاء',
      'تقارير مخصصة',
      'الوصول إلى API',
      'دعم متعدد العلامات التجارية',
      'ضمان SLA',
      'تدريب على التأهيل',
    ],
    cta: 'Contact Sales',
    arabicCta: 'تواصل مع المبيعات',
    popular: false,
  },
];

const faqsEn = [
  { q: 'Is there a free trial?', a: 'Yes. All plans include a 14-day free trial with no credit card required. You can start immediately and decide which plan works best for you.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'How is billing calculated for multiple properties?', a: 'Your plan allows a set number of properties. If you need more, simply upgrade to a higher tier. We never charge per-booking fees.' },
  { q: 'Do you offer contracts in Arabic?', a: 'Yes. All our service agreements and invoices are available in Arabic and English.' },
  { q: 'Is ZATCA compliance included?', a: 'Yes. Growth and Enterprise plans include full ZATCA-compliant e-invoicing built into the platform. No additional setup required.' },
];

const faqsAr = [
  { q: 'هل هناك فترة تجريبية مجانية؟', a: 'نعم. تتضمن جميع الخطط تجربة مجانية لمدة 14 يوماً بدون بطاقة ائتمان. يمكنك البدء فوراً وتحديد الخطة الأنسب لك.' },
  { q: 'هل يمكنني الترقية أو التخفيض في خطتي؟', a: 'نعم. يمكنك الترقية أو التخفيض في أي وقت. تسري الترقيات فوراً؛ وتُطبَّق عمليات التخفيض في دورة الفوترة التالية.' },
  { q: 'كيف يُحسَب الفواتير للعقارات المتعددة؟', a: 'تتيح خطتك عدداً محدداً من العقارات. إذا كنت بحاجة إلى المزيد، ما عليك سوى الترقية إلى مستوى أعلى. لا نفرض أبداً رسوماً لكل حجز.' },
  { q: 'هل تقدمون العقود باللغة العربية؟', a: 'نعم. جميع اتفاقيات الخدمة والفواتير الخاصة بنا متاحة باللغتين العربية والإنجليزية.' },
  { q: 'هل الامتثال لـ ZATCA مدرج؟', a: 'نعم. تتضمن خطتا النمو والمؤسسات الفوترة الإلكترونية المتوافقة مع ZATCA بشكل كامل داخل المنصة. لا يلزم أي إعداد إضافي.' },
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
  const [annual, setAnnual] = useState(false);

  const faqs = isAr ? faqsAr : faqsEn;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 md:px-8">
          <motion.h1 {...fadeUp(0)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <><span className="gradient-text">{`أسعار بسيطة`}</span>{` وشفافة`}</>
              : <>Simple, Transparent{' '}<span className="gradient-text">Pricing</span></>}
          </motion.h1>
          <motion.p {...fadeUp(0.08)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.pricing.pageSubtitle}
          </motion.p>

          {/* Billing toggle */}
          <motion.div {...fadeUp(0.14)} className="inline-flex items-center gap-4 bg-slate-100 rounded-2xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!annual ? 'bg-white shadow-sm text-[#0F172A]' : 'text-slate-500'}`}
            >
              {isAr ? 'شهري' : 'Monthly'}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white shadow-sm text-[#0F172A]' : 'text-slate-500'}`}
            >
              {isAr ? 'سنوي' : 'Annual'}
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded-full">
                {isAr ? 'وفر 20%' : 'Save 20%'}
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, index) => {
              const displayName     = isAr ? plan.arabicName : plan.name;
              const displayDesc     = isAr ? plan.arabicDescription : plan.description;
              const displayFeatures = isAr ? plan.arabicFeatures : plan.features;
              const displayCta      = isAr ? plan.arabicCta : plan.cta;
              const price = annual ? plan.price.annual : plan.price.monthly;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                  className={`relative rounded-3xl p-8 border-2 ${plan.popular
                    ? 'border-[#25A4E8] shadow-2xl shadow-blue-500/15 md:scale-105'
                    : 'border-slate-100 shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-[#25A4E8] text-white text-xs font-bold rounded-full shadow-lg">
                        {t.pricing.mostPopular}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#0F172A] mb-1">{displayName}</h2>
                    <p className="text-slate-500 text-sm mb-5">{displayDesc}</p>

                    {price != null ? (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={price}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.2 }}
                              className="text-4xl font-bold"
                              style={{ color: plan.color }}
                            >
                              {price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-slate-400 text-sm ml-1">
                            SAR {t.pricing.perMonth}
                          </span>
                        </div>
                        {annual && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            {isAr ? `وفر ${(plan.price.monthly! - price) * 12} ريال سنوياً` : `Save ${(plan.price.monthly! - price) * 12} SAR/year`}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold text-[#0F172A]">{t.pricing.custom}</p>
                        <p className="text-xs text-slate-400 mt-1">{t.pricing.customDesc}</p>
                      </div>
                    )}
                  </div>

                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/demo'}
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-sm mb-8 transition-all ${
                      plan.popular
                        ? 'bg-[#25A4E8] text-white hover:bg-[#1A8FD1] shadow-lg shadow-blue-500/25'
                        : 'border-2 hover:bg-slate-50'
                    }`}
                    style={!plan.popular ? { borderColor: plan.color, color: plan.color } : {}}
                  >
                    {displayCta}
                  </Link>

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

      {/* Trust bar */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: isAr ? 'تجربة مجانية 14 يوماً' : '14-day free trial', icon: '✅' },
              { label: isAr ? 'بدون بطاقة ائتمان' : 'No credit card required', icon: '💳' },
              { label: isAr ? 'إلغاء في أي وقت' : 'Cancel anytime', icon: '🔓' },
              { label: isAr ? 'متوافق مع ZATCA' : 'ZATCA compliant', icon: '🇸🇦' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6">
            {t.pricing.sarNote}{' '}
            {isAr
              ? <><Link href="/contact" className="text-[#25A4E8] font-semibold hover:underline">تواصل مع فريقنا</Link>.</>
              : <><Link href="/contact" className="text-[#25A4E8] font-semibold hover:underline">Contact our team</Link> for a custom quote.</>}
          </p>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
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
