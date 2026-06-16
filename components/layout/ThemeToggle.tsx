'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Sync with HTML class on mount
    const isDark = document.documentElement.classList.contains('dark');
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 text-text-secondary hover:text-text-primary
                 border border-surface-border hover:border-accent-blue/30
                 transition-colors duration-200"
      aria-label={dark ? '切换到白天模式' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-xs font-medium hidden sm:inline">
        {dark ? '白天' : '暗夜'}
      </span>
    </button>
  );
}
