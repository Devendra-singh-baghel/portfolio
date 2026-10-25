import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex max-w-4xl flex-col gap-6">
            <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-normal leading-[1.05] tracking-tight text-foreground">
              I build reliable APIs and practical web applications.
            </h1>
            <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Working with Node.js, Express.js, PostgreSQL and React to turn
              requirements into working software.
            </p>
          </div>

          <div className="relative size-32 shrink-0 overflow-hidden rounded-2xl border border-border bg-card sm:size-40">
            <Image
              src="/images/profile.jpg"
              alt="Black and white portrait of Devendra Singh Baghel"
              width={160}
              height={160}
              priority
              className="size-full object-cover grayscale contrast-110"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button asChild className="h-10 px-5 text-sm sm:h-11 sm:px-6">
            <a href="#projects">Explore Projects</a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="h-10 px-5 text-sm sm:h-11 sm:px-6"
          >
            <a href="#contact">Contact Me</a>
          </Button>

          <div className="flex items-center gap-4 pl-0 sm:pl-4">
            <TextLink href="https://github.com/Devendra-singh-baghel">
              GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </TextLink>
            <TextLink href="https://www.linkedin.com/in/devendra-singh-baghel-267023351">
              LinkedIn
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
