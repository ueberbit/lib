import { describe, expect, it, test } from 'vitest'
import type { IWindow } from 'happy-dom'
import { once } from '../src'

declare global {
  interface Window extends IWindow {}
}

const window = new Window()
const document = window.document

const dom = `
   <div class="once-me-please">1</div>  
   <div class="once-me-please">2</div>
   <div class="once-with-key">3</div>
   <div class="nested">
    <div class="child">
    </div>
   </div>
   <div class="child"></div>
   <div>5</div>
 `

describe('Test once()', () => {
  document.body.innerHTML = dom

  it('should return onced elements', () => {
    expect(once('.once-me-please', document).length).toBe(2)
  })

  it('should return only nested onced element', () => {
    expect(once('.child', document.querySelector('.nested')).length).toBe(1)
  })

  it('should return not return already onced elements', () => {
    expect(once('.once-me-please', document).length).toBe(0)
  })

  test('Check if elements were onced', () => {
    document.querySelectorAll('.once-me-please').forEach((element) => {
      expect(element.drupalOnce?.has('once')).toBeTruthy
    })
  })

  test('Check if other elements did not get onced', () => {
    document.querySelectorAll(':not(.once-me-please)').forEach((element) => {
      expect('drupalOnce' in element).toBeFalsy
    })
  })
})

describe('Test once() with custom key', () => {
  document.body.innerHTML = dom

  test('Check if once returns all elements', () => {
    expect(once('.once-with-key', document, 'myOnceKey').length).toBe(1)
  })

  test('Check if elements were onced', () => {
    document.querySelectorAll('.once-with-key').forEach((element) => {
      expect(element.drupalOnce?.has('myOnceKey')).toBeTruthy
    })
  })

  test('Check if other elements did not get onced', () => {
    document.querySelectorAll(':not(.once-with-key)').forEach((element) => {
      expect('drupalOnce' in element).toBeFalsy
    })
  })
})

describe('Test once() with multiple keys', () => {
  document.body.innerHTML = dom

  test('Check if all 3 once keys are present', () => {
    once('.once-with-key', document, 'myOnceKey')
    once('.once-with-key', document, 'myOnceKey2')
    once('.once-with-key', document, 'myOnceKey3')
    const element = document.querySelector('.once-with-key')!

    expect('drupalOnce' in Element).toBeTruthy
    expect(element.drupalOnce?.size).toEqual(3)
    expect(element.drupalOnce?.has('myOnceKey'))
    expect(element.drupalOnce?.has('myOnceKey2'))
    expect(element.drupalOnce?.has('myOnceKey3'))
  })
})
