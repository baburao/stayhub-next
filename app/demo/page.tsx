import type { Metadata } from 'next';
import DemoPageClient from '@/components/sections/DemoPageClient';

export const metadata: Metadata = {
  title: 'Book a Free Demo — StayHub',
  description:
    'Book a free 30-minute demo of StayHub and see how it unifies channels, automation, payments, and Saudi compliance in one platform.',
  alternates: { canonical: 'https://www.stayhub.sa/demo' },
};

export default function DemoPage() {
  return <DemoPageClient />;
}
