import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/reveal";
import { SkillsMarquee } from "@/components/skills-marquee";

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

        <Reveal delay={0.1}>
          <SkillsMarquee />
        </Reveal>
      </div>
    </section>
  );
}
