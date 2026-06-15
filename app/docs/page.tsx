import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Documentation — StayHub Developer & User Guides',
  description:
    'StayHub documentation: setup guides, integration references, and how-tos for configuring channels, automation, payments, and compliance.',
  alternates: { canonical: 'https://www.stayhub.sa/docs' },
};

const data: ContentPageData = {
  badge: 'Documentation',
  badgeAr: 'التوثيق',
  title: 'Documentation & Guides',
  titleAr: 'التوثيق والأدلة',
  subtitle:
    'Step-by-step guides to set up and get the most out of StayHub — from your first property to advanced automation.',
  subtitleAr:
    'أدلة خطوة بخطوة لإعداد StayHub وتحقيق أقصى استفادة منه — من أول عقار إلى الأتمتة المتقدمة.',
  cardsTitle: 'Browse by Topic',
  cardsTitleAr: 'تصفّح حسب الموضوع',
  cards: [
    { title: 'Quick Start', titleAr: 'البدء السريع', desc: 'Create your account, add properties, and go live in under an hour.', descAr: 'أنشئ حسابك وأضف العقارات وانطلق في أقل من ساعة.' },
    { title: 'Channel Manager', titleAr: 'مدير القنوات', desc: 'Connect and sync Airbnb, Booking.com, Agoda, Gathern, and more.', descAr: 'اربط وزامن Airbnb وBooking.com وAgoda وغثرن وغيرها.' },
    { title: 'Automation Rules', titleAr: 'قواعد الأتمتة', desc: 'Set up the guest journey: messaging, access codes, cleaning tasks.', descAr: 'أعدّ رحلة الضيف: المراسلة ورموز الوصول ومهام التنظيف.' },
    { title: 'Payments & Invoicing', titleAr: 'المدفوعات والفوترة', desc: 'Configure payment collection and ZATCA-compliant invoicing.', descAr: 'اضبط تحصيل المدفوعات والفوترة المتوافقة مع زاتكا.' },
    { title: 'Compliance Setup', titleAr: 'إعداد الامتثال', desc: 'Enable Absher verification, Ejar contracts, and Shomoos registration.', descAr: 'فعّل التحقق عبر أبشر وعقود إيجار وتسجيل شموس.' },
    { title: 'Smart Locks', titleAr: 'الأقفال الذكية', desc: 'Connect Tuya and TTLock for automated keyless check-in.', descAr: 'اربط Tuya وTTLock لتسجيل وصول مؤتمت بلا مفتاح.' },
  ],
  sections: [
    {
      h: 'Need a hand?',
      hAr: 'تحتاج مساعدة؟',
      body: [
        'Our team can help you configure StayHub for your specific portfolio. Book a demo for a guided walkthrough.',
      ],
      bodyAr: [
        'يمكن لفريقنا مساعدتك في إعداد StayHub لمحفظتك الخاصة. احجز عرضاً تجريبياً لجولة إرشادية.',
      ],
    },
  ],
};

export default function DocsPage() {
  return <ContentPageTemplate data={data} />;
}
