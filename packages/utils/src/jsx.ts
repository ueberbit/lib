/**
 * Render jsx without react.
 */
export const JSX = {
  Fragment: 'fragment',
  createElement(tagName: string, attrs = {}, ...children: Array<HTMLElement>) {
    if (tagName === 'fragment') return children
    const elem = Object.assign(document.createElement(tagName), attrs)
    for (const child of children) {
      if (Array.isArray(child)) elem.append(...child)
      if(!child) continue
      else elem.append(child)
    }
    return elem
  },
  replace(el: Children, target: RenderRoot) {
    Array.isArray(el)
      ? target.replaceChildren(...el)
      : target.replaceChildren(el)
  },
  append(el: Children, target: RenderRoot) {
    Array.isArray(el)
      ? target.append(...el)
      : target.append(el)
  },
  prepend(el: Children, target: RenderRoot) {
    Array.isArray(el)
      ? target.prepend(...el)
      : target.prepend(el)
  }
}

type RenderRoot = HTMLElement | DocumentFragment | ShadowRoot
type Children = Node | string | Array<HTMLElement|Element>

// declare module 'react' {
//   namespace JSX {
//     interface Element extends HTMLElement {}
//   }
// }
// interface ReactElement extends JSX.Element {}

declare global {
  interface HTMLElement {
    replaceChildren(...nodes: (Node | string)[]): void;
  }
  
  interface DocumentFragment {
    replaceChildren(...nodes: (Node | string)[]): void;
  }
}