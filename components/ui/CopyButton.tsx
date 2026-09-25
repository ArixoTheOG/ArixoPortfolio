"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn, copyText } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
  /** chip = compact monospace pill, button = standard control */
  variant?: "chip" | "icon" | "button";
  announcePrefix?: string;
};

/** Accessible copy-to-clipboard control with visible + screen-reader feedback. */
export default function CopyButton({
  value,
  label,
  className,
  variant = "chip",
  announcePrefix = "Copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = async () => {
    const ok = await copyText(value);
    if (ok) {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    }
  };

  const ariaLabel = copied
    ? `${announcePrefix}: ${value}`
    : `Copy ${label ?? value} to clipboard`;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-ink-700/60 text-fog-faint transition-colors hover:border-grass-400/40 hover:text-grass-300",
          className
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-grass-400" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
        <span className="sr-only" role="status">
          {copied ? `${announcePrefix}: ${value}` : ""}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        variant === "chip"
          ? "chip group"
          : "btn-ghost px-4 py-2 text-sm",
        copied && "chip-green",
        className
      )}
    >
      {copied ? (
        <Check className="h-3 w-3 text-grass-400" aria-hidden />
      ) : (
        <Copy className="h-3 w-3 opacity-70 group-hover:opacity-100" aria-hidden />
      )}
      <span className={cn("font-mono", copied && "text-grass-300")}>
        {copied ? "Copied!" : (label ?? value)}
      </span>
      <span className="sr-only" role="status">
        {copied ? `${announcePrefix}: ${value}` : ""}
      </span>
    </button>
  );
}
