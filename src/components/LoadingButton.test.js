import React from 'react'
import { mount } from 'enzyme'
import { Button, Progress } from 'reactstrap'
import LoadingButton from './LoadingButton'
describe('render', () => {
  it('renders with isLoading = false', () => {
    const loadingButton = mount(
      <LoadingButton isLoading={false}>hello</LoadingButton>
    )
    expect(loadingButton).toBeDefined()
  })
  it('renders with isLoading = true', () => {
    const loadingButton = mount(
      <LoadingButton isLoading={true}>hello</LoadingButton>
    )
    expect(loadingButton).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows button when not loading', () => {
    const loadingButton = mount(
      <LoadingButton isLoading={false}>hello</LoadingButton>
    )
    expect(loadingButton.find(Progress).length).toEqual(0)
    expect(loadingButton.find(Button).length).toBeGreaterThan(0)
  })
  it('shows progress when loading', () => {
    const loadingButton = mount(
      <LoadingButton isLoading={true}>hello</LoadingButton>
    )
    expect(loadingButton.find(Button).length).toEqual(0)
    expect(loadingButton.find(Progress).length).toBeGreaterThan(0)
  })
})
