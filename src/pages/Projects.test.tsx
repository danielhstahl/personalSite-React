import React from 'react'

import { MemoryRouter as Router } from 'react-router-dom'
import Projects from './Projects'
import { render, screen } from '@testing-library/react';


describe('render', () => {
  it('renders', () => {
    render(<Router>
      <Projects />
    </Router>)


  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    render(<Router>
      <Projects />
    </Router>)
    const card = screen.getByText("Credit Risk");
    expect(card).toBeInTheDocument();

  })
  it('has ops risk card', () => {
    render(<Router>
      <Projects />
    </Router>)
    const card = screen.getByText("Operational Risk");
    expect(card).toBeInTheDocument();

  })
  it('has market risk card', () => {
    render(<Router>
      <Projects />
    </Router>)
    const card = screen.getByText("Market Risk");
    expect(card).toBeInTheDocument();

  })
})
