import { ReactNode } from 'react';
import Badge from './Badge';

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  arabicTitle?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  arabicTitle,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <div className="mb-4">
          <Badge variant="purple">{badge}</Badge>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${light ? 'text-white' : 'text-[#0F172A]'}`}>
        {title}
      </h2>
      {arabicTitle && (
        <p
          dir="rtl"
          className={`text-lg font-medium mb-4 ${light ? 'text-white/70' : 'text-[#25A4E8]'}`}
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {arabicTitle}
        </p>
      )}
      {description && (
        <p className={`text-lg leading-relaxed ${light ? 'text-white/70' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
