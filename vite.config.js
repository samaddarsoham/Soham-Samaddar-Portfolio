import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Soham-Samaddar-Portfolio/',  // Updated to match your repository name
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
  }
});
