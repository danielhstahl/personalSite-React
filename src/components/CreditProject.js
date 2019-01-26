import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getCreditRiskResults } from '../utils/service'
import LoadingButton from './LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../utils/form'
import PropTypes from 'prop-types'
const defaultFields = {
  q: 0.05,
  lambda: 0.05,
  numU: 128,
  pd: 0.02,
  numLoans: 100000,
  volatility: 0.5
}

const { size, offset } = formOffset
const CreditProject = ({ onSubmit, isLoading, isVisible }) => {
  const [fields, setFields] = useState(defaultFields)
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return !isVisible ? null : (
    <Form onSubmit={onSubmit(fields, getCreditRiskResults)}>
      <FormGroup row>
        <Label for="n" md={offset}>
          Number of Assets
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="1"
            name="numLoans"
            id="numLoans"
            {...getValueAndOnChange('numLoans')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="pd" md={offset}>
          Probability of Default
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="pd"
            id="pd"
            {...getValueAndOnChange('pd')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="volatility" md={offset}>
          Volatility
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="volatility"
            id="volatility"
            step="any"
            {...getValueAndOnChange('volatility')}
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
CreditProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired
}
export default CreditProject
