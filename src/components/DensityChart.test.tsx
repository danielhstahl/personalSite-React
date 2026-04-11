import React from "react";
import DensityChart from "./DensityChart";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";


describe("render", () => {
  it("renders", () => {
    render(
      <DensityChart
        data={[
          { density: 3, at_point: 5 },
          { density: 5, at_point: 6 },
        ]}
        color="blue"
      />,
    );
  });
});
