import { describe, expect, test } from 'vitest'
import type { IWindow } from 'happy-dom'
import { once, remove } from '../src'

declare global {
  interface Window extends IWindow {}
}

const window = new Window()
const document = window.document

const dom = `
   <div class="once-me-please">1</div>
   <div class="once-me-please">2</div>
   <div class="once-with-key">3</div>
   <div>4</div>
   <div>5</div>
 `

describe('Test remomveOnce()', () => {
  test('Check if removeOnce returns all elements', () => {
    document.body.innerHTML = dom
    expect(remove('.once-me-please', document)).toEqual([])

    once('.once-me-please', document)
    expect(remove('.once-me-please', document).length).toEqual(2)
  })

  test('Check if prop gets removed when set is empty', () => {
    document.body.innerHTML = dom
    expect(remove('.once-me-please', document, 'once-key')).toEqual([])

    once('.once-with-key', document, 'once-key')
    expect(
      document.querySelector('.once-with-key')!.drupalOnce?.has('once-key')
    ).toBeTruthy()
    remove('.once-with-key', document, 'once-key')
    expect('drupalOnce' in document.querySelector('.once-with-key')).toBeFalsy()
  })

  test('Check removing multiple onces', () => {
    document.body.innerHTML = dom
    once('.once-with-key', document)
    once('.once-with-key', document, 'once2')
    expect(document.querySelector('.once-with-key')!.drupalOnce?.size).toEqual(
      2
    )

    remove('.once-with-key', document, 'once')
    expect(document.querySelector('.once-with-key')!.drupalOnce?.size).toEqual(
      1
    )

    remove('.once-with-key', document, 'once2')
    expect('drupalOnce' in document.querySelector('.once-with-key')).toBeFalsy()
  })
})
