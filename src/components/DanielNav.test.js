import React from 'react'

import { MemoryRouter as Router, Link } from 'react-router-dom'
import DanielNav from './DanielNav'

import { render, screen } from '@testing-library/react';

describe('render', () => {
  it('renders', () => {
    render(<Router><DanielNav /></Router>)
    const head = screen.getByText(/Daniel Stahl/i);
    expect(head).toBeInTheDocument();
  })
})
describe('functionality', () => {
  it('has daniel in logo area', () => {
    render(<Router><DanielNav /></Router>)
    const head = screen.getByText(/Daniel Stahl/i);
    expect(head).toBeInTheDocument();
  })
  it('has link to research', () => {
    render(<Router><DanielNav /></Router>)
    const link = screen.getByText(/Research/i);
    expect(link).toBeInTheDocument();

  })
  it('has link to projects', () => {
    render(<Router><DanielNav /></Router>)
    const link = screen.getByText(/Projects/i);
    expect(link).toBeInTheDocument();

  })
  it('has link to thoughts', () => {
    render(<Router><DanielNav /></Router>)
    const link = screen.getByText(/Perspectives/i);
    expect(link).toBeInTheDocument();

  })
  it('has link to about', () => {
    render(<Router><DanielNav /></Router>)
    const link = screen.getByText(/About/i);
    expect(link).toBeInTheDocument();

  })
  it('has link to connect', () => {
    render(<Router><DanielNav /></Router>)
    const link = screen.getByText(/About/i);
    expect(link).toBeInTheDocument();

  })
})
