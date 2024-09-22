import React, { useState } from 'react';
import { useFieldArray, Controller, Control, FieldErrors } from 'react-hook-form';
import { z } from "zod";
import { AboutSectionSchema } from './schema';

type schema = z.infer<typeof AboutSectionSchema>;

interface LanguageSectionForm {
    control: Control<schema>;
    errors: FieldErrors<schema>;
}

export const LanguageSectionForm = ({ control, errors }: LanguageSectionForm) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "language.languages",
    });

    const [svgPreviews, setSvgPreviews] = useState<{ [key: number]: string | ArrayBuffer | null }>({});

    const handleSvgChange = (index: number, file: File | undefined | null) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSvgPreviews(prev => ({ ...prev, [index]: reader.result }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Languages</h2>
            <div className="mb-4 border p-4 rounded-md">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-200">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name={`language.title`}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {errors.language?.title && <p className="text-red-600 text-sm">{errors.language?.title?.message}</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-200">Description</label>
                    <Controller
                        name={`language.description`}
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {errors.language?.description && <p className="text-red-600 text-sm">{errors.language?.description?.message}</p>}
                </div>
                <div>
                    {fields.map((field, index) => (
                        <>
                            <div key={field?.name} className="mb-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Language Name <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name={`language.languages.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.language?.languages?.[index]?.name && <p className="text-red-600 text-sm">{errors.language?.languages?.[index]?.name?.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mt-4">
                                    Upload SVG or
                                </label>
                                <Controller
                                    name={`language.languages.${index}.svg`}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            type="text"
                                            placeholder="Enter SVG URL"
                                            onChange={(e) => {
                                                onChange(e.target.value);
                                                setSvgPreviews(prev => ({ ...prev, [index]: e.target.value }));
                                            }}
                                            className="mt-2 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"
                                        />
                                    )}
                                />
                                <div className="flex items-center mb-5 px-3">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-2 text-gray-600 dark:text-gray-100 text-sm">OR</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <Controller
                                    name={`language.languages.${index}.svg`}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            type="file"
                                            accept="image/svg+xml"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                onChange(file);
                                                handleSvgChange(index, file);
                                            }}
                                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none"
                                        />
                                    )}
                                />
                                {svgPreviews[index] && (
                                    <picture>
                                        <img
                                            src={svgPreviews[index] as string}
                                            alt={`SVG Preview ${index}`}
                                            className="mt-2 w-24 h-24 object-cover border rounded"
                                        />
                                    </picture>
                                )}
                            </div>
                            <button type="button" onClick={() => remove(index)} className="my-1 text-red-500 hover:underline">
                                Remove
                            </button>
                        </>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: '', svg: '', languageId: '' })}
                        className="my-4 text-blue-500 hover:underline"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};