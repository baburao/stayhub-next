'use client';
import Link from 'next/link';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

const TOTAL_STEPS = 3;

export default function DemoModal() {
  const { isAr } = useLanguage();
  const { isOpen, closeModal } = useDemoModal();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', name: '', phone: '', properties: '' });

  const progress    = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
  const nextStep    = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));

  const handleOpen = () => { setStep(1); setForm({ email: '', name: '', phone: '', properties: '' }); };

  const slideVariants = {
    enter:  { opacity: 0, x: isAr ? -24 : 24 },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: isAr ? 24 : -24 },
  };

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
            className="fixed inset-0 bg-slate-900/55 backdrop-blur-[3px] z-[60]"
            onClick={closeModal}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{   opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-[480px] p-8 md:p-10 relative ${isAr ? 'text-right' : ''}`}>

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Step label */}
              <p className="text-sm font-semibold text-slate-400 mb-3">
                {step < TOTAL_STEPS
                  ? (isAr ? `الخطوة ${step} من ${TOTAL_STEPS - 1}` : `Step ${step} of ${TOTAL_STEPS - 1}`)
                  : ' '}
              </p>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#25A4E8]"
                  initial={{ width: 0 }}
                  animate={{ width: step === TOTAL_STEPS ? '100%' : `${progress}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <Image src="/stayhub-logo.svg" alt="StayHub" width={130} height={34} className="h-8 w-auto mb-5" />
                {step < TOTAL_STEPS && (
                  <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight">
                    {isAr ? 'احجز عرضاً مجانياً' : 'Book a free demo'}
                  </h2>
                )}
              </div>

              {/* ── Step content ── */}
              <AnimatePresence mode="wait">

                {/* STEP 1 — Email */}
                {step === 1 && (
                  <motion.div key="s1" variants={slideVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.22 }}>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                      {isAr ? 'البريد الإلكتروني' : 'Enter your e-mail address'}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder={isAr ? 'example@email.com' : 'Enter your e-mail address'}
                      className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition mb-6"
                      dir="ltr"
                    />
                    <button
                      onClick={nextStep}
                      disabled={!form.email.includes('@')}
                      className="w-full py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      {isAr ? 'التالي ←' : 'Next →'}
                    </button>
                  </motion.div>
                )}

                {/* STEP 2 — Details */}
                {step === 2 && (
                  <motion.div key="s2" variants={slideVariants} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.22 }} className="space-y-4">

                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {isAr ? 'الاسم الكامل' : 'Full name'}
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={isAr ? 'الاسم الكامل' : 'Full name'}
                        className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {isAr ? 'رقم الهاتف' : 'Phone'}
                      </label>
                      <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#25A4E8] focus-within:ring-2 focus-within:ring-[#25A4E8]/20 transition">
                        <span className="flex items-center gap-1.5 px-4 py-4 text-sm font-semibold text-slate-600 bg-slate-50 border-r border-slate-200 shrink-0 select-none">
                          🇸🇦 +966
                        </span>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="5X XXX XXXX"
                          className="flex-1 px-4 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none bg-white"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                        {isAr ? 'عدد العقارات المُدارة' : 'Number of properties managed'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={form.properties}
                        onChange={e => setForm(f => ({ ...f, properties: e.target.value }))}
                        placeholder={isAr ? 'عدد العقارات' : 'Number of properties managed'}
                        className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-[#0F172A] placeholder-slate-400 text-sm focus:outline-none focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 transition"
                        dir="ltr"
                      />
                    </div>

                    <button
                      onClick={nextStep}
                      disabled={!form.name || !form.phone}
                      className="w-full py-4 bg-[#25A4E8] hover:bg-[#1A8FD1] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 !mt-6"
                    >
                      {isAr ? 'التالي ←' : 'Next →'}
                    </button>

                    <p className="text-[11px] text-slate-400 leading-relaxed !mt-4">
                      {isAr
                        ? 'قد نتواصل معك عبر البريد الإلكتروني أو الهاتف بشأن طلبك. يمكنك إلغاء الاشتراك في أي وقت.'
                        : 'We may contact you by email or phone about your request. You can opt out at any time.'}
                    </p>
                  </motion.div>
                )}

                {/* STEP 3 — Success */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }} className="text-center py-4">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={44} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">
                      {isAr ? 'تم بنجاح! 🎉' : "You're all set! 🎉"}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                      {isAr
                        ? 'شكراً لك! سيتواصل معك فريقنا خلال 24 ساعة لترتيب عرضك التجريبي المجاني.'
                        : 'Thanks! Our team will reach out within 24 hours to schedule your free demo.'}
                    </p>
                    <button
                      onClick={closeModal}
                      className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition-all"
                    >
                      {isAr ? 'العودة للموقع' : 'Back to site'}
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Footer sign-in link */}
              {step < TOTAL_STEPS && (
                <p className={`text-sm text-slate-400 mt-6 ${isAr ? 'text-right' : 'text-center'}`}>
                  {isAr ? 'مستخدم StayHub بالفعل؟' : 'Already a StayHub user?'}{' '}
                  <Link href="/login" onClick={closeModal}
                    className="font-semibold text-[#0F172A] underline underline-offset-2 hover:text-[#25A4E8] transition-colors">
                    {isAr ? 'تسجيل الدخول' : 'Sign in'}
                  </Link>
                </p>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
