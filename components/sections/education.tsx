import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { education } from "@/data/experience";

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education and Training"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label="06 / EDUCATION"
            title="Education & Training"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {education.map((edu, idx) => (
            <Reveal
              key={idx}
              className="h-full"
              delay={Math.min(idx * 0.08, 0.24)}
            >
              <Card className="flex h-full flex-col justify-between gap-3 p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-medium text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                </div>
                <div className="border-t border-border/50 pt-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {edu.grade ? edu.grade : edu.period}
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
