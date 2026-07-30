import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allIntegrations, getIntegrationBySlug } from '@/data/integrations';
import IntegrationPageTemplate from '@/components/templates/IntegrationPageTemplate';
import AttiudeComingSoonClient from '@/components/sections/AttiudeComingSoonClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allIntegrations.map((i: { slug: string }) => ({ slug: i.slug }));
}

// Attiude is not a live channel yet — it renders a dedicated coming-soon / waitlist
// page instead of the standard "connect today" integration template.
const ATTIUDE_META: Metadata = {
  title: 'Attiude Integration — Coming Soon to StayHub | StayHub Saudi Arabia',
  description:
    'The Attiude integration is coming to StayHub. Join the waitlist and be among the first hosts live on the platform — with calendars, rates, and reservations synced from day one.',
  alternates: { canonical: 'https://www.stayhub.sa/integrations/attiude' },
  openGraph: {
    title: 'Attiude Integration — Coming Soon to StayHub | StayHub Saudi Arabia',
    description:
      'The Attiude integration is coming to StayHub. Join the waitlist and be among the first hosts live on the platform — with calendars, rates, and reservations synced from day one.',
    url: 'https://www.stayhub.sa/integrations/attiude',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'attiude') return ATTIUDE_META;
  const integration = getIntegrationBySlug(slug);
  if (!integration) return {};
  return {
    title: integration.seoTitle,
    description: integration.metaDescription,
    alternates: { canonical: `https://www.stayhub.sa/integrations/${slug}` },
    openGraph: {
      title: integration.seoTitle,
      description: integration.metaDescription,
      url: `https://www.stayhub.sa/integrations/${slug}`,
    },
  };
}

export default async function IntegrationPage({ params }: Props) {
  const { slug } = await params;
  if (slug === 'attiude') return <AttiudeComingSoonClient />;

  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  const relatedData = (integration.relatedIntegrations as string[])
    .map((s: string) => getIntegrationBySlug(s))
    .filter(Boolean)
    .map((i: any) => ({
      slug: i.slug,
      name: i.name,
      tagline: i.tagline,
      arTagline: i.arTagline,
      color: i.color,
      logo: i.logo,
      logoAlt: i.logoAlt,
    }));

  return <IntegrationPageTemplate integration={integration} relatedData={relatedData} />;
}
