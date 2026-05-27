'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'white' | 'ghost' | 'teal';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#25A4E8] text-white hover:bg-[#1A8FD1] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
  outline:
    'border-2 border-[#25A4E8] text-[#25A4E8] hover:bg-[#25A4E8] hover:text-white',
  white:
    'bg-white text-[#25A4E8] hover:bg-blue-50 shadow-lg',
  ghost:
    'text-[#25A4E8] hover:bg-blue-50',
  teal:
    'bg-[#7C69E8] text-white hover:bg-[#0d9488] shadow-lg shadow-teal-500/25',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  type = 'button',
  external = false,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
