'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowDown } from 'lucide-react';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting pill */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                             bg-accent-blue/10 text-accent-blue border border-accent-blue/15
                             tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Name — massive display text */}
          <motion.h1
            variants={fadeUp}
            className="hero-title mb-4"
          >
            {t('hero.name')}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl font-semibold text-accent-blue tracking-tight mb-6"
          >
            {t('hero.title')}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="hero-subtitle max-w-xl mb-10"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* CTA group */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Button href={`/${locale}/projects`} variant="primary" size="lg">
              {t('hero.ctaProjects')}
            </Button>
            <Button href={`/${locale}/contact`} variant="secondary" size="lg">
              {t('hero.ctaContact')}
            </Button>
            <Button href={`/${locale}/experience`} variant="ghost" size="lg">
              {t('hero.ctaResume')}
              <ArrowDown size={16} className="ml-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-text-muted/30 flex items-start justify-center pt-1.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1 h-1.5 rounded-full bg-text-muted/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
