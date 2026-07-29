'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronRight, ChevronDown, CheckCircle2, Mail, Clock, RefreshCw,
  ListChecks, Calendar, Inbox, MessageSquare, BarChart2, Zap, TrendingUp, Sparkles,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/lib/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const COLOR = '#00897B'; // Attiude brand teal (from integrations data)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease },
});

/* ── Waitlist email capture ───────────────────────────────────
   NOTE: no backend yet — submission is captured client-side and shows a
   success state, matching the rest of the site's forms. On launch this must be
   wired to a real capture endpoint and leads tagged "Attiude waitlist" in the CRM. */
function WaitlistForm({ isAr }: { isAr: boolean }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-start">
        <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
        <p className="text-sm font-semibold text-emerald-800">
          {isAr
            ? 'أنت الآن على القائمة — سنراسلك فور إطلاق Attiude.'
            : "You're on the list — we'll email you the moment Attiude goes live."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
      className={`flex flex-col sm:flex-row gap-3 ${isAr ? 'sm:flex-row-reverse' : ''}`}
    >
      <div className="relative flex-1">
        <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isAr ? 'right-4' : 'left-4'}`} />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
          className={`w-full rounded-xl border border-slate-200 bg-white py-4 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-colors focus:border-[#00897B] ${isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'}`}
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-xl px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: COLOR }}
      >
        {isAr ? 'انضم لقائمة الانتظار' : 'Join the waitlist'}
      </button>
    </form>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-start hover:bg-slate-50 transition-colors"
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

export default function AttiudeComingSoonClient() {
  const { isAr } = useLanguage();

  const statuses = [
    {
      icon: Clock,
      value: isAr ? 'قيد التطوير' : 'In development',
      label: isAr ? 'تكامل مباشر قيد الإنشاء' : 'direct integration underway',
    },
    {
      icon: RefreshCw,
      value: isAr ? 'مزامنة من اليوم الأول' : 'Day-one sync',
      label: isAr ? 'التقويمات والأسعار والحجوزات' : 'calendars, rates, and reservations',
    },
    {
      icon: ListChecks,
      value: isAr ? 'قائمة الانتظار مفتوحة' : 'Waitlist open',
      label: isAr ? 'المضيفون الأوائل يحصلون على أولوية الإعداد' : 'early hosts get priority onboarding',
    },
  ];

  const included = [
    {
      icon: Calendar,
      title: isAr ? 'مزامنة تقويم ثنائية الاتجاه' : 'Two-way calendar sync',
      desc: isAr
        ? 'ستتزامن الإتاحة في الاتجاهين منذ اليوم الأول — دون حجوزات مزدوجة، حتى على قناة جديدة تماماً.'
        : 'Availability will sync in both directions from day one — no double bookings, even on a brand-new channel.',
    },
    {
      icon: Inbox,
      title: isAr ? 'صندوق وارد موحّد' : 'Unified inbox',
      desc: isAr
        ? 'ستصل رسائل ضيوف Attiude إلى نفس صندوق الوارد مع Airbnb وBooking.com وواتساب.'
        : 'Attiude guest messages will flow into the same inbox as Airbnb, Booking.com, and WhatsApp.',
    },
    {
      icon: MessageSquare,
      title: isAr ? 'مراسلة ضيوف مؤتمتة' : 'Automated guest messaging',
      desc: isAr
        ? 'ستُرسل رسائل تسجيل الوصول والمغادرة والمتابعة إلى ضيوف Attiude تلقائياً، بالعربية والإنجليزية.'
        : 'Check-in, check-out, and follow-up messages will go to Attiude guests automatically, in Arabic and English.',
    },
    {
      icon: BarChart2,
      title: isAr ? 'مزامنة الحجوزات والتقارير' : 'Reservation & reporting sync',
      desc: isAr
        ? 'ستظهر حجوزات Attiude فوراً في StayHub، وستظهر القناة في تحليلاتك جنباً إلى جنب مع كل منصة أخرى.'
        : 'Attiude bookings will appear instantly in StayHub, and the channel will show up in your analytics alongside every other platform.',
    },
  ];

  const reasons = [
    {
      icon: Zap,
      title: isAr ? 'أولوية الإعداد' : 'Priority onboarding',
      desc: isAr
        ? 'يحصل أعضاء قائمة الانتظار على الربط أولاً عند فتح القناة.'
        : 'Waitlist members get connected first when the channel opens.',
    },
    {
      icon: TrendingUp,
      title: isAr ? 'أفضلية الظهور المبكر' : 'First-mover visibility',
      desc: isAr
        ? 'المنصات الجديدة أقل ازدحاماً — القوائم المبكرة تجمع الحجوزات والتقييمات بينما ينتظر الآخرون.'
        : 'New platforms have less competition — early listings collect bookings and reviews while others wait.',
    },
    {
      icon: Sparkles,
      title: isAr ? 'دون أي جهد إضافي' : 'Zero extra work',
      desc: isAr
        ? 'عند إطلاق Attiude، تنشر StayHub قوائمك الحالية عليها — دون إعادة إدخال بيانات، ودون لوحة تحكم جديدة تتعلمها.'
        : 'When Attiude goes live, StayHub publishes your existing listings to it — no re-entering data, no new dashboard to learn.',
    },
  ];

  const others = [
    { slug: 'airbnb',      name: 'Airbnb',       color: '#FF5A5F', desc: isAr ? 'أكبر منصة لتأجير العطلات في العالم' : "The world's largest vacation rental platform" },
    { slug: 'booking-com', name: 'Booking.com',  color: '#1D4ED8', desc: isAr ? 'أكبر وكالة سفر إلكترونية في العالم' : "The world's largest online travel agency" },
    { slug: 'gathern',     name: isAr ? 'غثرن' : 'Gathern', color: '#0F766E', desc: isAr ? 'منصة الإيجار المحلية الرائدة في السعودية للإيجارات قصيرة الأجل' : "Saudi Arabia's leading local short-term rental platform" },
  ];

  const faq = [
    {
      q: isAr ? 'متى سيُطلق تكامل Attiude؟' : 'When will the Attiude integration launch?',
      a: isAr
        ? 'نعمل بنشاط على بناء التكامل وسننبّه أعضاء قائمة الانتظار فور تفعيله. الانضمام إلى قائمة الانتظار هو أسرع طريقة لتعرف.'
        : "We're actively building the integration and will notify waitlist members the moment it's live. Joining the waitlist is the fastest way to know.",
    },
    {
      q: isAr ? 'ماذا سيتضمن التكامل عند الإطلاق؟' : 'What will the integration include at launch?',
      a: isAr
        ? 'مزامنة تقويم ثنائية الاتجاه، ومراسلة ضيوف موحّدة، ورسائل تلقائية بالعربية والإنجليزية، ومزامنة الحجوزات في لوحة تحكم StayHub — بنفس معيار تكاملات قنواتنا الفعّالة.'
        : 'Two-way calendar sync, unified guest messaging, automated Arabic/English messages, and reservation sync into your StayHub dashboard — the same standard as our live channel integrations.',
    },
    {
      q: isAr ? 'هل أحتاج إلى تجهيز أي شيء الآن؟' : 'Do I need to prepare anything now?',
      a: isAr
        ? 'لا. إذا كانت عقاراتك موجودة بالفعل في StayHub، فستكون جاهزة للنشر على Attiude يوم الإطلاق. وإذا لم تكن على StayHub بعد، فحجز عرض توضيحي الآن يعني أنك ستكون جاهزاً قبل فتح القناة.'
        : "No. If your properties are already in StayHub, they'll be ready to publish to Attiude on launch day. If you're not on StayHub yet, booking a demo now means you're set up before the channel opens.",
    },
    {
      q: isAr ? 'هل هناك تكلفة للانضمام إلى قائمة الانتظار؟' : 'Is there a cost to join the waitlist?',
      a: isAr
        ? 'لا — قائمة الانتظار مجانية وغير مُلزمة. كل ما تمنحك إياه هو أولوية الإعداد والتنبيه يوم الإطلاق.'
        : 'No — the waitlist is free and non-binding. It just gets you priority onboarding and launch-day notification.',
    },
  ];

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ q, a }) => ({
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
        style={{ background: `linear-gradient(135deg, ${COLOR}12 0%, #EFF8FF 60%, #fff 100%)` }}
      >
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl" style={{ backgroundColor: COLOR }} />
        <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-[#25A4E8] opacity-[0.06] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8">
          <motion.nav {...fadeUp(0)} className="flex items-center gap-2 text-sm text-slate-400 mb-10 justify-center">
            <Link href="/" className="hover:text-slate-600 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <Link href="/integrations" className="hover:text-slate-600 transition-colors">{isAr ? 'التكاملات' : 'Integrations'}</Link>
            <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
            <span className="text-slate-600 font-medium">Attiude</span>
          </motion.nav>

          <div className="text-center">
            <motion.div {...fadeUp(0.05)}>
              <div className="flex flex-col items-center gap-5 mb-7">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  style={{ backgroundColor: COLOR }}
                >
                  A
                </div>
                <Badge variant="custom" color={COLOR}>{isAr ? 'قريباً' : 'Coming soon'}</Badge>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
              {isAr ? 'Attiude قادمة إلى StayHub' : 'Attiude is coming to StayHub'}
            </motion.h1>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {isAr
                ? 'نعمل على بناء تكامل مباشر مع Attiude. انضم إلى قائمة الانتظار وستصبح وحداتك جاهزة يوم إطلاق القناة — متزامنة مع كل منصة أخرى منذ أول حجز.'
                : "We're building a direct integration with Attiude. Join the waitlist and your units go live the day the channel opens — synced with every other platform from the first booking."}
            </motion.p>

            {/* Waitlist capture */}
            <motion.div {...fadeUp(0.24)} id="waitlist" className="mt-10 max-w-xl mx-auto scroll-mt-24">
              <WaitlistForm isAr={isAr} />
              <div className="mt-4">
                <Link href="/integrations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                  {isAr ? 'عرض جميع التكاملات' : 'View all integrations'}
                  <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Status bar */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {statuses.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center rounded-2xl border border-slate-100 p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${COLOR}14` }}>
                  <s.icon size={20} style={{ color: COLOR }} />
                </div>
                <p className="text-lg md:text-xl font-bold" style={{ color: COLOR }}>{s.value}</p>
                <p className="text-slate-500 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What the integration will include */}
      <section className="py-20 bg-[#EFF8FF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <Badge variant="custom" color={COLOR}>{isAr ? 'عند الإطلاق' : 'At launch'}</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
              {isAr ? 'ما الذي سيتضمنه التكامل' : 'What the integration will include'}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {included.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLOR}18` }}>
                    <item.icon size={18} style={{ color: COLOR }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join the waitlist */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <Badge variant="teal">{isAr ? 'لماذا تنضم' : 'Why join'}</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
              {isAr ? 'المضيفون الأوائل يكسبون على القنوات الجديدة' : 'Early hosts win on new channels'}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:border-[#00897B]/30 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-md" style={{ backgroundColor: COLOR }}>
                  <r.icon size={20} />
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{r.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLOR} 0%, #25A4E8 100%)` }}>
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{isAr ? 'كن الأول على Attiude' : 'Be first on Attiude'}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {isAr
                ? 'انضم إلى قائمة الانتظار وسننبهك فور إطلاق التكامل — يمكن أن تبدأ وحداتك النشر خلال دقائق من الإطلاق.'
                : "Join the waitlist and we'll notify you the moment the integration goes live — your units can be publishing within minutes of launch."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#waitlist" className="px-8 py-4 bg-white font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg" style={{ color: COLOR }}>
                {isAr ? 'انضم لقائمة الانتظار' : 'Join the waitlist'}
              </Link>
              <Link href="/integrations" className="px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                {isAr ? 'استكشف التكاملات الفعّالة' : 'Explore live integrations'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other integrations */}
      <section className="py-20 bg-[#EFF8FF]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="mb-10">
            <h2 className="text-2xl font-bold text-[#0F172A]">{isAr ? 'استكشف تكاملاتنا الفعّالة' : 'Explore our live integrations'}</h2>
            <p className="text-slate-600 mt-2">{isAr ? 'قنوات جاهزة اليوم — اربطها الآن بينما تنتظر Attiude.' : 'Channels ready today — connect them now while Attiude is on the way.'}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((o, i) => (
              <motion.div key={o.slug} {...fadeUp(i * 0.08)}>
                <Link
                  href={`/integrations/${o.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm" style={{ backgroundColor: o.color }}>
                    {o.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] group-hover:text-[#25A4E8] transition-colors">{o.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{o.desc}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#25A4E8]">
                      {isAr ? 'عرض التكامل' : 'View integration'}
                      <ArrowRight size={12} className={`transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <Badge variant="purple">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">
              {isAr ? 'تكامل Attiude — الأسئلة الشائعة' : 'Attiude integration — FAQ'}
            </h2>
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
