import { portfolioConfig } from "@/lib/config";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import ExperienceItem from "./ExperienceItem";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="05 // EXPERIENCE"
          title="Hands-On Territory"
          id="experience-heading"
          description="Where I actually spend my time — four domains, deep rather than wide. No invented employers or dates: the work speaks through what gets shipped."
        />

        <ol className="relative space-y-4 border-l border-line pl-6 md:pl-8">
          {portfolioConfig.experience.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 90} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-7 flex h-2.5 w-2.5 md:-left-[39px]"
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-grass-400/50 animate-pulse-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-grass-400" />
              </span>
              <ExperienceItem item={item} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
