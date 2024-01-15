import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Perspectives from './Perspectives'
import { render, screen, waitFor, act } from '@testing-library/react';
import { ROOT_ID } from '../constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Perspectives />,
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
  test('has model development card', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Perspectives />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getByText(/Thoughts on model development/i)).toBeInTheDocument())

  });

  test('has develop model card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Perspectives />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/How to develop a model/i).length).toBeGreaterThan(0))

  });

  test('has model risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Perspectives />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Model Risk/i).length).toBeGreaterThan(0))

  });
})