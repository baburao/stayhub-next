import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Cookie Policy — StayHub',
  description:
    'How StayHub uses cookies and similar technologies, and how you can control them.',
  alternates: { canonical: 'https://www.stayhub.sa/cookies' },
};

const data: ContentPageData = {
  badge: 'Legal',
  badgeAr: 'قانوني',
  title: 'Cookie Policy',
  titleAr: 'سياسة ملفات تعريف الارتباط',
  subtitle:
    'StayHub uses cookies and similar technologies to operate the site, remember your preferences, and understand how it’s used.',
  subtitleAr:
    'يستخدم StayHub ملفات تعريف الارتباط وتقنيات مماثلة لتشغيل الموقع وتذكّر تفضيلاتك وفهم كيفية استخدامه.',
  showCta: false,
  note: 'Last updated: June 2026.',
  noteAr: 'آخر تحديث: يونيو 2026.',
  sections: [
    {
      h: '1. What Are Cookies?',
      hAr: '1. ما هي ملفات تعريف الارتباط؟',
      body: [
        'Cookies are small text files stored on your device that help websites function and remember information about your visit.',
      ],
      bodyAr: [
        'ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزَّن على جهازك وتساعد المواقع على العمل وتذكّر معلومات زيارتك.',
      ],
    },
    {
      h: '2. Types We Use',
      hAr: '2. الأنواع التي نستخدمها',
      bullets: [
        'Essential cookies — required for the site and your session to work.',
        'Preference cookies — remember your language (Arabic/English) and settings.',
        'Analytics cookies — help us understand usage and improve the product.',
      ],
      bulletsAr: [
        'ملفات أساسية — مطلوبة لعمل الموقع وجلستك.',
        'ملفات التفضيلات — تتذكر لغتك (العربية/الإنجليزية) وإعداداتك.',
        'ملفات التحليلات — تساعدنا على فهم الاستخدام وتحسين المنتج.',
      ],
    },
    {
      h: '3. Managing Cookies',
      hAr: '3. إدارة ملفات تعريف الارتباط',
      body: [
        'You can control or delete cookies through your browser settings. Disabling some cookies may affect how the site works.',
      ],
      bodyAr: [
        'يمكنك التحكم في ملفات تعريف الارتباط أو حذفها عبر إعدادات متصفحك. قد يؤثر تعطيل بعضها على طريقة عمل الموقع.',
      ],
    },
  ],
};

export default function CookiesPage() {
  return <ContentPageTemplate data={data} />;
}
