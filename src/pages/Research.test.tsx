import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Research from './Research'
import { render, screen, waitFor, act } from '@testing-library/react';
import { ROOT_ID } from '../constants/routes';

describe("render", () => {
  test('renders', async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Research />,
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
        element: <Research />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText(/Credit Risk/i).length).toBeGreaterThan(0))

  });

  test('has operational risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Research />,
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

  test('has credit risk extensions card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Research />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText("Credit Risk Extensions (unpublished)").length).toBeGreaterThan(0))

  });
  test('has liquidity risk card', async () => {
    const router = createMemoryRouter([
      {

        path: "/",
        element: <Research />,
        id: ROOT_ID,
        errorElement: <p>Uh oh, 404</p>,
        //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
        //children: [{ path: "/", element: <div>Hello</div> }]
      },

    ], { initialEntries: ["/"] });
    render(
      <RouterProvider router={router} />
    )
    await waitFor(() => expect(screen.getAllByText("Liquidity Risk (unpublished)").length).toBeGreaterThan(0))

  });
})



/*



import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Research from './Research'
import { render, screen } from '@testing-library/react';
describe('render', () => {
  it('renders', () => {
    render(<Router>
      <Research />
    </Router>)

  })
})
describe('functionality', () => {
  it('has credit risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Credit Risk");
    expect(card).toBeInTheDocument();

  })
  it('has operational risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Operational Risk");
    expect(card).toBeInTheDocument();

  })
  it('has credit risk extensions card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Credit Risk Extensions (unpublished)");
    expect(card).toBeInTheDocument();

  })
  it('has liquidity risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = screen.getByText("Liquidity Risk (unpublished)");
    expect(card).toBeInTheDocument();

  })
})
*/