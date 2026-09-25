"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { useMinecraftProfile } from "@/lib/minecraft-client";
import { copyText, cn } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusDot from "./ui/StatusDot";
import CopyButton from "./ui/CopyButton";
import DiscordMark from "./ui/DiscordMark";

function DiscordContactButton({ large = false }: { large?: boolean }) {
  const [copied, setCopied] = useState(false);
  const { discord } = portfolioConfig;

  const onClick = async () => {
    const ok = await copyText(discord);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
    // Open Discord so the visitor can paste the handle right away.
    window.open("https://discord.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={onClick}
        className={cn("btn-discord", large && "px-8 py-4 text-base")}
        aria-label={`Contact on Discord — username ${discord} (copies to clipboard and opens Discord)`}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <DiscordMark className="h-[18px] w-[18px]" />}
        {copied ? `${discord} copied!` : portfolioConfig.contact.primaryCta}
      </button>
      <p className="font-mono text-[10.5px] text-fog-faint" role="status">
        {copied
          ? "handle copied — paste it in Discord to add me"
          : "copies the handle & opens discord.com"}
      </p>
    </div>
  );
}

export default function Connect() {
  const { connect, discord, minecraftUsername } = portfolioConfig;
  const profile = useMinecraftProfile();

  return (
    <section id="connect" aria-labelledby="connect-heading" className="relative py-24 md:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="08 // PROFILES"
          title="Discord & Live Handles"
          id="connect-heading"
          description="Two ways the name shows up online. Everything below is public profile information — no private data is fetched, scraped, or displayed."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {/* ===== Discord profile card ===== */}
          <Reveal>
            <div className="panel-raised relative h-full overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blurple/25 blur-3xl"
              />
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-faint">
                  discord profile
                </p>
                <span className="chip chip-blurple">
                  <StatusDot color="blurple" /> public handle
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blurple-light to-blurple-dark shadow-glow-blurple">
                  <DiscordMark className="h-8 w-8 text-white" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-fog">{discord}</p>
                  <p className="mt-1 flex items-center gap-2 font-mono text-[11.5px] text-grass-300">
                    <StatusDot color="green" />
                    {connect.discordStatus}
                  </p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-line rounded-lg border border-line bg-ink-850/50">
                <div className="flex items-center justify-between px-4 py-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fog-faint">Username</dt>
                  <dd className="flex items-center gap-2 font-mono text-[13px] text-fog">
                    {discord}
                    <CopyButton value={discord} variant="icon" label="Discord username" />
                  </dd>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fog-faint">Status</dt>
                  <dd className="font-mono text-[13px] text-grass-300">{connect.discordStatus}</dd>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-fog-faint">Role</dt>
                  <dd className="font-mono text-[13px] text-fog">{portfolioConfig.about.discordRole}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <DiscordContactButton />
              </div>
              <p className="mt-4 text-[11.5px] leading-relaxed text-fog-faint">
                {connect.discordNote}
              </p>
            </div>
          </Reveal>

          {/* ===== Status panel ===== */}
          <Reveal delay={120}>
            <div className="panel-raised flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-faint">
                  status board
                </p>
                <span className="chip">
                  <StatusDot color="cyan" pulse={false} /> profile data
                </span>
              </div>

              <ul className="mt-6 divide-y divide-line rounded-lg border border-line bg-ink-850/50">
                {connect.statusRows.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <span className="flex items-center gap-2.5">
                      {row.source === "live" ? (
                        <StatusDot color="green" />
                      ) : (
                        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-fog-faint" />
                      )}
                      <span className="text-[13.5px] font-medium text-fog">{row.label}</span>
                    </span>
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-mono text-[12px] text-fog-muted">{row.value}</span>
                      {row.source === "live" &&
                        (profile.status === "ok" ? (
                          <span className="chip chip-green shrink-0 px-1.5 py-0 font-mono text-[8.5px]">
                            <Check className="h-2.5 w-2.5" aria-hidden /> live · mojang
                          </span>
                        ) : profile.status === "error" ? (
                          <span className="chip shrink-0 border-yellow-400/30 bg-yellow-400/10 px-1.5 py-0 font-mono text-[8.5px] text-yellow-400">
                            api offline
                          </span>
                        ) : (
                          <span className="chip shrink-0 px-1.5 py-0 font-mono text-[8.5px]">
                            checking…
                          </span>
                        ))}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-line bg-ink-850/50 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-faint">
                  resolved live
                </p>
                <p className="mt-2 font-mono text-[12.5px] text-fog">
                  {profile.status === "ok"
                    ? `${profile.data.name} · skin${profile.data.hasCape ? " + cape" : ""} loaded live`
                    : profile.status === "error"
                      ? `${minecraftUsername} · mojang api unreachable (graceful fallback)`
                      : "resolving profile via mojang api…"}
                </p>
              </div>

              <p className="mt-auto pt-5 text-[11.5px] leading-relaxed text-fog-faint">
                {connect.statusNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
