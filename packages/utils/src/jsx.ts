import { cached } from "./misc"

/**
 * Convert jsx attributes to html attributes/props.
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
 * Check if this can be set as dom prop.
 * @param el Current Element.
 * @param key Property Key.
 * @returns if key is a prop on Element.
 */
const shouldSetAsProp = (el: Element, key: string): boolean => {
  if (key === 'spellcheck' || key === 'draggable' || key === 'translate') return false

  // form property on form elements is readonly and must be set as attribute.
  if (key === 'form') return false

  // <input list> must be set as attribute
  if (key === 'list' && el.tagName === 'INPUT') return false

  // <textarea type> must be set as attribute
  if (key === 'type' && el.tagName === 'TEXTAREA') return false

  if (key === 'part') return false

  if (key === 'ref') return true
  
  if (key === 'key') return true

  if (key.match(/^on/)) return true

  return key in el
}

/**
 * Split attributes and dataset.
 * @param el HTMLElement which is created.
 * @param attrs Attributes which are being set.
 * @returns Object with separated attributes, dataset and props.
 */
const parseAttr = (el, attrs) => {
  const dataset = Object.keys(attrs).filter((key) => key.match(/^data-/)).reduce((acc,cur) => {
    return {
      ...acc,
      [cur.replace('data-', '')]: attrs[cur]
    }
  }, {})

  const props = {}

  const attributes = Object.keys(attrs).reduce((acc,cur) => {
    const jsxProp = jsxAttr(cur)
    if(cur.match(/^data-/)) return acc
    if(shouldSetAsProp(el, jsxProp)) {
      props[jsxProp] = attrs[cur]
      return acc
    }
    if(attrs[cur] === 'false' || !attrs[cur]) {
      return acc
    }
    return {
      ...acc,
      [jsxProp]: attrs[cur]
    }
  }, {})

  return {
    dataset,
    props,
    attributes
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
    
    const el = document.createElement(tagName)
    const { dataset, props, attributes } = parseAttr(el, attrs ?? {})
    Object.assign(el, props)

    Object.entries(attributes).forEach(([key, val]: [string, string]) => el.setAttribute(key, val))
    
    // Datasets.
    Object.entries(dataset).forEach(([key, val]: [string, string]) => el.dataset[key] = val)
    
    // Refs.
    if(attrs && 'ref' in attrs) {
      attrs.ref.current = el
    }
    for (const child of children) {
      if (Array.isArray(child)) {
        el.append(...child)
        continue
      }
      // If child is falsy continue. E.g. for 3>4 && <div>hi</div>
      if (!child) continue
      el.append(child)
    }
    return el
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
