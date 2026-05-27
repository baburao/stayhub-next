import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allFeatures, getFeatureBySlug } from '@/data/features';
import FeaturePageTemplate from '@/components/templates/FeaturePageTemplate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allFeatures.map((f: { slug: string }) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return {};
  return {
    title: feature.seoTitle,
    description: feature.metaDescription,
    alternates: { canonical: `https://www.stayhub.sa/features/${slug}` },
    openGraph: {
      title: feature.seoTitle,
      description: feature.metaDescription,
      url: `https://www.stayhub.sa/features/${slug}`,
    },
  };
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  // Gather related feature data
  const relatedData = (feature.relatedFeatures as string[])
    .map((s: string) => getFeatureBySlug(s))
    .filter(Boolean)
    .map((f: any) => ({
      slug: f.slug,
      title: f.title,
      subtitle: f.subtitle?.slice(0, 60) + '...',
      color: f.color,
    }));

  return <FeaturePageTemplate feature={feature} relatedData={relatedData} />;
}
