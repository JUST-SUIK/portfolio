// app/sitemap.ts
import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://just-suik.github.io';
  const locales = ['zh', 'en'];

  const staticPages = ['', '/about', '/projects', '/contact'];
  const projectPages = projects.map((p) => `/projects/${p.slug}`);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of [...staticPages, ...projectPages]) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1.0 : path.startsWith('/projects') ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
