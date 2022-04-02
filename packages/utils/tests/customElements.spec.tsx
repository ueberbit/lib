import { describe, expect, test } from 'vitest'
import type { IWindow } from 'happy-dom'
import { supportsAdoptingStyleSheets } from '../src'
import './LightDom'
import './ShadowDom'

declare global {
  interface Window extends IWindow {}
  namespace JSX {
    interface Element {
      outerHTML: string
    }
  }
}

describe('light-dom', () => {
  test('render', () => {
    document.body.innerHTML = '<light-dom></light-dom>'
    expect(document.body.innerHTML).toEqual('<light-dom><div>This is in LightDom</div></light-dom>')
  })

  test('has no shadow', () => {
    document.body.innerHTML = '<light-dom></light-dom>'
    const elem = document.querySelector('light-dom')
    expect(elem.shadowRoot).toEqual(null)
  })

  test('render with slot', () => {
    document.body.innerHTML = '<light-dom>Slot here</light-dom>'
    expect(document.body.innerHTML).toEqual('<light-dom>Slot here<div>This is in LightDom</div></light-dom>')
  })
})

describe('shadow-dom', () => {
  test('render', () => {
    document.body.innerHTML = '<shadow-dom></shadow-dom>'
    const elem = document.querySelector('shadow-dom')

    expect(document.body.innerHTML).toEqual('<shadow-dom></shadow-dom>')
    expect(elem.shadowRoot.childElementCount).toEqual(supportsAdoptingStyleSheets ? 2 : 3)
  })

  test('has shadow', () => {
    document.body.innerHTML = '<shadow-dom></shadow-dom>'
    const elem = document.querySelector('shadow-dom')
    expect(elem.shadowRoot).not.toEqual(null)
  })

  test('render with slot', () => {
    document.body.innerHTML = '<shadow-dom><div>Slot here</div></shadow-dom>'
    const elem = document.querySelector('shadow-dom')
    expect(document.body.innerHTML).toEqual('<shadow-dom><div>Slot here</div></shadow-dom>')
    expect(elem.shadowRoot.querySelector('slot').assignedElements()[0].outerHTML).toEqual('<div>Slot here</div>')
  })
})