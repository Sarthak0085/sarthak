import React, { useEffect, useState } from 'react';
import { useFieldArray, Controller, Control, FieldErrors, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { z } from "zod";
import { AboutSectionSchema } from './schema';

type schema = z.infer<typeof AboutSectionSchema>;

interface LanguageSectionForm {
    control: Control<schema>;
    errors: FieldErrors<schema>;
    setValue: UseFormSetValue<schema>;
    getValues: UseFormGetValues<schema>;
}

export const LanguageSectionForm = ({ control, errors, setValue, getValues }: LanguageSectionForm) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "language.languages",
    });

    const [svgPreviews, setSvgPreviews] = useState<{ [key: number]: string | ArrayBuffer | null }>();

    useEffect(() => {
        const values = getValues();
        const languages = values.language?.languages || [];
        const initialPreviews = languages.reduce((acc, lang, index) => {
            if (lang.svg) acc[index] = lang.svg;
            return acc;
        }, {});
        setSvgPreviews(initialPreviews);
    }, [getValues]);

    // const handleSvgChange = (index: number, file: File | undefined | null) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setSvgPreviews(prev => ({ ...prev, [index]: reader.result }));
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleSvgUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSvgPreviews(prev => ({ ...prev, [index]: reader.result }));
                setValue(`language.languages.${index}.svg`, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (index: number, event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSvgPreviews(prev => ({ ...prev, [index]: reader.result }));
                setValue(`language.languages.${index}.svg`, reader.result as string);
            };
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
                                placeholder="Enter language title"
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
                                placeholder="Enter language description"
                                rows={4}
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
                                            placeholder="Enter language name"
                                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.language?.languages?.[index]?.name && <p className="text-red-600 text-sm">{errors.language?.languages?.[index]?.name?.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mt-4">
                                    Enter SVG URL or Upload SVG
                                </label>
                                <Controller
                                    name={`language.languages.${index}.svg`}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            type="text"
                                            placeholder="Enter SVG URL"
                                            value={svgPreviews?.[index] as string ?? ""}
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
                                <div
                                    className='border-2 border-dashed border-gray-300 rounded-md p-4 text-center'
                                    onDrop={(e) => handleDrop(index, e)}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {svgPreviews?.[index] ? (
                                        <picture>
                                            <img src={svgPreviews[index] as string} alt="Image Preview" className="max-w-full h-auto" />
                                        </picture>
                                    ) : (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/svg+xml"
                                                className='hidden'
                                                onChange={(e) => handleSvgUpload(index, e)}
                                                id="svgInput"
                                            />
                                            <label htmlFor="svgInput" className='cursor-pointer bg-blue-500 text-white  rounded'>
                                                <p className='text-gray-500'>Drag and drop an image here, or click to select</p>
                                            </label>
                                        </>
                                    )}
                                </div>
                                {/* <Controller
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
                                )} */}
                            </div>
                            <button type="button" onClick={() => remove(index)} className="my-1 block text-red-500 hover:underline">
                                Remove
                            </button>
                        </>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: '', svg: '', languageId: '' })}
                        className="my-4 block text-blue-500 hover:underline"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};