'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  color: string;
}

const PARTICLE_COUNT = 55;
const COLORS = ['59,130,246', '139,92,246', '99,102,241', '56,189,248'];
const GRID_SPACING = 70;

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -500, y: -500 });
  const targetRef = useRef({ x: -500, y: -500 });
  const frameRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const ps: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.15 + Math.random() * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
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

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    resize();
    initParticles(W, H);
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => { targetRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length) targetRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch);

    const loop = () => {
      const f = frameRef.current++;
      const t = f * 0.004;
      const mouse = mouseRef.current;
      const target = targetRef.current;
      const ps = particlesRef.current;

      // Smooth mouse lerp
      mouse.x += (target.x - mouse.x) * 0.055;
      mouse.y += (target.y - mouse.y) * 0.055;
      const mx = mouse.x, my = mouse.y;

      ctx.clearRect(0, 0, W, H);

      // ━━━ Layer 1: Dark base with subtle animation ━━━
      const baseGrad = ctx.createLinearGradient(
        Math.sin(t * 0.4) * 150, Math.cos(t * 0.35) * 150,
        W + Math.cos(t * 0.3) * 150, H + Math.sin(t * 0.45) * 150,
      );
      baseGrad.addColorStop(0, '#080810');
      baseGrad.addColorStop(0.5, '#0a0d1a');
      baseGrad.addColorStop(1, '#060814');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      // ━━━ Layer 2: Colorful gradient (hidden under dark overlay) ━━━
      const colorGrad = ctx.createLinearGradient(
        Math.sin(t * 0.6) * 120 + mx * 0.08, Math.cos(t * 0.55) * 120 + my * 0.08,
        W + Math.cos(t * 0.5) * 120, H + Math.sin(t * 0.7) * 120,
      );
      colorGrad.addColorStop(0, '#1e40af');
      colorGrad.addColorStop(0.25, '#7c3aed');
      colorGrad.addColorStop(0.5, '#2563eb');
      colorGrad.addColorStop(0.75, '#6d28d9');
      colorGrad.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = colorGrad;
      ctx.fillRect(0, 0, W, H);

      // ━━━ Layer 3: Dark overlay with transparent spotlight at mouse ━━━
      const overlayGrad = ctx.createRadialGradient(mx, my, 30, mx, my, 600);
      overlayGrad.addColorStop(0, 'rgba(0,0,0,0)');       // Hole: see-through at center
      overlayGrad.addColorStop(0.25, 'rgba(0,0,0,0)');
      overlayGrad.addColorStop(0.5, 'rgba(0,0,0,0.35)');
      overlayGrad.addColorStop(0.75, 'rgba(0,0,0,0.6)');
      overlayGrad.addColorStop(1, 'rgba(0,0,0,0.85)');     // Nearly opaque at edges
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, W, H);

      // ━━━ Layer 4: Purple accent glow (always subtle) ━━━
      const accentGlow = ctx.createRadialGradient(
        mx - 50, my - 30, 0,
        mx - 50, my - 30, 160,
      );
      accentGlow.addColorStop(0, 'rgba(139,92,246,0.08)');
      accentGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = accentGlow;
      ctx.fillRect(0, 0, W, H);

      // ━━━ Layer 5: Grid lines that warp near cursor ━━━
      ctx.strokeStyle = 'rgba(255,255,255,0.015)';
      ctx.lineWidth = 0.5;

      for (let gx = 0; gx < W; gx += GRID_SPACING) {
        ctx.beginPath();
        for (let gy = 0; gy <= H; gy += 12) {
          const dx = gx - mx, dy = gy - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const warp = Math.max(0, 1 - d / 300);
          const offset = warp * 12 * Math.sin(t * 1.5 + gx * 0.015);
          if (gy === 0) ctx.moveTo(gx + offset, gy);
          else ctx.lineTo(gx + offset, gy);
        }
        ctx.stroke();
      }

      // ━━━ Layer 6: Particles ━━━
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 200) {
          const force = (1 - d / 200) * 0.12;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Damping + speed cap
        p.vx *= 0.997; p.vy *= 0.997;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.8) { p.vx *= 1.8 / spd; p.vy *= 1.8 / spd; }

        // Wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Brightness near mouse
        const nd = Math.hypot(p.x - mx, p.y - my);
        const bright = nd < 250 ? (1 - nd / 250) * 0.35 : 0;
        const a = Math.min(p.alpha + bright, 0.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${a})`;
        ctx.fill();

        // Subtle glow ring for closer particles
        if (nd < 120) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${a * 0.25})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [initParticles]);

  return (
    <>
      {/* Fallback gradient for mobile / no-JS */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #080810, #0a0d1a 50%, #060814)',
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}
