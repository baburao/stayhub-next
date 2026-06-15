'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface Stat { value: string; label: string; arLabel?: string }
interface PainPoint { title: string; desc: string }
interface Benefit { title: string; desc: string }
interface WorkflowStep { step: number; title: string; desc: string }
interface FAQ { q: string; a: string }

interface IntegrationData {
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
  stats: Stat[];
  arStats?: Stat[];
  painPoints: PainPoint[];
  arPainPoints?: PainPoint[];
  benefits: Benefit[];
  arBenefits?: Benefit[];
  workflowSteps: WorkflowStep[];
  arWorkflowSteps?: WorkflowStep[];
  relatedIntegrations: string[];
  faq: FAQ[];
  arFaq?: FAQ[];
}

interface RelatedIntegration {
  slug: string;
  name: string;
  tagline?: string;
  color?: string;
}

interface Props {
  integration: IntegrationData;
  relatedData: RelatedIntegration[];
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

export default function IntegrationPageTemplate({ integration, relatedData }: Props) {
  const { t, isAr } = useLanguage();

  const name         = isAr ? (integration.arName    ?? integration.name)   : integration.name;
  const badge        = isAr ? (integration.arBadge   ?? integration.badge)  : integration.badge;
  const h1           = isAr ? integration.arabicH1                           : integration.h1;
  const subtitle     = isAr ? (integration.arSubtitle ?? integration.subtitle) : integration.subtitle;
  const stats        = isAr ? (integration.arStats   ?? integration.stats)  : integration.stats;
  const painPoints   = isAr ? (integration.arPainPoints ?? integration.painPoints) : integration.painPoints;
  const benefits     = isAr ? (integration.arBenefits ?? integration.benefits)    : integration.benefits;
  const workflowSteps = isAr ? (integration.arWorkflowSteps ?? integration.workflowSteps) : integration.workflowSteps;
  const faq          = isAr ? (integration.arFaq     ?? integration.faq)    : integration.faq;

  const { color } = integration;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease },
  });

  const manualPainfulTitle = t.integrations.manualPainful.replace('{name}', name);
  const manualPainfulDesc  = t.integrations.manualPainfulDesc.replace('{name}', name);
  const connectToday       = t.integrations.connectToday.replace('{name}', name);
  const readyCta           = t.integrations.readyCta.replace('{name}', name);
  const readyCtaDesc       = t.integrations.readyCtaDesc.replace('{name}', name);
  const faqTitle           = t.integrations.faqTitle.replace('{name}', name);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: integration.faq.map(({ q, a }) => ({
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
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl" style={{ backgroundColor: color }} />
        <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <motion.nav {...fadeUp(0)} className="flex items-center gap-2 text-sm text-slate-400 mb-10 justify-center">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <Link href="/integrations" className="hover:text-slate-600 transition-colors">
              {isAr ? 'التكاملات' : 'Integrations'}
            </Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <span className="text-slate-600 font-medium">{integration.name}</span>
          </motion.nav>

          <div className="text-center">
            <motion.div {...fadeUp(0.05)}>
              <div className="inline-flex items-center gap-3 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  {integration.name.charAt(0)}
                </div>
                <Badge variant="custom" color={color}>{badge}</Badge>
              </div>
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
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
                {isAr ? `اربط ${name} اليوم` : `Connect ${name} Today`}
              </Link>
              <Link
                href="/integrations"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                {t.buttons.allIntegrations}
                <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
                <p className="text-3xl md:text-4xl font-bold" style={{ color }}>{stat.value}</p>
                <p className="text-slate-500 text-sm mt-1">{isAr && stat.arLabel ? stat.arLabel : stat.label}</p>
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
              {manualPainfulTitle}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {manualPainfulDesc}
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
            <Badge variant="custom" color={color}>
              {t.integrations.whatYouGet.replace('{name}', name)}
            </Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
              {t.integrations.whatYouGetH2}
            </h2>
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

      {/* Workflow */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <Badge variant="teal">{t.sections.howItWorks}</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
              {connectToday}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((ws, i) => (
              <motion.div key={i} {...fadeUp(i * 0.09)} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:border-blue-200 hover:shadow-md transition-all">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 shadow-md"
                  style={{ backgroundColor: color }}
                >
                  {ws.step}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{ws.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{ws.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color} 0%, #25A4E8 100%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {readyCta}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {readyCtaDesc}
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

      {/* Related */}
      {relatedData.length > 0 && (
        <section className="py-20 bg-[#EFF8FF]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <motion.div {...fadeUp()} className="mb-10">
              <h2 className="text-2xl font-bold text-[#0F172A]">{t.sections.relatedIntegrations}</h2>
              <p className="text-slate-600 mt-2">{t.sections.relatedIntegrationsDesc}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedData.map((ri, i) => (
                <motion.div key={ri.slug} {...fadeUp(i * 0.08)}>
                  <Link
                    href={`/integrations/${ri.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm"
                      style={{ backgroundColor: ri.color || '#25A4E8' }}
                    >
                      {ri.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors">{ri.name}</h3>
                      {ri.tagline && <p className="text-slate-500 text-xs mt-0.5">{ri.tagline}</p>}
                      <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#25A4E8]">
                        {t.buttons.viewIntegration} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <Badge variant="purple">{t.sections.faq}</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">{faqTitle}</h2>
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
