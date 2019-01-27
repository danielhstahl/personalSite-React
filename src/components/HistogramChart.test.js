import React from 'react'
import { mount } from 'enzyme'
import HistogramChart from './HistogramChart'

describe('render', () => {
  it('renders', () => {
    const nav = mount(<HistogramChart data={{ '0-1': 4, '2-3': 5 }} />)
    expect(nav).toBeDefined()
  })
})
