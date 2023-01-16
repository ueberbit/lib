import { JSX, hyphenate } from './index'

/**
 * Waits for a specific event to be emitted from an element. Ignores events that bubble up from child elements.
 */
export function waitForEvent(el: HTMLElement, eventName: string) {
  return new Promise<void>((resolve) => {
    function done(event: Event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done)
        resolve()
      }
    }

    el.addEventListener(eventName, done)
  })
}

/**
 * Emits a custom event with more convenient defaults.
 */
export function emit(el: HTMLElement, name: string, options?: CustomEventInit) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: {},
    ...options,
  })
  el.dispatchEvent(event)
  return event
}

/**
 * Reflect prop as attribute.
 * @param target
 * @param propKey
 */
export const reflectProp = (target: HTMLElement | any, propKey: PropertyKey) => {
  // Boolean.
  const attr = hyphenate(propKey)
  if (typeof target[propKey] === 'boolean') {
    Object.defineProperty(target, propKey, {
      get() {
        return target.hasAttribute(attr)
      },
      set(v) {
        v ? target.setAttribute(attr, '') : target.removeAttribute(attr)
      },
    })
  }

  // String.
  if (typeof target[propKey] === 'string') {
    Object.defineProperty(target, propKey, {
      get() {
        return target.getAttribute(attr) || undefined
      },
      set(v) {
        target.setAttribute(attr, v)
      },
    })
  }

  // Number.
  if (typeof target[propKey] === 'number') {
    Object.defineProperty(target, propKey, {
      get() {
        return +target.getAttribute(attr) || undefined
      },
      set(v) {
        target.setAttribute(attr, v)
      },
    })
  }
}

/**
 * Helper for setting a boolean attribute.
 * @param el
 * @param key
 * @param val
 */
export const setBooleanAttr = (el: HTMLElement, key: string, val: boolean) => {
  // Aria Attributes always need to have a value.
  if(key.match(/^aria-/)) {
    el.setAttribute(key, val.toString())
  } else {
    val ? el.setAttribute(key, '') : el.removeAttribute(key)
  }
}

export const baseStyles = `
  :host {
    box-sizing: border-box;
    display: block;
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
  [hidden] {
    display: none !important;
  }
 `

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
export const supportsAdoptingStyleSheets =
  window.ShadowRoot && 'adoptedStyleSheets' in Document.prototype && 'replaceSync' in CSSStyleSheet.prototype

/**
 * Add constructed Stylesheet or style tag to Shadowroot of CE.
 * @param renderRoot The shadowroot of the CE..
 * @param styles The styles of the Element.
 */
export const adoptStyles = (renderRoot: ShadowRoot | HTMLElement | Document, styles: string[]) => {
  if (supportsAdoptingStyleSheets) {
    const styleSheet: CSSStyleSheet = new CSSStyleSheet()
    styleSheet.replaceSync(styles.join(' '))

    if (renderRoot instanceof HTMLElement) {
      // Skip if Stylesheet exists already.
      if (document.adoptedStyleSheets.find((sheet) => sheet.tagname === renderRoot.tagName)) return
      styleSheet.tagname = renderRoot.tagName
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet]
    } else {
      renderRoot.adoptedStyleSheets = [...renderRoot.adoptedStyleSheets, styleSheet]
    }
  } else {
    const style = document.createElement('style')
    style.textContent = styles.join(' ')

    if (renderRoot instanceof HTMLElement) {
      // Skip if Styletag exists already.
      if (document.querySelectorAll(`style[title=${renderRoot.tagName}]`).length) return
      style.title = renderRoot.tagName
      document.head.appendChild(style)
    } else {
      renderRoot.appendChild(style)
    }
  }
}

/**
 * Key Value set of class names to truthy values.
 * @param classInfo
 * @returns Class list
 */
export const classMap = (classInfo: Record<string, string | boolean | number>): string => {
  const classes = [...new Set(Object.keys(classInfo).filter((key) => classInfo[key]))].join(' ')
  // eslint-disable-next-line prefer-template
  return classes ? ' ' + classes + ' ' : ''
}

/**
 * Custom Base Element.
 */
export abstract class CE extends HTMLElement {
  readonly renderRoot: ShadowRoot | HTMLElement
  connected = false

  static styles?

  constructor() {
    super()
    this.renderRoot = this.createRenderRoot()
    this.init()
  }

  connectedCallback() {
    JSX.append(this.render(), this.renderRoot)
    if(!this.connected) {
      this.connected = true
      this.firstUpdated()
    }
  }

  firstUpdated(): void {}

  createRenderRoot(): ShadowRoot | HTMLElement {
    return this.attachShadow({ mode: 'open' })
  }

  query(selector: string): HTMLElement | HTMLSlotElement {
    return this.renderRoot.querySelector<HTMLElement | HTMLSlotElement>(selector)
  }

  queryAll(selector: string): (HTMLElement | HTMLSlotElement)[] {
    return Array.from(this.renderRoot.querySelectorAll<HTMLElement>(selector))
  }

  adoptStyles(styles: string[]) {
    adoptStyles(this.renderRoot, styles)
  }

  init() {
    adoptStyles(this.renderRoot, [
      ...(this.renderRoot instanceof ShadowRoot ? baseStyles : []),
      (this.constructor as typeof CE).styles ?? [],
    ])
  }

  render(): any {}
}

declare global {
  interface CSSStyleSheet {
    replaceSync: (text: string) => void
    tagname: string
  }

  interface ShadowRoot {
    adoptedStyleSheets: Array<CSSStyleSheet>
  }

  interface Document {
    adoptedStyleSheets: Array<CSSStyleSheet>
  }
}
