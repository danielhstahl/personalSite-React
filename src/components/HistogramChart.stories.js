import React from 'react'
import HistogramChart from './HistogramChart'

// This default export determines where you story goes in the story list
export default {
  title: 'HistogramChart',
  component: HistogramChart
}

const Template = args => <HistogramChart {...args} />

export const HistogramChartStoryData = Template.bind({})

HistogramChartStoryData.args = {
  data: { bin1: 4, bin2: 3 }
  /* the args you need here will depend on your component */
}

export const HistogramChartStoryColor = Template.bind({})

HistogramChartStoryColor.args = {
  data: { bin1: 4, bin2: 3 },
  color: 'red'
  /* the args you need here will depend on your component */
}
