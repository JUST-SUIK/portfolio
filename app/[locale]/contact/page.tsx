import type { Metadata } from 'next';
import { ContactSection } from '@/components/contact/ContactSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'zh' ? '联系我' : 'Contact',
    description: locale === 'zh' ? '联系陈鑫鹏 — AI Agent 开发工程师' : 'Contact Chen Xinpeng — AI Agent Developer',
  };
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ContactSection />
    </div>
  );
}
