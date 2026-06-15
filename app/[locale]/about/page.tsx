import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { SkillTree } from '@/components/skills/SkillTree';
import { SkillAccordion } from '@/components/skills/SkillAccordion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '技能树' : 'Skills',
    description: isZh ? '陈鑫鹏的技术技能：AI Agent 开发、编程语言、框架 & 工具、数据库' : 'Skills: AI Agent Development, Programming Languages, Frameworks, Databases',
  };
}

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="mb-20">
        <h1 className="text-heading font-bold text-text-primary mb-2">
          {t('skills.title')}
        </h1>
        <p className="text-text-secondary mb-8">
          {t('skills.subtitle')}
        </p>

        {/* Desktop: skill tree */}
        <div className="hidden md:block">
          <SkillTree />
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          <SkillAccordion />
        </div>
      </section>
    </div>
  );
}
