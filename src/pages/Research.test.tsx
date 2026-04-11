import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Research from "./Research";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { ROOT_ID } from "../constants/routes";

describe("render", () => {
  test("renders", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Research />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
  });
});

describe("functionality", () => {
  test("has credit risk card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Research />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Credit Risk/i).first()).toBeInTheDocument();
  });

  test("has operational risk card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Research />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Operational Risk/i).first()).toBeInTheDocument();
  });

  test("has credit risk extensions card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Research />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText("Credit Risk Extensions (unpublished)")).toBeInTheDocument();
  });
  test("has liquidity risk card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Research />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText("Liquidity Risk (unpublished)")).toBeInTheDocument();
  });
});

/*



import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Research from './Research'
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";


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
    const card = page.getByText("Credit Risk");
    expect(card).toBeInTheDocument();

  })
  it('has operational risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = page.getByText("Operational Risk");
    expect(card).toBeInTheDocument();

  })
  it('has credit risk extensions card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = page.getByText("Credit Risk Extensions (unpublished)");
    expect(card).toBeInTheDocument();

  })
  it('has liquidity risk card', () => {
    render(<Router>
      <Research />
    </Router>)
    const card = page.getByText("Liquidity Risk (unpublished)");
    expect(card).toBeInTheDocument();

  })
})
*/
