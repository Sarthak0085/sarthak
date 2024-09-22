import React, { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { z } from "zod";
import { AboutSectionSchema } from './schema';

type schema = z.infer<typeof AboutSectionSchema>;

interface ReadSectionProps {
    control: Control<schema>;
    errors: FieldErrors<schema>;
    setValue: UseFormSetValue<schema>;
    getValues: UseFormGetValues<schema>;
}

export const ReadSectionForm = ({ control, errors, setValue, getValues }: ReadSectionProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(getValues("read.image") ?? null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setValue("read.image", reader.result as string);
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
                setValue("read.image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Read Section</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200">
                    Title <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="read.title"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Enter the Read title"
                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                />
                {errors.read?.title && <p className="text-red-600 text-sm">{errors?.read?.title?.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-200">
                    Description <span className="text-red-500">*</span>
                </label>
                <Controller
                    name="read.description"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder="Enter the Read description"
                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                />
                {errors.read?.description && <p className="text-red-600 text-sm">{errors.read?.description?.message}</p>}
            </div>
            <div className='mb-5'>
                <label htmlFor="image">
                    Project Image <span className="text-red-500">*</span>
                </label>
                <div
                    className='border-2 border-dashed border-gray-300 rounded-md p-4 text-center'
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {imagePreview ? (
                        <picture>
                            <img src={imagePreview} alt="Image Preview" className="max-w-full h-auto" />
                        </picture>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className='hidden'
                                onChange={handleImageUpload}
                                id="imageInput"
                            />
                            <label htmlFor="imageInput" className='cursor-pointer bg-blue-500 text-white  rounded'>
                                <p className='text-gray-500'>Drag and drop an image here, or click to select</p>
                            </label>
                        </>
                    )}
                </div>
                {errors?.read?.image && (
                    <p className="text-red-600 text-sm">{errors?.read?.image?.message}</p>
                )}
            </div>
        </div>
    );
};
