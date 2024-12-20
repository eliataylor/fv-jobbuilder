
// src/App.tsx
import React from 'react';
import { ProcessAssemblyApp } from './components/process/ProcessAssemblyApp';
import { Layout } from './components/common/Layout';

export const App: React.FC = () => {
  return (
    <Layout>
      <ProcessAssemblyApp />
    </Layout>
  );
};
