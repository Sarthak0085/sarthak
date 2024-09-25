"use client";

import { useState } from "react";
import { z } from "zod";
import { EducationSchema, Portfolio } from "./schema";
import { twMerge } from "tailwind-merge";
import { EducationForm } from "./education-form";

interface EducationManagerProps {
    data: Portfolio | null;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const EducationManager = ({ data, setData, setActive }: EducationManagerProps) => {
    const [educations, setEducations] = useState<{
        id: string;
        index: number;
        education: z.infer<typeof EducationSchema> | null;
    }[]>(data?.educations?.map((education: z.infer<typeof EducationSchema>) => ({
        id: education?.id ?? `Education-1`,
        index: education?.position ?? 0,
        education: education,
    })) ?? []);
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        data?.educations?.reduce((acc, section) => {
            acc[section?.id ?? `Education-1`] = false;
            return acc;
        }, {} as { [key: string]: boolean }) || {}
    );

    const addNewSection = () => {
        setEducations((prevEducations) => [
            ...prevEducations,
            { id: `Education-${prevEducations?.length + 1}`, index: prevEducations?.length, education: null }
        ]);
    };

    const removeSection = (id: string) => {
        setEducations((prevEducations) => prevEducations?.filter(education => education?.id !== id));
    };

    const toggleCollapse = (id: string) => {
        setOpen((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    };

    return (
        <div className='w-full mx-auto my-16'>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
                    onClick={addNewSection}
                >
                    <span className="mr-2">+</span> Add New Section
                </button>
            </div>
            <h2 className="flex items-center justify-center text-2xl font-bold mb-4 logo-style">Education Details</h2>
            {educations.slice().reverse().map((section, index) => (
                <div key={section.id} className='mb-8 py-6'>
                    <div className={twMerge("w-full flex items-center justify-between mt-1 mb-3 px-4 py-2 rounded-lg", !open[section?.id] && "border border-slate-500")}>
                        {!open[section?.id] && (
                            <p className="font-Poppins mt-2 text-[18px] text-gray-500">
                                {educations.length - index}. {section?.education?.degree ?? "Education 1"}
                            </p>
                        )}
                        <div className="flex gap-4 items-center">
                            <button
                                className="p-0 h-auto"
                                onClick={() => removeSection(section.id)}
                            >
                                <span className='text-red-500'>🗑️</span>
                                <span className="sr-only">Delete Section</span>
                            </button>
                            <button
                                className="p-0 h-auto"
                                onClick={() => toggleCollapse(section.id)}
                            >
                                <span className={`transform transition-transform ${open[section?.id] ? 'rotate-180' : ''}`}>▼</span>
                                <span className="sr-only">Toggle Section</span>
                            </button>
                        </div>
                    </div>
                    {open[section?.id] && (
                        <EducationForm
                            education={section?.education}
                            setData={setData}
                            position={educations?.length}
                            id={section?.id}
                        />
                    )}
                </div>
            ))}
            <div className='flex items-center justify-between px-12'>
                <button onClick={() => setActive(prev => prev - 1)} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    <span className="mr-2">&#9664;</span>
                    Prev
                </button>
                <button onClick={() => setActive(prev => prev + 1)} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Next
                    <span className="ml-2">&#9654;</span>
                </button>
            </div>
        </div>
    )
}