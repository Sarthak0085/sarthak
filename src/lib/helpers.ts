import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface Result {
    public_id: string | undefined;
    url: string | undefined;
}

export const uploadFilesToCloudinary = async (files: string | string[], slug?: string): Promise<Result[]> => {
    // Ensure files is always an array
    const fileArray = Array.isArray(files) ? files : [files];

    const uploadPromises = fileArray.map((file, index) => {
        return new Promise<Result>((resolve, reject) => {
            cloudinary.uploader.upload(
                file,
                {
                    resource_type: "auto",
                    public_id: slug ? `portfolio/${slug}/image_${index}` : `portfolio/image_${index}`,
                },
                (error, result) => {
                    if (error) return reject(error);
                    const formattedResult: Result = {
                        public_id: result?.public_id,
                        url: result?.secure_url,
                    };
                    resolve(formattedResult);
                }
            );
        });
    });

    // Wait for all uploads to finish
    return Promise.all(uploadPromises);
};

export const deleteImageFromCloudinary = async (publicId: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
