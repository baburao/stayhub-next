'use client';
import type { ReactNode } from 'react';
import { useDemoModal } from '@/lib/DemoModalContext';

/* Thin client bridge to the global demo modal — keeps modal logic in one place. */
export default function DemoTriggerButton({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openModal } = useDemoModal();
  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  );
}
