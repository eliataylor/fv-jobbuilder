// src/components/common/ErrorBoundary.tsx
import {Component, ErrorInfo, ReactNode} from 'react';
import {ErrorAlert} from './ErrorAlert';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="container mx-auto p-4">
                    <ErrorAlert message={this.state.error?.message || 'An unexpected error occurred'}/>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => this.setState({hasError: false, error: null})}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
