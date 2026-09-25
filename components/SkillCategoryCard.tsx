"use client";

import { getIcon } from "./ui/Icon";
import TiltCard from "./ui/TiltCard";

type Category = {
  id: string;
  index: string;
  title: string;
  icon: string;
  blurb: string;
  skills: readonly string[];
};

/** One skill category: icon header + interactive chips for each skill. */
export default function SkillCategoryCard({ category }: { category: Category }) {
  const Icon = getIcon(category.icon);
  return (
    <TiltCard intensity={4} className="h-full">
      <article className="panel group flex h-full flex-col p-6 transition-all duration-400 ease-smooth hover:border-grass-400/30 hover:shadow-card-hover">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-700/70 text-grass-400 transition-colors duration-300 group-hover:border-grass-400/40 group-hover:bg-grass-400/10">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-[17px] font-semibold text-fog">
                {category.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fog-faint">
                {category.index} · {category.skills.length} skills
              </p>
            </div>
          </div>
        </header>

        <p className="mt-3.5 text-[13px] leading-relaxed text-fog-muted">{category.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {category.skills.map((skill) => (
            <li key={skill}>
              <span className="inline-block cursor-default rounded-md border border-line bg-ink-700/50 px-2.5 py-1 font-mono text-[11px] text-fog-muted transition-all duration-200 hover:-translate-y-px hover:border-grass-400/45 hover:bg-grass-400/[0.08] hover:text-grass-300">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}
