"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getPortfolio = async (userId?: string) => {
    try {
        console.log("userId", userId);
        const session = await auth();
        if (!session && !userId) {
            throw new Error("UnAuthorized. Please login to access this");
        }
        if (userId && session && userId !== session?.user?.id) {
            throw new Error("Forbidden. You are not allowed to do this.")
        }
        console.log("first pount");
        const portfolio = await db.portfolio.findFirst({
            where: {
                userId: userId ?? session?.user?.id
            },
            // include: {
            //     hero: true,
            //     about: {
            //         include: {
            //             read: true,
            //             Hobby: {
            //                 include: {
            //                     hobbies: true
            //                 }
            //             },
            //             Language: {
            //                 include: {
            //                     languages: true
            //                 }
            //             }
            //         }
            //     },
            //     educations: true,
            //     projects: true,
            // }
        });
        console.log("portfolio", portfolio)


        const hero = await db.hero.findFirst({
            where: {
                portfolioId: portfolio?.id
            }
        });

        const educations = await db.education?.findMany({
            where: {
                portfolioId: portfolio?.id,
            }
        });

        const projects = await db.project?.findMany({
            where: {
                portfolioId: portfolio?.id,
            }
        });

        const about = await db.aboutSection?.findFirst({
            where: {
                portfolioId: portfolio?.id,
            },
            select: {
                read: true,
                language: {
                    select: {
                        title: true,
                        description: true,
                        languages: true,
                    }
                },
                hobby: {
                    select: {
                        title: true,
                        description: true,
                        hobbies: true
                    }
                }
            }
        });

        return { data: { hero, portfolio, educations, projects, about } };
    } catch (error) {
        return {
            error: error
        };
    }
}