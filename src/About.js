import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link} from 'react-router'
import Flexbox from 'flexbox-react';
//$color-primary: $palette-grey-500;
//mdl-color--grey-800
const margin='50px';
class About extends Component {
  render() {
    return (
       <Flexbox flexDirection="column">
        <Flexbox flexGrow={1} margin={margin}>
            <SubAbout title="Mathematical Modeling" img={require("./assets/images/model.jpg")} >
                I have created credit and operational economic capital models as can be seen in the <Link to="/research">research</Link> section of this site.  I also have created ad-hoc projects (including a full market risk model) some of which can be found in the <Link to="/projects">projects</Link> section.  At a previous job I created the ALLL and economic capital models.  The economic capital model used <a href='http://arxiv.org/pdf/0708.2542.pdf'>Euler's </a> method to allocate economic capital to each loan in the portfolio.  Each of these models was written in Java and had a GUI which allowed non-technical users to price loans and analyze risk.
            </SubAbout>
        </Flexbox>
        <Flexbox flexGrow={1} margin={margin}>
            <SubAbout title="Liquidity Risk" img={require("./assets/images/liquidity.jpg")}>
                One of the biggest risks to a financial institution is a lack of liquidity.  A bank may be well capitalized, have good cash flow, and even be profitable. But a sudden draw on liabilities caused either by the withdrawal from a single large client or a systemic withdrawal by many smaller clients can render a bank insolvent regardless of these other factors.  My published paper on credit risk features a semi-endogenous liquidity event that increases in probability as credit losses increases.  A unpublished follow up to that paper describes in more detail how the liquidity capital should be applied to the loan level.  An additional unpublished paper presents a short description of the causes and recent impacts of liquidity crisis as well as proposals for managing liquidity risk.  These papers can be found in the <Link to="/research">research</Link> section of this site.  
            </SubAbout>
        </Flexbox>
        
            
        </Flexbox>
    );
  }
}

class SubAbout extends Component{
render() {
    return (
         <Card>
            <CardMedia
            overlay={<CardTitle title={this.props.title}/>}
            
            >
            <img style={{objectFit: 'cover'}} src={this.props.img} />
            </CardMedia>
            <CardText>
            {this.props.children}
            </CardText>
        </Card>   
    );
  }
}


export default About;
