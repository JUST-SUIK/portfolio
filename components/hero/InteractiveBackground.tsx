'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  color: string;
}

const PARTICLE_COUNT = 45;
const DARK_COLORS = ['59,130,246', '139,92,246', '99,102,241', '56,189,248'];
const LIGHT_COLORS = ['37,99,235', '109,40,217', '79,70,229', '2,132,199'];
const GRID_SPACING = 70;

// Theme-aware color configs
const THEME = {
  dark: {
    base: ['#080810', '#0a0d1a', '#060814'],
    gradient: ['#1e40af', '#7c3aed', '#2563eb', '#6d28d9', '#1d4ed8'],
    overlayCenter: 'rgba(0,0,0,0)',
    overlayEdge: 'rgba(0,0,0,0.88)',
    accentGlow: 'rgba(139,92,246,0.06)',
    gridColor: 'rgba(255,255,255,0.015)',
    particleColors: DARK_COLORS,
    fallbackBg: 'linear-gradient(135deg, #080810, #0a0d1a 50%, #060814)',
  },
  light: {
    base: ['#f0f4ff', '#f8fafc', '#eff6ff'],
    gradient: ['#93c5fd', '#c4b5fd', '#60a5fa', '#a78bfa', '#93c5fd'],
    overlayCenter: 'rgba(255,255,255,0)',
    overlayEdge: 'rgba(255,255,255,0.82)',
    accentGlow: 'rgba(99,102,241,0.10)',
    gridColor: 'rgba(0,0,0,0.025)',
    particleColors: LIGHT_COLORS,
    fallbackBg: 'linear-gradient(135deg, #f0f4ff, #f8fafc 50%, #eff6ff)',
  },
};

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -500, y: -500 });
  const targetRef = useRef({ x: -500, y: -500 });
  const frameRef = useRef(0);
  const themeRef = useRef<'dark' | 'light'>('dark');

  const initParticles = useCallback((w: number, h: number) => {
    const colors = themeRef.current === 'dark' ? DARK_COLORS : LIGHT_COLORS;
    const ps: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.1 + Math.random() * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = ps;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const getTheme = (): 'dark' | 'light' =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light';

    themeRef.current = getTheme();

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      themeRef.current = getTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    resize();
    initParticles(W, H);
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => { targetRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);

    const loop = () => {
      const f = frameRef.current++;
      const t = f * 0.004;
      const mouse = mouseRef.current;
      const target = targetRef.current;
      const ps = particlesRef.current;
      const cfg = THEME[themeRef.current];

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      const mx = mouse.x, my = mouse.y;

      ctx.clearRect(0, 0, W, H);

      // Layer 1: Base gradient
      const baseGrad = ctx.createLinearGradient(
        Math.sin(t * 0.4) * 120, Math.cos(t * 0.35) * 120,
        W + Math.cos(t * 0.3) * 120, H + Math.sin(t * 0.45) * 120,
      );
      baseGrad.addColorStop(0, cfg.base[0]);
      baseGrad.addColorStop(0.5, cfg.base[1]);
      baseGrad.addColorStop(1, cfg.base[2]);
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      // Layer 2: Colorful gradient
      const colorGrad = ctx.createLinearGradient(
        Math.sin(t * 0.6) * 100 + mx * 0.05, Math.cos(t * 0.55) * 100 + my * 0.05,
        W + Math.cos(t * 0.5) * 100, H + Math.sin(t * 0.7) * 100,
      );
      colorGrad.addColorStop(0, cfg.gradient[0]);
      colorGrad.addColorStop(0.25, cfg.gradient[1]);
      colorGrad.addColorStop(0.5, cfg.gradient[2]);
      colorGrad.addColorStop(0.75, cfg.gradient[3]);
      colorGrad.addColorStop(1, cfg.gradient[4]);
      ctx.fillStyle = colorGrad;
      ctx.fillRect(0, 0, W, H);

      // Layer 3: Overlay with spotlight hole (smaller radius: 280)
      const overlayGrad = ctx.createRadialGradient(mx, my, 20, mx, my, 280);
      overlayGrad.addColorStop(0, cfg.overlayCenter);
      overlayGrad.addColorStop(0.3, cfg.overlayCenter);
      overlayGrad.addColorStop(0.55, cfg.overlayEdge.replace(/[\d.]+\)$/, '0.3)'));
      overlayGrad.addColorStop(0.8, cfg.overlayEdge.replace(/[\d.]+\)$/, '0.65)'));
      overlayGrad.addColorStop(1, cfg.overlayEdge);
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, W, H);

      // Layer 4: Subtle accent glow
      const accentGlow = ctx.createRadialGradient(mx - 40, my - 25, 0, mx - 40, my - 25, 120);
      accentGlow.addColorStop(0, cfg.accentGlow);
      accentGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = accentGlow;
      ctx.fillRect(0, 0, W, H);

      // Layer 5: Grid
      ctx.strokeStyle = cfg.gridColor;
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += GRID_SPACING) {
        ctx.beginPath();
        for (let gy = 0; gy <= H; gy += 12) {
          const dx = gx - mx, dy = gy - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const warp = Math.max(0, 1 - d / 250);
          const offset = warp * 10 * Math.sin(t * 1.5 + gx * 0.015);
          if (gy === 0) ctx.moveTo(gx + offset, gy);
          else ctx.lineTo(gx + offset, gy);
        }
        ctx.stroke();
      }

      // Layer 6: Particles
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;

        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 160) {
          const force = (1 - d / 160) * 0.1;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        p.vx *= 0.997; p.vy *= 0.997;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.6) { p.vx *= 1.6 / spd; p.vy *= 1.6 / spd; }

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const nd = Math.hypot(p.x - mx, p.y - my);
        const bright = nd < 200 ? (1 - nd / 200) * 0.3 : 0;
        const a = Math.min(p.alpha + bright, 0.7);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [initParticles]);

  return (
    <>
      {/* Fallback for no-JS */}
      <div
        className="fixed inset-0 pointer-events-none hidden dark:hidden"
        style={{
          background: THEME.light.fallbackBg,
          zIndex: -1,
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none hidden dark:block"
        style={{
          background: THEME.dark.fallbackBg,
          zIndex: -1,
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />
    </>
  );
}
