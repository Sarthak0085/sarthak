import { getPortfolio } from "@/actions/get-portfolio";
import { CircleFollowingCursor } from "@/components/circle-cursor";
import { Header } from "@/components/header";
import { StarIndicator } from "@/components/star-indicator";
import { AboutSection } from "@/sections/about";
import { ContactSection } from "@/sections/contact";
import { EducationsSection } from "@/sections/educations";
import { Footer } from "@/sections/footer";
import { HeroSection } from "@/sections/hero";
import { ProjectsSection } from "@/sections/projects";
import { TapeSection } from "@/sections/tape";
import { TestimonialsSection } from "@/sections/testimonials";

export default async function Home() {
  const portfolioData = await getPortfolio(process.env.USER_ID);
  console.log("data", portfolioData?.data);
  return (
    <div>
      <StarIndicator />
      <CircleFollowingCursor />
      <Header />
      <HeroSection data={portfolioData?.data?.hero} />
      <AboutSection data={portfolioData?.data?.about as any} />
      <ProjectsSection />
      <EducationsSection data={portfolioData?.data?.educations} />
      <TapeSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
