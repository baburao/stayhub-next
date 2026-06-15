import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Careers at StayHub — Join Us',
  description:
    'Help build the property management platform for Saudi Arabia. Explore open roles in engineering, product, sales, and customer success at StayHub.',
  alternates: { canonical: 'https://www.stayhub.sa/careers' },
};

const data: ContentPageData = {
  badge: 'Careers',
  badgeAr: 'الوظائف',
  title: 'Build the Future of Saudi Hospitality',
  titleAr: 'ابنِ مستقبل الضيافة السعودية',
  subtitle:
    'We’re a small, fast-moving team on a mission to give Saudi property managers world-class software. If you love solving real problems, we’d love to hear from you.',
  subtitleAr:
    'نحن فريق صغير سريع الحركة في مهمة لتقديم برمجيات عالمية المستوى لمديري العقارات السعوديين. إن كنت تحب حل المشكلات الحقيقية، يسعدنا أن نسمع منك.',
  cardsTitle: 'Open Positions',
  cardsTitleAr: 'الوظائف المتاحة',
  cards: [
    { meta: 'Engineering', metaAr: 'هندسة', title: 'Senior Full-Stack Engineer', titleAr: 'مهندس Full-Stack أول', desc: 'Build and scale the StayHub platform across web and integrations. Riyadh or remote.', descAr: 'ابنِ ووسّع منصة StayHub عبر الويب والتكاملات. الرياض أو عن بُعد.' },
    { meta: 'Product', metaAr: 'منتج', title: 'Product Designer', titleAr: 'مصمم منتجات', desc: 'Design intuitive, bilingual experiences for property managers. Arabic fluency a plus.', descAr: 'صمّم تجارب بديهية ثنائية اللغة لمديري العقارات. إجادة العربية ميزة.' },
    { meta: 'Sales', metaAr: 'مبيعات', title: 'Account Executive', titleAr: 'مدير حسابات', desc: 'Own the sales cycle with Saudi property managers and hospitality operators.', descAr: 'أدر دورة المبيعات مع مديري العقارات ومشغّلي الضيافة في السعودية.' },
    { meta: 'Support', metaAr: 'دعم', title: 'Customer Success Manager', titleAr: 'مدير نجاح العملاء', desc: 'Onboard new customers and help them get the most out of StayHub.', descAr: 'أهّل العملاء الجدد وساعدهم على تحقيق أقصى استفادة من StayHub.' },
  ],
  sections: [
    {
      h: 'Don’t see your role?',
      hAr: 'لا ترى دورك؟',
      body: [
        'We’re always looking for exceptional people. Send a note about what you do best and how you’d help Saudi property managers win.',
      ],
      bodyAr: [
        'نبحث دائماً عن أشخاص استثنائيين. أرسل لنا نبذة عمّا تجيده وكيف ستساعد مديري العقارات السعوديين على النجاح.',
      ],
    },
  ],
};

export default function CareersPage() {
  return <ContentPageTemplate data={data} />;
}
