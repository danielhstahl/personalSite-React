import {
  API_BASE_URLS,
  CREDIT_DENSITY_URL,
  OPS_DENSITY_URL,
  apiUrl,
} from './api'

describe('API_BASE_URLS', () => {
  test('pins the exact gateway each risk domain posted to before extraction', () => {
    // These literals are the pre-refactor values copied out of the three form
    // components. If this test changes, a deployed endpoint changed with it.
    expect(API_BASE_URLS.credit).toBe(
      'https://5qsvissse9.execute-api.us-east-1.amazonaws.com/prd',
    )
    expect(API_BASE_URLS.ops).toBe(
      'https://e43exqgwxl.execute-api.us-east-1.amazonaws.com/prd',
    )
    expect(API_BASE_URLS.market).toBe(
      'https://4mf1valfp4.execute-api.us-east-1.amazonaws.com/prd',
    )
  })

  test('covers credit, ops and market with distinct bases', () => {
    expect(Object.keys(API_BASE_URLS).sort()).toEqual([
      'credit',
      'market',
      'ops',
    ])
    expect(new Set(Object.values(API_BASE_URLS)).size).toBe(3)
  })

  test('bases carry no trailing slash', () => {
    for (const base of Object.values(API_BASE_URLS)) {
      expect(base.endsWith('/')).toBe(false)
    }
  })
})

describe('apiUrl', () => {
  test('joins a base and an absolute path with exactly one slash', () => {
    expect(apiUrl('https://host/prd', '/v1/thing')).toBe(
      'https://host/prd/v1/thing',
    )
  })

  test('collapses a trailing slash on the base', () => {
    expect(apiUrl('https://host/prd/', '/v1/thing')).toBe(
      'https://host/prd/v1/thing',
    )
  })

  test('does not mutate scheme slashes or collapse inner path segments', () => {
    expect(apiUrl('https://host/prd', '/v1/a/b')).toBe(
      'https://host/prd/v1/a/b',
    )
  })
})

describe('density endpoint constants', () => {
  test('credit density URL equals the historical CreditRiskForm literal', () => {
    expect(CREDIT_DENSITY_URL).toBe(
      'https://5qsvissse9.execute-api.us-east-1.amazonaws.com/prd/v1/credit/density',
    )
  })

  test('ops density URL equals the historical OpsRiskForm literal', () => {
    expect(OPS_DENSITY_URL).toBe(
      'https://e43exqgwxl.execute-api.us-east-1.amazonaws.com/prd/v1/ops/density',
    )
  })
})
