'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { allIntegrations } from '@/data/integrations';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

export default function IntegrationsPageClient() {
  const { t, isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-100 text-violet-700 border border-violet-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              {t.integrations.pageBadge}
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <>{`انشر في كل مكان.`}<br /><span className="gradient-text">{`أدر من مكان واحد.`}</span></>
              : <>List Everywhere.{' '}<span className="gradient-text">Manage from One Place.</span></>}
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.integrations.pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allIntegrations.map((integration, index) => {
              const displayBadge = isAr ? (integration.arBadge ?? integration.badge) : integration.badge;
              const stats = isAr ? (integration.arStats ?? integration.stats) : integration.stats;
              return (
                <motion.div
                  key={integration.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease }}
                >
                  <Link
                    href={`/integrations/${integration.slug}`}
                    className="group flex flex-col bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm transition-transform group-hover:scale-110"
                        style={{ backgroundColor: integration.color }}
                      >
                        {integration.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors text-lg">
                          {integration.name}
                        </h2>
                        <span className="text-xs font-semibold" style={{ color: integration.color }}>
                          {displayBadge}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{integration.tagline}</p>
                    <div className="flex gap-4 mb-4">
                      {(stats as Array<{ value: string; label: string; arLabel?: string }>).slice(0, 2).map((stat, i) => (
                        <div key={i}>
                          <p className="text-lg font-bold" style={{ color: integration.color }}>{stat.value}</p>
                          <p className="text-xs text-slate-400">{isAr && stat.arLabel ? stat.arLabel : stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#25A4E8] opacity-0 group-hover:opacity-100 transition-all">
                      {t.buttons.viewIntegration} →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Coming soon */}
          <motion.div {...fadeUp(0.2)} className="mt-12">
            <p className="text-center text-sm text-slate-400 uppercase tracking-widest font-semibold mb-6">
              {t.integrations.comingSoon}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Almosafer', 'Darent', 'AJAAR', 'Airbnb for Work'].map((ch) => (
                <span key={ch} className="px-5 py-2.5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-sm font-semibold text-slate-400">
                  {ch}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#25A4E8] to-[#7C69E8]">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.integrations.connectTitle}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.integrations.connectDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="px-8 py-4 bg-white text-[#25A4E8] font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t.buttons.bookDemoShort}
              </Link>
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
