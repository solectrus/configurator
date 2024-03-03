import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteYaml({})],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Extract large dependencies into separate chunks
          if (id.includes('node_modules/survey')) return 'surveyjs'
          if (id.includes('node_modules/@vue')) return 'vue'
        }
      }
    }
  }
})
