"use client";

import { useEffect, useRef, useState } from "react";
import { getSkinUrl } from "@/lib/minecraft-client";
import { cn } from "@/lib/utils";

type SkinHeadProps = {
  size?: number;
  className?: string;
  alt?: string;
};

/**
 * Crisp 2D render of the player's CURRENT skin head (base layer + hat
 * overlay), drawn from the same proxied texture the 3D viewer uses.
 * Falls back to a neutral pixel placeholder when the API is down —
 * never a hardcoded unrelated skin.
 */
export default function SkinHead({ size = 64, className, alt }: SkinHeadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      const url = await getSkinUrl();
      if (!alive) return;
      if (!url) {
        setState("error");
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (!alive) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const px = Math.round(size * dpr);
        canvas.width = px;
        canvas.height = px;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setState("error");
          return;
        }
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, px, px);
        // head base layer (8,8,8,8), then hat overlay (40,8,8,8)
        ctx.drawImage(img, 8, 8, 8, 8, 0, 0, px, px);
        ctx.drawImage(img, 40, 8, 8, 8, 0, 0, px, px);
        setState("ready");
      };
      img.onerror = () => alive && setState("error");
      img.src = url;
    })();
    return () => {
      alive = false;
    };
  }, [size]);

  if (state === "error") {
    // neutral placeholder — abstract pixel face, not a real skin
    return (
      <svg
        viewBox="0 0 8 8"
        width={size}
        height={size}
        role="img"
        aria-label={alt ?? "Minecraft head placeholder"}
        className={cn("pixelated shrink-0 rounded-[18%] border border-line bg-ink-700", className)}
        shapeRendering="crispEdges"
      >
        <rect width="8" height="8" fill="#26303c" />
        <rect x="1" y="1" width="6" height="6" fill="#31404f" />
        <rect x="2" y="3" width="1" height="1" fill="#4ade80" />
        <rect x="5" y="3" width="1" height="1" fill="#4ade80" />
        <rect x="3" y="5" width="2" height="1" fill="#1c2530" />
      </svg>
    );
  }

  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt ?? "Minecraft player head, rendered from the live skin"}
        className="pixelated h-full w-full rounded-[18%] border border-line"
        style={{ width: size, height: size, opacity: state === "ready" ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
      {state === "loading" && (
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse rounded-[18%] border border-line bg-ink-700"
        />
      )}
    </span>
  );
}
