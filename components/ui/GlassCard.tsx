'use client';

import { type ReactNode, useRef, useState, useCallback } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl transition-all duration-300 ${
        hover
          ? 'motion-safe:hover:shadow-lg motion-safe:hover:shadow-accent-blue/5'
          : ''
      } ${className}`}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseEnter={hover ? () => setIsHovering(true) : undefined}
      onMouseLeave={hover ? () => setIsHovering(false) : undefined}
    >
      {/* Spotlight glow on hover */}
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.06), transparent 60%)`,
          }}
        />
      )}
      {/* Card surface */}
      <div
        className="glass-card relative h-full p-6"
        style={{
          borderColor: isHovering
            ? 'rgba(59, 130, 246, 0.12)'
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
