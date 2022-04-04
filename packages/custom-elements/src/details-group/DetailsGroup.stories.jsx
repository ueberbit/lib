import { html } from 'lit-html'
import './DetailsGroup.tsx'
import '../details-item/DetailsItem.tsx'
// import Docs from './docs.mdx'

export default {
  title: 'Custom Elements/Details Group',
  component: 'details-group',
  argTypes: {},
  parameters: {
    docs: {
      // page: Docs,
    },
  },
}

const Template = ({ multi }) => html`
  <details-group ?multi=${multi}>
    <details-item>
      <div slot="summary">This is the summary</div>
      More info about the details.
    </details-item>
    <details-item>
      <div slot="summary">This is the summary</div>
      More info about the details. More info about the details. More info about
      the details. More info about the details. More info about the details.
      More info about the details.
    </details-item>
    <details-item>
      <div slot="summary">This is the summary</div>
      More info about the details.
    </details-item>
  </details-group>
`

export const DetailsGroup = Template.bind({})
DetailsGroup.args = {
  multi: false,
}

export const Nested = () => html`
  <details-group>
    <details-item>
      <div slot="summary">This is the summary</div>
      <details-group>
        <details-item>
          <div slot="summary">This is the summary</div>
          More info about the details.
        </details-item>
        <details-item>
          <div slot="summary">This is the summary</div>
          More info about the details. More info about the details. More info about
          the details. More info about the details. More info about the details.
          More info about the details.
        </details-item>
        <details-item>
          <div slot="summary">This is the summary</div>
          More info about the details.
        </details-item>
      </details-group>
    </details-item>
    <details-item>
      <div slot="summary">This is the summary</div>
      More info about the details. More info about the details. More info about
      the details. More info about the details. More info about the details.
      More info about the details.
    </details-item>
    <details-item>
      <div slot="summary">This is the summary</div>
      More info about the details.
    </details-item>
  </details-group>
`