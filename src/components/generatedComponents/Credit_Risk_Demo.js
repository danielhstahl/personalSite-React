import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getData } from '../../utils/service'
import LoadingButton from '../LoadingButton'
import {
  onChangeHOF,
  getValueAndOnChangeHOF,
  formOffset
} from '../../utils/form'
import PropTypes from 'prop-types'
const { size, offset } = formOffset

const defaultFields = {
  lambda: 0.5,
  q: 0.05,
  numU: 128,
  pd: 0.02,
  numLoans: 100000,
  volatility: 0.5
}
const Density = ({ onSubmit, isLoading }) => {
  const [fields, setFields] = useState(defaultFields)
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return (
    <Form
      onSubmit={onSubmit(fields, numFields =>
        getData(
          numFields,
          'https://5qsvissse9.execute-api.us-east-1.amazonaws.com/prd/v1/credit/density'
        )
      )}
    >
      <FormGroup row>
        <Label for="lambda" md={offset}>
          Lambda
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="lambda"
            id="lambda"
            {...getValueAndOnChange('lambda')}
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
        <Label for="numU" md={offset}>
          Steps in U
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="1"
            name="numU"
            id="numU"
            {...getValueAndOnChange('numU')}
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="pd" md={offset}>
          Probability of default
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
        <Label for="numLoans" md={offset}>
          Number of loans
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
        <Label for="volatility" md={offset}>
          Volatility
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="volatility"
            id="volatility"
            {...getValueAndOnChange('volatility')}
          />
        </Col>
      </FormGroup>

      <FormGroup check row md={formOffset}>
        <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
      </FormGroup>
    </Form>
  )
}
const objSelect = { '/v1/credit/density': Density }
const endpoints = ['/v1/credit/density']
export default ({ onSubmit, isLoading, isVisible }) => {
  const [selectedEndpoint, setEndpoint] = useState(endpoints[0])
  return !isVisible ? null : (
    <>
      <FormGroup row>
        <Label for="selectEndpoint" md={offset}>
          Select Endpoint
        </Label>
        <Input
          type="select"
          name="select"
          id="endpoint"
          value={selectedEndpoint}
          onChange={setEndpoint}
        >
          <option value="/v1/credit/density">Density</option>
        </Input>
      </FormGroup>
      {React.createElement(objSelect[selectedEndpoint], {
        onSubmit,
        isLoading
      })}
    </>
  )
}
