"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  getCapeUrl,
  getMinecraftProfile,
  getSkinUrl,
  resetMinecraftCaches,
} from "@/lib/minecraft-client";
import { useReducedMotion } from "@/lib/hooks";

type Status = "loading" | "ready" | "error";

/**
 * Real-time 3D render of ArshuPremium's CURRENT Minecraft skin.
 *
 * - Skin + cape textures come from Mojang's public API through our own
 *   cached server proxy (/api/minecraft/*) — never hardcoded.
 * - Rendered with skinview3d (Three.js): idle animation, slow auto-rotation,
 *   drag-to-rotate, and a subtle pointer-driven sway.
 * - Lazy-loaded (dynamic import) so Three.js never blocks first paint.
 * - Graceful fallback UI with retry if the API or WebGL is unavailable.
 */
export default function MinecraftPlayer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const reduced = useReducedMotion();

  const retry = useCallback(() => {
    resetMinecraftCaches();
    setStatus("loading");
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let viewer: any = null;

    // pointer sway state (normalized -1..1)
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const swayLoop = () => {
      if (viewer && !disposed && viewer.playerWrapper) {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        viewer.playerWrapper.rotation.x = current.y * 0.05;
        viewer.playerWrapper.rotation.z = -current.x * 0.015;
      }
      raf = requestAnimationFrame(swayLoop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    (async () => {
      try {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const [{ SkinViewer, IdleAnimation }, profileResult, skinUrl] = await Promise.all([
          import("skinview3d"),
          getMinecraftProfile(),
          getSkinUrl(),
        ]);
        if (disposed) return;
        if (profileResult.status !== "ok" || !skinUrl) {
          throw new Error("skin unavailable");
        }
        const profile = profileResult.data;

        viewer = new SkinViewer({
          canvas,
          width: wrap.clientWidth || 420,
          height: wrap.clientHeight || 520,
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          zoom: 0.8,
          fov: 50,
          enableControls: true,
        });

        // Drag rotates the model; zoom/pan would break the stage framing.
        viewer.controls.enableZoom = false;
        viewer.controls.enablePan = false;

        await viewer.loadSkin(skinUrl, { model: profile.model });
        if (disposed) return;

        if (profile.hasCape) {
          const capeUrl = await getCapeUrl();
          if (capeUrl && !disposed && !viewer.disposed) {
            try {
              await viewer.loadCape(capeUrl);
            } catch {
              /* cape is a bonus — ignore failures */
            }
          }
        }
        if (disposed) return;

        if (reduced) {
          viewer.autoRotate = false;
          viewer.animation = null;
          viewer.playerObject.rotation.y = 0.42; // pleasant 3/4 pose
          viewer.render();
        } else {
          viewer.autoRotate = true;
          viewer.autoRotateSpeed = 0.38; // slow, calm turntable
          const idle = new IdleAnimation();
          idle.speed = 0.75;
          viewer.animation = idle;
          raf = requestAnimationFrame(swayLoop);
          wrap.addEventListener("pointermove", onPointerMove);
          wrap.addEventListener("pointerleave", onPointerLeave);
        }

        // responsive canvas
        ro = new ResizeObserver(() => {
          if (!viewer || disposed || viewer.disposed || !wrap) return;
          const w = wrap.clientWidth;
          const h = wrap.clientHeight;
          if (w > 0 && h > 0) {
            viewer.width = w;
            viewer.height = h;
            if (reduced) viewer.render();
          }
        });
        ro.observe(wrap);

        // pause rendering while the hero is off-screen (battery friendly)
        io = new IntersectionObserver(
          ([entry]) => {
            if (viewer && !disposed && !viewer.disposed && !reduced) {
              viewer.renderPaused = !entry.isIntersecting;
            }
          },
          { threshold: 0.05 }
        );
        io.observe(wrap);

        setStatus("ready");
      } catch {
        if (!disposed) {
          setStatus("error");
          try {
            viewer?.dispose();
          } catch { /* noop */ }
          viewer = null;
        }
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      const wrap = wrapRef.current;
      if (wrap) {
        wrap.removeEventListener("pointermove", onPointerMove);
        wrap.removeEventListener("pointerleave", onPointerLeave);
      }
      try {
        viewer?.dispose();
      } catch { /* noop */ }
      viewer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[400px] w-full sm:h-[480px] lg:h-[540px] xl:h-[580px]"
      data-status={status}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="3D render of ArshuPremium's current Minecraft skin, loaded live from Mojang's API"
        className="absolute inset-0 h-full w-full touch-pan-y"
        style={{ opacity: status === "ready" ? 1 : 0, transition: "opacity 0.8s ease" }}
      />

      {/* Loading state */}
      {status === "loading" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 animate-pulse rounded-md border border-grass-400/30 bg-grass-400/10" />
            <div className="absolute inset-2 rounded-sm bg-gradient-to-br from-grass-400/40 to-grass-600/20" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog-faint">
            fetching skin · mojang api
          </p>
        </div>
      )}

      {/* Error / fallback state — the site keeps working */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border border-line bg-ink-800/60 p-6 text-center backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10">
            <AlertTriangle className="h-6 w-6 text-yellow-400" aria-hidden />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-fog">
              3D skin preview unavailable
            </p>
            <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-fog-muted">
              Mojang&rsquo;s profile API could not be reached right now. The rest of
              the site works normally — try again in a moment.
            </p>
          </div>
          <button type="button" onClick={retry} className="btn-ghost px-4 py-2 text-sm">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
