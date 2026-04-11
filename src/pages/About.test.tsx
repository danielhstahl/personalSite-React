import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { ROOT_ID } from "../constants/routes";


describe("render", () => {
  test("renders", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
  });
});

describe("functionality", () => {
  test("has mathematical modeling card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Mathematical Modeling/i)).toBeInTheDocument();
  });
  test("has liquidity risk card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Liquidity Risk/i).first()).toBeInTheDocument();
  });
  test("has database card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Data/i).first()).toBeInTheDocument();
  });
  test("has fintech card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Fintech/i).first()).toBeInTheDocument();
  });
  test("has passions card", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <About />,
          id: ROOT_ID,
          errorElement: <p>Uh oh, 404</p>,
          //loader: () => ({ versions: [{ version: "0.1", appliedVersion: true }], speakers: undefined, filters: undefined, appliedVersion: undefined }),
          //children: [{ path: "/", element: <div>Hello</div> }]
        },
      ],
      { initialEntries: ["/"] },
    );
    render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/Passions/i).first()).toBeInTheDocument();
  });
});
