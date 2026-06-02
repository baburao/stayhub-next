'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { allFeatures } from '@/data/features';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

const iconMap: Record<string, string> = {
  Globe: '🌐', Calendar: '📅', FileText: '📋', Shield: '🛡️', Lock: '🔒',
  MessageSquare: '💬', CreditCard: '💳', Brush: '🧹', Wrench: '🔧',
  BarChart2: '📊', DollarSign: '💰', Link2: '🔗', Smartphone: '📱', Share2: '🔗',
  CheckSquare: '✅', BarChart3: '📈', Wallet: '💼', ClipboardList: '📋',
};

export default function FeaturesPageClient() {
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
              {t.features.pageBadge}
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-5 leading-tight">
            {t.features.pageTitle}
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.features.pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allFeatures.map((feature, index) => {
              const displayBadge = isAr ? (feature.arBadge ?? feature.badge) : feature.badge;
              const displayH1    = isAr ? feature.arabicH1 : feature.h1;
              const displaySub   = isAr ? (feature.arSubtitle ?? feature.subtitle) : feature.subtitle;
              return (
                <motion.div
                  key={feature.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease }}
                >
                  <Link
                    href={`/features/${feature.slug}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}18` }}
                    >
                      {iconMap[feature.iconName] || '⚡'}
                    </div>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: feature.color }}
                    >
                      {displayBadge}
                    </span>
                    <h2 className="text-base font-bold text-[#0F172A] mb-2 group-hover:text-[#25A4E8] transition-colors leading-snug">
                      {displayH1}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">
                      {displaySub.slice(0, 80)}...
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#25A4E8] opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                      {t.buttons.learnMore} →
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
              {t.features.seeInAction}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.features.seeInActionDesc}
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
