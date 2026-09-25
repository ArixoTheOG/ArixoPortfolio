"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import { copyText, cn } from "@/lib/utils";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import CopyButton from "./ui/CopyButton";
import DiscordMark from "./ui/DiscordMark";
import StatusDot from "./ui/StatusDot";

export default function Contact() {
  const { contact, discord, minecraftUsername, availability, paidNotice } = portfolioConfig;
  const [copied, setCopied] = useState(false);

  const onContact = async () => {
    const ok = await copyText(discord);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
    window.open("https://discord.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-28 md:py-36">
      {/* glow behind the CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] w-full max-w-3xl -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,0.14) 0%, rgba(34,211,238,0.05) 45%, transparent 70%)",
        }}
      />

      <div className="container-x">
        <SectionHeading
          kicker="09 // CONTACT"
          title={contact.title}
          id="contact-heading"
          description={contact.description}
          align="center"
        />

        <Reveal delay={100}>
          <div className="panel-raised mx-auto max-w-2xl overflow-hidden p-7 text-center sm:p-10">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-grass-400/25 bg-grass-400/[0.07] px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-grass-300">
              <StatusDot color="green" />
              {availability.toUpperCase()}
            </p>

            <h3 className="mt-6 font-display text-2xl font-bold text-fog sm:text-3xl">
              Discord is the fastest way in.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-fog-muted">
              Send your requirements — server type, community size, panel needs, or
              project idea — and you&apos;ll get a scoped, paid proposal back.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={onContact}
                className={cn("btn-discord px-9 py-4 text-[15px]")}
                aria-label={`Contact on Discord — username ${discord} (copies to clipboard and opens Discord)`}
              >
                {copied ? <Check className="h-5 w-5" aria-hidden /> : <DiscordMark className="h-5 w-5" />}
                {copied ? `${discord} copied to clipboard!` : contact.primaryCta}
              </button>
              <p className="font-mono text-[11px] text-fog-faint" role="status">
                {copied ? "paste the handle in Discord to start a conversation" : "copies your handle & opens discord.com"}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 border-t border-line pt-7">
              <span className="chip">
                <span className="text-fog-faint">Discord:</span>
                <span className="text-blurple-light">{discord}</span>
                <CopyButton value={discord} variant="icon" className="h-5 w-5 border-0 bg-transparent" />
              </span>
              <span className="chip">
                <span className="text-fog-faint">Minecraft:</span>
                <span className="text-grass-300">{minecraftUsername}</span>
                <CopyButton value={minecraftUsername} variant="icon" className="h-5 w-5 border-0 bg-transparent" />
              </span>
            </div>

            <p className="mx-auto mt-7 max-w-md text-[12.5px] leading-relaxed text-fog-faint">
              {paidNotice}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
