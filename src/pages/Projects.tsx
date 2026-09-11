import React from 'react'
import CreditProject from '../components/CreditRiskForm'
import OpsProject from '../components/OpsRiskForm'
import LambdaForm from '../components/LambdaForm'
import DensityChart from '../components/DensityChart'
import HistogramChart from '../components/HistogramChart'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import MarketRiskPaper from '../assets/pdf/MarketRiskDocumentation.pdf'
import { Col, Row } from 'antd'
import { blue } from '@ant-design/colors'
import MarketRiskForm from '../components/MarketRiskForm'
import { LinkCard } from '../components/Cards'

const COLOR_INDEX = 5
const color = blue[COLOR_INDEX]
const Projects = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <LinkCard
          action={{ href: CreditRiskPaper, label: 'Documentation' }}
          title="Credit Risk"
        >
          <LambdaForm
            formComponent={CreditProject}
            chartComponent={DensityChart}
            color={color}
          />
        </LinkCard>
      </Col>

      <Col xs={24} md={12}>
        <LinkCard
          action={{ href: OpsRiskPaper, label: 'Documentation' }}
          title="Operational Risk"
        >
          <LambdaForm
            formComponent={OpsProject}
            chartComponent={DensityChart}
            color={color}
          />
        </LinkCard>
      </Col>
      <Col xs={24} md={12}>
        <LinkCard
          action={{ href: MarketRiskPaper, label: 'Documentation' }}
          title="Market Risk"
        >
          <LambdaForm
            formComponent={MarketRiskForm}
            chartComponent={HistogramChart}
            color={color}
          />
        </LinkCard>
      </Col>
    </Row>
  )
}

export default Projects
