import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/sections/SolutionsPageClient';

export const metadata: Metadata = {
  title: 'Solutions for Property Managers & Hosts in Saudi Arabia | StayHub',
  description:
    'StayHub has tailored solutions for property managers, vacation rental hosts, hotels, and multi-owner operators. Find the plan built for your specific role.',
  alternates: { canonical: 'https://www.stayhub.sa/solutions' },
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
