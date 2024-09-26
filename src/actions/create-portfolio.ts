/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { AboutSectionSchema, EducationSchema, Heroschema, Portfolio, ProjectSchema } from "@/components/form/schema";
import { db } from "@/lib/db";
import { deleteImageFromCloudinary, uploadFilesToCloudinary } from "@/lib/helpers";
import { z } from "zod";

function extractPublicIdFromSvg(svgUrl) {
    const urlPattern = /\/v\d+\/(.*?)\.svg$/; // Pattern to match the public ID in the URL
    const match = svgUrl.match(urlPattern);
    return match ? match[1] : null; // Return the public ID if matched, otherwise null
}

export const createOrUpdateHero = async (data: z.infer<typeof Heroschema>) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        console.log("first checkpoint");
        const { id, title, description, portfolioId } = data;
        const isPortfolioExists = await db.portfolio.findFirst({
            where: {
                id: portfolioId!,
                userId: session?.user?.id
            }
        });

        if (isPortfolioExists && portfolioId) {
            const heroExists = await db.hero.findFirst({
                where: {
                    id: id,
                    portfolioId: portfolioId
                }
            });

            if (heroExists) {
                await db.hero.update({
                    where: {
                        id: id,
                        portfolioId: portfolioId,
                    },
                    data: {
                        title: title,
                        description: description,
                        portfolioId: portfolioId
                    }
                });

                return {
                    success: "Hero Section Updated!!"
                }
            }
            // await db.hero.create({
            //     data: {
            //         title: title,
            //         description: description,
            //         portfolioId: portfolioId,
            //     }
            // });

            // return {
            //     success: "Hero Section Created!!"
            // }
        } else {
            const portfolio = await db.portfolio.create({
                data: {
                    userId: session?.user?.id,
                }
            });
            await db.hero.create({
                data: {
                    title: title,
                    description: description,
                    portfolioId: portfolio?.id
                }
            });
            return {
                success: "Hero Section Created!!"
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}

export const createOrUpdateAboutSection = async (data: z.infer<typeof AboutSectionSchema>) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        console.log("first checkpoint");
        const { id, read, hobby, language } = data;
        const isPortfolioExists = await db.portfolio.findUnique({
            where: {
                userId: session?.user?.id
            }
        });

        if (!isPortfolioExists) {
            throw new Error("Complete previous step first.")
        }

        const isAboutSectionExists = await db.aboutSection.findUnique({
            where: {
                portfolioId: isPortfolioExists?.id,
                id
            }
        });

        if (isAboutSectionExists) {
            const isReadExists = await db.read.findUnique({
                where: {
                    id: read?.id,
                }
            });

            if (isReadExists) {
                if (isReadExists?.image !== read?.image) {
                    await deleteImageFromCloudinary(extractPublicIdFromSvg(read?.image));
                    const readResult = await uploadFilesToCloudinary(read?.image as string, "read");

                    if (!readResult || !readResult[0]?.url) {
                        throw new Error("Error while uploading image");
                    }

                    await db.read.update({
                        where: {
                            id: read?.id
                        },
                        data: {
                            title: read?.title,
                            description: read?.description as string,
                            image: readResult[0]?.url
                        }
                    });
                } else {
                    await db.read.update({
                        where: {
                            id: read?.id
                        },
                        data: {
                            title: read?.title,
                            description: read?.description as string,
                            image: read?.image
                        }
                    });
                }
            }
            await db.hobby.update({
                where: {
                    id: hobby?.id,
                },
                data: {
                    title: hobby?.title,
                    description: hobby?.description,
                    hobbies: {
                        create: hobby?.hobbies?.filter(h => !h.id).map(h => ({ name: h.name })),
                        update: hobby?.hobbies?.filter(h => h.id).map(h => ({
                            where: { id: h.id },
                            data: { name: h.name }
                        })),
                    }
                }
            });

            const isLangaugeExists = await db.language.findUnique({
                where: {
                    id: language?.id,
                },
                include: {
                    languages: true,
                }
            });

            if (isLangaugeExists) {
                const existingSvgs = isLangaugeExists.languages.map(lan => lan.svg);

                await Promise.all(existingSvgs.map(async (svg) => {
                    const publicId = extractPublicIdFromSvg(svg); // Function to extract the public ID from the SVG URL
                    await deleteImageFromCloudinary(publicId); // Function to delete the SVG from Cloudinary
                }));

                const svgPaths = language?.languages?.map(lang => lang?.svg);

                const svgUrls = await uploadFilesToCloudinary(svgPaths, "language");

                await db.languageDetail.deleteMany({
                    where: {
                        languageId: language?.id
                    }
                });

                await db.language.update({
                    where: { id: language.id },
                    data: {
                        title: language?.title,
                        description: language?.description as string,
                        languages: {
                            create: language?.languages?.map((lan, index) => ({
                                name: lan?.name,
                                svg: svgUrls[index]?.url as string,
                            }))
                        }
                    },
                });

            }

            return {
                success: "About Section updated successfully."
            }

        } else {
            const readResult = await uploadFilesToCloudinary(read?.image as string, "read");

            if (!readResult || !readResult[0]?.url) {
                throw new Error("Error while uploading image");
            }

            const readSection = await db.read.create({
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

            const svgPaths = language?.languages?.map(lang => lang?.svg);
            console.log("svgsPath", svgPaths, language?.languages);
            const svgUrls = await uploadFilesToCloudinary(svgPaths, "language");
            console.log("svgsUrls", svgUrls);

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
                    portfolioId: isPortfolioExists?.id,
                    readId: readSection?.id,
                    hobbyId: hobbies?.id,
                    languageId: languages?.id,
                }
            });

            return {
                success: "About Section created successfully."
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}

export const createOrUpdateEducationSection = async (data: z.infer<typeof EducationSchema>) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        const { id, institution, degree, field, description, startDate, endDate, liveLink, portfolioId, cgpa, percentage, position } = data;

        const isPortfolioExists = await db.portfolio.findFirst({
            where: {
                id: portfolioId,
                userId: session?.user?.id
            }
        });

        if (!isPortfolioExists) {
            throw new Error("Complete previous step first.")
        }

        const isEducationExist = await db.education.findFirst({
            where: {
                portfolioId: isPortfolioExists?.id ?? portfolioId,
                id: id,
            }
        });

        if (isEducationExist) {
            await db.education.update({
                where: {
                    id: isEducationExist?.id
                },
                data: {
                    portfolioId: isPortfolioExists?.id,
                    degree,
                    field,
                    institution,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate!) ?? undefined,
                    description,
                    position,
                    percentage: Number(percentage),
                    cgpa: Number(cgpa),
                    liveLink
                }
            });

            return {
                success: "Education updated successfully."
            }
        } else {
            await db.education.create({
                data: {
                    portfolioId: isPortfolioExists?.id,
                    degree,
                    field,
                    institution,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate!) ?? undefined,
                    description,
                    position,
                    percentage: Number(percentage) ?? undefined,
                    cgpa: Number(cgpa),
                    liveLink
                }
            });

            return {
                success: "Education created successfully."
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}

export const createOrUpdateProject = async (data: z.infer<typeof ProjectSchema>) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        const { id, title, description, startDate, endDate, liveLink, portfolioId, image, companyName, githubLink, position } = data;

        const isPortfolioExists = await db.portfolio.findFirst({
            where: {
                id: portfolioId,
                userId: session?.user?.id
            }
        });

        if (!isPortfolioExists) {
            throw new Error("Complete previous step first.")
        }

        const isProjectExist = await db.project.findFirst({
            where: {
                portfolioId: isPortfolioExists?.id ?? portfolioId,
                id: id,
            }
        });

        if (isProjectExist) {
            let result;
            if (isProjectExist?.image !== image) {
                await deleteImageFromCloudinary(extractPublicIdFromSvg(isProjectExist?.image));
                result = await uploadFilesToCloudinary(image, "projects");

                if (!result || !result[0]?.url) {
                    throw new Error("There is some problem with uploading the file")
                }
            }
            await db.project.update({
                where: {
                    id: isProjectExist?.id
                },
                data: {
                    portfolioId: isPortfolioExists?.id,
                    title,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate!) ?? undefined,
                    description,
                    position,
                    image: result[0]?.url ?? isProjectExist?.image,
                    companyName,
                    githubLink,
                    liveLink
                }
            });

            return {
                success: "Project updated successfully."
            }
        } else {
            const result = await uploadFilesToCloudinary(image, "projects");
            if (!result || !result[0]?.url) {
                throw new Error("There is some problem with uploading the file")
            }
            await db.project.create({
                data: {
                    portfolioId: isPortfolioExists?.id,
                    title,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate!) ?? undefined,
                    description,
                    position,
                    image: result[0]?.url,
                    companyName,
                    githubLink,
                    liveLink
                }
            });

            return {
                success: "Project created successfully."
            }
        }

    } catch (error: any) {
        throw new Error(error);
    }
}

export const createPortfolio = async (data: Portfolio) => {
    try {
        const session = await auth();
        if (!session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this.");
        }
        console.log("first checkpoint");
        const { hero, about: { read, hobby, language }, projects, educations, id } = data;
        console.log("second checkpoint");

        const isPortfolioExists = await db.portfolio.findFirst({
            where: {
                id: id,
                userId: session?.user?.id
            }
        });
        console.log("third chekpoint")

        if (isPortfolioExists) {
            throw new Error("Portfolio Already Exists.");
        }

        const portfolio = await db.portfolio.create({
            data: {
                userId: session?.user?.id,
            }
        });
        console.log("fourth checkpoint")

        await db.hero.create({
            data: {
                title: hero?.title,
                description: hero?.description,
                portfolioId: portfolio?.id
            }
        });
        console.log("5th");

        const readResult = await uploadFilesToCloudinary(read?.image as string, "read");

        console.log("6th");

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
        console.log("7th")

        const hobbies = await db.hobby.create({
            data: {
                title: hobby?.title,
                description: hobby?.description,
                hobbies: {
                    create: hobby?.hobbies?.map((hobby) => ({ name: hobby?.name }))
                }
            }
        });
        console.log("8th");

        const svgPaths = language?.languages?.map(lang => lang?.svg);
        console.log("svgsPath", svgPaths, language?.languages);
        const svgUrls = await uploadFilesToCloudinary(svgPaths, "language");
        console.log("svgsUrls", svgUrls);

        console.log("9th")
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
        console.log("10th")

        await db.aboutSection.create({
            data: {
                portfolioId: portfolio?.id,
                readId: read?.id as string,
                hobbyId: hobbies?.id,
                languageId: languages?.id,
            }
        });
        console.log("11th")

        const educationsData = educations.map((edu) => ({
            institution: edu?.institution,
            degree: edu?.degree,
            field: edu?.field,
            startDate: edu?.startDate,
            endDate: edu?.endDate ?? "Current",
            description: edu?.description,
            percentage: Number(edu?.percentage),
            cgpa: Number(edu?.cgpa),
            liveLink: edu?.liveLink,
            position: edu?.position,
            portfolioId: portfolio?.id,
        }))

        await db.education.createMany({
            data: educationsData
        });
        console.log("12th")

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
        console.log("13th");
        return {
            success: "Created Successfully"
        }
    } catch (error: any) {
        throw new Error(error);
    }
}