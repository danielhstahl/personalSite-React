import React from 'react'
import singapore from '../assets/images/SingaporeSkyline-small.jpg'
import background from '../assets/images/backgroundsmall.jpg'
import { Col, Row } from 'antd'
import { ImageCard } from '../components/Cards'

const IMAGE_HEIGHT = '400px'
const Home = () => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <ImageCard
        image={singapore}
        alt="Singapore skyline"
        height={IMAGE_HEIGHT}
        title="Summary"
      >
        <p>
          To be at the cutting edge of financial and technological progress by
          promoting and inventing innovations in application development, design
          architecture, and mathematical modeling.
        </p>
      </ImageCard>
    </Col>
    <Col xs={24} md={12}>
      <ImageCard
        image={background}
        alt="Abstract background image"
        height={IMAGE_HEIGHT}
        title="Vision"
      >
        <p>
          I work for{' '}
          <a
            href="http://regions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Regions
          </a>{' '}
          as the head of data and analytics platforms and engineering in the
          Data and Analytics office. I have a masters degree in mathematical
          finance from the University of North Carolina Charlotte. Previously I
          have worked as a Model Risk Manager at Regions, at{' '}
          <a href="http://glsllc.com" target="_blank" rel="noopener noreferrer">
            GLS
          </a>{' '}
          in portfolio analytics, as an internal auditor in quantitative
          analytics at BB&T (now Truist), and as a model developer and risk
          analyst at Uwharrie Capital Corp. I currently reside in Birmingham,
          AL.
        </p>
      </ImageCard>
    </Col>
  </Row>
)
export default Home
