"use client";

import { useScroll } from "@/lib/hooks";

/** Thin grass-green reading-progress bar pinned to the top of the page. */
export default function ScrollProgress() {
  const { progress } = useScroll();
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-grass-500 via-grass-400 to-cyber-400 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
      />
    </div>
  );
}
