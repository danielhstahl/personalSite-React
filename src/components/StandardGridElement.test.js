import React from 'react'
import StandardGridElement from './StandardGridElement'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<StandardGridElement>hello</StandardGridElement>)
  })
})
describe('functionality', () => {
  it('shows children when given children', () => {
    render(<StandardGridElement>hello</StandardGridElement>)
    const element = screen.getByText("hello");
    expect(element).toBeInTheDocument();
  })
})
