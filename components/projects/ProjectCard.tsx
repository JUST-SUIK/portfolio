'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project } from '@/lib/projects';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations();

  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="block group">
      <GlassCard hover className="h-full cursor-pointer">
        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs rounded-md font-medium tracking-tight
                         bg-accent-blue/8 text-accent-blue border border-accent-blue/10"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2.5 py-0.5 text-xs rounded-md font-medium
                             bg-surface-card text-text-muted border border-surface-border">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Project name */}
        <h3 className="text-lg font-bold text-text-primary tracking-tight mb-1.5
                       group-hover:text-accent-blue transition-colors duration-200">
          {t(project.nameKey)}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {t(project.taglineKey)}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-auto pt-4 border-t border-surface-border/40">
          {project.stats.map((stat) => (
            <div key={stat.labelKey} className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-text-primary tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-text-muted">
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </div>

        {/* Hover arrow */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink size={16} className="text-text-muted" />
        </div>
      </GlassCard>
    </Link>
  );
}
