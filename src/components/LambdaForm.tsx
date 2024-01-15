import React, { useState } from 'react'
import Flip from './Flip'


export interface Fields {
  [key: string]: number
}
export type ChartInput<T> = {
  data: T | undefined, //can be array or object; but need to explicitly pass the type
  color: string
}
export interface ChildProps<T> {
  onSubmit: (
    fetchData: () => Promise<T>
  ) => Promise<void>,
  isLoading: boolean,
  isVisible: boolean
}

//exported for testing
export function onSubmitHOF<T>(
  setChart: (_: T) => void,
  setShowChart: (_: boolean) => void,
  setIsLoading: (_: boolean) => void
) {
  return (
    fetchData: () => Promise<T>
  ) => {
    setIsLoading(true)

    return fetchData()
      .then(setChart)
      .then(() => setShowChart(true))
      .catch(console.log)
      .then(() => setIsLoading(false))
  }
}

interface Props<T> {
  formComponent: (_: ChildProps<T>) => React.ReactElement,
  chartComponent: (_: ChartInput<T>) => React.ReactElement,
  color: string
}
function LambdaForm<T>({ formComponent, chartComponent, color, ...rest }: Props<T>) {
  const [chart, setChart] = useState<T>()
  const [showChart, setShowChart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = onSubmitHOF<T>(setChart, setShowChart, setIsLoading)
  const chartCInst = () => chartComponent({ data: chart, color, ...rest })
  return (
    <>
      <Flip open={showChart} onClose={() => setShowChart(false)}>
        {chartCInst}
      </Flip>
      {formComponent({ onSubmit, isLoading, isVisible: !showChart })}
    </>
  )
}

export default LambdaForm
