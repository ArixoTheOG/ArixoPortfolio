"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioConfig } from "@/lib/config";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

type Line = { id: number; kind: "cmd" | "out" | "err" | "info"; text: string };

let lineId = 0;
const nextId = () => ++lineId;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * "Behind the Terminal" — an interactive, purely visual shell.
 * Commands are answered from portfolioConfig.terminal; nothing is executed
 * on the visitor's device and no network/system access happens.
 */
export default function TerminalSection() {
  const { terminal } = portfolioConfig;
  const reduced = useReducedMotion();
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 });

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(true); // boot demo running
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelled = useRef(false);
  const booted = useRef(false);

  const push = useCallback((kind: Line["kind"], text: string) => {
    setLines((prev) => [...prev.slice(-160), { id: nextId(), kind, text }]);
  }, []);

  // keep output scrolled to the bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  useEffect(() => () => { cancelled.current = true; }, []);

  /** run one command's output (multi-line aware) */
  const runCommand = useCallback(
    async (raw: string, typed: boolean) => {
      const cmd = raw.trim();
      if (!cmd) return;
      push("cmd", `${terminal.prompt} $ ${cmd}`);

      const key = cmd.toLowerCase();
      const speed = reduced ? 0 : typed ? 12 : 0;

      const emitOut = async (text: string) => {
        const parts = text.split("\n");
        for (const part of parts) {
          if (cancelled.current) return;
          if (speed > 0) {
            // stream the line character by character
            const id = nextId();
            setLines((prev) => [...prev.slice(-160), { id, kind: "out", text: "" }]);
            for (let i = 1; i <= part.length; i++) {
              if (cancelled.current) return;
              const slice = part.slice(0, i);
              setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text: slice } : l)));
              await sleep(speed);
            }
          } else {
            push("out", part);
          }
          await sleep(speed > 0 ? 60 : 20);
        }
      };

      if (key === "clear") {
        setLines([]);
        return;
      }
      if (key === "help") {
        for (const l of terminal.helpLines) {
          if (cancelled.current) return;
          push("info", l);
          if (speed > 0) await sleep(28);
        }
        return;
      }
      if (key in terminal.commands) {
        await emitOut(terminal.commands[key]);
      } else {
        push("err", `command not found: ${key} — try \`help\``);
      }
    },
    [push, reduced, terminal]
  );

  /** boot demo — plays once when the terminal scrolls into view */
  useEffect(() => {
    if (!inView || booted.current) return;
    booted.current = true;
    (async () => {
      push("info", "portfolio-shell v1.0 — visual demo · nothing executes on your device");
      await sleep(reduced ? 0 : 500);
      for (const cmd of terminal.bootSequence) {
        if (cancelled.current) return;
        // type the command itself
        if (reduced) {
          await runCommand(cmd, false);
        } else {
          const id = nextId();
          setLines((prev) => [...prev, { id, kind: "cmd", text: `${terminal.prompt} $ ` }]);
          for (let i = 1; i <= cmd.length; i++) {
            if (cancelled.current) return;
            const slice = cmd.slice(0, i);
            setLines((prev) =>
              prev.map((l) => (l.id === id ? { ...l, text: `${terminal.prompt} $ ${slice}` } : l))
            );
            await sleep(58);
          }
          await sleep(240);
          setBusy(true);
          // output (skip the echoed cmd line — already shown)
          const key = cmd.toLowerCase();
          const value = key in terminal.commands ? terminal.commands[key] : "";
          for (const part of value.split("\n")) {
            if (cancelled.current) return;
            const oid = nextId();
            setLines((prev) => [...prev, { id: oid, kind: "out", text: "" }]);
            for (let i = 1; i <= part.length; i++) {
              if (cancelled.current) return;
              const slice = part.slice(0, i);
              setLines((prev) => prev.map((l) => (l.id === oid ? { ...l, text: slice } : l)));
              await sleep(11);
            }
            await sleep(120);
          }
        }
      }
      if (cancelled.current) return;
      await sleep(reduced ? 0 : 350);
      push("info", "Your turn — type `help` and explore. ↑ ↓ walks through history.");
      setBusy(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const cmd = input.trim();
    if (!cmd) return;
    setInput("");
    setHistory((h) => [cmd, ...h].slice(0, 24));
    setHistoryIdx(-1);
    setBusy(true);
    await runCommand(cmd, false);
    setBusy(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = historyIdx - 1;
      setHistoryIdx(idx);
      setInput(idx >= 0 ? history[idx] : "");
    }
  };

  const focusInput = () => {
    if (!busy) inputRef.current?.focus();
  };

  return (
    <section id="terminal" aria-labelledby="terminal-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="06 // TERMINAL"
          title={terminal.title}
          id="terminal-heading"
          description={terminal.description}
        />

        <Reveal>
          <div ref={viewRef} className="mx-auto max-w-3xl">
            <div className="panel-raised overflow-hidden shadow-card">
              {/* window chrome */}
              <div className="flex items-center gap-3 border-b border-line bg-ink-850/90 px-4 py-3">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-grass-400/90" />
                </span>
                <p className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-fog-faint">
                  {terminal.prompt} — portfolio-shell
                </p>
                <span className="chip chip-cyan hidden sm:inline-flex">interactive demo</span>
              </div>

              {/* output */}
              <div
                ref={scrollRef}
                onClick={focusInput}
                className="terminal-scroll h-[340px] cursor-text overflow-y-auto bg-ink-900/60 p-4 font-mono text-[12.5px] leading-[1.75] sm:h-[380px] sm:text-[13px]"
                aria-label="Terminal output"
              >
                <div aria-live="polite" aria-relevant="additions text">
                  {lines.map((line) => (
                    <p
                      key={line.id}
                      className={cn(
                        "whitespace-pre-wrap break-words",
                        line.kind === "cmd" && "text-fog",
                        line.kind === "out" && "text-grass-300/90",
                        line.kind === "err" && "text-red-400/90",
                        line.kind === "info" && "text-fog-faint"
                      )}
                    >
                      {line.text}
                    </p>
                  ))}
                  {busy && lines.length > 0 && (
                    <p className="text-cyber-300/70">
                      <span className="terminal-caret animate-blink" />
                    </p>
                  )}
                </div>
              </div>

              {/* input line */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 border-t border-line bg-ink-850/80 px-4 py-3"
              >
                <span className="font-mono text-[12.5px] text-grass-400 sm:text-[13px]" aria-hidden>
                  $
                </span>
                <label htmlFor="terminal-input" className="sr-only">
                  Type a portfolio command, for example whoami, skills, status, or help
                </label>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={busy}
                  placeholder={busy ? "booting demo…" : "whoami"}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  className="w-full bg-transparent font-mono text-[12.5px] text-fog caret-grass-400 outline-none placeholder:text-fog-faint/60 disabled:opacity-50 sm:text-[13px]"
                />
                <span
                  aria-hidden
                  className={cn(
                    "terminal-caret",
                    busy ? "opacity-0" : "animate-blink"
                  )}
                />
              </form>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] text-fog-faint">
              visual portfolio element · runs entirely in your browser · no real system commands
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
