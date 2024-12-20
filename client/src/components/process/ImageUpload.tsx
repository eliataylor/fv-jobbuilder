// src/components/process/ImageUpload.tsx
import React from 'react';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Monitor} from 'lucide-react';
import {ProcessStep} from '../../types';

interface ImageUploadProps {
    step: ProcessStep;
    onImageUpload: (file: File, stepId: number, monitorNumber: 1 | 2) => void;
}


export const ImageUpload: React.FC<ImageUploadProps> = ({step, onImageUpload}) => (
    <div className="grid grid-cols-2 gap-4">
        {[1, 2].map(monitorNum => (
            <div key={monitorNum} className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4"/>
                    <Label>Monitor {monitorNum}</Label>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onImageUpload(file, step.id, monitorNum as 1 | 2);
                    }}
                    className="hidden"
                    id={`image-upload-${monitorNum}-${step.id}`}
                />
                <Button
                    variant="outline"
                    onClick={() => document.getElementById(`image-upload-${monitorNum}-${step.id}`)?.click()}
                    className="w-full"
                >
                    Upload Monitor {monitorNum} Image
                </Button>
                {
                    /** @ts-expect-error **/
                    step[`imageUrl${monitorNum}`] && (
                    <div className="mt-2">
                        <img
                            /** @ts-ignore **/
                            src={step[`imageUrl${monitorNum}`] || ''}
                            alt={`Monitor ${monitorNum} Preview`}
                            className="w-full rounded-lg"
                        />
                    </div>
                )}
            </div>
        ))}
    </div>
);
