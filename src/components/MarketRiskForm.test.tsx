import React from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import MarketRiskForm from './MarketRiskForm'
import { ChildProps } from './LambdaForm'
import { HistogramData } from './HistogramChart'
import { API_BASE_URLS, apiUrl } from '../constants/api'

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

const BOND_LABELS = [
  'Simulate to (days)',
  'Current short rate',
  'Mean reversion',
  'Long run average rate',
  'Volatility of rate',
  'Maturity (years)',
]

const DEFAULT_BOND_PAYLOAD = {
  t: 10,
  r0: 0.04,
  a: 0.3,
  b: 0.05,
  sigma: 0.05,
  maturity: 1,
}

const CAPLET_PAYLOAD = {
  t: 10,
  r0: 0.04,
  a: 0.3,
  b: 0.05,
  sigma: 0.05,
  maturity: 1,
  tenor: 0.25,
  strike: 0.02,
}

const setup = async (overrides: Partial<ChildProps<HistogramData>> = {}) => {
  const onSubmit = vi.fn()
  const view = await render(
    <MarketRiskForm
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
  /** Pick a product from the endpoint selector (options render in a portal). */
  /**
   * Pick a product from the endpoint selector. Two quirks drive this:
   *  - The search input behind `[role=combobox]` is covered by the selection
   *    span, which intercepts pointer events, so the click has to land on the
   *    `.ant-select-selector` wrapper that a real user clicks.
   *  - The dropdown is portaled to `document.body`, so the option is looked up
   *    from `page` (not the render container) via its `title`, which antd sets
   *    to the human-readable product label.
   */
  const chooseProduct = async (label: string) => {
    await userEvent.click(
      view.container.querySelector('.ant-select-selector') as HTMLElement,
    )
    const option = page.getByTitle(label, { exact: true })
    await expect.element(option).toBeInTheDocument()
    await userEvent.click(option)
  }
  return { view, onSubmit, submit, chooseProduct }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('MarketRiskForm render', () => {
  it('renders the product selector defaulting to Bond, plus its fields', async () => {
    const { view } = await setup()
    await expect.element(view.getByRole('combobox')).toBeInTheDocument()
    expect(
      view.container.querySelector('.ant-select-selection-item')?.textContent,
    ).toBe('Bond')
    for (const label of BOND_LABELS) {
      await expect
        .element(view.getByLabelText(label, { exact: true }))
        .toBeInTheDocument()
    }
    await expect
      .element(view.getByRole('button', { name: 'Submit' }))
      .toBeInTheDocument()
  })

  it('hides everything when isVisible is false', async () => {
    const { view } = await setup({ isVisible: false })
    const wrapper = view.container.querySelector(
      '.ant-space',
    ) as HTMLElement | null
    expect(wrapper).not.toBeNull()
    expect(wrapper!.style.display).toBe('none')
  })
})

describe('MarketRiskForm submit', () => {
  it('calls onSubmit with a request callback', async () => {
    const { submit } = await setup()
    expect(typeof (await submit())).toBe('function')
  })

  it('posts the default bond values to the bond histogram endpoint', async () => {
    const { submit } = await setup()
    const fetchMock = stubFetch({ bin0: 1 })
    await (
      await submit()
    )()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = sentRequests(fetchMock)[0]
    expect(url).toBe(apiUrl(API_BASE_URLS.market, '/v1/market/histogram/bond'))
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toEqual(DEFAULT_BOND_PAYLOAD)
  })

  it('resolves the callback with the parsed response', async () => {
    const expected = { '0-1': 42, '1-2': 7 }
    const { submit } = await setup()
    stubFetch(expected)
    await expect((await submit())()).resolves.toEqual(expected)
  })

  it('switching the product changes both the fields and the endpoint', async () => {
    const { view, submit, chooseProduct } = await setup()

    await chooseProduct('Caplet')

    // Caplet adds the tenor/strike fields that Bond does not have.
    await expect
      .element(view.getByLabelText('Floating tenor (years)', { exact: true }))
      .toBeInTheDocument()
    await expect
      .element(view.getByLabelText('Strike', { exact: true }))
      .toBeInTheDocument()

    const fetchMock = stubFetch({ '0-1': 1 })
    await (
      await submit()
    )()

    const [url] = sentRequests(fetchMock)[0]
    expect(url).toBe(
      apiUrl(API_BASE_URLS.market, '/v1/market/histogram/caplet'),
    )
    expect(JSON.parse(sentRequests(fetchMock)[0][1].body as string)).toEqual(
      CAPLET_PAYLOAD,
    )
  })

  it('sends an edited value while untouched fields keep their defaults', async () => {
    const { view, submit } = await setup()
    await userEvent.fill(
      view.getByLabelText('Mean reversion', { exact: true }),
      '0.42',
    )

    const fetchMock = stubFetch({})
    await (
      await submit()
    )()

    const sent = JSON.parse(sentRequests(fetchMock)[0][1].body as string)
    expect(sent.a).toBeCloseTo(0.42)
    expect(sent.r0).toBeCloseTo(0.04)
  })

  it('reflects isLoading in the submit button loading state', async () => {
    const { view } = await setup({ isLoading: true })
    expect(view.container.querySelector('button')!.className).toContain(
      'ant-btn-loading',
    )
  })
})
