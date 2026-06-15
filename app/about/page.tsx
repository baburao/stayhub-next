import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'About StayHub — Property Management Built for Saudi Arabia',
  description:
    'StayHub is the all-in-one property management platform built for the Saudi hospitality market — channel management, automation, compliance, and direct bookings in one place.',
  alternates: { canonical: 'https://www.stayhub.sa/about' },
};

const data: ContentPageData = {
  badge: 'About Us',
  badgeAr: 'من نحن',
  title: 'Built for Saudi Arabia’s Hospitality Market',
  titleAr: 'مبني لسوق الضيافة في المملكة العربية السعودية',
  subtitle:
    'StayHub unifies channels, automation, payments, and Saudi compliance into a single platform so property managers can grow without the chaos of juggling a dozen tools.',
  subtitleAr:
    'يوحّد StayHub القنوات والأتمتة والمدفوعات والامتثال السعودي في منصة واحدة حتى ينمو مديرو العقارات دون فوضى إدارة عشرات الأدوات.',
  sections: [
    {
      h: 'Our Mission',
      hAr: 'مهمتنا',
      body: [
        'We believe Saudi property managers deserve software built for their market — not a foreign tool with the local parts bolted on as an afterthought.',
        'StayHub brings together everything needed to run a short-term rental or hospitality business: channel sync, guest messaging, smart-lock access, dynamic pricing, owner reporting, and compliance with ZATCA, Absher, Ejar, and Shomoos.',
      ],
      bodyAr: [
        'نؤمن بأن مديري العقارات السعوديين يستحقون برمجيات مبنية لسوقهم — لا أداة أجنبية أُضيفت إليها الأجزاء المحلية لاحقاً.',
        'يجمع StayHub كل ما يلزم لإدارة الإيجار قصير الأمد أو أعمال الضيافة: مزامنة القنوات ومراسلة الضيوف والوصول بالأقفال الذكية والتسعير الديناميكي وتقارير الملاك والامتثال لزاتكا وأبشر وإيجار وشموس.',
      ],
    },
    {
      h: 'What We Value',
      hAr: 'قيمنا',
      bullets: [
        'Local first — built around Saudi regulations, payments, and the Arabic language.',
        'Automation over busywork — every repetitive task should run itself.',
        'One platform — no more switching between five apps to run one booking.',
        'Transparency — clear pricing, no hidden fees, no lock-in.',
      ],
      bulletsAr: [
        'المحلية أولاً — مبني حول الأنظمة والمدفوعات واللغة العربية في السعودية.',
        'الأتمتة بدل العمل المتكرر — كل مهمة متكررة يجب أن تُنجز نفسها.',
        'منصة واحدة — لا مزيد من التنقل بين خمسة تطبيقات لإدارة حجز واحد.',
        'الشفافية — أسعار واضحة بلا رسوم خفية ولا التزام إجباري.',
      ],
    },
  ],
};

export default function AboutPage() {
  return <ContentPageTemplate data={data} />;
}
