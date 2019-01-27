import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('react-ga')
describe('render', () => {
  it('renders', () => {
    const app = mount(<App />)
    expect(app).toBeDefined()
  })
})
