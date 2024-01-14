import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Research from './Research'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<Router>
      <Research />
    </Router>)

  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Credit Risk");
    expect(card).toBeInTheDocument();

  })
  it('has operational risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Operational Risk");
    expect(card).toBeInTheDocument();

  })
  it('has credit risk extensions card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Credit Risk Extensions (unpublished)");
    expect(card).toBeInTheDocument();

  })
  it('has liquidity risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Liquidity Risk (unpublished)");
    expect(card).toBeInTheDocument();

  })
})
