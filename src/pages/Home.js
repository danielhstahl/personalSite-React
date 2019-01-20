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
            <CardTitle>Vision</CardTitle>
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
            <CardTitle>Summary</CardTitle>
            <CardText>
              I work for{' '}
              <a href="http://regions.com" target="_blank">
                Regions
              </a>{' '}
              in model risk. I have a masters degree in mathematical finance
              from the University of North Carolina Charlotte. Previously I have
              worked at{' '}
              <a href="http://glsllc.com" target="_blank">
                GLS
              </a>{' '}
              in portfolio analytics, as an internal auditor in quantitative
              analysis at BB&T, and as a model developer and risk analyst at
              Uwharrie Capital Corp. I currently reside in Birmingham, AL.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)
export default Home
