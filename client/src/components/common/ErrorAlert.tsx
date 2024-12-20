// src/components/common/ErrorAlert.tsx
import React from 'react';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle} from 'lucide-react';

interface ErrorAlertProps {
    message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({message}) => (
    <Alert variant="destructive">
        <AlertCircle className="h-4 w-4"/>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);
