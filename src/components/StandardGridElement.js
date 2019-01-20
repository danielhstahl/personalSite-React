import React from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
const StandardGridElement = ({ children, ...rest }) => (
  <Col xs={12} sm={6} {...rest}>
    {children}
  </Col>
)

StandardGridElement.propTypes = {
  children: PropTypes.node.isRequired
}

export default StandardGridElement
