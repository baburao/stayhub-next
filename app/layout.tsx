import type { Metadata } from 'next';
import { Manrope, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { LanguageProvider } from '@/lib/LanguageContext';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'StayHub — Property Management Software for Saudi Arabia',
    template: '%s | StayHub',
  },
  description:
    'The operating system for short-term rental managers in Saudi Arabia. Sync Airbnb, Booking.com, Gathern and more. Automate guest communication, protect your property, and grow revenue.',
  metadataBase: new URL('https://www.stayhub.sa'),
  openGraph: {
    type: 'website',
    siteName: 'StayHub',
    locale: 'en_SA',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@stayhubsa',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${notoKufiArabic.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <FloatingCTA />
        </LanguageProvider>
      </body>
    </html>
  );
}
