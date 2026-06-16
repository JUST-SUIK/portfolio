'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from '@/lib/navigation';

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'zh';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between h-14 px-5
                        bg-surface/70 backdrop-blur-xl
                        border border-surface-border/50
                        rounded-2xl shadow-lg shadow-black/5">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-lg font-bold tracking-tighter
                       bg-gradient-to-r from-accent-blue to-accent-purple
                       bg-clip-text text-transparent
                       hover:opacity-80 transition-opacity"
          >
            CXP
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const pathWithoutLocale = pathname.replace(/^\/(zh|en)/, '');
              const isActive =
                pathWithoutLocale === link.href ||
                (link.href === '/' && pathWithoutLocale === '');
              const href =
                link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;

              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium
                             transition-colors duration-200 tracking-tight
                             ${
                               isActive
                                 ? 'text-accent-blue'
                                 : 'text-text-secondary hover:text-text-primary'
                             }`}
                >
                  {t(link.labelKey)}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                                     w-3 h-0.5 bg-accent-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
