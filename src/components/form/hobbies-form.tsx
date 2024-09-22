import React from 'react';
import { useFieldArray, Controller, Control, FieldErrors } from 'react-hook-form';
import { z } from "zod";
import { AboutSectionSchema } from './schema';

type schema = z.infer<typeof AboutSectionSchema>;

interface HobbiesSectionProps {
    control: Control<schema>;
    errors: FieldErrors<schema>;
}

export const HobbiesSectionForm = ({ control, errors }: HobbiesSectionProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "hobby.hobbies",
    });

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Hobbies</h2>
            <div className="mb-4 border p-4 rounded-md">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-200">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <Controller
                        name={`hobby.title`}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {errors.hobby?.title && <p className="text-red-600 text-sm">{errors.hobby?.title?.message}</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-200">Description</label>
                    <Controller
                        name={`hobby.description`}
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    {errors.hobby?.description && <p className="text-red-600 text-sm">{errors.hobby?.description?.message}</p>}
                </div>

                <div>
                    {fields.map((field, index) => (
                        <>
                            <div key={field?.name} className="mb-2">
                                <label className="block text-sm font-medium text-gray-200">
                                    Hobby Name (Add Emoji with it) <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name={`hobby.hobbies.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="mt-1 block w-full border bg-gray-600 border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.hobby?.title && <p className="text-red-600 text-sm">{errors.hobby?.title?.message}</p>}
                            </div>
                            <button type="button" onClick={() => remove(index)} className="text-red-500 hover:underline">
                                Remove Hobby
                            </button>
                        </>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: '', hobbyId: '' })}
                        className="mb-4 text-blue-500 hover:underline"
                    >
                        Add Hobby
                    </button>
                </div>
            </div>
        </div>
    );
};