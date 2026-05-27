'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { allSolutions } from '@/data/solutions';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

const solutionEmoji: Record<string, string> = {
  'property-managers': '🏢',
  'vacation-rental-hosts': '🏡',
  'hotels-serviced-apartments': '🏨',
  'multi-owner-operators': '👥',
};

export default function SolutionsPageClient() {
  const { t, isAr } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-20 md:py-28 text-center">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#7C69E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {t.solutions.pageBadge}
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {isAr
              ? <><span className="gradient-text">{`حلول مصممة`}</span>{` لكل مشغّل`}</>
              : <>Solutions Tailored{' '}<span className="gradient-text">for Every Operator</span></>}
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.solutions.pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {allSolutions.map((solution, index) => {
              const displayName     = isAr ? (solution.arName    ?? solution.name)    : solution.name;
              const displayBadge    = isAr ? (solution.arBadge   ?? solution.badge)   : solution.badge;
              const displaySubtitle = isAr ? (solution.arSubtitle ?? solution.subtitle) : solution.subtitle;
              return (
                <motion.div
                  key={solution.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease }}
                >
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group flex flex-col bg-white rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${solution.color}18` }}
                      >
                        {solutionEmoji[solution.slug] || '🏢'}
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: solution.color }}>
                          {displayBadge}
                        </span>
                        <h2 className="text-xl font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors mt-1">
                          {displayName}
                        </h2>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-5 flex-1">{displaySubtitle}</p>

                    {/* Metrics preview */}
                    <div className="flex gap-6 mb-5">
                      {(solution.metrics as Array<{ value: string; label: string; arLabel?: string }>).map((m, i) => (
                        <div key={i}>
                          <p className="text-xl font-bold" style={{ color: solution.color }}>{m.value}</p>
                          <p className="text-xs text-slate-400">{isAr && m.arLabel ? m.arLabel : m.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: solution.color }}>
                      {t.buttons.exploreSolution} →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#25A4E8] to-[#7C69E8]">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.solutions.notSure}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.solutions.notSureDesc}
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
