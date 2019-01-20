import React from 'react'
import { mount } from 'enzyme'
import StandardGridElement from './StandardGridElement'
describe('render', () => {
  it('renders', () => {
    const element = mount(<StandardGridElement>hello</StandardGridElement>)
    expect(element).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows children when given children', () => {
    const element = mount(<StandardGridElement>hello</StandardGridElement>)
    expect(element.text()).toEqual('hello')
  })
})
