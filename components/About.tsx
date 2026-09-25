"use client";

import { Gamepad2, MessageSquare, ShieldCheck, Wrench } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { useMinecraftProfile } from "@/lib/minecraft-client";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";
import CopyButton from "./ui/CopyButton";
import StatusDot from "./ui/StatusDot";
import SkinHead from "./SkinHead";

export default function About() {
  const { about, minecraftUsername, discord, availability } = portfolioConfig;
  const profile = useMinecraftProfile();
  const data = profile.status === "ok" ? profile.data : null;

  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 md:py-32">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ===== left — narrative ===== */}
        <div>
          <SectionHeading kicker="01 // ABOUT" title="About Me" id="about-heading" />

          <Reveal delay={80}>
            <p className="text-[17px] font-medium leading-relaxed text-fog">
              {about.intro}
            </p>
          </Reveal>

          {about.body.map((para, i) => (
            <Reveal key={i} delay={140 + i * 70}>
              <p className="mt-4 text-[15px] leading-[1.75] text-fog-muted">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <p className="mono-label mt-9">Work across</p>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {about.focusAreas.map((area) => (
                <li key={area}>
                  <span className="chip">{area}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Gamepad2, label: "Minecraft", sub: "servers & systems" },
                { icon: ShieldCheck, label: "SysAdmin", sub: "linux & vps" },
                { icon: MessageSquare, label: "Discord", sub: "bots & communities" },
                { icon: Wrench, label: "DevOps", sub: "panels & hosting" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-line bg-ink-800/50 p-3.5 transition-colors duration-300 hover:border-grass-400/30"
                >
                  <Icon className="h-4 w-4 text-grass-400" aria-hidden />
                  <p className="mt-2 text-[13px] font-semibold text-fog">{label}</p>
                  <p className="font-mono text-[10px] text-fog-faint">{sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ===== right — interactive player card ===== */}
        <Reveal delay={160} className="lg:sticky lg:top-28">
          <TiltCard intensity={5}>
            <div className="panel-raised overflow-hidden">
              {/* card header strip */}
              <div className="flex items-center justify-between border-b border-line bg-ink-850/80 px-5 py-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-fog-faint">
                  player profile
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-grass-300">
                  <StatusDot color="green" />
                  {profile.status === "ok" ? "verified · mojang api" : "java edition"}
                </span>
              </div>

              {/* identity */}
              <div className="flex items-center gap-4 px-5 pb-5 pt-5">
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-2 rounded-xl bg-grass-400/15 blur-lg"
                  />
                  <SkinHead
                    size={72}
                    className="relative"
                    alt="Minecraft head of ArshuPremium rendered from the live skin"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl font-bold text-fog">
                    {data?.name ?? minecraftUsername}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="chip chip-green">
                      <StatusDot color="green" pulse={false} /> Player
                    </span>
                    {data && <span className="chip chip-purple">{data.model} model</span>}
                    {data?.hasCape && <span className="chip chip-cyan">cape</span>}
                  </div>
                </div>
              </div>

              {/* rows */}
              <dl className="divide-y divide-line border-y border-line">
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-faint">
                    Minecraft
                  </dt>
                  <dd className="flex items-center gap-2 font-mono text-[13px] text-fog">
                    {minecraftUsername}
                    <CopyButton value={minecraftUsername} variant="icon" />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-faint">
                    Discord
                  </dt>
                  <dd className="flex items-center gap-2 font-mono text-[13px] text-blurple-light">
                    {discord}
                    <CopyButton value={discord} variant="icon" label="Discord username" />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-faint">
                    Role
                  </dt>
                  <dd className="font-mono text-[13px] text-fog">{about.discordRole}</dd>
                </div>
              </dl>

              {/* availability footer */}
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <p className="flex items-center gap-2 text-[13px] font-medium text-grass-300">
                  <StatusDot color="green" />
                  {availability}
                </p>
                <a href="#contact" className="font-mono text-[11px] text-fog-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-grass-300">
                  commission →
                </a>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
