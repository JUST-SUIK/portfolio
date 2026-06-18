import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { blogPosts } from '@/lib/blog';
import { BlogList } from '@/components/blog/BlogList';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '博客' : 'Blog',
    description: isZh
      ? '陈鑫鹏的技术博客 — AI Agent 开发、架构设计、工程实践'
      : "Chen Xinpeng's tech blog",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const publishedPosts = blogPosts
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
      title: t(p.titleKey),
      summary: t(p.summaryKey),
      date: p.date,
      tags: p.tags,
    }));

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
          {t('blog.title')}
        </h1>
        <p className="text-lg text-text-secondary">{t('blog.subtitle')}</p>
      </div>
      <BlogList posts={publishedPosts} locale={locale} />
    </div>
  );
}
