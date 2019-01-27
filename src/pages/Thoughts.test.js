import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Thoughts from './Thoughts'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const thoughts = mount(
      <Router>
        <Thoughts />
      </Router>
    )
    expect(thoughts).toBeDefined()
  })
})
describe('functionality', () => {
  it('has model development card', () => {
    const thoughts = mount(
      <Router>
        <Thoughts />
      </Router>
    )
    expect(
      thoughts
        .find(CardTitle)
        .findWhere(v => v.text() === 'Thoughts on model development').length
    ).toBeGreaterThan(0)
  })
  it('has develop model card', () => {
    const thoughts = mount(
      <Router>
        <Thoughts />
      </Router>
    )
    expect(
      thoughts
        .find(CardTitle)
        .findWhere(v => v.text() === 'How to develop a model').length
    ).toBeGreaterThan(0)
  })
  it('has model risk card', () => {
    const thoughts = mount(
      <Router>
        <Thoughts />
      </Router>
    )
    expect(
      thoughts.find(CardTitle).findWhere(v => v.text() === 'Model Risk').length
    ).toBeGreaterThan(0)
  })
})
