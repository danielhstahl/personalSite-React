import React from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
const style = { marginTop: 10, marginBottom: 10 }
const StandardGridElement = ({ children, ...rest }) => (
  <Col xs={12} sm={6} {...rest} style={style}>
    {children}
  </Col>
)

StandardGridElement.propTypes = {
  children: PropTypes.node.isRequired
}

export default StandardGridElement
