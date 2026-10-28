import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader label="05 / PROJECTS" title="Projects" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <Reveal
              key={project.id}
              className="h-full"
              delay={Math.min(idx * 0.08, 0.24)}
            >
              <Card className="flex h-full flex-col overflow-hidden transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40">
                {/* Project Screenshot */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-card">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>

                {/* Project Details */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:gap-3.5">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-serif text-lg font-normal leading-snug text-foreground sm:text-xl">
                        {project.title}{" "}
                        <span className="text-muted-foreground">
                          · {project.subtitle}
                        </span>
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {project.period}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                      {project.note && (
                        <span className="font-mono text-xs text-muted-foreground">
                          ({project.note})
                        </span>
                      )}
                    </div>

                    <ul className="flex flex-col gap-2 pl-4 text-sm leading-relaxed text-muted-foreground list-disc list-outside marker:text-primary">
                      {project.description.map((bullet, idx) => (
                        <li key={idx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* External Links */}
                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border/50 pt-3.5">
                    {project.links.map((link) => (
                      <TextLink
                        key={link.url}
                        href={link.url}
                        aria-label={link.ariaLabel}
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </TextLink>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
