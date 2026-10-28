import { Download, Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { TextLink } from "@/components/ui/text-link";
import { BrandIcon } from "@/components/brand-icon";
import { LinkedInIcon } from "@/components/linkedin-icon";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-mono text-xs">
          © 2026 Devendra Singh Baghel
        </p>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center gap-6 text-xs sm:text-sm"
        >
          <TextLink
            href="mailto:devendrabaghel0220@gmail.com"
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            Email
          </TextLink>
          <TextLink
            href="https://github.com/Devendra-singh-baghel"
            className="text-muted-foreground hover:text-foreground"
          >
            <BrandIcon icon={siGithub} className="size-3.5" />
            GitHub
          </TextLink>
          <TextLink
            href="https://www.linkedin.com/in/devendra-singh-baghel-267023351"
            className="text-muted-foreground hover:text-foreground"
          >
            <LinkedInIcon className="size-3.5" />
            LinkedIn
          </TextLink>
          <a
            href="/Devendra-Singh-Baghel-Resume.pdf"
            download="Devendra-Singh-Baghel-Resume.pdf"
            className="inline-flex items-center gap-1 rounded-sm text-muted-foreground underline underline-offset-4 decoration-border transition-colors hover:text-foreground hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
}
