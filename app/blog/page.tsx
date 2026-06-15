import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Blog — Property Management Insights | StayHub',
  description:
    'Tips, guides, and insights for Saudi property managers — channel management, automation, dynamic pricing, ZATCA compliance, and growing direct bookings.',
  alternates: { canonical: 'https://www.stayhub.sa/blog' },
};

const data: ContentPageData = {
  badge: 'Blog',
  badgeAr: 'المدونة',
  title: 'Insights for Saudi Property Managers',
  titleAr: 'رؤى لمديري العقارات السعوديين',
  subtitle:
    'Practical guides on channel management, automation, pricing, and compliance — written for the Saudi short-term rental market.',
  subtitleAr:
    'أدلة عملية حول إدارة القنوات والأتمتة والتسعير والامتثال — مكتوبة لسوق الإيجار قصير الأمد السعودي.',
  cardsTitle: 'Latest Articles',
  cardsTitleAr: 'أحدث المقالات',
  cards: [
    { meta: 'Compliance', metaAr: 'الامتثال', title: 'ZATCA E-Invoicing for Rentals: A 2026 Guide', titleAr: 'الفوترة الإلكترونية لزاتكا للإيجارات: دليل 2026', desc: 'Everything Saudi hosts need to know about compliant e-invoicing for short-term rentals.', descAr: 'كل ما يحتاج المضيفون السعوديون معرفته عن الفوترة الإلكترونية المتوافقة للإيجارات قصيرة الأمد.' },
    { meta: 'Pricing', metaAr: 'التسعير', title: 'How Dynamic Pricing Grows Revenue', titleAr: 'كيف يزيد التسعير الديناميكي الإيرادات', desc: 'Why static rates leave money on the table and how to price for demand and events.', descAr: 'لماذا تترك الأسعار الثابتة المال على الطاولة وكيف تسعّر حسب الطلب والفعاليات.' },
    { meta: 'Operations', metaAr: 'العمليات', title: 'Automating the Guest Journey End to End', titleAr: 'أتمتة رحلة الضيف من البداية للنهاية', desc: 'From booking to review request — how to automate every step and reclaim your day.', descAr: 'من الحجز إلى طلب التقييم — كيف تؤتمت كل خطوة وتستعيد يومك.' },
    { meta: 'Channels', metaAr: 'القنوات', title: 'Avoiding Double Bookings Across OTAs', titleAr: 'تجنّب الحجوزات المزدوجة عبر القنوات', desc: 'How real-time calendar sync keeps Airbnb, Booking.com, and Gathern aligned.', descAr: 'كيف تبقي المزامنة الآنية للتقويم Airbnb وBooking.com وغثرن متوافقة.' },
    { meta: 'Direct Booking', metaAr: 'الحجز المباشر', title: 'Building a Direct Booking Channel', titleAr: 'بناء قناة حجز مباشر', desc: 'Reduce OTA commissions by driving guests to your own branded booking site.', descAr: 'قلّل عمولات القنوات بتوجيه الضيوف إلى موقع حجزك الخاص.' },
    { meta: 'Smart Home', metaAr: 'المنزل الذكي', title: 'Keyless Check-in That Guests Love', titleAr: 'تسجيل وصول بلا مفتاح يحبه الضيوف', desc: 'How smart locks remove key handovers and secure every stay automatically.', descAr: 'كيف تزيل الأقفال الذكية تسليم المفاتيح وتؤمّن كل إقامة تلقائياً.' },
  ],
};

export default function BlogPage() {
  return <ContentPageTemplate data={data} />;
}
