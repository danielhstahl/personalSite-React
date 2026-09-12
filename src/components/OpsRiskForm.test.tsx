import React from 'react'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import OpsRiskForm from './OpsRiskForm'
import { ChildProps } from './LambdaForm'
import { DensityData } from './DensityChart'
import { OPS_DENSITY_URL } from '../constants/api'

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
  t: 1,
  numU: 128,
  numOde: 128,
  a: 0.3,
  sigma: 0.3,
  lambda: 100,
  correlation: 0.8,
  alpha: 1.1,
  mu: 1300,
  c: 100,
}

const FIELD_LABELS = [
  'Time Horizon',
  'Steps in U',
  'Steps in ODE',
  'Speed',
  'Volatility',
  'Jump Frequency',
  'Correlation',
  'Alpha',
  'Shift (Stable)',
  'Scale (Stable)',
]

const setup = async (overrides: Partial<ChildProps<DensityData[]>> = {}) => {
  const onSubmit = vi.fn()
  const view = await render(
    <OpsRiskForm
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

describe('OpsRiskForm render', () => {
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

  it('renders nothing at all when isVisible is false', async () => {
    const { view } = await setup({ isVisible: false })
    // Unlike CreditRiskForm (which hides via CSS), OpsRiskForm unmounts to an
    // empty fragment, so there is no form element in the DOM whatsoever.
    expect(view.container.querySelector('form')).toBeNull()
    expect(view.container.textContent).toBe('')
  })
})

describe('OpsRiskForm submit', () => {
  it('calls onSubmit with a request callback', async () => {
    const { submit } = await setup()
    expect(typeof (await submit())).toBe('function')
  })

  it('posts the default form values as JSON to the ops density endpoint', async () => {
    const { submit } = await setup()
    const fetchMock = stubFetch([{ at_point: 0, density: 1 }])
    await (
      await submit()
    )()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = sentRequests(fetchMock)[0]
    expect(url).toBe(OPS_DENSITY_URL)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toEqual(DEFAULT_PAYLOAD)
  })

  it('resolves the callback with the parsed response', async () => {
    const expected = [{ at_point: 1, density: 0.5 }]
    const { submit } = await setup()
    stubFetch(expected)
    await expect((await submit())()).resolves.toEqual(expected)
  })

  it('sends an edited value while untouched fields keep their defaults', async () => {
    const { view, submit } = await setup()
    await userEvent.fill(
      view.getByLabelText('Time Horizon', { exact: true }),
      '2',
    )

    const fetchMock = stubFetch([])
    await (
      await submit()
    )()

    const sent = JSON.parse(sentRequests(fetchMock)[0][1].body as string)
    expect(sent.t).toBe(2)
    expect(sent.lambda).toBe(100)
  })

  it('reflects isLoading in the submit button loading state', async () => {
    const { view } = await setup({ isLoading: true })
    expect(view.container.querySelector('button')!.className).toContain(
      'ant-btn-loading',
    )
  })
})
