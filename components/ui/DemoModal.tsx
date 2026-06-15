'use client';
import Link from 'next/link';
import Image from 'next/image';
import { X, CheckCircle2, Home, Building2, Building, Landmark, Calendar, User, Flag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

// ── Replace with your real Calendly link ──────────────────────────────────────
const CALENDLY_URL = 'https://calendly.com/stayhub-info/30min';
// ─────────────────────────────────────────────────────────────────────────────

const UNIT_OPTIONS = [
  {
    id: '1-9',
    icon: Home,
    labelEn: '1 – 9 Units',
    labelAr: '١ – ٩ وحدات',
    descEn: 'Individual host',
    descAr: 'مضيف مستقل',
    gradient: 'from-blue-50 to-sky-50',
    border: 'border-sky-200',
    iconColor: 'text-[#25A4E8]',
    iconBg: 'bg-sky-100',
  },
  {
    id: '10-49',
    icon: Building2,
    labelEn: '10 – 49 Units',
    labelAr: '١٠ – ٤٩ وحدة',
    descEn: 'Property manager',
    descAr: 'مدير عقارات',
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    iconColor: 'text-[#7C69E8]',
    iconBg: 'bg-violet-100',
  },
  {
    id: '50-199',
    icon: Building,
    labelEn: '50 – 199 Units',
    labelAr: '٥٠ – ١٩٩ وحدة',
    descEn: 'Multi-owner operator',
    descAr: 'مشغّل متعدد الملاك',
    gradient: 'from-indigo-50 to-blue-50',
    border: 'border-indigo-200',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
  },
  {
    id: '200+',
    icon: Landmark,
    labelEn: '200+ Units',
    labelAr: '+٢٠٠ وحدة',
    descEn: 'Enterprise / Hotel',
    descAr: 'مؤسسة / فندق',
    gradient: 'from-slate-50 to-gray-50',
    border: 'border-slate-200',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100',
  },
];

// ── Calendly inline embed ─────────────────────────────────────────────────────
function CalendlyEmbed({
  name, phone, onScheduled,
}: { name: string; phone: string; onScheduled: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Build prefill URL
  const params = new URLSearchParams({
    hide_landing_page_details: '1',
    hide_gdpr_banner: '1',
    primary_color: '25A4E8',
    name,
    a1: phone ? `+966${phone}` : '',
  });
  const embedUrl = `${CALENDLY_URL}?${params.toString()}`;

  useEffect(() => {
    // Listen for Calendly event scheduled message
    const handler = (e: MessageEvent) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        onScheduled();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onScheduled]);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const existing = document.querySelector('script[src*="calendly"]');
    if (existing) {
      // Script already present — init widget manually if Calendly is loaded
      if ((window as any).Calendly && containerRef.current) {
        (window as any).Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Calendly && containerRef.current) {
        (window as any).Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
        });
      }
    };
    document.head.appendChild(script);
  }, [embedUrl]);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      style={{ minHeight: 620, height: 620 }}
      data-url={embedUrl}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4; // 1: units · 2: details · 3: calendly · 4: success

export default function DemoModal() {
  const { isAr } = useLanguage();
  const { isOpen, closeModal } = useDemoModal();

  const [step, setStep] = useState(1);
  const [units, setUnits] = useState('');
  const [form, setForm] = useState({ name: '', phone: '' });

  // progress bar covers steps 1–3 (success has no bar)
  const progressMap: Record<number, number> = { 1: 0, 2: 50, 3: 100 };
  const progress = progressMap[step] ?? 100;

  const handleOpen = () => {
    setStep(1);
    setUnits('');
    setForm({ name: '', phone: '' });
  };

  const selectUnit = (id: string) => {
    setUnits(id);
    setTimeout(() => setStep(2), 260);
  };

  const slideVariants = {
    enter:  { opacity: 0, x: isAr ? -28 : 28 },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: isAr ? 28 : -28 },
  };

  // Wider modal on Calendly step
  const isCalendlyStep = step === 3;

  return (
    <AnimatePresence onExitComplete={handleOpen}>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[4px] z-[60]"
            onClick={closeModal}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.93, y: 28  }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              layout
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`bg-white rounded-3xl shadow-2xl w-full relative overflow-hidden ${isAr ? 'text-right' : ''} ${isCalendlyStep ? 'max-w-[860px]' : 'max-w-[520px]'}`}
            >
              {/* Top gradient strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#25A4E8] via-[#7C69E8] to-[#25A4E8]" />

              <div className={`${isCalendlyStep ? 'px-0 pt-0 pb-0' : 'px-8 pt-7 pb-8 md:px-10 md:pt-9 md:pb-10'}`}>

                {/* ── Calendly step: two-column layout ───────────────────────── */}
                {isCalendlyStep && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col md:flex-row"
                  >
                    {/* Left panel — summary */}
                    <div className="md:w-[260px] shrink-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] p-8 flex flex-col gap-6 rounded-bl-3xl md:rounded-bl-3xl md:rounded-tl-none">
                      <Image src="/stayhub-logo-white.svg" alt="StayHub" width={110} height={30} className="h-7 w-auto" />

                      <div>
                        <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mb-1">
                          {isAr ? 'عرض مجاني' : 'Free Demo'}
                        </p>
                        <h3 className="text-white text-xl font-extrabold leading-snug">
                          {isAr ? 'اختر موعدك المناسب' : 'Pick your slot'}
                        </h3>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                          {isAr
                            ? 'جلسة مباشرة مدتها ٣٠ دقيقة مع أحد خبراء StayHub.'
                            : '30-minute live session with a StayHub product expert.'}
                        </p>
                      </div>

                      {/* Booking summary */}
                      <div className="space-y-3 border-t border-white/10 pt-5">
                        <div className="flex items-start gap-2.5">
                          <span className="text-sky-400 mt-0.5"><User size={16} /></span>
                          <div>
                            <p className="text-white text-sm font-semibold">{form.name || '—'}</p>
                            <p className="text-slate-400 text-xs">+966 {form.phone}</p>
                          </div>
                        </div>
                        {units && (
                          <div className="flex items-center gap-2.5">
                            <span className="text-sky-400"><Home size={16} /></span>
                            <p className="text-slate-300 text-sm">
                              {UNIT_OPTIONS.find(o => o.id === units)?.[isAr ? 'labelAr' : 'labelEn']}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-2.5">
                          <span className="text-sky-400">⏱</span>
                          <p className="text-slate-300 text-sm">
                            {isAr ? '٣٠ دقيقة' : '30 minutes'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Calendar size={15} className="text-sky-400 shrink-0" />
                          <p className="text-slate-300 text-sm">
                            {isAr ? 'مكالمة فيديو — Google Meet' : 'Video call — Google Meet'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="mt-auto inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors text-left underline underline-offset-2"
                      >
                        <ArrowRight size={12} className={isAr ? '' : 'rotate-180'} />
                        {isAr ? 'تعديل التفاصيل' : 'Edit details'}
                      </button>
                    </div>

                    {/* Right panel — Calendly embed */}
                    <div className="flex-1 min-w-0 relative">
                      {/* Close button */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                        aria-label="Close"
                      >
                        <X size={16} />
                      </button>
                      <CalendlyEmbed
                        name={form.name}
                        phone={form.phone}
                        onScheduled={() => setStep(4)}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ── Steps 1, 2, 4 — standard padded layout ─────────────────── */}
                {!isCalendlyStep && (
                  <>
                    {/* Close */}
                    <button
                      onClick={closeModal}
                      className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>

                    {/* Logo */}
                    <Image src="/stayhub-logo.svg" alt="StayHub" width={120} height={32} className="h-7 w-auto mb-6" />

                    {/* Step indicator + progress */}
                    {step < TOTAL_STEPS - 1 && (
                      <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="text-xs font-semibold text-slate-400 shrink-0">
                          {isAr ? `الخطوة ${step} من ٣` : `Step ${step} of 3`}
                        </span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#25A4E8] to-[#7C69E8]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    )}

                    <AnimatePresence mode="wait">

                      {/* STEP 1 — Unit count cards */}
                      {step === 1 && (
                        <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit"
                          transition={{ duration: 0.2 }}>
                          <h2 className="text-2xl font-extrabold text-[#0F172A] leading-snug mb-1">
                            {isAr ? 'كم وحدة تديرها؟' : 'How many units do you manage?'}
                          </h2>
                          <p className="text-sm text-slate-500 mb-6">
                            {isAr ? 'اختر النطاق الذي يناسبك' : 'Select the range that best fits you'}
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {UNIT_OPTIONS.map(opt => {
                              const Icon = opt.icon;
                              const selected = units === opt.id;
                              return (
                                <motion.button
                                  key={opt.id}
                                  onClick={() => selectUnit(opt.id)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.97 }}
                                  className={`relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all cursor-pointer text-center bg-gradient-to-br ${opt.gradient} ${selected ? `${opt.border} shadow-md ring-2 ring-offset-1 ring-[#25A4E8]/40` : `${opt.border} hover:shadow-md hover:border-[#25A4E8]/50`}`}
                                >
                                  <div className={`w-12 h-12 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                                    <Icon size={22} className={opt.iconColor} strokeWidth={1.8} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#0F172A] text-sm leading-tight">
                                      {isAr ? opt.labelAr : opt.labelEn}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                      {isAr ? opt.descAr : opt.descEn}
                                    </p>
                                  </div>
                                  {selected && (
                                    <motion.div
                                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                                      className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#25A4E8] flex items-center justify-center"
                                    >
                                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </motion.div>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2 — Name + Phone */}
                      {step === 2 && (
                        <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit"
                          transition={{ duration: 0.2 }}>
                          <h2 className="text-2xl font-extrabold text-[#0F172A] leading-snug mb-1">
                            {isAr ? 'أخبرنا عن نفسك' : 'Tell us about yourself'}
                          </h2>
                          <p className="text-sm text-slate-500 mb-6">
                            {isAr ? 'سيتواصل فريقنا معك لترتيب العرض التجريبي' : "We'll use these to confirm your booking"}
                          </p>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                                {isAr ? 'الاسم الكامل' : 'Full name'}
                              </label>
                              <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                                {isAr ? 'رقم الهاتف' : 'Phone number'}
                              </label>
                              <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#25A4E8] focus-within:ring-2 focus-within:ring-[#25A4E8]/20 transition">
                                <span className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-slate-600 bg-slate-50 border-r border-slate-200 shrink-0 select-none">
                                  <Flag size={14} className="text-slate-500" /> +966
                                </span>
                                <input
                                  type="tel"
                                  value={form.phone}
                                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                  placeholder="5X XXX XXXX"
                                  className="flex-1 px-4 py-3.5 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none bg-white"
                                  dir="ltr"
                                />
                              </div>
                            </div>

                            {/* Units summary chip */}
                            {units && (
                              <div className={`flex items-center gap-2 text-xs font-medium text-slate-500 ${isAr ? 'flex-row-reverse' : ''}`}>
                                <span className="px-3 py-1 rounded-full bg-sky-50 text-[#25A4E8] border border-sky-100 font-semibold">
                                  {UNIT_OPTIONS.find(o => o.id === units)?.[isAr ? 'labelAr' : 'labelEn']}
                                </span>
                                <button
                                  onClick={() => setStep(1)}
                                  className="text-slate-400 hover:text-[#25A4E8] underline underline-offset-2 transition-colors"
                                >
                                  {isAr ? 'تعديل' : 'Change'}
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => setStep(3)}
                              disabled={!form.name.trim() || form.phone.length < 7}
                              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#25A4E8] to-[#7C69E8] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-400/30 mt-2"
                            >
                              {isAr ? 'اختر موعدك' : 'Choose a time slot'}
                              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                            </button>

                            <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                              {isAr
                                ? 'قد نتواصل معك عبر الهاتف بشأن طلبك. يمكنك إلغاء الاشتراك في أي وقت.'
                                : 'We may contact you by phone about your request. You can opt out at any time.'}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4 — Success */}
                      {step === 4 && (
                        <motion.div key="s4" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                          className="text-center py-6">
                          <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#25A4E8]/20 to-[#7C69E8]/20 animate-pulse" />
                            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#25A4E8]/10 to-[#7C69E8]/10 flex items-center justify-center">
                              <CheckCircle2 size={44} className="text-[#25A4E8]" strokeWidth={1.5} />
                            </div>
                          </div>
                          <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">
                            {isAr ? 'تم الحجز بنجاح!' : "You're booked!"}
                          </h2>
                          <p className="text-slate-500 text-sm leading-relaxed mb-3 max-w-xs mx-auto">
                            {isAr
                              ? 'تم تأكيد موعدك. تحقق من بريدك الإلكتروني لتفاصيل الاجتماع.'
                              : 'Your slot is confirmed. Check your email for the meeting details.'}
                          </p>
                          {units && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#25A4E8] mb-6">
                              {UNIT_OPTIONS.find(o => o.id === units)?.[isAr ? 'labelAr' : 'labelEn']}
                            </div>
                          )}
                          <button
                            onClick={closeModal}
                            className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition-all"
                          >
                            {isAr ? 'العودة للموقع' : 'Back to site'}
                          </button>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* Sign-in link */}
                    {step < TOTAL_STEPS - 1 && (
                      <p className={`text-sm text-slate-400 mt-6 ${isAr ? 'text-right' : 'text-center'}`}>
                        {isAr ? 'مستخدم StayHub بالفعل؟' : 'Already a StayHub user?'}{' '}
                        <Link href="/login" onClick={closeModal}
                          className="font-semibold text-[#0F172A] underline underline-offset-2 hover:text-[#25A4E8] transition-colors">
                          {isAr ? 'تسجيل الدخول' : 'Sign in'}
                        </Link>
                      </p>
                    )}
                  </>
                )}

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
