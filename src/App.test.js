import React from 'react'
import App from './App'
jest.mock('react-ga')
import { render, screen } from '@testing-library/react';

describe('render', () => {
  it('renders', () => {
    render(<App />)

  })
})
