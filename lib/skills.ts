// lib/skills.ts
export interface Skill {
  name: string;
  level: 'master' | 'proficient' | 'familiar' | 'learning';
  proof: string | null;
}

export interface SkillCategory {
  nameKey: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    nameKey: 'skills.categories.aiAgent',
    skills: [
      { name: 'Prompt Engineering', level: 'master', proof: 'DesktopPet 多场景 System Prompt 设计，10 种情绪状态识别' },
      { name: 'Function Calling', level: 'proficient', proof: 'DesktopPet 集成 6 类外部工具调用' },
      { name: 'Agent 架构设计', level: 'proficient', proof: 'DesktopPet EventBus 解耦的 8 模块协同架构' },
      { name: '对话状态管理', level: 'proficient', proof: 'DesktopPet 多轮对话上下文记忆' },
      { name: 'LangChain', level: 'learning', proof: null },
      { name: 'LangGraph', level: 'learning', proof: null },
    ],
  },
  {
    nameKey: 'skills.categories.languages',
    skills: [
      { name: 'Java', level: 'master', proof: 'e数码商城 Spring Cloud 微服务架构，307 个 Java 源文件' },
      { name: 'TypeScript', level: 'proficient', proof: 'DesktopPet 全项目 TypeScript 类型安全开发' },
      { name: 'C#', level: 'proficient', proof: 'DesktopPet WPF 应用，C# 12 / .NET 8 开发' },
      { name: 'Python', level: 'proficient', proof: '多个项目中的脚本和工具开发' },
      { name: 'C/C++', level: 'familiar', proof: 'GEC6818 嵌入式 Linux 开发' },
    ],
  },
  {
    nameKey: 'skills.categories.frameworks',
    skills: [
      { name: 'Spring Boot', level: 'master', proof: 'e数码商城后端核心框架' },
      { name: 'Vue.js', level: 'proficient', proof: 'e数码商城管理后台前端开发' },
      { name: 'WPF', level: 'proficient', proof: 'DesktopPet 桌面应用 UI 框架' },
      { name: 'Next.js', level: 'learning', proof: null },
      { name: 'Docker', level: 'familiar', proof: null },
      { name: 'Linux', level: 'familiar', proof: 'GEC6818 嵌入式开发环境' },
    ],
  },
  {
    nameKey: 'skills.categories.databases',
    skills: [
      { name: 'MySQL', level: 'proficient', proof: 'e数码商城数据持久化' },
      { name: 'SQLite', level: 'proficient', proof: 'DesktopPet 本地数据存储' },
      { name: 'EF Core', level: 'proficient', proof: 'DesktopPet ORM 框架' },
      { name: 'MyBatis', level: 'proficient', proof: 'e数码商城 ORM 框架' },
    ],
  },
];

export const levelLabels = {
  master: { zh: '精通', en: 'Master' },
  proficient: { zh: '熟练', en: 'Proficient' },
  familiar: { zh: '了解', en: 'Familiar' },
  learning: { zh: '学习中', en: 'Learning' },
} as const;

export type SkillLevel = keyof typeof levelLabels;
