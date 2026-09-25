import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Consistent section header: mono kicker, display title, muted lede. */
export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "flex flex-col items-center text-center",
        className
      )}
    >
      <p className="mono-label flex items-center gap-2">
        <span aria-hidden className="inline-block h-2 w-2 bg-grass-400" />
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-bold tracking-tight text-fog sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
      >
        {title}
      </h2>
      <div className={cn("title-rule", align === "center" && "mx-auto")} aria-hidden />
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[15px] leading-relaxed text-fog-muted md:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
