import React from 'react';
import {CustomCard} from './CustomCard';
import {CustomGrid, CustomGridList} from './CustomGrid';

const Research =()=>
<CustomGridList>
    <CustomGrid>
    <CustomCard title="Credit Risk" img={require("./assets/images/creditRisk.jpg")} >
        This paper is published in the Journal of Credit Risk and pioneers efficient computation of the distribution of credit loss for large heterogenuous portfolios.
        <br/>
        <a href={require("./assets/pdf/CreditRiskPaper.pdf")}>Internal Link </a>
        <br/>
        <a href="http://www.risk.net/journal-of-credit-risk/technical-paper/2436463/loss-distributions-computational-efficiency-in-an-extended-framework">External Link </a>

    </CustomCard>
    </CustomGrid>

    <CustomGrid>
    <CustomCard title="Operational Risk" img={require("./assets/images/operationalRisk.jpg")} >
        This paper is published in the Journal of Operational Risk and significantly extends the standard LDA operational loss framework to include correlation between severity and frequency and auto-correlation in frequency.  The distribution can be recovered practically instantly even for very long tailed severity distributions.
        <br/>
        <a href={require("./assets/pdf/OpsRiskPaper.pdf")}>Internal Link </a>
        <br/>
        <a href="http://www.risk.net/journal-of-operational-risk/technical-paper/2454227/operational-loss-with-correlated-frequency-and-severity-an-analytical-approach">External Link </a>
        <br/>
        <a href="http://www.risk.net/risk/news/2455815/correlation-of-op-risk-losses-could-send-capital-soaring">Interview with Risk.net</a>

    </CustomCard>
    </CustomGrid>
    <CustomGrid>
    <CustomCard title="Credit Risk Extensions (unpublished)" img={require("./assets/images/creditRiskExtensions.jpg")} >
        This paper describes in greater detail how to allocate risk to individual loans including marginal liquidity risk.
        <br/>
        
        <a href={require("./assets/pdf/CreditRiskExtensions.pdf")}>Internal Link</a>

    </CustomCard>
    </CustomGrid>
    <CustomGrid>
    <CustomCard title="Liquidity Risk (unpublished)" img={require("./assets/images/liquidity.jpg")} >
        This paper is a short description and proposal for managing liquidity risk.
        <br/>
        
        <a href={require("./assets/pdf/LiquidityRisk.pdf")}>Internal Link</a>

    </CustomCard>
    </CustomGrid>

</CustomGridList>


export default Research;