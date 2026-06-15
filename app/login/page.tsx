import type { Metadata } from 'next';
import LoginPageClient from '@/components/sections/LoginPageClient';

export const metadata: Metadata = {
  title: 'Sign In — StayHub',
  description: 'Sign in to your StayHub property management dashboard.',
  alternates: { canonical: 'https://www.stayhub.sa/login' },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
