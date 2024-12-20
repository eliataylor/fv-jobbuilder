import {Parameter} from './parameter';

export interface ProcessStep {
    _id?: string;
    id: number;
    title: string;
    instructions: string;
    imageUrl1: string | null;
    imageUrl2: string | null;
    activeMonitor: 1 | 2;
    parameters: Parameter[];
    createdAt?: string;
    updatedAt?: string;
}
