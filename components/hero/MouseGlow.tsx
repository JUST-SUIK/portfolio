'use client';

import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = -200;
    let mouseY = -200;
    let targetX = -200;
    let targetY = -200;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    // Also track touch for mobile
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchmove', handleTouch);

    const draw = () => {
      // Smooth follow with lerp
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Main glow - large soft radial gradient
      const mainGlow = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 400
      );
      mainGlow.addColorStop(0, 'rgba(59, 130, 246, 0.12)');   // accent-blue
      mainGlow.addColorStop(0.4, 'rgba(59, 130, 246, 0.04)');
      mainGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mainGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Secondary glow - smaller purple accent
      const secondGlow = ctx.createRadialGradient(
        mouseX - 80, mouseY - 60, 0,
        mouseX - 80, mouseY - 60, 200
      );
      secondGlow.addColorStop(0, 'rgba(139, 92, 246, 0.10)');  // accent-purple
      secondGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = secondGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
