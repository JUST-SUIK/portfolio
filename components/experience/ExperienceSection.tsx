// components/experience/ExperienceSection.tsx
'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { ResumeData } from '@/lib/resume';
import {
  Briefcase,
  GraduationCap,
  Code2,
  Users,
  Sparkles,
  Target,
} from 'lucide-react';

interface ExperienceSectionProps {
  data: ResumeData;
  locale: string;
  t: (key: string) => string;
}

export function ExperienceSection({ data, locale, t }: ExperienceSectionProps) {
  const isZh = locale === 'zh';

  return (
    <>
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
          {isZh ? '个人简历' : 'Resume'}
        </h1>
        <p className="text-lg text-text-secondary">
          {isZh
            ? `${data.name} — ${data.titles.join(' · ')}`
            : `${data.name} — ${data.titles.join(' · ')}`}
        </p>
      </div>

      {/* Education */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <GraduationCap size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '教育背景' : 'Education'}
            </h2>
          </div>
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="font-semibold text-text-primary">
                {data.education.school} · {data.education.major}
              </h3>
              <span className="text-sm text-text-muted">
                {data.education.period}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-2">
              {data.education.degree} · {data.education.rank}
            </p>
            {data.education.courses && (
              <p className="text-sm text-text-muted">
                {isZh ? '核心课程：' : 'Core courses: '}
                {data.education.courses}
              </p>
            )}
            {data.education.certificates && (
              <div className="flex flex-wrap gap-2 mt-3">
                {data.education.certificates.map((cert) => (
                  <span
                    key={cert}
                    className="px-2.5 py-0.5 text-xs rounded-md bg-accent-blue/8 text-accent-blue border border-accent-blue/10"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
        </section>
      </AnimatedSection>

      {/* Core Abilities */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '核心能力' : 'Core Abilities'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.coreAbilities.map((ability) => (
              <GlassCard key={ability.title} hover>
                <h3 className="font-semibold text-text-primary tracking-tight mb-1.5 text-sm">
                  {ability.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {ability.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Work Experience */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Briefcase size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '工作经历' : 'Work Experience'}
            </h2>
          </div>
          <div className="space-y-4">
            {data.workExperiences.map((work) => (
              <GlassCard key={work.company}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {work.company} · {work.role}
                    </h3>
                    {work.location && (
                      <span className="text-xs text-text-muted">
                        {work.location}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-text-muted">
                      {work.period}
                    </span>
                    <div className="text-xs text-accent-blue mt-0.5">
                      {work.tech}
                    </div>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {work.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent-blue/30"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Project Experience */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Code2 size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '项目经历' : 'Project Experience'}
            </h2>
          </div>
          <div className="space-y-4">
            {data.projectExperiences.map((project) => (
              <GlassCard key={project.name} hover>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {project.name}
                    </h3>
                    <span className="text-xs text-accent-blue">
                      {project.role}
                    </span>
                  </div>
                  <div className="text-right mt-1 sm:mt-0">
                    <span className="text-sm text-text-muted">
                      {project.period}
                    </span>
                    <div className="text-xs text-text-muted mt-0.5">
                      {project.tech}
                    </div>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent-blue/30"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Campus Activities */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '校园实践' : 'Campus Activities'}
            </h2>
          </div>
          {data.campusActivities.map((activity) => (
            <GlassCard key={activity.title}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold text-text-primary">
                  {activity.title}
                </h3>
                <span className="text-sm text-text-muted">
                  {activity.period}
                </span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {activity.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent-blue/30"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </section>
      </AnimatedSection>

      {/* AI Toolchain */}
      <AnimatedSection>
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Target size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? 'AI 工具链' : 'AI Toolchain'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.aiToolchain.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 text-sm rounded-lg bg-surface-card text-text-secondary border border-surface-border font-medium tracking-tight"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Self Evaluation */}
      <AnimatedSection>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {isZh ? '自我评价' : 'Self Assessment'}
            </h2>
          </div>
          <div className="space-y-3">
            {data.selfEvaluation.map((item) => (
              <GlassCard key={item.title}>
                <h3 className="font-semibold text-text-primary tracking-tight mb-1.5 text-sm">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
