import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true,
    open: true,
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
});
