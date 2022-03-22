const ONCE_PROP = 'drupalOnce'
const DEFAULT_KEY = 'once'

declare global {
  interface Element {
    [ONCE_PROP]?: Set<string>
  }
}

/**
 * Applies drupalOnce DOM property.
 * @param selector CSS Selector.
 * @param context Context for querySelectorAll.
 * @param key Key to use as once ID.
 * @returns Array of onced elements.
 */
export const once = (
  selector: string,
  context: Document | Element = document,
  key: string = DEFAULT_KEY
): Array<Element> => {
  return Array.from(context.querySelectorAll(selector)).filter(
    (element: Element) => {
      if (ONCE_PROP in element) {
        if (element[ONCE_PROP].has(key)) return false
        element[ONCE_PROP].add(key)
      } else {
        element[ONCE_PROP] = new Set([key])
      }
      return true
    }
  )
}

/**
 * Removes drupalOnce DOM property.
 * @param selector CSS Selector.
 * @param context Context for querySelectorAll.
 * @param key Key to use as once ID.
 * @returns Array with Elements which once has been removed.
 */
export const remove = (
  selector: string,
  context: Document | Element = document,
  key: string = DEFAULT_KEY
): Array<Element> => {
  return Array.from(context.querySelectorAll(selector)).filter(
    (element: Element) => {
      if ((ONCE_PROP in element)) return false
      if (element[ONCE_PROP].size === 1) {
        delete element[ONCE_PROP]
      } else {
        element[ONCE_PROP].delete(key)
      }
      return true
    }
  )
}

/**
 * Finds alls Elements with drupalOnce id.
 * @param context Context for querySelectorAll.
 * @param key Key to use as once ID.
 * @returns Array with Elements which were onced.
 */
export const find = (
  context: Document | Element = document,
  key: string = DEFAULT_KEY
): Array<Element> => {
  return Array.from(context.querySelectorAll('*')).filter((element: Element) => {
    if ((ONCE_PROP in element)) return false
    if (element[ONCE_PROP].has(key)) return false
    return true
  })
}
