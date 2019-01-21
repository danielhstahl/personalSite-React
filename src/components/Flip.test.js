import React from 'react'
import { mount } from 'enzyme'
import Flip from './Flip'
import { Button } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const flip = mount(
      <Flip open={true} onClose={() => {}}>
        {() => 'hello'}
      </Flip>
    )
    expect(flip).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows close button when open', () => {
    const flip = mount(
      <Flip open={true} onClose={() => {}}>
        {() => 'hello'}
      </Flip>
    )
    const button = flip.find(Button)
    expect(button.props().close).toEqual(true)
  })
  it('shows children when open', () => {
    const flip = mount(
      <Flip open={true} onClose={() => {}}>
        {() => 'hello'}
      </Flip>
    )
    expect(flip.text()).toContain('hello')
  })
  it('does not show children when closed', () => {
    const flip = mount(
      <Flip open={false} onClose={() => {}}>
        {() => 'hello'}
      </Flip>
    )
    expect(flip.text()).toBeNull()
  })
  it('does not show close button when closed', () => {
    const flip = mount(
      <Flip open={false} onClose={() => {}}>
        {() => 'hello'}
      </Flip>
    )
    expect(flip.find(Button).length).toEqual(0)
  })
})
