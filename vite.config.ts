import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    /* Build month (YYYY-MM) for the footer's "last updated" stamp, so it never
       goes stale between deploys. */
    __BUILD_MONTH__: JSON.stringify(new Date().toISOString().slice(0, 7)),
  },
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
        manualChunks(id) {
          // Match by path, not entry name: React 19 renders through
          // react-dom/client and scheduler, which a ['react', 'react-dom']
          // list missed, folding the framework into the app chunk.
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/[\\/]node_modules[\\/](gsap|lenis|split-type)[\\/]/.test(id)) return 'motion'
        },
      },
    },
  },
})
