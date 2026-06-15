import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: "What's New — StayHub Product Updates",
  description:
    'The latest StayHub product updates, new integrations, and feature releases for Saudi property managers.',
  alternates: { canonical: 'https://www.stayhub.sa/updates' },
};

const data: ContentPageData = {
  badge: "What's New",
  badgeAr: 'الجديد',
  title: 'Product Updates',
  titleAr: 'تحديثات المنتج',
  subtitle:
    'We ship improvements continuously. Here’s what’s new in StayHub.',
  subtitleAr:
    'نطلق التحسينات باستمرار. إليك ما هو جديد في StayHub.',
  cardsTitle: 'Recent Releases',
  cardsTitleAr: 'أحدث الإصدارات',
  cards: [
    { meta: 'New', metaAr: 'جديد', title: '24 Integrations Now Live', titleAr: '24 تكاملاً متاح الآن', desc: 'Connect OTAs, government platforms, smart locks, accounting, banking, and messaging — all in one place.', descAr: 'اربط القنوات والمنصات الحكومية والأقفال الذكية والمحاسبة والبنوك والمراسلة — كلها في مكان واحد.' },
    { meta: 'Improved', metaAr: 'محسّن', title: 'Faster Calendar Sync', titleAr: 'مزامنة تقويم أسرع', desc: 'Real-time availability updates across all channels in seconds.', descAr: 'تحديثات توفر آنية عبر كل القنوات في ثوانٍ.' },
    { meta: 'New', metaAr: 'جديد', title: 'Arabic Automated Messaging', titleAr: 'مراسلة عربية مؤتمتة', desc: 'Send culturally appropriate WhatsApp and SMS templates in Arabic and English.', descAr: 'أرسل قوالب واتساب وSMS مناسبة ثقافياً بالعربية والإنجليزية.' },
    { meta: 'New', metaAr: 'جديد', title: 'Owner Portal 2.0', titleAr: 'بوابة الملاك 2.0', desc: 'Redesigned real-time reporting and statements for property owners.', descAr: 'تقارير وكشوفات آنية مُعاد تصميمها لملاك العقارات.' },
  ],
};

export default function UpdatesPage() {
  return <ContentPageTemplate data={data} />;
}
