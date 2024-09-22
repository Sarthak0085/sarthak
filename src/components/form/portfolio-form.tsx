"use client";

import { useState } from "react"
import { HeroSectionForm } from "./hero-form";
import { AboutSectionForm } from "./about-form";
import { EducationManager } from "./education-manager";
import { z } from "zod";
import { PortfolioSchema } from "./schema";
import { ProjectsManager } from "./projects-manager ";
import { PreviewSection } from "./preview-section";

interface PortfolioFormProps {
    portfolio: z.infer<typeof PortfolioSchema> | null;
}

export const PortfolioForm = ({ portfolio }: PortfolioFormProps) => {
    const [active, setActive] = useState(0);
    const [data, setData] = useState<z.infer<typeof PortfolioSchema>>({
        hero: {
            id: portfolio?.hero.id ?? undefined,
            title: portfolio?.hero?.title ?? "",
            description: portfolio?.hero?.description ?? "",
        },
        about: {
            id: portfolio?.about?.id ?? undefined,
            read: {
                id: portfolio?.about?.read?.id ?? undefined,
                title: portfolio?.about?.read?.title ?? "",
                description: portfolio?.about?.read?.description ?? "",
                image: portfolio?.about?.read?.image ?? "",
            },
            hobby: {
                id: portfolio?.about?.hobby?.id ?? undefined,
                title: portfolio?.about?.hobby?.title ?? "",
                description: portfolio?.about?.hobby?.description ?? "",
                hobbies: portfolio?.about?.hobby?.hobbies?.map((hobby) => ({
                    id: hobby?.id ?? undefined,
                    name: hobby.name ?? "",
                    hobbyId: hobby?.hobbyId ?? hobby?.id,
                }))
            },
            language: {
                id: portfolio?.about?.language?.id ?? undefined,
                title: portfolio?.about?.language?.title ?? "",
                description: portfolio?.about?.language?.description ?? "",
                languages: portfolio?.about?.language?.languages?.map((language) => ({
                    id: language?.id ?? undefined,
                    name: language.name ?? "",
                    svg: language?.svg ?? "",
                    languageId: language?.languageId ?? language?.id,
                }))
            },
        },
        educations: portfolio?.educations?.map((education) => ({
            id: education?.id ?? undefined,
            degree: education?.degree ?? "",
            field: education?.field ?? "",
            institution: education?.institution ?? "",
            startDate: education?.startDate ?? new Date(),
            endDate: education?.endDate ?? new Date(),
            position: education?.position ?? 0,
            description: education?.description ?? "",
            percentage: education?.percentage ?? 0,
            cgpa: education?.cgpa ?? 0,
            portfolioId: education?.portfolioId ?? undefined,
            liveLink: education?.liveLink ?? undefined,
        })) ?? [],
        projects: portfolio?.projects?.map((project) => ({
            id: project?.id ?? undefined,
            title: project?.title ?? "",
            description: project?.description ?? "",
            startDate: project?.startDate ?? new Date(),
            endDate: project?.endDate ?? undefined,
            image: project?.image ?? "",
            githubLink: project?.githubLink ?? "",
            position: project?.position ?? 0,
            liveLink: project?.liveLink ?? "",
            companyName: project?.companyName ?? undefined,
            portfolioId: project?.portfolioId ?? undefined,
        })) ?? [],
    });

    const handleSubmit = () => {
        console.log("Dtaa", data);
    }

    return (
        <>
            {active === 0 && <HeroSectionForm data={data} setData={setData} setActive={setActive} />}
            {active === 1 && <AboutSectionForm data={data} setData={setData} setActive={setActive} />}
            {active === 2 && <EducationManager data={data} setData={setData} setActive={setActive} />}
            {active === 3 && <ProjectsManager data={data} setData={setData} setActive={setActive} />}
            {active === 4 && <PreviewSection data={data} handleSubmit={handleSubmit} />}
        </>
    )
}