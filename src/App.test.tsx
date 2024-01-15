import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from './App'
import { render, waitFor } from '@testing-library/react';
import { ROOT_ID } from './constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <App />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    await waitFor(() => render(
      <RouterProvider router={router} />)
    )
  })

});