import React from 'react'
import DensityChart from './DensityChart'

// This default export determines where you story goes in the story list
export default {
  title: 'DensityChart',
  component: DensityChart
}

const Template = args => <DensityChart {...args} />

export const DensityChartStoryData = Template.bind({})

DensityChartStoryData.args = {
  data: [
    { density: 0.3, at_point: 1 },
    { density: 0.4, at_point: 2 },
    { density: 0.2, at_point: 3 }
  ]
  /* the args you need here will depend on your component */
}

export const DensityChartStoryColor = Template.bind({})

DensityChartStoryColor.args = {
  data: [
    { density: 0.3, at_point: 1 },
    { density: 0.4, at_point: 2 },
    { density: 0.2, at_point: 3 }
  ],
  color: 'red'
  /* the args you need here will depend on your component */
}
