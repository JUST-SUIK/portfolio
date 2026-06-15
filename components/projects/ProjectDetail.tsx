'use client';

// components/projects/ProjectDetail.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project } from '@/lib/projects';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  locale: string;
}

export function ProjectDetail({ project, locale }: ProjectDetailProps) {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">{t('projects.backToList')}</span>
      </Link>

      <h1 className="text-heading font-bold text-text-primary mb-4">
        {t(project.nameKey)}
      </h1>
      <p className="text-lg text-text-secondary mb-8">
        {t(project.taglineKey)}
      </p>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <GlassCard className="mb-8">
        <p className="text-text-secondary leading-relaxed">
          {t(project.descriptionKey)}
        </p>
      </GlassCard>

      {/* Highlights */}
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        {t('projects.highlightsTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {project.highlights.map((h) => (
          <GlassCard key={h.titleKey} hover>
            <div className="text-2xl mb-2">{h.icon}</div>
            <h3 className="font-medium text-text-primary mb-1">
              {t(h.titleKey)}
            </h3>
            <p className="text-sm text-text-secondary">
              {t(h.descKey)}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {project.stats.map((stat) => (
          <GlassCard key={stat.labelKey}>
            <div className="text-2xl font-bold text-accent-blue">
              {stat.value}
            </div>
            <div className="text-sm text-text-muted">
              {t(stat.labelKey)}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* GitHub link */}
      {project.githubUrl && (
        <Button href={project.githubUrl} variant="secondary" size="lg">
          <ExternalLink size={18} />
          {t('projects.viewOnGithub')}
        </Button>
      )}
    </div>
  );
}
