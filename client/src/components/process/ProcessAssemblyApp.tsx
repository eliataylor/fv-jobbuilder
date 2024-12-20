// src/components/process/ProcessAssemblyApp.tsx
import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {PlusCircle} from 'lucide-react';
import {ProcessStep} from './ProcessStep';
import {ViewMode} from './ViewMode';
import {useProcesses} from '@/hooks/useProcesses.ts';
import {useParameters} from '@/hooks/useParameters.ts';
import {useImageUpload} from '@/hooks/useImageUpload.ts';
import type {ProcessStep as ProcessStepType} from '../../types';
import {LoadingSpinner} from "@/components/common/LoadingSpinner.tsx";


export const ProcessAssemblyApp: React.FC = () => {
    const [mode, setMode] = useState<'edit' | 'view'>('edit');
    const [currentStep, setCurrentStep] = useState(0);
    const {steps, setSteps, loading, error, saveProcess} = useProcesses();
    const {addParameter, updateParameter} = useParameters(steps, setSteps, saveProcess);
    const {handleImageUpload} = useImageUpload(steps, setSteps, saveProcess);

    const handleUpdateStep = async (id: number, field: keyof ProcessStepType, value: any) => {
        const updatedSteps = steps.map(step =>
            step.id === id ? {...step, [field]: value} : step
        );
        setSteps(updatedSteps);
        const stepToUpdate = updatedSteps.find(s => s.id === id);
        if (stepToUpdate) {
            await saveProcess(stepToUpdate);
        }
    };

    const addStep = async () => {
        const newId = Math.max(...steps.map(s => s.id)) + 1;
        const newStep: ProcessStepType = {
            id: newId,
            title: '',
            instructions: '',
            imageUrl1: null,
            imageUrl2: null,
            activeMonitor: 1,
            parameters: []
        };
        setSteps(prev => [...prev, newStep]);
        await saveProcess(newStep);
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Process Builder</h2>
                    <Button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
                        {mode === 'edit' ? 'Preview' : 'Edit'} Mode
                    </Button>
                </div>

                {mode === 'edit' ? (
                    <>
                        {steps.map((step, index) => {
                            console.log(`redrawing process step ${step.id}`, step)
                            return <ProcessStep
                                key={step.id}
                                step={step}
                                index={index}
                                onUpdateStep={handleUpdateStep}
                                onImageUpload={handleImageUpload}
                                onAddParameter={addParameter}
                                onUpdateParameter={updateParameter}
                            />
                        })}
                        <Button onClick={addStep} className="w-full">
                            <PlusCircle className="w-4 h-4 mr-2"/>
                            Add Step
                        </Button>
                    </>
                ) : (
                    <ViewMode
                        steps={steps}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                )}
            </div>
        </div>
    );
};
