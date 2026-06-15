// components/layout/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // pathname format: /zh/some/path or /en/some/path
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'zh';
  const nextLocale = currentLocale === 'zh' ? 'en' : 'zh';

  const switchLanguage = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 text-text-secondary hover:text-text-primary
                 border border-surface-border hover:border-accent-blue/30
                 transition-colors duration-200"
      aria-label={`Switch to ${nextLocale === 'zh' ? '中文' : 'English'}`}
    >
      <Globe size={16} />
      <span className="text-sm font-medium uppercase">{nextLocale}</span>
    </button>
  );
}
