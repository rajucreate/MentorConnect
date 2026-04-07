import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['sb-7c2tw5oj1lj2.vercel.run', 'localhost', '127.0.0.1'],
  },
})
