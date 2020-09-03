import React from 'react'
import LambdaForm from './LambdaForm'
import HistogramChart from './HistogramChart'
// This default export determines where you story goes in the story list
export default {
  title: 'LambdaForm',
  component: LambdaForm
}

const Template = args => <LambdaForm {...args} />

export const LambdaFormStory = Template.bind({})

LambdaFormStory.args = {
  children: () => <p>Child</p>,
  chartComponent: HistogramChart
  /* the args you need here will depend on your component */
}
