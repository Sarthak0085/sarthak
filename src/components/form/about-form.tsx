"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AboutSectionSchema, Portfolio } from "./schema";
import { ReadSectionForm } from "./read-form";
import { HobbiesSectionForm } from "./hobbies-form";
import { LanguageSectionForm } from "./language-form";
import { createOrUpdateAboutSection } from "@/actions/create-portfolio";

interface AboutSectionFormProps {
    data?: Portfolio | null;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const AboutSectionForm = ({
    data,
    setActive
}: AboutSectionFormProps) => {
    const [isPending, startTransition] = useTransition();
    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<z.infer<typeof AboutSectionSchema>>({
        resolver: zodResolver(AboutSectionSchema),
        defaultValues: {
            id: data?.about?.id,
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
        // setData((prev) => ({
        //     ...prev,
        //     about: {
        //         id: data?.about?.id,
        //         read: {
        //             id: values?.read?.id ?? undefined,
        //             title: values?.read?.title,
        //             description: values?.read?.description,
        //             image: values?.read?.image,
        //         },
        //         hobby: {
        //             id: data?.about?.hobby?.id ?? undefined,
        //             title: values?.hobby?.title,
        //             description: values?.hobby?.description,
        //             hobbies: values?.hobby?.hobbies?.map((hobby) => ({
        //                 id: hobby?.id ?? "",
        //                 name: hobby?.name,
        //                 hobbyId: hobby?.hobbyId ?? undefined
        //             }))
        //         },
        //         language: {
        //             id: data?.about?.language?.id ?? undefined,
        //             title: values?.language?.title,
        //             description: values?.language?.description,
        //             languages: values?.language?.languages?.map((language) => ({
        //                 id: language?.id ?? undefined,
        //                 name: language?.name,
        //                 svg: language?.svg,
        //                 languageId: language?.languageId ?? undefined,
        //             }))
        //         }
        //     }
        // }));
        console.log("Data", data);
        startTransition(() => {
            createOrUpdateAboutSection(JSON.parse(JSON.stringify(values)))
                .then((data) => {
                    if (data?.success) {
                        alert(data?.success);
                        setActive(prev => prev + 1);
                    }
                }).catch((err) => console.error(err));
        })
    }

    return (
        <div className="w-full mx-auto my-16">
            <div className="w-full sm:min-w-[400px] max-w-lg mx-auto ">
                <h1 className="text-2xl font-bold mb-4">About Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReadSectionForm control={control} errors={errors} setValue={setValue} getValues={getValues} />
                    <HobbiesSectionForm control={control} errors={errors} />
                    <LanguageSectionForm control={control} errors={errors} setValue={setValue} getValues={getValues} />
                    <div className='flex items-center justify-end'>
                        <button onClick={() => onSubmit(getValues())} disabled={isPending} className='bg-emerald-500 text-white px-4 py-2 rounded'>
                            Save
                        </button>
                    </div>
                    <div className='flex items-center my-8 justify-between '>
                        <button
                            onClick={() => setActive(prev => prev - 1)}
                            disabled={isPending}
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            <span className="mr-2">&#9664;</span>
                            Prev
                        </button>
                        <button
                            onClick={() => setActive(prev => prev + 1)}
                            disabled={isPending}
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            Next
                            <span className="ml-2">&#9654;</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}