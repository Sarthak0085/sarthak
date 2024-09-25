"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Heroschema, Portfolio } from "./schema";

interface HeroSectionFormProps {
    data: Portfolio | null;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const HeroSectionForm = ({
    data,
    setData,
    setActive
}: HeroSectionFormProps) => {
    const { handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof Heroschema>>({
        resolver: zodResolver(Heroschema),
        defaultValues: {
            id: data?.hero?.id ?? undefined,
            title: data?.hero?.title ?? "",
            description: data?.hero?.description ?? "",
        }
    });

    const onSubmit = (values: z.infer<typeof Heroschema>) => {
        console.log(values);
        setData((prev) => ({
            ...prev,
            hero: {
                id: values?.id ?? undefined,
                title: values?.title,
                description: values?.description,
            }
        }));
        setActive(prev => prev + 1);
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Next <span className="mr-2">&#9654;</span>
                    </button>
                </form>
            </div>
        </div>
    )
}