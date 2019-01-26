import React from 'react'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryContainer
} from 'victory'
import { CONTAINER_STYLE, DEFAULT_ANIMATE_STYLE } from '../constants/charts'
import PropTypes from 'prop-types'
const DensityChart = ({
  data,
  color,
  animateStyle = DEFAULT_ANIMATE_STYLE
}) => (
  <VictoryChart
    animate={animateStyle}
    containerComponent={<VictoryContainer style={CONTAINER_STYLE} />}
  >
    <VictoryAxis tickFormat={() => ''} />
    <VictoryAxis dependentAxis tickFormat={() => ''} />
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
