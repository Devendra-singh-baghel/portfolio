import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { CaseStudyPreview } from "@/components/sections/case-study-preview";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Experience />
      <CaseStudyPreview />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
