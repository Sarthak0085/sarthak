import { AboutSection } from "@/sections/about";
import { HeroSection } from "@/sections/hero";
import { ProjectsSection } from "@/sections/projects";
import { TapeSection } from "@/sections/tape";
import { TestimonialsSection } from "@/sections/testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <AboutSection />
    </div>
  );
}
