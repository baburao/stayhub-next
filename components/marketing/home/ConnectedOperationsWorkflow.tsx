'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export type WorkflowStep = {
  num: string;
  title: string;
  desc: string;
  color: string;
  bg: string;
  stage: 'booking' | 'messaging' | 'identity' | 'payment' | 'access' | 'field' | 'reporting';
};

export type WorkflowOutcome = { title: string; desc: string };

const STAGGER_MS = 260;

export default function ConnectedOperationsWorkflow({
  isAr,
  steps,
  outcomes,
}: {
  isAr: boolean;
  steps: WorkflowStep[];
  outcomes: WorkflowOutcome[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setActiveIndex(steps.length - 1);
      return;
    }
    if (!entered) return;
    let i = -1;
    const id = setInterval(() => {
      i += 1;
      setActiveIndex(i);
      if (i >= steps.length - 1) clearInterval(id);
    }, STAGGER_MS);
    return () => clearInterval(id);
  }, [entered, reduced, steps.length]);

  const progressPct = ((activeIndex + 1) / steps.length) * 100;
  const stageIndex = (stage: WorkflowStep['stage']) => steps.findIndex((s) => s.stage === stage);
  const stageActive = (stage: WorkflowStep['stage']) => activeIndex >= stageIndex(stage);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #121447 0%, #4733c7 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* ── Header row: headline + integration panel ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <p className="text-[#14c7c4] text-xs font-extrabold uppercase tracking-widest mb-4">
              {isAr ? 'عمليات مترابطة' : 'CONNECTED OPERATIONS'}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 max-w-2xl">
              {isAr
                ? 'من الحجز إلى تقارير الملاك، تبقى كل خطوة مترابطة'
                : 'From booking to owner reporting, every step stays connected'}
            </h2>
            <p className="text-[#d6e0ff] text-lg leading-relaxed max-w-xl">
              {isAr
                ? 'ينسّق StayHub الحجوزات وتواصل الضيوف والتحقق والمدفوعات والوصول والتنظيف والتقارير التشغيلية من خلال سير عمل مترابط.'
                : 'StayHub coordinates reservations, guest communication, verification, payments, access, housekeeping and operational reporting through one connected workflow.'}
            </p>
          </motion.div>

          {/* Right: integration chip panel — chips light up as their stage activates */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-full lg:w-[360px] bg-white/10 border border-white/18 rounded-xl p-6"
          >
            <p className="text-white font-bold text-lg mb-4">
              {isAr ? 'تكاملات قوية' : 'Powerful integrations'}
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2 flex-wrap">
                <IntegrationChip active={stageActive('messaging')} accent="#0aad7a">
                  <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={14} height={14} className="shrink-0" aria-hidden="true" />
                  {isAr ? 'واتساب' : 'WhatsApp'}
                </IntegrationChip>
                <IntegrationChip active={stageActive('messaging')} accent="#14c7c4">SMS</IntegrationChip>
                <IntegrationChip active={stageActive('access')} accent="#ff851c" imageOnly>
                  <Image src="/logos/tuya.webp" alt="Tuya" width={64} height={28} className="object-contain h-7 w-auto" />
                </IntegrationChip>
              </div>
              <div className="flex gap-2 flex-wrap">
                <IntegrationChip active={stageActive('access')} accent="#ff851c" imageOnly>
                  <Image src="/logos/ttlock.webp" alt="TTLock" width={80} height={28} className="object-contain h-7 w-auto" />
                </IntegrationChip>
                <IntegrationChip active={stageActive('payment')} accent="#8b3ef0">ANB</IntegrationChip>
                <IntegrationChip active={stageActive('identity')} accent="#6a5cf5" imageOnly>
                  <Image src="/logos/absher.png" alt="Absher" width={80} height={28} className="object-contain h-7 w-auto" />
                </IntegrationChip>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Desktop / tablet: horizontal 7-step journey ── */}
        <div className="hidden lg:block relative mb-6">
          {/* Connector track — decorative, purely visual progression indicator */}
          <div
            aria-hidden="true"
            className="absolute h-[2px] top-[38px] rounded-full bg-white/12 overflow-hidden"
            style={{ left: 'calc(100%/14)', right: 'calc(100%/14)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #25A4E8, #14c7c4, #6a5cf5, #8b3ef0, #ff851c, #0aad7a, #f04580)',
                transition: reduced ? 'none' : 'width 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
            {!reduced && activeIndex >= 0 && activeIndex < steps.length - 1 && (
              <span
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse"
                style={{ left: `calc(${progressPct}% - 4px)`, backgroundColor: steps[activeIndex]?.color }}
              />
            )}
          </div>

          <div className="grid lg:grid-cols-7 gap-3 relative z-10">
            {steps.map((step, i) => {
              const state = i < activeIndex || reduced ? 'done' : i === activeIndex ? 'active' : 'pending';
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  animate={state === 'active' && !reduced ? { y: -4 } : { y: 0 }}
                  className="relative bg-white rounded-xl p-4 flex flex-col gap-3 cursor-default"
                  style={{
                    border: state === 'pending' ? '1px solid rgba(255,255,255,0.14)' : `1.5px solid ${step.color}`,
                    boxShadow:
                      state === 'active'
                        ? `0 0 0 1.5px ${step.color}66, 0 16px 40px ${step.color}38`
                        : state === 'done'
                        ? `0 4px 16px ${step.color}22`
                        : '0 2px 8px rgba(0,0,0,0.06)',
                    opacity: state === 'pending' ? 0.85 : 1,
                  }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 relative z-10"
                    style={{ backgroundColor: state === 'pending' ? '#EEF1F8' : step.bg }}
                    animate={state === 'active' && !reduced ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-lg font-extrabold leading-none" style={{ color: step.color }}>
                      {step.num}
                    </span>
                  </motion.div>

                  <p className="font-bold text-[#081133] text-[15px] leading-snug relative z-10">{step.title}</p>
                  <p className="text-[#5c6687] text-[12px] leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile / tablet: vertical connected timeline ── */}
        <div className="lg:hidden relative mb-6 ps-14">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 w-[2px] bg-white/12 rounded-full"
            style={{ [isAr ? 'right' : 'left']: '23px' } as React.CSSProperties}
          >
            <div
              className="w-full rounded-full"
              style={{
                height: `${progressPct}%`,
                background: 'linear-gradient(180deg, #25A4E8, #14c7c4, #6a5cf5, #8b3ef0, #ff851c, #0aad7a, #f04580)',
                transition: reduced ? 'none' : 'height 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step, i) => {
              const state = i < activeIndex || reduced ? 'done' : i === activeIndex ? 'active' : 'pending';
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white rounded-xl p-4 flex flex-col gap-2"
                  style={{
                    border: state === 'pending' ? '1px solid rgba(255,255,255,0.14)' : `1.5px solid ${step.color}`,
                    boxShadow: state === 'active' ? `0 0 0 1.5px ${step.color}66, 0 12px 30px ${step.color}30` : `0 2px 8px rgba(0,0,0,0.06)`,
                  }}
                >
                  <span
                    className="absolute -top-1 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-extrabold border-2 border-[#121447]"
                    style={{ [isAr ? 'right' : 'left']: '-45px', backgroundColor: step.bg, color: step.color } as React.CSSProperties}
                  >
                    {step.num}
                  </span>
                  <p className="font-bold text-[#081133] text-[15px] leading-snug">{step.title}</p>
                  <p className="text-[#5c6687] text-[12px] leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Outcome rail ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/10 border border-white/16 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {outcomes.map((outcome, i) => (
            <div key={i} className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(20,199,196,0.12)]">
                <CheckCircle2 size={22} className="text-[#14c7c4]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-snug">{outcome.title}</p>
                <p className="text-[#d6deff] text-[13px] leading-snug mt-0.5">{outcome.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IntegrationChip({
  active,
  accent,
  imageOnly = false,
  children,
}: {
  active: boolean;
  accent: string;
  imageOnly?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-lg transition-all duration-300 ${
        imageOnly ? 'px-2 py-2' : 'px-3 py-1.5 text-xs font-semibold'
      }`}
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.72)',
        color: imageOnly ? undefined : accent,
        boxShadow: active ? `0 0 0 1.5px ${accent}88, 0 4px 16px ${accent}40` : 'none',
      }}
    >
      {children}
    </span>
  );
}
