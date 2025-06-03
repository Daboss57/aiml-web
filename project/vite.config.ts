import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Configure server for SPA
    historyApiFallback: true,
    headers: {
      // Allow loading Pyodide WASM
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    // Ensure proper chunk loading
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});