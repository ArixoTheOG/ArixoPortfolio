import { Check } from "lucide-react";
import { portfolioConfig } from "@/lib/config";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="03 // SERVICES"
          title="What I Can Build"
          id="services-heading"
          description="Commission-based work for servers, communities, and hosting brands. Every service below is a paid engagement — scoped on Discord, delivered production-ready."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioConfig.services.map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[12px] text-fog-faint">
            <Check className="h-3.5 w-3.5 text-grass-400" aria-hidden />
            {portfolioConfig.paidNotice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
