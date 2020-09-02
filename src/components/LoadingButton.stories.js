import React from 'react'
import LoadingButton from './LoadingButton'
// This default export determines where you story goes in the story list
export default {
  title: 'LoadingButton',
  component: LoadingButton
}

const Template = args => <LoadingButton {...args} />

export const LoadingButtonLoading = Template.bind({})

LoadingButtonLoading.args = {
  children: <p>Child</p>,
  isLoading: true,
  color: 'red'
  /* the args you need here will depend on your component */
}

export const LoadingButtonNotLoading = Template.bind({})

LoadingButtonNotLoading.args = {
  children: <p>Child</p>,
  isLoading: false,
  color: 'red'
  /* the args you need here will depend on your component */
}
