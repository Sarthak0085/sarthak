"use client";

import { useState } from "react"
import { HeroSectionForm } from "./hero-form";
import { AboutSectionForm } from "./about-form";
import { EducationManager } from "./education-manager";
import { Portfolio } from "./schema";
import { ProjectsManager } from "./projects-manager ";

interface PortfolioFormProps {
    portfolio?: Portfolio | null;
}

export const PortfolioForm = ({ portfolio }: PortfolioFormProps) => {
    const [active, setActive] = useState(0);

    return (
        <>
            {active === 0 && <HeroSectionForm data={portfolio} setActive={setActive} />}
            {active === 1 && <AboutSectionForm data={portfolio} setActive={setActive} />}
            {active === 2 && <EducationManager data={portfolio} setActive={setActive} />}
            {active === 3 && <ProjectsManager data={portfolio} setActive={setActive} />}
            {/* {active === 4 && <PreviewSection data={data} handleSubmit={handleSubmit} isPending={isPending} setActive={setActive} />} */}
        </>
    )
}