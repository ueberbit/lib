import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxInject: `import { JSX } from '@ueberbit/utilities'`,
    jsxFactory: 'JSX.createElement',
    jsxFragment: 'JSX.Fragment',
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index.js',
      formats: ['es']
    },
  },
})