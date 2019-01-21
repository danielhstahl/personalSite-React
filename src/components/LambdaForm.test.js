import React from 'react'
import { mount } from 'enzyme'
import LambdaForm, { onSubmitHOF } from './LambdaForm'
const Chart = () => <div />
describe('render', () => {
  it('renders', () => {
    const lform = mount(
      <LambdaForm chartComponent={Chart}>
        {() => <div>Hello World</div>}
      </LambdaForm>
    )
    expect(lform).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows children by default', () => {
    const lform = mount(
      <div>
        <LambdaForm chartComponent={Chart}>
          {() => <div>Hello World</div>}
        </LambdaForm>
      </div>
    )
    expect(lform.text()).toEqual('Hello World')
  })
  it('provides onSubmit, isLoading', () => {
    const mockComponent = jest.fn(() => null)
    const lform = mount(
      <LambdaForm chartComponent={Chart}>{mockComponent}</LambdaForm>
    )
    const inputToComponent = mockComponent.mock.calls[0][0]
    expect(inputToComponent.onSubmit).toBeDefined()
    expect(inputToComponent.isLoading).toBeDefined()
  })
  it('isLoading is false by default', () => {
    const mockComponent = jest.fn(() => null)
    const lform = mount(
      <LambdaForm chartComponent={Chart}>{mockComponent}</LambdaForm>
    )
    const inputToComponent = mockComponent.mock.calls[0][0]
    expect(inputToComponent.onSubmit).toBeDefined()
    expect(inputToComponent.isLoading).toEqual(false)
  })
  it('chart is not called by default', () => {
    const mockComponent = jest.fn(() => null)
    const mockChart = jest.fn(() => null)
    const lform = mount(
      <LambdaForm chartComponent={mockChart}>{mockComponent}</LambdaForm>
    )
    //const inputToComponent1=mockComponent.mock.calls[0][0]
    //const mockFetch=jest.fn(()=>Promise.resolve())
    expect(mockChart.mock.calls.length).toEqual(0)
  })
  it('shows chart when submit is called', () => {
    const mockComponent = jest.fn(() => <div>Hello World</div>)
    const mockChart = jest.fn(() => null)
    const lform = mount(
      <LambdaForm chartComponent={mockChart}>{mockComponent}</LambdaForm>
    )
    const inputToComponent1 = mockComponent.mock.calls[0][0]
    const mockFetch = jest.fn(() => Promise.resolve('world'))
    inputToComponent1
      .onSubmit({ field1: '5' }, mockFetch)({ preventDefault: () => {} })
      .then(() => {
        return lform.update()
      })
      .then(() => {
        return expect(mockChart.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(mockChart.mock.calls[0][0].data).toEqual('world')
      })
      .then(() => {
        const div = lform.find('div')
        return expect(div.length).toEqual(0)
      })
  })
})

describe('onSubmitHOF', () => {
  it('correctly parses data and calls fetchData with it', () => {
    const fetchData = jest.fn(() => Promise.resolve())
    const fields = { hello: '5' }
    const e = { preventDefault: () => {} }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    onSubmitHOF(setChart, setShowChart, setIsLoading)(fields, fetchData)(e)
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
    const e = { preventDefault: () => {} }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    onSubmitHOF(setChart, setShowChart, setIsLoading)(fields, fetchData)(e)
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
    const e = { preventDefault: () => {} }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    onSubmitHOF(setChart, setShowChart, setIsLoading)(fields, fetchData)(e)
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
    const e = { preventDefault: () => {} }
    const setChart = jest.fn()
    const setShowChart = jest.fn()
    const setIsLoading = jest.fn()
    onSubmitHOF(setChart, setShowChart, setIsLoading)(fields, fetchData)(e)
      .then(() => {
        return expect(setChart.mock.calls.length).toEqual(1)
      })
      .then(() => {
        return expect(setChart.mock.calls[0][0]).toEqual('hello')
      })
  })
})
