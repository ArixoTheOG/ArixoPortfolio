"use client";

import { ArrowUpRight } from "lucide-react";
import TiltCard from "./ui/TiltCard";
import ProjectVisual from "./ProjectVisual";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: readonly string[];
  visual: "cloud" | "node" | "bot" | "panel";
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard intensity={4.5} className="h-full">
      <article className="panel group flex h-full flex-col overflow-hidden transition-all duration-400 ease-smooth hover:border-grass-400/35 hover:shadow-card-hover">
        {/* visual header */}
        <div className="relative h-44 overflow-hidden border-b border-line sm:h-48">
          <ProjectVisual
            variant={project.visual}
            className="transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 chip chip-green backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-fog">
              {project.title}
            </h3>
            <a
              href="#contact"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-fog-faint transition-all duration-300 hover:border-grass-400/50 hover:text-grass-300"
              aria-label={`Ask about ${project.title} on Discord`}
              title="Ask about this project on Discord"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-fog-muted">
            {project.description}
          </p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.tech.map((t) => (
              <li key={t}>
                <span className="rounded border border-line bg-ink-850/70 px-2 py-0.5 font-mono text-[10.5px] text-fog-faint transition-colors duration-300 group-hover:text-fog-muted">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  );
}
