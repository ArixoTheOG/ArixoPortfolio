import { Info } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="04 // PROJECTS"
          title="Selected Work"
          id="projects-heading"
          description="Infrastructure and products I've built and operate — hosting stacks, panels, bots, and the systems that keep them alive."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {portfolioConfig.projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[13px] leading-relaxed text-fog-faint">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-fog-faint" aria-hidden />
            <span>{portfolioConfig.projectsNote}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
