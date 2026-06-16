import Link from 'next/link';
import { ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

const variantStyles = {
  primary:
    'bg-accent-blue text-white hover:bg-blue-600 shadow-lg shadow-accent-blue/20 active:scale-[0.98]',
  secondary:
    'bg-surface-card text-text-primary border border-surface-border hover:border-accent-blue/20 hover:shadow-md active:scale-[0.98]',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-surface-card/60 active:scale-[0.98]',
};

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-sm tracking-tight',
  md: 'px-5 py-2.5 text-sm tracking-tight',
  lg: 'px-7 py-3.5 text-base tracking-tight',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl
                   font-semibold transition-all duration-200 ease-out
                   focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:ring-offset-2 focus:ring-offset-surface
                   motion-safe:hover:scale-[1.02]
                   ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
