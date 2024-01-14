import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import About from './About'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<Router>
      <About />
    </Router>)

  })
})
describe('functionality', () => {
  it('has mathematical modeling card', () => {
    render(<Router>
      <About />
    </Router>)
    const card = screen.getByText("Mathematical Modeling");
    expect(card).toBeInTheDocument();

  })
  it('has liquidity card', () => {
    render(<Router>
      <About />
    </Router>)
    const card = screen.getByText("Liquidity Risk");
    expect(card).toBeInTheDocument();


  })
  it('has database card', () => {
    render(<Router>
      <About />
    </Router>)
    const card = screen.getByText("Data");
    expect(card).toBeInTheDocument();


  })
  it('has fintech card', () => {
    render(<Router>
      <About />
    </Router>)
    const card = screen.getByText("Fintech");
    expect(card).toBeInTheDocument();

  })
  it('has passions card', () => {
    render(<Router>
      <About />
    </Router>)
    const card = screen.getByText("Passions");
    expect(card).toBeInTheDocument();

  })
})
