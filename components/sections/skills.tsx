import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader label="04 / SKILLS" title="Skills & Technologies" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group, idx) => (
            <Reveal
              key={group.name}
              className="h-full"
              delay={Math.min(idx * 0.08, 0.24)}
            >
              <Card className="flex h-full flex-col gap-4 p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
