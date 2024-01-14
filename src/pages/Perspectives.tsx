import React from 'react'
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
const Thoughts = () => (
  <Row gutter={16}>
    <Col xs={24} sm={12}>
      <Card
        hoverable
      >
        <Meta title="Thoughts on model development" /><p>
          Models require robust DevOps automation and declarability even
          more than traditional software. Models have a number of additional
          inherent complexities which makes the discipline, automation, and
          transparency of DevOps practices practically a requirement. These
          additional complexities include long running and computationally
          intense training, data dependence at both at train and scoring,
          and deterioration of performance over time.
          <br />
          In order to address these complexities, it is important to have a
          mental model for model development. Fortunately, many aspects of
          the software development lifecycle apply to model development as
          well. For example, model training is akin to software compilation
          for software engineers. Software goes through a cycle where it is
          versioned in a source control system (typically Git), tested using
          a continuous integration (CI) tool, and then compiled or built
          into a binary or package. A common example in the Java world is to
          build and release a jar file. In model development, software is
          written to train a model, tested using CI tools (both code testing
          and potentially statistical tests), and an artifact is deployed
          (the "trained" model). This trained model, much like a jar file in
          Java, should be versioned so that consuming applications can
          choose the appropriate model from the model's history.
          <br />
          Unfortunately, while compilation in the software world is
          typically quick (seconds or minutes), model training can take
          hours to days. Hence new tooling and thought processes must be
          used for model training. But here again, concepts from extreme
          programming can be used. For example, much of the model
          development time is spent on data manipulations and model
          experimentation. Before starting model development,
          transformations and statistical tests/requirements can be created
          which the model must pass in order to be appropriate for
          deployment. By using Test Driven Development, much of the logic
          can be tested prior to training and model selection can be
          performed and automated as part of the training process.
        </p>
      </Card>
    </Col>
    <Col xs={24} sm={12}>
      <Card
        hoverable
      >
        <Meta title="How to develop a model" /><p>
          Consider the process to be modeled. What constraints are there?
          How precise does the model have to be? What is the process which
          could approximate the process that actually generates the data? As
          an example, consider a model used to satisfy the{' '}
          <a
            href="http://www.occ.treas.gov/news-issuances/bulletins/2012/bulletin-2012-25a-Market-Risk.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
        </p>
      </Card>
    </Col>
    <Col xs={24} sm={12}>
      <Card
        hoverable
      >
        <Meta title="Model Risk" /><p>
          Emanuel Derman (of{' '}
          <a
            href="http://www.emanuelderman.com/media/faj-one_factor_model.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Black-Derman-Toy
          </a>{' '}
          fame) anticipated the current scrutiny on model risk by a few
          decades.{' '}
          <a
            href="http://www.emanuelderman.com/media/gs-model_risk.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            His now classic paper on model risk
          </a>{' '}
          was published over ten years before the "great recession" and in
          many ways offers a more concise and sophisticated approach to
          model risk than that provided by{' '}
          <a
            href="http://www.federalreserve.gov/bankinforeg/srletters/sr1107a1.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
          the Black-Scholes model. I disagree with him slightly here: the
          risk-neutral pricing paradigm that arose from the Black-Scholes is
          more fundamental and practical. In many situations fundamental
          models don't even require "estimates" or "predictions" in the
          traditional sense: they provide KPIs through which decisions can
          be made. For example, in the Black Scholes model implied
          volatility can be used as a risk metric. Similarly the implied
          "delta" can be used to hedge market exposure.
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
        </p>
      </Card>
    </Col>
  </Row >
)
export default Thoughts
