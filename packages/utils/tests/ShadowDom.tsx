import { CE } from '../src'

// @todo move this to test.
export class ShadowDom extends CE {
  static styles = `
    :host() {
      font-size: 3rem;
    }
  `

  constructor() {
    super()
  }

  render() {
    return (
      <>
        <div>This is in ShadowDom</div>
        <slot></slot>
      </>
    )
  }
}

window.customElements.define('shadow-dom', ShadowDom)

declare global {
  interface HTMLElementTagNameMap {
    'shadow-dom': ShadowDom
  }
}
