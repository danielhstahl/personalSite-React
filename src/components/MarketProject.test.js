import React from 'react'
import { Label, Input } from 'reactstrap'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import MarketProject from './MarketProject'

describe('render', () => {
  it('renders', () => {
    const project = mount(
      <Router>
        <MarketProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    expect(project).toBeDefined()
  })
})
describe('functionality', () => {
  it('has form fields', () => {
    const project = mount(
      <Router>
        <MarketProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const n = project
      .find(Label)
      .findWhere(v => v.text() === 'Number of Simulations')
    expect(n.length).toBeGreaterThan(0)

    const r0 = project.find(Label).findWhere(v => v.text() === 'Short Rate')
    expect(r0.length).toBeGreaterThan(0)

    const sigma = project.find(Label).findWhere(v => v.text() === 'Volatility')
    expect(sigma.length).toBeGreaterThan(0)

    const a = project.find(Label).findWhere(v => v.text() === 'Mean Reversion')
    expect(a.length).toBeGreaterThan(0)

    const b = project
      .find(Label)
      .findWhere(v => v.text() === 'Long Run Average')
    expect(b.length).toBeGreaterThan(0)

    const t = project
      .find(Label)
      .findWhere(v => v.text() === 'Simulate to (in days)')
    expect(t.length).toBeGreaterThan(0)

    const T = project
      .find(Label)
      .findWhere(v => v.text() === 'Maturity (years)')
    expect(T.length).toBeGreaterThan(0)
  })
  it('has defaults for form', () => {
    const project = mount(
      <Router>
        <MarketProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const n = project
      .find(Input)
      .findWhere(v => v.props().id === 'n')
      .first()
    expect(n.props().value).toEqual(1000)

    const r0 = project
      .find(Input)
      .findWhere(v => v.props().id === 'r0')
      .first()
    expect(r0.props().value).toEqual(0.04)
    const sigma = project
      .find(Input)
      .findWhere(v => v.props().id === 'sigma')
      .first()
    expect(sigma.props().value).toEqual(0.04)
    const a = project
      .find(Input)
      .findWhere(v => v.props().id === 'a')
      .first()
    expect(a.props().value).toEqual(0.2)
    const b = project
      .find(Input)
      .findWhere(v => v.props().id === 'b')
      .first()
    expect(b.props().value).toEqual(0.05)

    const t = project
      .find(Input)
      .findWhere(v => v.props().id === 't')
      .first()
    expect(t.props().value).toEqual(10)

    const T = project
      .find(Input)
      .findWhere(v => v.props().id === 'T')
      .first()
    expect(T.props().value).toEqual(1)
  })
  it('updates fields on change', () => {
    const project = mount(
      <Router>
        <MarketProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const n = project.find('#n').first()
    n.props().onChange({ target: { value: 5 } })
    project.update()
    expect(
      project
        .find('#n')
        .first()
        .props().value
    ).toEqual(5)
  })
})
