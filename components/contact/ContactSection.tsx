'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { siteConfig } from '@/lib/site';
import { Mail, GitFork, Briefcase } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  const isZh = locale === 'zh';

  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    '来自作品集 - 联系陈鑫鹏'
  )}&body=${encodeURIComponent('你好陈鑫鹏，\n\n我在你的作品集网站上看到了...\n\n')}`;

  const contactItems = [
    {
      icon: <Mail size={22} />,
      iconBg: 'bg-accent-blue/10 text-accent-blue',
      title: t('contact.email'),
      desc: t('contact.emailDesc'),
      action: (
        <Button href={mailtoUrl} variant="primary" size="sm">
          {t('contact.sendEmail')}
        </Button>
      ),
    },
    {
      icon: <GitFork size={22} />,
      iconBg: 'bg-text-muted/10 text-text-secondary',
      title: t('contact.github'),
      desc: t('contact.githubDesc'),
      action: (
        <Button href={siteConfig.github} variant="secondary" size="sm">
          {t('contact.visitGithub')}
        </Button>
      ),
    },
    {
      icon: <Briefcase size={22} />,
      iconBg: 'bg-emerald-500/10 text-emerald-500',
      title: t('contact.resume'),
      desc: t('contact.resumeDesc'),
      action: (
        <Button href={`/${locale}/experience`} variant="secondary" size="sm">
          {isZh ? '查看简历' : 'View Resume'}
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
          {t('contact.title')}
        </h1>
        <p className="text-lg text-text-secondary">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {contactItems.map((item, i) => (
          <GlassCard key={i} hover>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${item.iconBg} shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted mb-3">
                  {item.desc}
                </p>
                {item.action}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Job intent */}
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <Briefcase size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary tracking-tight mb-1">
              {t('contact.jobTitle')}
            </h3>
            <p className="text-sm text-text-secondary">
              {t('contact.jobRole')}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
