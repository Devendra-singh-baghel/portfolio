import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh w-full flex-col items-center justify-between overflow-hidden bg-background pt-20 pb-8 sm:pb-12 md:justify-end md:pt-24 scroll-mt-24"
    >
      {/* Portrait Container */}
      <div className="relative flex w-full justify-center pointer-events-none md:absolute md:inset-x-0 md:bottom-0">
        <div
          className="relative h-[56svh] sm:h-[60svh] md:h-[86svh] lg:h-[88svh] aspect-[1200/1291] w-auto max-w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          <Image
            src="/images/profile.webp"
            alt="Portrait of Devendra Singh Baghel"
            width={1200}
            height={1291}
            priority
            sizes="(max-width: 768px) 90vw, 60vw"
            className="size-full object-contain object-bottom"
            style={{
              filter:
                "grayscale(1) contrast(1.1) drop-shadow(10px 0 24px rgba(244, 242, 236, 0.25))",
            }}
          />

          {/* Semi-transparent black-to-background overlay gradient, stronger at bottom & edges */}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_100%)] opacity-75"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Text & CTAs Container */}
      <div className="relative z-10 -mt-16 sm:-mt-20 md:mt-0 flex max-w-5xl flex-col items-center px-4 text-center pb-2 sm:pb-4 md:pb-8 lg:pb-12">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            FULL-STACK DEVELOPER
          </p>

          <h1 className="font-serif text-[clamp(2.5rem,11.5vw,9rem)] font-normal leading-[0.95] tracking-tight text-foreground whitespace-nowrap">
            Devendra Singh
            <span className="sr-only"> Baghel</span>
          </h1>

          <p className="max-w-[32rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build reliable APIs and practical web applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 sm:gap-6 sm:pt-8">
          <Button asChild className="h-11 rounded-full px-6 text-sm font-medium">
            <a href="#projects" className="inline-flex items-center gap-1.5">
              <span>Explore Projects</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>

          <a
            href="/Devendra-Singh-Baghel-Resume.pdf"
            download="Devendra-Singh-Baghel-Resume.pdf"
            className="inline-flex items-center rounded-sm font-sans text-sm font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
