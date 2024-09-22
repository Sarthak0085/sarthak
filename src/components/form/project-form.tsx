import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Portfolio, ProjectSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface ProjectFormProps {
    project: z.infer<typeof ProjectSchema> | null;
    position: number;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectForm = ({ project, setData, position, setActive }: ProjectFormProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(project?.image ?? null);
    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            id: project?.id ?? undefined,
            title: project?.title ?? "",
            description: project?.description ?? "",
            startDate: project?.startDate ?? new Date(),
            endDate: project?.endDate ?? undefined,
            image: project?.image ?? "",
            githubLink: project?.githubLink ?? "",
            position: project?.position ?? position,
            liveLink: project?.liveLink ?? "",
            companyName: project?.companyName ?? undefined,
            portfolioId: project?.portfolioId ?? undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        console.log("project", values);
        setData((prev) => ({
            ...prev,
            projects: prev.projects.map(item =>
                item.id === values?.id ? { ...item, ...values } : item
            )
        }));
        setActive(prev => prev + 1);
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                form.setValue("image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                form.setValue("image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-[90%] mx-auto mt-10'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='mb-5'>
                    <label htmlFor="image">Project Image</label>
                    <div
                        className='border-2 border-dashed border-gray-300 rounded-md p-4 text-center'
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
                    >
                        {imagePreview ? (
                            <picture>
                                <img src={imagePreview} alt="Image Preview" className="max-w-full h-auto" />
                            </picture>
                        ) : (
                            <p className='text-gray-500'>Drag and drop an image here, or click to select</p>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className='hidden'
                            onChange={handleImageUpload}
                            id="imageInput"
                        />
                        <label htmlFor="imageInput" className='mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded'>
                            Upload Image
                        </label>
                    </div>
                    {form.formState.errors.image && (
                        <p className="text-red-600 text-sm">{form.formState.errors.image.message}</p>
                    )}
                </div>
                <div className='mb-5'>
                    <label htmlFor="degree">Project Title <span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.title && <p className="text-red-600 text-sm">{form.formState.errors.title.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="description">Project Description <span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                placeholder="Enter a brief description"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.description && (
                        <p className="text-red-600 text-sm">{form.formState.errors.description.message}</p>
                    )}
                </div>
                <div className='mb-5'>
                    <label htmlFor="companyName">Company Name</label>
                    <Controller
                        name="companyName"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="Enter your company name"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.companyName && (
                        <p className="text-red-600 text-sm">{form.formState.errors.companyName.message}</p>
                    )}
                </div>
                <div className='mb-5'>
                    <label htmlFor="startDate">Start Date<span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="startDate"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="date"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                            />
                        )}
                    />
                    {form.formState.errors.startDate && <p className="text-red-600 text-sm">{form.formState.errors.startDate.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="startDate">End Date</label>
                    <Controller
                        name="endDate"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="date"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                            />
                        )}
                    />
                    {form.formState.errors.endDate && <p className="text-red-600 text-sm">{form.formState.errors.endDate.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="githubLink">Github Link</label>
                    <Controller
                        name="githubLink"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="Enter your project github link"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.githubLink && (
                        <p className="text-red-600 text-sm">{form.formState.errors.githubLink.message}</p>
                    )}
                </div>
                <div className='mb-5'>
                    <label htmlFor="lievLink">Live Link</label>
                    <Controller
                        name="liveLink"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="Enter your project live link"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.liveLink && (
                        <p className="text-red-600 text-sm">{form.formState.errors.liveLink.message}</p>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <button onClick={() => setActive(prev => prev - 1)} className='bg-blue-500 text-white px-4 py-2 rounded'>
                        <span className="mr-2">&#9664;</span>
                        Prev
                    </button>
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                        Next
                        <span className="mr-2">&#9654;</span>
                    </button>
                </div>
            </form>
        </div>
    )
}