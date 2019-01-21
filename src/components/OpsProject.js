import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getOpsRiskResults } from '../utils/service'
import LoadingButton from './LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../utils/form'
import PropTypes from 'prop-types'
const defaultFields = {
  t: 1,
  v0: 1,
  a: 0.1,
  sigma: 0.3,
  lambda: 100,
  alphaStable: 1.1,
  muStable: 1300,
  cStable: 100,
  rho: 0.9,
  numODE: 128,
  xNum: 1024,
  uNum: 128
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
          Number of Assets
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
        <Label for="v0" md={offset}>
          X0
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="v0"
            id="v0"
            step="any"
            {...getValueAndOnChange('v0')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="v0" md={offset}>
          a
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
          Systemic Volatility
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
        <Label for="alphaStable" md={offset}>
          alpha
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="alphaStable"
            step="any"
            id="alphaStable"
            {...getValueAndOnChange('alphaStable')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="muStable" md={offset}>
          Shift (Stable)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="muStable"
            step="any"
            id="muStable"
            {...getValueAndOnChange('muStable')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="cStable" md={offset}>
          Scale (Stable)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="cStable"
            step="any"
            id="cStable"
            {...getValueAndOnChange('cStable')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="rho" md={offset}>
          Correlation
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="rho"
            step="any"
            id="rho"
            {...getValueAndOnChange('rho')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="numODE" md={offset}>
          Steps in ODE
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="numODE"
            step="1"
            id="numODE"
            {...getValueAndOnChange('numODE')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="xNum" md={offset}>
          Steps in X
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="xNum"
            step="1"
            id="xNum"
            {...getValueAndOnChange('xNum')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="uNum" md={offset}>
          Steps in U
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="uNum"
            step="1"
            id="uNum"
            {...getValueAndOnChange('uNum')}
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
