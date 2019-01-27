import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import About from './About'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(about).toBeDefined()
  })
})
describe('functionality', () => {
  it('has mathematical modeling card', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(
      about.find(CardTitle).findWhere(v => v.text() === 'Mathematical Modeling')
        .length
    ).toBeGreaterThan(0)
  })
  it('has liquidity card', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(
      about.find(CardTitle).findWhere(v => v.text() === 'Liquidity Risk').length
    ).toBeGreaterThan(0)
  })
  it('has database card', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(
      about.find(CardTitle).findWhere(v => v.text() === 'Data').length
    ).toBeGreaterThan(0)
  })
  it('has fintech card', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(
      about.find(CardTitle).findWhere(v => v.text() === 'Fintech').length
    ).toBeGreaterThan(0)
  })
  it('has passions card', () => {
    const about = mount(
      <Router>
        <About />
      </Router>
    )
    expect(
      about.find(CardTitle).findWhere(v => v.text() === 'Passions').length
    ).toBeGreaterThan(0)
  })
})
