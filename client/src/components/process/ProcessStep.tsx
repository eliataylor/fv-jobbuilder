// src/components/process/ProcessStep.tsx
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {ProcessStep as ProcessStepType} from '../../types/process';
import {ImageUpload} from './ImageUpload';
import {ParameterForm} from './ParameterForm';
import {Parameter} from "@/types/parameter.ts";

interface ProcessStepProps {
    step: ProcessStepType;
    index: number;
    onUpdateStep: (id: number, field: keyof ProcessStepType, value: any) => void;
    onImageUpload: (file: File, stepId: number, monitorNumber: 1 | 2) => void;
    onAddParameter: (stepId: number) => void;
    onUpdateParameter: (stepId: number, parameterId: string, field: keyof Parameter, value: any) => void;
}

export const ProcessStep: React.FC<ProcessStepProps> = React.memo(({
                                                            step,
                                                            index,
                                                            onUpdateStep,
                                                            onImageUpload,
                                                            onAddParameter,
                                                            onUpdateParameter
                                                        }) => (
    <Card>
        <CardHeader>
            <CardTitle>Step {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Input
                    placeholder="Step Title"
                    value={step.title}
                    onChange={(e) => onUpdateStep(step.id, 'title', e.target.value)}
                    className="mb-2"
                />
                <Textarea
                    placeholder="Assembly Instructions"
                    value={step.instructions}
                    onChange={(e) => onUpdateStep(step.id, 'instructions', e.target.value)}
                    rows={3}
                />
            </div>

            <ImageUpload
                step={step}
                onImageUpload={onImageUpload}
            />

            <ParameterForm
                step={step}
                onAddParameter={onAddParameter}
                onUpdateParameter={onUpdateParameter}
            />
        </CardContent>
    </Card>
));
