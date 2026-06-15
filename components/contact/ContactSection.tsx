'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { siteConfig } from '@/lib/site';
import { Mail, GitFork, FileDown, Briefcase } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations();

  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    '来自作品集 - 联系陈鑫鹏'
  )}&body=${encodeURIComponent('你好陈鑫鹏，\n\n我在你的作品集网站上看到了...\n\n')}`;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-heading font-bold text-text-primary mb-2">
        {t('contact.title')}
      </h1>
      <p className="text-text-secondary mb-12">
        {t('contact.subtitle')}
      </p>

      <div className="space-y-4 mb-12">
        {/* Email */}
        <GlassCard hover>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">
                {t('contact.email')}
              </h3>
              <p className="text-sm text-text-muted mb-3">
                {t('contact.emailDesc')}
              </p>
              <Button href={mailtoUrl} variant="primary" size="sm">
                {t('contact.sendEmail')} ↗
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* GitHub */}
        <GlassCard hover>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <GitFork size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">
                {t('contact.github')}
              </h3>
              <p className="text-sm text-text-muted mb-3">
                {t('contact.githubDesc')}
              </p>
              <Button href={siteConfig.github} variant="secondary" size="sm">
                {t('contact.visitGithub')} ↗
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Resume */}
        <GlassCard hover>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileDown size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">
                {t('contact.resume')}
              </h3>
              <p className="text-sm text-text-muted mb-3">
                {t('contact.resumeDesc')}
              </p>
              <Button href="/resume.pdf" variant="secondary" size="sm">
                {t('contact.downloadResume')} ↓
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Job preferences */}
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="font-medium text-text-primary mb-1">
              {t('contact.jobTitle')}
            </h3>
            <p className="text-text-secondary">{t('contact.jobRole')}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
