import { Download, Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { BrandIcon } from "@/components/brand-icon";
import { LinkedInIcon } from "@/components/linkedin-icon";

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label="07 / CONTACT"
            title="Let's build something reliable."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild className="h-10 w-full px-4 text-sm sm:h-11">
                <a href="mailto:devendrabaghel0220@gmail.com?subject=Hello%20Devendra">
                  <Mail className="size-4" aria-hidden="true" />
                  Send an email
                </a>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="h-10 w-full px-4 text-sm sm:h-11"
              >
                <a
                  href="https://github.com/Devendra-singh-baghel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <BrandIcon icon={siGithub} className="size-4" />
                  GitHub
                </a>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="h-10 w-full px-4 text-sm sm:h-11"
              >
                <a
                  href="https://www.linkedin.com/in/devendra-singh-baghel-267023351"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </a>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="h-10 w-full px-4 text-sm sm:h-11"
              >
                <a
                  href="/Devendra-Singh-Baghel-Resume.pdf"
                  download="Devendra-Singh-Baghel-Resume.pdf"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
