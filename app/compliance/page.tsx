import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Compliance & Security — StayHub Saudi Arabia',
  description:
    'StayHub is built for Saudi compliance — ZATCA e-invoicing, Absher ID verification, Ejar contracts, Shomoos registration, and PDPL data protection.',
  alternates: { canonical: 'https://www.stayhub.sa/compliance' },
};

const data: ContentPageData = {
  badge: 'Compliance & Security',
  badgeAr: 'الامتثال والأمان',
  title: 'Built for Saudi Compliance',
  titleAr: 'مبني للامتثال السعودي',
  subtitle:
    'StayHub helps you meet the Kingdom’s regulatory requirements automatically — from e-invoicing to guest registration — so you stay compliant without the manual work.',
  subtitleAr:
    'يساعدك StayHub على استيفاء المتطلبات التنظيمية في المملكة تلقائياً — من الفوترة الإلكترونية إلى تسجيل الضيوف — لتبقى متوافقاً دون عمل يدوي.',
  cardsTitle: 'Regulatory Coverage',
  cardsTitleAr: 'التغطية التنظيمية',
  cards: [
    { title: 'ZATCA E-Invoicing', titleAr: 'الفوترة الإلكترونية لزاتكا', desc: 'Generate compliant e-invoices automatically through connected accounting platforms.', descAr: 'أنشئ فواتير إلكترونية متوافقة تلقائياً عبر منصات المحاسبة المرتبطة.' },
    { title: 'Absher Verification', titleAr: 'التحقق عبر أبشر', desc: 'Verify guest identities through Absher before check-in.', descAr: 'تحقق من هويات الضيوف عبر أبشر قبل تسجيل الوصول.' },
    { title: 'Ejar Contracts', titleAr: 'عقود إيجار', desc: 'Generate and register compliant rental contracts through Ejar.', descAr: 'أنشئ وسجّل عقود إيجار متوافقة عبر إيجار.' },
    { title: 'Shomoos Registration', titleAr: 'تسجيل شموس', desc: 'Report guest stays to authorities automatically.', descAr: 'أبلغ الجهات عن إقامات الضيوف تلقائياً.' },
    { title: 'Ministry of Tourism', titleAr: 'وزارة السياحة', desc: 'Track licensing and classification requirements per property.', descAr: 'تتبع متطلبات الترخيص والتصنيف لكل عقار.' },
    { title: 'PDPL Data Protection', titleAr: 'حماية البيانات (PDPL)', desc: 'Personal data handled in line with Saudi Arabia’s data protection law.', descAr: 'تُعالَج البيانات الشخصية وفق نظام حماية البيانات السعودي.' },
  ],
  sections: [
    {
      h: 'Security You Can Trust',
      hAr: 'أمان يمكنك الوثوق به',
      body: [
        'Your data is protected with encryption in transit, role-based access controls, and secure infrastructure. Compliance records are stored and organized for inspection readiness at any time.',
      ],
      bodyAr: [
        'بياناتك محمية بالتشفير أثناء النقل وضوابط الوصول حسب الدور وبنية تحتية آمنة. تُخزَّن سجلات الامتثال وتُنظَّم لتكون جاهزة للتفتيش في أي وقت.',
      ],
    },
  ],
};

export default function CompliancePage() {
  return <ContentPageTemplate data={data} />;
}
