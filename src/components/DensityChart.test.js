import React from 'react'
import { mount } from 'enzyme'
import DensityChart from './DensityChart'

describe('render', () => {
  it('renders', () => {
    const nav = mount(<DensityChart data={{ dx: 1, xmin: 3, y: [1, 2, 3] }} />)
    expect(nav).toBeDefined()
  })
})
