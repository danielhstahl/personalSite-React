import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { ROOT_ID } from './constants/routes'

describe('render', () => {
  test('renders', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
        },
      ],
      { initialEntries: ['/'] },
    )
    await render(<RouterProvider router={router} />)
  })
})
