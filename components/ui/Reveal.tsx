"use client";

import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { createElement, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
  id?: string;
};

/** Fade-up-on-scroll wrapper. Content is fully readable without animation. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.12 });
  return createElement(
    as,
    {
      ref,
      id,
      className: cn("reveal", inView && "reveal-in", className),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
