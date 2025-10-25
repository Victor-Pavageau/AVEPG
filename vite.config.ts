import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['i18next'],
          'ant-design': ['antd'],
        },
      },
    },
    chunkSizeWarningLimit: 750,
  },
});
