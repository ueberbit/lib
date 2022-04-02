import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxInject: `import { JSX } from '../src'`,
    jsxFactory: 'JSX.createElement',
    jsxFragment: 'JSX.Fragment',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
})