import React from 'react'

import LoadingButton from './LoadingButton'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders with isLoading = false', () => {
    render(<LoadingButton isLoading={false}>hello</LoadingButton>)
    const button = screen.getByText("hello");
    expect(button).toBeInTheDocument();

  })
  it('renders with isLoading = true', () => {
    render(<LoadingButton isLoading={true}>hello</LoadingButton>)
    const button = screen.queryByText("hello");
    expect(button).not.toBeInTheDocument();

  })
})
describe('functionality', () => {
  it('shows button when not loading', () => {

    render(<LoadingButton isLoading={false}>hello</LoadingButton>)
    const button = screen.getByText("hello");
    expect(button).toBeInTheDocument();
    const progress = screen.queryByRole("progressbar")
    expect(progress).not.toBeInTheDocument();

  })
  it('shows progress when loading', () => {

    render(<LoadingButton isLoading={true}>hello</LoadingButton>)
    const button = screen.queryByText("hello");
    expect(button).not.toBeInTheDocument();
    const progress = screen.getByRole("progressbar")
    expect(progress).toBeInTheDocument();
  })
})
