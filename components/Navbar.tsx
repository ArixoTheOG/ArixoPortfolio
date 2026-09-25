"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useScroll, useScrollSpy } from "@/lib/hooks";
import StatusDot from "./ui/StatusDot";
import Logo from "./ui/Logo";

const sectionIds = ["home", "about", "skills", "services", "projects", "experience", "contact"];

export default function Navbar() {
  const { scrolled } = useScroll(24);
  const active = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
        scrolled
          ? "border-b border-line bg-ink/80 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between gap-4 md:h-[72px]"
      >
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 rounded-md py-1"
          aria-label="Arixo — home"
        >
          <Logo className="h-7 w-7 transition-transform duration-500 ease-smooth group-hover:rotate-[-6deg]" />
          <span className="font-display text-[15px] font-bold tracking-[0.14em] text-fog">
            ARIXO
            <span className="text-grass-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {portfolioConfig.nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors duration-200",
                    isActive ? "text-grass-300" : "text-fog-muted hover:text-fog"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-grass-400/80 transition-transform duration-300 ease-smooth",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* Availability pill */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-grass-400/25 bg-grass-400/[0.07] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-grass-300 transition-colors duration-300 hover:border-grass-400/50 hover:bg-grass-400/[0.12] sm:inline-flex"
            aria-label={portfolioConfig.availability}
          >
            <StatusDot color="green" />
            {scrolled ? "Available for Work" : portfolioConfig.availability}
          </a>
          <a
            href="#contact"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-grass-400/25 bg-grass-400/[0.07] sm:hidden"
            aria-label={portfolioConfig.availability}
          >
            <StatusDot color="green" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-ink-800/70 text-fog transition-colors hover:border-grass-400/40 hover:text-grass-300 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-smooth lg:hidden",
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {portfolioConfig.nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
                  active === item.href.slice(1)
                    ? "bg-grass-400/10 text-grass-300"
                    : "text-fog-muted hover:bg-ink-700/60 hover:text-fog"
                )}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
                <span className="font-mono text-[11px] text-fog-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
              tabIndex={open ? 0 : -1}
            >
              Hire Me — Discord
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
