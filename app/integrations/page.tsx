import type { Metadata } from 'next';
import IntegrationsPageClient from '@/components/sections/IntegrationsPageClient';

export const metadata: Metadata = {
  title: 'OTA Integrations — Airbnb, Booking.com, Gathern & More | StayHub',
  description:
    'StayHub connects your properties to all major booking platforms including Airbnb, Booking.com, Agoda, Expedia, Google Vacation Rentals, and Gathern. Real-time 2-way sync from one dashboard.',
  alternates: { canonical: 'https://www.stayhub.sa/integrations' },
};

export default function IntegrationsPage() {
  return <IntegrationsPageClient />;
}
