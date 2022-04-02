import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { IWindow } from 'happy-dom'

declare global {
  interface Window extends IWindow {}
  namespace JSX {
    interface Element {
      outerHTML: string
    }
  }
}

test('render simple div', () => {
  expect((<div></div>).outerHTML).toEqual('<div></div>')
})

test('render complex', () => {
  expect(
    (
      <div className="wrapper">
        <h1>Headline</h1>
        <div className="prose">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
          </p>
          <blockquote>nice!</blockquote>
          <img src="foo.bar" alt="alt is important" />
        </div>
      </div>
    ).outerHTML
  ).toEqual(
    '<div class="wrapper"><h1>Headline</h1><div class="prose"><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p><blockquote>nice!</blockquote><img src="foo.bar" alt="alt is important"/></div></div>'
  )
})

test('classname', () => {
  expect((<div className="foo"></div>).outerHTML).toEqual('<div class="foo"></div>')
})

test('data attributes', () => {
  expect((<div data-foo='bar'></div>).outerHTML).toEqual('<div data-foo="bar"></div>')
})

test('fragment', () => {
  const wrapper = <div></div>
  // @ts-expect-error types
  JSX.append(
    <>
      <div>foo</div>
      <div>bar</div>
    </>,
    wrapper
  )
  expect(wrapper.outerHTML).toEqual('<div><div>foo</div><div>bar</div></div>')
})

describe('partials', () => {
  test('with wrapper', () => {
    const foo = <h1>H1s are thicc</h1>
    const bar = <p>Lorem ipsum dolor</p>
    expect(
      (
        <div>
          {foo}
          {bar}
        </div>
      ).outerHTML
    ).toEqual('<div><h1>H1s are thicc</h1><p>Lorem ipsum dolor</p></div>')
  })

  test('with fragment', () => {
    const wrapper = <div></div>
    const foo = <h1>H1s are thicc</h1>
    const bar = <p>Lorem ipsum dolor</p>

    // @ts-expect-error types
    JSX.append(
      <>
        {foo}
        {bar}
      </>,
      wrapper
    )
    expect(wrapper.outerHTML).toEqual('<div><h1>H1s are thicc</h1><p>Lorem ipsum dolor</p></div>')
  })
})

describe('events', () => {
  test('onclick', () => {
    const spyClick = vi.fn()
    const button = (<button onClick={spyClick}>foobar</button>) as unknown as HTMLElement
    expect(button.outerHTML).toEqual('<button>foobar</button>')
    button.click()
    expect(spyClick).toHaveBeenCalled()
  })
})

describe('conditional rendering', () => {
  test('&&', () => {
    expect(
      (
        <div>
          {3 > 1 && <h1>3 is indeed larger</h1>}
          {true && <h1>quite right</h1>}
          {false && <h1>nah</h1>}
        </div>
      ).outerHTML
    ).toEqual('<div><h1>3 is indeed larger</h1><h1>quite right</h1></div>')
  })

  test('tenary', () => {
    expect((<div>{''.length === 0 ? <h1>foo</h1> : <h1>bar</h1>}</div>).outerHTML).toEqual('<div><h1>foo</h1></div>')
  })
})

describe('loops', () => {
  test('map', () => {
    expect(
      (
        <ul>
          {[1, 2, 3].map((item) => (
            <li key={item.toString()}>{item.toString()}</li>
          ))}
        </ul>
      ).outerHTML
    ).toEqual('<ul><li>1</li><li>2</li><li>3</li></ul>')
  })
})

describe('Special Cases', () => {
  test('tabindex', () => {
    expect((<div tabIndex={1}></div>).outerHTML).toEqual('<div tabindex="1"></div>')
  })
  test('srcset', () => {
    expect((<img srcSet="foo" />).outerHTML).toEqual('<img srcset="foo"/>')
  })
})

describe('render methods', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<hr />'
    await window.happyDOM.whenAsyncComplete()
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  test('append', () => {
    // @ts-expect-error types
    JSX.append(<div>foo</div>, document.body)
    expect(document.body.outerHTML).toEqual('<body><hr/><div>foo</div></body>')
  })
  test('append', () => {
    // @ts-expect-error types
    JSX.prepend(<div>foo</div>, document.body)
    expect(document.body.outerHTML).toEqual('<body><div>foo</div><hr/></body>')
  })
  test('replace', () => {
    // @ts-expect-error types
    JSX.replace(<div>foo</div>, document.body)
    expect(document.body.outerHTML).toEqual('<body><div>foo</div></body>')
  })
})
