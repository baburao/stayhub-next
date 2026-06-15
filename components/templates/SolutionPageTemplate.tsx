'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight, Quote } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface Metric { value: string; label: string; arLabel?: string }
interface PainPoint { title: string; desc: string }
interface Benefit { title: string; desc: string }
interface FAQ { q: string; a: string }
interface Testimonial { quote: string; name: string; title: string; arQuote?: string; arTitle?: string }
interface RelatedFeature { slug: string; title: string; subtitle?: string; color?: string }

interface SolutionData {
  slug: string;
  name: string;
  arName?: string;
  badge: string;
  arBadge?: string;
  h1: string;
  arabicH1: string;
  subtitle: string;
  arSubtitle?: string;
  color: string;
  painPoints: PainPoint[];
  arPainPoints?: PainPoint[];
  benefits: Benefit[];
  arBenefits?: Benefit[];
  metrics: Metric[];
  testimonial: Testimonial;
  faq: FAQ[];
  arFaq?: FAQ[];
  features: string[];
}

interface Props {
  solution: SolutionData;
  relatedFeatureData: RelatedFeature[];
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FAQItem({ q, a }: FAQ) {
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

export default function SolutionPageTemplate({ solution, relatedFeatureData }: Props) {
  const { t, isAr } = useLanguage();

  const name        = isAr ? (solution.arName    ?? solution.name)    : solution.name;
  const badge       = isAr ? (solution.arBadge   ?? solution.badge)   : solution.badge;
  const h1          = isAr ? solution.arabicH1                         : solution.h1;
  const subtitle    = isAr ? (solution.arSubtitle ?? solution.subtitle) : solution.subtitle;
  const painPoints  = isAr ? (solution.arPainPoints ?? solution.painPoints) : solution.painPoints;
  const benefits    = isAr ? (solution.arBenefits ?? solution.benefits)    : solution.benefits;
  const faq         = isAr ? (solution.arFaq     ?? solution.faq)     : solution.faq;
  const testimonialQuote = isAr
    ? (solution.testimonial.arQuote ?? solution.testimonial.quote)
    : solution.testimonial.quote;
  const testimonialTitle = isAr
    ? (solution.testimonial.arTitle ?? solution.testimonial.title)
    : solution.testimonial.title;

  const { color, metrics, testimonial } = solution;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease },
  });

  const weKnowDesc    = t.solutions.weKnowDesc.replace('{name}', name);
  const superpowers   = t.solutions.superpowers.replace('{name}', name);
  const builtFor      = t.solutions.builtFor.replace('{name}', name);
  const questionsFrom = t.solutions.questionsFrom.replace('{name}', name);
  const featuresUse   = t.solutions.featuresUse.replace('{name}', name);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: solution.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: `linear-gradient(135deg, ${color}12 0%, #EFF8FF 60%, #fff 100%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <motion.nav {...fadeUp(0)} className="flex items-center gap-2 text-sm text-slate-400 mb-10 justify-center">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <Link href="/solutions" className="hover:text-slate-600 transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <span className="text-slate-600 font-medium">{badge}</span>
          </motion.nav>

          <div className="text-center">
            <motion.div {...fadeUp(0.05)}>
              <Badge variant="custom" color={color}>{badge}</Badge>
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
              {h1}
            </motion.h1>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </motion.p>
            <motion.div {...fadeUp(0.24)} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="px-8 py-4 rounded-xl text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: color }}
              >
                {t.buttons.bookDemo}
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                {t.buttons.viewPricing}
                <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-8">
            {metrics.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
                <p className="text-3xl md:text-4xl font-bold" style={{ color }}>{m.value}</p>
                <p className="text-slate-500 text-sm mt-1">{isAr && m.arLabel ? m.arLabel : m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.solutions.weKnow}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {weKnowDesc}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {painPoints.map((pp, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4">
                  <AlertTriangle size={16} className="text-orange-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{pp.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#EFF8FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <Badge variant="purple">{t.solutions.whatYouGet}</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
              {superpowers}
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              {t.solutions.superpowersDesc}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <CheckCircle2 size={16} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{b.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()}>
            <div
              className="rounded-3xl p-10 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}10 0%, #EFF8FF 100%)`,
                border: `1px solid ${color}25`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl -translate-y-1/2 translate-x-1/2"
                style={{ backgroundColor: color }}
              />
              <Quote size={36} className="mx-auto mb-6 opacity-25" style={{ color }} />
              <p className="text-xl md:text-2xl text-[#0F172A] font-medium leading-relaxed mb-8 italic">
                &ldquo;{testimonialQuote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-[#0F172A]">{testimonial.name}</p>
                <p className="text-slate-500 text-sm mt-0.5">{testimonialTitle}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Features */}
      {relatedFeatureData.length > 0 && (
        <section className="py-20 bg-[#EFF8FF]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <motion.div {...fadeUp()} className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A]">{featuresUse}</h2>
              <p className="text-slate-600 mt-2">{t.solutions.featuresUseDesc}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedFeatureData.map((rf, i) => (
                <motion.div key={rf.slug} {...fadeUp(i * 0.08)}>
                  <Link
                    href={`/features/${rf.slug}`}
                    className="group block bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div
                      className="w-8 h-8 rounded-lg mb-3"
                      style={{ backgroundColor: `${rf.color || color}18` }}
                    />
                    <h3 className="font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors mb-1">{rf.title}</h3>
                    {rf.subtitle && <p className="text-slate-500 text-sm">{rf.subtitle}</p>}
                    <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#25A4E8]">
                      {t.buttons.exploreFeature} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color} 0%, #7C69E8 100%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {builtFor}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.solutions.builtForDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="px-8 py-4 bg-white font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg" style={{ color }}>
                {t.buttons.bookDemoShort}
              </Link>
              <Link href="/pricing" className="px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                {t.buttons.viewPricing}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <Badge variant="purple">{t.sections.faq}</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">{questionsFrom}</h2>
          </motion.div>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}>
                <FAQItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
