import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 80,
    host: true, // <--- Add this! This exposes the server to the internet
    strictPort: true,
  },
  plugins: [react(), tailwindcss()],
})
