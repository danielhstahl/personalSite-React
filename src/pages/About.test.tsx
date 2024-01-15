import React from 'react'
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import About from './About'
import { render, screen, waitFor, act } from '@testing-library/react';
import { ROOT_ID } from '../constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <About />,
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
  test('has mathematical modeling card', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <About />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getByText(/Mathematical Modeling/i)).toBeInTheDocument())

  });
  test('has liquidity risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <About />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Liquidity Risk/i).length).toBeGreaterThan(0))

  });
  test('has database card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <About />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Data/i).length).toBeGreaterThan(0))

  });
  test('has fintech card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <About />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },
    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Fintech/i).length).toBeGreaterThan(0))

  });
  test('has passions card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <About />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Passions/i).length).toBeGreaterThan(0))

  });
})

