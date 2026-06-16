import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold tracking-tighter
                             bg-gradient-to-r from-accent-blue to-accent-purple
                             bg-clip-text text-transparent">
              CXP
            </span>
            <p className="text-sm text-text-muted mt-2 max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary tracking-tight mb-3">
              导航
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/zh/about" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                  关于我
                </Link>
              </li>
              <li>
                <Link href="/zh/projects" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                  项目作品
                </Link>
              </li>
              <li>
                <Link href="/zh/contact" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                  联系方式
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary tracking-tight mb-3">
              社交
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  邮箱
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-surface-border/30">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
