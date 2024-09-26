"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Heroschema, Portfolio } from "./schema";
import { createOrUpdateHero } from "@/actions/create-portfolio";

interface HeroSectionFormProps {
    data?: Portfolio | null;
    // setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const HeroSectionForm = ({
    data,
    // setData,
    setActive
}: HeroSectionFormProps) => {
    console.log("data", data);
    const [isPending, startTransition] = useTransition();
    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof Heroschema>>({
        resolver: zodResolver(Heroschema),
        defaultValues: {
            id: data?.hero?.id,
            title: data?.hero?.title ?? "",
            description: data?.hero?.description ?? "",
            portfolioId: data?.id,
        }
    });

    const onSubmit = (values: z.infer<typeof Heroschema>) => {
        console.log(values);
        // setData((prev) => ({
        //     ...prev,
        //     hero: {
        //         id: values?.id ?? undefined,
        //         title: values?.title,
        //         description: values?.description,
        //     }
        // }));
        startTransition(() => {
            createOrUpdateHero(JSON.parse(JSON.stringify(values))).then((data) => {
                if (data?.success) {
                    alert(data?.success);
                    setActive(prev => prev + 1);
                }
            }).catch((err) => console.error(err));
        })
    }
    return (
        <div className='w-full mx-auto mt-16'>
            <div className="w-full sm:min-w-[400px] max-w-lg mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Hero Section</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        <label htmlFor="title">Title<span className='text-[crimson]'>*</span></label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="Enter your hero section title"
                                    className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-200">Description <span className="text-red-500">*</span></label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    rows={6}
                                    placeholder="Enter your hero section description"
                                    className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
                    </div>
                    <div className='flex flex-col space-y-4 items-center !justify-self-end'>
                        <button
                            type='submit'
                            disabled={isPending}
                            className='w-full bg-emerald-500 text-white px-4 py-2 rounded'
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setActive(prev => prev + 1)}
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Next <span className="mr-2">&#9654;</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}