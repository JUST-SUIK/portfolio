import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { ProjectDetail } from '@/components/projects/ProjectDetail';

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { locale: 'zh', slug: project.slug },
    { locale: 'en', slug: project.slug },
  ]);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ProjectDetail project={project} locale={locale} />
    </div>
  );
}
