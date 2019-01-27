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
import creditRisk from '../assets/images/creditRisk.jpg'
import liquidity from '../assets/images/liquidity.jpg'
import operationalRisk from '../assets/images/operationalRisk.jpg'
import creditRiskExtensions from '../assets/images/creditRiskExtensions.jpg'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import CreditRiskExtensions from '../assets/pdf/CreditRiskExtensions.pdf'
import LiquidityRisk from '../assets/pdf/LiquidityRisk.pdf'
import StandardGridElement from '../components/StandardGridElement'

const Research = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={creditRisk} alt="credit risk" />
          <CardBody>
            <CardTitle className="lead">Credit Risk</CardTitle>
            <CardText>
              This paper is published in the Journal of Credit Risk and pioneers
              efficient computation of the distribution of credit loss for large
              heterogenuous portfolios.
              <br />
              <a href={CreditRiskPaper}>Internal Link</a>
              <br />
              <a
                href="http://www.risk.net/journal-of-credit-risk/technical-paper/2436463/loss-distributions-computational-efficiency-in-an-extended-framework"
                target="_blank"
                rel="noopener noreferrer"
              >
                External Link
              </a>
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={operationalRisk} alt="credit risk" />
          <CardBody>
            <CardTitle className="lead">Operational Risk</CardTitle>
            <CardText>
              This paper is published in the Journal of Operational Risk and
              significantly extends the standard LDA operational loss framework
              to include correlation between severity and frequency and
              auto-correlation in frequency. The distribution can be recovered
              practically instantly even for very long tailed severity
              distributions.
              <br />
              <a href={OpsRiskPaper} target="_blank" rel="noopener noreferrer">
                Internal Link
              </a>
              <br />
              <a
                href="http://www.risk.net/journal-of-operational-risk/technical-paper/2454227/operational-loss-with-correlated-frequency-and-severity-an-analytical-approach"
                target="_blank"
                rel="noopener noreferrer"
              >
                External Link
              </a>
              <br />
              <a
                href="http://www.risk.net/risk/news/2455815/correlation-of-op-risk-losses-could-send-capital-soaring"
                target="_blank"
                rel="noopener noreferrer"
              >
                Interview with Risk.net
              </a>
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg
            top
            width="100%"
            src={creditRiskExtensions}
            alt="credit risk"
          />
          <CardBody>
            <CardTitle className="lead">
              Credit Risk Extensions (unpublished)
            </CardTitle>
            <CardText>
              This paper describes in greater detail how to allocate risk to
              individual loans including marginal liquidity risk.
              <br />
              <a
                href={CreditRiskExtensions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Internal Link
              </a>
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={liquidity} alt="credit risk" />
          <CardBody>
            <CardTitle className="lead">Liquidity Risk (unpublished)</CardTitle>
            <CardText>
              This paper is a short description and proposal for managing
              liquidity risk.
              <br />
              <a href={LiquidityRisk} target="_blank" rel="noopener noreferrer">
                Internal Link
              </a>
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)

export default Research
