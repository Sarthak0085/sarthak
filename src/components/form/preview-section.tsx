import { AboutSection } from "@/sections/about"
import { HeroSection } from "@/sections/hero"
import { ProjectsSection } from "@/sections/projects"
import { TapeSection } from "@/sections/tape"
import { TestimonialsSection } from "@/sections/testimonials";
import { Portfolio } from "./schema";

interface PreviewSectionProps {
    data: Portfolio | null,
    handleSubmit: () => void;
    isPending: boolean;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const PreviewSection = ({ data, isPending, handleSubmit, setActive }: PreviewSectionProps) => {
    return (
        <div className="mb-16">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <TapeSection />
            <TestimonialsSection />
            <div className='flex items-center justify-between px-12'>
                <button disabled={isPending} onClick={() => setActive(prev => prev - 1)} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    <span className="mr-2">&#9664;</span>
                    Prev
                </button>
                <button disabled={isPending} onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Submit
                </button>
            </div>
        </div>
    )
}