// components/skills/SkillAccordion.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { skillCategories } from '@/lib/skills';
import { SkillBadge } from './SkillBadge';
import { ChevronDown } from 'lucide-react';

export function SkillAccordion() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {skillCategories.map((category) => {
        const isOpen = openCategory === category.nameKey;
        return (
          <div
            key={category.nameKey}
            className="border border-surface-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenCategory(isOpen ? null : category.nameKey)
              }
              className="w-full flex items-center justify-between p-4 text-left bg-surface-card/50 hover:bg-surface-card transition-colors"
            >
              <span className="font-medium text-text-primary">
                {t(category.nameKey)}
              </span>
              <ChevronDown
                size={18}
                className={`text-text-muted transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-secondary">
                        {skill.name}
                      </span>
                      <SkillBadge level={skill.level} locale={locale} />
                    </div>
                    <div className="h-1 bg-surface-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
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
                    {skill.proof && (
                      <p className="mt-1 text-xs text-text-muted">
                        {skill.proof}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
