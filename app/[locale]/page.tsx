import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { Hero } from '@/components/hero/Hero';
import { MouseGlow } from '@/components/hero/MouseGlow';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh
      ? `${siteConfig.name} | ${siteConfig.title}`
      : `${siteConfig.nameEn} | ${siteConfig.titleEn}`,
    description: isZh ? siteConfig.description : siteConfig.descriptionEn,
  };
}

export default function HomePage() {
  return (
    <>
      <MouseGlow />
      <Hero />
    </>
  );
}
