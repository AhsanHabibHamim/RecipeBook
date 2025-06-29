import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::', // Accept all IPv6 and IPv4 connections
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean), // Filters out false values
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}));
