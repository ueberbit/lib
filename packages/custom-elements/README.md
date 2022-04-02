# Custom Element Api

The custom elements are build without any external dependencies. A custom jsx renderer based on createElement is used.

Custom Elements may use CE as a base Class:

```ts
import { CE } from '@ueberbit/utilities'

export class MyElement extends CE {
  static styles = `
    :host() {
      background: red;
    }
  `

  constructor() {
    super()
  }
  render() {
    return <div>Hi</div>
  }
}
window.customElements.define('my-element', MyElement)

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
```
Make sure to call `super.connectedCallback()` when overriding `connectedCallback()`, since `render()` is called inside it.

## Styling

Styles from the static styles prop are applied to the custom Element. If supported adopted Stylesheets are used. Otherwise
style tags are used. For elements without shadow root the styles are adopted to the document itself.

```ts
...
static styles = `
  :host() {
    background: red;
  }
`
...
```

For dynamic class binding the utility classMap can be used:

```ts
import { classMap } from '@ueberbit/utilities'

...

render() {
  return (
    <div className={classMap({
      'my-cool-class': true
    })}></div>
  )
}

...
```

## Renderroot

Shadowroot is the default for renderroot. It is possible to override the renderroot with:

```ts
import { CE } from '@ueberbit/utilities'

export class LightDom extends CE {
  constructor() {
    super()
  }

  render() {
    return <div>Hello from Light Dom</div>
  }

  createRenderRoot() {
    return this
  }
}

window.customElements.define('light-dom', LightDom)

declare global {
  interface HTMLElementTagNameMap {
    'light-dom': LightDom
  }
}
```

## Attribute Reflection

Properties can be reflected as attributes with reflectProp function.

```ts
...

open: boolean

constructor() {
  super()
  reflectProp(this, 'open')
}

...
```