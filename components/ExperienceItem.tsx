"use client";

import { getIcon } from "./ui/Icon";
import TiltCard from "./ui/TiltCard";

type Item = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  tags: readonly string[];
};

export default function ExperienceItem({ item }: { item: Item }) {
  const Icon = getIcon(item.icon);
  return (
    <TiltCard intensity={3.5}>
      <div className="panel group flex flex-col gap-4 p-5 transition-all duration-400 ease-smooth hover:border-grass-400/30 hover:shadow-card sm:flex-row sm:items-start sm:p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-700/70 text-grass-400 transition-all duration-300 group-hover:border-grass-400/40 group-hover:bg-grass-400/10">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[17px] font-semibold text-fog">{item.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-fog-muted">{item.summary}</p>
          <ul className="mt-3.5 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <li key={t}>
                <span className="chip">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TiltCard>
  );
}
