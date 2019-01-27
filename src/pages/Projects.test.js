import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Projects from './Projects'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const projects = mount(
      <Router>
        <Projects />
      </Router>
    )
    expect(projects).toBeDefined()
  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    const projects = mount(
      <Router>
        <Projects />
      </Router>
    )
    expect(
      projects.find(CardTitle).findWhere(v => v.text() === 'Credit Risk').length
    ).toBeGreaterThan(0)
  })
  it('has ops risk card', () => {
    const projects = mount(
      <Router>
        <Projects />
      </Router>
    )
    expect(
      projects.find(CardTitle).findWhere(v => v.text() === 'Operational Risk')
        .length
    ).toBeGreaterThan(0)
  })
  it('has market risk card', () => {
    const projects = mount(
      <Router>
        <Projects />
      </Router>
    )
    expect(
      projects.find(CardTitle).findWhere(v => v.text() === 'Market Risk').length
    ).toBeGreaterThan(0)
  })
})
