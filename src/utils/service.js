export const getData = (body, url) =>
  fetch(url, { method: 'POST', body: JSON.stringify(body) }).then(res =>
    res.json()
  )
