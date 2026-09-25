"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { ArrowDown, ArrowRight, MessageSquare } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { useMinecraftProfile } from "@/lib/minecraft-client";
import { useReducedMotion } from "@/lib/hooks";
import Reveal from "./ui/Reveal";
import CopyButton from "./ui/CopyButton";
import StatusDot from "./ui/StatusDot";
import SkinHead from "./SkinHead";
import FloatingWidgets from "./FloatingWidgets";

// Three.js (~150KB gz) must never block first paint → client-only, lazy.
const MinecraftPlayer = dynamic(() => import("./MinecraftPlayer"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[400px] w-full sm:h-[480px] lg:h-[540px] xl:h-[580px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 animate-pulse rounded-md border border-grass-400/30 bg-grass-400/10" />
      </div>
    </div>
  ),
});

function HeroNameplate() {
  const profile = useMinecraftProfile();
  const data = profile.status === "ok" ? profile.data : null;

  return (
    <div className="panel mx-auto mt-2 flex w-full max-w-md flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
      <SkinHead size={40} alt="Minecraft head of ArshuPremium" />
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold text-fog">
          {data?.name ?? portfolioConfig.minecraftUsername}
        </p>
        <p className="font-mono text-[10px] tracking-wide text-fog-faint">
          {profile.status === "loading" && "resolving profile · mojang api…"}
          {profile.status === "ok" && (
            <span className="text-grass-300/90">
              profile resolved ✓ · live skin via mojang api
            </span>
          )}
          {profile.status === "error" && (
            <span className="text-yellow-400/90">mojang api unreachable · cached view</span>
          )}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        {data?.model === "slim" && <span className="chip chip-purple">slim</span>}
        {data?.hasCape && <span className="chip chip-cyan">cape ✓</span>}
        <CopyButton value={portfolioConfig.minecraftUsername} variant="icon" label="Minecraft username" />
      </div>
    </div>
  );
}

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { minecraftUsername, discord, availability, heroDescription, roleLine } =
    portfolioConfig;

  // Pointer parallax: write normalized -1..1 values into CSS vars (no rerenders)
  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 2 - 1;
    const py = ((e.clientY - r.top) / r.height) * 2 - 1;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  };

  const onStagePointerLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        {/* ============ LEFT — copy ============ */}
        <div className="max-w-xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-grass-400/25 bg-grass-400/[0.07] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-grass-300">
              <StatusDot color="green" />
              {availability.toUpperCase()}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.2rem]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-br from-grass-300 via-grass-400 to-grass-600 bg-clip-text text-transparent">
                Arixo.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 font-mono text-[13px] tracking-[0.06em] text-cyber-300/90 sm:text-sm">
              {roleLine}
            </p>
          </Reveal>

          <Reveal delay={230}>
            <p className="mt-5 text-[15px] leading-relaxed text-fog-muted md:text-[17px] md:leading-[1.7]">
              {heroDescription}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">
                View My Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#contact" className="btn-ghost">
                <MessageSquare className="h-4 w-4" aria-hidden />
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              <span className="chip">
                <span className="text-fog-faint">Minecraft:</span>
                <span className="text-fog">{minecraftUsername}</span>
                <CopyButton value={minecraftUsername} variant="icon" className="h-5 w-5 border-0 bg-transparent" />
              </span>
              <span className="chip">
                <span className="text-fog-faint">Discord:</span>
                <span className="text-fog">{discord}</span>
                <CopyButton value={discord} variant="icon" className="h-5 w-5 border-0 bg-transparent" />
              </span>
            </div>
          </Reveal>
        </div>

        {/* ============ RIGHT — 3D stage ============ */}
        <Reveal delay={200} className="relative">
          <div
            ref={stageRef}
            onPointerMove={onStagePointerMove}
            onPointerLeave={onStagePointerLeave}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* radial glow behind the character */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-8 bottom-24 rounded-full opacity-80 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(34,197,94,0.14) 0%, rgba(34,211,238,0.06) 42%, transparent 70%)",
                transform:
                  "translate3d(calc(var(--px,0) * -10px), calc(var(--py,0) * -8px), 0)",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            {/* perspective floor grid */}
            <div
              aria-hidden
              className="stage-floor pointer-events-none absolute inset-x-2 bottom-10 h-52 opacity-70"
              style={{
                transform:
                  "perspective(560px) rotateX(58deg) translate3d(calc(var(--px,0) * 8px), 0, 0)",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            />

            <MinecraftPlayer />
            <FloatingWidgets />
          </div>

          <HeroNameplate />
        </Reveal>
      </div>

      {/* scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-fog-faint transition-colors hover:text-grass-300 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ArrowDown className="h-4 w-4 animate-floaty-sm" aria-hidden />
      </a>
    </section>
  );
}
