"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks } from "@/lib/navigation";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "zh";

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface/80 border-b border-surface-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-text-primary font-semibold text-lg hover:text-accent-blue transition-colors"
        >
          Portfolio
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(link.href)
                  ? "text-accent-blue bg-accent-blue/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-card"
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-surface-border flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
