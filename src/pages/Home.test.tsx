import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Home from './Home'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<Router>
      <Home />
    </Router>)

  })
})
describe('functionality', () => {
  it('has vision card', () => {
    render(<Router>
      <Home />
    </Router>)
    const card = screen.getByText("Vision");
    expect(card).toBeInTheDocument();

  })
  it('has summary card', () => {
    render(<Router>
      <Home />
    </Router>)
    const card = screen.getByText("Summary");
    expect(card).toBeInTheDocument();

  })
})
