"use client";

import { Header } from "@/components/header";
import { StarIndicator } from "@/components/star-indicator";
import { AboutSection } from "@/sections/about";
import { ContactSection } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { HeroSection } from "@/sections/hero";
import { ProjectsSection } from "@/sections/projects";
import { TapeSection } from "@/sections/tape";
import { TestimonialsSection } from "@/sections/testimonials";

export default function Home() {
  return (
    <div>
      <StarIndicator />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TapeSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
