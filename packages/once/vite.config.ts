import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'happy-dom', // or 'jsdom', 'node'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      // name: 'DrupalOnce',
      fileName: 'index',
      formats: ['es']
    },
  },
})