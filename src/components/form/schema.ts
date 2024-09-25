import { z } from 'zod';

export const Heroschema = z.object({
    id: z.string().min(24, { message: "Id must be 24 characters long" }).optional(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    portfolioId: z.string().optional(),
});


export const ReadSchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(), // Assuming ObjectId
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    image: z.string().optional(),
});

export const HobbyDetailSchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(),
    name: z.string().min(1, "Name is required"),
    hobbyId: z.string().length(24, "Hobby ID must be 24 characters long").optional(),
});

export const HobbySchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    hobbies: z.array(HobbyDetailSchema).optional(),
});

export const LanguageDetailSchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(),
    name: z.string().min(1, "Name is required"),
    svg: z.string(),
    languageId: z.string().optional()
});

export const LanguageSchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    languages: z.array(LanguageDetailSchema),
});

export const AboutSectionSchema = z.object({
    id: z.string().length(24, "ID must be 24 characters long").optional(),
    portfolioId: z.string().optional(),
    read: ReadSchema,
    hobby: HobbySchema,
    language: LanguageSchema,
});

export const ProjectSchema = z.object({
    id: z.string().optional(),
    companyName: z.string().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    position: z.number().optional(),
    image: z.string().min(1, "Image URL is required"),
    githubLink: z.string().url().optional(),
    liveLink: z.string().url().optional(),
    portfolioId: z.string().optional(),
}).refine((data) => {
    if (data.endDate && data.endDate < data.startDate) {
        return false;
    }
    return true;
}, {
    message: "End date must be after start date",
    path: ["endDate"],
});

export const EducationSchema = z.object({
    id: z.string().optional(),
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    field: z.string().min(1, "Field is required"),
    startDate: z.string(),
    endDate: z.string().optional(),
    position: z.number().optional(),
    description: z.string().optional(),
    percentage: z.string().optional(),
    cgpa: z.string().max(10, { message: "CGPA must not greater than 10" }).optional(),
    liveLink: z.string().url().optional(),
    portfolioId: z.string().optional(),
}).refine((data) => {
    if (data.endDate && Number(data.endDate) < Number(data.startDate)) {
        return false;
    }
    return true;
}, {
    message: "End date must be after start date",
    path: ["endDate"],
});

export const PortfolioSchema = z.object({
    id: z.string().optional(),
    hero: Heroschema,
    about: AboutSectionSchema,
    educations: z.array(EducationSchema),
    projects: z.array(ProjectSchema),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;