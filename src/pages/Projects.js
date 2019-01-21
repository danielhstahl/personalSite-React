import React from 'react'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import CreditProject from '../components/CreditProject'
import LambdaForm from '../components/LambdaForm'
import StandardGridElement from '../components/StandardGridElement'
const FakeChart = () => null
const Projects = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardBody>
            <CardTitle className="lead">Credit Risk</CardTitle>
            <LambdaForm chartComponent={FakeChart}>
              {({ onSubmit, isLoading }) => (
                <CreditProject onSubmit={onSubmit} isLoading={isLoading} />
              )}
            </LambdaForm>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)

export default Projects
