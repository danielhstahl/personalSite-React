import React from 'react'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import CreditRiskForm from './CreditRiskForm'
import { ChildProps } from './LambdaForm'
import { DensityData } from './DensityChart'
import { CREDIT_DENSITY_URL } from '../constants/api'

/**
 * The form hands `onSubmit` a thunk that performs the real request, so we
 * capture that thunk and invoke it against a stubbed fetch. This pins exactly
 * which endpoint and payload the user's input would be sent to, without the
 * test ever touching the network.
 */
const stubFetch = (response: unknown) => {
  const fetchMock = vi.fn((..._args: Parameters<typeof globalThis.fetch>) =>
    Promise.resolve({ json: async () => response } as unknown as Response),
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

/** Typed view over the stub's recorded [url, init] calls. */
const sentRequests = (fetchMock: ReturnType<typeof stubFetch>) =>
  fetchMock.mock.calls as unknown as [string, RequestInit][]

const DEFAULT_PAYLOAD = {
  lambda: 0.5,
  q: 0.05,
  numU: 128,
  pd: 0.02,
  numLoans: 100000,
  volatility: 0.5,
}

const FIELD_LABELS = [
  'Lambda',
  'q',
  'Steps in U',
  'Probability of default',
  'Number of loans',
  'Volatility',
]

/** Fresh mock + fresh render per test, so call history never leaks between them. */
const setup = async (overrides: Partial<ChildProps<DensityData[]>> = {}) => {
  const onSubmit = vi.fn()
  const view = await render(
    <CreditRiskForm
      onSubmit={onSubmit}
      isLoading={false}
      isVisible={true}
      {...overrides}
    />,
  )
  const submit = async () => {
    await userEvent.click(view.getByRole('button', { name: 'Submit' }))
    await expect.poll(() => onSubmit.mock.calls.length).toBe(1)
    return onSubmit.mock.calls[0][0] as () => Promise<unknown>
  }
  return { view, onSubmit, submit }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('CreditRiskForm render', () => {
  it('renders every field and the submit button', async () => {
    const { view } = await setup()
    for (const label of FIELD_LABELS) {
      await expect
        .element(view.getByLabelText(label, { exact: true }))
        .toBeInTheDocument()
    }
    await expect
      .element(view.getByRole('button', { name: 'Submit' }))
      .toBeInTheDocument()
  })

  it('keeps the form mounted but hidden when isVisible is false', async () => {
    const { view } = await setup({ isVisible: false })
    const form = view.container.querySelector('form')
    expect(form).not.toBeNull()
    expect(form!.style.display).toBe('none')
  })

  it('shows the form when isVisible is true', async () => {
    const { view } = await setup({ isVisible: true })
    const form = view.container.querySelector('form')
    expect(form!.style.display).not.toBe('none')
  })
})

describe('CreditRiskForm submit', () => {
  it('calls onSubmit with a request callback', async () => {
    const { submit } = await setup()
    const thunk = await submit()
    expect(typeof thunk).toBe('function')
  })

  it('posts the default form values as JSON to the credit density endpoint', async () => {
    const { submit } = await setup()
    const fetchMock = stubFetch([{ at_point: 0, density: 1 }])
    await (
      await submit()
    )()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = sentRequests(fetchMock)[0]
    expect(url).toBe(CREDIT_DENSITY_URL)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toEqual(DEFAULT_PAYLOAD)
  })

  it('resolves the callback with the parsed response', async () => {
    const expected = [
      { at_point: 0.1, density: 0.4 },
      { at_point: 0.2, density: 0.6 },
    ]
    const { submit } = await setup()
    stubFetch(expected)
    await expect((await submit())()).resolves.toEqual(expected)
  })

  it('sends an edited value while untouched fields keep their defaults', async () => {
    const { view, submit } = await setup()
    await userEvent.fill(view.getByLabelText('Lambda', { exact: true }), '0.77')

    const fetchMock = stubFetch([])
    await (
      await submit()
    )()

    const sent = JSON.parse(sentRequests(fetchMock)[0][1].body as string)
    expect(sent.lambda).toBeCloseTo(0.77)
    expect(sent.numLoans).toBe(100000)
  })

  it('reflects isLoading in the submit button loading state', async () => {
    const { view } = await setup({ isLoading: true })
    const btn = view.container.querySelector('button')
    expect(btn!.className).toContain('ant-btn-loading')
  })
})
