import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, send every /api request to the Express server.
    // The browser only ever sees localhost:5173, so login cookies just work.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
