// lib/blog.ts
export interface BlogPost {
  slug: string;
  titleKey: string;
  summaryKey: string;
  date: string;
  tags: string[];
  contentKey: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-native-dev-workflow',
    titleKey: 'blog.posts.aiNativeDev.title',
    summaryKey: 'blog.posts.aiNativeDev.summary',
    date: '2026-06-15',
    tags: ['AI', 'Claude Code', '开发流程'],
    contentKey: 'blog.posts.aiNativeDev.content',
    published: true,
  },
  {
    slug: 'desktoppet-architecture',
    titleKey: 'blog.posts.desktopPetArch.title',
    summaryKey: 'blog.posts.desktopPetArch.summary',
    date: '2026-06-10',
    tags: ['架构', 'EventBus', 'AI Agent'],
    contentKey: 'blog.posts.desktopPetArch.content',
    published: true,
  },
];
