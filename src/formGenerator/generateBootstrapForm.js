const YAML = require('js-yaml')
const fs = require('fs')
const https = require('https')
const getAsString = url =>
  new Promise((res, rej) => {
    https
      .get(url, response => {
        let str = ''
        response
          .on('data', d => {
            str = str + d
          })
          .on('end', () => {
            res(str)
          })
      })
      .on('error', e => {
        rej(e)
      })
  })

const capitalizeFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1)
const urls = [
  'https://cdn.jsdelivr.net/gh/phillyfan1138/credit_faas@v4/docs/openapi_merged.yml'
  //"https://cdn.jsdelivr.net/gh/phillyfan1138/ops_faas@v3/docs/openapi_merged.yml",
]
const topOfForm = `
import React, { useState } from 'react'
import { Label, Input, Form, FormGroup, Col } from 'reactstrap'
import { getData } from '../../utils/service'
import LoadingButton from '../LoadingButton'
import { onChangeHOF, getValueAndOnChangeHOF, formOffset } from '../../utils/form'
import PropTypes from 'prop-types'
const { size, offset } = formOffset
`

const createProject = yamlStr => {
  const root = YAML.load(yamlStr)
  const url = root.servers[0].url
  const endpoints = Object.keys(root.paths)
  const forms = endpoints.map(path => {
    let urlSplit = path.split('/')
    const componentName = capitalizeFirst(urlSplit[urlSplit.length - 1])
    return {
      name: componentName,
      value: path,
      form: createForm(root.paths[path], url + path, componentName)
    }
  })
  const components = forms.reduce((aggr, curr) => aggr + curr.form, ``)
  const objSelect =
    forms.reduce((aggr, { name, value }) => {
      return aggr + `'${value}':${name},`
    }, `{`) + '}'
  const getName = forms.reduce((aggr, { name, value }) => {
    return { ...aggr, [value]: name }
  }, {})
  const project = `
${topOfForm}
${components}
const objSelect=${objSelect}
const endpoints=${JSON.stringify(endpoints)}
export default ({ onSubmit, isLoading, isVisible })=>{
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
                ${endpoints.reduce(
                  (aggr, v) =>
                    aggr +
                    `
                <option value='${v}'>${getName[v]}</option>`,
                  ``
                )}
            </Input>
        </FormGroup>
        {React.createElement(objSelect[selectedEndpoint],{onSubmit, isLoading})}
        </>
    )
}
`
  return { project, projectName: root.info.title.split(' ').join('_') }
}

const createForm = (path, url, componentName) => {
  const body = path.post.requestBody.content['application/json'].schema
  const requiredFields = body.required
  const { properties } = body
  const defaultFields = requiredFields.reduce((aggr, curr) => {
    return {
      ...aggr,
      [curr]: properties[curr].example
    }
  }, {})
  const component = `
const defaultFields=${JSON.stringify(defaultFields)}
const ${componentName}=({onSubmit, isLoading})=>{
    const [fields, setFields] = useState(defaultFields)
    const onChange = onChangeHOF(fields, setFields)
    const getValueAndOnChange = getValueAndOnChangeHOF(fields, onChange)
    return (
        <Form onSubmit={onSubmit(fields, numFields=>getData(numFields,'${url}'))}>
`
  const formItself =
    requiredFields.reduce((aggr, curr) => {
      const { description, type } = properties[curr]
      const step = type === 'integer' ? '1' : 'any'
      return (
        aggr +
        `
        <FormGroup row>
            <Label for="${curr}" md={offset}>
                ${description}
            </Label>
            <Col md={size}>
                <Input
                    type="number"
                    step="${step}"
                    name="${curr}"
                    id="${curr}"
                    {...getValueAndOnChange('${curr}')}
                />
            </Col>
        </FormGroup>
    `
      )
    }, component) +
    `
    <FormGroup check row md={formOffset}>
        <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
    </FormGroup>
    </Form>
    )
}`
  return formItself
}

Promise.all(
  urls.map(url =>
    getAsString(url)
      .then(createProject)
      .then(({ project, projectName }) => {
        fs.writeFileSync(
          `./src/components/generatedComponents/${projectName}.js`,
          project
        )
      })
  )
)
