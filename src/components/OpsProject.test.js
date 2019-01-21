import React from 'react'
import { Label, Input } from 'reactstrap'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import OpsProject from './OpsProject'

describe('render', () => {
  it('renders', () => {
    const project = mount(
      <Router>
        <OpsProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    expect(project).toBeDefined()
  })
})
describe('functionality', () => {
  it('has form fields', () => {
    const project = mount(
      <Router>
        <OpsProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const t = project.find(Label).findWhere(v => v.text() === 'Time Horizon')
    expect(t.length).toBeGreaterThan(0)
    const v0 = project.find(Label).findWhere(v => v.text() === 'X0')
    expect(v0.length).toBeGreaterThan(0)
    const a = project.find(Label).findWhere(v => v.text() === 'Speed')
    expect(a.length).toBeGreaterThan(0)
    const sigma = project.find(Label).findWhere(v => v.text() === 'Volatility')
    expect(sigma.length).toBeGreaterThan(0)
    const lambda = project.find(Label).findWhere(v => v.text() === 'lambda')
    expect(lambda.length).toBeGreaterThan(0)
    const alphaStable = project.find(Label).findWhere(v => v.text() === 'alpha')
    expect(alphaStable.length).toBeGreaterThan(0)
    const muStable = project
      .find(Label)
      .findWhere(v => v.text() === 'Shift (Stable)')
    expect(muStable.length).toBeGreaterThan(0)
    const cStable = project
      .find(Label)
      .findWhere(v => v.text() === 'Scale (Stable)')
    expect(cStable.length).toBeGreaterThan(0)
    const rho = project.find(Label).findWhere(v => v.text() === 'Correlation')
    expect(rho.length).toBeGreaterThan(0)
    const numODE = project
      .find(Label)
      .findWhere(v => v.text() === 'Steps in ODE')
    expect(numODE.length).toBeGreaterThan(0)
    const xNum = project.find(Label).findWhere(v => v.text() === 'Steps in X')
    expect(xNum.length).toBeGreaterThan(0)
    const uNum = project.find(Label).findWhere(v => v.text() === 'Steps in U')
    expect(uNum.length).toBeGreaterThan(0)
  })
  it('has defaults for form', () => {
    const project = mount(
      <Router>
        <OpsProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const t = project
      .find(Input)
      .findWhere(v => v.props().id === 't')
      .first()
    expect(t.props().value).toEqual(1)
    const v0 = project
      .find(Input)
      .findWhere(v => v.props().id === 'v0')
      .first()
    expect(v0.props().value).toEqual(1)
    const a = project
      .find(Input)
      .findWhere(v => v.props().id === 'a')
      .first()
    expect(a.props().value).toEqual(0.1)
    const sigma = project
      .find(Input)
      .findWhere(v => v.props().id === 'sigma')
      .first()
    expect(sigma.props().value).toEqual(0.3)
    const lambda = project
      .find(Input)
      .findWhere(v => v.props().id === 'lambda')
      .first()
    expect(lambda.props().value).toEqual(100)
    const alphaStable = project
      .find(Input)
      .findWhere(v => v.props().id === 'alphaStable')
      .first()
    expect(alphaStable.props().value).toEqual(1.1)
    const muStable = project
      .find(Input)
      .findWhere(v => v.props().id === 'muStable')
      .first()
    expect(muStable.props().value).toEqual(1300)
    const cStable = project
      .find(Input)
      .findWhere(v => v.props().id === 'cStable')
      .first()
    expect(cStable.props().value).toEqual(100)
    const rho = project
      .find(Input)
      .findWhere(v => v.props().id === 'rho')
      .first()
    expect(rho.props().value).toEqual(0.9)

    const numODE = project
      .find(Input)
      .findWhere(v => v.props().id === 'numODE')
      .first()
    expect(numODE.props().value).toEqual(128)
    const xNum = project
      .find(Input)
      .findWhere(v => v.props().id === 'xNum')
      .first()
    expect(xNum.props().value).toEqual(1024)
    const uNum = project
      .find(Input)
      .findWhere(v => v.props().id === 'uNum')
      .first()
    expect(uNum.props().value).toEqual(256)
  })
  it('updates fields on change', () => {
    const project = mount(
      <Router>
        <OpsProject onSubmit={() => {}} isLoading={false} isVisible={true} />
      </Router>
    )
    const t = project.find('#t').first()
    t.props().onChange({ target: { value: 5 } })
    project.update()
    expect(
      project
        .find('#t')
        .first()
        .props().value
    ).toEqual(5)
  })
})
