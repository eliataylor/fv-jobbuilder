// src/hooks/useProcesses.ts
import {useCallback, useEffect, useState} from 'react';
import {ProcessStep} from '../types/process';
import {api} from '../services/api';

export const useProcesses = () => {
    const [steps, setSteps] = useState<ProcessStep[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // @ts-ignore
    const loadProcesses = useCallback(async () => {
        try {
            setLoading(true);
            const processes = await api.getAllProcesses();
            setSteps(processes.length > 0 ? processes : [{
                id: 1,
                title: '',
                instructions: '',
                imageUrl1: null,
                imageUrl2: null,
                activeMonitor: 1,
                parameters: []
            }]);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load processes');
        } finally {
            setLoading(false);
        }
    }, []);

    const saveProcess = useCallback(async (process: ProcessStep) => {
        try {
            setLoading(true);
            if (process._id) {
                await api.updateProcess(process._id, process);
            } else {
                const savedProcess = await api.createProcess(process);
                setSteps(prev => prev.map(p => p.id === process.id ? {...p, _id: savedProcess._id} : p));
            }
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save process');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProcesses();
    }, [loadProcesses]);

    return {steps, setSteps, loading, error, loadProcesses, saveProcess};
};
