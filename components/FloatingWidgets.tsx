import { Bot, Cpu, Server } from "lucide-react";

/**
 * Ambient "developer workstation" widgets floating around the hero
 * character. Decorative only (aria-hidden): they read the stage's
 * --px/--py pointer variables for parallax and float gently via CSS.
 * Hidden below `lg` so mobile stays clean.
 */

function WidgetShell({
  className,
  depth,
  delay,
  children,
  wide = false,
}: {
  className: string;
  depth: number;
  delay: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute hidden lg:block ${className}`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.6}px), 0)`,
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="animate-floaty rounded-lg border border-line bg-ink-850/85 shadow-card backdrop-blur-md"
        style={{ animationDelay: delay, animationDuration: wide ? "8s" : "6.5s" }}
      >
        {children}
      </div>
    </div>
  );
}

function WindowDots() {
  return (
    <span className="flex gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-grass-400/80" />
    </span>
  );
}

export default function FloatingWidgets() {
  return (
    <>
      {/* 1 — mini terminal (top-left) */}
      <WidgetShell className="-left-4 top-14 xl:-left-14" depth={16} delay="0s" wide>
        <div className="w-[218px] p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <WindowDots />
            <span className="font-mono text-[9px] tracking-[0.18em] text-fog-faint">
              bash — vps
            </span>
          </div>
          <p className="font-mono text-[10.5px] leading-relaxed text-fog-muted">
            <span className="text-grass-400">$</span> systemctl is-active wings
          </p>
          <p className="font-mono text-[10.5px] leading-relaxed text-grass-300">
            ● active
          </p>
          <p className="mt-1 font-mono text-[10.5px] leading-relaxed text-fog-muted">
            <span className="text-grass-400">$</span> tail -f /var/log/wings.log
            <span className="terminal-caret ml-0.5 animate-blink" />
          </p>
        </div>
      </WidgetShell>

      {/* 2 — minecraft server status (top-right) */}
      <WidgetShell className="-right-2 top-8 xl:-right-10" depth={22} delay="-2.2s">
        <div className="flex w-[188px] items-center gap-2.5 p-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-grass-400/30 bg-grass-400/10">
            <Server className="h-4 w-4 text-grass-300" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-mono text-[11px] text-fog">
              mc-proxy-01
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[9.5px] text-fog-faint">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-grass-400" />
              paper · running
            </span>
          </span>
        </div>
      </WidgetShell>

      {/* 3 — code snippet (bottom-right) */}
      <WidgetShell className="-right-4 bottom-16 xl:-right-12" depth={18} delay="-4s" wide>
        <div className="w-[224px] p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.18em] text-fog-faint">
              bot.js
            </span>
            <span className="chip chip-blurple px-1.5 py-0 font-mono text-[8.5px]">
              <Bot className="h-2.5 w-2.5" /> bot
            </span>
          </div>
          <pre className="overflow-hidden font-mono text-[9.5px] leading-[1.55]">
            <code>
              <span className="text-arcane-300">client</span>
              <span className="text-fog-muted">.on(</span>
              <span className="text-grass-300">&quot;ready&quot;</span>
              <span className="text-fog-muted">, () =&gt; {"{"}</span>
              {"\n"}
              <span className="text-fog-muted">  log(</span>
              <span className="text-cyber-300">`bot online ✓`</span>
              <span className="text-fog-muted">);</span>
              {"\n"}
              <span className="text-fog-muted">{"}"}</span>
              <span className="text-fog-muted">);</span>
            </code>
          </pre>
        </div>
      </WidgetShell>

      {/* 4 — pterodactyl mini panel (bottom-left) */}
      <WidgetShell className="-left-6 bottom-24 xl:-left-16" depth={12} delay="-1.4s" wide>
        <div className="w-[196px] p-2.5">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-cyber-400/90" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fog-muted">
              pterodactyl
            </span>
          </div>
          <ul className="space-y-1 font-mono text-[9.5px] text-fog-faint">
            <li className="flex items-center justify-between rounded border border-line/60 bg-ink-800/70 px-1.5 py-1">
              panel <span className="text-grass-300">● ok</span>
            </li>
            <li className="flex items-center justify-between rounded border border-line/60 bg-ink-800/70 px-1.5 py-1">
              wings <span className="text-grass-300">● ok</span>
            </li>
            <li className="flex items-center justify-between rounded border border-line/60 bg-ink-800/70 px-1.5 py-1">
              node-01 <span className="text-cyber-300">● 2/4 gb</span>
            </li>
          </ul>
        </div>
      </WidgetShell>

      {/* 5 — node/cpu chip (mid-left, small) */}
      <WidgetShell className="-left-2 top-[52%] xl:-left-20" depth={9} delay="-3s">
        <div className="flex items-center gap-2 px-2.5 py-2">
          <Cpu className="h-3.5 w-3.5 text-cyber-300" />
          <span className="font-mono text-[9.5px] text-fog-muted">
            ubuntu 24.04 · nginx · ufw
          </span>
        </div>
      </WidgetShell>
    </>
  );
}
