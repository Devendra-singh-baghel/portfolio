import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/public/images/profile2.png";

const PORTRAIT_DIM = 0.25;
const OVERLAP_RATIO = 0.38;

export function Hero() {
  const ratio = portrait.width / portrait.height;
  const invRatio = portrait.height / portrait.width;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background pt-16 sm:pt-20 pb-4 sm:pb-6 scroll-mt-24"
      style={
        {
          "--portrait-w": `min(100vw, calc((100svh - 7rem) * ${ratio}))`,
          "--portrait-h": `calc(var(--portrait-w) * ${invRatio})`,
          "--text-overlap": `calc(var(--portrait-h) * -${OVERLAP_RATIO})`,
        } as React.CSSProperties
      }
    >
      {/* Centered content stack; my-auto centers stack in leftover space on tall viewports */}
      <div className="my-auto flex w-full flex-col items-center">
        {/*
          Portrait box: sized by the CSS variables.
          The dim overlay and the bottom fade are SIBLINGS of the shadow wrapper,
          never inside it, so the drop-shadow is built only from the cutout's alpha.
        */}
        <div
          className="pointer-events-none relative mx-auto"
          style={{ width: "var(--portrait-w)", height: "var(--portrait-h)" }}
        >
          {/* Shadow wrapper: ONLY the masked image lives here */}
          <div
            className="size-full"
          >
            <div
              className="size-full"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 40%, black 50%, transparent 80%)",
                maskImage:
                  "radial-gradient(ellipse at 50% 40%, black 50%, transparent 80%)",
              }}
            >
              <Image
                src={portrait}
                alt="Portrait of Devendra Singh Baghel"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="size-full object-contain object-bottom"
                style={{
                  filter: "grayscale(1) contrast(1.1) brightness(0.88)",
                }}
              />
            </div>
          </div>

          {/* Tunable dimming overlay (outside the shadow wrapper) */}
          <div
            className="pointer-events-none absolute inset-0 bg-background"
            style={{ opacity: PORTRAIT_DIM }}
            aria-hidden="true"
          />

          {/* Gentle bottom fade so the lower torso merges into the background behind the text */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/60 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/*
          Text & CTAs Container:
          - In-flow element pulled up over the portrait's chest via negative margin
          - Negative margin is a constant fraction of portrait height (OVERLAP_RATIO),
            ensuring the chin-to-text gap remains proportional on all screen sizes
        */}
        <div
          className="relative z-10 flex max-w-5xl flex-col items-center px-4 sm:px-6 text-center"
          style={{ marginTop: "var(--text-overlap)" }}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              FULL-STACK DEVELOPER
            </p>

            <h1 className="font-serif text-[clamp(2.125rem,8.5vw,7.5rem)] font-normal leading-[0.95] tracking-tight text-foreground whitespace-nowrap">
              Devendra Singh
              <span className="sr-only"> Baghel</span>
            </h1>

            <p className="max-w-[32rem] text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              I build reliable APIs and practical web applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-6 sm:pt-8">
            <Button
              asChild
              className="h-11 rounded-full px-4 sm:px-6 text-sm font-medium"
            >
              <a href="#projects" className="inline-flex items-center gap-1.5">
                <span>Explore Projects</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full px-4 sm:px-6 text-sm font-medium"
            >
              <a
                href="/Devendra-Singh-Baghel-Resume.pdf"
                download="Devendra-Singh-Baghel-Resume.pdf"
                className="inline-flex items-center gap-2"
              >
                <Download className="size-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
