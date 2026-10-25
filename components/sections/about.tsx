import { SectionHeader } from "@/components/ui/section-header";

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="01 / ABOUT"
          title="Full-Stack Developer"
        />
        <div className="max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            I am a full-stack developer who works mostly on the backend. At
            Dropty I build Node.js, Express and PostgreSQL services for a live
            baggage handling and logistics platform for airline passengers.
            Outside work, I build full-stack projects with React and the MERN
            stack, and I am currently learning Next.js and TypeScript.
          </p>
        </div>
      </div>
    </section>
  );
}
