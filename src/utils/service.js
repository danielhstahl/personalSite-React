const url = 'https://5qsvissse9.execute-api.us-east-1.amazonaws.com/prd'
//const url = 'https://e43exqgwxl.execute-api.us-east-1.amazonaws.com/prd'

export const getData = (body, url) =>
  fetch(url, { method: 'POST', body: JSON.stringify(body) }).then(res =>
    res.json()
  )
//export const getCreditRiskResults = body =>
//fetch(`${url}/v1/credit/density`, { method: 'POST', body:JSON.stringify(body) }).then(res => res.json())
export const getMarketRiskResults = params =>
  fetch(`${url}/marketRisk`, { method: 'GET', params }).then(res => res.json())
export const getOpsRiskResults = body =>
  fetch(`${url}/v1/ops/density`, {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(res => res.json())
