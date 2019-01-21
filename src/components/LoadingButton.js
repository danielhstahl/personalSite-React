import React from 'react'
import { Button, Progress } from 'reactstrap'
import PropTypes from 'prop-types'
const LoadingButton = ({ children, isLoading, color, ...rest }) =>
  isLoading ? (
    <Progress animated progress="100%" color={color} />
  ) : (
    <Button {...rest} color={color}>
      {children}
    </Button>
  )

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  color: PropTypes.string
}
export default LoadingButton
