import { CE } from '@ueberbit/utilities'

// @todo move this to test.
export class LightDom extends CE {
  static styles = `
    light-dom {
      font-size: 3rem;
    }
  `

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>hi</h1>
      </div>
    )
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
