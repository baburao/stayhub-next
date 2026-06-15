'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const POINTS = [
  { en: 'A walkthrough tailored to your portfolio size', ar: 'جولة مخصصة حسب حجم محفظتك' },
  { en: 'See channel sync, automation, and compliance live', ar: 'شاهد مزامنة القنوات والأتمتة والامتثال مباشرة' },
  { en: 'Answers to your questions from a Saudi-based expert', ar: 'إجابات على أسئلتك من خبير مقيم في السعودية' },
  { en: 'Clear pricing with no obligation', ar: 'أسعار واضحة دون أي التزام' },
];

export default function DemoPageClient() {
  const { isAr } = useLanguage();
  const { openModal } = useDemoModal();

  // Open the booking modal automatically when the page loads.
  // `openModal` is memoized in DemoModalContext, so closing the modal
  // does NOT re-run this effect (which previously caused it to reopen).
  useEffect(() => {
    const t = setTimeout(() => openModal(), 400);
    return () => clearTimeout(t);
  }, [openModal]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-b from-[#EFF8FF] to-white px-4 py-16">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-[760px] mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-[#25A4E8] text-[11px] font-bold rounded-full border border-[#25A4E8]/20 shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          {isAr ? 'عرض تجريبي مجاني' : 'Free Demo'}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
          className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-[1.12] tracking-tight"
        >
          {isAr ? 'شاهد StayHub أثناء العمل' : 'See StayHub in Action'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="text-slate-500 text-base md:text-lg mt-5 max-w-[560px] mx-auto leading-relaxed"
        >
          {isAr
            ? 'احجز عرضاً تجريبياً مدته 30 دقيقة وسنريك كيف يوحّد StayHub قنواتك وأتمتتك وامتثالك في منصة واحدة.'
            : 'Book a 30-minute demo and we’ll show you how StayHub unifies your channels, automation, and compliance in one platform.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mt-8 grid sm:grid-cols-2 gap-3 max-w-[600px] mx-auto"
        >
          {POINTS.map((p, i) => (
            <div key={i} className={`flex items-start gap-3 bg-white rounded-xl border border-slate-200 p-3.5 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <div className="w-5 h-5 rounded-full bg-[#22c55e]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-[#22c55e]" />
              </div>
              <span className="text-sm text-slate-600 leading-snug">{isAr ? p.ar : p.en}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          onClick={openModal}
          className="mt-9 inline-flex items-center gap-2.5 px-8 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-400/30 hover:scale-[1.02]"
        >
          {isAr ? 'احجز عرضك التجريبي' : 'Book Your Demo'}
          <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
        </motion.button>
      </div>
    </div>
  );
}
