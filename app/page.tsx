import type { Metadata } from 'next';
import HomepageClient from '@/components/sections/HomepageClient';

export const metadata: Metadata = {
  title: 'StayHub — Property Management Software for Saudi Arabia',
  description:
    'The operating system for short-term rental managers in Saudi Arabia. Sync Airbnb, Booking.com, Gathern and more. Automate guest communication, protect your property, and grow revenue.',
  alternates: { canonical: 'https://www.stayhub.sa' },
};

export default function HomePage() {
  return <HomepageClient />;
}
