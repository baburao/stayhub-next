'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

export interface ContentSection {
  /** Section heading */
  h: string;
  hAr: string;
  /** Body paragraphs */
  body?: string[];
  bodyAr?: string[];
  /** Optional bullet list */
  bullets?: string[];
  bulletsAr?: string[];
}

export interface ContentCard {
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  meta?: string;
  metaAr?: string;
}

export interface ContentPageData {
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  /** Long-form prose sections */
  sections?: ContentSection[];
  /** Card grid (e.g. blog posts, jobs, case studies) */
  cards?: ContentCard[];
  cardsTitle?: string;
  cardsTitleAr?: string;
  /** Final-line note under legal pages, e.g. "Last updated" */
  note?: string;
  noteAr?: string;
  /** Show the Book a Demo CTA band */
  showCta?: boolean;
}

export default function ContentPageTemplate({ data }: { data: ContentPageData }) {
  const { isAr } = useLanguage();
  const { openModal } = useDemoModal();

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF8FF] to-white pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className={`relative max-w-[900px] mx-auto px-4 md:px-8 ${isAr ? 'text-right' : 'text-left'}`}>
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-[#25A4E8] text-[11px] font-bold rounded-full border border-[#25A4E8]/20 shadow-sm mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#25A4E8]" />
            {isAr ? data.badgeAr : data.badge}
          </motion.span>
          <motion.h1
            {...fadeUp(0.05)}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight"
          >
            {isAr ? data.titleAr : data.title}
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="text-slate-500 text-base md:text-lg mt-5 leading-relaxed max-w-[640px]"
            style={isAr ? { marginInlineStart: 'auto' } : undefined}
          >
            {isAr ? data.subtitleAr : data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ── Prose sections ── */}
      {data.sections && data.sections.length > 0 && (
        <section className="py-12 md:py-16">
          <div className={`max-w-[820px] mx-auto px-4 md:px-8 ${isAr ? 'text-right' : 'text-left'}`}>
            {data.sections.map((s, i) => (
              <motion.div key={i} {...fadeUp(0.05)} className="mb-10 last:mb-0">
                <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3">
                  {isAr ? s.hAr : s.h}
                </h2>
                {(isAr ? s.bodyAr : s.body)?.map((p, j) => (
                  <p key={j} className="text-slate-600 leading-relaxed mb-3">{p}</p>
                ))}
                {(isAr ? s.bulletsAr : s.bullets) && (
                  <ul className={`mt-3 space-y-2 ${isAr ? 'pe-1' : 'ps-1'}`}>
                    {(isAr ? s.bulletsAr : s.bullets)!.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-slate-600">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#25A4E8] shrink-0" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Card grid ── */}
      {data.cards && data.cards.length > 0 && (
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            {(data.cardsTitle || data.cardsTitleAr) && (
              <h2 className={`text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                {isAr ? data.cardsTitleAr : data.cardsTitle}
              </h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.cards.map((c, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.04 * i)}
                  className={`bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-[#25A4E8]/30 transition-all ${isAr ? 'text-right' : 'text-left'}`}
                >
                  {(c.meta || c.metaAr) && (
                    <span className="inline-block text-[11px] font-bold text-[#25A4E8] bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                      {isAr ? c.metaAr : c.meta}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                    {isAr ? c.titleAr : c.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {isAr ? c.descAr : c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Note (legal "last updated") ── */}
      {(data.note || data.noteAr) && (
        <div className={`max-w-[820px] mx-auto px-4 md:px-8 pb-10 ${isAr ? 'text-right' : 'text-left'}`}>
          <p className="text-xs text-slate-400">{isAr ? data.noteAr : data.note}</p>
        </div>
      )}

      {/* ── CTA band ── */}
      {data.showCta !== false && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-4 md:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#25A4E8] to-[#7C69E8] px-8 py-12 md:px-14 md:py-16 text-center">
              <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  {isAr ? 'جاهز لإدارة عقاراتك بذكاء؟' : 'Ready to run your properties smarter?'}
                </h2>
                <p className="text-white/85 mb-7 max-w-[520px] mx-auto">
                  {isAr
                    ? 'احجز عرضاً تجريبياً مجانياً وشاهد كيف يوحّد StayHub كل عملياتك.'
                    : 'Book a free demo and see how StayHub unifies your entire operation.'}
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button
                    onClick={openModal}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#25A4E8] font-bold rounded-xl hover:scale-[1.03] transition-transform shadow-lg"
                  >
                    {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
                    <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                  </button>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                  >
                    {isAr ? 'عرض الأسعار' : 'View Pricing'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
