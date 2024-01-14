import React from 'react'

import creditRisk from '../assets/images/creditRisk.jpg'
import liquidity from '../assets/images/liquidity.jpg'
import operationalRisk from '../assets/images/operationalRisk.jpg'
import creditRiskExtensions from '../assets/images/creditRiskExtensions.jpg'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import CreditRiskExtensions from '../assets/pdf/CreditRiskExtensions.pdf'
import LiquidityRisk from '../assets/pdf/LiquidityRisk.pdf'
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

const IMAGE_HEIGHT = "200px"
const Research = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} md={12} xl={8}>
      <Card
        hoverable
        cover={<div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}><img alt="credit risk" src={creditRisk} /></div>}
      >
        <Meta title="Credit Risk" /><p>
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

        </p>
      </Card>
    </Col>
    <Col xs={24} md={12} xl={8}>
      <Card
        hoverable
        cover={<div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}><img alt="operational risk" src={operationalRisk} /></div>}
      >
        <Meta title="Operational Risk" /><p>
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

        </p>
      </Card>
    </Col>
    <Col xs={24} md={12} xl={8}>
      <Card
        hoverable
        cover={<div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}><img alt="credit risk" src={creditRiskExtensions} /></div>}
      >
        <Meta title="Credit Risk Extensions (unpublished)" /><p>
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

        </p>
      </Card>
    </Col>
    <Col xs={24} md={12} xl={8}>
      <Card
        hoverable
        cover={<div style={{ overflow: "hidden", height: IMAGE_HEIGHT }}><img alt="liquidity risk" src={liquidity} /></div>}
      >
        <Meta title="Liquidity Risk (unpublished)" /><p>
          This paper is a short description and proposal for managing
          liquidity risk.
          <br />
          <a href={LiquidityRisk} target="_blank" rel="noopener noreferrer">
            Internal Link
          </a>

        </p>
      </Card>
    </Col>
  </Row>
)

export default Research
