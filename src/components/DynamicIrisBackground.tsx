import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  speed: number;
  driftX: number;
  color: string;
  twinklePhase: number;
}

export const DynamicIrisBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 50 : 100;

    // Subtle star colors (silver, lavender, faint celestial indigo, pure white)
    const starColors = [
      'rgba(248, 250, 252, ', // Pure Platinum/Silver
      'rgba(233, 213, 255, ', // Delicate lavender
      'rgba(224, 231, 255, ', // Celestial indigo ice
      'rgba(255, 255, 255, ', // White star
    ];

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() < 0.85 ? Math.random() * 1.1 + 0.4 : Math.random() * 1.6 + 1.1;
      const baseAlpha = Math.random() * 0.45 + 0.15;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        speed: Math.random() * 0.3 + 0.08,
        driftX: (Math.random() - 0.5) * 0.18,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.005;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 1. Midnight Lotus Base (#0B0914)
      ctx.fillStyle = '#0B0914';
      ctx.fillRect(0, 0, width, height);

      // 2. Slow-Moving Cosmic Violet & Indigo Mesh Spheres
      // Sphere A: Midnight Violet Aura (Upper Right)
      const sphereAX = width * 0.72 + Math.sin(time * 0.5) * 110;
      const sphereAY = height * 0.32 + Math.cos(time * 0.45) * 75;
      const gradViolet = ctx.createRadialGradient(
        sphereAX,
        sphereAY,
        25,
        sphereAX,
        sphereAY,
        Math.max(width, height) * 0.48
      );
      gradViolet.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      gradViolet.addColorStop(0.45, 'rgba(126, 34, 206, 0.05)');
      gradViolet.addColorStop(1, 'rgba(11, 9, 20, 0)');
      ctx.fillStyle = gradViolet;
      ctx.fillRect(0, 0, width, height);

      // Sphere B: Deep Celestial Indigo (Lower Left)
      const sphereBX = width * 0.22 + Math.cos(time * 0.45) * 85;
      const sphereBY = height * 0.7 + Math.sin(time * 0.6) * 85;
      const gradIndigo = ctx.createRadialGradient(
        sphereBX,
        sphereBY,
        30,
        sphereBX,
        sphereBY,
        Math.max(width, height) * 0.44
      );
      gradIndigo.addColorStop(0, 'rgba(99, 102, 241, 0.10)');
      gradIndigo.addColorStop(0.5, 'rgba(67, 56, 202, 0.04)');
      gradIndigo.addColorStop(1, 'rgba(11, 9, 20, 0)');
      ctx.fillStyle = gradIndigo;
      ctx.fillRect(0, 0, width, height);

      // Sphere C: Ethereal Lotus Core (Center Drift)
      const sphereCX = width * 0.5 + Math.sin(time * 0.35) * 120;
      const sphereCY = height * 0.52 + Math.cos(time * 0.5) * 90;
      const gradCenter = ctx.createRadialGradient(
        sphereCX,
        sphereCY,
        15,
        sphereCX,
        sphereCY,
        Math.max(width, height) * 0.36
      );
      gradCenter.addColorStop(0, 'rgba(192, 132, 252, 0.06)');
      gradCenter.addColorStop(0.6, 'rgba(79, 70, 229, 0.03)');
      gradCenter.addColorStop(1, 'rgba(11, 9, 20, 0)');
      ctx.fillStyle = gradCenter;
      ctx.fillRect(0, 0, width, height);

      // Gentle interactive spotlight
      if (mouse.active) {
        const mouseSpot = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          160
        );
        mouseSpot.addColorStop(0, 'rgba(192, 132, 252, 0.07)');
        mouseSpot.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)');
        mouseSpot.addColorStop(1, 'rgba(11, 9, 20, 0)');
        ctx.fillStyle = mouseSpot;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Dynamic Flying Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Smooth flight path
        s.y -= s.speed;
        s.x += s.driftX;

        // Loop seamlessly
        if (s.y < -5) {
          s.y = height + 5;
          s.x = Math.random() * width;
        }
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;

        // Organic twinkle
        s.twinklePhase += 0.025;
        s.alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.2 * s.baseAlpha;
        const currentAlpha = Math.max(0.08, Math.min(0.8, s.alpha));

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${currentAlpha})`;
        ctx.fill();

        // Subtle glow cross on occasional bright stars
        if (s.radius > 1.6 && currentAlpha > 0.45) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - 3, s.y);
          ctx.lineTo(s.x + 3, s.y);
          ctx.moveTo(s.x, s.y - 3);
          ctx.lineTo(s.x, s.y + 3);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
