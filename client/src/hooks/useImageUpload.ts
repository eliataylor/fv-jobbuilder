// src/hooks/useImageUpload.ts
import {useCallback} from 'react';
import {ProcessStep} from '../types';
import {imageUploadService} from "@/services/imageUpload.ts";

export const useImageUpload = (
    steps: ProcessStep[],
    setSteps: React.Dispatch<React.SetStateAction<ProcessStep[]>>,
    onSave: (step: ProcessStep) => Promise<void>
) => {
    const handleImageUpload = useCallback(async (
        file: File,
        stepId: number,
        monitorNumber: 1 | 2
    ) => {
        try {
            const imageUrl = await imageUploadService.uploadImage(file);
            const updatedSteps = steps.map(step =>
                step.id === stepId
                    ? {...step, [`imageUrl${monitorNumber}`]: imageUrl}
                    : step
            );

            setSteps(updatedSteps);
            const stepToUpdate = updatedSteps.find(s => s.id === stepId);
            if (stepToUpdate) {
                await onSave(stepToUpdate);
            }
        } catch (error) {
            throw new Error('Failed to upload image');
        }
    }, [steps, setSteps, onSave]);

    return {handleImageUpload};
};
