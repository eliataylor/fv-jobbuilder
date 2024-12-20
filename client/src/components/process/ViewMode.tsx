// src/components/process/ViewMode.tsx
import React from 'react';
import {Button} from '@/components/ui/button';
import {AlertCircle, ArrowRight} from 'lucide-react';
import {ProcessStep} from '../../types/process';
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

interface ViewModeProps {
    steps: ProcessStep[];
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

export const ViewMode: React.FC<ViewModeProps> = ({
                                                      steps,
                                                      currentStep,
                                                      setCurrentStep
                                                  }) => {
    const currentStepData = steps[currentStep];

    return (
        <div className="relative h-screen bg-gray-100">
            <div className="relative h-full">
                {currentStepData[`imageUrl${currentStepData.activeMonitor}`] && (
                    <img
                        src={currentStepData[`imageUrl${currentStepData.activeMonitor}`] || ''}
                        alt={`Step ${currentStep + 1}`}
                        className="w-full h-full object-contain"
                    />
                )}
                <div className="absolute bottom-4 right-4 w-1/3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold">
                            {currentStepData.title || `Step ${currentStep + 1}`}
                        </h3>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                const newMonitor = currentStepData.activeMonitor === 1 ? 2 : 1;
                                steps[currentStep].activeMonitor = newMonitor;
                            }}
                        >
                            Monitor {currentStepData.activeMonitor}
                        </Button>
                    </div>
                    <p className="text-sm mt-2">{currentStepData.instructions}</p>

                    {currentStepData.parameters.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h4 className="font-semibold text-sm">Parameters</h4>
                            {currentStepData.parameters.map((param) => (
                                <div key={param.id} className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <Label className="text-sm">{param.name}</Label>
                                        {param.mandatory && (
                                            <AlertCircle className="w-3 h-3 text-red-500"/>
                                        )}
                                    </div>
                                    <Input
                                        type={param.type}
                                        value={param.value || ''}
                                        onChange={(e) => {
                                            param.value = e.target.value;
                                        }}
                                        placeholder={`Enter ${param.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="bg-white/90"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        disabled={currentStep === steps.length - 1}
                        className="bg-white/90"
                    >
                        <ArrowRight className="w-4 h-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
