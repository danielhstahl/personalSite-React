import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import Research from './Research'
import { CardTitle } from 'reactstrap'
describe('render', () => {
  it('renders', () => {
    const research = mount(
      <Router>
        <Research />
      </Router>
    )
    expect(research).toBeDefined()
  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    const research = mount(
      <Router>
        <Research />
      </Router>
    )
    expect(
      research.find(CardTitle).findWhere(v => v.text() === 'Credit Risk').length
    ).toBeGreaterThan(0)
  })
  it('has operational risk card', () => {
    const research = mount(
      <Router>
        <Research />
      </Router>
    )
    expect(
      research.find(CardTitle).findWhere(v => v.text() === 'Operational Risk')
        .length
    ).toBeGreaterThan(0)
  })
  it('has credit risk extensions card', () => {
    const research = mount(
      <Router>
        <Research />
      </Router>
    )
    expect(
      research
        .find(CardTitle)
        .findWhere(v => v.text() === 'Credit Risk Extensions (unpublished)')
        .length
    ).toBeGreaterThan(0)
  })
  it('has liquidity risk card', () => {
    const research = mount(
      <Router>
        <Research />
      </Router>
    )
    expect(
      research
        .find(CardTitle)
        .findWhere(v => v.text() === 'Liquidity Risk (unpublished)').length
    ).toBeGreaterThan(0)
  })
})
