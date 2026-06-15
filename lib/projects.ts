// lib/projects.ts
export interface Project {
  slug: string;
  nameKey: string;
  taglineKey: string;
  descriptionKey: string;
  highlights: {
    icon: string;
    titleKey: string;
    descKey: string;
  }[];
  techStack: string[];
  stats: { labelKey: string; value: string }[];
  githubUrl?: string;
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'desktop-pet',
    nameKey: 'projects.desktopPet.name',
    taglineKey: 'projects.desktopPet.tagline',
    descriptionKey: 'projects.desktopPet.description',
    highlights: [
      {
        icon: '🤖',
        titleKey: 'projects.desktopPet.highlights.agent',
        descKey: 'projects.desktopPet.highlights.agentDesc',
      },
      {
        icon: '🎭',
        titleKey: 'projects.desktopPet.highlights.glitch',
        descKey: 'projects.desktopPet.highlights.glitchDesc',
      },
      {
        icon: '🔧',
        titleKey: 'projects.desktopPet.highlights.eventbus',
        descKey: 'projects.desktopPet.highlights.eventbusDesc',
      },
      {
        icon: '💬',
        titleKey: 'projects.desktopPet.highlights.proactive',
        descKey: 'projects.desktopPet.highlights.proactiveDesc',
      },
      {
        icon: '🎙️',
        titleKey: 'projects.desktopPet.highlights.voice',
        descKey: 'projects.desktopPet.highlights.voiceDesc',
      },
      {
        icon: '🏆',
        titleKey: 'projects.desktopPet.highlights.achievement',
        descKey: 'projects.desktopPet.highlights.achievementDesc',
      },
    ],
    techStack: ['C# 12', '.NET 8', 'WPF', 'CommunityToolkit.Mvvm', 'EF Core', 'SQLite', 'MiMo API', 'Whisper.net', 'NAudio'],
    stats: [
      { labelKey: 'projects.stats.modules', value: '17' },
      { labelKey: 'projects.stats.sourceCode', value: '9,400' },
      { labelKey: 'projects.stats.testCode', value: '5,800' },
      { labelKey: 'projects.stats.characters', value: '3' },
    ],
    githubUrl: 'https://github.com/JUST-SUIK/DesktopPet',
    images: ['/images/desktoppet-01.webp', '/images/desktoppet-02.webp', '/images/desktoppet-03.webp'],
    featured: true,
  },
  {
    slug: 'eshop',
    nameKey: 'projects.eshop.name',
    taglineKey: 'projects.eshop.tagline',
    descriptionKey: 'projects.eshop.description',
    highlights: [
      {
        icon: '🛒',
        titleKey: 'projects.eshop.highlights.multicategory',
        descKey: 'projects.eshop.highlights.multicategoryDesc',
      },
      {
        icon: '🔄',
        titleKey: 'projects.eshop.highlights.used',
        descKey: 'projects.eshop.highlights.usedDesc',
      },
      {
        icon: '📊',
        titleKey: 'projects.eshop.highlights.compare',
        descKey: 'projects.eshop.highlights.compareDesc',
      },
      {
        icon: '🔐',
        titleKey: 'projects.eshop.highlights.auth',
        descKey: 'projects.eshop.highlights.authDesc',
      },
    ],
    techStack: ['Spring Boot 2.5.9', 'Spring Cloud 2020.0.6', 'Spring Cloud Alibaba', 'Nacos', 'OpenFeign', 'MyBatis', 'MySQL', 'Vue 2', 'Element UI'],
    stats: [
      { labelKey: 'projects.stats.modules', value: '5' },
      { labelKey: 'projects.stats.apiEndpoints', value: '91' },
      { labelKey: 'projects.stats.javaFiles', value: '307' },
    ],
    images: ['/images/eshop-01.webp', '/images/eshop-02.webp', '/images/eshop-03.webp'],
    featured: false,
  },
];
