import { ArrowUp } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import Logo from "./ui/Logo";
import DiscordMark from "./ui/DiscordMark";

export default function Footer() {
  const { footer, discord } = portfolioConfig;
  const year = 2026;

  return (
    <footer className="relative border-t border-line bg-ink-900/70">
      <div className="container-x py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-xs">
            <a href="#home" className="flex items-center gap-2.5" aria-label="Arixo — back to top">
              <Logo className="h-7 w-7" />
              <span className="font-display text-[15px] font-bold tracking-[0.14em] text-fog">
                ARIXO<span className="text-grass-400">.</span>
              </span>
            </a>
            <p className="mt-3 font-mono text-[12px] text-fog-muted">{footer.brand}</p>
            <p className="mt-1 font-mono text-[11px] text-fog-faint">{footer.tagline}</p>
          </div>

          {/* links */}
          <nav aria-label="Footer">
            <p className="mono-label mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[13.5px] text-fog-muted transition-colors duration-200 hover:text-grass-300"
                  >
                    {link.label === "Discord" && (
                      <DiscordMark className="h-3.5 w-3.5 text-blurple-light" />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact quick-copy */}
          <div>
            <p className="mono-label mb-4">Direct line</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-lg border border-blurple/40 bg-blurple/10 px-4 py-2.5 font-mono text-[12.5px] text-blurple-light transition-all duration-300 hover:-translate-y-0.5 hover:border-blurple/70 hover:shadow-glow-blurple"
            >
              <DiscordMark className="h-4 w-4" />
              {discord}
            </a>
            <p className="mt-3 font-mono text-[10.5px] text-fog-faint">
              paid work only · requirements first
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-mono text-[11.5px] text-fog-faint">
              © {year} Arixo. All rights reserved.
            </p>
            <p className="mt-1 font-mono text-[10.5px] text-fog-faint/80">
              {footer.builtWith}
            </p>
          </div>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-md border border-line px-3.5 py-2 font-mono text-[11px] text-fog-muted transition-colors hover:border-grass-400/40 hover:text-grass-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
