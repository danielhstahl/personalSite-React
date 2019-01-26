import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getOpsRiskResults } from '../utils/service'
import LoadingButton from './LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../utils/form'
import PropTypes from 'prop-types'
const defaultFields = {
  t: 1,
  a: 0.1,
  sigma: 0.3,
  lambda: 100,
  alpha: 1.1,
  mu: 1300,
  c: 100,
  correlation: 0.9,
  numOde: 128,
  numU: 256
}

const { size, offset } = formOffset
const OpsProject = ({ onSubmit, isLoading, isVisible }) => {
  const [fields, setFields] = useState(defaultFields)
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return !isVisible ? null : (
    <Form onSubmit={onSubmit(fields, getOpsRiskResults)}>
      <FormGroup row>
        <Label for="t" md={offset}>
          Time Horizon
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="t"
            id="t"
            {...getValueAndOnChange('t')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="a" md={offset}>
          Speed
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="a"
            id="a"
            step="any"
            {...getValueAndOnChange('a')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="sigma" md={offset}>
          Volatility
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="sigma"
            id="sigma"
            step="any"
            {...getValueAndOnChange('sigma')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="lambda" md={offset}>
          lambda
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="lambda"
            step="any"
            id="lambda"
            {...getValueAndOnChange('lambda')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="alpha" md={offset}>
          alpha
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="alpha"
            step="any"
            id="alpha"
            {...getValueAndOnChange('alpha')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="mu" md={offset}>
          Shift (Stable)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="mu"
            step="any"
            id="mu"
            {...getValueAndOnChange('mu')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="c" md={offset}>
          Scale (Stable)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="c"
            step="any"
            id="c"
            {...getValueAndOnChange('c')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="correlation" md={offset}>
          Correlation
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="correlation"
            step="any"
            id="correlation"
            {...getValueAndOnChange('correlation')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="numOde" md={offset}>
          Steps in ODE
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="numOde"
            step="1"
            id="numOde"
            {...getValueAndOnChange('numOde')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="numU" md={offset}>
          Steps in U
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="numU"
            step="1"
            id="numU"
            {...getValueAndOnChange('numU')}
          />
        </Col>
      </FormGroup>
      <FormGroup check row md={formOffset}>
        <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
      </FormGroup>
    </Form>
  )
}
OpsProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired
}
export default OpsProject
