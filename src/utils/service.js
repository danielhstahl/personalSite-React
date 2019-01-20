const url = 'https://7229z53ukd.execute-api.us-east-1.amazonaws.com/prd'

export const getCreditRiskResults = body =>
  fetch(`${url}/creditRisk`, { method: 'POST', body }).then(res => res.json())
export const getMarketRiskResults = body =>
  fetch(`${url}/marketRisk`, { method: 'POST', body }).then(res => res.json())
export const getOpsRiskResults = body =>
  fetch(`${url}/opsRisk`, { method: 'POST', body }).then(res => res.json())
