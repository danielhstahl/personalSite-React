import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Home from './Home'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(home).toBeDefined()
  })
})
describe('functionality', () => {
  it('has vision card', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(
      home.find(CardTitle).findWhere(v => v.text() === 'Vision').length
    ).toBeGreaterThan(0)
  })
  it('has summary card', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(
      home.find(CardTitle).findWhere(v => v.text() === 'Summary').length
    ).toBeGreaterThan(0)
  })
})
