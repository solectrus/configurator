import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // GZIP compression as .gz files
    compression({ algorithms: ['gzip'], exclude: [/\.(br)$/, /\.(gz)$/] }),
    // Brotli compression as .br files
    compression({ algorithms: ['brotliCompress'], exclude: [/\.(br)$/, /\.(gz)$/] }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Extract large dependencies into separate chunks
          if (id.includes('node_modules/survey')) return 'surveyjs'
          else if (id.includes('node_modules/@vue') || id.includes('node_modules/pinia'))
            return 'vue'
        },
      },
    },
  },
})
