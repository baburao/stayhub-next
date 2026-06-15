'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useDemoModal } from '@/lib/DemoModalContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function LoginPageClient() {
  const { isAr } = useLanguage();
  const { openModal } = useDemoModal();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-[#EFF8FF] to-white px-4 py-16">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative w-full max-w-[420px] bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10"
      >
        <div className={`mb-7 ${isAr ? 'text-right' : 'text-left'}`}>
          <h1 className="text-2xl font-extrabold text-[#0F172A]">
            {isAr ? 'تسجيل الدخول' : 'Sign in to StayHub'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isAr ? 'أدخل بياناتك للوصول إلى لوحة التحكم.' : 'Enter your details to access your dashboard.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {isAr ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <div className="relative">
              <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="email"
                autoComplete="email"
                placeholder={isAr ? 'name@company.com' : 'name@company.com'}
                className={`w-full py-3 rounded-xl border border-slate-200 focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 outline-none transition-all text-sm ${isAr ? 'pr-10 pl-3.5 text-right' : 'pl-10 pr-3.5'}`}
              />
            </div>
          </div>

          <div className={isAr ? 'text-right' : 'text-left'}>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full py-3 rounded-xl border border-slate-200 focus:border-[#25A4E8] focus:ring-2 focus:ring-[#25A4E8]/20 outline-none transition-all text-sm ${isAr ? 'pr-10 pl-3.5 text-right' : 'pl-10 pr-3.5'}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25A4E8] hover:bg-[#1A8FD1] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-400/30"
          >
            {isAr ? 'تسجيل الدخول' : 'Sign in'}
            <ArrowRight size={15} className={isAr ? 'rotate-180' : ''} />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          {isAr ? 'ليس لديك حساب بعد؟' : 'Don’t have an account yet?'}{' '}
          <button onClick={openModal} className="font-bold text-[#25A4E8] hover:underline">
            {isAr ? 'احجز عرضاً تجريبياً' : 'Book a demo'}
          </button>
        </p>
        <p className="text-center text-xs text-slate-400 mt-4">
          <Link href="/help" className="hover:text-[#25A4E8]">
            {isAr ? 'تحتاج مساعدة؟' : 'Need help signing in?'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
