import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Terms of Service — StayHub',
  description:
    'The terms governing your use of the StayHub property management platform.',
  alternates: { canonical: 'https://www.stayhub.sa/terms' },
};

const data: ContentPageData = {
  badge: 'Legal',
  badgeAr: 'قانوني',
  title: 'Terms of Service',
  titleAr: 'شروط الخدمة',
  subtitle:
    'These terms govern your access to and use of StayHub. By using the platform, you agree to them.',
  subtitleAr:
    'تحكم هذه الشروط وصولك إلى StayHub واستخدامك له. باستخدامك المنصة، فإنك توافق عليها.',
  showCta: false,
  note: 'Last updated: June 2026. This document is provided for informational purposes and does not constitute legal advice.',
  noteAr: 'آخر تحديث: يونيو 2026. هذا المستند مقدم لأغراض إعلامية ولا يُعد استشارة قانونية.',
  sections: [
    {
      h: '1. Acceptance of Terms',
      hAr: '1. قبول الشروط',
      body: [
        'By creating an account or using StayHub, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the platform.',
      ],
      bodyAr: [
        'بإنشاء حساب أو استخدام StayHub، فإنك توافق على شروط الخدمة هذه وسياسة الخصوصية. إن لم توافق، فلا تستخدم المنصة.',
      ],
    },
    {
      h: '2. Use of the Service',
      hAr: '2. استخدام الخدمة',
      bullets: [
        'You are responsible for the accuracy of the property and booking data you enter.',
        'You must comply with all applicable Saudi laws and regulations.',
        'You may not misuse, reverse-engineer, or disrupt the platform.',
      ],
      bulletsAr: [
        'أنت مسؤول عن دقة بيانات العقار والحجوزات التي تدخلها.',
        'يجب أن تلتزم بجميع الأنظمة واللوائح السعودية المعمول بها.',
        'لا يجوز إساءة استخدام المنصة أو عكس هندستها أو تعطيلها.',
      ],
    },
    {
      h: '3. Subscriptions & Billing',
      hAr: '3. الاشتراكات والفوترة',
      body: [
        'Paid plans are billed according to the pricing in effect at the time of purchase. Fees are non-refundable except where required by law. You may cancel at any time, effective at the end of your billing period.',
      ],
      bodyAr: [
        'تُحتسب الباقات المدفوعة وفق الأسعار السارية وقت الشراء. الرسوم غير قابلة للاسترداد إلا حيث يقتضي النظام. يمكنك الإلغاء في أي وقت، ويسري في نهاية فترة الفوترة.',
      ],
    },
    {
      h: '4. Third-Party Integrations',
      hAr: '4. تكاملات الأطراف الثالثة',
      body: [
        'StayHub connects to third-party services such as OTAs, payment providers, and government platforms. Your use of those services is governed by their own terms, and StayHub is not responsible for their availability or actions.',
      ],
      bodyAr: [
        'يتصل StayHub بخدمات أطراف ثالثة مثل القنوات ومزودي الدفع والمنصات الحكومية. يخضع استخدامك لتلك الخدمات لشروطها الخاصة، وStayHub غير مسؤول عن توفرها أو تصرفاتها.',
      ],
    },
    {
      h: '5. Limitation of Liability',
      hAr: '5. حدود المسؤولية',
      body: [
        'StayHub is provided “as is.” To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the platform.',
      ],
      bodyAr: [
        'يُقدَّم StayHub «كما هو». إلى أقصى حد يسمح به النظام، لسنا مسؤولين عن أي أضرار غير مباشرة أو تبعية تنشأ عن استخدامك للمنصة.',
      ],
    },
  ],
};

export default function TermsPage() {
  return <ContentPageTemplate data={data} />;
}
