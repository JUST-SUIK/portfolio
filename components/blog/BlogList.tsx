'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { BlogPost } from '@/lib/blog';
import { Calendar, Tag } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  locale: string;
}

export function BlogList({ posts, locale }: BlogListProps) {
  const isZh = locale === 'zh';

  if (posts.length === 0) {
    return (
      <GlassCard>
        <p className="text-text-secondary text-center py-8">
          {isZh ? '暂无文章，敬请期待。' : 'No posts yet. Stay tuned.'}
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <AnimatedSection key={post.slug} delay={index * 0.08}>
          <Link href={`/${locale}/blog/${post.slug}`} className="block group">
            <GlassCard hover>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString(
                    isZh ? 'zh-CN' : 'en-US',
                    { year: 'numeric', month: 'short', day: 'numeric' }
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
              <h2 className="text-lg font-bold text-text-primary tracking-tight mb-1.5 group-hover:text-accent-blue transition-colors">
                {post.titleKey.split('.').pop()}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-2">
                {post.summaryKey.split('.').pop()}
              </p>
            </GlassCard>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
