import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import DemoTriggerButton from './DemoTriggerButton';

/* Static product-led hero. Presentational only — language arrives as a prop so the
   component itself carries no client state beyond the demo-modal trigger island. */
export default function ProductHero({ isAr }: { isAr: boolean }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-white py-16 md:py-24">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 end-0 w-[420px] h-[420px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[44fr_56fr] gap-10 lg:gap-14 items-center">

          {/* ── Copy column ── */}
          <div className="text-start">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider rounded-full border border-blue-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#25A4E8]" aria-hidden="true" />
              {isAr ? 'منصة تشغيل الضيافة للمشغّلين في السعودية' : 'Hospitality operating platform for Saudi operators'}
            </span>

            {/* Stable H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] leading-[1.12] tracking-tight mb-5">
              {isAr
                ? 'شغّل عقاراتك، وادعم احتياجات التشغيل في قطاع الضيافة السعودي، ونمِ حجوزاتك من منصة واحدة.'
                : 'Run your properties, support Saudi operating needs, and grow bookings from one platform.'}
            </h1>

            {/* Supporting text */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {isAr
                ? 'اجمع قنوات الحجز وتواصل الضيوف والتحقق والمدفوعات والأقفال الذكية والتنظيف وتقارير الملاك في منصة ضيافة مترابطة واحدة.'
                : 'Bring booking channels, guest communication, verification, payments, smart locks, housekeeping and owner reporting into one connected hospitality platform.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <DemoTriggerButton className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] px-7 py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25A4E8] focus-visible:ring-offset-2">
                {isAr ? 'احجز عرضاً مخصصاً' : 'Book a tailored demo'}
                <ArrowRight size={15} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
              </DemoTriggerButton>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] px-7 py-4 bg-white border border-slate-200 hover:border-slate-300 text-[#0F172A] font-bold rounded-xl text-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2"
              >
                {isAr ? 'استكشف المنصة' : 'Explore the platform'}
              </Link>
            </div>

            {/* Microcopy */}
            <p className="text-slate-500 text-xs mt-4">
              {isAr ? '20 دقيقة · مخصص لمحفظتك · بدون التزام' : '20 minutes · Tailored to your portfolio · No commitment'}
            </p>
          </div>

          {/* ── Product visual ── */}
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#25A4E8]/15 via-[#7C69E8]/10 to-transparent blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            {/* Restrained browser frame */}
            <div className="relative rounded-2xl border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(17,12,46,0.16)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-100" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>
              <Image
                src="/Stayhub_calendar.webp"
                alt={isAr
                  ? 'لوحة تحكم StayHub — تقويم التوفر متعدد العقارات'
                  : 'StayHub dashboard — multi-property availability calendar'}
                width={2880}
                height={1800}
                sizes="(max-width: 1024px) 100vw, 56vw"
                priority
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
