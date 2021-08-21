import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Perspectives from './Perspectives'
import { render, screen } from '@testing-library/react';

describe('render', () => {
  it('renders', () => {
    render(<Router>
      <Perspectives />
    </Router>)

  })
})
describe('functionality', () => {
  it('has model development card', () => {

    render(<Router>
      <Perspectives />
    </Router>)
    const card = screen.getByText("Thoughts on model development");
    expect(card).toBeInTheDocument();

  })
  it('has develop model card', () => {
    render(<Router>
      <Perspectives />
    </Router>)
    const card = screen.getByText("How to develop a model");
    expect(card).toBeInTheDocument();

  })
  it('has model risk card', () => {
    render(<Router>
      <Perspectives />
    </Router>)
    const card = screen.getByText("Model Risk");
    expect(card).toBeInTheDocument();

  })
})
