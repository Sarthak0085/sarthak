"use server";

import { auth } from "@/auth";
import { Portfolio } from "@/components/form/schema";
import { db } from "@/lib/db";
import { uploadFilesToCloudinary } from "@/lib/helpers";

export const createPortfolio = async (data: Portfolio) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        const { hero, about: { read, hobby, language }, projects, educations, id } = data;

        const isPortfolioExists = await db.portfolio.findUnique({
            where: {
                id
            }
        });

        if (isPortfolioExists) {
            throw new Error("Portfolio Already Exists.");
        }

        const portfolio = await db.portfolio.create({
            data: {
                userId: session?.user?.id,
            }
        });

        await db.hero.create({
            data: {
                title: hero?.title,
                description: hero?.description,
                portfolioId: portfolio?.id
            }
        });

        const readResult = await uploadFilesToCloudinary(read?.image as string, "read");

        if (!readResult || !readResult[0]?.url) {
            throw new Error("Error while uploading image");
        }

        await db.read.create({
            data: {
                title: read?.title,
                description: read?.description as string,
                image: readResult[0]?.url
            }
        });

        const hobbies = await db.hobby.create({
            data: {
                title: hobby?.title,
                description: hobby?.description,
                hobbies: {
                    create: hobby?.hobbies?.map((hobby) => ({ name: hobby?.name }))
                }
            }
        });

        const svgPaths = language?.languages?.map(lang => lang?.svg) as string[];
        const svgUrls = await uploadFilesToCloudinary(svgPaths, "language");

        const languages = await db.language.create({
            data: {
                title: language?.title,
                description: language?.description as string,
                languages: {
                    create: language?.languages?.map((lan, index) => ({
                        name: lan?.name,
                        svg: svgUrls[index]?.url as string,
                    }))
                }
            }
        });

        await db.aboutSection.create({
            data: {
                portfolioId: portfolio?.id,
                readId: read?.id as string,
                hobbyId: hobbies?.id,
                languageId: languages?.id,
            }
        });

        const educationsData = educations.map((edu) => ({
            institution: edu?.institution,
            degree: edu?.degree,
            field: edu?.field,
            startDate: edu?.startDate,
            endDate: edu?.endDate ?? "Current",
            description: edu?.description,
            percentage: edu?.percentage,
            cgpa: edu?.cgpa,
            liveLink: edu?.liveLink,
            position: edu?.position,
            portfolioId: portfolio?.id,
        }))

        await db.education.createMany({
            data: educationsData
        });

        const images = projects?.map(proj => proj?.image) as string[];
        const projectImages = await uploadFilesToCloudinary(images, "project");

        const projectsData = projects.map((project, index) => ({
            companyName: project?.companyName,
            startDate: project?.startDate,
            endDate: project?.endDate ?? "Current",
            title: project?.title,
            description: project?.description,
            githubLink: project?.githubLink,
            image: projectImages[index]?.url as string,
            liveLink: project?.liveLink,
            position: project?.position,
            portfolioId: portfolio?.id,
        }));

        await db.project.createMany({ data: projectsData });

        return {
            success: "Created Successfully",
        }
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}