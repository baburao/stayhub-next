import type { Metadata } from 'next';
import FeaturesPageClient from '@/components/sections/FeaturesPageClient';

export const metadata: Metadata = {
  title: 'All Features — Property Management Tools | StayHub',
  description:
    'Explore all 14 StayHub features: channel manager, guest verification, automated messaging, revenue analytics, owner portal, and more — built for Saudi property managers.',
  alternates: { canonical: 'https://www.stayhub.sa/features' },
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
