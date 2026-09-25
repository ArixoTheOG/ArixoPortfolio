import { cn } from "@/lib/utils";

/**
 * Brand mark: a small isometric "grass block" cube drawn in SVG —
 * the Minecraft nod that stays subtle at every size.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Arixo logo — pixel cube"
    >
      {/* top face — grass */}
      <path d="M16 3 L28 9.5 L16 16 L4 9.5 Z" fill="#4ade80" />
      <path d="M16 3 L28 9.5 L16 16 L4 9.5 Z" fill="url(#pxTop)" opacity="0.35" />
      {/* left face */}
      <path d="M4 9.5 L16 16 L16 29 L4 22.5 Z" fill="#166534" />
      {/* right face */}
      <path d="M28 9.5 L16 16 L16 29 L28 22.5 Z" fill="#14532d" />
      {/* pixel notches on the grass top */}
      <rect x="9" y="9" width="2.4" height="1.6" fill="#22c55e" opacity="0.9" />
      <rect x="15" y="7" width="2.4" height="1.6" fill="#86efac" opacity="0.8" />
      <rect x="20" y="10.4" width="2.4" height="1.6" fill="#22c55e" opacity="0.9" />
      {/* dirt specks */}
      <rect x="7.6" y="16.5" width="1.8" height="1.8" fill="#1a2e1a" opacity="0.55" />
      <rect x="10.8" y="20.5" width="1.8" height="1.8" fill="#1a2e1a" opacity="0.45" />
      <rect x="20.5" y="18" width="1.8" height="1.8" fill="#0f2417" opacity="0.5" />
      <defs>
        <linearGradient id="pxTop" x1="4" y1="3" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bbf7d0" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
