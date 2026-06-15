// components/skills/SkillTree.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { skillCategories } from '@/lib/skills';
import { SkillBadge } from './SkillBadge';
import { GlassCard } from '@/components/ui/GlassCard';

export function SkillTree() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category) => (
        <GlassCard key={category.nameKey} hover>
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {t(category.nameKey)}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-secondary">
                    {skill.name}
                  </span>
                  <SkillBadge level={skill.level} locale={locale} />
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 motion-safe:group-hover:shadow-lg ${
                      skill.level === 'master'
                        ? 'w-[90%] bg-emerald-500'
                        : skill.level === 'proficient'
                          ? 'w-[75%] bg-accent-blue'
                          : skill.level === 'familiar'
                            ? 'w-[50%] bg-amber-500'
                            : 'w-[25%] bg-text-muted'
                    }`}
                  />
                </div>
                {/* Hover tooltip: project proof */}
                {skill.proof && (
                  <div className="mt-1 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                    {skill.proof}
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
