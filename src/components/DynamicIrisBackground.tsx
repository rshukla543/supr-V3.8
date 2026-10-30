import React, { useEffect, useRef, useState } from 'react';
import { AuraTheme, getActiveAuraTheme, subscribeToAuraChanges } from '../lib/auraEngine';

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
  const [currentTheme, setCurrentTheme] = useState<AuraTheme>(getActiveAuraTheme());
  const themeRef = useRef<AuraTheme>(getActiveAuraTheme());

  useEffect(() => {
    const unsubscribe = subscribeToAuraChanges((theme) => {
      setCurrentTheme(theme);
      themeRef.current = theme;
    });
    return () => unsubscribe();
  }, []);

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
    const starCount = isMobile ? 50 : 90;

    const stars: Star[] = [];
    const getColors = () => themeRef.current.particleColors;

    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() < 0.85 ? Math.random() * 1.1 + 0.4 : Math.random() * 1.6 + 1.1;
      const baseAlpha = Math.random() * 0.45 + 0.15;
      const colors = getColors();
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        speed: Math.random() * 0.3 + 0.08,
        driftX: (Math.random() - 0.5) * 0.18,
        color: colors[Math.floor(Math.random() * colors.length)],
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

      const theme = themeRef.current;

      // 1. Theme Canvas Base (#0B0914 or active theme canvasBg)
      ctx.fillStyle = theme.canvasBg || '#0B0914';
      ctx.fillRect(0, 0, width, height);

      // 2. Slow-Moving Cosmic Mesh Spheres
      // Sphere A: Upper Right Aura
      const sphereAX = width * 0.72 + Math.sin(time * 0.5) * 110;
      const sphereAY = height * 0.32 + Math.cos(time * 0.45) * 75;
      const gradPrimary = ctx.createRadialGradient(
        sphereAX,
        sphereAY,
        25,
        sphereAX,
        sphereAY,
        Math.max(width, height) * 0.48
      );
      gradPrimary.addColorStop(0, `${theme.primaryColor}22`);
      gradPrimary.addColorStop(0.45, `${theme.primaryColor}0d`);
      gradPrimary.addColorStop(1, 'rgba(11, 9, 20, 0)');
      ctx.fillStyle = gradPrimary;
      ctx.fillRect(0, 0, width, height);

      // Sphere B: Lower Left Aura
      const sphereBX = width * 0.22 + Math.cos(time * 0.45) * 85;
      const sphereBY = height * 0.7 + Math.sin(time * 0.6) * 85;
      const gradSecondary = ctx.createRadialGradient(
        sphereBX,
        sphereBY,
        30,
        sphereBX,
        sphereBY,
        Math.max(width, height) * 0.44
      );
      gradSecondary.addColorStop(0, `${theme.secondaryColor}1e`);
      gradSecondary.addColorStop(0.5, `${theme.secondaryColor}0a`);
      gradSecondary.addColorStop(1, 'rgba(11, 9, 20, 0)');
      ctx.fillStyle = gradSecondary;
      ctx.fillRect(0, 0, width, height);

      // Sphere C: Center Drift Core
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
      gradCenter.addColorStop(0, `${theme.primaryColor}14`);
      gradCenter.addColorStop(0.6, `${theme.secondaryColor}08`);
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
        mouseSpot.addColorStop(0, `${theme.primaryColor}16`);
        mouseSpot.addColorStop(0.6, `${theme.secondaryColor}08`);
        mouseSpot.addColorStop(1, 'rgba(11, 9, 20, 0)');
        ctx.fillStyle = mouseSpot;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Dynamic Flying Stars
      const colors = theme.particleColors;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.y -= s.speed;
        s.x += s.driftX;

        if (s.y < -5) {
          s.y = height + 5;
          s.x = Math.random() * width;
          s.color = colors[Math.floor(Math.random() * colors.length)];
        }
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;

        // Subtle organic twinkling
        const twinkle = Math.sin(time * 2.2 + s.twinklePhase) * 0.15;
        const currentAlpha = Math.max(0.08, Math.min(0.9, s.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};
