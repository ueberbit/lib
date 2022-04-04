import { CE, reflectProp } from '@ueberbit/utilities'
import type { DetailsItem } from '../details-item/DetailsItem'
import styles from './DetailsGroup.styles.css'

export class DetailsGroup extends CE {
  multi = false
  #details: Array<DetailsItem> = []

  static styles = styles

  constructor() {
    super()
    reflectProp(this, 'multi')
  }

  render() {
    return <slot></slot>
  }
 
  connectedCallback() {
    super.connectedCallback()
    this.#details = Array.from(this.children) as DetailsItem[]
    this.addEventListener('details-show', (e) => this.handleDetailsChange(e))
  }

  disconnectedCallback() {
    this.removeEventListener('details-show', this.handleDetailsChange)
  }

  handleDetailsChange(e: Event) {
    if (this.multi) return
    if (!this.#details.find(el => el === e.target)) return
    this.#details.forEach(
      (detail) => detail !== e.target && detail.hide()
    )
  }

  showAll() {
    this.#details.forEach(detail => detail.show())
  }

  hideAll() {
    this.#details.forEach(detail => detail.hide())
  }
}

window.customElements.define('details-group', DetailsGroup)

declare global {
  interface HTMLElementTagNameMap {
    'details-group': DetailsGroup
  }
}
