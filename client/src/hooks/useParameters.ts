// src/hooks/useParameters.ts
import {useCallback} from 'react';
import {Parameter} from '../types/parameter';
import {ProcessStep} from '../types/process';

export const useParameters = (
    steps: ProcessStep[],
    setSteps: React.Dispatch<React.SetStateAction<ProcessStep[]>>,
    onSave: (step: ProcessStep) => Promise<void>
) => {
    const addParameter = useCallback(async (stepId: number) => {
        const updatedSteps = steps.map(step => {
            if (step.id === stepId) {
                const newParameter: Parameter = {
                    id: Date.now().toString(),
                    name: '',
                    type: 'text',
                    mandatory: false
                };
                return {
                    ...step,
                    parameters: [...step.parameters, newParameter]
                };
            }
            return step;
        });

        setSteps(updatedSteps);
        const stepToUpdate = updatedSteps.find(s => s.id === stepId);
        if (stepToUpdate) {
            await onSave(stepToUpdate);
        }
    }, [steps, setSteps, onSave]);

    const updateParameter = useCallback(async (
        stepId: number,
        parameterId: string,
        field: keyof Parameter,
        value: string | boolean
    ) => {
        const updatedSteps = steps.map(step => {
            if (step.id === stepId) {
                return {
                    ...step,
                    parameters: step.parameters.map(param =>
                        param.id === parameterId
                            ? {...param, [field]: value}
                            : param
                    )
                };
            }
            return step;
        });

        setSteps(updatedSteps);
        const stepToUpdate = updatedSteps.find(s => s.id === stepId);
        if (stepToUpdate) {
            await onSave(stepToUpdate);
        }
    }, [steps, setSteps, onSave]);

    return {addParameter, updateParameter};
};
