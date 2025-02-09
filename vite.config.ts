import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

import { brotliCompress } from 'zlib'
import { promisify } from 'util'
import gzipPlugin from 'rollup-plugin-gzip'

const brotliPromise = promisify(brotliCompress)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    rollupOptions: {
      plugins: [
        // GZIP compression as .gz files
        gzipPlugin(),
        // Brotli compression as .br files
        gzipPlugin({
          customCompression: (content) => brotliPromise(Buffer.from(content)),
          fileName: '.br',
        }),
      ],
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
