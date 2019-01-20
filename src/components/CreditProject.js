import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col, Button } from 'reactstrap'
import { getCreditRiskResults } from '../utils/service'
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
const onChangeHOF = (fields, setFields) => key => value =>
  setFields({ ...fields, [key]: value })
const onSubmit = (fields, setChart) => e => {
  e.preventDefault()
  getCreditRiskResults(fields).then(setChart)
}
const getValueAndOnChangeHOF = (fields, onChange) => key => ({
  value: fields[key],
  onChange: onChange(key)
})
const offset = { size: 10, offset: 2 }
const CreditProject = () => {
  const [fields, setFields] = useState(defaultFields)
  const [chart, setChart] = useState({})
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return (
    <Form onSubmit={onSubmit(fields, setChart)}>
      <FormGroup row>
        <Label for="n" md={4}>
          Number of Assets
        </Label>
        <Col md={8}>
          <Input type="number" name="n" id="n" {...getValueAndOnChange('n')} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="t" md={4}>
          Time Horizon
        </Label>
        <Col md={8}>
          <Input type="number" name="t" id="t" {...getValueAndOnChange('t')} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="x0" md={4}>
          X0
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="x0"
            id="x0"
            {...getValueAndOnChange('x0')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="alpha" md={4}>
          Systemic Drift
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="alpha"
            id="alpha"
            {...getValueAndOnChange('alpha')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="sigma" md={4}>
          Systemic Volatility
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="sigma"
            id="sigma"
            {...getValueAndOnChange('sigma')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="q" md={4}>
          q
        </Label>
        <Col md={8}>
          <Input type="number" name="q" id="q" {...getValueAndOnChange('q')} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="lambda" md={4}>
          lambda
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="lambda"
            id="lambda"
            {...getValueAndOnChange('lambda')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="xNum" md={4}>
          Steps in X
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="xNum"
            id="xNum"
            {...getValueAndOnChange('xNum')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="uNum" md={4}>
          Steps in U
        </Label>
        <Col md={8}>
          <Input
            type="number"
            name="uNum"
            id="uNum"
            {...getValueAndOnChange('uNum')}
          />
        </Col>
      </FormGroup>
      <FormGroup check row md={offset}>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  )
}
export default CreditProject
