const url = 'https://7229z53ukd.execute-api.us-east-1.amazonaws.com/prd'

export const getCreditRiskResults = params =>
  fetch(`${url}/creditRisk`, { method: 'GET', params }).then(res => res.json())
export const getMarketRiskResults = params =>
  fetch(`${url}/marketRisk`, { method: 'GET', params }).then(res => res.json())
export const getOpsRiskResults = params =>
  fetch(`${url}/opsRisk`, { method: 'GET', params }).then(res => res.json())
