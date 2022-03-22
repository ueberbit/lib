/// <reference types="vite/client" />

declare global {
  const JSX: typeof import('@ueberbit/utilities')['JSX']

  interface Array<T> {
    at(index: number): T
  }
}

declare module 'react' {
  interface Attributes {
    part?: string
    open?: string
  }
}

export {}