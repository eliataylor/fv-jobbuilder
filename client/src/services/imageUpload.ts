// src/services/imageUpload.ts
export const imageUploadService = {
    async uploadImage(file: File): Promise<string> {
        // In a real application, this would upload to your server/cloud storage
        // For now, we'll use local URLs
        return URL.createObjectURL(file);
    }
};
