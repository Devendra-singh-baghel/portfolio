import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="02 / EXPERIENCE"
          title="Experience"
        />

        <div className="flex flex-col gap-6">
          {experiences.map((exp) => (
            <Card
              key={`${exp.company}-${exp.role}`}
              className="flex flex-col gap-4 p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="font-serif text-xl font-normal text-foreground sm:text-2xl">
                  {exp.role}{" "}
                  <span className="text-muted-foreground">
                    · {exp.company}
                  </span>
                </h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {exp.period}
                </span>
              </div>
              <ul className="flex flex-col gap-2.5 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base list-disc list-outside marker:text-primary">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="pl-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
