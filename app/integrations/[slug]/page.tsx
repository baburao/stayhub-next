import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allIntegrations, getIntegrationBySlug } from '@/data/integrations';
import IntegrationPageTemplate from '@/components/templates/IntegrationPageTemplate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allIntegrations.map((i: { slug: string }) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    }));

  return <IntegrationPageTemplate integration={integration} relatedData={relatedData} />;
}
