import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getCreditRiskResults } from '../utils/service'
import LoadingButton from './LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../utils/form'
import PropTypes from 'prop-types'
const defaultFields = {
  n: 100000,
  t: 1,
  x0: 1,
  alpha: 0.1,
  sigma: 0.3,
  q: 0.05,
  lambda: 0.05,
  xNum: 1024,
  uNum: 128
}

const { size, offset } = formOffset
const CreditProject = ({ onSubmit, isLoading }) => {
  const [fields, setFields] = useState(defaultFields)
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return (
    <Form onSubmit={onSubmit(fields, getCreditRiskResults)}>
      <FormGroup row>
        <Label for="n" md={offset}>
          Number of Assets
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="1"
            name="n"
            id="n"
            {...getValueAndOnChange('n')}
          />
        </Col>
      </FormGroup>
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
        <Label for="x0" md={offset}>
          X0
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="x0"
            id="x0"
            step="any"
            {...getValueAndOnChange('x0')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="alpha" md={offset}>
          Systemic Drift
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="alpha"
            id="alpha"
            step="any"
            {...getValueAndOnChange('alpha')}
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
        <Label for="q" md={offset}>
          q
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="q"
            id="q"
            {...getValueAndOnChange('q')}
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
CreditProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}
export default CreditProject
