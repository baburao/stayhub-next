import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allSolutions, getSolutionBySlug } from '@/data/solutions';
import { getFeatureBySlug } from '@/data/features';
import SolutionPageTemplate from '@/components/templates/SolutionPageTemplate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allSolutions.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: solution.seoTitle,
    description: solution.metaDescription,
    alternates: { canonical: `https://www.stayhub.sa/solutions/${slug}` },
    openGraph: {
      title: solution.seoTitle,
      description: solution.metaDescription,
      url: `https://www.stayhub.sa/solutions/${slug}`,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const relatedFeatureData = (solution.features as string[])
    .slice(0, 6)
    .map((s: string) => getFeatureBySlug(s))
    .filter(Boolean)
    .map((f: any) => ({
      slug: f.slug,
      title: f.title,
      subtitle: f.subtitle?.slice(0, 55) + '...',
      color: f.color,
    }));

  return <SolutionPageTemplate solution={solution} relatedFeatureData={relatedFeatureData} />;
}
