
import React from 'react'
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import { render, screen, waitFor, act } from '@testing-library/react';
import { ROOT_ID } from '../constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Home />,
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
  test('has vision card', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Home />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getByText(/Vision/i)).toBeInTheDocument())

  });

  test('has summary card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Home />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Summary/i).length).toBeGreaterThan(0))

  });
})
