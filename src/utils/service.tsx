import { Fields } from "../components/LambdaForm"
export const getData = (body: Fields, url: string) =>
  fetch(url, { method: 'POST', body: JSON.stringify(body) }).then(res =>
    res.json()
  )
