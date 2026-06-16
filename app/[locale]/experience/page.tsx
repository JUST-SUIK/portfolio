// app/[locale]/experience/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resumeData } from '@/lib/resume';
import { ExperienceSection } from '@/components/experience/ExperienceSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '个人简历' : 'Resume',
    description: isZh
      ? '陈鑫鹏的个人简历 — AI Agent 开发工程师，湖南科技大学计算机科学与技术专业'
      : "Chen Xinpeng's resume — AI Agent Developer",
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20">
      <ExperienceSection data={resumeData} locale={locale} t={t} />
    </div>
  );
}
