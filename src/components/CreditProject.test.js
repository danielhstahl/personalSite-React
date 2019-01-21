import React from 'react'
import { Label, Input } from 'reactstrap'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import CreditProject from './CreditProject'

describe('render', () => {
  it('renders', () => {
    const project = mount(
      <Router>
        <CreditProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    expect(project).toBeDefined()
  })
})
describe('functionality', () => {
  it('has form fields', () => {
    const project = mount(
      <Router>
        <CreditProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const n = project
      .find(Label)
      .findWhere(v => v.text() === 'Number of Assets')
    expect(n.length).toBeGreaterThan(0)
    const t = project.find(Label).findWhere(v => v.text() === 'Time Horizon')
    expect(t.length).toBeGreaterThan(0)
    const x = project.find(Label).findWhere(v => v.text() === 'X0')
    expect(x.length).toBeGreaterThan(0)
    const alpha = project
      .find(Label)
      .findWhere(v => v.text() === 'Systemic Drift')
    expect(alpha.length).toBeGreaterThan(0)
    const sigma = project
      .find(Label)
      .findWhere(v => v.text() === 'Systemic Volatility')
    expect(sigma.length).toBeGreaterThan(0)
    const q = project.find(Label).findWhere(v => v.text() === 'q')
    expect(q.length).toBeGreaterThan(0)
    const lambda = project.find(Label).findWhere(v => v.text() === 'lambda')
    expect(lambda.length).toBeGreaterThan(0)
    const xNum = project.find(Label).findWhere(v => v.text() === 'Steps in X')
    expect(xNum.length).toBeGreaterThan(0)
    const uNum = project.find(Label).findWhere(v => v.text() === 'Steps in U')
    expect(uNum.length).toBeGreaterThan(0)
  })
  it('has defaults for form', () => {
    const project = mount(
      <Router>
        <CreditProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const n = project
      .find(Input)
      .findWhere(v => v.props().id === 'n')
      .first()
    expect(n.props().value).toEqual(100000)
    const t = project
      .find(Input)
      .findWhere(v => v.props().id === 't')
      .first()
    expect(t.props().value).toEqual(1)
    const x = project
      .find(Input)
      .findWhere(v => v.props().id === 'x0')
      .first()
    expect(x.props().value).toEqual(1)
    const alpha = project
      .find(Input)
      .findWhere(v => v.props().id === 'alpha')
      .first()
    expect(alpha.props().value).toEqual(0.1)
    const sigma = project
      .find(Input)
      .findWhere(v => v.props().id === 'sigma')
      .first()
    expect(sigma.props().value).toEqual(0.3)
    const q = project
      .find(Input)
      .findWhere(v => v.props().id === 'q')
      .first()
    expect(q.props().value).toEqual(0.05)
    const lambda = project
      .find(Input)
      .findWhere(v => v.props().id === 'lambda')
      .first()
    expect(lambda.props().value).toEqual(0.05)
    const xNum = project
      .find(Input)
      .findWhere(v => v.props().id === 'xNum')
      .first()
    expect(xNum.props().value).toEqual(1024)
    const uNum = project
      .find(Input)
      .findWhere(v => v.props().id === 'uNum')
      .first()
    expect(uNum.props().value).toEqual(128)
  })
  it('updates fields on change', () => {
    const project = mount(
      <Router>
        <CreditProject onSubmit={() => {}} isLoading={false} isVisible={true} />
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
