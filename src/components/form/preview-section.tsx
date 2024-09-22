import { AboutSection } from "@/sections/about"
import { HeroSection } from "@/sections/hero"
import { ProjectsSection } from "@/sections/projects"
import { TapeSection } from "@/sections/tape"
import { TestimonialsSection } from "@/sections/testimonials";
import { Portfolio } from "./schema";

interface PreviewSectionProps {
    data: Portfolio | null,
    handleSubmit: () => void;
}

export const PreviewSection = ({ data, handleSubmit }: PreviewSectionProps) => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <TapeSection />
            <TestimonialsSection />
            <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded'>
                Submit
            </button>
        </>
    )
}