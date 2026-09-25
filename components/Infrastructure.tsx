"use client";

import { useEffect, useState } from "react";
import { FlaskConical } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusDot from "./ui/StatusDot";
import { getIcon } from "./ui/Icon";

/** Deterministic pseudo-random sparkline path (decorative only). */
function sparkPath(seed: number, w = 220, h = 44, points = 26): string {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const step = w / (points - 1);
  let d = `M0 ${(h * 0.6).toFixed(1)}`;
  let prev = h * 0.6;
  for (let i = 1; i < points; i++) {
    const y = Math.min(h - 3, Math.max(3, prev + (rand() - 0.5) * h * 0.55));
    d += ` L${(i * step).toFixed(1)} ${y.toFixed(1)}`;
    prev = y;
  }
  return d;
}

function Sparkline({ seed, color, reduced }: { seed: number; color: string; reduced: boolean }) {
  const d = sparkPath(seed);
  return (
    <svg viewBox="0 0 220 44" className="h-11 w-full" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sp-fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L220 44 L0 44 Z`} fill={`url(#sp-fill-${seed})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {!reduced && (
        <circle r="2.6" fill={color}>
          <animateMotion dur="4.2s" repeatCount="indefinite" path={d} />
        </circle>
      )}
    </svg>
  );
}

function Topology() {
  const reduced = useReducedMotion();
  const led = "#4ade80";
  const cyan = "#22d3ee";

  const box = (x: number, y: number, w: number, h: number, title: string, sub: string, accent: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill="#0e141b" stroke="rgba(148,163,184,0.22)" />
      <rect x={x} y={y} width={w} height="4" rx="2" fill={accent} opacity="0.8" />
      <circle cx={x + 14} cy={y + h / 2 + 4} r="3.4" fill={led}>
        {!reduced && (
          <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
        )}
      </circle>
      <text x={x + 26} y={y + h / 2} fill="#e8eef4" fontSize="12.5" fontFamily="var(--font-mono), monospace" fontWeight="600">
        {title}
      </text>
      <text x={x + 26} y={y + h / 2 + 15} fill="#5c6b7c" fontSize="9.5" fontFamily="var(--font-mono), monospace">
        {sub}
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 900 250"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram: Pterodactyl panel connects to Wings daemons, which manage game and bot servers on a node"
    >
      {/* trunk lines */}
      <path id="trunk1" d="M245 125 C 320 125, 330 125, 400 125" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="1.4" strokeDasharray="4 6" className="animate-dash-flow" />
      {/* fan-out to servers */}
      <path id="fan1" d="M565 125 C 640 125, 620 58, 690 58" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.3" strokeDasharray="4 6" className="animate-dash-flow" />
      <path id="fan2" d="M565 125 L 690 125" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.3" strokeDasharray="4 6" className="animate-dash-flow" />
      <path id="fan3" d="M565 125 C 640 125, 620 192, 690 192" fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="1.3" strokeDasharray="4 6" className="animate-dash-flow" />

      {/* travelling packets */}
      {!reduced && (
        <>
          <circle r="3.2" fill={led}>
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M245 125 C 320 125, 330 125, 400 125" />
          </circle>
          <circle r="2.8" fill={cyan}>
            <animateMotion dur="3.4s" repeatCount="indefinite" path="M565 125 C 640 125, 620 58, 690 58" />
          </circle>
          <circle r="2.8" fill={led}>
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M565 125 L 690 125" />
          </circle>
          <circle r="2.8" fill={cyan}>
            <animateMotion dur="3.8s" repeatCount="indefinite" path="M565 125 C 640 125, 620 192, 690 192" />
          </circle>
        </>
      )}

      {box(80, 92, 165, 66, "panel", "pterodactyl · https", "#a78bfa")}
      {box(400, 92, 165, 66, "wings", "daemon · node-01", led)}
      {box(690, 28, 150, 60, "mc-servers", "paper · forge", led)}
      {box(690, 95, 150, 60, "proxy", "velocity · dns", cyan)}
      {box(690, 162, 150, 60, "bots & apps", "node.js · python", "#a78bfa")}

      {/* labels */}
      <text x="322" y="112" fill="#5c6b7c" fontSize="9" fontFamily="var(--font-mono), monospace">wss://8080</text>
      <text x="612" y="90" fill="#5c6b7c" fontSize="9" fontFamily="var(--font-mono), monospace">allocations</text>
    </svg>
  );
}

function NodeLoadCard() {
  const reduced = useReducedMotion();
  return (
    <div className="panel flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-faint">
          node-01 · load
        </p>
        <span className="chip chip-cyan px-1.5 py-0 font-mono text-[8.5px]">simulated</span>
      </div>
      <div>
        <p className="mb-1 font-mono text-[10.5px] text-fog-muted">cpu</p>
        <Sparkline seed={97} color="#4ade80" reduced={reduced} />
      </div>
      <div>
        <p className="mb-1 font-mono text-[10.5px] text-fog-muted">memory</p>
        <Sparkline seed={233} color="#22d3ee" reduced={reduced} />
      </div>
      <p className="mt-auto font-mono text-[9.5px] leading-relaxed text-fog-faint">
        waveforms are decorative — real dashboards ship with the panel itself.
      </p>
    </div>
  );
}

function LogStream() {
  const { logLines } = portfolioConfig.infrastructure;
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => i + 1), 2400);
    return () => clearInterval(t);
  }, [reduced]);

  const visible = Array.from({ length: 4 }, (_, k) => logLines[(idx + k) % logLines.length]);

  return (
    <div className="panel h-full p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-faint">
          log stream
        </p>
        <span className="chip chip-cyan px-1.5 py-0 font-mono text-[8.5px]">simulated</span>
      </div>
      <div className="space-y-1.5 font-mono text-[11px]" aria-hidden>
        {visible.map((line, i) => (
          <p
            key={`${line}-${i}-${idx}`}
            className={cn(
              "truncate transition-opacity duration-500",
              i === 0 ? "text-grass-300/90" : "text-fog-faint"
            )}
            style={{ opacity: 1 - i * 0.22 }}
          >
            {line}
          </p>
        ))}
      </div>
      <p className="sr-only">Simulated infrastructure log lines for visual effect.</p>
    </div>
  );
}

export default function Infrastructure() {
  const { infrastructure } = portfolioConfig;

  return (
    <section id="infrastructure" aria-labelledby="infra-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            kicker="07 // INFRASTRUCTURE"
            title={infrastructure.title}
            id="infra-heading"
            description={infrastructure.description}
            className="mb-0 max-w-2xl flex-1"
          />
          <Reveal delay={120} className="mb-14 md:mb-16">
            <span className="chip chip-purple">
              <FlaskConical className="h-3 w-3" aria-hidden />
              concept · demo data
            </span>
          </Reveal>
        </div>

        {/* status cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {infrastructure.statusCards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <Reveal key={card.label} delay={i * 70}>
                <div className="panel group p-4 transition-colors duration-300 hover:border-grass-400/30">
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4 text-fog-faint transition-colors duration-300 group-hover:text-grass-400" aria-hidden />
                    <StatusDot color="green" />
                  </div>
                  <p className="mt-3 font-display text-[15px] font-semibold text-fog">{card.label}</p>
                  <p className="font-mono text-[11px] text-grass-300/90">{card.value}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* topology */}
        <Reveal delay={120}>
          <div className="panel-raised mt-4 overflow-hidden p-4 sm:p-6">
            <Topology />
          </div>
        </Reveal>

        {/* bottom row: servers table + sparklines + log stream */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Reveal delay={60} className="lg:col-span-1">
            <div className="panel h-full p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-faint">
                  servers
                </p>
                <span className="chip px-1.5 py-0 font-mono text-[8.5px]">managed</span>
              </div>
              <ul className="space-y-2">
                {infrastructure.demoServers.map((srv) => (
                  <li
                    key={srv.name}
                    className="flex items-center justify-between rounded-md border border-line/70 bg-ink-850/60 px-3 py-2"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[12px] text-fog">{srv.name}</span>
                      <span className="block font-mono text-[9.5px] text-fog-faint">{srv.egg}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-fog-muted">
                      <span
                        className={cn(
                          "inline-block h-1.5 w-1.5 rounded-full",
                          srv.status === "running" ? "bg-grass-400" : "bg-yellow-400/80"
                        )}
                      />
                      {srv.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={130} className="lg:col-span-1">
            <NodeLoadCard />
          </Reveal>

          <Reveal delay={200} className="lg:col-span-1">
            <LogStream />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[12.5px] leading-relaxed text-fog-faint">
            {infrastructure.demoNotice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
