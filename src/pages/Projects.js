import React from 'react'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import CreditProject from '../components/CreditProject'
import StandardGridElement from '../components/StandardGridElement'

const Projects = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardBody>
            <CardTitle>Credit Risk</CardTitle>
            <CreditProject />
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)

export default Projects
