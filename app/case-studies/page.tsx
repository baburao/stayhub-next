import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Case Studies — StayHub Customer Results',
  description:
    'See how Saudi property managers use StayHub to eliminate double bookings, automate guest journeys, and grow revenue. Real results from real operators.',
  alternates: { canonical: 'https://www.stayhub.sa/case-studies' },
};

const data: ContentPageData = {
  badge: 'Case Studies',
  badgeAr: 'دراسات الحالة',
  title: 'Real Results from Saudi Operators',
  titleAr: 'نتائج حقيقية من مشغّلين سعوديين',
  subtitle:
    'From independent hosts to multi-owner operators, see how StayHub helps property managers across the Kingdom save time and grow revenue.',
  subtitleAr:
    'من المضيفين المستقلين إلى مشغّلي العقارات متعددي الملاك، شاهد كيف يساعد StayHub مديري العقارات في أنحاء المملكة على توفير الوقت وزيادة الإيرادات.',
  cardsTitle: 'Featured Stories',
  cardsTitleAr: 'قصص مختارة',
  cards: [
    { meta: 'Vacation Rentals', metaAr: 'إيجارات سياحية', title: '40% Less Admin Time', titleAr: 'تقليل 40% من العمل الإداري', desc: 'A Riyadh host managing 18 units cut daily admin work by automating messaging and check-in.', descAr: 'مضيف في الرياض يدير 18 وحدة قلّص العمل الإداري اليومي بأتمتة المراسلة وتسجيل الوصول.' },
    { meta: 'Property Manager', metaAr: 'مدير عقارات', title: 'Zero Double Bookings', titleAr: 'صفر حجوزات مزدوجة', desc: 'A Jeddah manager eliminated double bookings across Airbnb, Booking.com, and Gathern with real-time sync.', descAr: 'مدير في جدة ألغى الحجوزات المزدوجة عبر Airbnb وBooking.com وغثرن بمزامنة آنية.' },
    { meta: 'Multi-Owner', metaAr: 'متعدد الملاك', title: '24% Revenue Uplift', titleAr: 'زيادة 24% في الإيرادات', desc: 'A multi-owner operator increased revenue with dynamic pricing and automated owner reporting.', descAr: 'مشغّل متعدد الملاك زاد الإيرادات بالتسعير الديناميكي وتقارير الملاك المؤتمتة.' },
  ],
  sections: [
    {
      h: 'Want to be our next success story?',
      hAr: 'هل تريد أن تكون قصة نجاحنا التالية؟',
      body: [
        'Book a demo and we’ll show you exactly how StayHub can fit your portfolio — whether you manage 5 units or 500.',
      ],
      bodyAr: [
        'احجز عرضاً تجريبياً وسنريك بالضبط كيف يناسب StayHub محفظتك — سواء كنت تدير 5 وحدات أو 500.',
      ],
    },
  ],
};

export default function CaseStudiesPage() {
  return <ContentPageTemplate data={data} />;
}
