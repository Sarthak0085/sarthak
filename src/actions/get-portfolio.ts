"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getPortfolio = async (userId: string) => {
    try {
        const session = await auth();
        if (!session || !session?.user || !session?.user?.id) {
            throw new Error("UnAuthorized. Please login to access this");
        }
        if (userId !== session?.user?.id) {
            throw new Error("Forbidden. You are not allowed to do this.")
        }
        const portfolio = await db.portfolio.findUnique({
            where: {
                userId: session?.user?.id
            },
            include: {
                hero: true,
                about: {
                    include: {
                        read: true,
                        Hobby: {
                            include: {
                                hobbies: true
                            }
                        },
                        Language: {
                            include: {
                                languages: true
                            }
                        }
                    }
                },
                educations: true,
                projects: true,
            }
        });

        return { portfolio };
    } catch (error) {
        return {
            error: error
        };
    }
}