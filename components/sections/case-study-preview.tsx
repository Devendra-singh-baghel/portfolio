import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/reveal";

export function CaseStudyPreview() {
  return (
    <section
      id="case-study"
      aria-label="Case Study"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader label="03 / CASE STUDY" title="Featured Case Study" />
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex flex-col gap-6 p-6 sm:p-8 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Tag>Production</Tag>
                <Tag>Google Gemini</Tag>
                <Tag>Node.js</Tag>
              </div>

              <h3 className="font-serif text-2xl font-normal leading-tight text-foreground sm:text-3xl">
                AI document extraction for airline forms
              </h3>
            </div>

            <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Airline staff received pre-filled passenger forms with 30 to 40
              fields and had to type each customer&apos;s details into the app by
              hand. Built an automated extraction pipeline with Gemini Flash-Lite
              and dynamic schema injection, achieving 90%+ field accuracy for every
              airline partner and approx. 80% reduction in manual form-filling time
              (team estimate).
            </p>

            <div className="flex items-center pt-2">
              <TextLink
                href="/case-studies/ai-document-extraction"
                className="inline-flex items-center gap-1.5 text-base font-medium text-foreground hover:text-primary"
              >
                Read case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </TextLink>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
