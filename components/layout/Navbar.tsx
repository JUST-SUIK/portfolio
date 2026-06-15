"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "zh";

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ];

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
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(link.href)
                  ? "text-accent-blue bg-accent-blue/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-card"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-surface-border flex gap-1">
            <Link
              href={`/zh${pathname.replace(/^\/(zh|en)/, "")}`}
              className={`px-2 py-1 text-xs rounded ${locale === "zh" ? "text-accent-blue bg-accent-blue/10" : "text-text-muted hover:text-text-secondary"}`}
            >
              中文
            </Link>
            <Link
              href={`/en${pathname.replace(/^\/(zh|en)/, "")}`}
              className={`px-2 py-1 text-xs rounded ${locale === "en" ? "text-accent-blue bg-accent-blue/10" : "text-text-muted hover:text-text-secondary"}`}
            >
              EN
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
