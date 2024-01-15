import React from 'react'
import Flip from './Flip'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {

    render(<Flip open={true} onClose={() => { }}>
      {() => 'hello'}
    </Flip>)
  })
})
describe('functionality', () => {
  it('shows close button when open', () => {
    render(<Flip open={true} onClose={() => { }}>
      {() => 'hello'}
    </Flip>)
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

  })
  it('shows children when open', () => {
    render(<Flip open={true} onClose={() => { }}>
      {() => 'hello'}
    </Flip>)

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    const child = screen.getByText("hello")
    expect(child).toBeInTheDocument();


  })
  it('does not show children when closed', () => {
    render(<Flip open={false} onClose={() => { }}>
      {() => 'hello'}
    </Flip>)
    const child = screen.queryByText("hello")
    expect(child).not.toBeInTheDocument();

  })
  it('does not show close button when closed', () => {
    render(<Flip open={false} onClose={() => { }}>
      {() => 'hello'}
    </Flip>)
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();

  })
})
