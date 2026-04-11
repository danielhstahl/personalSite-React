import React from "react";
import Flip from "./Flip";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";


describe("render", () => {
  it("renders", async () => {
    render(
      <Flip open={true} onClose={() => {}}>
        {() => "hello"}
      </Flip>,
    );
  });
});
describe("functionality", () => {
  it("shows close button when open", async () => {
    render(
      <Flip open={true} onClose={() => {}}>
        {() => "hello"}
      </Flip>,
    );
    await expect.element(page.getByRole("button")).toBeInTheDocument();
  });
  it("shows children when open", async () => {
    render(
      <Flip open={true} onClose={() => {}}>
        {() => "hello"}
      </Flip>,
    );

    await expect.element(page.getByRole("button")).toBeInTheDocument();
    await expect.element(page.getByText("hello")).toBeInTheDocument();
  });
  it("does not show children when closed", async () => {
    render(
      <Flip open={false} onClose={() => {}}>
        {() => "hello"}
      </Flip>,
    );
    await expect.element(page.getByText("hello")).not.toBeInTheDocument();
  });
  it("does not show close button when closed", async () => {
    render(
      <Flip open={false} onClose={() => {}}>
        {() => "hello"}
      </Flip>,
    );
    await expect.element(page.getByRole("button")).not.toBeInTheDocument();
  });
});
