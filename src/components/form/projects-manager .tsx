"use client";

import { useState } from "react";
import { z } from "zod";
import { Portfolio, ProjectSchema } from "./schema";
import { twMerge } from "tailwind-merge";
import { ProjectForm } from "./project-form";

interface ProjectsManagerProps {
    data: Portfolio | null;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectsManager = ({ data, setData, setActive }: ProjectsManagerProps) => {
    const [projects, setProjects] = useState<{ id: string, index: number, project: z.infer<typeof ProjectSchema> | null }[]>(
        data?.projects?.map((project: z.infer<typeof ProjectSchema>) => (
            {
                id: project?.id ?? `Project-1`,
                index: project?.position ?? 0,
                project: project
            }
        )) ?? []
    );
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        data?.projects?.reduce((acc, section) => {
            acc[section.id ?? 'Project-1'] = false;
            return acc;
        }, {} as { [key: string]: boolean }) ?? {}
    )

    const addNewSection = () => {
        setProjects((prevProjects) => [
            ...prevProjects,
            { id: `Project-${prevProjects?.length + 1}`, index: prevProjects?.length, project: null }
        ]);
    };

    const removeSection = (id: string) => {
        setProjects((prevProjects) => prevProjects?.filter(project => project?.id !== id));
    };

    const toggleCollapse = (id: string) => {
        setOpen((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    };

    return (
        <div className='w-full mx-auto mt-16'>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
                    onClick={addNewSection}
                >
                    <span className="mr-2">+</span> Add New Section
                </button>
            </div>
            <h2 className="flex items-center justify-center text-2xl font-bold mb-4 logo-style">Project Details</h2>
            {projects.slice().reverse().map((section, index) => (
                <div key={section.id} className='mb-8 py-6'>
                    {open[section?.id] && (
                        <ProjectForm
                            project={section?.project}
                            setData={setData}
                            position={projects?.length}
                            setActive={setActive}
                        />
                    )}
                    <div className={twMerge("w-full flex items-center justify-between mt-1 mb-3 px-4 py-2 rounded-lg", !open[section?.id] && "border border-slate-500")}>
                        {!open[section?.id] && (
                            <p className="font-Poppins mt-2 text-[18px] text-black dark:text-white">
                                {projects.length - index}. {section?.project?.title ?? "Project 1"}
                            </p>
                        )}
                        <div className="flex gap-4 items-center">
                            <button
                                className="p-0 h-auto"
                                onClick={() => removeSection(section.id)}
                            >
                                <span className='text-red-500'>🗑️</span>
                                <span className="sr-only">Delete Project</span>
                            </button>
                            <button
                                className="p-0 h-auto"
                                onClick={() => toggleCollapse(section.id)}
                            >
                                <span className={`transform transition-transform ${open[section?.id] ? 'rotate-180' : ''}`}>▼</span>
                                <span className="sr-only">Toggle Project</span>
                            </button>
                        </div>
                    </div>
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