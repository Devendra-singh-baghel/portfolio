import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/public/images/profile2.png";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-svh w-full flex-col items-center justify-end overflow-hidden bg-background pt-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12 scroll-mt-24"
    >
      {/* Portrait Container */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <div
          className="relative h-[76svh] md:h-[calc(100svh-7rem)] w-auto max-w-none"
          style={{
            aspectRatio: `${portrait.width} / ${portrait.height}`,
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 38%, black 50%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse at 50% 38%, black 50%, transparent 80%)",
          }}
        >
          <Image
            src={portrait}
            alt="Portrait of Devendra Singh Baghel"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="size-full object-contain object-bottom"
            style={{
              filter:
                "grayscale(1) contrast(1.1) brightness(1.08) drop-shadow(10px 0 24px rgba(244, 242, 236, 0.2))",
            }}
          />

          {/* Gentle bottom fade so the portrait smoothly merges into the background behind text */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/60 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Text & CTAs Container */}
      <div className="relative z-10 flex max-w-5xl flex-col items-center px-4 text-center">
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

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <Button asChild className="h-11 rounded-full px-6 text-sm font-medium">
            <a href="#projects" className="inline-flex items-center gap-1.5">
              <span>Explore Projects</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full px-6 text-sm font-medium"
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
    </section>
  );
}
