import { onChangeHOF, getValueAndOnChangeHOF } from './form'

describe('onChangeHOF', () => {
  it('updates field when key exists', () => {
    const setFields = jest.fn()
    const fields = { hello: 'world' }
    onChangeHOF(fields, setFields)('hello')({ target: { value: 'new' } })
    expect(setFields.mock.calls[0][0]).toEqual({ hello: 'new' })
  })
  it('adds field when key doesnt exist', () => {
    const setFields = jest.fn()
    const fields = { hello: 'world' }
    onChangeHOF(fields, setFields)('newkey')({ target: { value: 'new' } })
    expect(setFields.mock.calls[0][0]).toEqual({
      hello: 'world',
      newkey: 'new'
    })
  })
})

describe('getValueAndOnChangeHOF', () => {
  it('returns field key as value', () => {
    const fields = { hello: 'world' }
    const onChange = jest.fn()
    const results = getValueAndOnChangeHOF(fields, onChange)('hello')
    expect(results.value).toEqual('world')
  })
  it('calls onChange with key', () => {
    const fields = { hello: 'world' }
    const onChange = jest.fn(() => 'another result')
    const results = getValueAndOnChangeHOF(fields, onChange)('hello')
    expect(results.onChange).toEqual('another result')
    expect(onChange.mock.calls[0][0]).toEqual('hello')
  })
})
