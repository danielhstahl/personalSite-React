import React, { Component } from 'react';
import { Link} from 'react-router';
import {CustomCard} from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';


class About extends Component {
  render() {
    return (
       <CustomGridList>
        <CustomGrid>
            <CustomCard title="Mathematical Modeling" img={require("./assets/images/model.jpg")} >
                I have created credit and operational economic capital models as can be seen in the <Link to="/research">research</Link> section of this site.  I also have created ad-hoc projects (including a full market risk model) some of which can be found in the <Link to="/projects">projects</Link> section.  At a previous job I created the ALLL and economic capital models.  The economic capital model used <a href='http://arxiv.org/pdf/0708.2542.pdf'>Euler's </a> method to allocate economic capital to each loan in the portfolio.  Each of these models was written in Java and had a GUI which allowed non-technical users to price loans and analyze risk.
            </CustomCard>
        </CustomGrid>
        <CustomGrid>
            <CustomCard title="Liquidity Risk" img={require("./assets/images/liquidity.jpg")}>
                One of the biggest risks to a financial institution is a lack of liquidity.  A bank may be well capitalized, have good cash flow, and even be profitable. But a sudden draw on liabilities caused either by the withdrawal from a single large client or a systemic withdrawal by many smaller clients can render a bank insolvent regardless of these other factors.  My published paper on credit risk features a semi-endogenous liquidity event that increases in probability as credit losses increases.  A unpublished follow up to that paper describes in more detail how the liquidity capital should be applied to the loan level.  An additional unpublished paper presents a short description of the causes and recent impacts of liquidity crisis as well as proposals for managing liquidity risk.  These papers can be found in the <Link to="/research">research</Link> section of this site.  
            </CustomCard>
        </CustomGrid>

        <CustomGrid>
            <CustomCard title="Databases" img={require("./assets/images/sql.jpg")}>
                I have extensive experience in designing and creating databases in SQL Server.  At my previous job I created a data warehouse which captured and retained all loan data.  This enabled more advanced analytics including seasoning analysis and time to default analysis.  Additionally, the availability of this data enabled economic capital and ALLL calculations to be computed in seconds instead of the days of data gathering that previously was required.  I have designed, implemented, and tracked our workflow around data tests.  To this end I have created an extensive infrastructure with dozens of normalized and interlinked tables.  This enables automated workflows, automated documentation generation, and clever visualizations showing the inter-relationships between all the tables. 
            </CustomCard>
        </CustomGrid>


        <CustomGrid>
            <CustomCard title="FinTech" img={require("./assets/images/crypto.jpg")}>
               I have a strong interest in blockchain technology and cryptocurrencies.  Financial instutions will be forced by competitive pressures to streamline and innovate.  Blockchain technology promises to be the optimal means by which this innovation will occur.  Transactions can be automated and are fully auditable.  Aside from huge cost savings, strong internal controls will be inherent in the blockchain process.  I have completed the MIT FinTech course and was one of the four capstones (out of over 300) who were picked by the course advisors.  The code used in the capstone is available on the <a href="https://github.com/skyPet">SkyPet</a> repository. 
            </CustomCard>
        </CustomGrid>


         <CustomGrid>
            <CustomCard title="Programming" img={require("./assets/images/code.jpg")}>
                I have created applications in Java, C++, Python, and HTML/Javascript including nodejs.  Some of these applications are available on  <Link to="/research">this site</Link> while others are available on my <a href="https://github.com/phillyfan1138/"> github</a> page.  These applications range from an <a href="https://github.com/phillyfan1138/BinomialTree">automatic recombining tree class for any single dimensional stochastic differential equation</a> to creating an <a href="https://github.com/phillyfan1138/DuneClient">interface</a> between <a href="http://emby.media/">emby</a> and the <a href="http://www.dune-hd-usa.com/">Dune Media Player</a>.  Additionally I have a working knowledge of SAS, VBA, and VB.net.
            </CustomCard>
        </CustomGrid>
        <CustomGrid>
            <CustomCard title="Passions" img={require("./assets/images/passion.jpg")}>
                I have a goal of creating a parsimonious economic capital model that is both actionable and accurate.  Actionable models have intuitive results for various economic and bank specific scenarios with output that can be used to improve risk-based performance while providing timely results.  Accurate models use assumptions that are close approximations of the actual data generating process.  In the economic capital space, accurate models typically require CPU intensive Monte Carlo simulations.  Many Monte Carlo implementations fail to meet the goal of providing timely results.  One method to circumvent Monte Carlo computation uses characteristic functions to efficiently blend market, operational, credit risk, and liquidity risk while retaining accuracy.  I have written two papers which demonstrate this technique for <a href={require('./assets/pdf/CreditRiskPaper.pdf')}>credit risk</a> and <a href={require('./assets/pdf/OpsRiskPaper.pdf')}>operational risk</a>. 
            </CustomCard>
        </CustomGrid>


        </CustomGridList>
    );
  }
}




export default About;
