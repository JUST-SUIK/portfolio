'use client';

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
        className="inline-flex items-center gap-2 text-sm text-text-muted
                   hover:text-text-primary transition-colors mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        {t('projects.backToList')}
      </Link>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
          {t(project.nameKey)}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          {t(project.taglineKey)}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-lg font-medium tracking-tight
                       bg-accent-blue/8 text-accent-blue border border-accent-blue/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <GlassCard className="mb-10">
        <p className="text-text-secondary leading-relaxed">
          {t(project.descriptionKey)}
        </p>
      </GlassCard>

      {/* Highlights */}
      <h2 className="text-xl font-bold text-text-primary tracking-tight mb-5">
        {t('projects.highlightsTitle')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {project.highlights.map((h) => (
          <GlassCard key={h.titleKey} hover>
            <div className="text-2xl mb-3">{h.icon}</div>
            <h3 className="font-semibold text-text-primary tracking-tight mb-1.5">
              {t(h.titleKey)}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t(h.descKey)}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {project.stats.map((stat) => (
          <GlassCard key={stat.labelKey}>
            <div className="text-2xl font-bold text-accent-blue tabular-nums tracking-tighter">
              {stat.value}
            </div>
            <div className="text-xs text-text-muted mt-1">
              {t(stat.labelKey)}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* GitHub link */}
      {project.githubUrl && (
        <Button href={project.githubUrl} variant="secondary" size="lg">
          <ExternalLink size={16} />
          {t('projects.viewOnGithub')}
        </Button>
      )}
    </div>
  );
}
