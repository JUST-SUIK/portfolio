import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { blogPosts } from '@/lib/blog';
import { ArrowLeft, Calendar } from 'lucide-react';

export function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .flatMap((post) => [
      { locale: 'zh', slug: post.slug },
      { locale: 'en', slug: post.slug },
    ]);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.published);
  if (!post) notFound();

  const t = await getTranslations({ locale });
  const isZh = locale === 'zh';

  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 py-20">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        {isZh ? '返回博客列表' : 'Back to blog'}
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString(
              isZh ? 'zh-CN' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </span>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-accent-blue">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
          {t(post.titleKey)}
        </h1>
        <p className="text-lg text-text-secondary">{t(post.summaryKey)}</p>
      </header>

      <div className="text-text-secondary leading-relaxed whitespace-pre-line">
        {t(post.contentKey)}
      </div>
    </article>
  );
}
