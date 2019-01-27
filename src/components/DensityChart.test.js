import React from 'react'
import { mount } from 'enzyme'
import DensityChart from './DensityChart'

describe('render', () => {
  it('renders', () => {
    const nav = mount(
      <DensityChart
        data={[{ density: 3, at_point: 5 }, { density: 5, at_point: 6 }]}
      />
    )
    expect(nav).toBeDefined()
  })
})
