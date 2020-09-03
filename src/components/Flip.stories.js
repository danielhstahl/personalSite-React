import React from 'react'
import Flip from './Flip'
// This default export determines where you story goes in the story list
export default {
  title: 'Flip',
  component: Flip
}

const Template = args => <Flip {...args} />

export const FlipOpen = Template.bind({})

FlipOpen.args = {
  children: () => <p>Child</p>,
  open: true,
  onClose: () => alert('you closed')
  /* the args you need here will depend on your component */
}

export const FlipClose = Template.bind({})
FlipClose.args = {
  children: () => <p>Child</p>,
  open: false,
  onClose: () => alert('you closed')
  /* the args you need here will depend on your component */
}
