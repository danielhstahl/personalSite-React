import React from 'react'
import LambdaForm, { onSubmitHOF } from './LambdaForm'
import { render, screen } from '@testing-library/react';
const Chart = () => <div />
describe('render', () => {
  it('renders', () => {

    render(<LambdaForm chartComponent={Chart}>
      {() => <div>Hello World</div>}
    </LambdaForm>)

  })
})
describe('functionality', () => {
  it('shows children by default', () => {

    render(<LambdaForm chartComponent={Chart}>
      {() => <div>Hello World</div>}
    </LambdaForm>)
    const child = screen.getByText("Hello World");
    expect(child).toBeInTheDocument();

  })
  it('provides onSubmit, isLoading', () => {
    const mockComponent = jest.fn(() => null)
    render(<LambdaForm chartComponent={Chart}>{mockComponent}</LambdaForm>)
    const inputToComponent = mockComponent.mock.calls[0][0]
    expect(inputToComponent.onSubmit).toBeDefined()
    expect(inputToComponent.isLoading).toBeDefined()
    expect(inputToComponent.isVisible).toBeDefined()


  })
  it('isLoading is false by default', () => {
    const mockComponent = jest.fn(() => null)
    render(<LambdaForm chartComponent={Chart}>{mockComponent}</LambdaForm>)

    const inputToComponent = mockComponent.mock.calls[0][0]
    expect(inputToComponent.onSubmit).toBeDefined()
    expect(inputToComponent.isLoading).toEqual(false)
    expect(inputToComponent.isVisible).toEqual(true)
  })
  it('chart is not called by default', () => {
    const mockComponent = jest.fn(() => null)
    const mockChart = jest.fn(() => null)

    render(<LambdaForm chartComponent={Chart}>{mockComponent}</LambdaForm>)
    expect(mockChart.mock.calls.length).toEqual(0)
  })

})

describe('onSubmitHOF', () => {
  it('correctly parses data and calls fetchData with it', () => {
    const fetchData = jest.fn(() => Promise.resolve())
    const fields = { hello: '5' }
    const e = { preventDefault: () => { } }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading
    )(
      fields,
      fetchData
    )(e)
      .then(() => {
        return expect(fetchData.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(fetchData.mock.calls[0][0]).toEqual({ hello: 5 })
      })
  })
  it('correctly calls setIsLoading twice', () => {
    const fetchData = jest.fn(() => Promise.resolve())
    const fields = { hello: '5' }
    const e = { preventDefault: () => { } }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading
    )(
      fields,
      fetchData
    )(e)
      .then(() => {
        return expect(setIsLoading.mock.calls.length).toEqual(2)
      })
      .then(() => {
        return expect(setIsLoading.mock.calls[0][0]).toEqual(true)
      })
      .then(() => {
        return expect(setIsLoading.mock.calls[1][0]).toEqual(false)
      })
  })
  it('correctly calls setShowChart once', () => {
    const fetchData = jest.fn(() => Promise.resolve())
    const fields = { hello: '5' }
    const e = { preventDefault: () => { } }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading
    )(
      fields,
      fetchData
    )(e)
      .then(() => {
        return expect(setShowChart.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(setShowChart.mock.calls[0][0]).toEqual(true)
      })
  })
  it('correctly calls setChart once', () => {
    const fetchData = jest.fn(() => Promise.resolve('hello'))
    const fields = { hello: '5' }
    const e = { preventDefault: () => { } }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading
    )(
      fields,
      fetchData
    )(e)
      .then(() => {
        return expect(setChart.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(setChart.mock.calls[0][0]).toEqual('hello')
      })
  })
})
