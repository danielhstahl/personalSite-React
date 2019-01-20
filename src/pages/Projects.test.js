import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Projects from './Projects'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const home = mount(
      <Router>
        <Projects />
      </Router>
    )
    expect(home).toBeDefined()
  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(
      home.find(CardTitle).findWhere(v => v.text() === 'Credit Risk').length
    ).toBeGreaterThan(0)
  })
  it('has ops risk card', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(
      home.find(CardTitle).findWhere(v => v.text() === 'Operational Risk')
        .length
    ).toBeGreaterThan(0)
  })
  it('has market risk card', () => {
    const home = mount(
      <Router>
        <Home />
      </Router>
    )
    expect(
      home.find(CardTitle).findWhere(v => v.text() === 'Market Risk').length
    ).toBeGreaterThan(0)
  })
})
