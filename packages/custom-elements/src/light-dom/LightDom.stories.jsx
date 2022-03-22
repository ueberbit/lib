import { html } from 'lit-html'
import './LightDom'

export default {
  title: 'Custom Elements/Light Dom',
  component: 'light-dom',
}

const Template = () => html`
  <light-dom>abc</light-dom>
`

export const LightDom = Template.bind({})
