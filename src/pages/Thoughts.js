import React from 'react'
import { Card, CardText, CardBody, CardTitle, Container, Row } from 'reactstrap'
import StandardGridElement from '../components/StandardGridElement'

const Thoughts = () => (
  <Container>
    <Row>
      <StandardGridElement>
        <Card>
          <CardBody>
            <CardTitle>Thoughts on model development</CardTitle>
            <CardText>
              Model development should follow similar process to software
              application development. Application development separates the
              GUI, the programming logic, and the database. Models are typically
              going to be embedded in the programming logic section. In modern
              web applications the GUI is handled almost exclusively on the
              client side while the server is responsible for application logic
              and database communication. For example, this site has all routes,
              links, and visual content on the client. The server is responsible
              for numerical implementations of the models.
              <br />
              GUI development for models should allow all important model
              features to be easily altered. Data should never be a thought for
              the end user and should be automatically loaded. As an example,
              CCAR uses a variety of scenarios over a fixed time frame defined
              by the Federal Reserve. However, the board of directors may want
              to consider different scenarios or a different time frame. During
              the board meeting they should be allowed to manipulate the model
              using any scenario they can imagine and see the results on the
              bank's income and balance sheet.
              <br />
              GUI development for models should also consider transparency. What
              parts of the model are the most critical? What is the biggest
              assumption or trade-off used in developing the model? These parts
              should be able to be monitored through the GUI.
              <br />
              Data should always flow into the model automatically. This can
              done through web-sockets or REST hooks. This is often used with
              external data like{' '}
              <a href="https://research.stlouisfed.org/fred2/" target="_blank">
                FRED
              </a>
              . Data can also flow through by calling data directly from a
              database. The database should be created in such a way that data
              types are guaranteed. For example, primary and foreign keys should
              be enforced, data should be labeled "not null" where appropriate.
              During development the data environment should be investigated so
              that no surprises show up after the model has been placed in
              production.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardBody>
            <CardTitle>How to develop a model</CardTitle>
            <CardText>
              Consider the process to be modeled. What constraints are there?
              How precise does the model have to be? What is the process which
              could approximate the process that actually generates the data? As
              an example, consider a model used to satisfy the{' '}
              <a
                href="http://www.occ.treas.gov/news-issuances/bulletins/2012/bulletin-2012-25a-Market-Risk.pdf"
                target="_blank"
              >
                Market Risk Rule
              </a>{' '}
              needs to include an interest rate process with "n" dimensions or
              whether a naive single-dimensional process like Vasicek or
              Cox-Ingersoll-Ross is sufficient as a first approximation.
              Doubtless using a more complicated process will yield superior
              results but at the cost of complexity and computational power.
              <br />
              Consider what type of solution should be used. Is there an
              analytical solution? If not what type of numeric scheme should be
              used? Its often tempting to solve models using Monte Carlo
              techniques due to the ease of development but for many situations
              are unnecessary. Monte Carlo, finite difference methods, and even
              Fourier techniques are{' '}
              <a
                href="https://en.wikipedia.org/wiki/Embarrassingly_parallel"
                target="_blank"
              >
                embarrassingly parallel
              </a>{' '}
              and can be run on multiple cores or on GPUs.
              <br />
              Consider calibration and calibration techniques. If possible try
              to mark the model to market instead of to historical data: the
              market is "correct" and calibration tends to be easier. This only
              applies to "risk-neutral" parameters and for applications like ALM
              or CCAR this may not be appropriate.
              <br />
              Code the model in the appropriate language. Pay attention to how
              data flows into the model.
              <br />
              Test the model. This may involve backtesting in the case of a
              time-series, trading, or hedging model. This may also involve
              Monte Carlo simulations to test the computational accuracy of the
              model: while Monte Carlo techniques are very slow they are very
              easy to develop and run. Obviously the extent and type of testing
              is very dependent on the model.
              <br />
              Make the model consumable. Without an easy to use GUI no one will
              want to use the model. The world's best model is useless if no one
              wants to use it.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
      <StandardGridElement>
        <Card>
          <CardBody>
            <CardTitle>Model Risk</CardTitle>
            <CardText>
              Emanuel Derman (of{' '}
              <a
                href="http://www.emanuelderman.com/media/faj-one_factor_model.pdf"
                target="_blank"
              >
                Black-Derman-Toy
              </a>{' '}
              fame) anticipated the current scrutiny on model risk by a few
              decades.{' '}
              <a
                href="http://www.emanuelderman.com/media/gs-model_risk.pdf"
                target="_blank"
              >
                His now classic paper on model risk
              </a>{' '}
              was published over ten years before the "great recession" and in
              many ways offers a more concise and sophisticated approach to
              model risk than that provided by{' '}
              <a
                href="http://www.federalreserve.gov/bankinforeg/srletters/sr1107a1.pdf"
                target="_blank"
              >
                SR 11-7
              </a>
              . Model risk is logically exposited and easily understood.
              However, his most practical contribution may be his model
              taxonomy.
              <br />
              Model taxonomy is often difficult to get right as stakeholders
              have varying incentives for how to define models. Derman's
              taxonomy splits models at a very abstract level and yet still
              retains transparent classifications. Executives who may be
              unfamiliar with the details of model development can still readily
              understand the taxonomy and opine on the relevance to a particular
              model. Derman differentiates between fundamental models,
              phenomenological models, and statistical models.
              <br />
              Fundamental models posit a view of the word and then try to find
              solutions given such a view. Derman's example of such a model is
              the Black-Scholes model. I may disagree with him slightly here: I
              think the risk-neutral pricing paradigm that arose from the
              Black-Scholes is more fundamental and practical. In many
              situations fundamental models don't even require "estimates" or
              "predictions" in the traditional sense: they provide KPIs through
              which decisions can be made. For example, in the Black Scholes
              model implied volatility can be used as a risk metric. Similarly
              the implied "delta" can be used to hedge market exposure.
              <br />
              Phenomenological models are good analogies or descriptions that
              may lack the detail or precision to be considered a fundamental
              model. These models, in the modern model risk parlance, may be
              good "challenger" models.
              <br />
              Statistical models are simply observations given data, but do not
              posit a complex relationship among data. Examples of statistical
              models include machine learning models. These models may be
              computationally complex but are typically describing simple
              results. In many ways these statistical models are unsuitable for
              "production" as there is little a-priori theory to explain the
              relationships and the relationship may alter dramatically with new
              data.
            </CardText>
          </CardBody>
        </Card>
      </StandardGridElement>
    </Row>
  </Container>
)
export default Thoughts
