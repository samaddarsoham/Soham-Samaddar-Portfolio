import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Add base path for proper asset loading
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
  }
});
