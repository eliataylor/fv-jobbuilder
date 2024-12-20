// src/components/common/Layout.tsx
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => (
    <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-6 px-4">
            {children}
        </main>
    </div>
);
