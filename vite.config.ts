import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        /* Split the dependencies out of the app chunk. They change far less
           often than the site content, so a copy edit no longer invalidates
           ~100 KB of cached React/GSAP on repeat visits. */
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['gsap', 'lenis', 'split-type'],
        },
      },
    },
  },
})
