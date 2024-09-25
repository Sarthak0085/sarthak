import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { EducationSchema, Portfolio } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface EducationFormProps {
    education: z.infer<typeof EducationSchema> | null;
    setData: React.Dispatch<React.SetStateAction<Portfolio>>;
    position: number;
}

export const EducationForm = ({ education, setData, position }: EducationFormProps) => {
    const form = useForm<z.infer<typeof EducationSchema>>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            id: education?.id ?? undefined,
            degree: education?.degree ?? "",
            field: education?.field ?? "",
            institution: education?.institution ?? "",
            startDate: education?.startDate,
            endDate: education?.endDate ?? undefined,
            position: education?.position ?? position,
            description: education?.description ?? "",
            percentage: education?.percentage ?? undefined,
            cgpa: education?.cgpa ?? undefined,
            portfolioId: education?.portfolioId ?? undefined,
            liveLink: education?.liveLink ?? undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof EducationSchema>) => {
        console.log("education", values);
        setData((prev) => ({
            ...prev,
            educations: prev.educations.map(item =>
                item.id === values?.id ? { ...item, ...values, cgpa: Number(values?.cgpa), percentage: Number(values?.percentage) } : item
            )
        }));
    }

    return (
        <div className='w-[90%] mx-auto mt-10'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='mb-5'>
                    <label htmlFor="degree">Education Degree <span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="degree"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.degree && <p className="text-red-600 text-sm">{form.formState.errors.degree.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="field">Education Field <span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="field"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.field && <p className="text-red-600 text-sm">{form.formState.errors.field.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="institution">Education Institution<span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="institution"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.institution && <p className="text-red-600 text-sm">{form.formState.errors.institution.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="startDate">Start Date<span className='text-[crimson]'>*</span></label>
                    <Controller
                        name="startDate"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="20-08-2019 (Type date in this format)"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.startDate && <p className="text-red-600 text-sm">{form.formState.errors.startDate.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="endDate">End Date</label>
                    <Controller
                        name="endDate"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="20-08-2020 (Type date in this format)"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.endDate && <p className="text-red-600 text-sm">{form.formState.errors.endDate.message}</p>}
                </div>
                <div className='mb-5'>
                    <label htmlFor="description">Description</label>
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
                    <label htmlFor="percentage">Percentage</label>
                    <Controller
                        name="percentage"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="0.01"
                                min={0}
                                max={100}
                                placeholder="Enter percentage"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.percentage && (
                        <p className="text-red-600 text-sm">{form.formState.errors.percentage.message}</p>
                    )}
                </div>

                <div className='mb-5'>
                    <label htmlFor="cgpa">CGPA</label>
                    <Controller
                        name="cgpa"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step="0.01"
                                min={0}
                                max={10}
                                placeholder="Enter CGPA"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.cgpa && (
                        <p className="text-red-600 text-sm">{form.formState.errors.cgpa.message}</p>
                    )}
                </div>

                <div className='mb-5'>
                    <label htmlFor="liveLink">Live Link</label>
                    <Controller
                        name="liveLink"
                        control={form.control}
                        render={({ field }) => (
                            <input
                                {...field}
                                placeholder="Enter live link"
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {form.formState.errors.liveLink && (
                        <p className="text-red-600 text-sm">{form.formState.errors.liveLink.message}</p>
                    )}
                </div>
                <div className='flex items-center justify-end'>
                    <button type='submit' className='bg-emerald-500 text-white px-4 py-2 rounded'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}