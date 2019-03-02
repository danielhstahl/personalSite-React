import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row
} from 'reactstrap'
import StandardGridElement from '../components/StandardGridElement'
import singapore from '../assets/images/SingaporeSkyline-small.jpg'
import background from '../assets/images/backgroundsmall.jpg'

const Home = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={singapore} alt="vision" />
          <CardBody>
            <CardTitle className="lead">Vision</CardTitle>
            <CardText>
              To be at the cutting edge of financial and technological progress
              by promoting and inventing innovations in application development,
              design architecture, and mathematical modeling.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={background} alt="summary" />
          <CardBody>
            <CardTitle className="lead">Summary</CardTitle>
            <CardText>
              I work for{' '}
              <a
                href="http://regions.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Regions
              </a>{' '}
              as the model platform manager in the Data and Analytics office. I
              have a masters degree in mathematical finance from the University
              of North Carolina Charlotte. Previously I have worked as a Model
              Risk Manager at Regions, at{' '}
              <a
                href="http://glsllc.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GLS
              </a>{' '}
              in portfolio analytics, as an internal auditor in quantitative
              analytics at BB&T, and as a model developer and risk analyst at
              Uwharrie Capital Corp. I currently reside in Birmingham, AL.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)
export default Home
