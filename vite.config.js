import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // allows using global test(), expect() etc.
    environment: 'jsdom',   // required to render React components
    setupFiles: './src/setupTests.js', // optional: for jest-dom
  },
})