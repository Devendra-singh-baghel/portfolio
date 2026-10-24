import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CaseStudyPreview } from "@/components/sections/case-study-preview";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Hero />
      <About />
      <CaseStudyPreview />
      <Projects />
      <Skills />
      <Experience />
    </main>
  );
}
