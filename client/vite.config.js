import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
    host: true,  // Expose to all network interfaces
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://server:3000', // Using Docker service name instead of localhost
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
