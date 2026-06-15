// components/skills/SkillBadge.tsx
import { levelLabels, type SkillLevel } from '@/lib/skills';

interface SkillBadgeProps {
  level: SkillLevel;
  locale: string;
}

const levelColors: Record<SkillLevel, string> = {
  master: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  proficient: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
  familiar: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  learning: 'bg-text-muted/20 text-text-muted border-text-muted/30',
};

export function SkillBadge({ level, locale }: SkillBadgeProps) {
  const lang = locale === 'en' ? 'en' : 'zh';
  const label = levelLabels[level][lang];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${levelColors[level]}`}
    >
      {label}
    </span>
  );
}
