import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://just-suik.github.io'),
  title: {
    default: '陈鑫鹏 | AI Agent 开发工程师',
    template: '%s | 陈鑫鹏',
  },
  description: '陈鑫鹏的个人作品集网站，专注于 AI Agent 开发、Prompt Engineering 和全栈工程。展示 DesktopPet、e数码商城等项目。',
  keywords: ['AI Agent', '前端开发', '全栈', 'TypeScript', 'Java', '陈鑫鹏'],
  authors: [{ name: '陈鑫鹏', url: 'https://github.com/JUST-SUIK' }],
  creator: '陈鑫鹏',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '陈鑫鹏 | 个人作品集',
    title: '陈鑫鹏 | AI Agent 开发工程师',
    description: '专注 AI Agent 开发与全栈工程，展示 DesktopPet 等项目作品。',
    url: 'https://just-suik.github.io',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '陈鑫鹏个人作品集',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '陈鑫鹏 | AI Agent 开发工程师',
    description: '专注 AI Agent 开发与全栈工程。',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
