import { portfolioConfig } from "@/lib/config";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SkillCategoryCard from "./SkillCategoryCard";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="02 // SKILLS"
          title="The Toolkit"
          id="skills-heading"
          description="No invented percentages — just the technologies I actually work with, grouped by the problems they solve."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioConfig.skillCategories.map((cat, i) => (
            <Reveal
              key={cat.id}
              delay={i * 70}
              className={i === 0 ? "md:col-span-2 xl:col-span-1" : undefined}
            >
              <SkillCategoryCard category={cat} />
            </Reveal>
          ))}

          {/* closing note card — keeps the grid balanced */}
          <Reveal delay={350}>
            <div className="panel flex h-full flex-col justify-between p-6">
              <div>
                <p className="mono-label">note</p>
                <p className="mt-3 text-[14px] leading-relaxed text-fog-muted">
                  Tools are means, not badges. The real skill is a server that stays
                  up, a panel that stays clean, and a bot that doesn&apos;t need
                  babysitting.
                </p>
              </div>
              <a
                href="#services"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] text-grass-300 transition-colors hover:text-grass-400"
              >
                see what I build with these →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
