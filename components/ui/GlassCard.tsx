import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card p-6 ${
        hover
          ? 'motion-safe:hover:scale-[1.02] motion-safe:hover:border-accent-blue/20 motion-safe:hover:shadow-lg motion-safe:hover:shadow-accent-blue/5 cursor-pointer'
          : ''
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
