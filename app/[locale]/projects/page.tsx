import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'zh' ? '项目作品' : 'Projects',
    description: locale === 'zh' ? '陈鑫鹏的项目作品展示' : "Chen Xinpeng's project portfolio",
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-heading font-bold text-text-primary mb-2">
        {t('projects.title')}
      </h1>
      <p className="text-text-secondary mb-12">
        {t('projects.subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <AnimatedSection key={project.slug} delay={index * 0.1}>
            <ProjectCard project={project} locale={locale} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
