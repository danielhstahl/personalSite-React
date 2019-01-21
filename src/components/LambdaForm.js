import React, { useState } from 'react'
import Flip from './Flip'
import PropTypes from 'prop-types'

//exported for testing
export const onSubmitHOF = (setChart, setShowChart, setIsLoading) => (
  fields,
  fetchData
) => e => {
  e.preventDefault()
  setIsLoading(true)
  const numericFields = Object.entries(fields).reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: parseFloat(curr[1])
    }),
    {}
  )
  return fetchData(numericFields)
    .then(setChart)
    .then(() => setShowChart(true))
    .catch(err => console.log(err))
    .then(() => setIsLoading(false))
}

const LambdaForm = ({ children, chartComponent }) => {
  const [chart, setChart] = useState({})
  const [showChart, setShowChart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = onSubmitHOF(setChart, setShowChart, setIsLoading)
  const chartCInst = () => chartComponent({ data: chart })
  return (
    <>
      <Flip open={showChart} onClose={() => setShowChart(false)}>
        {chartCInst}
      </Flip>
      {showChart || children({ onSubmit, isLoading })}
    </>
  )
}
LambdaForm.propTypes = {
  children: PropTypes.func.isRequired,
  chartComponent: PropTypes.func.isRequired
}
export default LambdaForm
