import React from 'react'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import CreditProject from '../components/generatedComponents/Credit_Risk_Demo'
import OpsProject from '../components/generatedComponents/Ops_Risk_Demo'
import MarketProject from '../components/generatedComponents/Market_Risk_Demo'
import LambdaForm from '../components/LambdaForm'
import StandardGridElement from '../components/StandardGridElement'
import DensityChart from '../components/DensityChart'
import HistogramChart from '../components/HistogramChart'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import MarketRiskPaper from '../assets/pdf/MarketRiskDocumentation.pdf'

const Projects = () => {
  const style = getComputedStyle(document.body)
  const theme = {
    primary: style.getPropertyValue('--primary'),
    secondary: style.getPropertyValue('--secondary')
  }
  return (
    <Container>
      <Row>
        <StandardGridElement>
          <Card>
            <CardBody>
              <CardTitle>
                <span className="lead">Credit Risk</span>
                <a className="float-right" href={CreditRiskPaper}>
                  Documentation
                </a>
              </CardTitle>
              <LambdaForm chartComponent={DensityChart} color={theme.primary}>
                {({ onSubmit, isLoading, isVisible }) => (
                  <CreditProject
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    isVisible={isVisible}
                  />
                )}
              </LambdaForm>
            </CardBody>
          </Card>
        </StandardGridElement>
        <StandardGridElement>
          <Card>
            <CardBody>
              <CardTitle>
                <span className="lead">Operational Risk</span>
                <a className="float-right" href={OpsRiskPaper}>
                  Documentation
                </a>
              </CardTitle>
              <LambdaForm chartComponent={DensityChart} color={theme.primary}>
                {({ onSubmit, isLoading, isVisible }) => (
                  <OpsProject
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    isVisible={isVisible}
                  />
                )}
              </LambdaForm>
            </CardBody>
          </Card>
        </StandardGridElement>
        <StandardGridElement>
          <Card>
            <CardBody>
              <CardTitle>
                <span className="lead">Market Risk</span>
                <a className="float-right" href={MarketRiskPaper}>
                  Documentation
                </a>
              </CardTitle>
              <LambdaForm chartComponent={HistogramChart} color={theme.primary}>
                {({ onSubmit, isLoading, isVisible }) => (
                  <MarketProject
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    isVisible={isVisible}
                  />
                )}
              </LambdaForm>
            </CardBody>
          </Card>
        </StandardGridElement>
      </Row>
    </Container>
  )
}

export default Projects
