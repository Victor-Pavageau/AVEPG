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
          i18n: ['i18next'],
          'ant-design1': ['antd/es'],
          'ant-design2': [
            'rc-virtual-list/es',
            'rc-select/es',
            'rc-field-form/es',
            'rc-picker/es',
            'rc-menu/es',
            'rc-tabs/es',
            'rc-util/es',
            'rc-tooltip/es',
            'rc-dropdown/es',
            'rc-segmented/es',
            'rc-dialog/es',
            'rc-textarea/es',
            'rc-input/es',
            'rc-notification/es',
          ],
        },
      },
    },
  },
});
