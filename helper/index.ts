import { unsafeStatic } from 'lit-html/static.js'
export { html } from 'lit-html/static.js'

export const attr = (args) =>
  unsafeStatic(
    Object.keys(args).reduce(
      (acc, curr) => (args[curr] || typeof args[curr] === 'number' ? `${acc} ${curr}=${args[curr]}` : `${acc}`),
      ''
    )
  )
