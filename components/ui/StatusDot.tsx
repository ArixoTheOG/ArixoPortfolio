import { cn } from "@/lib/utils";

type StatusDotProps = {
  color?: "green" | "cyan" | "yellow" | "blurple" | "gray";
  pulse?: boolean;
  className?: string;
};

const colorMap = {
  green: "bg-grass-400",
  cyan: "bg-cyber-400",
  yellow: "bg-yellow-400",
  blurple: "bg-blurple-light",
  gray: "bg-fog-faint",
} as const;

const ringMap = {
  green: "bg-grass-400/60",
  cyan: "bg-cyber-400/60",
  yellow: "bg-yellow-400/60",
  blurple: "bg-blurple-light/60",
  gray: "bg-fog-faint/60",
} as const;

/** Tiny LED-style status indicator with an optional soft pulse ring. */
export default function StatusDot({ color = "green", pulse = true, className }: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex h-2 w-2 shrink-0", className)} aria-hidden>
      {pulse && (
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-pulse-ring", ringMap[color])} />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full animate-pulse-dot", colorMap[color])} />
    </span>
  );
}
