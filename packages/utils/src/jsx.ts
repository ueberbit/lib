import { cached } from "./misc"

/**
 * Convert jsx attributes to html attributes.
 * @param attr jsx attributes
 * @returns html attributes
 */
const jsxAttr = cached((attr: string): string => {
  // Events need to be lowercase.
  if(attr.match(/^on[A-Z]/)) return attr.toLowerCase()
  /**
   * Some attrs which are camelCase, but need to be lowercase in html5.
   * @todo complete list.
   * */ 
  if(['srcSet', 'autoPlay'].includes(attr)) return attr.toLowerCase()
  return attr
})

/**
 * Preact like ref implementation.
 * @returns 
 */
export const createRef = () => { return { current: null } }

/**
 * Render jsx without react.
 */
export const JSX = {
  Fragment: 'fragment',
  createElement(tagName: string, attrs: attributes = {}, ...children: Array<HTMLElement>) {
    if (tagName === 'fragment') return children
    const elem = Object.assign(
      document.createElement(tagName),
      Object.keys(attrs ?? {}).reduce((acc, cur) => {
        return {
          ...acc,
          [jsxAttr(cur)]: attrs[cur],
        }
      }, {})
    )
    if(attrs && 'ref' in attrs) {
      attrs.ref.current = elem
    }
    for (const child of children) {
      if (Array.isArray(child)) elem.append(...child)
      // If child is falsy continue. E.g. for 3>4 && <div>hi</div>
      if (!child) continue
      else elem.append(child)
    }
    return elem
  },
  replace(el: Children, target: RenderRoot) {
    if(!el) return
    Array.isArray(el) ? target.replaceChildren(...el) : target.replaceChildren(el)
  },
  append(el: Children, target: RenderRoot) {
    if(!el) return
    Array.isArray(el) ? target.append(...el) : target.append(el)
  },
  prepend(el: Children, target: RenderRoot) {
    if(!el) return
    Array.isArray(el) ? target.prepend(...el) : target.prepend(el)
  },
}

interface attributes {
  ref?
}

type RenderRoot = HTMLElement | DocumentFragment | ShadowRoot
type Children = Node | string | Array<HTMLElement | Element>

declare global {
  interface HTMLElement {
    replaceChildren(...nodes: (Node | string)[]): void
    ref?: {
      current: null | HTMLElement | Element
    }
  }

  interface DocumentFragment {
    replaceChildren(...nodes: (Node | string)[]): void
  }
}
