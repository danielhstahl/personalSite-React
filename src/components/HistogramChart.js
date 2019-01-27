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
import PropTypes from 'prop-types'
const transformData = data =>
  Object.entries(data).map(([bin, frequency]) => ({
    bin,
    frequency
  }))
const tickFormat = t => t.split('-')[0]
const chartPadding = { bottom: 60, left: 20, right: 20 }
const HistogramChart = ({
  data,
  color,
  animateStyle = DEFAULT_ANIMATE_STYLE
}) => (
  <VictoryChart
    padding={chartPadding}
    animate={animateStyle}
    containerComponent={<VictoryContainer style={CONTAINER_STYLE} />}
  >
    <VictoryAxis style={X_AXIS_STYLE} tickFormat={tickFormat} />
    <VictoryBar
      barRatio={1.5}
      style={{ data: { fill: color } }}
      data={transformData(data)}
      x="bin"
      y="frequency"
    />
  </VictoryChart>
)
HistogramChart.propTypes = {
  data: PropTypes.object.isRequired,
  color: PropTypes.string
}
export default HistogramChart
