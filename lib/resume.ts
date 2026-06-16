// lib/resume.ts
export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location?: string;
  tech: string;
  highlights: string[];
}

export interface ProjectExperience {
  name: string;
  period: string;
  tech: string;
  role: string;
  highlights: string[];
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
  rank?: string;
  courses?: string;
  certificates?: string[];
}

export interface CampusActivity {
  title: string;
  period: string;
  highlights: string[];
}

export interface ResumeData {
  name: string;
  titles: string[];
  education: Education;
  coreAbilities: { title: string; description: string }[];
  workExperiences: WorkExperience[];
  projectExperiences: ProjectExperience[];
  campusActivities: CampusActivity[];
  aiToolchain: string[];
  selfEvaluation: { title: string; description: string }[];
}

export const resumeData: ResumeData = {
  name: '陈鑫鹏',
  titles: ['AI Agent 开发工程师', 'AI-Native 实践者', '全栈开发'],
  education: {
    school: '湖南科技大学',
    major: '计算机科学与技术',
    degree: '本科',
    period: '2022.09 - 2026.06',
    rank: '排名前 30%',
    courses: '数据结构（88分）、操作系统、计算机网络、数据库原理、软件工程、人工智能导论',
    certificates: ['中级软件设计师', 'CET-4'],
  },
  coreAbilities: [
    {
      title: 'AI Agent 全流程开发',
      description: '独立开发 DesktopPet 项目，完整实践了个性化对话策略、情感交互模型、上下文理解与长对话能力等核心能力，理解 AI Agent 开发的完整流程。',
    },
    {
      title: 'AI-Native 开发流程',
      description: '全程使用 Claude Code 辅助开发，建立 CLAUDE.md + ADR 架构决策记录 + 领域文档的 AI 协作规范，实现从需求到代码的自动化流水线。',
    },
    {
      title: 'MVP 极速验证',
      description: '2 周内完成从需求分析到可交付原型，DesktopPet 项目 190 源文件 12000+ 行代码 413 个测试全程 AI 辅助，体现非线性开发速度。',
    },
    {
      title: 'Prompt Engineering',
      description: '设计 6 个 JSON Prompt 模板，支持变量插值和灵活配置，能快速迭代优化对话策略。',
    },
    {
      title: '情感交互设计',
      description: '设计了 10 种情绪状态的识别与响应系统，能根据用户行为动态调整对话风格，实现真正的情感化交互。',
    },
    {
      title: '全栈技术能力',
      description: '精通 Java，熟悉 C#/Python/TypeScript，熟悉 Spring Boot/Spring Cloud 微服务架构，具备从 0 到 1 的全流程把控能力。',
    },
  ],
  workExperiences: [
    {
      company: '飞智益思',
      role: '游戏开发实习生',
      period: '2025.10 - 2025.12',
      location: '长沙',
      tech: 'Cocos Creator + TypeScript',
      highlights: [
        '参与开心消消乐项目开发，使用 Cocos Creator 完成关卡逻辑与 UI 交互模块',
        '独立设计开发魔改 2048 游戏，"小怪→大怪→Boss"怪物合成玩法，完成核心合成逻辑、关卡数值设计',
        '从玩法原型到功能落地独立完成全流程开发，掌握 Cocos 组件化开发模式与游戏循环机制',
      ],
    },
  ],
  projectExperiences: [
    {
      name: 'DesktopPet — AI 智能体桌面助手',
      period: '2025.12 - 2026.03',
      tech: 'C# / .NET 8 / WPF / DeepSeek API / Whisper.net',
      role: '独立开发',
      highlights: [
        '设计 EventBus 解耦的 8 模块协同架构，实现任务规划→工具调用→执行流控制的完整 Agent 链路',
        '实现 Ordis 三层人格系统（表层/Glitch/深层），支持 10 种情绪状态识别与个性化响应',
        '实现短期记忆（对话上下文）+ 长期记忆（SQLite 用户行为知识库），支持多轮对话和用户偏好持久化',
        '设计 6 类行为触发器（久坐/护眼/深夜工作等），基于时间触发+用户状态判断实现智能提醒',
        '集成 Whisper 本地语音识别 + MiMo TTS 语音合成（三种预设模式）+ Windows TTS 降级',
        '413 个测试用例覆盖核心逻辑，7×24 小时稳定运行',
      ],
    },
    {
      name: 'e数码商城 — 微服务电商平台',
      period: '2025.04 - 2025.06',
      tech: 'Spring Boot / Spring Cloud / Vue 2 / MySQL / Nacos',
      role: '全栈开发（课程设计）',
      highlights: [
        '基于 Spring Cloud 微服务架构，实现用户、商品、订单三大服务的解耦与独立部署',
        '涵盖全新商品、二手交易、数码回收、设备租赁四大业务线，91 个 API 端点',
        '实现商品参数对比功能：最多 4 个商品 JSON 参数自动解析对比，差异值高亮',
        '双重安全认证：API 网关 JWT 全局过滤 + 各服务内部拦截器二次验证',
        '使用 Docker + Nginx 容器化部署，MySQL 主从复制 + Redis 缓存优化',
      ],
    },
    {
      name: 'GEC6818 — 嵌入式 Linux 开发',
      period: '2024.05 - 2024.06',
      tech: 'C++ / ARM Cortex-A9 / Linux',
      role: '独立开发',
      highlights: [
        '从零完成 ARM 平台 Linux 内核裁剪、u-boot 移植、根文件系统制作',
        '编写 GPIO/PWM/I2C/SPI/UART 等外设的设备树节点与字符设备驱动',
        '使用 Valgrind 定位并修复 3 处内存泄漏，编写 Shell 脚本实现进程守护',
      ],
    },
    {
      name: '智能循迹小车',
      period: '2024.03 - 2024.04',
      tech: '51 单片机 / C 语言 / PID 算法',
      role: '独立开发',
      highlights: [
        '独立完成从硬件开箱、电路焊接组装到整机调试的全流程',
        '校准红外传感器阵列，调试 PID 控制算法参数，优化循迹精度与行驶稳定性',
      ],
    },
  ],
  campusActivities: [
    {
      title: '人工智能实验室 · 负责人',
      period: '2023.04 - 2024.11',
      highlights: [
        '带领 20+ 人团队完成多个项目交付，负责技术方案设计与代码审查',
        '组织参与 ACM 程序设计竞赛、RAO 机器人比赛、湖南省程序设计省赛',
        '累计编程 1200+ 小时',
      ],
    },
  ],
  aiToolchain: [
    'Claude Code',
    'Cursor / Trae',
    'DeepSeek API',
    'Claude API',
    'Prompt Engineering',
    'Function Calling',
    'RAG 技术',
    'MCP 协议',
    'LangChain（学习中）',
    'LangGraph（学习中）',
    'VLM 多模态（学习中）',
  ],
  selfEvaluation: [
    {
      title: 'AI 辅助编程先行者',
      description: '重度使用 Claude Code、Cursor/Trae 等 AI 编码工具，建立了完整的 AI-Native 开发工作流，能通过 AI 工具将开发周期压缩至传统方式的 1/3。',
    },
    {
      title: 'MVP 驱动，交付至上',
      description: '推崇"交付至上"的极客心态，DesktopPet 项目 2 周内从零到 190 源文件/12000+ 行代码/413 个测试的完整产品。',
    },
    {
      title: '技术敏感度高，自驱成长',
      description: '对最新 AI 工具保持高度敏感，正在主动学习 MCP 协议与 Agent 工作流；热衷尝试最新技术栈与 AI 开发范式。',
    },
  ],
};
