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
import { Link } from 'react-router-dom'
import model from '../assets/images/model.jpg'
import liquidity from '../assets/images/liquidity.jpg'
import sql from '../assets/images/sql.jpg'
import crypto from '../assets/images/crypto.jpg'
import code from '../assets/images/code.jpg'
import passion from '../assets/images/passion.jpg'
import CreditRiskPaper from '../assets/pdf/CreditRiskPaper.pdf'
import OpsRiskPaper from '../assets/pdf/OpsRiskPaper.pdf'
import StandardGridElement from '../components/StandardGridElement'
import { RESEARCH, PROJECTS } from '../constants/routes'

const About = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={model} alt="modeling" />
          <CardBody>
            <CardTitle className="lead">Mathematical Modeling</CardTitle>
            <CardText>
              I have created credit and operational economic capital models as
              can be seen in the <Link to={RESEARCH}>research</Link> section of
              this site. I also have created ad-hoc projects (including a full
              market risk model) some of which can be found in the{' '}
              <Link to={PROJECTS}>projects</Link> section. At a previous job I
              created the ALLL and economic capital models. The economic capital
              model used{' '}
              <a
                href="http://arxiv.org/pdf/0708.2542.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Euler's{' '}
              </a>{' '}
              method to allocate economic capital to each loan in the portfolio.
              Each of these models was written in Java and had a GUI which
              allowed non-technical users to price loans and analyze risk.
              Currently, I am building out a library of models in the
              programming language Rust. I have{' '}
              <a
                href="https://github.com/realoptions/option_price_faas"
                target="_blank"
                rel="noopener noreferrer"
              >
                option pricing models
              </a>
              ,{' '}
              <a
                href="https://github.com/phillyfan1138/hull_white_rust"
                target="_blank"
                rel="noopener noreferrer"
              >
                market risk models
              </a>
              , and{' '}
              <a
                href="https://github.com/phillyfan1138/loan_ec"
                target="_blank"
                rel="noopener noreferrer"
              >
                economic capital models
              </a>
              .
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={liquidity} alt="liquidity" />
          <CardBody>
            <CardTitle className="lead">Liquidity Risk</CardTitle>
            <CardText>
              One of the biggest risks to a financial institution is a lack of
              liquidity. A bank may be well capitalized, have good cash flow,
              and even be profitable. But a sudden draw on liabilities caused
              either by the withdrawal from a single large client or a systemic
              withdrawal by many smaller clients can render a bank insolvent
              regardless of these other factors. My published paper on credit
              risk features a semi-endogenous liquidity event that increases in
              probability as credit losses increases. A unpublished follow up to
              that paper describes in more detail how the liquidity capital
              should be applied to the loan level. An additional unpublished
              paper presents a short description of the causes and recent
              impacts of liquidity crisis as well as proposals for managing
              liquidity risk. These papers can be found in the{' '}
              <Link to={RESEARCH}>research</Link> section of this site.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={sql} alt="sql" />
          <CardBody>
            <CardTitle className="lead">Data</CardTitle>
            <CardText>
              I have experience with big data solutions such as Hadoop and S3. I
              have also experimented with streaming solutions such as Kafka and
              Kinesis. Large scale problems which require highly parallel
              algorithms running on multiple computers has appealed to me as a
              way to conveniently scale models which must be run on large
              datasets. Despite the prevalence of big data, traditional
              relational databases still have their place. I've created numerous
              normalized relational schema for dozens of tables that have been
              used in production.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={crypto} alt="sql" />
          <CardBody>
            <CardTitle className="lead">Fintech</CardTitle>
            <CardText>
              I have a strong interest in blockchain technology and
              cryptocurrencies. Financial instutions will be forced by
              competitive pressures to streamline and innovate. Blockchain
              technology promises to a means by which this innovation will
              occur. Transactions can be automated and are fully auditable.
              Aside from huge cost savings, strong internal controls will be
              inherent in the blockchain process. I have completed the MIT
              FinTech course and was one of the four capstones (out of over 300)
              who were picked by the course advisors. The code used in the
              capstone is available on the{' '}
              <a
                href="https://github.com/skyPet"
                target="_blank"
                rel="noopener noreferrer"
              >
                SkyPet
              </a>{' '}
              repository.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={code} alt="code" />
          <CardBody>
            <CardTitle className="lead">Programming</CardTitle>
            <CardText>
              I have created applications in Java, C++, Python, Rust, and
              HTML/Javascript including NodeJS. Some of these applications are
              available on <Link to={RESEARCH}>this site</Link> while others are
              available on my{' '}
              <a
                href="https://github.com/phillyfan1138/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                github
              </a>{' '}
              page. These applications range from an{' '}
              <a
                href="https://github.com/phillyfan1138/binomial_tree_rust"
                target="_blank"
                rel="noopener noreferrer"
              >
                automatic recombining tree class for any single dimensional
                stochastic differential equation
              </a>{' '}
              to creating a{' '}
              <a
                href="https://github.com/phillyfan1138/onkyo-yatse-plugin"
                target="_blank"
                rel="noopener noreferrer"
              >
                plugin
              </a>{' '}
              for{' '}
              <a
                href="https://yatse.tv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yatse
              </a>{' '}
              which is available at the{' '}
              <a
                href="https://play.google.com/store/apps/details?id=com.danielhstahl.plugin.avreceiver.onkyo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google app store
              </a>{' '}
              . Additionally I have a working knowledge of SAS, VBA, and VB.net.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardImg top width="100%" src={passion} alt="passion" />
          <CardBody>
            <CardTitle className="lead">Passions</CardTitle>
            <CardText>
              I have a goal of creating a parsimonious economic capital model
              that is both actionable and accurate. Actionable models have
              intuitive results for various economic and bank specific scenarios
              with output that can be used to improve risk-based performance
              while providing timely results. Accurate models use assumptions
              that are close approximations of the actual data generating
              process. In the economic capital space, accurate models typically
              require CPU intensive Monte Carlo simulations. Many Monte Carlo
              implementations fail to meet the goal of providing timely results.
              One method to circumvent Monte Carlo computation uses
              characteristic functions to efficiently blend market, operational,
              credit risk, and liquidity risk while retaining accuracy. I have
              written two papers which demonstrate this technique for{' '}
              <a
                href={CreditRiskPaper}
                target="_blank"
                rel="noopener noreferrer"
              >
                credit risk
              </a>{' '}
              and{' '}
              <a href={OpsRiskPaper} target="_blank" rel="noopener noreferrer">
                operational risk
              </a>
              .
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)
export default About
