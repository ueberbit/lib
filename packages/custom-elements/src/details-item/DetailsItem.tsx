import {
  CE,
  animateTo,
  animations,
  classMap,
  createRef,
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
  #base = createRef()
  #header = createRef()
  #body = createRef()
  #hasIcon = false

  static styles = styles

  constructor() {
    super()

    reflectProp(this, 'open')
    reflectProp(this, 'disabled')

    this.#hasIcon = !!this.querySelectorAll('[slot=icon]').length
  }

  disconnectedCallback() {
    this.#header.current.removeEventListener('click', this.handleClick)
    this.#header.current.removeEventListener('keydown', this.handleKeyDown)
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
      <div part="base" ref={this.#base} open={this.open ? 'true' : 'false'} >
        <header
          aria-controls="content"
          aria-expanded={this.open ? 'true' : 'false'}
          part="summary"
          tabIndex={0}
          role="button"
          ref={this.#header}
          className={classMap({
            'has-icon': this.#hasIcon
          })}
          onClick={() => this.handleClick()} 
          onKeyUp={(e) => this.handleKeyDown(e as any)}
        >
          <slot name="summary"></slot>
          {this.#hasIcon ? 
            <div part="icon">
              <slot name="icon"></slot>
            </div> : <></>
          }
        </header>
        <div part="body" ref={this.#body}>
          <div part="content">
            <slot></slot>
          </div>
        </div>
      </div>
    )
  }

  update() {
    setBooleanAttr(this.#base.current, 'open', this.open)
    setBooleanAttr(this.#header.current, 'aria-expanded', this.open)
  }

  handleClick() {
    if (this.disabled) return
    this.open ? this.hide() : this.show()
    this.#header.current.focus()
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

      await stopAnimations(this.#body.current)

      this.#body.current.hidden = false
      this.update()

      const { keyframes, options } = animations.show
      await animateTo(
        this.#body.current,
        shimKeyframesHeightAuto(keyframes, this.#body.current.scrollHeight),
        options
      )
      this.#body.current.style.height = 'auto'

      emit(this, 'details-after-show')
    } else {
      // Hide
      emit(this, 'details-hide')

      await stopAnimations(this.#body.current)

      this.update()

      const { keyframes, options } = animations.hide
      await animateTo(
        this.#body.current,
        shimKeyframesHeightAuto(keyframes, this.#body.current.scrollHeight),
        options
      )
      this.#body.current.hidden = true
      this.#body.current.style.height = 'auto'

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
