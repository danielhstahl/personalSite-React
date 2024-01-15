import React from 'react'
//import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import CreditProject from '../components/CreditRiskForm'
import OpsProject from '../components//OpsRiskForm'
import LambdaForm from '../components/LambdaForm'
import DensityChart from '../components/DensityChart'
import HistogramChart from '../components/HistogramChart'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import MarketRiskPaper from '../assets/pdf/MarketRiskDocumentation.pdf'
import { Card, Col, Row } from 'antd';
import { blue } from '@ant-design/colors';
import MarketRiskForm from '../components/MarketRiskForm'
const { Meta } = Card;
const COLOR_INDEX = 5
const color = blue[COLOR_INDEX]
const Projects = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card
          hoverable
          actions={[
            <a color="secondary" className="float-right text-secondary" href={CreditRiskPaper}>
              Documentation
            </a>
          ]}
        >
          <Meta title="Credit Risk" />
          <LambdaForm
            formComponent={CreditProject}
            chartComponent={DensityChart}
            color={color}
          />
        </Card>
      </Col>


      <Col xs={24} md={12}>
        <Card
          hoverable
          actions={[
            <a color="secondary" className="float-right text-secondary" href={OpsRiskPaper}>
              Documentation
            </a>
          ]}
        >
          <Meta title="Operational Risk" />
          <LambdaForm
            formComponent={OpsProject}
            chartComponent={DensityChart}
            color={color}
          />

        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card
          hoverable
          actions={[
            <a className="float-right text-secondary" href={MarketRiskPaper}>
              Documentation
            </a>
          ]}
        >
          <Meta title="Market Risk" />
          <LambdaForm
            formComponent={MarketRiskForm}
            chartComponent={HistogramChart}
            color={color}
          />
        </Card>
      </Col>


    </Row >
  )
}

export default Projects
