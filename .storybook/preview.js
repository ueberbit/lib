import '../styles/all.css'
import { addParameters, setCustomElements } from '@storybook/web-components'
import customElements from '../packages/custom-elements/dist/custom-elements.json'

/**
 * Remove private class members from controls.
 */
customElements.modules.forEach((module) => {
  module.declarations.forEach((declaration) => {
    declaration.members = declaration.members
      .filter((member) => member.privacy !== 'private')
      .filter((member) => !member.static)
  })
})

setCustomElements(customElements)

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
})
