import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002', // Ensure this matches your backend server's address and port
        changeOrigin: true,
        secure: false,
      }
    }
  }
});