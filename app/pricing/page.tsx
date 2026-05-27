import type { Metadata } from 'next';
import PricingPageClient from '@/components/sections/PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — Property Management Software Plans | StayHub',
  description:
    'Transparent pricing for Saudi property managers. StayHub offers Starter, Growth, and Enterprise plans with no hidden fees. Start free, upgrade as you grow.',
  alternates: { canonical: 'https://www.stayhub.sa/pricing' },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
