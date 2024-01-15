import React from 'react'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryContainer
} from 'victory'
import {
  CONTAINER_STYLE,
  DEFAULT_ANIMATE_STYLE,
  X_AXIS_STYLE
} from '../constants/charts'
import { ChartInput } from './LambdaForm'
export interface DensityData {
  density: number,
  at_point: number
}

const chartPadding = { bottom: 70 }
const DensityChart = ({
  data,
  color,
  //animateStyle = DEFAULT_ANIMATE_STYLE
}: ChartInput<DensityData[]>) => (
  <VictoryChart
    animate={DEFAULT_ANIMATE_STYLE}
    padding={chartPadding}
    containerComponent={<VictoryContainer style={CONTAINER_STYLE} />}
  >
    <VictoryAxis style={X_AXIS_STYLE} />
    <VictoryLine
      style={{ data: { stroke: color } }}
      data={data}
      interpolation="natural"
      x="at_point"
      y="density"
    />
  </VictoryChart>
)

export default DensityChart
