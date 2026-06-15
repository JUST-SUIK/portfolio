// components/projects/ProjectCard.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Link href={`/${locale}/projects/${project.slug}`}>
      <GlassCard hover className="h-full cursor-pointer">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-surface-card text-text-muted">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {t(project.nameKey)}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {t(project.taglineKey)}
        </p>
        <div className="flex gap-4 mt-4 text-xs text-text-muted">
          {project.stats.slice(0, 3).map((stat) => (
            <span key={stat.labelKey}>
              {t(stat.labelKey)}: {stat.value}
            </span>
          ))}
        </div>
      </GlassCard>
    </Link>
  );
}
