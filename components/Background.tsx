"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Fixed ambient background: subtle dev grid, faint voxel specks,
 * soft green/cyan glows and a tiny particle field. Purely decorative
 * (aria-hidden), extremely cheap, and fully disabled for reduced motion.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    type P = { x: number; y: number; s: number; vy: number; vx: number; a: number; c: string };
    let particles: P[] = [];

    const colors = ["74,222,128", "34,211,238", "167,139,250"];

    const seed = () => {
      const isMobile = w < 640;
      const count = isMobile ? 18 : 38;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() < 0.75 ? 1 : 2, // tiny squares — voxel dust
        vy: -(0.05 + Math.random() * 0.16),
        vx: (Math.random() - 0.5) * 0.06,
        a: 0.06 + Math.random() * 0.16,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-ink" />
      {/* dev grid, masked toward the top */}
      <div className="bg-grid absolute inset-0 opacity-70" />
      {/* soft ambient glows */}
      <div
        className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.16) 0%, rgba(34,197,94,0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-[-14%] top-[38%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-12%] right-[8%] h-[480px] w-[480px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)",
        }}
      />
      {/* faint voxel specks */}
      <div className="bg-grid-soft absolute inset-0 opacity-[0.35]" style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 100%, black, transparent)", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 100%, black, transparent)" }} />
      {/* particle dust */}
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0" />}
      {/* bottom vignette for depth */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
