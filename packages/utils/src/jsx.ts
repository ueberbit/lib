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
 * Split attributes and dataset.
 * @param attrs 
 * @returns 
 */
const parseAttr = (attrs) => {
  const attributes = Object.keys(attrs).reduce((acc,cur) => {
    if(cur.match(/^data-/)) return acc
    return {
      ...acc,
      [jsxAttr(cur)]: attrs[cur]
    }
  }, {})

  const dataset = Object.keys(attrs).filter((key) => key.match(/^data-/)).reduce((acc,cur) => {
    return {
      ...acc,
      [cur.replace('data-', '')]: attrs[cur]
    }
  }, {})

  return {
    attributes,
    dataset
  }
}

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
    const { attributes, dataset } = parseAttr(attrs ?? {})
    const elem = Object.assign(
      document.createElement(tagName),
      attributes
    )
    
    // Datasets.
    Object.entries(dataset).forEach(([key, val]: [string, string]) => elem.dataset[key] = val)
    
    // Refs.
    if(attrs && 'ref' in attrs) {
      attrs.ref.current = elem
    }
    for (const child of children) {
      if (Array.isArray(child)) {
        elem.append(...child)
        continue
      }
      // If child is falsy continue. E.g. for 3>4 && <div>hi</div>
      if (!child) continue
      elem.append(child)
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
