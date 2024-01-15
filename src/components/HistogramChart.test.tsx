import React from 'react'
import HistogramChart from './HistogramChart'


import { render } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<HistogramChart
      data={{ '0-1': 4, '2-3': 5 }}
      color="blue"
    />)

  })
})
