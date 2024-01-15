import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Projects from './Projects'
import { render, screen, waitFor, act } from '@testing-library/react';
import { ROOT_ID } from '../constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Projects />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )

  });
})

describe("functionality", () => {
  test('has credit risk card', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Projects />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getByText(/Credit Risk/i)).toBeInTheDocument())

  });

  test('has ops risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Projects />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Operational Risk/i).length).toBeGreaterThan(0))

  });

  test('has market risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Projects />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Market Risk/i).length).toBeGreaterThan(0))

  });
})

