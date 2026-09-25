"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { getIcon } from "./ui/Icon";
import TiltCard from "./ui/TiltCard";

type Service = {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  features: readonly string[];
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);
  return (
    <TiltCard intensity={5} className="h-full">
      <article className="panel group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-400 ease-smooth hover:border-grass-400/35 hover:shadow-card-hover">
        {/* corner number */}
        <span
          aria-hidden
          className="absolute right-4 top-3 font-mono text-[11px] tracking-[0.2em] text-fog-faint/70 transition-colors duration-300 group-hover:text-grass-400/70"
        >
          {service.number}
        </span>

        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-ink-700/70 text-grass-400 transition-all duration-300 group-hover:border-grass-400/40 group-hover:bg-grass-400/10 group-hover:shadow-glow-green-sm">
          <Icon className="h-5 w-5" aria-hidden />
        </span>

        <h3 className="mt-4 pr-12 font-display text-lg font-semibold text-fog">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-fog-muted">
          {service.description}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 font-mono text-[11.5px] text-fog-muted"
            >
              <Check className="h-3 w-3 shrink-0 text-grass-400" aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="mt-auto inline-flex items-center gap-1 pt-6 font-mono text-[11.5px] tracking-wide text-grass-300 opacity-80 transition-all duration-300 group-hover:opacity-100"
          aria-label={`Commission ${service.title} — contact on Discord`}
        >
          commission this
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </article>
    </TiltCard>
  );
}
