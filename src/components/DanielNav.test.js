import React from 'react'
import { NavbarBrand, DropdownToggle } from 'reactstrap'
import { mount } from 'enzyme'
import { MemoryRouter as Router, Link } from 'react-router-dom'
import DanielNav from './DanielNav'

describe('render', () => {
  it('renders', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    expect(nav).toBeDefined()
  })
})
describe('functionality', () => {
  it('has daniel in logo area', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const brand = nav.find(NavbarBrand)
    expect(brand.first().text()).toEqual('Daniel Stahl')
  })
  it('has link to research', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const research = nav.find(Link).findWhere(v => v.text() === 'Research')
    expect(research.length).toBeGreaterThan(0)
  })
  it('has link to projects', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const projects = nav.find(Link).findWhere(v => v.text() === 'Projects')
    expect(projects.length).toBeGreaterThan(0)
  })
  it('has link to thoughts', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const thoughts = nav.find(Link).findWhere(v => v.text() === 'Perspectives')
    expect(thoughts.length).toBeGreaterThan(0)
  })
  it('has link to about', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const about = nav.find(Link).findWhere(v => v.text() === 'About')
    expect(about.length).toBeGreaterThan(0)
  })
  it('has link to connect', () => {
    const nav = mount(
      <Router>
        <DanielNav />
      </Router>
    )
    const dropdown = nav.find(DropdownToggle)
    expect(dropdown.length).toBeGreaterThan(0)
    expect(dropdown.first().text()).toEqual('Connect')
  })
})
