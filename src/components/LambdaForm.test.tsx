
import React from "react";
import LambdaForm, { onSubmitHOF } from "./LambdaForm";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";


const Chart = () => <div />;
describe("render", () => {
  it("renders", async () => {
    await render(
      <LambdaForm
        chartComponent={Chart}
        formComponent={() => <div>Hello World</div>}
        color="blue"
      />,
    );
  });
});
describe("functionality", () => {
  it("shows children by default", async () => {
    await render(
      <LambdaForm
        chartComponent={Chart}
        formComponent={() => <div>Hello World</div>}
        color="blue"
      />,
    );
    await expect.element(page.getByText("Hello World")).toBeInTheDocument();
  });
  it("provides onSubmit, isLoading", async () => {
    const mockComponent = vi.fn((a) => <div></div>);
    await render(
      <LambdaForm
        chartComponent={Chart}
        formComponent={mockComponent}
        color="blue"
      />,
    );
    const inputToComponent = mockComponent.mock.calls[0][0];
    expect(inputToComponent.onSubmit).toBeDefined();
    expect(inputToComponent.isLoading).toBeDefined();
    expect(inputToComponent.isVisible).toBeDefined();
  });
  it("isLoading is false by default", async () => {
    const mockComponent = vi.fn((a) => <div></div>);
    await render(
      <LambdaForm
        chartComponent={Chart}
        formComponent={mockComponent}
        color="blue"
      />,
    );

    const inputToComponent = mockComponent.mock.calls[0][0];
    expect(inputToComponent.onSubmit).toBeDefined();
    expect(inputToComponent.isLoading).toEqual(false);
    expect(inputToComponent.isVisible).toEqual(true);
  });
  it("chart is not called by default", async () => {
    const mockComponent = vi.fn((a) => <div></div>);
    const mockChart = vi.fn((a) => <div></div>);
    await render(
      <LambdaForm
        chartComponent={Chart}
        formComponent={mockComponent}
        color="blue"
      />,
    );
    expect(mockChart.mock.calls.length).toEqual(0);
  });
});

describe("onSubmitHOF", () => {
  it("correctly parses data and calls fetchData with it", () => {
    const fetchData = vi.fn(() => Promise.resolve());
    const setChart = vi.fn();
    const setShowChart = vi.fn();
    const setIsLoading = vi.fn();
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading,
    )(fetchData).then(() => {
      return expect(fetchData.mock.calls.length).toEqual(1);
    });
  });
  it("correctly calls setIsLoading twice", () => {
    const fetchData = vi.fn(() => Promise.resolve());
    const setChart = vi.fn();
    const setShowChart = vi.fn();
    const setIsLoading = vi.fn();
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading,
    )(fetchData)
      .then(() => {
        return expect(setIsLoading.mock.calls.length).toEqual(2);
      })
      .then(() => {
        return expect(setIsLoading.mock.calls[0][0]).toEqual(true);
      })
      .then(() => {
        return expect(setIsLoading.mock.calls[1][0]).toEqual(false);
      });
  });
  it("correctly calls setShowChart once", () => {
    const fetchData = vi.fn(() => Promise.resolve());
    const setChart = vi.fn();
    const setShowChart = vi.fn();
    const setIsLoading = vi.fn();
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading,
    )(fetchData)
      .then(() => {
        return expect(setShowChart.mock.calls.length).toEqual(1);
      })
      .then(() => {
        return expect(setShowChart.mock.calls[0][0]).toEqual(true);
      });
  });
  it("correctly calls setChart once", () => {
    const fetchData = vi.fn(() => Promise.resolve("hello"));
    const setChart = vi.fn();
    const setShowChart = vi.fn();
    const setIsLoading = vi.fn();
    return onSubmitHOF(
      setChart,
      setShowChart,
      setIsLoading,
    )(fetchData)
      .then(() => {
        return expect(setChart.mock.calls.length).toEqual(1);
      })
      .then(() => {
        return expect(setChart.mock.calls[0][0]).toEqual("hello");
      });
  });
});
