import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader label="03 / SKILLS" title="Skills & Technologies" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <Card key={group.name} className="flex flex-col gap-4 p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
