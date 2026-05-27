import clsx from 'clsx';
import { ReactNode } from 'react';

type Variant = 'purple' | 'teal' | 'green' | 'orange' | 'blue' | 'custom';

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  color?: string;
}

const variantClasses: Record<Variant, string> = {
  purple: 'bg-blue-100 text-blue-700 border border-blue-200',
  teal:   'bg-violet-100 text-violet-700 border border-violet-200',
  green:  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border border-orange-200',
  blue:   'bg-blue-100 text-blue-700 border border-blue-200',
  custom: '',
};

export default function Badge({ children, variant = 'purple', className, color }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
        variantClasses[variant],
        className
      )}
      style={variant === 'custom' && color ? { backgroundColor: `${color}18`, color, borderColor: `${color}40`, border: '1px solid' } : undefined}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
