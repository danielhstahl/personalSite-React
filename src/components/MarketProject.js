import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
//import { getCreditRiskResults } from '../utils/service'
import LoadingButton from './LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../utils/form'
import PropTypes from 'prop-types'
const defaultFields = {
  n: 1000,
  t: 10,
  r0: 0.04,
  a: 0.2,
  b: 0.05,
  T: 1,
  sigma: 0.04,
  selectedAsset: 0
}

const assetTypes = [
  { value: 0, label: 'Bond', defaultFields: {} },
  {
    value: 1,
    label: 'Euro Dollar Future',
    defaultFields: { Tm: 1.25, delta: 0.25 }
  },
  {
    value: 3,
    label: 'Bond Call (Zero Coupon)',
    defaultFields: { Tm: 1.25, k: 0.97 }
  },
  {
    value: 4,
    label: 'Bond Put (Zero Coupon)',
    defaultFields: { Tm: 1.25, k: 0.97 }
  },
  { value: 7, label: 'Caplet', defaultFields: { delta: 0.25, k: 0.02 } },
  { value: 8, label: 'Swap', defaultFields: { delta: 0.25, k: 0.02 } },
  {
    value: 9,
    label: 'Swaption',
    defaultFields: { Tm: 6, delta: 0.25, k: 0.03 }
  },
  {
    value: 10,
    label: 'American Swaption (Warning: slower solution)',
    defaultFields: { Tm: 6, delta: 0.25, k: 0.03 }
  }
]

const { size, offset } = formOffset
const MarketProject = ({ onSubmit, isLoading, isVisible }) => {
  const [fields, setFields] = useState(defaultFields)
  const onChange = onChangeHOF(fields, setFields)
  const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
  return !isVisible ? null : (
    <Form onSubmit={onSubmit(fields, () => {})}>
      <FormGroup row>
        <Label for="n" md={offset}>
          Select an Asset
        </Label>
        <Col md={size}>
          <Input
            type="select"
            name="select"
            id="assetType"
            {...getValueAndOnChange('n')}
          >
            <option value={0}>Bond</option>
            <option value={1}>Euro Dollar Future</option>
            <option value={3}>Bond Call (Zero Coupon)</option>
            <option value={4}>Bond Put (Zero Coupon)</option>
            <option value={7}>Caplet</option>
            <option value={8}>Swap</option>
            <option value={9}>Swaption</option>
            <option value={10}>
              American Swaption (Warning: slower solution)
            </option>
          </Input>
        </Col>
        <Label for="n" md={offset}>
          Number of Simulations
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
        <Label for="r0" md={offset}>
          Short Rate
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="any"
            name="r0"
            id="r0"
            {...getValueAndOnChange('r0')}
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
        <Label for="a" md={offset}>
          Mean Reversion
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
        <Label for="b" md={offset}>
          Long Run Average
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="b"
            id="b"
            step="any"
            {...getValueAndOnChange('b')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="t" md={offset}>
          Simulate to (in days)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            step="1"
            name="t"
            id="t"
            {...getValueAndOnChange('t')}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="T" md={offset}>
          Maturity (years)
        </Label>
        <Col md={size}>
          <Input
            type="number"
            name="T"
            step="any"
            id="T"
            {...getValueAndOnChange('T')}
          />
        </Col>
      </FormGroup>
      <FormGroup check row md={formOffset}>
        <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
      </FormGroup>
    </Form>
  )
}
MarketProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired
}
export default MarketProject
