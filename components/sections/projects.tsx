import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeader label="02 / SELECTED WORK" title="Selected Work" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col overflow-hidden"
            >
              {/* Project Screenshot */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-card">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1200px) 560px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Project Details */}
              <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="font-serif text-xl font-normal text-foreground sm:text-2xl">
                      {project.title}{" "}
                      <span className="text-muted-foreground">
                        · {project.subtitle}
                      </span>
                    </h3>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {project.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                    {project.note && (
                      <span className="font-mono text-xs text-muted-foreground">
                        ({project.note})
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2.5 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base list-disc list-outside marker:text-primary">
                    {project.description.map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External Links */}
                <div className="flex flex-wrap items-center gap-4 border-t border-border/50 pt-4">
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
          ))}
        </div>
      </div>
    </section>
  );
}
