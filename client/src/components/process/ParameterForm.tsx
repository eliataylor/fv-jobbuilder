// src/components/process/ParameterForm.tsx
import React from 'react';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Plus, Trash2} from 'lucide-react';
import {ProcessStep} from '@/types';

interface ParameterFormProps {
    step: ProcessStep;
    onAddParameter: (stepId: number) => void;
    onUpdateParameter: (stepId: number, parameterId: string, field: string, value: any) => void;
}

export const ParameterForm: React.FC<ParameterFormProps> = ({
                                                                step,
                                                                onAddParameter,
                                                                onUpdateParameter,
                                                            }) => {
    const parameterTypes = {
        text: {label: 'Text Input'},
        number: {label: 'Number Input'}
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Parameters</h3>
                <Button onClick={() => onAddParameter(step.id)} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2"/>
                    Add Parameter
                </Button>
            </div>

            {step.parameters.map((param) => (
                <Card key={param.id} className="p-4">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Input
                                placeholder="Parameter Name"
                                value={param.name}
                                onChange={(e) => onUpdateParameter(step.id, param.id, 'name', e.target.value)}
                                className="w-1/3"
                            />
                            <Select
                                value={param.type}
                                onValueChange={(value) => onUpdateParameter(step.id, param.id, 'type', value)}
                            >
                                <SelectTrigger className="w-1/3">
                                    <SelectValue placeholder="Select type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(parameterTypes).map(([key, {label}]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onUpdateParameter(step.id, param.id, 'deleted', true)}
                            >
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={param.mandatory}
                                onCheckedChange={(checked) =>
                                    onUpdateParameter(step.id, param.id, 'mandatory', checked)
                                }
                            />
                            <Label>Mandatory field</Label>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
