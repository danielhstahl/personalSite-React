import React from 'react'
import DensityChart from './DensityChart'
import { render } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<DensityChart
      data={[{ density: 3, at_point: 5 }, { density: 5, at_point: 6 }]}
    />)

  })
})
