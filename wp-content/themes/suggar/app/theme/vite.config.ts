import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Defina o nome do arquivo gerado
        assetFileNames: '[name].[extname]',
      },
    },
  },
  plugins: [react()],
})
