export interface Project {
  _id: string;
  projectTitle: string;
  author: string;
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
  steps: ProcessStep[];
}


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

export interface Parameter {
    id: string;
    name: string;
    type: 'text' | 'number';
    mandatory: boolean;
    value?: string | number;
}


export interface APIResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export type ProcessResponse = APIResponse<ProcessStep>;
export type ProcessListResponse = APIResponse<ProcessStep[]>;
