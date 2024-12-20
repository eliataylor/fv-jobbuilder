// src/services/api.ts
import {ProcessStep} from '../types/process';

const API_BASE_URL = '/api';

class APIError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'APIError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new APIError(`HTTP error! status: ${response.status}`, response.status);
    }
    const data = await response.json();
    return data;
}

export const api = {
    async getAllProcesses(): Promise<ProcessStep[]> {
        const response = await fetch(`${API_BASE_URL}/items`);
        return handleResponse<ProcessStep[]>(response);
    },

    async getProcess(id: string): Promise<ProcessStep> {
        const response = await fetch(`${API_BASE_URL}/items/${id}`);
        return handleResponse<ProcessStep>(response);
    },

    async createProcess(process: Omit<ProcessStep, '_id'>): Promise<ProcessStep> {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(process),
        });
        return handleResponse<ProcessStep>(response);
    },

    async updateProcess(id: string, process: Partial<ProcessStep>): Promise<ProcessStep> {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(process),
        });
        return handleResponse<ProcessStep>(response);
    },

    async deleteProcess(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new APIError(`HTTP error! status: ${response.status}`, response.status);
        }
    }
};
