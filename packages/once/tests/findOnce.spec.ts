import { describe, expect, test } from 'vitest'
import type { IWindow } from 'happy-dom'
import { find, once } from '../src'

declare global {
  interface Window extends IWindow {}
}

const window = new Window()
const document = window.document

const dom = `
    <div class="once-me-please">1</div>
    <div class="once-me-please">
      <div class="once-me-please">
        <div class="once-me-please"></div>
      </div>
    </div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  `

describe('Test findOnce()', () => {
  test('Check if findOnce returns all elements', () => {
    document.body.innerHTML = dom
    expect(find(document)).toEqual([])

    once('.once-me-please', document)
    expect(find(document).length).toEqual(4)

    once('div', document, 'once2')
    expect(find(document, 'once2').length).toEqual(7)

    expect(find(document, 'wrong-key').length).toEqual(0)
  })
})
