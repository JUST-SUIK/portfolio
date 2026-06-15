import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations();

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <p className="text-accent-blue font-medium mb-4">{t('hero.greeting')}</p>
          <h1 className="text-hero font-bold text-text-primary leading-tight">
            {t('hero.name')}
          </h1>
          <h2 className="text-heading font-semibold text-text-secondary mt-2">
            {t('hero.title')}
          </h2>
          <p className="text-text-secondary text-lg mt-6 max-w-xl">
            {t('hero.tagline')}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/projects" variant="primary" size="lg">
              {t('hero.ctaProjects')}
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              {t('hero.ctaContact')}
            </Button>
            <Button href="/resume.pdf" variant="ghost" size="lg">
              {t('hero.ctaResume')} ↓
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
