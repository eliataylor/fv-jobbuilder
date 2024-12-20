import {ProcessStep} from "./process";

export interface APIResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export type ProcessResponse = APIResponse<ProcessStep>;
export type ProcessListResponse = APIResponse<ProcessStep[]>;
