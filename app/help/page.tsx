import type { Metadata } from 'next';
import ContentPageTemplate, { ContentPageData } from '@/components/templates/ContentPageTemplate';

export const metadata: Metadata = {
  title: 'Help Center — StayHub Support',
  description:
    'Get help with StayHub. Find answers on setup, integrations, billing, and compliance, or contact our Saudi-based support team.',
  alternates: { canonical: 'https://www.stayhub.sa/help' },
};

const data: ContentPageData = {
  badge: 'Help Center',
  badgeAr: 'مركز المساعدة',
  title: 'How Can We Help?',
  titleAr: 'كيف يمكننا المساعدة؟',
  subtitle:
    'Browse common topics or reach our support team. We’re here to help you get the most out of StayHub.',
  subtitleAr:
    'تصفّح المواضيع الشائعة أو تواصل مع فريق الدعم. نحن هنا لمساعدتك على تحقيق أقصى استفادة من StayHub.',
  cardsTitle: 'Popular Topics',
  cardsTitleAr: 'المواضيع الشائعة',
  cards: [
    { title: 'Getting Started', titleAr: 'البدء', desc: 'Set up your account, add properties, and connect your first channel.', descAr: 'أنشئ حسابك وأضف العقارات واربط أول قناة لك.' },
    { title: 'Connecting Integrations', titleAr: 'ربط التكاملات', desc: 'Link OTAs, smart locks, accounting, and government platforms.', descAr: 'اربط القنوات والأقفال الذكية والمحاسبة والمنصات الحكومية.' },
    { title: 'Billing & Plans', titleAr: 'الفوترة والباقات', desc: 'Manage your subscription, invoices, and payment methods.', descAr: 'أدر اشتراكك وفواتيرك وطرق الدفع.' },
    { title: 'Compliance', titleAr: 'الامتثال', desc: 'ZATCA invoicing, Absher verification, Ejar, and Shomoos registration.', descAr: 'فوترة زاتكا والتحقق عبر أبشر وإيجار وتسجيل شموس.' },
    { title: 'Guest Messaging', titleAr: 'مراسلة الضيوف', desc: 'Automate WhatsApp and SMS across the guest journey.', descAr: 'أتمت واتساب وSMS عبر رحلة الضيف.' },
    { title: 'Owner Portal', titleAr: 'بوابة الملاك', desc: 'Give owners real-time access to reports and statements.', descAr: 'امنح الملاك وصولاً آنياً للتقارير والكشوفات.' },
  ],
  sections: [
    {
      h: 'Still need help?',
      hAr: 'ما زلت بحاجة لمساعدة؟',
      body: [
        'Our Saudi-based support team is available by email at info@stayhub.sa and by phone. Book a demo and we’ll walk you through anything you need.',
      ],
      bodyAr: [
        'فريق الدعم لدينا في السعودية متاح عبر البريد info@stayhub.sa والهاتف. احجز عرضاً تجريبياً وسنرشدك إلى كل ما تحتاجه.',
      ],
    },
  ],
};

export default function HelpPage() {
  return <ContentPageTemplate data={data} />;
}
