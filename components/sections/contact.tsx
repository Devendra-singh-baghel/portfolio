import { ArrowUpRight, Download } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="06 / CONTACT"
          title="Let's build something reliable."
        />

        <Card className="flex flex-col gap-8 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild className="h-10 px-5 text-sm sm:h-11 sm:px-6">
              <a href="mailto:devendrabaghel0220@gmail.com">
                devendrabaghel0220@gmail.com
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-10 px-5 text-sm sm:h-11 sm:px-6"
            >
              <a
                href="/Devendra-Singh-Baghel-Resume.pdf"
                download="Devendra-Singh-Baghel-Resume.pdf"
              >
                <Download className="size-4" aria-hidden="true" />
                Download Resume (PDF)
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-6 border-t border-border pt-6">
            <TextLink href="https://github.com/Devendra-singh-baghel">
              GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TextLink>
            <TextLink href="https://www.linkedin.com/in/devendra-singh-baghel-267023351">
              LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>
      </div>
    </section>
  );
}
