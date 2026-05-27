'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  href?: string;
  color?: string;
  badge?: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  href,
  color = '#25A4E8',
  badge,
  delay = 0,
}: FeatureCardProps) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full flex flex-col"
    >
      {icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
      )}
      {badge && (
        <span
          className="text-xs font-semibold uppercase tracking-wider mb-2 block"
          style={{ color }}
        >
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#25A4E8] transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">{description}</p>
      {href && (
        <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color }}>
          Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </motion.div>
  );

  if (href) return <Link href={href} className="h-full block">{inner}</Link>;
  return inner;
}
