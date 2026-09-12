/**
 * Central registry for the AWS API Gateway ("execute-api") endpoints that the
 * risk forms post to.
 *
 * These used to be string literals buried inside each form component, so a stage,
 * region, or gateway change meant hunting across three files. They live here now,
 * and `api.test.ts` pins the exact values so an accidental edit cannot silently
 * change where user input is sent.
 */

/** Deployed API Gateway stage. */
const API_STAGE = 'prd'

/** Risk domains, each backed by its own API Gateway deployment. */
export type RiskDomain = 'credit' | 'ops' | 'market'

const apiGatewayUrl = (apiId: string): string =>
  `https://${apiId}.execute-api.us-east-1.amazonaws.com/${API_STAGE}`

/**
 * Base URL per risk domain. Includes the stage and has no trailing slash, so
 * paths can be appended with `apiUrl` without worrying about slash counts.
 */
export const API_BASE_URLS: Record<RiskDomain, string> = {
  credit: apiGatewayUrl('5qsvissse9'),
  ops: apiGatewayUrl('e43exqgwxl'),
  market: apiGatewayUrl('4mf1valfp4'),
}

/** Join a base URL and a path without doubling or dropping a slash. */
export const apiUrl = (base: string, path: string): string =>
  `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`

/** Credit loan-density endpoint, used by `CreditRiskForm`. */
export const CREDIT_DENSITY_URL = apiUrl(
  API_BASE_URLS.credit,
  '/v1/credit/density',
)

/** Operational loss-density endpoint, used by `OpsRiskForm`. */
export const OPS_DENSITY_URL = apiUrl(API_BASE_URLS.ops, '/v1/ops/density')
