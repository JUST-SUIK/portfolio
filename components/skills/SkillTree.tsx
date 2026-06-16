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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {skillCategories.map((category) => (
        <GlassCard key={category.nameKey} hover>
          <h3 className="text-base font-bold text-text-primary tracking-tight mb-5">
            {t(category.nameKey)}
          </h3>
          <div className="space-y-3.5">
            {category.skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-text-secondary tracking-tight">
                    {skill.name}
                  </span>
                  <SkillBadge level={skill.level} locale={locale} />
                </div>
                {/* Thinner progress bar */}
                <div className="h-1 bg-surface-border/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out motion-safe:group-hover:shadow-sm ${
                      skill.level === 'master'
                        ? 'w-[90%] bg-accent-blue'
                        : skill.level === 'proficient'
                          ? 'w-[70%] bg-accent-blue/70'
                          : skill.level === 'familiar'
                            ? 'w-[45%] bg-accent-blue/40'
                            : 'w-[20%] bg-accent-blue/20'
                    }`}
                  />
                </div>
                {/* Proof on hover */}
                {skill.proof && (
                  <p className="mt-1.5 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-1">
                    {skill.proof}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
