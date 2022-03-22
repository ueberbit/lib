import { attr, html } from '~helper'
// import { html } from 'lit-html'
import './DetailsItem.tsx'

// // More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Custom Elements/Details Item',
  component: 'details-item',
}

const Template = (args) => html`
  <details-item ${attr(args)}>
    <div slot="summary">This is the summary</div>
    More info about the details.
  </details-item>
`

const WithIcon = (args) => html`
  <details-item ${attr(args)}>
    <div slot="icon">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="currentColor"><path d="m14.854 11.974l1.415-1.414l-4.243-4.243l-4.243 4.243l1.414 1.414l1.829-1.828v7.537h2v-7.537l1.828 1.828Z"></path><path fill-rule="evenodd" d="M1 19a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v14Zm4 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" clip-rule="evenodd"></path></g></svg>
    </div>
    <div slot="summary">This is the summary</div>
    More info about the details.
  </details-item>
`

export const DetailsItem = Template.bind({})
export const IconSlot = WithIcon.bind({})