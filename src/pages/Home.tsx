import React from 'react'
import singapore from '../assets/images/SingaporeSkyline-small.jpg'
import background from '../assets/images/backgroundsmall.jpg'
import { imageStyle } from '../utils/image'
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
const IMAGE_HEIGHT = "400px"
const IMAGE_STYLE = imageStyle(IMAGE_HEIGHT)
const Home = () => (
  <Row gutter={16}>
    <Col xs={24} md={12}>
      <Card
        hoverable
        cover={
          <div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}>
            <img alt="Singapore" src={singapore} style={IMAGE_STYLE} />
          </div>
        }
      >
        <Meta title="Summary" /><p>
          To be at the cutting edge of financial and technological progress
          by promoting and inventing innovations in application development,
          design architecture, and mathematical modeling.
        </p>
      </Card>
    </Col>
    <Col xs={24} md={12}>
      <Card
        hoverable
        cover={
          <div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}>
            <img alt="Background" src={background} style={IMAGE_STYLE} />
          </div>
        }
      >
        <Meta title="Vision" /><p>
          I work for{' '}
          <a
            href="http://regions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Regions
          </a>{' '}
          as the head of data and analytics platforms and engineering in the Data and
          Analytics office. I have a masters degree in mathematical finance
          from the University of North Carolina Charlotte. Previously I have
          worked as a Model Risk Manager at Regions, at{' '}
          <a
            href="http://glsllc.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GLS
          </a>{' '}
          in portfolio analytics, as an internal auditor in quantitative
          analytics at BB&T (now Truist), and as a model developer and risk analyst at
          Uwharrie Capital Corp. I currently reside in Birmingham, AL.
        </p>
      </Card>
    </Col>
  </Row >
)
export default Home
