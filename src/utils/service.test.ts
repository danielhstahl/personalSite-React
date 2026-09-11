import { getData } from './service'

/**
 * Stubs global fetch with a spy that resolves to a Response-like object whose
 * `json()` is itself spy-able, so we can assert both the request shape and that
 * the response body was actually parsed.
 */
const stubFetch = (response: unknown) => {
  const json = vi.fn(async () => response)
  const fetchMock = vi.fn((..._args: Parameters<typeof globalThis.fetch>) =>
    Promise.resolve({ json } as unknown as Response),
  )
  vi.stubGlobal('fetch', fetchMock)
  return { fetchMock, json }
}

/** Typed view over the stub's recorded [url, init] calls. */
const sentRequests = (fetchMock: ReturnType<typeof stubFetch>['fetchMock']) =>
  fetchMock.mock.calls as unknown as [string, RequestInit][]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getData', () => {
  it('POSTs the body as JSON to the given url', async () => {
    const { fetchMock } = stubFetch({ ok: true })
    const fields = { lambda: 0.5, numLoans: 100000 }

    await getData(fields, 'https://example.test/v1/thing')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = sentRequests(fetchMock)[0]
    expect(url).toBe('https://example.test/v1/thing')
    expect(init.method).toBe('POST')
    expect(init.body).toBe(JSON.stringify(fields))
  })

  it('resolves with the parsed JSON response', async () => {
    const parsed = [
      { at_point: 0, density: 0.25 },
      { at_point: 1, density: 0.75 },
    ]
    const { json } = stubFetch(parsed)

    const result = await getData({ t: 1 }, 'https://example.test/v1/thing')

    expect(json).toHaveBeenCalledTimes(1)
    expect(result).toEqual(parsed)
  })

  it('sends only method and body in the request init', async () => {
    const { fetchMock } = stubFetch({})

    await getData({ a: 1, b: 2 }, 'https://example.test/x')

    // Notably no headers/content-type: this keeps the call a *simple* CORS
    // request, which the API Gateway endpoint accepts.
    const [, init] = sentRequests(fetchMock)[0]
    expect(Object.keys(init).sort()).toEqual(['body', 'method'])
  })

  it('propagates a network rejection', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('network down')
      }),
    )
    await expect(getData({ a: 1 }, 'https://example.test/x')).rejects.toThrow(
      'network down',
    )
  })

  it('propagates a JSON parse failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          ({
            json: async () => {
              throw new SyntaxError('Unexpected end of JSON input')
            },
          }) as unknown as Response,
      ),
    )
    await expect(getData({ a: 1 }, 'https://example.test/x')).rejects.toThrow(
      SyntaxError,
    )
  })
})
