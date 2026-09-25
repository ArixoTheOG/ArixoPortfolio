"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsCoarsePointer, useReducedMotion } from "@/lib/hooks";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  intensity?: number;
  glare?: boolean;
};

/**
 * Subtle 3D pointer-tilt container (CSS transforms only, no WebGL).
 * Disabled automatically for touch devices and reduced-motion users.
 */
export default function TiltCard({
  children,
  className,
  intensity = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilting, setTilting] = useState(false);
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const enabled = !reduced && !coarse;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 2 * intensity;
    const rx = -(py - 0.5) * 2 * intensity;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    if (!tilting) setTilting(true);
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    setTilting(false);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("tilt-card", tilting && "tilting", className)}
    >
      {children}
      {glare && enabled && <div className="tilt-glare" />}
    </div>
  );
}
