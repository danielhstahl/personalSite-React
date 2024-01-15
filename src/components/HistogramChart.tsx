import React from 'react'
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryContainer
} from 'victory'
import {
  CONTAINER_STYLE,
  DEFAULT_ANIMATE_STYLE,
  X_AXIS_STYLE
} from '../constants/charts'
import { ChartInput } from './LambdaForm'
export interface HistogramData {
  [key: string]: number
}

const transformData = (data: HistogramData) =>
  Object.entries(data).map(([bin, frequency]) => ({
    bin,
    frequency
  }))
const tickFormat = (t: string) => t.split('-')[0]
const chartPadding = { bottom: 60, left: 20, right: 20 }
const HistogramChart = ({
  data,
  color,
  //animateStyle = DEFAULT_ANIMATE_STYLE
}: ChartInput<HistogramData>) => (
  <VictoryChart
    padding={chartPadding}
    animate={DEFAULT_ANIMATE_STYLE}
    containerComponent={<VictoryContainer style={CONTAINER_STYLE} />}
  >
    <VictoryAxis style={X_AXIS_STYLE} tickFormat={tickFormat} />
    <VictoryBar
      barRatio={1.5}
      style={{ data: { fill: color } }}
      data={data && transformData(data)}
      x="bin"
      y="frequency"
    />
  </VictoryChart>
)

export default HistogramChart
