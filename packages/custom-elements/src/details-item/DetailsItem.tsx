import {
  CE,
  animateTo,
  animations,
  classMap,
  emit,
  reflectProp,
  setBooleanAttr,
  shimKeyframesHeightAuto,
  stopAnimations,
  waitForEvent,
} from '@ueberbit/utilities'
import styles from './DetailsItem.styles.css'

/**
 * 
 * @attr disabled - Disables this element.
 * @attr open - Shows open state.
 * 
 * @slot icon - Icon for summary.
 * 
 * @csspart base - The component's internal wrapper.
 * @csspart header - The component's header/summary.
 * @csspart body - The component's content wrapper.
 * @csspart content - The component's content.
 * 
 * @cssproperty --icon - CSS Icon if icon slot is not used.
 */
export class DetailsItem extends CE {
  open = false
  disabled = false

  #base: HTMLElement
  #header: HTMLElement
  #body: HTMLElement
  #hasIcon = false

  static styles = styles

  constructor() {
    super()

    reflectProp(this, 'open')
    reflectProp(this, 'disabled')

    this.#hasIcon = !!this.querySelectorAll('[slot=icon]').length
  }
  
  connectedCallback() {
    super.connectedCallback()

    this.#base = this.query('[part=base]')
    this.#header = this.query('[part=summary]')
    this.#body = this.query('[part=body]')

    this.#header.addEventListener('click', () => this.handleClick())
    this.#header.addEventListener('keyup', (e) => this.handleKeyDown(e))
  }

  disconnectedCallback() {
    this.#header.removeEventListener('click', this.handleClick)
    this.#header.removeEventListener('keydown', this.handleKeyDown)
  }

  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(attrName: string) {
    if (attrName === 'open') {
      this.handleOpenChange()
    }
  }

  render() {
    return (
      <div part="base" open={this.open ? 'true' : 'false'}>
        <header
          aria-controls="content"
          aria-expanded={this.open ? 'true' : 'false'}
          part="summary"
          tabIndex={0}
          role="button"
          className={classMap({
            'has-icon': this.#hasIcon
          })}
        >
          <slot name="summary"></slot>
          {this.#hasIcon ? 
            <div part="icon">
              <slot name="icon"></slot>
            </div> : <></>
          }
        </header>
        <div part="body">
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    )
  }

  update() {
    setBooleanAttr(this.#base, 'open', this.open)
    setBooleanAttr(this.#header, 'aria-expanded', this.open)
  }

  handleClick() {
    if (this.disabled) return
    this.open ? this.hide() : this.show()
    this.#header.focus()
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()

      if (this.open) {
        this.hide()
      } else {
        this.show()
      }
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      this.hide()
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      this.show()
    }
  }

  async show() {
    if (this.open) return undefined
    this.open = true
    return waitForEvent(this, 'details-after-show')
  }

  async hide() {
    if (!this.open) return undefined
    this.open = false
    return waitForEvent(this, 'details-after-hide')
  }

  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'details-show')

      await stopAnimations(this.#body)

      this.#body.hidden = false
      this.update()

      const { keyframes, options } = animations.show
      await animateTo(
        this.#body,
        shimKeyframesHeightAuto(keyframes, this.#body.scrollHeight),
        options
      )
      this.#body.style.height = 'auto'

      emit(this, 'details-after-show')
    } else {
      // Hide
      emit(this, 'details-hide')

      await stopAnimations(this.#body)

      this.update()

      const { keyframes, options } = animations.hide
      await animateTo(
        this.#body,
        shimKeyframesHeightAuto(keyframes, this.#body.scrollHeight),
        options
      )
      this.#body.hidden = true
      this.#body.style.height = 'auto'

      emit(this, 'details-after-hide')
    }
  }
}

window.customElements.define('details-item', DetailsItem)

declare global {
  interface HTMLElementTagNameMap {
    'details-item': DetailsItem
  }
}
