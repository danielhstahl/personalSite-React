import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const Flip = ({ open, children, onClose }) =>
  open ? (
    <div>
      <Button close onClick={onClose} />
      {children()}
    </div>
  ) : null

Flip.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}
export default Flip
