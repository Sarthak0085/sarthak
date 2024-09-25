"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AboutSectionSchema, Portfolio } from "./schema";
import { ReadSectionForm } from "./read-form";
import { HobbiesSectionForm } from "./hobbies-form";
import { LanguageSectionForm } from "./language-form";

interface AboutSectionFormProps {
    data: Portfolio | null;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const AboutSectionForm = ({
    data,
    setData,
    setActive
}: AboutSectionFormProps) => {
    // console.log("data", data);
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<z.infer<typeof AboutSectionSchema>>({
        resolver: zodResolver(AboutSectionSchema),
        defaultValues: {
            read: {
                id: data?.about?.read?.id ?? undefined,
                title: data?.about?.read?.title ?? "",
                description: data?.about?.read?.description ?? "",
                image: data?.about?.read?.image ?? "",
            },
            hobby: {
                title: data?.about?.hobby?.title ?? "",
                id: data?.about?.hobby?.id ?? undefined,
                description: data?.about?.hobby?.description ?? "",
                hobbies: data?.about?.hobby?.hobbies?.map((hobby) => ({
                    id: hobby?.id ?? undefined,
                    name: hobby?.name ?? "",
                    hobbyId: hobby?.hobbyId ?? undefined,
                }))
            },
            language: {
                id: data?.about?.language?.id ?? undefined,
                title: data?.about?.language?.title ?? "",
                description: data?.about?.language?.description ?? "",
                languages: data?.about?.language?.languages?.map((language) => ({
                    id: language?.id ?? undefined,
                    name: language?.name ?? "",
                    svg: language?.svg ?? "",
                    languageId: language?.languageId ?? undefined,
                }))
            }
        }
    });

    const onSubmit = (values: z.infer<typeof AboutSectionSchema>) => {
        console.log("values", values);
        setData((prev) => ({
            ...prev,
            about: {
                id: data?.about?.id,
                read: {
                    id: values?.read?.id ?? undefined,
                    title: values?.read?.title,
                    description: values?.read?.description,
                    image: values?.read?.image,
                },
                hobby: {
                    id: data?.about?.hobby?.id ?? undefined,
                    title: values?.hobby?.title,
                    description: values?.hobby?.description,
                    hobbies: values?.hobby?.hobbies?.map((hobby) => ({
                        id: hobby?.id ?? "",
                        name: hobby?.name,
                        hobbyId: hobby?.hobbyId ?? undefined
                    }))
                },
                language: {
                    id: data?.about?.language?.id ?? undefined,
                    title: values?.language?.title,
                    description: values?.language?.description,
                    languages: values?.language?.languages?.map((language) => ({
                        id: language?.id ?? undefined,
                        name: language?.name,
                        svg: language?.svg,
                        languageId: language?.languageId ?? undefined,
                    }))
                }
            }
        }));
        console.log("Data", data);
        setActive(prev => prev + 1);
    }

    return (
        <div className="w-full mx-auto my-16">
            <div className="w-full sm:min-w-[400px] max-w-lg mx-auto ">
                <h1 className="text-2xl font-bold mb-4">About Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReadSectionForm control={control} errors={errors} setValue={setValue} getValues={getValues} />
                    <HobbiesSectionForm control={control} errors={errors} />
                    <LanguageSectionForm control={control} errors={errors} />
                    <button
                        // type="submit"
                        onClick={() => onSubmit(getValues())}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    )
}