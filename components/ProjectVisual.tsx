import { cn } from "@/lib/utils";

/**
 * Procedural isometric voxel artwork per project — pure SVG, no external
 * images, no fake screenshots. Each variant hints at what the project is
 * (cloud hosting, node infrastructure, bots, control panel).
 */

const GRID = "rgba(74,222,128,0.08)";

function Iso({
  x,
  y,
  size = 34,
  top,
  left,
  right,
  opacity = 1,
}: {
  x: number;
  y: number;
  size?: number;
  top: string;
  left: string;
  right: string;
  opacity?: number;
}) {
  const s = size;
  const hx = s; // half-width
  const hy = s * 0.5;
  const d = s * 0.62; // depth
  return (
    <g opacity={opacity}>
      {/* top face */}
      <path d={`M${x} ${y} L${x + hx} ${y + hy} L${x} ${y + 2 * hy} L${x - hx} ${y + hy} Z`} fill={top} />
      {/* left face */}
      <path d={`M${x - hx} ${y + hy} L${x} ${y + 2 * hy} L${x} ${y + 2 * hy + d} L${x - hx} ${y + hy + d} Z`} fill={left} />
      {/* right face */}
      <path d={`M${x + hx} ${y + hy} L${x} ${y + 2 * hy} L${x} ${y + 2 * hy + d} L${x + hx} ${y + hy + d} Z`} fill={right} />
    </g>
  );
}

export default function ProjectVisual({
  variant,
  className,
}: {
  variant: "cloud" | "node" | "bot" | "panel";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 220"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`pv-bg-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1219" />
          <stop offset="1" stopColor="#0a0e14" />
        </linearGradient>
        <radialGradient id={`pv-glow-${variant}`} cx="0.5" cy="0.42" r="0.65">
          {variant === "bot" ? (
            <>
              <stop offset="0" stopColor="rgba(88,101,242,0.22)" />
              <stop offset="1" stopColor="rgba(88,101,242,0)" />
            </>
          ) : variant === "node" ? (
            <>
              <stop offset="0" stopColor="rgba(34,211,238,0.18)" />
              <stop offset="1" stopColor="rgba(34,211,238,0)" />
            </>
          ) : variant === "panel" ? (
            <>
              <stop offset="0" stopColor="rgba(167,139,250,0.16)" />
              <stop offset="1" stopColor="rgba(167,139,250,0)" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="rgba(74,222,128,0.20)" />
              <stop offset="1" stopColor="rgba(74,222,128,0)" />
            </>
          )}
        </radialGradient>
        <pattern id={`pv-grid-${variant}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 L0 0 0 24" fill="none" stroke={GRID} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="480" height="220" fill={`url(#pv-bg-${variant})`} />
      <rect width="480" height="220" fill={`url(#pv-grid-${variant})`} opacity="0.8" />
      <rect width="480" height="220" fill={`url(#pv-glow-${variant})`} />

      {variant === "cloud" && (
        <g>
          {/* floating voxel cloud over a server block */}
          <Iso x={240} y={38} size={40} top="#7ef2a3" left="#2fc965" right="#1fa452" opacity={0.9} />
          <Iso x={192} y={62} size={26} top="#4ade80" left="#22c55e" right="#15803d" opacity={0.65} />
          <Iso x={292} y={60} size={26} top="#4ade80" left="#22c55e" right="#15803d" opacity={0.65} />
          <Iso x={240} y={128} size={30} top="#334155" left="#1e293b" right="#0f172a" />
          {/* connection lines */}
          <line x1="240" y1="96" x2="240" y2="122" stroke="#4ade80" strokeWidth="1.4" strokeDasharray="3 5" className="animate-dash-flow" opacity="0.8" />
          <line x1="205" y1="98" x2="228" y2="126" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 5" className="animate-dash-flow" opacity="0.5" />
          <line x1="278" y1="96" x2="254" y2="126" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 5" className="animate-dash-flow" opacity="0.5" />
          <circle cx="240" cy="112" r="2.4" fill="#4ade80" />
        </g>
      )}

      {variant === "node" && (
        <g>
          {/* rack of node blocks */}
          <Iso x={170} y={96} size={30} top="#67e8f9" left="#0e7490" right="#155e75" />
          <Iso x={240} y={96} size={30} top="#4ade80" left="#166534" right="#14532d" />
          <Iso x={310} y={96} size={30} top="#a78bfa" left="#5b21b6" right="#4c1d95" />
          <Iso x={205} y={140} size={24} top="#334155" left="#1e293b" right="#0f172a" opacity={0.9} />
          <Iso x={275} y={140} size={24} top="#334155" left="#1e293b" right="#0f172a" opacity={0.9} />
          {/* bus line */}
          <path d="M140 66 H340" stroke="rgba(148,163,184,0.35)" strokeWidth="1.2" />
          <path d="M170 66 V88 M240 66 V88 M310 66 V88" stroke="rgba(148,163,184,0.35)" strokeWidth="1.2" strokeDasharray="3 4" className="animate-dash-flow" />
          <circle cx="170" cy="66" r="2.6" fill="#22d3ee" />
          <circle cx="240" cy="66" r="2.6" fill="#4ade80" />
          <circle cx="310" cy="66" r="2.6" fill="#a78bfa" />
        </g>
      )}

      {variant === "bot" && (
        <g>
          {/* voxel bot head */}
          <Iso x={240} y={70} size={44} top="#7983f5" left="#4752c4" right="#3b439e" />
          {/* eyes on the left face */}
          <rect x="196" y="112" width="9" height="9" fill="#e8eef4" opacity="0.95" />
          <rect x="216" y="120" width="9" height="9" fill="#e8eef4" opacity="0.95" />
          <rect x="196" y="112" width="9" height="9" fill="#4ade80" opacity="0.0" />
          {/* chat dots orbiting */}
          <circle cx="150" cy="80" r="4" fill="#5865f2" opacity="0.8" />
          <circle cx="330" cy="96" r="4" fill="#4ade80" opacity="0.8" />
          <circle cx="300" cy="46" r="3" fill="#22d3ee" opacity="0.7" />
          <path d="M150 80 Q195 52 240 62" stroke="rgba(88,101,242,0.5)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" className="animate-dash-flow" />
          <path d="M330 96 Q290 130 250 128" stroke="rgba(74,222,128,0.4)" strokeWidth="1.2" fill="none" strokeDasharray="3 5" className="animate-dash-flow" />
        </g>
      )}

      {variant === "panel" && (
        <g>
          {/* control panel window */}
          <rect x="130" y="46" width="220" height="128" rx="8" fill="#0e141b" stroke="rgba(148,163,184,0.22)" />
          <rect x="130" y="46" width="220" height="22" rx="8" fill="#131b24" />
          <circle cx="145" cy="57" r="3" fill="#a78bfa" />
          <circle cx="156" cy="57" r="3" fill="#22d3ee" />
          <circle cx="167" cy="57" r="3" fill="#4ade80" />
          {/* rows */}
          {[0, 1, 2].map((r) => (
            <g key={r} transform={`translate(0 ${r * 30})`}>
              <rect x="144" y="82" width="120" height="7" rx="2" fill="rgba(148,163,184,0.22)" />
              <rect x="144" y="82" width={r === 1 ? 86 : 54} height="7" rx="2" fill={r === 2 ? "#22d3ee" : "#4ade80"} opacity="0.85" />
              <circle cx="330" cy="85.5" r="4" fill={r === 1 ? "#facc15" : "#4ade80"} />
            </g>
          ))}
          {/* orbiting voxel */}
          <Iso x={396} y={64} size={17} top="#c4b5fd" left="#6d28d9" right="#5b21b6" opacity={0.9} />
          <Iso x={84} y={130} size={17} top="#4ade80" left="#166534" right="#14532d" opacity={0.9} />
        </g>
      )}
    </svg>
  );
}
