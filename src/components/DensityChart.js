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
import PropTypes from 'prop-types'
const chartPadding = { bottom: 70 }
const DensityChart = ({
  data,
  color,
  animateStyle = DEFAULT_ANIMATE_STYLE
}) => (
  <VictoryChart
    animate={animateStyle}
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
DensityChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      density: PropTypes.number.isRequired,
      at_point: PropTypes.number.isRequired
    })
  ).isRequired,
  color: PropTypes.string
}
export default DensityChart
