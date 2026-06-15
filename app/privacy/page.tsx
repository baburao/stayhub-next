import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy — StayHub',
  description:
    'How StayHub collects, uses, and protects your data in compliance with Saudi Arabia’s Personal Data Protection Law (PDPL).',
  alternates: { canonical: 'https://www.stayhub.sa/privacy' },
};

const data: ContentPageData = {
  badge: 'Legal',
  badgeAr: 'قانوني',
  title: 'Privacy Policy',
  titleAr: 'سياسة الخصوصية',
  subtitle:
    'We respect your privacy and handle personal data in line with Saudi Arabia’s Personal Data Protection Law (PDPL).',
  subtitleAr:
    'نحترم خصوصيتك ونتعامل مع البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.',
  showCta: false,
  note: 'Last updated: June 2026. This policy is provided for informational purposes and does not constitute legal advice.',
  noteAr: 'آخر تحديث: يونيو 2026. هذه السياسة مقدمة لأغراض إعلامية ولا تُعد استشارة قانونية.',
  sections: [
    {
      h: '1. Information We Collect',
      hAr: '1. المعلومات التي نجمعها',
      body: [
        'We collect information you provide directly — such as your name, email, phone number, and property details — as well as data generated through your use of the platform, including bookings, messages, and usage analytics.',
      ],
      bodyAr: [
        'نجمع المعلومات التي تقدمها مباشرة — مثل اسمك وبريدك ورقم هاتفك وتفاصيل عقارك — إضافة إلى البيانات الناتجة عن استخدامك للمنصة، بما في ذلك الحجوزات والرسائل وتحليلات الاستخدام.',
      ],
    },
    {
      h: '2. How We Use Your Data',
      hAr: '2. كيف نستخدم بياناتك',
      bullets: [
        'To provide and operate the StayHub platform and its integrations.',
        'To process bookings, payments, and compliance reporting.',
        'To communicate with you about your account and support requests.',
        'To improve our products and services.',
      ],
      bulletsAr: [
        'لتقديم وتشغيل منصة StayHub وتكاملاتها.',
        'لمعالجة الحجوزات والمدفوعات والإبلاغ التنظيمي.',
        'للتواصل معك بشأن حسابك وطلبات الدعم.',
        'لتحسين منتجاتنا وخدماتنا.',
      ],
    },
    {
      h: '3. Data Sharing',
      hAr: '3. مشاركة البيانات',
      body: [
        'We share data only as needed to deliver the service — for example, with the OTAs, payment providers, and government platforms you choose to connect — and as required by Saudi law. We never sell your personal data.',
      ],
      bodyAr: [
        'نشارك البيانات فقط بالقدر اللازم لتقديم الخدمة — مثل القنوات ومزودي الدفع والمنصات الحكومية التي تختار ربطها — وكما يقتضي النظام السعودي. لا نبيع بياناتك الشخصية أبداً.',
      ],
    },
    {
      h: '4. Data Security',
      hAr: '4. أمن البيانات',
      body: [
        'We use industry-standard safeguards to protect your data, including encryption in transit and access controls. No system is perfectly secure, but we work continuously to protect your information.',
      ],
      bodyAr: [
        'نستخدم ضمانات وفق معايير الصناعة لحماية بياناتك، بما في ذلك التشفير أثناء النقل وضوابط الوصول. لا يوجد نظام آمن تماماً، لكننا نعمل باستمرار على حماية معلوماتك.',
      ],
    },
    {
      h: '5. Your Rights',
      hAr: '5. حقوقك',
      body: [
        'Under PDPL, you have the right to access, correct, and request deletion of your personal data. To exercise these rights, contact us at info@stayhub.sa.',
      ],
      bodyAr: [
        'بموجب نظام حماية البيانات الشخصية، يحق لك الوصول إلى بياناتك الشخصية وتصحيحها وطلب حذفها. لممارسة هذه الحقوق، تواصل معنا على info@stayhub.sa.',
      ],
    },
  ],
};

export default function PrivacyPage() {
  return <ContentPageTemplate data={data} />;
}
