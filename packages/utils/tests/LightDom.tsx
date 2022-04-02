import { CE } from '../src'

// @todo move this to test.
export class LightDom extends CE {
  static styles = `
    light-dom {
      display: block;
      width: 50px;
      height: 50px;
    }
  `

  constructor() {
    super()
  }

  render() {
    return (
      <div>This is in LightDom</div>
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
